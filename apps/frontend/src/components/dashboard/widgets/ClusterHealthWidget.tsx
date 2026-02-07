import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getClusterHealth, getClusterMetrics } from '@/api/cluster';
import { Activity, Server, Box, Layers } from 'lucide-react';
import { cn } from '@/lib/utils';

export function ClusterHealthWidget() {
  const [health, setHealth] = useState<{ healthy: boolean; message: string } | null>(null);
  const [metrics, setMetrics] = useState<{
    cpuUsage: number;
    memoryUsage: number;
    podsCount: number;
    nodesCount: number;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [healthData, metricsData] = await Promise.all([
          getClusterHealth(),
          getClusterMetrics(),
        ]);
        setHealth(healthData);
        setMetrics(metricsData);
      } catch (error) {
        console.error('Failed to fetch cluster data', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <Card className="h-full w-full flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </Card>
    );
  }

  return (
    <Card className="h-full w-full overflow-hidden flex flex-col">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium flex items-center gap-2">
          <Activity className="h-4 w-4" />
          Cluster Health
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1">
        <div className="grid grid-cols-2 gap-4 h-full">
          <div className="flex flex-col items-center justify-center p-2 bg-muted/20 rounded-lg">
            <div className={cn("text-lg font-bold", health?.healthy ? "text-green-500" : "text-red-500")}>
              {health?.healthy ? 'Healthy' : 'Unhealthy'}
            </div>
            <div className="text-xs text-muted-foreground text-center mt-1">{health?.message}</div>
          </div>
          
          <div className="flex flex-col gap-2 justify-center">
            <div className="flex items-center justify-between text-xs">
              <span className="flex items-center gap-1 text-muted-foreground">
                <Server className="h-3 w-3" /> Nodes
              </span>
              <span className="font-mono">{metrics?.nodesCount || 0}</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="flex items-center gap-1 text-muted-foreground">
                <Box className="h-3 w-3" /> Pods
              </span>
              <span className="font-mono">{metrics?.podsCount || 0}</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="flex items-center gap-1 text-muted-foreground">
                <Activity className="h-3 w-3" /> CPU
              </span>
              <span className="font-mono">{metrics?.cpuUsage?.toFixed(1) || 0}%</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="flex items-center gap-1 text-muted-foreground">
                <Layers className="h-3 w-3" /> Mem
              </span>
              <span className="font-mono">{metrics?.memoryUsage?.toFixed(1) || 0}%</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
