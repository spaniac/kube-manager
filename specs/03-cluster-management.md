# Cluster Management

## Overview

Cluster Management provides comprehensive APIs and UI for monitoring cluster health, managing nodes, viewing events, and tracking resource usage across the Kubernetes cluster.

---

## Features

1. **Cluster Overview** - Basic cluster information and health status
2. **Node Management** - List, view, cordon, uncordon, and drain nodes
3. **Cluster Health** - Overall cluster health and component status
4. **Resource Usage** - CPU, memory, storage metrics
5. **Cluster Events** - Filterable event log
6. **Metrics History** - Historical metrics data with time range selection

---

## API Endpoints

### Get Cluster Overview

```http
GET /api/v1/cluster
Authorization: Bearer <access_token>
```

Response:
```json
{
  "success": true,
  "data": {
    "name": "production-cluster",
    "version": "v1.28.3",
    "platform": "AWS EKS",
    "apiServerUrl": "https://k8s.example.com",
    "nodeCount": 5,
    "podCount": 42,
    "namespaceCount": 12,
    "createdAt": "2024-01-15T10:00:00Z"
  }
}
```

### List All Nodes

```http
GET /api/v1/cluster/nodes
Authorization: Bearer <access_token>
```

Response:
```json
{
  "success": true,
  "data": [
    {
      "name": "control-plane-1",
      "status": "Ready",
      "roles": ["control-plane", "master"],
      "age": "30d",
      "version": "v1.28.3",
      "osImage": "Ubuntu 22.04 LTS",
      "kernel": "5.15.0-1054-aws",
      "containerRuntime": "containerd://1.6.22",
      "capacity": {
        "cpu": "4",
        "memory": "16Gi",
        "storage": "100Gi",
        "pods": "110"
      },
      "allocatable": {
        "cpu": "3.9",
        "memory": "15.5Gi",
        "storage": "90Gi",
        "pods": "110"
      },
      "conditions": [
        {
          "type": "Ready",
          "status": "True",
          "lastTransitionTime": "2024-02-01T10:00:00Z"
        }
      ]
    },
    {
      "name": "worker-1",
      "status": "Ready",
      "roles": ["worker"],
      "age": "25d",
      "version": "v1.28.3",
      "osImage": "Ubuntu 22.04 LTS",
      "kernel": "5.15.0-1054-aws",
      "containerRuntime": "containerd://1.6.22",
      "capacity": { ... },
      "allocatable": { ... },
      "conditions": [ ... ]
    }
  ]
}
```

### Get Node Details

```http
GET /api/v1/cluster/nodes/{name}
Authorization: Bearer <access_token>
```

Response:
```json
{
  "success": true,
  "data": {
    "name": "worker-1",
    "status": "Ready",
    "roles": ["worker"],
    "age": "25d",
    "labels": {
      "node-role.kubernetes.io/worker": "",
      "topology.kubernetes.io/zone": "us-west-2a"
    },
    "annotations": { ... },
    "taints": [],
    "unschedulable": false,
    "pods": [
      {
        "name": "nginx-deployment-7d8b6d8f9-x2k4p",
        "namespace": "default",
        "status": "Running",
        "cpu": "500m",
        "memory": "512Mi"
      }
    ],
    "images": [
      {
        "names": ["nginx:1.21", "busybox:latest"],
        "size": "123456789"
      }
    ]
  }
}
```

### Cordon Node

Marks a node as unschedulable, preventing new pods from being placed on it.

```http
POST /api/v1/cluster/nodes/{name}/cordon
Authorization: Bearer <access_token>
```

Response:
```json
{
  "success": true,
  "message": "Node cordoned successfully"
}
```

### Uncordon Node

Marks a node as schedulable again, allowing new pods to be placed on it.

```http
POST /api/v1/cluster/nodes/{name}/uncordon
Authorization: Bearer <access_token>
```

Response:
```json
{
  "success": true,
  "message": "Node uncordoned successfully"
}
```

### Drain Node

Safely evicts all pods from a node and marks it as unschedulable.

```http
POST /api/v1/cluster/nodes/{name}/drain
Authorization: Bearer <access_token>
```

**Optional Query Parameters:**
- `gracePeriodSeconds` - Grace period for pod termination (default: 30)
- `deleteEmptyDirData` - Delete emptyDir data (default: false)
- `timeoutSeconds` - Timeout for drain operation (default: 300)

Response:
```json
{
  "success": true,
  "message": "Node drained successfully"
}
```

**Behavior:**
1. Marks node as unschedulable (cordon)
2. Evicts pods respecting PDBs
3. Waits for pods to be rescheduled
4. Returns failure if pods cannot be rescheduled

### Get Cluster Health

```http
GET /api/v1/cluster/health
Authorization: Bearer <access_token>
```

Response:
```json
{
  "success": true,
  "data": {
    "overall": "Healthy",
    "components": [
      {
        "name": "API Server",
        "status": "Healthy",
        "message": "All API servers responding"
      },
      {
        "name": "Controller Manager",
        "status": "Healthy",
        "message": "No errors reported"
      },
      {
        "name": "Scheduler",
        "status": "Healthy",
        "message": "Scheduling working normally"
      },
      {
        "name": "Kubelet",
        "status": "Degraded",
        "message": "2 nodes not responding",
        "affectedNodes": ["worker-3", "worker-4"]
      },
      {
        "name": "Etcd",
        "status": "Healthy",
        "message": "Quorum maintained"
      }
    ],
    "issues": [
      {
        "severity": "Warning",
        "description": "Node worker-3 is NotReady",
        "affectedResource": "worker-3",
        "resourceType": "Node"
      }
    ]
  }
}
```

### Get Cluster Resource Usage

```http
GET /api/v1/cluster/usage
Authorization: Bearer <access_token>
```

Response:
```json
{
  "success": true,
  "data": {
    "cpu": {
      "usage": 12.5,
      "capacity": 20,
      "usagePercent": 62.5,
      "unit": "Cores"
    },
    "memory": {
      "usage": "64",
      "capacity": 128,
      "usagePercent": 50,
      "unit": "Gi"
    },
    "storage": {
      "usage": 450,
      "capacity": 1000,
      "usagePercent": 45,
      "unit": "Gi"
    },
    "pods": {
      "usage": 42,
      "capacity": 550,
      "usagePercent": 7.6
    },
    "nodes": {
      "total": 5,
      "ready": 4,
      "notReady": 1
    }
  }
}
```

### Get Cluster Events

```http
GET /api/v1/cluster/events?type={type}&namespace={namespace}
Authorization: Bearer <access_token>
```

**Query Parameters:**
- `type` (optional) - Filter by event type: `Normal`, `Warning`
- `namespace` (optional) - Filter by namespace

Response:
```json
{
  "success": true,
  "data": [
    {
      "type": "Warning",
      "reason": "FailedMount",
      "message": "MountVolume.SetUp failed for volume \"pvc-data\"",
      "namespace": "default",
      "source": {
        "component": "kubelet",
        "host": "worker-1"
      },
      "involvedObject": {
        "kind": "Pod",
        "name": "my-pod-abc123",
        "namespace": "default"
      },
      "firstSeen": "2024-02-06T10:00:00Z",
      "lastSeen": "2024-02-06T10:05:00Z",
      "count": 3
    },
    {
      "type": "Normal",
      "reason": "Scheduled",
      "message": "Successfully assigned default/my-pod-abc123 to worker-1",
      "namespace": "default",
      "source": { ... },
      "involvedObject": { ... },
      "firstSeen": "2024-02-06T10:00:00Z",
      "lastSeen": "2024-02-06T10:00:00Z",
      "count": 1
    }
  ]
}
```

### Get Metrics History

```http
GET /api/v1/cluster/metrics?metricType={type}&since={timestamp}
Authorization: Bearer <access_token>
```

**Query Parameters:**
- `metricType` (optional, default: `cpu`) - Type of metric: `cpu`, `memory`, `storage`
- `since` (optional, default: `0`) - Retrieve metrics since this timestamp (milliseconds since epoch)

Response:
```json
{
  "success": true,
  "data": {
    "metricType": "cpu",
    "timeRange": {
      "start": "2024-02-05T14:00:00Z",
      "end": "2024-02-06T14:00:00Z"
    },
    "dataPoints": [
      {
        "timestamp": "2024-02-05T14:00:00Z",
        "value": 10.5
      },
      {
        "timestamp": "2024-02-05T15:00:00Z",
        "value": 11.2
      },
      ...
    ],
    "summary": {
      "average": 11.8,
      "minimum": 10.5,
      "maximum": 15.3,
      "trend": "increasing"
    }
  }
}
```

---

## Node Status

### Possible Node Status Values

| Status | Description | Action Required |
|---------|-------------|----------------|
| Ready | Node is healthy and accepting pods | None |
| NotReady | Node is not healthy or not responding | Investigate |
| Unknown | Node status cannot be determined | Investigate |
| Unschedulable | Node marked for maintenance (cordoned) | Uncordon when ready |

### Node Conditions

| Condition Type | Status | Description |
|---------------|---------|-------------|
| Ready | True/False | Node is ready to accept pods |
| MemoryPressure | True/False | Node has memory pressure |
| DiskPressure | True/False | Node has disk pressure |
| PIDPressure | True/False | Node has PID pressure |
| NetworkUnavailable | True/False | Node network is unavailable |

---

## Frontend Components

### ClusterOverview Component

```typescript
interface ClusterOverviewProps {
  cluster: ClusterInfoDTO;
}

function ClusterOverview({ cluster }: ClusterOverviewProps) {
  return (
    <div className="grid grid-cols-4 gap-4">
      <Card title="Cluster Name">{cluster.name}</Card>
      <Card title="Version">{cluster.version}</Card>
      <Card title="Platform">{cluster.platform}</Card>
      <Card title="Nodes">{cluster.nodeCount}</Card>
      <Card title="Pods">{cluster.podCount}</Card>
      <Card title="Namespaces">{cluster.namespaceCount}</Card>
    </div>
  );
}
```

### NodeList Component

```typescript
function NodeList() {
  const { data: nodes } = useNodes();
  const [filter, setFilter] = useState('');

  const filteredNodes = nodes?.filter(node =>
    node.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <SearchInput value={filter} onChange={setFilter} />
      <Table>
        <TableHeader>
          <HeaderCell>Name</HeaderCell>
          <HeaderCell>Status</HeaderCell>
          <HeaderCell>Roles</HeaderCell>
          <HeaderCell>Age</HeaderCell>
          <HeaderCell>Actions</HeaderCell>
        </TableHeader>
        {filteredNodes.map(node => (
          <Row key={node.name}>
            <Cell>{node.name}</Cell>
            <Cell>
              <StatusBadge status={node.status} />
            </Cell>
            <Cell>{node.roles.join(', ')}</Cell>
            <Cell>{formatAge(node.age)}</Cell>
            <Cell>
              {hasPermission('WRITE', 'NODE') && (
                <>
                  <Button onClick={() => cordonNode(node.name)}>
                    Cordon
                  </Button>
                  <Button onClick={() => uncordonNode(node.name)}>
                    Uncordon
                  </Button>
                  <Button onClick={() => drainNode(node.name)}>
                    Drain
                  </Button>
                </>
              )}
            </Cell>
          </Row>
        ))}
      </Table>
    </div>
  );
}
```

### NodeDetails Component

```typescript
function NodeDetails({ nodeName }: { nodeName: string }) {
  const { data: node } = useNode(nodeName);
  const { data: health } = useClusterHealth();

  const isUnschedulable = node?.unschedulable || false;

  return (
    <div>
      <Header>
        <Title>Node: {node?.name}</Title>
        {isUnschedulable && (
          <Badge variant="warning">Unschedulable</Badge>
        )}
      </Header>

      <Section title="Status">
        <StatusCard status={node?.status} />
      </Section>

      <Section title="Capacity">
        <ResourceTable
          resources={[
            { name: 'CPU', used: node?.capacity.cpu, total: node?.allocatable.cpu },
            { name: 'Memory', used: node?.capacity.memory, total: node?.allocatable.memory },
            { name: 'Storage', used: node?.capacity.storage, total: node?.allocatable.storage },
            { name: 'Pods', used: node?.pods.length, total: node?.capacity.pods },
          ]}
        />
      </Section>

      <Section title="Conditions">
        {node?.conditions.map(condition => (
          <ConditionRow key={condition.type} condition={condition} />
        ))}
      </Section>

      <Section title="Pods">
        <PodTable pods={node?.pods} />
      </Section>

      <Actions>
        <Button onClick={() => cordonNode(nodeName)} disabled={isUnschedulable}>
          Cordon Node
        </Button>
        <Button onClick={() => uncordonNode(nodeName)} disabled={!isUnschedulable}>
          Uncordon Node
        </Button>
        <Button onClick={() => drainNode(nodeName)} variant="danger">
          Drain Node
        </Button>
      </Actions>
    </div>
  );
}
```

---

### Node Details Component

| Operation | Permission Required |
|-----------|-------------------|
| View cluster overview | READ + NAMESPACE or READ + POD |
| View nodes | READ + NODE |
| View node details | READ + NODE |
| Cordon node | WRITE + NODE |
| Uncordon node | WRITE + NODE |
| Drain node | WRITE + NODE |
| View cluster health | READ + NODE |
| View resource usage | READ + NODE |
| View cluster events | READ + NODE |
| View metrics history | READ + NODE |

---

## Error Handling

### Node Not Found
```json
{
  "success": false,
  "message": "Node not found",
  "error": "NODE_NOT_FOUND",
  "statusCode": 404
}
```

### Node Already Cordoned
```json
{
  "success": false,
  "message": "Node is already cordoned",
  "error": "NODE_ALREADY_CORDONED",
  "statusCode": 400
}
```

### Drain Failed
```json
{
  "success": false,
  "message": "Drain failed: pods cannot be rescheduled",
  "error": "DRAIN_FAILED",
  "statusCode": 400,
  "details": {
    "failedPods": [
      {
        "name": "pod-1",
        "namespace": "default",
        "reason": "PodDisruptionBudget"
      }
    ]
  }
}
```

---

## Performance Considerations

1. **Caching**: Node list cached for 30 seconds
2. **Drain Timeout**: Default 300 seconds (5 minutes)
3. **Events Pagination**: Return max 1000 events
4. **Metrics Resolution**: 5-minute intervals for history

---

## Monitoring Integration

### Prometheus Queries Used

```promql
# Node status
sum(kube_node_status_condition{condition="Ready", status="true"} == 1)
by (node)

# Node resource usage
sum(kube_node_status_capacity{resource="cpu"})
by (node)

sum(kube_node_status_allocatable{resource="cpu"})
by (node)
```

---

## Configuration

```properties
# Node Management
cluster.node.cordon-timeout-seconds=60
cluster.node.uncordon-timeout-seconds=60
cluster.node.drain-timeout-seconds=300
cluster.node.drain-grace-period-seconds=30

# Health Checks
cluster.health-check.interval-seconds=30
cluster.health-check.timeout-seconds=10

# Metrics
cluster.metrics.retention-days=30
cluster.metrics.resolution-minutes=5

# Events
cluster.events.max-age-days=7
cluster.events.max-count=1000
```

---

## Testing

```java
@SpringBootTest
@AutoConfigureMockMvc
public class ClusterControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    public void testGetClusterOverview() throws Exception {
        mockMvc.perform(get("/api/v1/cluster")
                .header("Authorization", "Bearer " + token))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.success").value(true))
            .andExpect(jsonPath("$.data.name").isNotEmpty())
            .andExpect(jsonPath("$.data.version").isNotEmpty());
    }

    @Test
    public void testCordonNode() throws Exception {
        mockMvc.perform(post("/api/v1/cluster/nodes/worker-1/cordon")
                .header("Authorization", "Bearer " + token))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.success").value(true))
            .andExpect(jsonPath("$.message").value("Node cordoned successfully"));
    }

    @Test
    public void testDrainNodeUnauthorized() throws Exception {
        mockMvc.perform(post("/api/v1/cluster/nodes/worker-1/drain")
                .header("Authorization", "Bearer " + unauthorizedToken))
            .andExpect(status().isForbidden());
    }
}
```

---

## Future Enhancements

- [ ] Node labeling
- [ ] Node taint management
- [ ] Node capacity alerts
- [ ] Node auto-scaling recommendations
- [ ] Node upgrade orchestration
- [ ] Node performance metrics
- [ ] Advanced event filtering (by resource, by severity, by time)
- [ ] Event export to external systems
