import apiClient from '@api/client';
import { z } from 'zod';
import { parseApiResponse, parsePaginationParams } from '@utils/apiResponse';
import { apiResponseSchema, resourceListSchema, configMapSchema } from '../types/schemas';
import type { ConfigMap, ResourceList, ResourceYaml, ApiResponse } from '../types/api';

export async function getConfigMaps(params?: {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  namespace?: string;
  search?: string;
}): Promise<ResourceList<ConfigMap>> {
  let queryParams = parsePaginationParams(params || {});

  if (params?.namespace) {
    queryParams += `&namespace=${encodeURIComponent(params.namespace)}`;
  }

  if (params?.search) {
    queryParams += `&search=${encodeURIComponent(params.search)}`;
  }

  const response = await apiClient.get<ApiResponse<ResourceList<ConfigMap>>>(
    `/api/v1/configmaps?${queryParams}`,
  );
  return parseApiResponse(response.data, resourceListSchema(configMapSchema));
}

export async function getConfigMap(namespace: string, name: string): Promise<ConfigMap> {
  const response = await apiClient.get<ApiResponse<ConfigMap>>(
    `/api/v1/configmaps/${encodeURIComponent(namespace)}/${encodeURIComponent(name)}`,
  );
  return parseApiResponse(response.data, configMapSchema);
}

export async function deleteConfigMap(namespace: string, name: string): Promise<void> {
  const response = await apiClient.delete<ApiResponse<void>>(
    `/api/v1/configmaps/${encodeURIComponent(namespace)}/${encodeURIComponent(name)}`,
  );
  parseApiResponse(response.data, z.undefined());
}

export async function getConfigMapYaml(namespace: string, name: string): Promise<ResourceYaml> {
  const response = await apiClient.get<ApiResponse<ResourceYaml>>(
    `/api/v1/configmaps/${encodeURIComponent(namespace)}/${encodeURIComponent(name)}/yaml`,
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
