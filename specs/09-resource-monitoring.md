# Resource Monitoring

## Overview

Resource Monitoring provides comprehensive metrics collection, querying, anomaly detection, and alerting for Kubernetes resources including pods, nodes, and workloads.

---

## Features

1. **Real-time Metrics** - CPU, Memory, Network, Storage with live updates
2. **Historical Metrics** - Time series data with customizable ranges
3. **PromQL Queries** - Execute custom Prometheus queries
4. **Anomaly Detection** - AI-powered pattern detection
5. **Alert Configuration** - Threshold-based alerting
6. **Alert History** - Track triggered alerts and acknowledgments
7. **Metrics Export** - Export metrics as CSV or JSON
8. **Dashboard Integration** - Pre-built dashboards with Grafana

---

## API Endpoints

### Get Pod Metrics

```http
GET /api/v1/metrics/pods/{namespace}/{name}?metricType={type}
Authorization: Bearer <access_token>
```

**Query Parameters:**
- `metricType` (optional, default: `cpu`) - Type of metric: `cpu`, `memory`, `network`, `storage`

Response:
```json
{
  "success": true,
  "data": {
    "namespace": "production",
    "podName": "api-server-abc123",
    "metricType": "cpu",
    "current": {
      "value": 0.5,
      "unit": "cores",
      "timestamp": "2024-02-06T14:30:00Z"
    },
    "average": {
      "value": 0.45,
      "unit": "cores",
      "range": "1h"
    },
    "maximum": {
      "value": 0.8,
      "unit": "cores",
      "range": "1h"
    },
    "requests": {
      "value": 0.5,
      "unit": "cores"
    },
    "limits": {
      "value": 1.0,
      "unit": "cores"
    },
    "containers": [
      {
        "name": "nginx",
        "current": {
          "value": 0.25,
          "unit": "cores"
        }
      }
    ]
  }
}
```

### Get Node Metrics

```http
GET /api/v1/metrics/nodes/{name}?metricType={type}
Authorization: Bearer <access_token>
```

Response:
```json
{
  "success": true,
  "data": {
    "nodeName": "worker-1",
    "metricType": "cpu",
    "current": {
      "value": 2.5,
      "unit": "cores",
      "timestamp": "2024-02-06T14:30:00Z"
    },
    "capacity": {
      "value": 4.0,
      "unit": "cores"
    },
    "allocatable": {
      "value": 3.9,
      "unit": "cores"
    },
    "podCount": 8,
    "conditions": [
      {
        "type": "Ready",
        "status": "True"
      },
      {
        "type": "MemoryPressure",
        "status": "False"
      }
    ]
  }
}
```

### Get Workload Metrics

```http
GET /api/v1/metrics/workloads/{kind}/{namespace}/{name}?metricType={type}
Authorization: Bearer <access_token>
```

**Parameters:**
- `kind` - Workload type: `deployment`, `statefulset`, `daemonset`, `job`, `cronjob`

Response:
```json
{
  "success": true,
  "data": {
    "kind": "Deployment",
    "name": "api-server",
    "namespace": "production",
    "metricType": "memory",
    "current": {
      "value": "2.1",
      "unit": "Gi"
    },
    "replicas": {
      "current": 3,
      "requested": 3
    },
    "average": {
      "value": 2.0,
      "unit": "Gi"
    },
    "containers": [
      {
        "name": "nginx",
        "current": {
          "value": 0.7,
          "unit": "Gi"
        }
      }
    ]
  }
}
```

### Get Network Metrics

```http
GET /api/v1/metrics/network/{namespace}/{name}
Authorization: Bearer <access_token>
```

Response:
```json
{
  "success": true,
  "data": {
    "namespace": "production",
    "podName": "api-server-abc123",
    "receive": {
      "bytes": 1048576,
      "formatted": "1 MB",
      "rate": "1048576 B/s"
    },
    "transmit": {
      "bytes": 524288,
      "formatted": "512 KB",
      "rate": "524288 B/s"
    },
    "errors": {
      "bytes": 1024,
      "rate": "1024 B/s"
    },
    "connections": 42
  }
}
```

### Get Storage Metrics

```http
GET /api/v1/metrics/storage/{namespace}/{name}
Authorization: Bearer <access_token>
```

Response:
```json
{
  "success": true,
  "data": {
    "namespace": "production",
    "podName": "api-server-abc123",
    "volumeName": "data-volume",
    "used": {
      "bytes": 10737418240,
      "formatted": "10 Gi"
    },
    "capacity": {
      "bytes": 21474836480,
      "formatted": "20 Gi"
    },
    "usagePercent": 50
  }
}
```

### Get Historical Metrics

```http
GET /api/v1/metrics/history/{namespace}/{name}?range={range}&metricType={type}
Authorization: Bearer <access_token>
```

**Query Parameters:**
- `range` (optional, default: `1h`) - Time range: `1h`, `6h`, `24h`, `7d`, `30d`
- `metricType` (optional, default: `cpu`) - Metric type: `cpu`, `memory`, `network`, `storage`

Response:
```json
{
  "success": true,
  "data": {
    "metricType": "cpu",
    "namespace": "production",
    "podName": "api-server",
    "timeRange": {
      "start": "2024-02-06T13:30:00Z",
      "end": "2024-02-06T14:30:00Z"
    },
    "dataPoints": [
      {
        "timestamp": "2024-02-06T13:30:00Z",
        "value": 0.5
      },
      {
        "timestamp": "2024-02-06T13:35:00Z",
        "value": 0.6
      },
      ...
    ],
    "summary": {
      "average": 0.65,
      "minimum": 0.4,
      "maximum": 1.2,
      "trend": "increasing"
    }
  }
}
```

### Execute PromQL Query

```http
POST /api/v1/metrics/promql/query
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "query": "sum(container_cpu_usage_seconds{namespace=\"production\"}) by (pod)",
  "range": "1h",
  "step": "5m"
}
```

Response:
```json
{
  "success": true,
  "data": {
    "query": "sum(container_cpu_usage_seconds{namespace=\"production\"}) by (pod)",
    "resultType": "matrix",
    "result": [
      {
        "metric": {
          "__name__": "container_cpu_usage_seconds",
          "namespace": "production"
        },
        "values": [
          [1707240000000, 0.5],
          [1707240300000, 0.6],
          [1707240600000, 0.4],
          ...
        ]
      }
    ]
  }
}
```

### Configure Alert Threshold

```http
POST /api/v1/metrics/alerts/threshold
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "resourceType": "POD",
  "resourceName": "api-server",
  "metricType": "CPU",
  "threshold": {
    "operator": "greater_than",
    "value": 80,
    "unit": "percent"
  },
  "duration": "5m",
  "notificationChannels": ["email", "slack"]
}
```

Response:
```json
{
  "success": true,
  "message": "Alert threshold configured"
}
```

### Get Alert History

```http
GET /api/v1/metrics/alerts/history?namespace={ns}&severity={level}
Authorization: Bearer <access_token>
```

**Query Parameters:**
- `namespace` (optional) - Filter by namespace
- `severity` (optional) - Filter by severity: `INFO`, `WARNING`, `CRITICAL`

Response:
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "alertId": "alert-123",
      "resourceType": "POD",
      "resourceName": "api-server-abc123",
      "namespace": "production",
      "severity": "CRITICAL",
      "message": "CPU usage exceeded 80% threshold",
      "metricValue": 85.5,
      "thresholdValue": 80,
      "unit": "percent",
      "triggeredAt": "2024-02-06T14:30:00Z",
      "acknowledgedAt": null,
      "acknowledgedBy": null
    },
    {
      "id": 2,
      "alertId": "alert-124",
      "resourceType": "NAMESPACE",
      "resourceName": "production",
      "severity": "WARNING",
      "message": "Memory usage approaching quota limit",
      "metricValue": 14.2,
      "thresholdValue": 16,
      "unit": "Gi",
      "triggeredAt": "2024-02-06T14:00:00Z",
      "acknowledgedAt": "2024-02-06T14:45:00Z",
      "acknowledgedBy": "admin@example.com"
    }
  ]
}
```

### Acknowledge Alert

```http
POST /api/v1/metrics/alerts/{alertId}/acknowledge
Authorization: Bearer <access_token>
```

Response:
```json
{
  "success": true,
  "message": "Alert acknowledged"
}
```

### Detect Anomalies

```http
POST /api/v1/metrics/anomalies/detect
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "namespace": "production",
  "resourceName": "api-server",
  "timeRange": {
    "start": "2024-02-06T10:00:00Z",
    "end": "2024-02-06T14:00:00Z"
  },
  "anomalyTypes": ["SPIKE", "DRIFT", "TREND"]
}
```

Response:
```json
{
  "success": true,
  "data": [
    {
      "anomalyType": "SPIKE",
      "description": "Unusual CPU spike detected",
      "severity": "HIGH",
      "timestamp": "2024-02-06T14:15:00Z",
      "value": 2.8,
      "expectedRange": "0.4-0.8",
      "confidence": 0.95,
      "suggestedAction": "Investigate for memory leak or inefficient process"
    },
    {
      "anomalyType": "DRIFT",
      "description": "Gradual increase in memory usage",
      "severity": "MEDIUM",
      "timestamp": "2024-02-06T14:00:00Z",
      "value": "12.5",
      "expectedRange": "8-10",
      "confidence": 0.85,
      "suggestedAction": "Monitor for deployment changes or configuration updates"
    }
  ]
}
```

---

## Metric Types

### CPU Metrics
- **Current Usage**: Current CPU cores being used
- **Average**: Average over time range
- **Request**: CPU requested by containers
- **Limit**: CPU limit for containers
- **Unit**: Cores (e.g., 0.5, 1.0, 4.0)

### Memory Metrics
- **Current Usage**: Current memory being used
- **Average**: Average over time range
- **Request**: Memory requested by containers
- **Limit**: Memory limit for containers
- **Unit**: GiB (e.g., 0.5, 1.0, 8.0)

### Network Metrics
- **Receive**: Bytes received per second
- **Transmit**: Bytes transmitted per second
- **Errors**: Network errors per second
- **Connections**: Number of open connections
- **Unit**: B/s, MB/s, count

### Storage Metrics
- **Used**: Storage space used
- **Capacity**: Total storage capacity
- **Usage Percent**: Used / Capacity * 100
- **Unit**: GiB or TiB

---

## Alert Thresholds

### Available Operators

| Operator | Description | Example |
|-----------|-------------|---------|
| `greater_than` | Value > threshold | CPU > 80% |
| `less_than` | Value < threshold | Memory < 10% (unusual) |
| `equal` | Value == threshold | Storage = 100% |
| `not_equal` | Value != threshold | Pod count != expected |

### Severity Levels

| Severity | Description | Typical Use |
|-----------|-------------|------------|
| INFO | Informational | System state changes, successful operations |
| WARNING | Warning | Approaching thresholds, degraded performance |
| CRITICAL | Critical | Thresholds exceeded, service down |

---

## Frontend Components

### MetricsChart Component

```typescript
function MetricsChart({ namespace, resourceName }: MetricsChartProps) {
  const { data: metrics } = useMetrics(namespace, resourceName);
  const [timeRange, setTimeRange] = useState('1h');
  const [metricType, setMetricType] = useState('cpu');

  return (
    <div>
      <MetricControls
        metricType={metricType}
        onMetricTypeChange={setMetricType}
        timeRange={timeRange}
        onTimeRangeChange={setTimeRange}
      />

      <Chart
        data={metrics?.dataPoints}
        metricType={metricType}
        timeRange={timeRange}
      />

      <MetricsSummary
        current={metrics?.current}
        average={metrics?.average}
        maximum={metrics?.maximum}
        minimum={metrics?.minimum}
        trend={metrics?.trend}
      />
    </div>
  );
}
```

### AlertConfiguration Component

```typescript
function AlertConfiguration() {
  const [threshold, setThreshold] = useState<number>(80);
  const [duration, setDuration] = useState<number>(5);
  const [channels, setChannels] = useState<string[]>(['email']);

  const handleSave = async () => {
    await api.post('/api/v1/metrics/alerts/threshold', {
      resourceType: 'POD',
      metricType: 'CPU',
      threshold: { operator: 'greater_than', value: threshold },
      duration: `${duration}m`,
      notificationChannels: channels
    });

    showToast('Alert threshold configured');
  };

  return (
    <Card>
      <h2>Configure Alert Thresholds</h2>

      <ResourceSelector />

      <MetricTypeSelector value="CPU" />

      <Input
        label="Threshold (%)"
        type="number"
        min={0}
        max={100}
        value={threshold}
        onChange={setThreshold}
      />

      <Input
        label="Duration (minutes)"
        type="number"
        min={1}
        max={60}
        value={duration}
        onChange={setDuration}
      />

      <CheckboxGroup
        label="Notification Channels"
        options={[
          { value: 'email', label: 'Email' },
          { value: 'slack', label: 'Slack' },
          { value: 'pagerduty', label: 'PagerDuty' },
          { value: 'webhook', label: 'Webhook' }
        ]}
        selected={channels}
        onChange={setChannels}
      />

      <Button onClick={handleSave}>Save Configuration</Button>
    </Card>
  );
}
```

### AnomalyDetectionPanel Component

```typescript
function AnomalyDetectionPanel({ namespace, resourceName }: AnomalyPanelProps) {
  const { data: anomalies } = useAnomalies(namespace, resourceName);
  const [timeRange, setTimeRange] = useState('24h');
  const [selectedAnomalies, setSelectedAnomalies] = useState<string[]>([]);

  const handleDetect = async () => {
    const result = await api.post('/api/v1/metrics/anomalies/detect', {
      namespace,
      resourceName,
      timeRange
    });

    setSelectedAnomalies(result.data.map(a => a.id));
  };

  return (
    <Card>
      <h2>Anomaly Detection</h2>

      <TimeRangeSelector value={timeRange} onChange={setTimeRange} />

      <Button onClick={handleDetect}>Detect Anomalies</Button>

      <AnomalyList
        anomalies={anomalies?.data}
        selected={selectedAnomalies}
        onSelect={setSelectedAnomalies}
      />
    </Card>
  );
}
```

---

## RBAC Permissions

| Operation | Permission Required |
|-----------|-------------------|
| View pod metrics | READ + POD |
| View node metrics | READ + NODE |
| View workload metrics | READ + DEPLOYMENT/STATEFULSET/DAEMONSET/JOB |
| View network metrics | READ + POD |
| View storage metrics | READ + POD |
| Execute PromQL queries | READ + POD |
| Configure alert thresholds | WRITE + POD |
| View alert history | READ + POD |
| Acknowledge alerts | WRITE + POD |
| Detect anomalies | READ + POD |

---

## Data Retention

| Metric Type | Retention Period | Notes |
|-------------|----------------|-------|
| Real-time metrics | 5 minutes in memory | Live monitoring data |
| Historical metrics | 30 days (configurable) | Long-term trending |
| Alert history | 30 days | Compliance requirements |
| Anomalies | 30 days | Investigation records |

---

## Configuration

```properties
# Metrics Collection
monitoring.scrape-interval-seconds=15
monitoring.retention-days=30
monitoring.resolution-seconds=15

# Prometheus Integration
monitoring.prometheus.url=http://prometheus:9090
monitoring.prometheus.timeout-seconds=30
monitoring.prometheus.query-timeout-seconds=60

# Alerts
monitoring.alerts.enabled=true
monitoring.alerts.check-interval-seconds=30
monitoring.alerts.history.retention-days=30
monitoring.alerts.default-threshold-cpu=80
monitoring.alerts.default-threshold-memory=90

# Anomaly Detection
monitoring.anomaly.enabled=true
monitoring.anomaly.min-confidence=0.7
monitoring.anomaly.window-size=100
```

---

## Testing

```java
@SpringBootTest
@AutoConfigureMockMvc
public class MonitoringControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    public void testGetPodMetrics() throws Exception {
        mockMvc.perform(get("/api/v1/metrics/pods/default/test-pod")
                .header("Authorization", "Bearer " + token))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.success").value(true))
            .andExpect(jsonPath("$.data.metricType").value("cpu"))
            .andExpect(jsonPath("$.data.current").isNotEmpty());
    }

    @Test
    public void testExecutePromQLQuery() throws Exception {
        mockMvc.perform(post("/api/v1/metrics/promql/query")
                .contentType(MediaType.APPLICATION_JSON)
                .header("Authorization", "Bearer " + token)
                .content("{\"query\":\"sum(container_cpu_usage_seconds)\",\"range\":\"1h\"}"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.success").value(true))
            .andExpect(jsonPath("$.data.result").isArray());
    }

    @Test
    public void testConfigureAlertThreshold() throws Exception {
        mockMvc.perform(post("/api/v1/metrics/alerts/threshold")
                .contentType(MediaType.APPLICATION_JSON)
                .header("Authorization", "Bearer " + token)
                .content("{\"resourceType\":\"POD\",\"metricType\":\"CPU\",\"threshold\":{\"operator\":\"greater_than\",\"value\":80}}"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.success").value(true));
    }
}
```

---

## Future Enhancements

- [ ] Real Prometheus Integration (replacing simulated metrics)
- [ ] Custom metric dashboards
- [ ] Grafana dashboard embedding
- [ ] Metrics comparison across multiple resources
- [ ] Metrics export to external monitoring systems
- [ ] Custom alert rules with PromQL
- [ ] Alert suppression (temporary disable)
- [ ] Alert grouping and aggregation
- [ ] Predictive alerts (ML-based forecasting)
- [ ] Resource cost tracking (cloud billing integration)
- [ ] SLA monitoring and reporting

## Real Prometheus Integration

### Overview
Replace simulated metrics with real Prometheus server integration. This provides actual Kubernetes metrics without mock data.

### Configuration

```properties
# Prometheus Integration
monitoring.prometheus.enabled=true
monitoring.prometheus.url=${PROMETHEUS_URL}
monitoring.prometheus.timeout-seconds=30
monitoring.prometheus.query-timeout-seconds=60
monitoring.prometheus.authentication.enabled=${PROMETHEUS_AUTH_ENABLED}
monitoring.prometheus.username=${PROMETHEUS_USERNAME}
monitoring.prometheus.password=${PROMETHEUS_PASSWORD}

# Metrics Collection
monitoring.metrics.collection.enabled=true
monitoring.metrics.scrape-interval-seconds=15
monitoring.metrics.retention-days=30
monitoring.metrics.resolution=15s
```

### API Endpoints

### Get Prometheus Configuration

```http
GET /api/v1/monitoring/prometheus/config
Authorization: Bearer <access_token>
```

Response:
```json
{
  "success": true,
  "data": {
    "enabled": true,
    "prometheusUrl": "http://prometheus:9090",
    "timeout": 30,
    "queryTimeout": 60,
    "authentication": {
      "enabled": false,
      "username": null,
      "password": null
    }
  }
}
```

### Configure Prometheus Connection

```http
POST /api/v1/monitoring/prometheus/configure
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "prometheusUrl": "http://prometheus:9090",
  "timeout": 30,
  "queryTimeout": 60,
  "authentication": {
    "enabled": true,
    "username": "admin",
    "password": "secure-password"
  },
  "testConnection": false
}
```

Response:
```json
{
  "success": true,
  "message": "Prometheus configuration updated successfully"
}
```

### Test Prometheus Connection

```http
POST /api/v1/monitoring/prometheus/test-connection
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "testQuery": "up"
}
```

Response:
```json
{
  "success": true,
  "data": {
    "prometheusStatus": "healthy",
    "version": "2.45.0",
    "queryTime": 250,
    "targets": ["prometheus", "node-exporter", "kube-state-metrics"]
  }
}
```

### Get Metrics from Prometheus

```http
GET /api/v1/monitoring/metrics/pods/{namespace}/{podName}?metricType={type}
Authorization: Bearer <access_token>
```

**Query Parameters:**
- `namespace` (required) - Kubernetes namespace
- `podName` (required) - Pod name
- `metricType` (optional, default: `cpu`) - Metric type: `cpu`, `memory`, `network`, `storage`

Response:
```json
{
  "success": true,
  "data": {
    "namespace": "production",
    "podName": "api-server-abc123",
    "metricType": "cpu",
    "current": {
      "value": 0.5,
      "unit": "cores",
      "timestamp": "2024-02-06T14:30:00Z"
    },
    "average": {
      "value": 0.45,
      "unit": "cores",
      "range": "1h"
    },
    "maximum": {
      "value": 0.8,
      "unit": "cores",
      "range": "1h"
    },
    "requests": {
      "value": 0.5,
      "unit": "cores"
    },
    "limits": {
      "source": "k8s",
      "container": "nginx",
      "value": 1.0,
      "unit": "cores"
    },
    "source": "prometheus",
    "prometheusQuery": "sum(container_cpu_usage_seconds_total{container=\"nginx\"}) by (pod)"
  }
}
```

### Execute PromQL Query

```http
POST /api/v1/monitoring/metrics/promql/query
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "query": "sum(rate(http_server_requests_total[5m])) by (namespace, job)",
  "range": "1h",
  "step": "5m",
  "timeout": 60
}
```

Response:
```json
{
  "success": true,
  "data": {
    "query": "sum(rate(http_server_requests_total[5m])) by (namespace, job)",
    "resultType": "matrix",
    "result": [
      {
        "metric": {
          "__name__": "http_server_requests_total",
          "job": "api-server"
        },
        "values": [0.5, 0.6, 0.4, 0.3, 0.2, 0.1]
      }
    ]
  },
  "executionTime": "125"
}
```

### Prometheus Query Builder

Build complex PromQL queries with visual interface.

**Query Builder API:**

```http
GET /api/v1/monitoring/prometheus/query-builder
Authorization: Bearer <access_token>
```

Response:
```json
{
  "success": true,
  "data": {
    "supportedMetrics": [
      "http_server_requests_total",
      "http_server_duration_seconds",
      "http_server_errors_total",
      "container_cpu_usage_seconds",
      "container_memory_usage_bytes",
      "kube_pod_status_phase"
    ],
    "supportedFunctions": [
      "sum()",
      "avg()",
      "rate()",
      "increase()",
      "histogram_quantile()",
      "max_over_time()",
      "label_join()",
      "vector()",
      "abs()",
      "group()",
      "topk()"
    ],
    "supportedAggregations": [
      "sum",
      "avg",
      "min",
      "max",
      "count"
    ]
  }
}
```

---

## Prometheus Query Language (PromQL)

### Basic Query Syntax

```
# Instant vector selector
http_requests_total

# Range vector selector
http_requests_total[5m]

# Label matching
http_requests_total{namespace="production"}

# Aggregation functions
sum(rate(http_requests_total[5m]))
avg(http_requests_total[5m])
max_over_time(http_requests_total[5m])
histogram_quantile(0.99, http_requests_duration_seconds)
```

### Common Queries

**Request Rate:**
```promql
sum(rate(http_server_requests_total[5m])) by (namespace)
```

**Request Duration:**
```promql
histogram_quantile(0.99, sum(rate(http_server_duration_seconds_sum[5m])) by (namespace))
```

**CPU Usage:**
```promql
sum(container_cpu_usage_seconds_total) by (namespace, pod) / sum(kube_pod_info_container_cpu_usage_cores)
```

**Memory Usage:**
```promql
sum(container_memory_working_set_bytes) by (namespace, pod)
```

**Network I/O:**
```promql
sum(rate(container_network_receive_bytes_total[5m])) by (namespace, pod)
sum(rate(container_network_transmit_bytes_total[5m])) by (namespace, pod)
```

---

## Frontend Components

### PrometheusQueryBuilder Component

```typescript
function PrometheusQueryBuilder() {
  const [query, setQuery] = useState('');
  const [selectedMetric, setSelectedMetric] = useState<string>('');
  const [aggregation, setAggregation] = useState('sum');
  const [grouping, setGrouping] = useState(['by namespace', 'by pod', 'none']);
  const [timeRange, setTimeRange] = useState('1h');

  const handleAddMetric = () => {
    setQuery(prev => prev + ` ${selectedMetric}`);
  };

  const buildQuery = () => {
    let q = '';
    
    // Add aggregation function
    q += `${aggregation}(`;
    
    // Add grouping if selected
    if (grouping !== 'none') {
      q += ` by (${grouping.join(', ')})`;
    }
    
    // Add time range
    q += `[${timeRange}]`;
    
    return q;
  };

  const handleExecuteQuery = async () => {
    const result = await api.post('/api/v1/monitoring/metrics/promql/query', {
      query: buildQuery(),
      range: timeRange,
      timeout: 60
    });
    
    setResult(result);
  };

  return (
    <div>
      <QueryBuilder>
        <MetricSelector
          selectedMetric={selectedMetric}
          onMetricSelect={setSelectedMetric}
          metrics={queryBuilder.supportedMetrics}
        />
        
        <AggregationSelector
          value={aggregation}
          onChange={setAggregation}
          options={[
            { value: 'sum', label: 'Sum' },
            { value: 'avg', label: 'Average' },
            { value: 'min', label: 'Minimum' },
            { value: 'max', label: 'Maximum' },
            { value: 'count', label: 'Count' },
            { value: 'rate', label: 'Rate' }
          ]}
        />
        
        <GroupingSelector
          value={grouping}
          onChange={setGrouping}
          options={[
            { value: 'by namespace', label: 'Namespace' },
            { value: 'by pod', label: 'Pod' },
            { value: 'by job', label: 'Job' },
            { value: 'by label', label: 'Label' },
            { value: 'none', label: 'No grouping' }
          ]}
        />
        
        <TimeRangeSelector
          value={timeRange}
          onChange={setTimeRange}
          options={[
            { value: '5m', label: '5 minutes' },
            { value: '15m', label: '15 minutes' },
            { value: '1h', label: '1 hour' },
            { value: '6h', label: '6 hours' },
            { value: '24h', label: '1 day' },
            { value: '7d', label: '7 days' },
            { value: '30d', label: '30 days' }
          ]}
        />
        
        <FunctionSelector
          label="Aggregation"
          value={aggregation}
          onChange={setAggregation}
          options={[
            { value: 'sum', label: 'Sum' },
            { value: 'avg', label: 'Average' },
            { value: 'min', label: 'Min' },
            { value: 'max', label: 'Max' },
            { value: 'rate', label: 'Rate' },
            { value: 'histogram_quantile', label: 'Percentile' },
            { value: 'max_over_time', label: 'Max Time' },
            { value: 'count', label: 'Count' }
          ]}
        />
        
        <QueryDisplay>
          <PromQLCode>{buildQuery()}</PromQLCode>
        </QueryDisplay>
        
        <Actions>
          <Button onClick={handleExecuteQuery}>Execute Query</Button>
          <Button onClick={handleSaveQuery}>Save Query Template</Button>
        </Actions>
      </QueryBuilder>
    );
}
```

---

## RBAC Permissions

| Operation | Permission Required |
|-----------|-------------------|
| View Prometheus config | ADMIN + MONITORING |
| Configure Prometheus | ADMIN + MONITORING |
| Test Prometheus connection | ADMIN + MONITORING |
| Query metrics via Prometheus | READ + MONITORING |
| Execute PromQL query | READ + MONITORING |
| Use Query Builder | READ + MONITORING |

---

## Configuration

```properties
# Prometheus Server
monitoring.prometheus.server.enabled=true
monitoring.prometheus.server.url=${PROMETHEUS_URL}
monitoring.prometheus.server.timeout-seconds=30
monitoring.prometheus.server.query-timeout-seconds=60
monitoring.prometheus.server.username=${PROMETHEUS_USERNAME}
monitoring.prometheus.server.password=${PROMETHEUS_PASSWORD}

# Query Settings
monitoring.prometheus.default-range=1h
monitoring.prometheus.default-step=5m
monitoring.prometheus.max-time-range=7d
monitoring.prometheus.query.timeout-seconds=30
monitoring.prometheus.max-query-length=2000
monitoring.prometheus.cache.enabled=true
monitoring.prometheus.cache.ttl-seconds=300

# Metrics Collection
monitoring.metrics.k8s-server-metrics.enabled=true
monitoring.metrics.node-exporter.enabled=true
monitoring.metrics.kube-state-metrics.enabled=true
monitoring.metrics.custom-metrics.enabled=true
monitoring.metrics.scrape-interval=15s
```

---

## Error Handling

### Prometheus Connection Failed
```json
{
  "success": false,
  "message": "Failed to connect to Prometheus server",
  "error": "PROMETHEUS_CONNECTION_FAILED",
  "statusCode": 503,
  "details": {
    "prometheusUrl": "http://prometheus:9090",
    "reason": "Connection timeout"
  }
}
```

### Query Timeout
```json
{
  "success": false,
  "message": "Prometheus query timed out",
  "error": "PROMQL_QUERY_TIMEOUT",
  "statusCode": 408,
  "details": {
    "query": "sum(rate(http_server_requests_total[5m])) by (namespace)",
    "duration": 60
  }
}
```

---

## Testing

```java
@SpringBootTest
@AutoConfigureMockMvc
public class PrometheusControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    public void testGetPrometheusConfig() throws Exception {
        mockMvc.perform(get("/api/v1/monitoring/prometheus/config")
                .header("Authorization", "Bearer " + token))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.success").value(true))
            .andExpect(jsonPath("$.data.prometheusUrl").isNotEmpty());
    }

    @Test
    public void testQueryPrometheusMetrics() throws Exception {
        mockMvc.perform(get("/api/v1/metrics/pods/default/test-pod")
                .header("Authorization", "Bearer " + token))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.success").value(true))
            .andExpect(jsonPath("$.data.source").value("prometheus"))
            .andExpect(jsonPath("$.data.metricType").value("cpu"));
    }

    @Test
    public void testExecutePromQLQuery() throws Exception {
        mockMvc.perform(post("/api/v1/monitoring/metrics/promql/query")
                .contentType(MediaType.APPLICATION_JSON)
                .header("Authorization", "Bearer " + token)
                .content("{\"query\":\"sum(rate(http_requests_total[5m]))\",\"range\":\"1h\"}"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.success").value(true))
            .andExpect(jsonPath("$.data.resultType").value("matrix"));
    }
}
```

---

## Future Enhancements
- [ ] Resource cost tracking (cloud billing integration)
- [ ] SLA monitoring and reporting
