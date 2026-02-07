import apiClient from './client';
import { parseApiResponse } from '../utils/apiResponse';
import { z } from 'zod';
import type { Alert, ApiResponse } from '../types/api';

export interface AlertHistoryParams {
  namespace?: string;
  severity?: string;
  acknowledged?: boolean;
  page?: number;
  size?: number;
}

export interface AlertHistoryResponse {
  alerts: Alert[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
}

const alertSchema = z.object({
  id: z.number(),
  metricType: z.string(),
  condition: z.string(),
  currentValue: z.number(),
  thresholdValue: z.number(),
  severity: z.string(),
  message: z.string(),
  resourceName: z.string(),
  namespace: z.string(),
  timestamp: z.string(),
  acknowledged: z.boolean(),
  acknowledgedAt: z.string().optional(),
  acknowledgedBy: z.string().optional(),
  source: z.string(),
});

const alertHistorySchema = z.object({
  alerts: z.array(alertSchema),
  page: z.number(),
  size: z.number(),
  totalElements: z.number(),
  totalPages: z.number(),
});

export async function getAlerts(): Promise<Alert[]> {
  const response = await apiClient.get<ApiResponse<Alert[]>>('/api/v1/alerts');
  return parseApiResponse(response.data, z.array(alertSchema));
}

export async function getAlert(id: number): Promise<Alert> {
  const response = await apiClient.get<ApiResponse<Alert>>(`/api/v1/alerts/${id}`);
  return parseApiResponse(response.data, alertSchema);
}

export async function getAlertHistory(params: AlertHistoryParams = {}): Promise<AlertHistoryResponse> {
  const queryParams = new URLSearchParams();

  if (params.namespace) {
    queryParams.set('namespace', params.namespace);
  }
  if (params.severity) {
    queryParams.set('severity', params.severity);
  }
  if (typeof params.acknowledged === 'boolean') {
    queryParams.set('acknowledged', String(params.acknowledged));
  }
  if (typeof params.page === 'number') {
    queryParams.set('page', String(params.page));
  }
  if (typeof params.size === 'number') {
    queryParams.set('size', String(params.size));
  }

  const queryString = queryParams.toString();
  const url = queryString ? `/api/v1/alerts/history?${queryString}` : '/api/v1/alerts/history';
  const response = await apiClient.get<ApiResponse<AlertHistoryResponse>>(url);

  return parseApiResponse(response.data, alertHistorySchema);
}

export async function acknowledgeAlert(id: number, acknowledgedBy?: string): Promise<Alert> {
  const response = await apiClient.patch<ApiResponse<Alert>>(`/api/v1/alerts/${id}/acknowledge`, {
    acknowledgedBy,
  });
  return parseApiResponse(response.data, alertSchema);
}

export async function deleteAlert(id: number): Promise<void> {
  const response = await apiClient.delete<ApiResponse<void>>(`/api/v1/alerts/${id}`);
  parseApiResponse(response.data, z.any());
}
