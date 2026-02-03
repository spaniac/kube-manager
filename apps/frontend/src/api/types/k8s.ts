/**
 * TypeScript interfaces matching backend DTOs.
 * Base types for all K8s resources.
 */

// Common types
export interface ObjectMetadata {
  name: string;
  namespace?: string;
  uid: string;
  resourceVersion: string;
  creationTimestamp: number;
  labels?: Record<string, string>;
  annotations?: Record<string, string>;
}

export interface K8sResource {
  kind: string;
  apiVersion: string;
  metadata: ObjectMetadata;
}

// User types
export interface UserProfile {
  id: number;
  email: string;
  name?: string;
  avatarUrl?: string;
  createdAt: number;
  lastLoginAt: number;
  roles: string[];
}

export interface Session {
  id: number;
  userId: number;
  ipAddress?: string;
  userAgent?: string;
  createdAt: number;
  lastActivityAt: number;
  expiresAt: number;
  active: boolean;
}

// Cluster types
export interface ClusterInfo {
  name: string;
  version: string;
  platform: string;
  architecture: string;
  metrics: ClusterMetrics;
}

export interface ClusterMetrics {
  totalNodes: number;
  readyNodes: number;
  totalPods: number;
  runningPods: number;
  cpuCapacity: string;
  memoryCapacity: string;
  storageCapacity: string;
}

export interface NodeInfo {
  name: string;
  status: string;
  version: string;
  os: string;
  architecture: string;
  kernelVersion: string;
  capacity: NodeCapacity;
  allocatable: NodeAllocatable;
  taints: string[];
  labels: string[];
}

export interface NodeCapacity {
  cpu: string;
  memory: string;
  pods: string;
  ephemeralStorage: string;
}

export interface NodeAllocatable {
  cpu: string;
  memory: string;
  pods: string;
  ephemeralStorage: string;
}

// Pod types
export interface Pod {
  name: string;
  namespace: string;
  status: string;
  phase: string;
  nodeName?: string;
  podIP?: string;
  startTime?: string;
  containers: PodContainer[];
  conditions: PodCondition[];
}

export interface PodContainer {
  name: string;
  image: string;
  ready: boolean;
  restartCount: number;
  state: string;
}

export interface PodCondition {
  type: string;
  status: string;
  reason?: string;
  message?: string;
  lastTransitionTime: number;
}

// Deployment types
export interface Deployment {
  name: string;
  namespace: string;
  replicas: number;
  readyReplicas: number;
  availableReplicas: number;
  updatedReplicas: number;
  strategy?: string;
  selector?: string;
  template?: PodTemplate;
}

export interface PodTemplate {
  labels?: Record<string, string>;
  containers: PodContainer[];
}

// Service types
export interface Service {
  name: string;
  namespace: string;
  type: string;
  clusterIPs: string[];
  ports: ServicePort[];
  selector?: Record<string, string>;
  endpoints: ServiceEndpoint[];
}

export interface ServicePort {
  name?: string;
  protocol: string;
  port: number;
  targetPort?: number;
}

export interface ServiceEndpoint {
  ip?: string;
  ports: number[];
  ready: boolean;
}

// Namespace types
export interface Namespace {
  name: string;
  status: string;
  creationTimestamp: number;
  labels?: Record<string, string>;
  annotations?: Record<string, string>;
}

// ConfigMap types
export interface ConfigMap {
  name: string;
  namespace: string;
  creationTimestamp: number;
  data?: Record<string, string>;
  binaryData?: Record<string, Record<string, string>>;
  labels?: Record<string, string>;
}

// Secret types
export interface Secret {
  name: string;
  namespace: string;
  type: string;
  creationTimestamp: number;
  data?: Record<string, string>;
  labels?: Record<string, string>;
  immutable?: boolean;
}

// Metrics types
export interface MetricPoint {
  timestamp: number;
  value: number;
}

export interface MetricSummary {
  average: number;
  min: number;
  max: number;
  count: number;
}

export interface MetricsResponse {
  data: MetricPoint[];
  summary: MetricSummary;
}

// Response wrapper
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
