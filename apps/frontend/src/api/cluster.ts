import apiClient from '../api/client';
import { z } from 'zod';
import { parseApiResponse } from '../utils/apiResponse';
import { clusterSchema, nodeSchema } from '../types/schemas';
import type { Cluster, Node, ApiResponse, Event as ApiEvent } from '../types/api';

export async function getCluster(): Promise<Cluster> {
  const response = await apiClient.get<ApiResponse<Cluster>>('/api/v1/cluster');
  const parsed = parseApiResponse(response.data, clusterSchema);
  return parsed ?? {
    name: 'unknown',
    version: '',
    platform: '',
    nodesCount: 0,
    podsCount: 0,
    namespacesCount: 0,
  };
}

export async function getClusterHealth(): Promise<{
  healthy: boolean;
  message: string;
}> {
  const response = await apiClient.get<ApiResponse<{ healthy: boolean; message: string }>>(
    '/api/v1/cluster/health',
  );
  const parsed = parseApiResponse(
    response.data,
    z.object({ healthy: z.boolean(), message: z.string() }),
  );
  return parsed ?? { healthy: false, message: 'Unknown status' };
}

export async function getClusterMetrics(): Promise<{
  cpuUsage: number;
  memoryUsage: number;
  podsCount: number;
  nodesCount: number;
}> {
  const response = await apiClient.get<
    ApiResponse<{
      cpuUsage: number;
      memoryUsage: number;
      podsCount: number;
      nodesCount: number;
    }>
  >('/api/v1/cluster/metrics');

  const parsed = parseApiResponse(
    response.data,
    z.object({
      cpuUsage: z.number(),
      memoryUsage: z.number(),
      podsCount: z.number(),
      nodesCount: z.number(),
    }),
  );
  return (
    parsed ?? {
      cpuUsage: 0,
      memoryUsage: 0,
      podsCount: 0,
      nodesCount: 0,
    }
  );
}

export async function getClusterNodes(): Promise<Node[]> {
  const response = await apiClient.get<ApiResponse<Node[]>>('/api/v1/cluster/nodes');
  const parsed = parseApiResponse(response.data, z.array(nodeSchema));
  return parsed ?? [];
}

export async function getNode(name: string): Promise<Node | null> {
  const response = await apiClient.get<ApiResponse<Node>>(`/api/v1/cluster/nodes/${name}`);
  const parsed = parseApiResponse(response.data, nodeSchema);
  return parsed ?? null;
}

export async function getClusterEvents(params?: {
  severity?: 'Normal' | 'Warning' | 'Error';
  limit?: number;
}): Promise<ApiEvent[]> {
  const queryParams = new URLSearchParams();

  if (params?.severity) {
    queryParams.set('severity', params.severity);
  }

  if (params?.limit) {
    queryParams.set('limit', params.limit.toString());
  }

  const response = await apiClient.get<ApiResponse<ApiEvent[]>>(
    `/api/v1/cluster/events?${queryParams.toString()}`,
  );
  const parsed = parseApiResponse(response.data, z.array(z.any()));
  return parsed ?? [];
}

export async function getNodes(): Promise<Node[]> {
  const response = await apiClient.get<ApiResponse<Node[]>>('/api/v1/cluster/nodes');
  const parsed = parseApiResponse(response.data, z.array(nodeSchema));
  return parsed ?? [];
}

export async function getNodeDetails(name: string): Promise<Node> {
  const response = await apiClient.get<ApiResponse<Node>>(`/api/v1/cluster/nodes/${name}`);
  const parsed = parseApiResponse(response.data, nodeSchema);
  return parsed ?? {} as Node;
}

export async function cordonNode(name: string): Promise<void> {
  const response = await apiClient.post<ApiResponse<void>>(`/api/v1/cluster/nodes/${name}/cordon`);
  parseApiResponse(response.data, z.undefined());
}

export async function uncordonNode(name: string): Promise<void> {
  const response = await apiClient.post<ApiResponse<void>>(`/api/v1/cluster/nodes/${name}/uncordon`);
  parseApiResponse(response.data, z.undefined());
}

export async function drainNode(name: string, timeoutSeconds?: number): Promise<void> {
  const queryParams = timeoutSeconds ? `?timeout=${timeoutSeconds}` : '';
  const response = await apiClient.post<ApiResponse<void>>(
    `/api/v1/cluster/nodes/${name}/drain${queryParams}`,
  );
  parseApiResponse(response.data, z.undefined());
}
