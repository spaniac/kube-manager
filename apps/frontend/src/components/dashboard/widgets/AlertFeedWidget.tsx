import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getAlerts } from '@/api/alert';
import { Bell, AlertTriangle, CheckCircle, Info } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { formatDistanceToNow } from 'date-fns';
import type { Alert } from '@/types/api';

export function AlertFeedWidget() {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAlerts();
        setAlerts(data);
      } catch (error) {
        console.error('Failed to fetch alerts', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 60000);
    return () => clearInterval(interval);
  }, []);

  const getSeverityIcon = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'critical':
      case 'error':
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'info':
        return <Info className="h-4 w-4 text-blue-500" />;
      default:
        return <CheckCircle className="h-4 w-4 text-gray-500" />;
    }
  };

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
          <Bell className="h-4 w-4" />
          Recent Alerts
          <Badge variant={alerts.length > 0 ? "destructive" : "secondary"} className="ml-auto text-xs">
            {alerts.length}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 p-0 overflow-hidden">
        <ScrollArea className="h-full w-full">
          {alerts.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full p-4 text-muted-foreground text-sm">
              <CheckCircle className="h-8 w-8 mb-2 opacity-20" />
              No active alerts
            </div>
          ) : (
            <div className="divide-y">
              {alerts.map((alert) => (
                <div key={alert.id} className="p-3 hover:bg-muted/50 transition-colors">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5">{getSeverityIcon(alert.severity)}</div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium leading-none">{alert.message}</p>
                      <div className="flex items-center text-xs text-muted-foreground gap-2">
                        <span>{alert.resourceName}</span>
                        <span>•</span>
                        <span>{formatDistanceToNow(new Date(alert.timestamp), { addSuffix: true })}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
