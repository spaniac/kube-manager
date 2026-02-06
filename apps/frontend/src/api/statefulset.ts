import apiClient from '@api/client';
import { z } from 'zod';
import { parseApiResponse, parsePaginationParams } from '@utils/apiResponse';
import { resourceListSchema, statefulSetSchema } from '../types/schemas';
import type { StatefulSet, ResourceList, ResourceYaml, ApiResponse } from '../types/api';

export async function getStatefulSets(params?: {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  namespace?: string;
  search?: string;
}): Promise<ResourceList<StatefulSet>> {
  let queryParams = parsePaginationParams(params || {});

  if (params?.namespace) {
    queryParams += `&namespace=${encodeURIComponent(params.namespace)}`;
  }

  if (params?.search) {
    queryParams += `&search=${encodeURIComponent(params.search)}`;
  }

  const response = await apiClient.get<ApiResponse<ResourceList<StatefulSet>>>(
    `/api/v1/statefulsets?${queryParams}`,
  );
  return parseApiResponse(response.data, resourceListSchema(statefulSetSchema));
}

export async function getStatefulSet(namespace: string, name: string): Promise<StatefulSet> {
  const response = await apiClient.get<ApiResponse<StatefulSet>>(
    `/api/v1/statefulsets/${encodeURIComponent(namespace)}/${encodeURIComponent(name)}`,
  );
  return parseApiResponse(response.data, statefulSetSchema);
}

export async function scaleStatefulSet(
  namespace: string,
  name: string,
  replicas: number,
): Promise<{ message: string }> {
  const response = await apiClient.put<ApiResponse<{ message: string }>>(
    `/api/v1/statefulsets/${encodeURIComponent(namespace)}/${encodeURIComponent(name)}/scale`,
    { replicas },
  );
  return parseApiResponse(
    response.data,
    z.object({ message: z.string() }),
  );
}

export async function deleteStatefulSet(namespace: string, name: string): Promise<void> {
  const response = await apiClient.delete<ApiResponse<void>>(
    `/api/v1/statefulsets/${encodeURIComponent(namespace)}/${encodeURIComponent(name)}`,
  );
  parseApiResponse(response.data, z.undefined());
}

export async function getStatefulSetYaml(namespace: string, name: string): Promise<ResourceYaml> {
  const response = await apiClient.get<ApiResponse<ResourceYaml>>(
    `/api/v1/statefulsets/${encodeURIComponent(namespace)}/${encodeURIComponent(name)}/yaml`,
  );
  return parseApiResponse(
    response.data,
    z.object({
        name: z.string(),
        kind: z.string(),
        namespace: z.string().optional(),
        yaml: z.string(),
      }),
  );
}
