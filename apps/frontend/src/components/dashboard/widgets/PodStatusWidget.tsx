import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getPods } from '@/api/pod';
import { Box } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import type { Pod } from '@/types/api';

export function PodStatusWidget() {
  const [podStats, setPodStats] = useState<{ name: string; value: number; color: string }[]>([]);
  const [totalPods, setTotalPods] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPods({ limit: 1000 }); // Fetch enough to get a good distribution
        const pods = data.items;
        setTotalPods(pods.length);

        const statusCounts = pods.reduce((acc, pod) => {
          const status = pod.status;
          acc[status] = (acc[status] || 0) + 1;
          return acc;
        }, {} as Record<string, number>);

        const chartData = [
          { name: 'Running', value: statusCounts['Running'] || 0, color: '#22c55e' },
          { name: 'Pending', value: statusCounts['Pending'] || 0, color: '#eab308' },
          { name: 'Failed', value: statusCounts['Failed'] || 0, color: '#ef4444' },
          { name: 'Succeeded', value: statusCounts['Succeeded'] || 0, color: '#3b82f6' },
          { name: 'Unknown', value: statusCounts['Unknown'] || 0, color: '#6b7280' },
        ].filter(item => item.value > 0);

        setPodStats(chartData);
      } catch (error) {
        console.error('Failed to fetch pods', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 60000);
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
          <Box className="h-4 w-4" />
          Pod Status Overview
          <span className="ml-auto text-xs text-muted-foreground">Total: {totalPods}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 min-h-[150px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={podStats}
              cx="50%"
              cy="50%"
              innerRadius={30}
              outerRadius={50}
              paddingAngle={2}
              dataKey="value"
            >
              {podStats.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              itemStyle={{ fontSize: '12px' }}
            />
            <Legend 
              layout="vertical" 
              verticalAlign="middle" 
              align="right"
              wrapperStyle={{ fontSize: '12px' }}
            />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
