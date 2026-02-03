import { z } from 'zod';

export const apiResponseSchema = <T>(dataSchema: z.ZodType<T>) =>
  z.object({
    success: z.boolean(),
    data: dataSchema.optional(),
    error: z
      .object({
        type: z.string().optional(),
        title: z.string().optional(),
        detail: z.string().optional(),
        instance: z.string().optional(),
        status: z.number(),
        errorCode: z.string().optional(),
      })
      .optional(),
    message: z.string().optional(),
    status: z.number().optional(),
  });

export const resourceListSchema = <T>(itemSchema: z.ZodType<T>) =>
  z.object({
    kind: z.string(),
    apiVersion: z.string(),
    items: z.array(itemSchema),
    metadata: z
      .object({
        resourceVersion: z.number(),
        continueToken: z.string().optional(),
        remainingItemCount: z.number().optional(),
      })
      .optional(),
  });

export const objectMetadataSchema = z.object({
  name: z.string(),
  namespace: z.string().optional(),
  uid: z.string().optional(),
  resourceVersion: z.string().optional(),
  creationTimestamp: z.number().optional(),
  labels: z.record(z.string(), z.string()).optional(),
  annotations: z.record(z.string(), z.string()).optional(),
});

export const podContainerSchema = z.object({
  name: z.string(),
  image: z.string(),
  ready: z.boolean(),
  restartCount: z.number(),
  state: z.string().optional(),
});

export const podConditionSchema = z.object({
  type: z.string(),
  status: z.string(),
  reason: z.string().optional(),
  message: z.string().optional(),
  lastTransitionTime: z.number().optional(),
});

export const podSchema = z.object({
  name: z.string(),
  namespace: z.string(),
  status: z.string(),
  phase: z.string().optional(),
  nodeName: z.string().optional(),
  podIP: z.string().optional(),
  startTime: z.string().optional(),
  containers: z.array(podContainerSchema),
  conditions: z.array(podConditionSchema),
});

export const deploymentSchema = z.object({
  name: z.string(),
  namespace: z.string(),
  replicas: z.number(),
  readyReplicas: z.number(),
  availableReplicas: z.number(),
  updatedReplicas: z.number(),
  strategy: z.string().optional(),
  selector: z.string().optional(),
  template: z
    .object({
      labels: z.record(z.string(), z.string()).optional(),
      containers: z.array(podContainerSchema),
    })
    .optional(),
});

export const servicePortSchema = z.object({
  name: z.string().optional(),
  protocol: z.string(),
  port: z.number(),
  targetPort: z.number().optional(),
});

export const serviceEndpointSchema = z.object({
  ip: z.string(),
  ports: z.array(z.number()),
  ready: z.boolean(),
});

export const serviceSchema = z.object({
  name: z.string(),
  namespace: z.string(),
  type: z.string(),
  clusterIPs: z.array(z.string()),
  ports: z.array(servicePortSchema),
  selector: z.string().optional(),
  endpoints: z.array(serviceEndpointSchema),
});

export const namespaceSchema = z.object({
  name: z.string(),
  status: z.string(),
  creationTimestamp: z.number(),
  labels: z.record(z.string(), z.string()).optional(),
  annotations: z.record(z.string(), z.string()).optional(),
});

export const configMapSchema = z.object({
  name: z.string(),
  namespace: z.string(),
  creationTimestamp: z.number(),
  data: z.record(z.string(), z.string()).optional(),
  binaryData: z
    .record(z.string(), z.record(z.string(), z.string()))
    .optional(),
  labels: z.record(z.string(), z.string()).optional(),
});

export const secretSchema = z.object({
  name: z.string(),
  namespace: z.string(),
  type: z.string(),
  creationTimestamp: z.number(),
  data: z.record(z.string(), z.string()).optional(),
  labels: z.record(z.string(), z.string()).optional(),
  immutable: z.boolean().optional(),
});

export const statefulSetSchema = z.object({
  name: z.string(),
  namespace: z.string(),
  replicas: z.number(),
  readyReplicas: z.number(),
  currentReplicas: z.number(),
  selector: z.string().optional(),
});

export const daemonSetSchema = z.object({
  name: z.string(),
  namespace: z.string(),
  selector: z.string().optional(),
  replicas: z.number(),
  readyReplicas: z.number(),
  availableReplicas: z.number(),
});

export const jobSchema = z.object({
  name: z.string(),
  namespace: z.string(),
  status: z.string(),
  startTime: z.string().optional(),
  completionTime: z.string().optional(),
  active: z.number(),
  succeeded: z.number(),
  failed: z.number(),
});

export const cronJobSchema = z.object({
  name: z.string(),
  namespace: z.string(),
  schedule: z.string(),
  suspend: z.string().optional(),
  lastSchedule: z.string().optional(),
  nextSchedule: z.string().optional(),
  active: z.string().optional(),
  succeeded: z.number(),
  failed: z.number(),
});

export const logEntrySchema = z.object({
  timestamp: z.number(),
  message: z.string(),
  severity: z.string().optional(),
});

export const podLogsSchema = z.object({
  podName: z.string(),
  namespace: z.string(),
  containerName: z.string(),
  entries: z.array(logEntrySchema),
  hasMore: z.boolean(),
});

export const eventSchema = z.object({
  type: z.string(),
  reason: z.string(),
  message: z.string(),
  lastTimestamp: z.number().optional(),
  count: z.number(),
  source: z.string().optional(),
});

export const metricPointSchema = z.object({
  timestamp: z.number(),
  value: z.number(),
});

export const metricSummarySchema = z.object({
  average: z.number(),
  min: z.number(),
  max: z.number(),
  count: z.number(),
});

export const metricsResponseSchema = z.object({
  data: z.array(metricPointSchema),
  summary: metricSummarySchema,
});

export const resourceYamlSchema = z.object({
  name: z.string(),
  kind: z.string(),
  namespace: z.string().optional(),
  yaml: z.string(),
});

export const validationResultSchema = z.object({
  valid: z.boolean(),
  errors: z.array(
    z.object({
      path: z.string(),
      message: z.string(),
      code: z.string().optional(),
    }),
  ),
  warnings: z.array(
    z.object({
      path: z.string(),
      message: z.string(),
      code: z.string().optional(),
    }),
  ),
});

export const clusterSchema = z.object({
  name: z.string(),
  version: z.string(),
  platform: z.string(),
  nodesCount: z.number(),
  podsCount: z.number(),
  namespacesCount: z.number(),
});

export const nodeResourcesSchema = z.object({
  cpu: z.string(),
  memory: z.string(),
  pods: z.string().optional(),
});

export const nodeConditionSchema = z.object({
  type: z.string(),
  status: z.string(),
  reason: z.string().optional(),
  message: z.string().optional(),
  lastTransitionTime: z.number().optional(),
});

export const nodeSchema = z.object({
  name: z.string(),
  status: z.string(),
  roles: z.array(z.string()),
  capacity: nodeResourcesSchema,
  allocatable: nodeResourcesSchema,
  allocated: nodeResourcesSchema,
  conditions: z.array(nodeConditionSchema),
  creationTimestamp: z.number(),
  labels: z.record(z.string(), z.string()).optional(),
});

export const scaleDeploymentRequestSchema = z.object({
  replicas: z.number().min(0),
});

export const updateDeploymentImageRequestSchema = z.object({
  image: z.string(),
});

export const rollbackDeploymentRequestSchema = z.object({
  revision: z.string().optional(),
});

export const updateContainerResourcesRequestSchema = z.object({
  cpuRequest: z.string().optional(),
  cpuLimit: z.string().optional(),
  memoryRequest: z.string().optional(),
  memoryLimit: z.string().optional(),
});

export const updateContainerEnvRequestSchema = z.object({
  envVars: z.record(z.string(), z.string()),
});

export const updateStrategyRequestSchema = z.object({
  strategy: z.enum(['RollingUpdate', 'Recreate']),
  maxUnavailable: z.string().optional(),
  maxSurge: z.string().optional(),
});

export const cloneWorkloadRequestSchema = z.object({
  newName: z.string(),
  targetNamespace: z.string(),
});

export const alertThresholdSchema = z.object({
  metric: z.string(),
  threshold: z.number(),
  operator: z.enum(['gt', 'lt', 'eq']),
  duration: z.string().optional(),
});

export const alertSchema = z.object({
  id: z.string(),
  name: z.string(),
  severity: z.enum(['critical', 'warning', 'info']),
  message: z.string(),
  resourceType: z.string(),
  resourceName: z.string(),
  namespace: z.string(),
  triggeredAt: z.number(),
  resolvedAt: z.number().optional(),
});

export const promQLQueryRequestSchema = z.object({
  query: z.string(),
  start: z.number().optional(),
  end: z.number().optional(),
  step: z.string().optional(),
});

export const terminalSessionInfoSchema = z.object({
  sessionId: z.string(),
  namespace: z.string(),
  podName: z.string(),
  container: z.string(),
});

export const terminalResizeRequestSchema = z.object({
  rows: z.number().min(1),
  columns: z.number().min(1),
});

export const terminalCommandRequestSchema = z.object({
  command: z.string(),
});

export const userProfileSchema = z.object({
  id: z.number(),
  email: z.string().email(),
  name: z.string(),
  avatarUrl: z.string().optional(),
  createdAt: z.number(),
  lastLoginAt: z.number().optional(),
  roles: z.array(z.string()),
});

export const sessionSchema = z.object({
  id: z.number(),
  userId: z.number(),
  ipAddress: z.string(),
  userAgent: z.string(),
  createdAt: z.number(),
  lastActivityAt: z.number(),
  expiresAt: z.number(),
  active: z.boolean(),
});
