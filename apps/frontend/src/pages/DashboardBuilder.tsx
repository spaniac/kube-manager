import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { WidgetCanvas } from '@/components/dashboard/WidgetCanvas';
import { WidgetLibraryPanel } from '@/components/dashboard/WidgetLibraryPanel';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { getDashboard, updateDashboard, createDashboard, Dashboard } from '@/api/dashboard';
import { WidgetConfig, WIDGET_TYPES } from '@/components/dashboard/widgetTypes';
import { Layout } from 'react-grid-layout';
import { ArrowLeft, Save } from 'lucide-react';

export default function DashboardBuilder() {
  const { id } = useParams();
  const navigate = useNavigate();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [dashboard, setDashboard] = useState<Dashboard | null>(null);
  const [widgets, setWidgets] = useState<WidgetConfig[]>([]);
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(id !== 'new');

  useEffect(() => {
    if (id && id !== 'new') {
      const fetchDashboard = async () => {
        try {
          const data = await getDashboard(id);
          setDashboard(data);
          setName(data.name);
          setWidgets(data.widgets || []);
        } catch (error) {
          console.error('Failed to load dashboard', error);
        } finally {
          setLoading(false);
        }
      };
      fetchDashboard();
    } else {
      setName('New Dashboard');
      setLoading(false);
    }
  }, [id]);

  const handleLayoutChange = (layout: any[]) => {
    // Update widgets with new positions from RGL
    const updatedWidgets = widgets.map((widget) => {
      const layoutItem = layout.find((l: any) => l.i === widget.i);
      if (layoutItem) {
        return {
          ...widget,
          x: layoutItem.x,
          y: layoutItem.y,
          w: layoutItem.w,
          h: layoutItem.h,
        };
      }
      return widget;
    });
    setWidgets(updatedWidgets);
  };

  const handleDrop = (layout: any[], layoutItem: any, _event: DragEvent) => {
    const typeId = layoutItem.i; 
    const typeDef = WIDGET_TYPES.find(t => t.id === typeId);
    
    if (typeDef) {
       const newWidgetId = `${typeId}-${Date.now()}`;
       
       const newWidget: WidgetConfig = {
         i: newWidgetId,
         type: typeDef.id,
         title: typeDef.name,
         x: layoutItem.x,
         y: layoutItem.y,
         w: layoutItem.w,
         h: layoutItem.h,
         config: typeDef.defaultConfig || {},
       };
       
       setWidgets(prev => {
         if (prev.find(w => w.i === newWidgetId)) return prev;
         return [...prev, newWidget];
       });
    }
  };

  const handleRemoveWidget = (widgetId: string) => {
    setWidgets(prev => prev.filter(w => w.i !== widgetId));
  };

  const handleSave = async () => {
    try {
      if (id && id !== 'new') {
        await updateDashboard(id, {
          name,
          widgets,
        });
      } else {
        await createDashboard({
          name,
          widgets,
        });
      }
      navigate('/dashboards');
    } catch (error) {
      console.error('Failed to save dashboard', error);
    }
  };

  if (loading) {
    return <div className="p-8 flex justify-center">Loading...</div>;
  }

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] bg-background">
       <div className="border-b p-4 flex items-center justify-between bg-card">
         <div className="flex items-center gap-4">
           <Button variant="ghost" size="icon" onClick={() => navigate('/dashboards')}>
             <ArrowLeft className="h-4 w-4" />
           </Button>
           <Input 
             value={name} 
             onChange={(e) => setName(e.target.value)} 
             className="text-lg font-semibold w-[300px]"
             placeholder="Dashboard Name"
           />
         </div>
         <Button onClick={handleSave}>
           <Save className="h-4 w-4 mr-2" />
           Save Dashboard
         </Button>
       </div>
       
       <div className="flex-1 flex overflow-hidden">
         <div className="w-64 border-r bg-muted/10">
           <WidgetLibraryPanel />
         </div>
         <div className="flex-1 overflow-auto p-4 bg-muted/5">
           <WidgetCanvas 
             widgets={widgets}
             onLayoutChange={handleLayoutChange}
             onRemoveWidget={handleRemoveWidget}
             isDroppable={true}
             onDrop={handleDrop}
           />
         </div>
       </div>
    </div>
  );
}
