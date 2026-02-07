import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getNamespaces } from '@/api/namespace';
import { Database, Circle } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import type { Namespace } from '@/types/api';

export function NamespaceUsageWidget() {
  const [namespaces, setNamespaces] = useState<Namespace[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getNamespaces({ limit: 100 });
        setNamespaces(data.items);
      } catch (error) {
        console.error('Failed to fetch namespaces', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
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
          <Database className="h-4 w-4" />
          Namespaces
          <Badge variant="secondary" className="ml-auto text-xs">
            {namespaces.length}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 p-0 overflow-hidden">
        <ScrollArea className="h-full w-full">
          <div className="space-y-1 p-4 pt-0">
            {namespaces.map((ns) => (
              <div
                key={ns.name}
                className="flex items-center justify-between py-2 border-b last:border-0"
              >
                <div className="flex items-center gap-2">
                  <Circle
                    className={`h-2 w-2 ${
                      ns.status === 'Active' ? 'fill-green-500 text-green-500' : 'fill-yellow-500 text-yellow-500'
                    }`}
                  />
                  <span className="text-sm font-medium">{ns.name}</span>
                </div>
                <span className="text-xs text-muted-foreground">
                  {ns.status}
                </span>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
