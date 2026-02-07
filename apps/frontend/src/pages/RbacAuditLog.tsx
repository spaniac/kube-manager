import React, { useState, useEffect } from 'react';
import { getRbacAuditEvents, RbacAuditEvent, RbacAuditFilter } from '../api/rbacAudit';
import { ApiResponse } from '../types/api'; // Assuming ApiResponse is defined here or similar
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'; // Assuming shadcn/ui table
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { format } from 'date-fns';
import ReactJson from 'react-json-view'; // Assuming react-json-view for JSON diff

const RbacAuditLog: React.FC = () => {
  const [auditEvents, setAuditEvents] = useState<RbacAuditEvent[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [filters, setFilters] = useState<RbacAuditFilter>({});
  const [selectedEvent, setSelectedEvent] = useState<RbacAuditEvent | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const fetchAuditEvents = async () => {
    setLoading(true);
    const response: ApiResponse<RbacAuditEvent[]> = await getRbacAuditEvents(filters);
    if (response.success && response.data) {
      setAuditEvents(response.data);
    } else {
      console.error('Failed to fetch audit events:', response.message);
      setAuditEvents([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchAuditEvents();
  }, [filters]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleViewDetails = (event: RbacAuditEvent) => {
    setSelectedEvent(event);
    setIsDialogOpen(true);
  };

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">RBAC Audit Log</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Input
          name="actor"
          placeholder="Filter by Actor Email"
          value={filters.actor || ''}
          onChange={handleFilterChange}
        />
        <Input
          name="action"
          placeholder="Filter by Action Type"
          value={filters.action || ''}
          onChange={handleFilterChange}
        />
        <Input
          name="from"
          type="datetime-local"
          placeholder="From Timestamp"
          value={filters.from || ''}
          onChange={handleFilterChange}
        />
        <Input
          name="to"
          type="datetime-local"
          placeholder="To Timestamp"
          value={filters.to || ''}
          onChange={handleFilterChange}
        />
      </div>

      {loading ? (
        <p>Loading audit events...</p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Timestamp</TableHead>
              <TableHead>Actor</TableHead>
              <TableHead>Action</TableHead>
              <TableHead>Target Type</TableHead>
              <TableHead>Target ID</TableHead>
              <TableHead>Details</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {auditEvents.length > 0 ? (
              auditEvents.map((event, index) => (
                <TableRow key={index}>
                  <TableCell>{format(new Date(event.timestamp), 'yyyy-MM-dd HH:mm:ss')}</TableCell>
                  <TableCell>{event.actor}</TableCell>
                  <TableCell>{event.action}</TableCell>
                  <TableCell>{event.targetType}</TableCell>
                  <TableCell>{event.targetId}</TableCell>
                  <TableCell>
                    <Button variant="outline" onClick={() => handleViewDetails(event)}>
                      View Diff
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center">
                  No audit events found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      )}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Audit Event Details</DialogTitle>
            <DialogDescription>
              Showing before and after data for the selected RBAC audit event.
            </DialogDescription>
          </DialogHeader>
          {selectedEvent && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">Before Data</h3>
                <ReactJson
                  src={JSON.parse(selectedEvent.beforeData || '{}')}
                  name={false}
                  collapsed={2}
                  enableClipboard={true}
                  displayObjectSize={false}
                  displayDataTypes={false}
                />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">After Data</h3>
                <ReactJson
                  src={JSON.parse(selectedEvent.afterData || '{}')}
                  name={false}
                  collapsed={2}
                  enableClipboard={true}
                  displayObjectSize={false}
                  displayDataTypes={false}
                />
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RbacAuditLog;
