import React from 'react';
import { WIDGET_TYPES } from './widgetTypes';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';

export function WidgetLibraryPanel() {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle className="text-lg">Widgets</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 p-0 overflow-hidden">
        <ScrollArea className="h-full px-4 pb-4">
          <div className="space-y-4">
            {WIDGET_TYPES.map((type) => (
              <div
                key={type.id}
                className="draggable-widget cursor-move p-3 border rounded-lg hover:bg-muted/50 transition-colors bg-card"
                draggable={true}
                unselectable="on"
                // Handled by react-grid-layout via onDrop
                onDragStart={(e) => {
                  e.dataTransfer.setData('text/plain', type.id);
                  // RGL needs this for dropping
                  e.dataTransfer.setData(
                    'application/json',
                    JSON.stringify({
                      w: type.defaultW,
                      h: type.defaultH,
                    })
                  );
                }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-primary/10 rounded-md text-primary">
                    <type.icon className="h-4 w-4" />
                  </div>
                  <div className="font-medium text-sm">{type.name}</div>
                </div>
                <p className="text-xs text-muted-foreground">{type.description}</p>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
