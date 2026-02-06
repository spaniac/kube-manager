import { useState } from 'react';
import { getCronJobs } from '@api/workload';
import { useApiQuery } from '@hooks/useApi';
import { Button } from '@components/Button';
import { Input } from '@components/Input';
import { Spinner } from '@components/Spinner';
import { Table, TableStyles } from '@components/Table';
import { Badge } from '@components/Badge';

interface CronJob {
  name: string;
  namespace: string;
  schedule: string;
  suspend: boolean;
  succeeded: number;
  failed: number;
}

export default function CronJobList() {
  const [page, setPage] = useState(1);
  const [limit] = useState(20);
  const [namespace, setNamespace] = useState('');
  const [search, setSearch] = useState('');

  const { data: cronJobsData, isLoading, error } = useApiQuery(
    ['cronjobs', page, limit, namespace, search],
    () => getCronJobs({ page, limit, namespace: namespace || undefined, search: search || undefined }),
    {},
  );

  const cronJobs = cronJobsData?.items || [];
  const total = cronJobsData?.total || 0;

  const columns = [
    { key: 'name' as keyof CronJob, header: 'Name', render: (value: unknown) => <span>{(value as string)}</span> },
    {
      key: 'namespace' as keyof CronJob,
      header: 'Namespace',
      render: (value: unknown) => (
        <span className="namespace-badge">{value as string}</span>
      ),
    },
    {
      key: 'schedule' as keyof CronJob,
      header: 'Schedule',
      render: (value: unknown) => (
        <code className="schedule-code">{value as string}</code>
      ),
    },
    {
      key: 'suspend' as keyof CronJob,
      header: 'Status',
      render: (value: unknown) => (
        <Badge status={(value as boolean) ? 'Pending' : 'Running'} label={(value as boolean) ? 'Suspended' : 'Active'} />
      ),
    },
    { key: 'succeeded' as keyof CronJob, header: 'Succeeded', render: (value: unknown) => <span>{(value as number) || 0}</span> },
    { key: 'failed' as keyof CronJob, header: 'Failed', render: (value: unknown) => <span>{(value as number) || 0}</span> },
  ];

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const handleNamespaceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNamespace(e.target.value);
    setPage(1);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const totalPages = Math.ceil(total / limit);

  return (
    <>
      <div className="cronjob-list">
        <TableStyles />
        <div className="page-header">
          <div>
            <h1>CronJobs</h1>
            <p>Manage scheduled jobs for periodic tasks</p>
          </div>
          <div className="header-actions">
            <Button variant="primary">
              Create CronJob
            </Button>
          </div>
        </div>

        <div className="filters">
          <Input
            placeholder="Search cronjobs..."
            value={search}
            onChange={handleSearchChange}
            fullWidth
          />
          <Input
            placeholder="Filter by namespace..."
            value={namespace}
            onChange={handleNamespaceChange}
            fullWidth
          />
        </div>

        {isLoading ? (
          <div className="loading-container">
            <Spinner />
            <p>Loading cronjobs...</p>
          </div>
        ) : error ? (
          <div className="error-message">
            Error loading cronjobs: {(error as Error).message}
          </div>
        ) : cronJobs.length === 0 ? (
          <div className="empty-state">
            <p>No cronjobs found</p>
          </div>
        ) : (
          <div className="table-container">
            <Table
              data={cronJobs}
              columns={columns}
              emptyMessage="No cronjobs found"
            />
            {totalPages > 1 && (
              <div className="pagination">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => handlePageChange(page - 1)}
                  disabled={page === 1}
                >
                  Previous
                </Button>
                <span className="page-info">
                  Page {page} of {totalPages}
                </span>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => handlePageChange(page + 1)}
                  disabled={page === totalPages}
                >
                  Next
                </Button>
              </div>
            )}
          </div>
        )}
      </div>

      <style>{`
        .cronjob-list {
          padding: 24px;
          max-width: 1400px;
          margin: 0 auto;
        }

        .page-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
          padding-bottom: 16px;
          border-bottom: 1px solid #e5e7eb;
        }

        .page-header h1 {
          margin: 0 0 8px 0;
          font-size: 28px;
          font-weight: 700;
          color: #111827;
        }

        .page-header p {
          margin: 0;
          font-size: 14px;
          color: #6b7280;
        }

        .header-actions {
          display: flex;
          gap: 12px;
        }

        .filters {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          margin-bottom: 24px;
        }

        .loading-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
          padding: 48px;
        }

        .loading-container p {
          margin: 0;
          font-size: 14px;
          color: #6b7280;
        }

        .error-message {
          padding: 16px;
          background: #fef2f2;
          border: 1px solid #fecaca;
          border-radius: 6px;
          color: #b91c1c;
        }

        .empty-state {
          padding: 48px;
          text-align: center;
          background: #f9fafb;
          border-radius: 8px;
        }

        .empty-state p {
          margin: 0;
          font-size: 14px;
          color: #6b7280;
        }

        .table-container {
          background: #ffffff;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          overflow: hidden;
        }

        .pagination {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 12px;
          padding: 16px;
          border-top: 1px solid #e5e7eb;
        }

        .page-info {
          font-size: 14px;
          color: #6b7280;
          font-weight: 500;
        }

        .namespace-badge {
          display: inline-block;
          padding: 2px 8px;
          background: #dbeafe;
          color: #1e40af;
          border-radius: 4px;
          font-size: 12px;
          font-weight: 500;
        }

        .schedule-code {
          display: inline-block;
          padding: 2px 8px;
          background: #1e1e1e;
          color: #10b981;
          border-radius: 4px;
          font-size: 12px;
          font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
        }

        @media (max-width: 640px) {
          .filters {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </>
  );
}
