import apiClient from '@api/client';
import { z } from 'zod';
import { parseApiResponse, parsePaginationParams } from '@utils/apiResponse';
import { serviceSchema, apiResponseSchema, resourceListSchema } from '../types/schemas';
import type { Service, ResourceList, ResourceYaml } from '../types/api';

export async function getServices(params?: {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  namespace?: string;
  search?: string;
}): Promise<ResourceList<Service>> {
  let queryParams = parsePaginationParams(params || {});

  if (params?.namespace) {
    queryParams += `&namespace=${encodeURIComponent(params.namespace)}`;
  }

  if (params?.search) {
    queryParams += `&search=${encodeURIComponent(params.search)}`;
  }

  const response = await apiClient.get<ApiResponse<ResourceList<Service>>>(
    `/api/v1/services?${queryParams}`,
  );
  return parseApiResponse(response.data, resourceListSchema(serviceSchema));
}

export async function getService(namespace: string, name: string): Promise<Service> {
  const response = await apiClient.get<ApiResponse<Service>>(
    `/api/v1/services/${encodeURIComponent(namespace)}/${encodeURIComponent(name)}`,
  );
  return parseApiResponse(response.data, serviceSchema);
}

export async function deleteService(namespace: string, name: string): Promise<void> {
  const response = await apiClient.delete<ApiResponse<void>>(
    `/api/v1/services/${encodeURIComponent(namespace)}/${encodeURIComponent(name)}`,
  );
  parseApiResponse(response.data, apiResponseSchema(z.undefined()));
}

export async function getServiceYaml(namespace: string, name: string): Promise<ResourceYaml> {
  const response = await apiClient.get<ApiResponse<ResourceYaml>>(
    `/api/v1/services/${encodeURIComponent(namespace)}/${encodeURIComponent(name)}/yaml`,
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
