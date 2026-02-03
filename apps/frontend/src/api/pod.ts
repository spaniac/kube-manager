import apiClient from '@api/client';
import { z } from 'zod';
import { parseApiResponse, parsePaginationParams } from '@utils/apiResponse';
import { podSchema, podLogsSchema, apiResponseSchema, resourceListSchema } from '../types/schemas';
import type { Pod, PodLogs, ResourceList, ResourceYaml } from '../types/api';

export async function getPods(params?: {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  namespace?: string;
  search?: string;
}): Promise<ResourceList<Pod>> {
  const queryParams = parsePaginationParams(params || {});

  if (params?.namespace) {
    queryParams += `&namespace=${encodeURIComponent(params.namespace)}`;
  }

  if (params?.search) {
    queryParams += `&search=${encodeURIComponent(params.search)}`;
  }

  const response = await apiClient.get<ApiResponse<ResourceList<Pod>>>(
    `/api/v1/pods?${queryParams}`,
  );
  return parseApiResponse(response.data, resourceListSchema(podSchema));
}

export async function getPod(namespace: string, name: string): Promise<Pod> {
  const response = await apiClient.get<ApiResponse<Pod>>(
    `/api/v1/pods/${encodeURIComponent(namespace)}/${encodeURIComponent(name)}`,
  );
  return parseApiResponse(response.data, podSchema);
}

export async function deletePod(namespace: string, name: string): Promise<void> {
  const response = await apiClient.delete<ApiResponse<void>>(
    `/api/v1/pods/${encodeURIComponent(namespace)}/${encodeURIComponent(name)}`,
  );
  parseApiResponse(response.data, apiResponseSchema(z.undefined()));
}

export async function getPodLogs(params: {
  namespace: string;
  podName: string;
  container?: string;
  tailLines?: number;
  sinceSeconds?: number;
  follow?: boolean;
}): Promise<PodLogs> {
  const queryParams = new URLSearchParams();

  if (params.container) {
    queryParams.set('container', params.container);
  }

  if (params.tailLines) {
    queryParams.set('tailLines', params.tailLines.toString());
  }

  if (params.sinceSeconds) {
    queryParams.set('sinceSeconds', params.sinceSeconds.toString());
  }

  if (params.follow) {
    queryParams.set('follow', 'true');
  }

  const response = await apiClient.get<ApiResponse<PodLogs>>(
    `/api/v1/pods/${encodeURIComponent(params.namespace)}/${encodeURIComponent(params.podName)}/logs?${queryParams.toString()}`,
  );
  return parseApiResponse(response.data, podLogsSchema);
}

export async function getPodYaml(namespace: string, name: string): Promise<ResourceYaml> {
  const response = await apiClient.get<ApiResponse<ResourceYaml>>(
    `/api/v1/pods/${encodeURIComponent(namespace)}/${encodeURIComponent(name)}/yaml`,
  );
  return parseApiResponse(
    response.data,
    apiResponseSchema(
      z.object({
        name: z.string(),
        kind: z.string(),
        namespace: z.string().optional(),
        yaml: z.string(),
      }),
    ),
  ).data;
}

export async function getPodEvents(namespace: string, name: string): Promise<any[]> {
  const response = await apiClient.get<ApiResponse<any[]>>(
    `/api/v1/pods/${encodeURIComponent(namespace)}/${encodeURIComponent(name)}/events`,
  );
  return parseApiResponse(response.data, apiResponseSchema(z.array(z.any()))).data;
}
