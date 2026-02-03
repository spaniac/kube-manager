export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: ApiError;
  message?: string;
  status?: number;
}

export interface ApiError {
  type?: string;
  title?: string;
  detail?: string;
  instance?: string;
  status: number;
  errorCode?: string;
}

export interface ObjectMetadata {
  name: string;
  namespace?: string;
  uid?: string;
  resourceVersion?: string;
  creationTimestamp?: number;
  labels?: Record<string, string>;
  annotations?: Record<string, string>;
}

export interface K8sResource {
  kind: string;
  apiVersion: string;
  metadata: ObjectMetadata;
}

export interface PodContainer {
  name: string;
  image: string;
  ready: boolean;
  restartCount: number;
  state?: string;
}

export interface PodCondition {
  type: string;
  status: string;
  reason?: string;
  message?: string;
  lastTransitionTime?: number;
}

export interface Pod {
  name: string;
  namespace: string;
  status: string;
  phase?: string;
  nodeName?: string;
  podIP?: string;
  startTime?: string;
  containers: PodContainer[];
  conditions: PodCondition[];
}

export interface PodTemplate {
  labels?: Record<string, string>;
  containers: PodContainer[];
}

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

export interface ServicePort {
  name?: string;
  protocol: string;
  port: number;
  targetPort?: number;
}

export interface ServiceEndpoint {
  ip: string;
  ports: number[];
  ready: boolean;
}

export interface Service {
  name: string;
  namespace: string;
  type: string;
  clusterIPs: string[];
  ports: ServicePort[];
  selector?: string;
  endpoints: ServiceEndpoint[];
}

export interface Namespace {
  name: string;
  status: string;
  creationTimestamp: number;
  labels?: Record<string, string>;
  annotations?: Record<string, string>;
}

export interface ConfigMap {
  name: string;
  namespace: string;
  creationTimestamp: number;
  data?: Record<string, string>;
  binaryData?: Record<string, Record<string, string>>;
  labels?: Record<string, string>;
}

export interface Secret {
  name: string;
  namespace: string;
  type: string;
  creationTimestamp: number;
  data?: Record<string, string>;
  labels?: Record<string, string>;
  immutable?: boolean;
}

export interface StatefulSet {
  name: string;
  namespace: string;
  replicas: number;
  readyReplicas: number;
  currentReplicas: number;
  selector?: string;
}

export interface DaemonSet {
  name: string;
  namespace: string;
  selector?: string;
  replicas: number;
  readyReplicas: number;
  availableReplicas: number;
}

export interface ResourceQuota {
  cpuUsed: string;
  cpuHard: string;
  memoryUsed: string;
  memoryHard: string;
  podsUsed: string;
  podsHard: string;
}

export interface Job {
  name: string;
  namespace: string;
  status: string;
  startTime?: string;
  completionTime?: string;
  active: number;
  succeeded: number;
  failed: number;
}

export interface CronJob {
  name: string;
  namespace: string;
  schedule: string;
  suspend?: string;
  lastSchedule?: string;
  nextSchedule?: string;
  active?: string;
  succeeded: number;
  failed: number;
}

export interface WorkloadInfo {
  replicas: number;
  readyReplicas: number;
  availableReplicas: number;
  unavailableReplicas: number;
  updatedReplicas: number;
  image: string;
}

export interface WorkloadCondition {
  type: string;
  status: string;
  reason?: string;
  message?: string;
  lastTransitionTime?: number;
}

export interface WorkloadStatus {
  type: string;
  name: string;
  namespace: string;
  info: WorkloadInfo;
  conditions: WorkloadCondition[];
}

export interface ResourceListMeta {
  resourceVersion: number;
  continueToken?: string;
  remainingItemCount?: number;
}

export interface ResourceList<T> {
  kind: string;
  apiVersion: string;
  items: T[];
  metadata?: ResourceListMeta;
}

export interface LogEntry {
  timestamp: number;
  message: string;
  severity?: string;
}

export interface PodLogs {
  podName: string;
  namespace: string;
  containerName: string;
  entries: LogEntry[];
  hasMore: boolean;
}

export interface Event {
  type: string;
  reason: string;
  message: string;
  lastTimestamp?: number;
  count: number;
  source?: string;
}

export interface PodEvents {
  podName: string;
  namespace: string;
  events: Event[];
}

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

export interface ResourceYaml {
  name: string;
  kind: string;
  namespace?: string;
  yaml: string;
}

export interface DiffEntry {
  path: string;
  oldValue?: string;
  newValue?: string;
  operation: string;
}

export interface ResourceDiff {
  name: string;
  kind: string;
  changes: DiffEntry[];
}

export interface ValidationError {
  path: string;
  message: string;
  code?: string;
}

export interface ValidationWarning {
  path: string;
  message: string;
  code?: string;
}

export interface ValidationResult {
  valid: boolean;
  errors: ValidationError[];
  warnings: ValidationWarning[];
}

export interface Cluster {
  name: string;
  version: string;
  platform: string;
  nodesCount: number;
  podsCount: number;
  namespacesCount: number;
}

export interface Node {
  name: string;
  status: string;
  roles: string[];
  capacity: NodeResources;
  allocatable: NodeResources;
  allocated: NodeResources;
  conditions: NodeCondition[];
  creationTimestamp: number;
  labels?: Record<string, string>;
}

export interface NodeResources {
  cpu: string;
  memory: string;
  pods?: string;
}

export interface NodeCondition {
  type: string;
  status: string;
  reason?: string;
  message?: string;
  lastTransitionTime?: number;
}

export interface WorkloadCreateRequest {
  yaml: string;
  namespace?: string;
  dryRun?: boolean;
}

export interface WorkloadCreateResponse {
  name: string;
  kind: string;
  namespace: string;
  message: string;
}

export interface ScaleDeploymentRequest {
  replicas: number;
}

export interface UpdateDeploymentImageRequest {
  image: string;
}

export interface RollbackDeploymentRequest {
  revision?: string;
}

export interface UpdateContainerResourcesRequest {
  cpuRequest?: string;
  cpuLimit?: string;
  memoryRequest?: string;
  memoryLimit?: string;
}

export interface UpdateContainerEnvRequest {
  envVars: Record<string, string>;
}

export interface UpdateStrategyRequest {
  strategy: string;
  maxUnavailable?: string;
  maxSurge?: string;
}

export interface CloneWorkloadRequest {
  newName: string;
  targetNamespace: string;
}

export interface AlertThreshold {
  metric: string;
  threshold: number;
  operator: 'gt' | 'lt' | 'eq';
  duration?: string;
}

export interface Alert {
  id: string;
  name: string;
  severity: 'critical' | 'warning' | 'info';
  message: string;
  resourceType: string;
  resourceName: string;
  namespace: string;
  triggeredAt: number;
  resolvedAt?: number;
}

export interface AnomalyDetection {
  timestamp: number;
  metric: string;
  value: number;
  expectedRange: [number, number];
  severity: 'high' | 'medium' | 'low';
}

export interface PromQLQueryRequest {
  query: string;
  start?: number;
  end?: number;
  step?: string;
}

export interface PromQLQueryResult {
  result: MetricPoint[];
  status: string;
}

export interface TimeSeriesRequest {
  startTime: number;
  endTime: number;
  step?: string;
}

export interface TimeSeries {
  metric: Record<string, string>;
  values: MetricPoint[];
}

export interface TerminalSessionInfo {
  sessionId: string;
  namespace: string;
  podName: string;
  container: string;
}

export interface TerminalResizeRequest {
  rows: number;
  columns: number;
}

export interface TerminalCommandRequest {
  command: string;
}

export interface TerminalSession {
  sessionId: string;
  namespace: string;
  podName: string;
  container: string;
}

export interface TerminalTheme {
  name: string;
  background: string;
  foreground: string;
  cursor: string;
  colors: string[];
}
