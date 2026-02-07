import { LucideIcon, Activity, Database, Bell, Box } from 'lucide-react';
import React from 'react';

export type WidgetType = 'cluster-health' | 'namespace-usage' | 'alert-feed' | 'pod-status';

export interface WidgetConfig {
  i: string; // Unique identifier for the widget instance
  type: WidgetType;
  title: string;
  x: number;
  y: number;
  w: number;
  h: number;
  config?: Record<string, any>; // Widget-specific configuration
}

export interface WidgetTypeDefinition {
  id: WidgetType;
  name: string;
  description: string;
  icon: LucideIcon;
  defaultW: number;
  defaultH: number;
  defaultConfig?: Record<string, any>;
}

export const WIDGET_TYPES: WidgetTypeDefinition[] = [
  {
    id: 'cluster-health',
    name: 'Cluster Health',
    description: 'Overview of cluster health status and metrics',
    icon: Activity,
    defaultW: 4,
    defaultH: 4,
  },
  {
    id: 'namespace-usage',
    name: 'Namespace Usage',
    description: 'Resource usage by namespace',
    icon: Database,
    defaultW: 6,
    defaultH: 8,
  },
  {
    id: 'alert-feed',
    name: 'Alert Feed',
    description: 'Recent alerts and events',
    icon: Bell,
    defaultW: 6,
    defaultH: 6,
  },
  {
    id: 'pod-status',
    name: 'Pod Status',
    description: 'Status of pods across namespaces',
    icon: Box,
    defaultW: 12,
    defaultH: 6,
  },
];
