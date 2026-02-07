# Service Mesh

## Overview

Service Mesh provides comprehensive microservices observability, traffic management, and security through integration with Istio, Envoy, and Jaeger, with OpenTelemetry-based observability.

---

## Features

1. **Service Mesh Integration** - Istio, Envoy, and Jaeger unified management
2. **Traffic Management** - Canary releases, blue-green deployments, traffic splitting
3. **Traffic Mirroring** - Mirror traffic to testing environments
4. **Circuit Breakers** - Automatic failure handling and retries
5. **Microservices Topology** - Visual service dependency graph
6. **OpenTelemetry Integration** - Unified observability with OTel
7. **Distributed Tracing** - Request tracking across microservices
8. **Policy Management** - Security policies and access control
9. **Gateway Configuration** - Ingress and egress gateway management
10. **Service-to-Service Communication** - mTLS and secure communication

---

## API Endpoints

### Get Service Mesh Status

```http
GET /api/v1/service-mesh/status
Authorization: Bearer <access_token>
```

Response:
```json
{
  "success": true,
  "data": {
    "enabled": true,
    "provider": "istio",
    "version": "1.18.0",
    "namespace": "istio-system",
    "components": [
      { "name": "istiod", "status": "Running" },
      { "name": "ingressgateway", "status": "Running" },
      { "name": "egressgateway", "status": "Running" }
    ]
  }
}
```

### Get Service Topology

```http
GET /api/v1/service-mesh/topology?namespace={ns}
Authorization: Bearer <access_token>
```

**Query Parameters:**
- `namespace` (optional) - Filter by namespace

Response:
```json
{
  "success": true,
  "data": {
    "namespace": "production",
    "services": [
      {
        "name": "api-server",
        "namespace": "production",
        "version": "v1.2.0",
        "dependencies": ["database", "cache"],
        "dependents": ["frontend", "mobile-app"],
        "meshEnabled": true,
        "labels": { "app": "api-server", "version": "v1.2.0" }
      },
      {
        "name": "database",
        "namespace": "production",
        "version": "v2.0.0",
        "dependencies": [],
        "dependents": ["api-server", "worker"],
        "meshEnabled": true,
        "labels": { "app": "database", "version": "v2.0.0" }
      }
    ],
    "connections": [
      {
        "from": "api-server",
        "to": "database",
        "protocol": "grpc",
        "latency": "15ms",
        "errorRate": 0.02
      }
    ]
  }
}
```

### Create VirtualService (Traffic Management)

```http
POST /api/v1/service-mesh/virtualservices
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "name": "api-server",
  "namespace": "production",
  "hosts": ["api-server.production.svc.cluster.local"],
  "gateways": ["production-gateway"],
  "http": [
    {
      "name": "canary-routing",
      "match": [
        {
          "uri": { "prefix": "/api" }
        }
      ],
      "route": [
        {
          "destination": {
            "host": "api-server-v1",
            "subset": "v1"
          },
          "weight": 90
        },
        {
          "destination": {
            "host": "api-server-v2",
            "subset": "v2"
          },
          "weight": 10
        }
      ]
    }
  ]
}
```

Response:
```json
{
  "success": true,
  "data": {
    "name": "api-server",
    "namespace": "production",
    "gateway": "production-gateway",
    "createdAt": "2024-02-06T14:00:00Z",
    "trafficSplit": {
      "v1": 90,
      "v2": 10
    }
  },
  "message": "VirtualService created successfully"
}
```

### Update VirtualService (Canary Release)

```http
PUT /api/v1/service-mesh/virtualservices/{name}?namespace={ns}
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "trafficSplit": {
    "v1": 70,
    "v2": 30
  },
  "strategy": "canary"
}
```

Response:
```json
{
  "success": true,
  "data": {
    "name": "api-server",
    "previousSplit": { "v1": 90, "v2": 10 },
    "newSplit": { "v1": 70, "v2": 30 },
    "strategy": "canary"
  },
  "message": "Canary traffic split updated to 70% v1, 30% v2"
}
```

### Create DestinationRule (Subset Management)

```http
POST /api/v1/service-mesh/destinationrules
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "name": "api-server",
  "namespace": "production",
  "host": "api-server.production.svc.cluster.local",
  "subsets": [
    {
      "name": "v1",
      "labels": { "version": "v1.2.0" }
    },
    {
      "name": "v2",
      "labels": { "version": "v2.0.0" }
    }
  ]
}
```

### Get Traffic Mirroring Configuration

```http
GET /api/v1/service-mesh/mirroring/{service}?namespace={ns}
Authorization: Bearer <access_token>
```

Response:
```json
{
  "success": true,
  "data": {
    "service": "api-server",
    "namespace": "production",
    "mirroring": {
      "enabled": true,
      "target": "api-server-staging.production.svc.cluster.local",
      "percentage": 10
    }
  }
}
```

### Configure Traffic Mirroring

```http
POST /api/v1/service-mesh/mirroring
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "service": "api-server",
  "namespace": "production",
  "target": "api-server-staging.production.svc.cluster.local",
  "percentage": 10
}
```

### Configure Circuit Breaker

```http
POST /api/v1/service-mesh/circuit-breaker
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "service": "api-server",
  "namespace": "production",
  "circuitBreaker": {
    "consecutiveErrors": 5,
    "interval": "30s",
    "timeout": "5s",
    "retries": 3,
    "enabled": true
  }
}
```

Response:
```json
{
  "success": true,
  "message": "Circuit breaker configured for api-server"
}
```

### Get Service Mesh Policies

```http
GET /api/v1/service-mesh/policies?namespace={ns}
Authorization: Bearer <access_token>
```

Response:
```json
{
  "success": true,
  "data": [
    {
      "id": "policy-001",
      "name": "mTLS Policy",
      "namespace": "production",
      "type": "mtls",
      "spec": {
        "mode": "STRICT",
        "portLevelMtls": true
      },
      "createdAt": "2024-02-06T14:00:00Z"
    },
    {
      "id": "policy-002",
      "name": "Authorization Policy",
      "namespace": "production",
      "type": "authorization",
      "spec": {
        "action": "ALLOW",
        "rules": [
          {
            "from": ["frontend", "mobile-app"],
            "to": ["api-server"],
            "when": { "source": "request.principal" }
          }
        ]
      },
      "createdAt": "2024-02-06T14:00:00Z"
    }
  ]
}
```

### Configure mTLS Policy

```http
POST /api/v1/service-mesh/policies/mtls
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "name": "production-mtls",
  "namespace": "production",
  "mode": "STRICT",
  "services": ["api-server", "database"]
}
```

### Get Gateway Configuration

```http
GET /api/v1/service-mesh/gateways/{name}?namespace={ns}
Authorization: Bearer <access_token>
```

Response:
```json
{
  "success": true,
  "data": {
    "name": "production-gateway",
    "namespace": "production",
    "selector": {
      "istio": "ingressgateway"
    },
    "servers": [
      {
        "port": { "number": 80, "name": "http" },
        "hosts": ["*.production.example.com"]
      },
      {
        "port": { "number": 443, "name": "https" },
        "tls": {
          "mode": "SIMPLE",
          "credentialName": "tls-secret"
        },
        "hosts": ["*.production.example.com"]
      }
    ]
  }
}
```

### Configure Gateway

```http
POST /api/v1/service-mesh/gateways
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "name": "production-gateway",
  "namespace": "production",
  "selector": {
    "istio": "ingressgateway"
  },
  "servers": [
    {
      "port": { "number": 80, "name": "http" },
      "hosts": ["*.production.example.com"]
    }
  ]
}
```

---

## Deployment Strategies

### Canary Deployment

Canary deployment gradually routes traffic to new version while monitoring for issues.

**Configuration:**
```json
{
  "strategy": "canary",
  "service": "api-server",
  "namespace": "production",
  "versions": [
    { "name": "v1", "weight": 90, "image": "api-server:1.2.0" },
    { "name": "v2", "weight": 10, "image": "api-server:2.0.0" }
  ],
  "rolloutSchedule": {
    "enabled": true,
    "steps": [
      { "hour": 0, "weight": 10 },
      { "hour": 6, "weight": 25 },
      { "hour": 12, "weight": 50 },
      { "hour": 24, "weight": 100 }
    ]
  },
  "rollbackThreshold": {
    "errorRate": 5,
    "latency": "500ms"
  }
}
```

### Blue-Green Deployment

Blue-green deployment instantaneously switches all traffic between versions.

**Configuration:**
```json
{
  "strategy": "blue-green",
  "service": "api-server",
  "namespace": "production",
  "versions": [
    { "name": "blue", "weight": 100, "image": "api-server:1.2.0" },
    { "name": "green", "weight": 0, "image": "api-server:2.0.0" }
  ],
  "switchMode": "manual",
  "preSwitchTests": [
    { "type": "health", "threshold": "99%" },
    { "type": "smoke", "url": "/api/health" }
  ]
}
```

---

## OpenTelemetry Integration

### Overview

OpenTelemetry provides unified observability by collecting traces, metrics, and logs in a vendor-agnostic format.

### Components

**1. OpenTelemetry Collector**
```yaml
apiVersion: opentelemetry.io/v1alpha1
kind: OpenTelemetryCollector
metadata:
  name: otel-collector
  namespace: observability
spec:
  config: |
    receivers:
      otlp:
        protocols:
          grpc:
          http:
    processors:
      batch:
      memory_limiter:
    exporters:
      otlp/jaeger:
        endpoint: jaeger-collector.observability:4317
      prometheusremotewrite:
        endpoint: prometheus.observability:9090/api/v1/write
    service:
      pipelines:
        traces:
          receivers: [otlp]
          processors: [batch, memory_limiter]
          exporters: [otlp/jaeger]
        metrics:
          receivers: [otlp]
          processors: [batch]
          exporters: [prometheusremotewrite]
```

**2. OpenTelemetry Instrumentation**

Auto-instrumentation for applications using OpenTelemetry operators.

```http
GET /api/v1/service-mesh/otel/instrumentation
Authorization: Bearer <access_token>
```

Response:
```json
{
  "success": true,
  "data": {
    "enabled": true,
    "languages": ["java", "python", "go", "nodejs", "dotnet"],
    "autoInstrumentation": {
      "java": {
        "enabled": true,
        "libraries": ["jdbc", "jms", "http"]
      },
      "go": {
        "enabled": true,
        "libraries": ["net/http", "database/sql"]
      }
    }
  }
}
```

**3. Observability Exporters**

Supported exporters for OTel data:

| Exporter | Type | Purpose |
|-----------|------|---------|
| Jaeger | Traces | Distributed tracing storage |
| Prometheus | Metrics | Time-series metrics storage |
| Loki | Logs | Log aggregation |
| Tempo | Traces | Grafana-compatible tracing |
| Grafana | Metrics | Dashboard and visualization |

### Configure OpenTelemetry Collector

```http
POST /api/v1/service-mesh/otel/collector
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "name": "otel-collector",
  "namespace": "observability",
  "receivers": [
    {
      "type": "otlp",
      "protocols": ["grpc", "http"]
    }
  ],
  "processors": [
    { "type": "batch" },
    { "type": "memory_limiter" }
  ],
  "exporters": [
    {
      "type": "otlp/jaeger",
      "endpoint": "jaeger-collector.observability:4317"
    },
    {
      "type": "prometheusremotewrite",
      "endpoint": "prometheus.observability:9090/api/v1/write"
    }
  ]
}
```

### Get Traces

```http
GET /api/v1/service-mesh/traces?service={svc}&namespace={ns}&duration={time}
Authorization: Bearer <access_token>
```

**Query Parameters:**
- `service` (required) - Service name
- `namespace` (optional) - Filter by namespace
- `duration` (optional, default: `1h`) - Time range: `1h`, `6h`, `24h`, `7d`

Response:
```json
{
  "success": true,
  "data": {
    "service": "api-server",
    "namespace": "production",
    "timeRange": "1h",
    "traces": [
      {
        "traceId": "abc123-def456-ghi789",
        "spanId": "span-001",
        "operationName": "POST /api/users",
        "duration": 45000000,
        "startTime": "2024-02-06T14:00:00.000Z",
        "tags": {
          "http.method": "POST",
          "http.url": "/api/users",
          "http.status_code": "200",
          "service.name": "api-server"
        },
        "logs": [
          {
            "timestamp": "2024-02-06T14:00:00.010Z",
            "fields": { "message": "Query started" }
          }
        ],
        "references": []
      }
    ],
    "summary": {
      "totalTraces": 1250,
      "avgDuration": "45ms",
      "errorRate": "0.8%",
      "p99Duration": "150ms"
    }
  }
}
```

### Get Trace Details

```http
GET /api/v1/service-mesh/traces/{traceId}
Authorization: Bearer <access_token>
```

Response:
```json
{
  "success": true,
  "data": {
    "traceId": "abc123-def456-ghi789",
    "spans": [
      {
        "spanId": "span-001",
        "parentSpanId": null,
        "operationName": "HTTP POST /api/users",
        "duration": 45000000,
        "service": "api-server",
        "tags": {
          "http.method": "POST",
          "http.url": "/api/users",
          "http.status_code": "200"
        },
        "logs": [...]
      },
      {
        "spanId": "span-002",
        "parentSpanId": "span-001",
        "operationName": "Database Query",
        "duration": 30000000,
        "service": "database",
        "tags": {
          "db.type": "postgresql",
          "db.statement": "SELECT * FROM users"
        }
      }
    ]
  }
}
```

---

## Frontend Components

### ServiceMeshView Component

```typescript
function ServiceMeshView({ namespace }: ServiceMeshViewProps) {
  const { data: topology } = useServiceMeshTopology(namespace);
  const { data: metrics } = useServiceMeshMetrics();

  return (
    <div>
      <ServiceMeshHeader
        namespace={namespace}
        status={topology?.enabled}
      />

      <TopologyGraph
        nodes={topology?.services}
        connections={topology?.connections}
        onNodeClick={handleServiceClick}
        onConnectionClick={handleConnectionClick}
      />

      <TrafficControls>
        <CanaryControl onCanaryRelease={handleCanary} />
        <BlueGreenControl onSwitch={handleBlueGreenSwitch} />
        <TrafficMirroring onConfigureMirror={handleMirror} />
      </TrafficControls>

      <MetricsPanel
        latency={metrics?.latency}
        throughput={metrics?.throughput}
        errorRate={metrics?.errorRate}
      />
    </div>
  );
}
```

### TrafficManagementPanel Component

```typescript
function TrafficManagementPanel({ service, namespace }: TrafficPanelProps) {
  const [strategy, setStrategy] = useState<'canary' | 'blue-green'>('canary');
  const [trafficSplit, setTrafficSplit] = useState<{ [key: string]: number }>({});

  return (
    <Card>
      <h2>Traffic Management: {service}</h2>

      <StrategySelector
        value={strategy}
        onChange={setStrategy}
        options={[
          { value: 'canary', label: 'Canary Deployment' },
          { value: 'blue-green', label: 'Blue-Green Deployment' }
        ]}
      />

      {strategy === 'canary' && (
        <CanaryConfigurator
          service={service}
          versions={['v1', 'v2']}
          trafficSplit={trafficSplit}
          onChange={setTrafficSplit}
          rolloutSchedule={true}
        />
      )}

      {strategy === 'blue-green' && (
        <BlueGreenConfigurator
          service={service}
          versions={['blue', 'green']}
          activeVersion="blue"
          onSwitch={handleSwitch}
          preSwitchTests={true}
        />
      )}
    </Card>
  );
}
```

### TraceViewer Component

```typescript
function TraceViewer({ traceId }: TraceViewerProps) {
  const { data: trace } = useTraceDetail(traceId);

  return (
    <div>
      <TraceHeader
        traceId={trace?.traceId}
        startTime={trace?.startTime}
        duration={trace?.duration}
      />

      <TraceWaterfall
        spans={trace?.spans}
        layout="waterfall"
        showTimeline={true}
      />

      <TraceSummary
        totalSpans={trace?.spans?.length}
        avgDuration={calculateAvgDuration(trace?.spans)}
        errorRate={calculateErrorRate(trace?.spans)}
      />

      <SpanDetailsPanel
        selectedSpan={selectedSpan}
        tags={selectedSpan?.tags}
        logs={selectedSpan?.logs}
      />
    </div>
  );
}
```

---

## RBAC Permissions

| Operation | Permission Required |
|-----------|-------------------|
| View service mesh status | READ + SERVICE_MESH |
| Get service topology | READ + SERVICE_MESH |
| Create/Update VirtualService | WRITE + SERVICE_MESH |
| Configure traffic mirroring | WRITE + SERVICE_MESH |
| Configure circuit breaker | WRITE + SERVICE_MESH |
| Manage policies | WRITE + SERVICE_MESH |
| View traces | READ + SERVICE_MESH |
| Configure OpenTelemetry | ADMIN + SERVICE_MESH |

---

## Configuration

```properties
# Service Mesh
service-mesh.enabled=true
service-mesh.provider=istio
service-mesh.namespace=istio-system
service-mesh.version=1.18.0

# Traffic Management
service-mesh.traffic.canary-default-percentage=10
service-mesh.traffic.blue-green-switch-mode=manual
service-mesh.traffic.rollout-interval-hours=6

# Circuit Breaker
service-mesh.circuit-breaker.enabled=true
service-mesh.circuit-breaker.consecutive-errors=5
service-mesh.circuit-breaker.interval=30s
service-mesh.circuit-breaker.timeout=5s

# OpenTelemetry
service-mesh.otel.enabled=true
service-mesh.otel.collector-deployment=true
service-mesh.otel.instrumentation-enabled=true
service-mesh.otel.exporters=jaeger,prometheus

# Tracing
service-mesh.tracing.enabled=true
service-mesh.tracing.sample-rate=1.0
service-mesh.tracing.max-trace-duration=30s
```

---

## Error Handling

### Service Mesh Not Enabled
```json
{
  "success": false,
  "message": "Service mesh is not enabled in this cluster",
  "error": "SERVICE_MESH_NOT_ENABLED",
  "statusCode": 400
}
```

### Invalid Traffic Split
```json
{
  "success": false,
  "message": "Invalid traffic split configuration: total must equal 100%",
  "error": "INVALID_TRAFFIC_SPLIT",
  "statusCode": 400,
  "details": {
    "currentTotal": 110,
    "requiredTotal": 100
  }
}
```

### Circuit Breaker Threshold Exceeded
```json
{
  "success": false,
  "message": "Circuit breaker triggered for service api-server",
  "error": "CIRCUIT_BREAKER_TRIGGERED",
  "statusCode": 503,
  "details": {
    "service": "api-server",
    "consecutiveErrors": 10,
    "threshold": 5
  }
}
```

---

## Testing

```java
@SpringBootTest
@AutoConfigureMockMvc
public class ServiceMeshControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    public void testGetServiceTopology() throws Exception {
        mockMvc.perform(get("/api/v1/service-mesh/topology")
                .param("namespace", "production")
                .header("Authorization", "Bearer " + token))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.success").value(true))
            .andExpect(jsonPath("$.data.services").isArray());
    }

    @Test
    public void testCreateVirtualService() throws Exception {
        mockMvc.perform(post("/api/v1/service-mesh/virtualservices")
                .contentType(MediaType.APPLICATION_JSON)
                .header("Authorization", "Bearer " + token)
                .content("{\"name\":\"api-server\",\"namespace\":\"production\"}"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.success").value(true));
    }

    @Test
    public void testConfigureCanaryRelease() throws Exception {
        mockMvc.perform(put("/api/v1/service-mesh/virtualservices/api-server")
                .param("namespace", "production")
                .contentType(MediaType.APPLICATION_JSON)
                .header("Authorization", "Bearer " + token)
                .content("{\"trafficSplit\":{\"v1\":70,\"v2\":30}}"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.success").value(true));
    }
}
```

---

## Future Enhancements

- [ ] Multi-cluster service mesh (cross-cluster service discovery)
- [ ] Advanced circuit breaker patterns (bulkhead, timeout)
- [ ] Fault injection (latency, errors) for testing
- [ ] Service mesh policy templates library
- [ ] Automated rollback on Canary failures
- [ ] A/B testing (multi-variant testing)
- [ ] Service mesh health scoring
- [ ] Custom span processors in OTel collector
- [ ] Span sampling strategies (adaptive, probabilistic)
- [ ] Integration with external tracing systems (Zipkin, Honeycomb)
- [ ] Real-time topology updates with WebSocket
- [ ] Traffic mirroring analysis (compare production vs staging)
- [ ] Mesh policy validation and dry-run
- [ ] Service-to-service authorization matrix UI
- [ ] OTel trace correlation with logs
- [ ] Custom OTel metrics collection
- [ ] Service mesh performance benchmarking
