import React, { useEffect, useRef } from 'react';
import RGL, { WidthProvider } from 'react-grid-layout/legacy';
import type { Layout, LayoutItem } from 'react-grid-layout/legacy';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import { WidgetConfig } from './widgetTypes';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { ClusterHealthWidget } from './widgets/ClusterHealthWidget';
import { NamespaceUsageWidget } from './widgets/NamespaceUsageWidget';
import { AlertFeedWidget } from './widgets/AlertFeedWidget';
import { PodStatusWidget } from './widgets/PodStatusWidget';

const ReactGridLayout = WidthProvider(RGL);

interface WidgetCanvasProps {
  widgets: WidgetConfig[];
  onLayoutChange: (layout: LayoutItem[]) => void;
  onRemoveWidget: (id: string) => void;
  isDraggable?: boolean;
  isResizable?: boolean;
  isDroppable?: boolean;
  onDrop?: (layout: LayoutItem[], item: LayoutItem | undefined, e: DragEvent) => void;
  refreshIntervalSec?: number; // New prop for refresh interval
  onRefresh?: () => void; // New prop for refresh callback
}

const WidgetRenderer = ({ widget }: { widget: WidgetConfig }) => {
  switch (widget.type) {
    case 'cluster-health':
      return <ClusterHealthWidget />;
    case 'namespace-usage':
      return <NamespaceUsageWidget />;
    case 'alert-feed':
      return <AlertFeedWidget />;
    case 'pod-status':
      return <PodStatusWidget />;
    default:
      return <div>Unknown Widget Type</div>;
  }
};

export function WidgetCanvas({
  widgets,
  onLayoutChange,
  onRemoveWidget,
  isDraggable = true,
  isResizable = true,
  isDroppable = false,
  onDrop,
  refreshIntervalSec, // Destructure new prop
  onRefresh, // Destructure new prop
}: WidgetCanvasProps) {
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (refreshIntervalSec && refreshIntervalSec > 0 && onRefresh) {
      // Clear any existing interval
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      // Set up new interval
      intervalRef.current = setInterval(() => {
        onRefresh();
      }, refreshIntervalSec * 1000); // Convert seconds to milliseconds
    } else {
      // Clear interval if refreshIntervalSec is not set or invalid
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    // Cleanup on component unmount or when dependencies change
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [refreshIntervalSec, onRefresh]); // Re-run effect if refreshIntervalSec or onRefresh changes

  // Convert widgets to RGL layout format
  const layout = widgets.map((w) => ({
    i: w.i,
    x: w.x,
    y: w.y,
    w: w.w,
    h: w.h,
  }));

  return (
    <div className="w-full min-h-[600px] bg-muted/10 rounded-lg border-2 border-dashed border-muted/50 p-4">
      <ReactGridLayout
        className="layout"
        layout={layout}
        cols={12}
        rowHeight={30}
        onLayoutChange={(layout) => onLayoutChange(layout as LayoutItem[])}
        isDraggable={isDraggable}
        isResizable={isResizable}
        isDroppable={isDroppable}
        onDrop={(layout, item, e) => onDrop?.(layout as LayoutItem[], item, e as DragEvent)}
        draggableHandle=".drag-handle"
      >
        {widgets.map((widget) => (
          <div key={widget.i} className="relative group">
            <Card className="h-full w-full overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              {isDraggable && (
                <div className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                   <div className="drag-handle cursor-move p-1 bg-secondary rounded hover:bg-secondary/80">
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 15 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <title>Drag handle</title>
                      <path
                        d="M5.5 4.625C5.5 5.10825 5.10825 5.5 4.625 5.5C4.14175 5.5 3.75 5.10825 3.75 4.625C3.75 4.14175 4.14175 3.75 4.625 3.75C5.10825 3.75 5.5 4.14175 5.5 4.625ZM4.625 11.25C5.10825 11.25 5.5 10.8582 5.5 10.375C5.5 9.89175 5.10825 9.5 4.625 9.5C4.14175 9.5 3.75 9.89175 3.75 10.375C3.75 10.8582 4.14175 11.25 4.625 11.25ZM10.375 11.25C10.8582 11.25 11.25 10.8582 11.25 10.375C11.25 9.89175 10.8582 9.5 10.375 9.5C9.89175 9.5 9.5 9.89175 9.5 10.375C9.5 10.8582 9.89175 11.25 10.375 11.25ZM11.25 4.625C11.25 5.10825 10.8582 5.5 10.375 5.5C9.89175 5.5 9.5 5.10825 9.5 4.625C9.5 4.14175 9.89175 3.75 10.375 3.75C10.8582 3.75 11.25 4.14175 11.25 4.625Z"
                        fill="currentColor"
                      />
                    </svg>
                  </div>
                  <Button
                    variant="destructive"
                    size="icon"
                    className="h-6 w-6"
                    onClick={() => onRemoveWidget(widget.i)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              )}
              <WidgetRenderer widget={widget} />
            </Card>
          </div>
        ))}
      </ReactGridLayout>
    </div>
  );
}
