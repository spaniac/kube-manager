import apiClient from '@api/client';
import { z } from 'zod';
import { parseApiResponse, parsePaginationParams } from '@utils/apiResponse';
import { namespaceSchema, apiResponseSchema, resourceListSchema } from '../types/schemas';
import type { Namespace, ResourceList, ApiResponse } from '../types/api';

export async function getNamespaces(params?: {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  search?: string;
}): Promise<ResourceList<Namespace>> {
  let queryParams = parsePaginationParams(params || {});

  if (params?.search) {
    queryParams += `&search=${encodeURIComponent(params.search)}`;
  }

  const response = await apiClient.get<ApiResponse<ResourceList<Namespace>>>(
    `/api/v1/namespaces?${queryParams}`,
  );
  return parseApiResponse(response.data, resourceListSchema(namespaceSchema));
}

export async function getNamespace(name: string): Promise<Namespace> {
  const response = await apiClient.get<ApiResponse<Namespace>>(
    `/api/v1/namespaces/${encodeURIComponent(name)}`,
  );
  return parseApiResponse(response.data, namespaceSchema);
}

export async function createNamespace(
  namespace: Omit<Namespace, 'name' | 'status' | 'creationTimestamp'> & {
    name: string;
  },
): Promise<Namespace> {
  const response = await apiClient.post<ApiResponse<Namespace>>(
    '/api/v1/namespaces',
    namespace,
  );
  return parseApiResponse(response.data, namespaceSchema);
}

export async function updateNamespace(
  name: string,
  updates: Partial<
    Pick<Namespace, 'labels' | 'annotations'>
  >,
): Promise<Namespace> {
  const response = await apiClient.put<ApiResponse<Namespace>>(
    `/api/v1/namespaces/${encodeURIComponent(name)}`,
    updates,
  );
  return parseApiResponse(response.data, namespaceSchema);
}

export async function deleteNamespace(
  name: string,
): Promise<{ message: string }> {
  const response = await apiClient.delete<ApiResponse<{ message: string }>>(
    `/api/v1/namespaces/${encodeURIComponent(name)}`,
  );
  return parseApiResponse(
    response.data,
    apiResponseSchema(z.object({ message: z.string() })),
  );
}

export async function getNamespaceQuota(
  name: string,
): Promise<{
  cpuUsed: string;
  cpuHard: string;
  memoryUsed: string;
  memoryHard: string;
  podsUsed: string;
  podsHard: string;
}> {
  const response = await apiClient.get<
    ApiResponse<{
      cpuUsed: string;
      cpuHard: string;
      memoryUsed: string;
      memoryHard: string;
      podsUsed: string;
      podsHard: string;
    }>
  >(`/api/v1/namespaces/${encodeURIComponent(name)}/quota`);

  return parseApiResponse(
    response.data,
    apiResponseSchema(
      z.object({
        cpuUsed: z.string(),
        cpuHard: z.string(),
        memoryUsed: z.string(),
        memoryHard: z.string(),
        podsUsed: z.string(),
        podsHard: z.string(),
      }),
    ),
  );
}

export async function updateNamespaceQuota(
  name: string,
  quota: {
    cpuHard?: string;
    memoryHard?: string;
    podsHard?: string;
  },
): Promise<{ message: string }> {
  const response = await apiClient.put<ApiResponse<{ message: string }>>(
    `/api/v1/namespaces/${encodeURIComponent(name)}/quota`,
    quota,
  );
  return parseApiResponse(
    response.data,
    apiResponseSchema(z.object({ message: z.string() })),
  );
}
