import apiClient from './client';
import { parseApiResponse } from '../utils/apiResponse';
import { z } from 'zod';
import type { ApiResponse } from '../types/api';

export type MetricsRange = '1h' | '6h' | '24h' | '7d' | '30d';
export type MetricsStep = '30s' | '60s' | '300s' | '600s' | '900s';
export type MetricsType = 'cpu' | 'memory' | 'network' | 'storage';

const metricPointSchema = z.object({
  timestamp: z.string(),
  value: z.number(),
});

const metricSummarySchema = z.object({
  average: z.number(),
  min: z.number(),
  max: z.number(),
  count: z.number(),
});

const metricsResponseSchema = z.object({
  data: z.array(metricPointSchema),
  summary: metricSummarySchema,
});

const timeSeriesSchema = z.object({
  metricType: z.string(),
  range: z.string(),
  startTime: z.string(),
  endTime: z.string(),
  data: z.array(metricPointSchema),
  summary: metricSummarySchema,
});

const promQLResultSchema = z.object({
  query: z.string(),
  range: z.string().nullable().optional(),
  data: z.array(metricPointSchema),
  summary: metricSummarySchema,
  error: z.string().nullable().optional(),
});

export type MetricPoint = z.infer<typeof metricPointSchema>;
export type MetricSummary = z.infer<typeof metricSummarySchema>;
export type MetricsResponseDTO = z.infer<typeof metricsResponseSchema>;
export type TimeSeriesDTO = z.infer<typeof timeSeriesSchema>;

export async function getNetworkMetrics(namespace: string, name: string): Promise<{ metrics: MetricsResponseDTO; latencyMs: number }> {
  const start = performance.now();
  const response = await apiClient.get<ApiResponse<MetricsResponseDTO>>(
    `/api/v1/metrics/network/${encodeURIComponent(namespace)}/${encodeURIComponent(name)}`,
  );
  const metrics = parseApiResponse(response.data, metricsResponseSchema);
  return { metrics, latencyMs: Math.round(performance.now() - start) };
}

export async function getHistoricalMetrics(params: {
  namespace: string;
  name: string;
  range: MetricsRange;
  metricType: MetricsType;
  step: MetricsStep;
}): Promise<{ series: TimeSeriesDTO; latencyMs: number }> {
  const start = performance.now();
  const query = new URLSearchParams({
    range: params.range,
    metricType: params.metricType,
    step: params.step,
  }).toString();

  const response = await apiClient.get<ApiResponse<TimeSeriesDTO>>(
    `/api/v1/metrics/history/${encodeURIComponent(params.namespace)}/${encodeURIComponent(params.name)}?${query}`,
  );
  const series = parseApiResponse(response.data, timeSeriesSchema);
  return { series, latencyMs: Math.round(performance.now() - start) };
}

export async function executePromQLQuery(query: string, range: MetricsRange): Promise<{ result: z.infer<typeof promQLResultSchema>; latencyMs: number }> {
  const start = performance.now();
  const response = await apiClient.post<ApiResponse<z.infer<typeof promQLResultSchema>>>(
    '/api/v1/metrics/promql/query',
    { query, range },
  );
  const result = parseApiResponse(response.data, promQLResultSchema);
  return { result, latencyMs: Math.round(performance.now() - start) };
}
