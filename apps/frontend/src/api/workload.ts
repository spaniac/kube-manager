import apiClient from '@api/client';
import { z } from 'zod';
import { parseApiResponse } from '@utils/apiResponse';
import {
  apiResponseSchema,
} from '../types/schemas';
import type {
  WorkloadCreateRequest,
  WorkloadCreateResponse,
  UpdateContainerResourcesRequest,
  UpdateContainerEnvRequest,
  UpdateStrategyRequest,
  CloneWorkloadRequest,
} from '../types/api';

export async function createWorkload(
  request: WorkloadCreateRequest,
): Promise<WorkloadCreateResponse> {
  const response = await apiClient.post<ApiResponse<WorkloadCreateResponse>>(
    '/api/v1/workloads',
    request,
  );
  return parseApiResponse(
    response.data,
    apiResponseSchema(
      z.object({
        name: z.string(),
        kind: z.string(),
        namespace: z.string(),
        message: z.string(),
      }),
    ),
  ).data;
}

export async function pauseDeployment(
  namespace: string,
  name: string,
): Promise<{ message: string }> {
  const response = await apiClient.post<ApiResponse<{ message: string }>>(
    `/api/v1/deployments/${encodeURIComponent(namespace)}/${encodeURIComponent(name)}/pause`,
  );
  return parseApiResponse(
    response.data,
    apiResponseSchema(z.object({ message: z.string() })),
  );
}

export async function resumeDeployment(
  namespace: string,
  name: string,
): Promise<{ message: string }> {
  const response = await apiClient.post<ApiResponse<{ message: string }>>(
    `/api/v1/deployments/${encodeURIComponent(namespace)}/${encodeURIComponent(name)}/resume`,
  );
  return parseApiResponse(
    response.data,
    apiResponseSchema(z.object({ message: z.string() })),
  );
}

export async function updateDeploymentStrategy(
  namespace: string,
  name: string,
  request: UpdateStrategyRequest,
): Promise<{ message: string }> {
  const response = await apiClient.put<ApiResponse<{ message: string }>>(
    `/api/v1/deployments/${encodeURIComponent(namespace)}/${encodeURIComponent(name)}/strategy`,
    request,
  );
  return parseApiResponse(
    response.data,
    apiResponseSchema(z.object({ message: z.string() })),
  );
}

export async function getDeploymentRevisions(
  namespace: string,
  name: string,
): Promise<Array<{ revision: number; annotations: Record<string, string> }>> {
  const response = await apiClient.get<
    ApiResponse<Array<{ revision: number; annotations: Record<string, string> }>>
  >(
    `/api/v1/deployments/${encodeURIComponent(namespace)}/${encodeURIComponent(name)}/revisions`,
  );
  return parseApiResponse(
    response.data,
    apiResponseSchema(
      z.array(
        z.object({
          revision: z.number(),
          annotations: z.record(z.string()),
        }),
      ),
    ),
  );
}

export async function updateContainerResources(
  namespace: string,
  name: string,
  containerName: string,
  request: UpdateContainerResourcesRequest,
): Promise<{ message: string }> {
  const response = await apiClient.put<ApiResponse<{ message: string }>>(
    `/api/v1/deployments/${encodeURIComponent(namespace)}/${encodeURIComponent(name)}/containers/${encodeURIComponent(containerName)}/resources`,
    request,
  );
  return parseApiResponse(
    response.data,
    apiResponseSchema(z.object({ message: z.string() })),
  );
}

export async function updateContainerEnvVars(
  namespace: string,
  name: string,
  containerName: string,
  request: UpdateContainerEnvRequest,
): Promise<{ message: string }> {
  const response = await apiClient.put<ApiResponse<{ message: string }>>(
    `/api/v1/deployments/${encodeURIComponent(namespace)}/${encodeURIComponent(name)}/containers/${encodeURIComponent(containerName)}/env`,
    request,
  );
  return parseApiResponse(
    response.data,
    apiResponseSchema(z.object({ message: z.string() })),
  );
}

export async function cloneDeployment(
  namespace: string,
  name: string,
  request: CloneWorkloadRequest,
): Promise<{ message: string; name: string; namespace: string }> {
  const response = await apiClient.post<
    ApiResponse<{ message: string; name: string; namespace: string }>
  >(
    `/api/v1/deployments/${encodeURIComponent(namespace)}/${encodeURIComponent(name)}/clone`,
    request,
  );
  return parseApiResponse(
    response.data,
    apiResponseSchema(
      z.object({
        message: z.string(),
        name: z.string(),
        namespace: z.string(),
      }),
    ),
  );
}

export async function getJobs(params?: {
  page?: number;
  limit?: number;
  namespace?: string;
  search?: string;
}): Promise<{ items: Array<{ name: string; namespace: string; status: string; active: number; succeeded: number; failed: number }>; total: number }> {
  const queryParams = new URLSearchParams();
  if (params?.page) queryParams.append('page', params.page.toString());
  if (params?.limit) queryParams.append('limit', params.limit.toString());
  if (params?.namespace) queryParams.append('namespace', params.namespace);
  if (params?.search) queryParams.append('search', params.search);

  const response = await apiClient.get<
    ApiResponse<{
      items: Array<{
        name: string;
        namespace: string;
        status: string;
        active: number;
        succeeded: number;
        failed: number;
      }>;
      total: number;
    }>
  >(`/api/v1/jobs?${queryParams.toString()}`);
  return parseApiResponse(
    response.data,
    apiResponseSchema(
      z.object({
        items: z.array(
          z.object({
            name: z.string(),
            namespace: z.string(),
            status: z.string(),
            active: z.number(),
            succeeded: z.number(),
            failed: z.number(),
          }),
        ),
        total: z.number(),
      }),
    ),
  );
}

export async function getCronJobs(params?: {
  page?: number;
  limit?: number;
  namespace?: string;
  search?: string;
}): Promise<{ items: Array<{ name: string; namespace: string; schedule: string; suspend: boolean; succeeded: number; failed: number }>; total: number }> {
  const queryParams = new URLSearchParams();
  if (params?.page) queryParams.append('page', params.page.toString());
  if (params?.limit) queryParams.append('limit', params.limit.toString());
  if (params?.namespace) queryParams.append('namespace', params.namespace);
  if (params?.search) queryParams.append('search', params.search);

  const response = await apiClient.get<
    ApiResponse<{
      items: Array<{
        name: string;
        namespace: string;
        schedule: string;
        suspend: boolean;
        succeeded: number;
        failed: number;
      }>;
      total: number;
    }>
  >(`/api/v1/cronjobs?${queryParams.toString()}`);
  return parseApiResponse(
    response.data,
    apiResponseSchema(
      z.object({
        items: z.array(
          z.object({
            name: z.string(),
            namespace: z.string(),
            schedule: z.string(),
            suspend: z.boolean(),
            succeeded: z.number(),
            failed: z.number(),
          }),
        ),
        total: z.number(),
      }),
    ),
  );
}

export async function getPodDisruptionBudgets(params?: {
  page?: number;
  limit?: number;
  namespace?: string;
}): Promise<{ items: Array<{ name: string; namespace: string; minAvailable: number; maxUnavailable: number; currentHealthy: number; desiredHealthy: number }>; total: number }> {
  const queryParams = new URLSearchParams();
  if (params?.page) queryParams.append('page', params.page.toString());
  if (params?.limit) queryParams.append('limit', params.limit.toString());
  if (params?.namespace) queryParams.append('namespace', params.namespace);

  const response = await apiClient.get<
    ApiResponse<{
      items: Array<{
        name: string;
        namespace: string;
        minAvailable: number;
        maxUnavailable: number;
        currentHealthy: number;
        desiredHealthy: number;
      }>;
      total: number;
    }>
  >(`/api/v1/poddisruptionbudgets?${queryParams.toString()}`);
  return parseApiResponse(
    response.data,
    apiResponseSchema(
      z.object({
        items: z.array(
          z.object({
            name: z.string(),
            namespace: z.string(),
            minAvailable: z.number(),
            maxUnavailable: z.number(),
            currentHealthy: z.number(),
            desiredHealthy: z.number(),
          }),
        ),
        total: z.number(),
      }),
    ),
  );
}

export async function createPodDisruptionBudget(
  namespace: string,
  name: string,
  minAvailable?: number,
  maxUnavailable?: number,
  selector?: Record<string, string>,
): Promise<{ message: string }> {
  const response = await apiClient.post<ApiResponse<{ message: string }>>(
    '/api/v1/poddisruptionbudgets',
    {
      namespace,
      name,
      minAvailable,
      maxUnavailable,
      selector,
    },
  );
  return parseApiResponse(
    response.data,
    apiResponseSchema(z.object({ message: z.string() })),
  );
}

export async function deletePodDisruptionBudget(
  namespace: string,
  name: string,
): Promise<{ message: string }> {
  const response = await apiClient.delete<ApiResponse<{ message: string }>>(
    `/api/v1/poddisruptionbudgets/${encodeURIComponent(namespace)}/${encodeURIComponent(name)}`,
  );
  return parseApiResponse(
    response.data,
    apiResponseSchema(z.object({ message: z.string() })),
  );
}
