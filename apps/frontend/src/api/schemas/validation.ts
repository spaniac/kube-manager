import { z } from 'zod';

/**
 * Zod schemas for API response validation.
 * Matches backend DTO structure.
 */

// Common schemas
export const objectMetadataSchema = z.object({
  name: z.string(),
  namespace: z.string().optional(),
  uid: z.string(),
  resourceVersion: z.string(),
  creationTimestamp: z.number(),
  labels: z.record(z.string(), z.string()).optional(),
  annotations: z.record(z.string(), z.string()).optional(),
});

export const k8sResourceSchema = z.object({
  kind: z.string(),
  apiVersion: z.string(),
  metadata: objectMetadataSchema,
});

// User schemas
export const userProfileSchema = z.object({
  id: z.number(),
  email: z.string().email(),
  name: z.string().optional(),
  avatarUrl: z.string().url().optional(),
  createdAt: z.number(),
  lastLoginAt: z.number(),
  roles: z.array(z.string()),
});

export const sessionSchema = z.object({
  id: z.number(),
  userId: z.number(),
  ipAddress: z.string().ip().optional(),
  userAgent: z.string().optional(),
  createdAt: z.number(),
  lastActivityAt: z.number(),
  expiresAt: z.number(),
  active: z.boolean(),
});

// Cluster schemas
export const clusterMetricsSchema = z.object({
  totalNodes: z.number().int(),
  readyNodes: z.number().int(),
  totalPods: z.number().int(),
  runningPods: z.number().int(),
  cpuCapacity: z.string(),
  memoryCapacity: z.string(),
  storageCapacity: z.string(),
});

export const clusterInfoSchema = z.object({
  name: z.string(),
  version: z.string(),
  platform: z.string(),
  architecture: z.string(),
  metrics: clusterMetricsSchema,
});

export const nodeCapacitySchema = z.object({
  cpu: z.string(),
  memory: z.string(),
  pods: z.string(),
  ephemeralStorage: z.string(),
});

export const nodeAllocatableSchema = z.object({
  cpu: z.string(),
  memory: z.string(),
  pods: z.string(),
  ephemeralStorage: z.string(),
});

export const nodeInfoSchema = z.object({
  name: z.string(),
  status: z.string(),
  version: z.string(),
  os: z.string(),
  architecture: z.string(),
  kernelVersion: z.string(),
  capacity: nodeCapacitySchema,
  allocatable: nodeAllocatableSchema,
  taints: z.array(z.string()),
  labels: z.array(z.string()),
});

// Pod schemas
export const podContainerSchema = z.object({
  name: z.string(),
  image: z.string(),
  ready: z.boolean(),
  restartCount: z.number().int(),
  state: z.string(),
});

export const podConditionSchema = z.object({
  type: z.string(),
  status: z.string(),
  reason: z.string().optional(),
  message: z.string().optional(),
  lastTransitionTime: z.number(),
});

export const podSchema = z.object({
  name: z.string(),
  namespace: z.string(),
  status: z.string(),
  phase: z.string(),
  nodeName: z.string().optional(),
  podIP: z.string().optional(),
  startTime: z.string().optional(),
  containers: z.array(podContainerSchema),
  conditions: z.array(podConditionSchema),
});

// Deployment schemas
export const deploymentSchema = z.object({
  name: z.string(),
  namespace: z.string(),
  replicas: z.number().int(),
  readyReplicas: z.number().int(),
  availableReplicas: z.number().int(),
  updatedReplicas: z.number().int(),
  strategy: z.string().optional(),
  selector: z.string().optional(),
  template: z.object({
    labels: z.record(z.string(), z.string()).optional(),
    containers: z.array(podContainerSchema).optional(),
  }).optional(),
});

// Service schemas
export const servicePortSchema = z.object({
  name: z.string().optional(),
  protocol: z.string(),
  port: z.number().int(),
  targetPort: z.number().int().optional(),
});

export const serviceEndpointSchema = z.object({
  ip: z.string().optional(),
  ports: z.array(z.number()),
  ready: z.boolean(),
});

export const serviceSchema = z.object({
  name: z.string(),
  namespace: z.string(),
  type: z.string(),
  clusterIPs: z.array(z.string()),
  ports: z.array(servicePortSchema),
  selector: z.record(z.string(), z.string()).optional(),
  endpoints: z.array(serviceEndpointSchema),
});

// Namespace schemas
export const namespaceSchema = z.object({
  name: z.string(),
  status: z.string(),
  creationTimestamp: z.number(),
  labels: z.record(z.string(), z.string()).optional(),
  annotations: z.record(z.string(), z.string()).optional(),
});

// ConfigMap schemas
export const configMapSchema = z.object({
  name: z.string(),
  namespace: z.string(),
  creationTimestamp: z.number(),
  data: z.record(z.string(), z.string()).optional(),
  binaryData: z.record(z.string(), z.record(z.string(), z.string())).optional(),
  labels: z.record(z.string(), z.string()).optional(),
});

// Secret schemas
export const secretSchema = z.object({
  name: z.string(),
  namespace: z.string(),
  type: z.string(),
  creationTimestamp: z.number(),
  data: z.record(z.string(), z.string()).optional(),
  labels: z.record(z.string(), z.string()).optional(),
  immutable: z.boolean().optional(),
});

// Metrics schemas
export const metricPointSchema = z.object({
  timestamp: z.number(),
  value: z.number(),
});

export const metricSummarySchema = z.object({
  average: z.number(),
  min: z.number(),
  max: z.number(),
  count: z.number().int(),
});

export const metricsResponseSchema = z.object({
  data: z.array(metricPointSchema),
  summary: metricSummarySchema,
});

// API Response schema
export const apiResponseSchema = <T>(dataSchema: z.ZodType<T>) =>
  z.object({
    success: z.boolean(),
    data: dataSchema.optional(),
    error: z.string().optional(),
    message: z.string().optional(),
  });

// Type exports
export type ObjectMetadata = z.infer<typeof objectMetadataSchema>;
export type UserProfile = z.infer<typeof userProfileSchema>;
export type Session = z.infer<typeof sessionSchema>;
export type ClusterInfo = z.infer<typeof clusterInfoSchema>;
export type NodeInfo = z.infer<typeof nodeInfoSchema>;
export type Pod = z.infer<typeof podSchema>;
export type Deployment = z.infer<typeof deploymentSchema>;
export type Service = z.infer<typeof serviceSchema>;
export type Namespace = z.infer<typeof namespaceSchema>;
export type ConfigMap = z.infer<typeof configMapSchema>;
export type Secret = z.infer<typeof secretSchema>;
export type MetricsResponse = z.infer<typeof metricsResponseSchema>;
export type ApiResponse<T> = z.infer<ReturnType<typeof apiResponseSchema<T>>>;
