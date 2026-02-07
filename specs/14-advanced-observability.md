# Advanced Observability Platform

## Overview

Advanced Observability Platform provides comprehensive monitoring, logging, and tracing capabilities through OpenTelemetry integration with Prometheus, Jaeger, Loki, and custom dashboards for full-stack observability.

---

## Features

1. **OpenTelemetry Integration** - Vendor-agnostic telemetry collection and export
2. **Distributed Tracing** - End-to-end request tracing across microservices
3. **Centralized Logging** - Structured log aggregation with Loki integration
4. **Metrics Collection** - Custom metrics with OTel instrumentation
5. **Traces Export** - Support for Jaeger, Tempo, Zipkin
6. **Logs Export** - Support for Loki, ELK, Splunk
7. **Metrics Export** - Support for Prometheus, VictoriaMetrics, Thanos
8. **Correlation** - Auto-correlation of traces, metrics, and logs
9. **Dashboards** - Custom observability dashboards with Grafana
10. **Sampling Strategies** - Configurable trace sampling (head, probabilistic, dynamic)
11. **Instrumentation** - Auto-instrumentation for Java, Go, Python, Node.js, .NET
12. **Alerting** - Anomaly detection and alert rules based on OTel data

---

## Architecture

```
Applications (with OTel SDK)
       ↓
OpenTelemetry Collector
       ↓
    +-----+-----+
    ↓     ↓     ↓
Traces  Metrics  Logs
    ↓     ↓     ↓
Jaeger  Prometheus  Loki
    ↓     ↓     ↓
        +-----+-----+
            ↓
        Grafana Dashboards
```

---

## API Endpoints

### Get Observability Status

```http
GET /api/v1/observability/status
Authorization: Bearer <access_token>
```

Response:
```json
{
  "success": true,
  "data": {
    "openTelemetry": {
      "enabled": true,
      "version": "1.21.0",
      "collector": "Running"
    },
    "components": [
      {
        "name": "otel-collector",
        "status": "Running",
        "version": "0.86.0"
      },
      {
        "name": "prometheus",
        "status": "Running",
        "version": "2.45.0"
      },
      {
        "name": "jaeger",
        "status": "Running",
        "version": "1.50.0"
      },
      {
        "name": "loki",
        "status": "Running",
        "version": "2.9.0"
      },
      {
        "name": "grafana",
        "status": "Running",
        "version": "10.0.0"
      }
    ]
  }
}
```

### Get Trace by Trace ID

```http
GET /api/v1/observability/traces/{traceId}
Authorization: Bearer <access_token>
```

Response:
```json
{
  "success": true,
  "data": {
    "traceId": "abc123-def456-ghi789-jkl012",
    "rootSpan": {
      "spanId": "span-001",
      "operationName": "HTTP POST /api/users",
      "serviceName": "api-server",
      "startTime": "2024-02-06T14:00:00.000Z",
      "duration": 45000000,
      "tags": {
        "http.method": "POST",
        "http.url": "/api/users",
        "http.status_code": "200",
        "service.name": "api-server",
        "deployment.environment": "production"
      },
      "logs": [
        {
          "timestamp": "2024-02-06T14:00:00.010Z",
          "level": "info",
          "message": "Request received"
        }
      ]
    },
    "spans": [
      {
        "spanId": "span-001",
        "parentSpanId": null,
        "operationName": "HTTP POST /api/users",
        "serviceName": "api-server",
        "startTime": "2024-02-06T14:00:00.000Z",
        "duration": 45000000,
        "tags": { "http.method": "POST", "http.url": "/api/users" }
      },
      {
        "spanId": "span-002",
        "parentSpanId": "span-001",
        "operationName": "Database Query",
        "serviceName": "database",
        "startTime": "2024-02-06T14:00:00.005Z",
        "duration": 30000000,
        "tags": { "db.type": "postgresql", "db.statement": "SELECT * FROM users" }
      }
    ]
  }
}
```

### Search Traces

```http
GET /api/v1/observability/traces/search?service={svc}&operation={op}&duration={time}&minDuration={ms}&maxDuration={ms}&tags={key:value}
Authorization: Bearer <access_token>
```

**Query Parameters:**
- `service` (optional) - Filter by service name
- `operation` (optional) - Filter by operation name
- `duration` (optional, default: `1h`) - Time range: `1h`, `6h`, `24h`, `7d`
- `minDuration` (optional) - Minimum duration in milliseconds
- `maxDuration` (optional) - Maximum duration in milliseconds
- `tags` (optional) - Tag filter (key:value)
- `limit` (optional, default: `100`) - Max number of traces

Response:
```json
{
  "success": true,
  "data": {
    "traces": [
      {
        "traceId": "abc123-def456-ghi789",
        "rootSpan": {
          "serviceName": "api-server",
          "operationName": "HTTP POST /api/users",
          "duration": 45000000,
          "startTime": "2024-02-06T14:00:00Z"
        },
        "spanCount": 3
      }
    ],
    "total": 1250,
    "summary": {
      "avgDuration": "45ms",
      "p95Duration": "120ms",
      "p99Duration": "150ms",
      "errorRate": "0.8%"
    }
  }
}
```

### Get Aggregated Metrics

```http
GET /api/v1/observability/metrics?name={metric}&service={svc}&namespace={ns}&startTime={iso}&endTime={iso}&aggregation={func}
Authorization: Bearer <access_token>
```

**Query Parameters:**
- `name` (optional) - Metric name (e.g., `http.server.duration`, `http.server.requests`)
- `service` (optional) - Service name filter
- `namespace` (optional) - Namespace filter
- `startTime` (optional) - Start time (ISO 8601)
- `endTime` (optional) - End time (ISO 8601)
- `aggregation` (optional, default: `sum`) - Aggregation function: `sum`, `avg`, `max`, `min`, `count`

Response:
```json
{
  "success": true,
  "data": {
    "metric": "http.server.duration",
    "service": "api-server",
    "namespace": "production",
    "timeRange": {
      "start": "2024-02-06T13:00:00Z",
      "end": "2024-02-06T14:00:00Z"
    },
    "datapoints": [
      {
        "timestamp": "2024-02-06T13:30:00Z",
        "value": 45.2
      },
      {
        "timestamp": "2024-02-06T13:35:00Z",
        "value": 52.1
      }
    ],
    "aggregation": "avg",
    "summary": {
      "count": 120,
      "sum": 5450.0,
      "avg": 45.42,
      "max": 125.0,
      "min": 12.5
    }
  }
}
```

### Query Logs

```http
GET /api/v1/observability/logs?query={q}&namespace={ns}&startTime={iso}&endTime={iso}&limit={count}
Authorization: Bearer <access_token>
```

**Query Parameters:**
- `query` (optional) - LogQL query (e.g., `{namespace="production"} |= {level="error"}`)
- `namespace` (optional) - Filter by namespace
- `startTime` (optional) - Start time (ISO 8601)
- `endTime` (optional) - End time (ISO 8601)
- `limit` (optional, default: `1000`) - Max log entries

Response:
```json
{
  "success": true,
  "data": {
    "logs": [
      {
        "timestamp": "2024-02-06T14:00:00.000Z",
        "stream": "stdout",
        "level": "info",
        "message": "Request received from 192.168.1.100",
        "labels": {
          "namespace": "production",
          "pod": "api-server-abc123",
          "container": "api-server",
          "app": "api-server",
          "level": "info"
        }
      },
      {
        "timestamp": "2024-02-06T14:00:01.234Z",
        "stream": "stdout",
        "level": "error",
        "message": "Failed to connect to database: Connection timeout",
        "labels": {
          "namespace": "production",
          "pod": "api-server-abc123",
          "container": "api-server",
          "app": "api-server",
          "level": "error"
        }
      }
    ],
    "total": 50000
  }
}
```

### Correlate Trace with Logs

```http
GET /api/v1/observability/correlation/{traceId}
Authorization: Bearer <access_token>
```

Response:
```json
{
  "success": true,
  "data": {
    "traceId": "abc123-def456-ghi789",
    "trace": {
      "traceId": "abc123-def456-ghi789",
      "rootSpan": { ... },
      "spans": [ ... ]
    },
    "relatedLogs": [
      {
        "timestamp": "2024-02-06T14:00:00.010Z",
        "stream": "stdout",
        "level": "info",
        "message": "Request received",
        "labels": { "traceId": "abc123-def456-ghi789" }
      },
      {
        "timestamp": "2024-02-06T14:00:00.050Z",
        "stream": "stdout",
        "level": "error",
        "message": "Database connection failed",
        "labels": { "spanId": "span-002", "traceId": "abc123-def456-ghi789" }
      }
    ],
    "relatedMetrics": [
      {
        "name": "http.server.duration",
        "value": 45.2,
        "timestamp": "2024-02-06T14:00:00Z",
        "labels": { "traceId": "abc123-def456-ghi789" }
      }
    ]
  }
}
```

### Configure OpenTelemetry Collector

```http
POST /api/v1/observability/otel/collector
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "name": "otel-collector",
  "receivers": [
    {
      "type": "otlp",
      "protocols": ["grpc", "http"],
      "config": {
        "endpoint": "0.0.0.0:4317"
      }
    }
  ],
  "processors": [
    {
      "type": "batch",
      "config": {
        "timeout": "5s",
        "sendBatchSize": 1024,
        "sendBatchMax": 512
      }
    },
    {
      "type": "memory_limiter",
      "config": {
        "limit_mib": 512
      }
    }
  ],
  "exporters": [
    {
      "type": "otlp/jaeger",
      "config": {
        "endpoint": "jaeger-collector.observability:4317",
        "tls": { "insecure": false }
      }
    },
    {
      "type": "prometheusremotewrite",
      "config": {
        "endpoint": "prometheus.observability:9090/api/v1/write"
      }
    },
    {
      "type": "loki",
      "config": {
        "endpoint": "http://loki.observability:3100/loki/api/v1/push"
      }
    }
  ]
}
```

Response:
```json
{
  "success": true,
  "data": {
    "collectorName": "otel-collector",
    "configApplied": true,
    "restartRequired": true,
    "restartAt": "2024-02-06T14:00:00Z"
  },
  "message": "OpenTelemetry collector configuration updated successfully"
}
```

### Get Instrumentation Status

```http
GET /api/v1/observability/instrumentation?namespace={ns}
Authorization: Bearer <access_token>
```

Response:
```json
{
  "success": true,
  "data": {
    "namespace": "production",
    "instrumentation": {
      "java": {
        "enabled": true,
        "version": "1.31.0",
        "libraries": [
          { "name": "jdbc", "instrumented": true },
          { "name": "jms", "instrumented": true },
          { "name": "http", "instrumented": true }
        ]
      },
      "go": {
        "enabled": false,
        "version": "1.19.0"
      },
      "python": {
        "enabled": true,
        "version": "1.22.0",
        "libraries": [
          { "name": "http", "instrumented": true },
          { "name": "flask", "instrumented": true }
        ]
      }
    },
    "services": [
      {
        "name": "api-server",
        "language": "java",
        "instrumentationEnabled": true,
        "samplingRate": 1.0
      },
      {
        "name": "worker",
        "language": "python",
        "instrumentationEnabled": true,
        "samplingRate": 0.5
      }
    ]
  }
}
```

### Configure Sampling Strategy

```http
POST /api/v1/observability/otel/sampling
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "strategy": "probabilistic",
  "config": {
    "probability": 0.1
  }
}
```

Response:
```json
{
  "success": true,
  "message": "Sampling strategy configured to probabilistic with 10% probability"
}
```

**Supported Sampling Strategies:**

| Strategy | Description | Use Case |
|----------|-------------|-----------|
| `probabilistic` | Random sample based on probability | High-traffic services |
| `head` | Sample first N traces | Debugging initial requests |
| `fixed` | Sample every Nth trace | Consistent sampling rate |
| `dynamic` | Adaptive sampling based on QPS | Variable traffic patterns |

### Get Custom Dashboard

```http
GET /api/v1/observability/dashboards/{dashboardId}
Authorization: Bearer <access_token>
```

Response:
```json
{
  "success": true,
  "data": {
    "dashboardId": "dash-001",
    "name": "API Server Observability",
    "panels": [
      {
        "id": "panel-001",
        "title": "Request Rate",
        "type": "graph",
        "query": "sum(rate(http_server_requests_total[5m]))",
        "visualOptions": {
          "chartType": "line",
          "yAxis": "requests/sec",
          "timeRange": "1h"
        }
      },
      {
        "id": "panel-002",
        "title": "Request Latency",
        "type": "heatmap",
        "query": "histogram_quantile(0.99, rate(http_server_duration_seconds[5m]))",
        "visualOptions": {
          "chartType": "heatmap",
          "xAxis": "time",
          "yAxis": "latency (ms)",
          "colorScale": "viridis"
        }
      },
      {
        "id": "panel-003",
        "title": "Error Rate",
        "type": "gauge",
        "query": "sum(rate(http_server_errors_total[5m])) / sum(rate(http_server_requests_total[5m]))",
        "visualOptions": {
          "chartType": "gauge",
          "min": 0,
          "max": 1,
          "unit": "ratio"
        }
      },
      {
        "id": "panel-004",
        "title": "Trace Search",
        "type": "table",
        "query": "search traces by operation name",
        "visualOptions": {
          "chartType": "table",
          "columns": ["timestamp", "operation", "duration", "status"]
        }
      }
    ],
    "refreshInterval": "30s"
  }
}
```

### Create Custom Dashboard

```http
POST /api/v1/observability/dashboards
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "name": "Application Observability Dashboard",
  "description": "Comprehensive monitoring for application",
  "panels": [
    {
      "title": "Request Throughput",
      "type": "graph",
      "query": "sum(rate(http_server_requests_total[5m]))",
      "visualOptions": {
        "chartType": "line",
        "yAxis": "req/s",
        "timeRange": "1h"
      }
    }
  ],
  "refreshInterval": "30s"
}
```

### Configure Alert Rule based on OTel

```http
POST /api/v1/observability/alerts/otel
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "name": "High Latency Alert",
  "metric": "http.server.duration",
  "condition": {
    "operator": "greater_than",
    "threshold": 1000,
    "window": "5m"
  },
  "aggregation": "p99",
  "notificationChannels": ["email", "slack"],
  "severity": "WARNING"
}
```

Response:
```json
{
  "success": true,
  "data": {
    "alertId": "alert-otel-001",
    "name": "High Latency Alert",
    "metric": "http.server.duration",
    "condition": {
      "operator": "greater_than",
      "threshold": 1000,
      "aggregation": "p99"
    },
    "status": "active",
    "createdAt": "2024-02-06T14:00:00Z"
  },
  "message": "OpenTelemetry-based alert rule created successfully"
}
```

---

## OpenTelemetry Instrumentation

### Auto-Instrumentation Configuration

```yaml
apiVersion: opentelemetry.io/v1alpha1
kind: Instrumentation
metadata:
  name: otel-instrumentation
  namespace: production
spec:
  exporter:
    endpoint: http://otel-collector:4318
  propagators:
    - tracecontext
    - baggage
    - metrics
  sampler:
    type: probabilistic
    options:
      probability: 0.1
  java:
    env:
      - name: OTEL_RESOURCE_ATTRIBUTES
        value: service.name=api-server,service.namespace=production
      - name: JAVA_TOOL_OPTIONS
        value: "-javaagent:otel-auto-instrument=true"
  python:
    env:
      - name: OTEL_RESOURCE_ATTRIBUTES
        value: service.name=worker,service.namespace=production
```

### Supported Languages and Libraries

| Language | Auto-Instrumentation | Supported Libraries |
|----------|-------------------|-------------------|
| **Java** | ✅ | JDBC, JMS, HTTP Servlet, Spring Boot, Hibernate, JPA |
| **Go** | ✅ | net/http, database/sql, gRPC |
| **Python** | ✅ | Flask, Django, FastAPI, requests, aiohttp, Celery |
| **Node.js** | ✅ | Express, Koa, Hapi, HTTP, gRPC |
| **.NET** | ✅ | ASP.NET Core, HttpClient, EntityFramework, gRPC |

### Custom Metrics with OTel

```java
// Java Application Example
import io.opentelemetry.api.OpenTelemetry;
import io.opentelemetry.api.trace.Tracer;
import io.opentelemetry.api.metrics.LongHistogram;

public class ApiService {
    private static final Tracer tracer = OpenTelemetry.getTracer("api-server");
    private static final LongHistogram requestLatency = OpenTelemetry.getMeter("api-server")
        .histogramBuilder("http.server.duration")
        .setDescription("HTTP request duration")
        .setUnit("ms")
        .build();

    public void handleRequest(HttpServletRequest request) {
        Span span = tracer.spanBuilder("HTTP POST /api/users")
            .setAttribute("http.method", request.getMethod())
            .setAttribute("http.url", request.getRequestURI())
            .setAttribute("http.scheme", request.getScheme())
            .startSpan();

        try {
            long startTime = System.currentTimeMillis();
            // Process request
            long duration = System.currentTimeMillis() - startTime;

            // Record metric
            requestLatency.record(duration, AttributeKey.stringKey("http.status_code", String.valueOf(response.getStatus())));

        } finally {
            span.end();
        }
    }
}
```

### Log Correlation with Trace ID

```yaml
# Fluent Bit Config
[INPUT]
    Name              tail
    Path              /var/log/containers/*/*.log
    Parser            json
    MEM_Buf_Limit     5MB

[FILTER]
    Name              add_trace_id
    Match             *
    # Add trace ID to all logs from OpenTelemetry context
    Records           {"trace_id": "${trace_id}"}

[OUTPUT]
    Name              loki
    Match             *
    Url               http://loki.observability:3100/loki/api/v1/push
```

---

## Frontend Components

### ObservabilityDashboard Component

```typescript
function ObservabilityDashboard() {
  const [activeTab, setActiveTab] = useState<'traces' | 'metrics' | 'logs' | 'dashboards'>('traces');

  return (
    <div>
      <ObservabilityHeader
        status="healthy"
        components={["otel-collector", "prometheus", "jaeger", "loki", "grafana"]}
      />

      <Tabs value={activeTab} onChange={setActiveTab}>
        <Tab label="Traces" value="traces">
          <TraceExplorer />
        </Tab>
        <Tab label="Metrics" value="metrics">
          <MetricsExplorer />
        </Tab>
        <Tab label="Logs" value="logs">
          <LogExplorer />
        </Tab>
        <Tab label="Dashboards" value="dashboards">
          <DashboardList />
        </Tab>
      </Tabs>

      <CorrelationView
        traceId={selectedTraceId}
        showRelatedLogs={true}
        showRelatedMetrics={true}
      />
    </div>
  );
}
```

### TraceWaterfall Component

```typescript
function TraceWaterfall({ traceId }: TraceWaterfallProps) {
  const { data: trace } = useTraceDetail(traceId);

  return (
    <div>
      <TraceHeader
        traceId={trace?.traceId}
        duration={trace?.rootSpan?.duration}
        spanCount={trace?.spans?.length}
      />

      <WaterfallChart
        spans={trace?.spans}
        layout="waterfall"
        showTimeline={true}
        colorByService={true}
        onSpanClick={handleSpanClick}
      />

      <TraceSummary
        avgDuration={calculateAvgDuration(trace?.spans)}
        p95Duration={calculateP95(trace?.spans)}
        p99Duration={calculateP99(trace?.spans)}
        errorRate={calculateErrorRate(trace?.spans)}
      />

      <SpanDetailPanel
        selectedSpan={selectedSpan}
        tags={selectedSpan?.tags}
        logs={selectedSpan?.logs}
      />
    </div>
  );
}
```

### MetricsChart Component

```typescript
function MetricsChart({ metricName, timeRange }: MetricsChartProps) {
  const { data: metrics } = useMetrics(metricName, timeRange);

  return (
    <div>
      <MetricsHeader
        metricName={metricName}
        timeRange={timeRange}
      />

      <TimeRangeSelector
        options={['1h', '6h', '24h', '7d', '30d']}
        selected={timeRange}
        onChange={setTimeRange}
      />

      <GrafanaChart
        metric={metricName}
        datapoints={metrics?.datapoints}
        chartType="line"
        aggregation={metrics?.aggregation}
        visualOptions={{
          chartType: 'line',
          yAxis: metrics?.unit,
          showLegend: true,
          enableZoom: true
        }}
      />

      <MetricsSummary
        count={metrics?.summary?.count}
        sum={metrics?.summary?.sum}
        avg={metrics?.summary?.avg}
        max={metrics?.summary?.max}
        min={metrics?.summary?.min}
      />
    </div>
  );
}
```

### CorrelatedLogs Component

```typescript
function CorrelatedLogs({ traceId }: CorrelatedLogsProps) {
  const { data: correlation } = useTraceCorrelation(traceId);

  return (
    <div>
      <CorrelationHeader
        traceId={traceId}
        logCount={correlation?.relatedLogs?.length || 0}
        metricCount={correlation?.relatedMetrics?.length || 0}
      />

      <SplitPane>
        <TraceView
          trace={correlation?.trace}
          selectedSpanId={correlation?.trace?.rootSpan?.spanId}
        />

        <RelatedLogs
          logs={correlation?.relatedLogs}
          highlightTraceId={traceId}
          spanFilter={correlation?.trace?.spans}
        />

        <RelatedMetrics
          metrics={correlation?.relatedMetrics}
          highlightTraceId={traceId}
        />
      </SplitPane>
    </div>
  );
}
```

---

## RBAC Permissions

| Operation | Permission Required |
|-----------|-------------------|
| View observability status | READ + OBSERVABILITY |
| Search traces | READ + OBSERVABILITY |
| Get trace details | READ + OBSERVABILITY |
| Query metrics | READ + OBSERVABILITY |
| Query logs | READ + OBSERVABILITY |
| Correlate trace with logs | READ + OBSERVABILITY |
| Configure OTel collector | ADMIN + OBSERVABILITY |
| Configure sampling | ADMIN + OBSERVABILITY |
| Create custom dashboard | WRITE + OBSERVABILITY |
| Configure OTel-based alerts | WRITE + OBSERVABILITY |
| Manage instrumentation | ADMIN + OBSERVABILITY |

---

## Configuration

```properties
# OpenTelemetry
observability.otel.enabled=true
observability.otel.collector.enabled=true
observability.otel.collector.version=0.86.0
observability.otel.collector.receivers=otlp
observability.otel.collector.processors=batch,memory_limiter
observability.otel.collector.exporters=otlp/jaeger,prometheusremotewrite,loki

# Instrumentation
observability.instrumentation.enabled=true
observability.instrumentation.auto-instrumentation=true
observability.instrumentation.java.enabled=true
observability.instrumentation.go.enabled=true
observability.instrumentation.python.enabled=true
observability.instrumentation.nodejs.enabled=true
observability.instrumentation.dotnet.enabled=true

# Sampling
observability.sampling.strategy=probabilistic
observability.sampling.probability=0.1
observability.sampling.head-samples=100
observability.sampling.dynamic-enabled=false

# Exporters
observability.exporter.jaeger.enabled=true
observability.exporter.jaeger.endpoint=jaeger-collector.observability:4317
observability.exporter.prometheus.enabled=true
observability.exporter.prometheus.endpoint=prometheus.observability:9090/api/v1/write
observability.exporter.loki.enabled=true
observability.exporter.loki.endpoint=http://loki.observability:3100/loki/api/v1/push

# Dashboards
observability.dashboards.enabled=true
observability.dashboards.refresh-interval-seconds=30
observability.dashboards.max-panels=20
observability.dashboards.custom.enabled=true

# Alerting
observability.alerting.enabled=true
observability.alerting.rules-enabled=true
observability.alerting.notification-channels=email,slack,pagerduty
observability.alerting.evaluation-interval-seconds=30
```

---

## Error Handling

### OpenTelemetry Collector Not Responding
```json
{
  "success": false,
  "message": "OpenTelemetry collector is not responding",
  "error": "OTEL_COLLECTOR_UNAVAILABLE",
  "statusCode": 503,
  "details": {
    "collector": "otel-collector",
    "lastContact": "2024-02-06T13:00:00Z"
  }
}
```

### Trace Not Found
```json
{
  "success": false,
  "message": "Trace not found",
  "error": "TRACE_NOT_FOUND",
  "statusCode": 404,
  "details": {
    "traceId": "non-existent-trace-id"
  }
}
```

### Log Query Failed
```json
{
  "success": false,
  "message": "Log query failed",
  "error": "LOG_QUERY_FAILED",
  "statusCode": 400,
  "details": {
    "query": "{namespace=\"production\"} |= {level=\"error\"}",
    "reason": "Invalid LogQL syntax"
  }
}
```

---

## Testing

```java
@SpringBootTest
@AutoConfigureMockMvc
public class ObservabilityControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    public void testGetTraceById() throws Exception {
        mockMvc.perform(get("/api/v1/observability/traces/abc123-def456")
                .header("Authorization", "Bearer " + token))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.success").value(true))
            .andExpect(jsonPath("$.data.traceId").value("abc123-def456"));
    }

    @Test
    public void testQueryLogs() throws Exception {
        mockMvc.perform(get("/api/v1/observability/logs")
                .param("query", "{namespace=\"production\"}")
                .header("Authorization", "Bearer " + token))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.success").value(true));
    }

    @Test
    public void testConfigureOTelCollector() throws Exception {
        mockMvc.perform(post("/api/v1/observability/otel/collector")
                .contentType(MediaType.APPLICATION_JSON)
                .header("Authorization", "Bearer " + token)
                .content("{\"receivers\":[{\"type\":\"otlp\"}]}"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.success").value(true));
    }
}
```

---

## Future Enhancements

- [ ] Service graph visualization with OTel dependency data
- [ ] Real-time topology updates via WebSocket
- [ ] Custom OTel span processors
- [ ] Distributed logging correlation across services
- [ ] Log anomaly detection with ML
- [ ] Metrics prediction and forecasting
- [ ] Automated incident detection from traces/metrics/logs
- [ ] Trace sampling rate optimization
- [ ] OTel Context propagation across clusters
- [ ] Log redaction (sensitive data masking)
- [ ] Custom OTel attribute enrichment
- [ ] Logs-to-metrics conversion (count, rate)
- [ ] Trace replay (replay request flow)
- [ ] Distributed transaction monitoring
- [ ] Performance profiling with continuous profiling
- [ ] Root cause analysis from correlated data
- [ ] SLA monitoring and reporting
- [ ] Business transaction tracking
- [ ] User journey analysis
- [ ] Cost attribution per service/endpoint
- [ ] Log retention policies (time-based, size-based)
- [ ] Metric-based auto-scaling
- [ ] Synthetic transaction monitoring
- [ ] Multi-cluster trace correlation
- [ ] Edge tracing with sidecar pattern
- [ ] Custom OTel exporters (e.g., Kafka, Azure Monitor)
- [ ] Trace prioritization for debugging
- [ ] Log aggregation strategy optimization
- [ ] Metrics downsampling for long-term storage
- [ ] Alert deduplication and suppression
- [ ] Observability as Code (GitOps for dashboards)
- [ ] Performance baseline detection
- [ ] Anomaly threshold auto-tuning
- [ ] Trace-based error budget tracking
- [ ] Custom span attribute validation
- [ ] Distributed transaction boundaries detection
- [ ] Service dependency mapping from traces
- [ ] Log-to-trace reverse correlation
- [ ] OTel collector health monitoring
- [ ] Metrics query optimization (caching, pre-aggregation)
