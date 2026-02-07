# Pod Management

## Overview

Pod Management provides APIs and UI for listing, viewing, and managing Kubernetes pods with real-time status updates, events, and related resource views.

---

## Features

1. **Pod Listing** - List pods with filtering and search
2. **Pod Details** - View pod information, containers, volumes, and resources
3. **Pod Events** - View events related to a specific pod
4. **Related Resources** - View workloads and services related to a pod
5. **YAML Viewing** - View and copy pod YAML definition
6. **Real-time Updates** - WebSocket-based status updates

---

## API Endpoints

### List Pods

```http
GET /api/v1/pods?namespace={ns}&labelSelector={labels}
Authorization: Bearer <access_token>
```

**Query Parameters:**
- `namespace` (optional) - Filter by namespace
- `labelSelector` (optional) - Label selector for filtering (e.g., `app=nginx`)

Response:
```json
{
  "success": true,
  "data": [
    {
      "name": "nginx-deployment-7d8b6d8f9-abc123",
      "namespace": "default",
      "status": "Running",
      "phase": "Running",
      "ready": true,
      "ip": "10.244.1.5",
      "nodeName": "worker-1",
      "age": "1h23m",
      "restartPolicy": "Always",
      "labels": {
        "app": "nginx",
        "pod-template-hash": "7d8b6d8f9"
      },
      "containers": [
        {
          "name": "nginx",
          "image": "nginx:1.21",
          "ready": true,
          "restartCount": 0,
          "state": "running",
          "startedAt": "2024-02-06T14:00:00Z"
        }
      ],
      "volumes": [
        {
          "name": "config-volume",
          "type": "ConfigMap",
          "configMapName": "nginx-config"
        }
      ]
    }
  ]
}
```

### Get Pod Details

```http
GET /api/v1/pods/{namespace}/{name}
Authorization: Bearer <access_token>
```

Response:
```json
{
  "success": true,
  "data": {
    "name": "nginx-deployment-7d8b6d8f9-abc123",
    "namespace": "default",
    "status": "Running",
    "phase": "Running",
    "ready": true,
    "ip": "10.244.1.5",
    "nodeName": "worker-1",
    "podIp": "10.244.1.5",
    "hostIp": "10.244.1.1",
    "startTime": "2024-02-06T14:00:00Z",
    "labels": { ... },
    "annotations": { ... },
    "restartPolicy": "Always",
    "priority": "0",
    "qosClass": "Burstable",
    "resourceUsage": {
      "cpu": "500m",
      "memory": "256Mi"
    },
    "resourceRequests": {
      "cpu": "500m",
      "memory": "256Mi"
    },
    "resourceLimits": {
      "cpu": "1000m",
      "memory": "1Gi"
    },
    "conditions": [
      {
        "type": "Ready",
        "status": "True",
        "message": "Container is ready"
      }
    ],
    "containers": [ ... ],
    "initContainers": [],
    "volumes": [ ... ],
    "ownerReferences": [
      {
        "kind": "ReplicaSet",
        "name": "nginx-deployment-7d8b6d8f9",
        "controller": true
      }
    ]
  }
}
```

### Delete Pod

```http
DELETE /api/v1/pods/{namespace}/{name}
Authorization: Bearer <access_token>
```

Response:
```json
{
  "success": true,
  "message": "Pod deleted successfully"
}
```

### Get Pod Events

```http
GET /api/v1/pods/{namespace}/{name}/events
Authorization: Bearer <access_token>
```

Response:
```json
{
  "success": true,
  "data": [
    {
      "type": "Normal",
      "reason": "Scheduled",
      "message": "Successfully assigned default/nginx-deployment-7d8b6d8f9-abc123 to worker-1",
      "source": {
        "component": "default-scheduler"
      },
      "firstSeen": "2024-02-06T14:00:00Z",
      "lastSeen": "2024-02-06T14:00:00Z",
      "count": 1
    },
    {
      "type": "Normal",
      "reason": "Pulling",
      "message": "Pulling image nginx:1.21",
      "source": {
        "component": "kubelet",
        "host": "worker-1"
      },
      "firstSeen": "2024-02-06T14:00:00Z",
      "lastSeen": "2024-02-06T14:01:00Z"
    },
    {
      "type": "Warning",
      "reason": "FailedMount",
      "message": "MountVolume.SetUp failed for volume \"config-volume\"",
      "source": {
        "component": "kubelet",
        "host": "worker-1"
      },
      "firstSeen": "2024-02-06T14:05:00Z",
      "lastSeen": "2024-02-06T14:05:00Z",
      "count": 3
    }
  ]
}
```

### Get Related Resources

```http
GET /api/v1/pods/{namespace}/{name}/related
Authorization: Bearer <access_token>
```

Response:
```json
{
  "success": true,
  "data": {
    "resources": [
      {
        "kind": "Deployment",
        "name": "nginx-deployment",
        "namespace": "default",
        "apiVersion": "apps/v1"
      },
      {
        "kind": "ReplicaSet",
        "name": "nginx-deployment-7d8b6d8f9",
        "namespace": "default",
        "apiVersion": "apps/v1"
      },
      {
        "kind": "Service",
        "name": "nginx-service",
        "namespace": "default",
        "apiVersion": "v1"
      },
      {
        "kind": "ConfigMap",
        "name": "nginx-config",
        "namespace": "default",
        "apiVersion": "v1"
      }
    ],
    "owner": {
      "kind": "ReplicaSet",
      "name": "nginx-deployment-7d8b6d8f9"
    }
  }
}
```

### Get Pod as YAML

```http
GET /api/v1/pods/{namespace}/{name}/yaml
Authorization: Bearer <access_token>
```

Response:
```json
{
  "success": true,
  "data": "apiVersion: v1\nkind: Pod\nmetadata:\n  name: nginx-deployment-7d8b6d8f9-abc123\n  namespace: default\nspec:\n  containers:\n  - name: nginx\n    image: nginx:1.21\n    ports:\n    - containerPort: 80\n      protocol: TCP\n"
}
```

---

## Pod Status

### Possible Status Values

| Status | Phase | Description | Action Required |
|---------|---------|----------------|
| Pending | Pod created, not scheduled yet | Wait for scheduling |
| ContainerCreating | Container images being pulled | Wait for container start |
| Running | Pod is running normally | Monitor logs if issues |
| Succeeded | Pod completed successfully | View results if job pod |
| Failed | Pod failed | Check logs for error |
| Unknown | Pod state cannot be determined | Investigate |

### Container States

| State | Description |
|---------|-------------|
| Waiting | Container waiting to start |
| Running | Container is running |
| Terminated | Container stopped |

### Pod Conditions

| Condition Type | Status | Description |
|---------------|---------|-------------|
| PodScheduled | True/False | Pod assigned to a node |
| Initialized | True/False | All init containers started |
| Ready | True/False | Pod is ready to serve traffic |
| ContainersReady | True/False | All containers are ready |

---

## Real-time Updates

### WebSocket Connection

```typescript
const ws = new WebSocket('ws://localhost:8080/ws/pods');

ws.onmessage = (event) => {
  const update = JSON.parse(event.data);

  switch(update.type) {
    case 'podAdded':
      // Add pod to list
      break;
    case 'podUpdated':
      // Update pod in list
      break;
    case 'podDeleted':
      // Remove pod from list
      break;
    case 'podStatusChanged':
      // Update pod status
      break;
  }
};
```

### Update Payload Format

```json
{
  "type": "podStatusChanged",
  "resource": {
    "kind": "Pod",
    "namespace": "default",
    "name": "nginx-deployment-7d8b6d8f9-abc123"
  },
  "changes": {
    "status": {
      "from": "Pending",
      "to": "Running"
    },
    "ready": {
      "from": false,
      "to": true
    }
  }
}
```

---

## Frontend Components

### PodList Component

```typescript
function PodList() {
  const { data: pods } = usePods();
  const [filter, setFilter] = useState('');
  const [namespace, setNamespace] = useState('default');

  const filtered = pods?.filter(pod =>
    pod.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <NamespaceSelector value={namespace} onChange={setNamespace} />
      <SearchInput value={filter} onChange={setFilter} />

      <PodTable pods={filtered} />
    </div>
  );
}
```

### PodTable Component

```typescript
interface PodTableProps {
  pods: PodDTO[];
}

function PodTable({ pods }: PodTableProps) {
  return (
    <Table>
      <TableHeader>
        <HeaderCell>Name</HeaderCell>
        <HeaderCell>Namespace</HeaderCell>
        <HeaderCell>Status</HeaderCell>
        <HeaderCell>Ready</HeaderCell>
        <HeaderCell>IP</HeaderCell>
        <HeaderCell>Node</HeaderCell>
        <HeaderCell>Age</HeaderCell>
        <HeaderCell>Actions</HeaderCell>
      </TableHeader>
      {pods.map(pod => (
        <Row key={`${pod.namespace}/${pod.name}`}>
          <Cell>
            <Link to={`/pods/${pod.namespace}/${pod.name}`}>
              {pod.name}
            </Link>
          </Cell>
          <Cell>{pod.namespace}</Cell>
          <Cell>
            <StatusBadge status={pod.status} ready={pod.ready} />
          </Cell>
          <Cell>{pod.ready ? 'Yes' : 'No'}</Cell>
          <Cell>{pod.ip || '-'}</Cell>
          <Cell>{pod.nodeName}</Cell>
          <Cell>{formatAge(pod.age)}</Cell>
          <Cell>
            <Button onClick={() => viewLogs(pod)}>Logs</Button>
            <Button onClick={() => openTerminal(pod)}>Terminal</Button>
            <Button onClick={() => viewYaml(pod)}>YAML</Button>
            {hasPermission('DELETE', 'POD') && (
              <Button variant="danger" onClick={() => deletePod(pod)}>
                Delete
              </Button>
            )}
          </Cell>
        </Row>
      ))}
    </Table>
  );
}
```

### PodDetails Component

```typescript
function PodDetails({ namespace, name }: PodProps) {
  const { data: pod } = usePod(namespace, name);
  const { data: events } = usePodEvents(namespace, name);
  const { data: related } = useRelatedResources(namespace, name);

  return (
    <div>
      <Header>
        <Title>{pod?.name}</Title>
        <Namespace>{pod?.namespace}</Namespace>
      </Header>

      <Tabs>
        <Tab label="Overview">
          <PodOverview pod={pod} />
        </Tab>
        <Tab label="Containers">
          <ContainerList containers={pod?.containers} />
        </Tab>
        <Tab label="Volumes">
          <VolumeList volumes={pod?.volumes} />
        </Tab>
        <Tab label="Conditions">
          <ConditionList conditions={pod?.conditions} />
        </Tab>
        <Tab label="Events">
          <EventList events={events} />
        </Tab>
        <Tab label="Related">
          <RelatedResources resources={related?.resources} />
        </Tab>
        <Tab label="YAML">
          <YamlViewer resource={`pod/${name}`} namespace={namespace} />
        </Tab>
      </Tabs>

      <Actions>
        <Button onClick={() => openTerminal(namespace, name)}>
          Open Terminal
        </Button>
        <Button onClick={() => viewLogs(namespace, name)}>
          View Logs
        </Button>
        <Button onClick={() => viewYaml(namespace, name)}>
          View YAML
        </Button>
        {hasPermission('DELETE', 'POD') && (
          <Button variant="danger" onClick={() => deletePod(namespace, name)}>
            Delete Pod
          </Button>
        )}
      </Actions>
    </div>
  );
}
```

---

## RBAC Permissions

| Operation | Permission Required |
|-----------|-------------------|
| List pods | READ + POD |
| View pod details | READ + POD |
| View pod events | READ + POD |
| View related resources | READ + POD |
| View pod YAML | READ + POD |
| Delete pod | DELETE + POD |

---

## Error Handling

### Pod Not Found
```json
{
  "success": false,
  "message": "Pod not found",
  "error": "POD_NOT_FOUND",
  "statusCode": 404
}
```

### Pod Deletion Failed
```json
{
  "success": false,
  "message": "Failed to delete pod",
  "error": "POD_DELETION_FAILED",
  "statusCode": 400,
  "details": {
    "reason": "Pod has finalizer preventing deletion"
  }
}
```

---

## Configuration

```properties
# Pod Management
pod.list.page-size=50
pod.list.cache-seconds=10

# Real-time Updates
pod.websocket.enabled=true
pod.websocket.reconnect-interval-seconds=5

# Events
pod.events.max-age-days=7
pod.events.max-count=100
```

---

## Testing

```java
@SpringBootTest
@AutoConfigureMockMvc
public class PodControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    public void testListPods() throws Exception {
        mockMvc.perform(get("/api/v1/pods")
                .header("Authorization", "Bearer " + token))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.success").value(true))
            .andExpect(jsonPath("$.data").isArray());
    }

    @Test
    public void testGetPodDetails() throws Exception {
        mockMvc.perform(get("/api/v1/pods/default/nginx-pod")
                .header("Authorization", "Bearer " + token))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.success").value(true))
            .andExpect(jsonPath("$.data.name").value("nginx-pod"))
            .andExpect(jsonPath("$.data.status").isNotEmpty());
    }

    @Test
    public void testDeletePodUnauthorized() throws Exception {
        mockMvc.perform(delete("/api/v1/pods/default/nginx-pod")
                .header("Authorization", "Bearer " + unauthorizedToken))
            .andExpect(status().isForbidden());
    }
}
```

---

## Future Enhancements

- [ ] Pod filtering by node
- [ ] Pod sorting options (by name, by age, by status)
- [ ] Pod metrics visualization
- [ ] Pod resource usage trends
- [ ] Bulk pod operations
- [ ] Pod scheduling information
- [ ] Pod termination history
- [ ] Pod performance profiling
- [ ] Advanced pod search (by label, by annotation, by owner)
