import apiClient from '@api/client';
import { z } from 'zod';
import { parseApiResponse, parsePaginationParams } from '@utils/apiResponse';
import { daemonSetSchema, apiResponseSchema, resourceListSchema } from '../types/schemas';
import type { DaemonSet, ResourceList, ResourceYaml } from '../types/api';

export async function getDaemonSets(params?: {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  namespace?: string;
  search?: string;
}): Promise<ResourceList<DaemonSet>> {
  let queryParams = parsePaginationParams(params || {});

  if (params?.namespace) {
    queryParams += `&namespace=${encodeURIComponent(params.namespace)}`;
  }

  if (params?.search) {
    queryParams += `&search=${encodeURIComponent(params.search)}`;
  }

  const response = await apiClient.get<ApiResponse<ResourceList<DaemonSet>>>(
    `/api/v1/daemonsets?${queryParams}`,
  );
  return parseApiResponse(response.data, resourceListSchema(daemonSetSchema));
}

export async function getDaemonSet(namespace: string, name: string): Promise<DaemonSet> {
  const response = await apiClient.get<ApiResponse<DaemonSet>>(
    `/api/v1/daemonsets/${encodeURIComponent(namespace)}/${encodeURIComponent(name)}`,
  );
  return parseApiResponse(response.data, daemonSetSchema);
}

export async function deleteDaemonSet(namespace: string, name: string): Promise<void> {
  const response = await apiClient.delete<ApiResponse<void>>(
    `/api/v1/daemonsets/${encodeURIComponent(namespace)}/${encodeURIComponent(name)}`,
  );
  parseApiResponse(response.data, apiResponseSchema(z.undefined()));
}

export async function getDaemonSetYaml(namespace: string, name: string): Promise<ResourceYaml> {
  const response = await apiClient.get<ApiResponse<ResourceYaml>>(
    `/api/v1/daemonsets/${encodeURIComponent(namespace)}/${encodeURIComponent(name)}/yaml`,
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
