import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getDashboards, Dashboard as DashboardType } from '@/api/dashboard';
import { WidgetCanvas } from '@/components/dashboard/WidgetCanvas';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function Dashboard() {
  const navigate = useNavigate();
  const [dashboards, setDashboards] = useState<DashboardType[]>([]);
  const [selectedDashboardId, setSelectedDashboardId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboards = async () => {
      try {
        const data = await getDashboards();
        setDashboards(data);
        if (data.length > 0) {
          setSelectedDashboardId(data[0]?.id || null);
        }
      } catch (error) {
        console.error('Failed to fetch dashboards', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboards();
  }, []);

  const selectedDashboard = dashboards.find(d => d.id === selectedDashboardId);

  if (loading) {
    return <div className="p-8 flex justify-center">Loading dashboards...</div>;
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Overview of your cluster and workloads.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => navigate('/dashboards/new')}>
            <Plus className="h-4 w-4 mr-2" />
            New Dashboard
          </Button>
          {selectedDashboardId && (
            <Button variant="outline" onClick={() => navigate(`/dashboards/${selectedDashboardId}/edit`)}>
              <Settings className="h-4 w-4 mr-2" />
              Edit Layout
            </Button>
          )}
        </div>
      </div>

      {dashboards.length > 0 ? (
        <div className="space-y-6">
          <Tabs 
            value={selectedDashboardId || undefined} 
            onValueChange={setSelectedDashboardId}
            className="w-full"
          >
            <TabsList className="w-full justify-start overflow-x-auto">
              {dashboards.map(d => (
                <TabsTrigger key={d.id} value={d.id}>
                  {d.name}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>

          {selectedDashboard && (
            <div className="min-h-[600px]">
              <WidgetCanvas 
                widgets={selectedDashboard.widgets || []}
                onLayoutChange={() => {}} 
                onRemoveWidget={() => {}} 
                isDraggable={false}
                isResizable={false}
                isDroppable={false}
              />
            </div>
          )}
        </div>
      ) : (
        <Card className="border-dashed">
          <CardHeader>
            <CardTitle>No Dashboards Found</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center p-8 text-center">
              <p className="text-muted-foreground mb-4">
                You haven't created any dashboards yet. Create one to get started.
              </p>
              <Button onClick={() => navigate('/dashboards/new')}>
                <Plus className="h-4 w-4 mr-2" />
                Create Dashboard
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
