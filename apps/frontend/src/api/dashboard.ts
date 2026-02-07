import apiClient from './client';
import { z } from 'zod';
import { parseApiResponse } from '../utils/apiResponse';
import type { ApiResponse } from '../types/api';
import { WidgetConfig } from '../components/dashboard/widgetTypes';

// Zod schemas for validation
const widgetConfigSchema = z.object({
  i: z.string(),
  type: z.enum(['cluster-health', 'namespace-usage', 'alert-feed', 'pod-status']),
  title: z.string(),
  x: z.number(),
  y: z.number(),
  w: z.number(),
  h: z.number(),
  config: z.record(z.string(), z.any()).optional(),
});

const dashboardSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional(),
  widgets: z.array(widgetConfigSchema),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
  userId: z.string().optional(),
  isDefault: z.boolean().optional(),
});

export type Dashboard = z.infer<typeof dashboardSchema>;

export interface CreateDashboardRequest {
  name: string;
  description?: string;
  widgets: WidgetConfig[];
  isDefault?: boolean;
}

export interface UpdateDashboardRequest {
  name?: string;
  description?: string;
  widgets?: WidgetConfig[];
  isDefault?: boolean;
}

// API Functions

export async function getDashboards(): Promise<Dashboard[]> {
  const response = await apiClient.get<ApiResponse<Dashboard[]>>('/api/v1/dashboards');
  return parseApiResponse(response.data, z.array(dashboardSchema));
}

export async function getDashboard(id: string): Promise<Dashboard> {
  const response = await apiClient.get<ApiResponse<Dashboard>>(`/api/v1/dashboards/${id}`);
  return parseApiResponse(response.data, dashboardSchema);
}

export async function createDashboard(data: CreateDashboardRequest): Promise<Dashboard> {
  const response = await apiClient.post<ApiResponse<Dashboard>>('/api/v1/dashboards', data);
  return parseApiResponse(response.data, dashboardSchema);
}

export async function updateDashboard(id: string, data: UpdateDashboardRequest): Promise<Dashboard> {
  const response = await apiClient.put<ApiResponse<Dashboard>>(`/api/v1/dashboards/${id}`, data);
  return parseApiResponse(response.data, dashboardSchema);
}

export async function deleteDashboard(id: string): Promise<void> {
  const response = await apiClient.delete<ApiResponse<void>>(`/api/v1/dashboards/${id}`);
  parseApiResponse(response.data, z.any());
}

export async function cloneDashboard(id: string, newName: string): Promise<Dashboard> {
  const response = await apiClient.post<ApiResponse<Dashboard>>(`/api/v1/dashboards/${id}/clone`, {
    name: newName,
  });
  return parseApiResponse(response.data, dashboardSchema);
}
