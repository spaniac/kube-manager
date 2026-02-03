import apiClient from '@api/client';
import { z } from 'zod';
import { parseApiResponse, parsePaginationParams } from '@utils/apiResponse';
import { secretSchema, apiResponseSchema, resourceListSchema } from '../types/schemas';
import type { Secret, ResourceList, ResourceYaml } from '../types/api';

export async function getSecrets(params?: {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  namespace?: string;
  search?: string;
}): Promise<ResourceList<Secret>> {
  const queryParams = parsePaginationParams(params || {});

  if (params?.namespace) {
    queryParams += `&namespace=${encodeURIComponent(params.namespace)}`;
  }

  if (params?.search) {
    queryParams += `&search=${encodeURIComponent(params.search)}`;
  }

  const response = await apiClient.get<ApiResponse<ResourceList<Secret>>>(
    `/api/v1/secrets?${queryParams}`,
  );
  return parseApiResponse(response.data, resourceListSchema(secretSchema));
}

export async function getSecret(namespace: string, name: string): Promise<Secret> {
  const response = await apiClient.get<ApiResponse<Secret>>(
    `/api/v1/secrets/${encodeURIComponent(namespace)}/${encodeURIComponent(name)}`,
  );
  return parseApiResponse(response.data, secretSchema);
}

export async function deleteSecret(namespace: string, name: string): Promise<void> {
  const response = await apiClient.delete<ApiResponse<void>>(
    `/api/v1/secrets/${encodeURIComponent(namespace)}/${encodeURIComponent(name)}`,
  );
  parseApiResponse(response.data, apiResponseSchema(z.undefined()));
}

export async function getSecretYaml(namespace: string, name: string): Promise<ResourceYaml> {
  const response = await apiClient.get<ApiResponse<ResourceYaml>>(
    `/api/v1/secrets/${encodeURIComponent(namespace)}/${encodeURIComponent(name)}/yaml`,
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
