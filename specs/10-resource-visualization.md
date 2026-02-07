# Resource Visualization

## Overview

Resource Visualization provides generic APIs and UI for viewing and managing all Kubernetes resource types with unified interfaces and relationship visualization.

---

## Features

1. **Generic Resource Listing** - List any Kubernetes resource type
2. **Resource Details** - View full resource specification and status
3. **Status Badges** - Visual indicators for resource health
4. **Resource Relationships** - View related resources and dependencies
5. **Resource Graph** - Visual representation of resource dependencies
6. **Label and Annotation Management** - View and edit labels/annotations
7. **Multi-Resource Operations** - Bulk operations on multiple resources

---

## API Endpoints

### List Resources by Type

```http
GET /api/v1/resources/{type}?namespace={ns}&labelSelector={labels}&sortField={field}&sortOrder={order}
Authorization: Bearer <access_token>
```

**Query Parameters:**
- `type` (required) - Resource type: `pods`, `deployments`, `services`, `configmaps`, `secrets`, `statefulsets`, `daemonsets`, `jobs`, `cronjobs`
- `namespace` (optional) - Filter by namespace
- `labelSelector` (optional) - Label selector for filtering
- `sortField` (optional, default: `name`) - Sort field: `name`, `age`, `created`
- `sortOrder` (optional, default: `asc`) - Sort order: `asc`, `desc`

Response:
```json
{
  "success": true,
  "data": {
    "type": "deployments",
    "items": [
      {
        "name": "api-server",
        "namespace": "production",
        "labels": {
          "app": "api-server",
          "version": "v1.0"
        },
        "annotations": {
          "description": "API server deployment"
        },
        "status": "Running",
        "readyReplicas": 3,
        "desiredReplicas": 3,
        "updatedAt": "2024-02-06T14:00:00Z",
        "createdAt": "2024-02-05T10:00:00Z"
      },
      {
        "name": "web-server",
        "namespace": "production",
        "labels": { ... },
        "annotations": { ... },
        "status": "Running",
        "readyReplicas": 2,
        "desiredReplicas": 2,
        "updatedAt": "2024-02-06T13:30:00Z",
        "createdAt": "2024-02-01T08:00:00Z"
      }
    ],
    "total": 2
  }
}
```

### Get Resource Details

```http
GET /api/v1/resources/{type}/{name}?namespace={ns}
Authorization: Bearer <access_token>
```

Response:
```json
{
  "success": true,
  "data": {
    "type": "Deployment",
    "name": "api-server",
    "namespace": "production",
    "apiVersion": "apps/v1",
    "kind": "Deployment",
    "metadata": {
      "name": "api-server",
      "namespace": "production",
      "uid": "abc123-def456",
      "resourceVersion": "12345",
      "generation": 5,
      "creationTimestamp": "2024-02-05T10:00:00Z",
      "labels": { ... },
      "annotations": { ... },
      "ownerReferences": [
        {
          "apiVersion": "apps/v1",
          "kind": "ReplicaSet",
          "name": "api-server-7d8b6d8f9",
          "controller": true,
          "uid": "xyz789-ghi012",
          "blockOwnerDeletion": false
        }
      ]
    },
    "spec": {
      "replicas": 3,
      "selector": {
        "matchLabels": {
          "app": "api-server"
        }
      },
      "template": {
        "metadata": {
          "labels": {
            "app": "api-server"
          }
        },
        "spec": {
          "containers": [
            {
              "name": "nginx",
              "image": "nginx:1.21",
              "ports": [
                { "containerPort": 80, "protocol": "TCP" }
              ],
              "resources": {
                "requests": {
                  "cpu": "500m",
                  "memory": "512Mi"
                },
                "limits": {
                  "cpu": "1000m",
                  "memory": "1Gi"
                }
              }
            }
          ]
        }
      },
      "strategy": {
        "type": "RollingUpdate",
        "rollingUpdate": {
          "maxSurge": "25%",
          "maxUnavailable": "25%"
        }
      },
      "minReadySeconds": 0,
      "revisionHistoryLimit": 10
    },
    "status": {
      "observedGeneration": 5,
      "replicas": 3,
      "updatedReplicas": 3,
      "availableReplicas": 3,
      "unavailableReplicas": 0,
      "conditions": [
        {
          "type": "Available",
          "status": "True",
          "lastTransitionTime": "2024-02-06T14:00:00Z",
          "reason": "Deployment has minimum availability"
        }
      ]
    }
  }
}
```

### Get Resource Status Badge

```http
GET /api/v1/resources/{type}/{name}/status-badge?namespace={ns}
Authorization: Bearer <access_token>
```

Response:
```json
{
  "success": true,
  "data": {
    "type": "Deployment",
    "name": "api-server",
    "namespace": "production",
    "status": "Running",
    "ready": true,
    "health": "healthy",
    "message": "Deployment is healthy"
  }
}
```

### Update Resource

```http
PUT /api/v1/resources/{type}/{name}?namespace={ns}
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "labels": {
    "environment": "production",
    "updated": "true"
  },
  "annotations": {
    "description": "Production deployment - updated configuration"
  }
}
```

Response:
```json
{
  "success": true,
  "data": { ... },
  "message": "Resource updated successfully"
}
```

### Delete Resource

```http
DELETE /api/v1/resources/{type}/{name}?namespace={ns}
Authorization: Bearer <access_token>
```

Response:
```json
{
  "success": true,
  "message": "Resource deleted successfully"
}
```

---

## Resource Types

### Supported Resource Types

| Type | API Version | Plural | Notes |
|-------|-------------|--------|-------|
| Pod | v1 | pods | Basic compute unit |
| Node | v1 | nodes | Cluster infrastructure |
| Namespace | v1 | namespaces | Resource isolation |
| Deployment | apps/v1 | deployments | Application deployments |
| ReplicaSet | apps/v1 | replicasets | Stateful applications |
| StatefulSet | apps/v1 | statefulsets | Stateful applications |
| DaemonSet | apps/v1 | daemonsets | Daemon applications |
| Service | v1 | services | Network endpoints |
| ConfigMap | v1 | configmaps | Configuration data |
| Secret | v1 | secrets | Sensitive data |
| Ingress | networking.k8s.io/v1 | ingresses | HTTP routing |
| PersistentVolume | v1 | persistentvolumes | Storage |
| PersistentVolumeClaim | v1 | persistentvolumeclaims | Storage claims |
| Job | batch/v1 | jobs | Batch processing |
| CronJob | batch/v1 | cronjobs | Scheduled jobs |
| ServiceAccount | v1 | serviceaccounts | Identity |
| Role | rbac.authorization.k8s.io/v1 | RBAC roles |
| ClusterRole | rbac.authorization.k8s.io/v1 | Cluster roles |

### Resource Status Values

| Resource Type | Possible Status | Description |
|---------------|----------------|-------------|
| **All Resources** | Running | Pod/Deployment is running normally |
| | Pending | Created but not yet scheduled or starting |
| | Failed | Failed to start or crashed |
| | Succeeded | Completed successfully (Jobs/CronJobs) |
| | Terminating | In process of being deleted |
| | Unknown | State cannot be determined |
| **Deployments** | Progressing | Rolling update in progress |
| | Available | Ready to serve traffic |
| | ReplicasNotUpdated | Old replicas still active |
| | Paused | Updates paused |
| **Services** | ClusterIP | Has cluster IP address |
| | LoadBalancer | Has external load balancer |
| | NodePort | Exposed via node port |
| | ExternalName | External DNS name |

---

## Frontend Components

### ResourceList Component

```typescript
interface ResourceListProps {
  resourceType: ResourceType;
}

function ResourceList({ resourceType }: ResourceListProps) {
  const { data: resources } = useResources(resourceType);
  const [filter, setFilter] = useState('');
  const [sortField, setSortField] = useState('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const filtered = resources?.items?.filter(r =>
    r.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <ResourceTypeSelector
        type={resourceType}
        onChange={handleTypeChange}
      />

      <SearchInput value={filter} onChange={setFilter} />
      <SortControls
        field={sortField}
        order={sortOrder}
        onSortChange={setSortField}
        onOrderChange={setSortOrder}
      />

      <ResourceGrid
        resources={filtered}
        type={resourceType}
      />

      <Pagination total={resources?.total || 0} />
    </div>
  );
}
```

### ResourceDetails Component

```typescript
function ResourceDetails({ type, namespace, name }: ResourceDetailsProps) {
  const { data: resource } = useResource(type, namespace, name);
  const { data: related } = useRelatedResources(type, namespace, name);
  const { data: statusBadge } = useResourceStatus(type, namespace, name);

  return (
    <div>
      <Header>
        <Title>{type}/{name}</Title>
        <Namespace>{resource?.namespace}</Namespace>
        <StatusBadge {...statusBadge} />
      </Header>

      <Tabs>
        <Tab label="Overview">
          <ResourceOverview resource={resource} />
        </Tab>
        <Tab label="Specification">
          <ResourceSpec spec={resource?.spec} />
        </Tab>
        <Tab label="Status">
          <ResourceStatus status={resource?.status} />
        </Tab>
        <Tab label="Labels & Annotations">
          <LabelAnnotationEditor
            labels={resource?.metadata?.labels}
            annotations={resource?.metadata?.annotations}
            onUpdate={handleUpdateLabelsAnnotations}
          />
        </Tab>
        <Tab label="Related Resources">
          <RelatedResourcesGraph
            resources={related?.resources}
            relationships={related?.ownerReferences}
          />
        </Tab>
        <Tab label="YAML">
          <YamlViewer
            resource={`${type}/${name}`}
            namespace={namespace}
          />
        </Tab>
      </Tabs>

      <Actions>
        <Button onClick={() => openYamlEditor(type, namespace, name)}>
          Edit YAML
        </Button>
        <Button onClick={() => cloneResource(type, namespace, name)}>
          Clone Resource
        </Button>
        <Button variant="danger" onClick={() => deleteResource(type, namespace, name)}>
          Delete Resource
        </Button>
      </Actions>
    </div>
  );
}
```

### ResourceGraph Component

```typescript
interface ResourceGraphProps {
  resources: K8sResource[];
  relationships: OwnerReference[];
}

function ResourceGraph({ resources, relationships }: ResourceGraphProps) {
  const graphData = buildResourceGraph(resources, relationships);

  return (
    <Card>
      <h2>Resource Relationships</h2>

      <ForceGraph
        nodes={graphData.nodes}
        links={graphData.links}
        width={800}
        height={600}
        nodeComponent={(data) => <ResourceNode data={data} />}
        linkComponent={(data) => <ResourceLink data={data} />}
      />

      <Legend>
        {Object.keys(resourceTypes).map(type => (
          <LegendItem
            key={type}
            type={type}
            color={resourceTypeColors[type]}
          />
        ))}
      </Legend>
    </Card>
  );
}
```

---

## RBAC Permissions

| Operation | Permission Required |
|-----------|-------------------|
| List resources | READ + {RESOURCE_TYPE} |
| View resource details | READ + {RESOURCE_TYPE} |
| Get status badge | READ + {RESOURCE_TYPE} |
| Update resource | WRITE + {RESOURCE_TYPE} |
| Delete resource | DELETE + {RESOURCE_TYPE} |

---

## Error Handling

### Resource Not Found
```json
{
  "success": false,
  "message": "Resource not found",
  "error": "RESOURCE_NOT_FOUND",
  "statusCode": 404
}
```

### Invalid Resource Type
```json
{
  "success": false,
  "message": "Invalid resource type",
  "error": "INVALID_RESOURCE_TYPE",
  "statusCode": 400,
  "details": {
    "supportedTypes": [
      "pods", "deployments", "services", "configmaps", "secrets",
      "statefulsets", "daemonsets", "jobs", "cronjobs"
    ]
  }
}
```

### Update Failed
```json
{
  "success": false,
  "message": "Failed to update resource",
  "error": "RESOURCE_UPDATE_FAILED",
  "statusCode": 500,
  "details": {
    "reason": "Resource version conflict",
    "currentVersion": 5,
    "serverVersion": 6
  }
}
```

---

## Configuration

```properties
# Resource Management
resource.list.page-size=50
resource.list.cache-seconds=10
resource.list.max-results=1000

# Graph Visualization
resource.graph.enabled=true
resource.graph.layout=force-directed
resource.graph.max-nodes=500

# Labels and Annotations
resource.labels.max-count=100
resource.annotations.max-size=262144
resource.labels.max-key-length=253
resource.annotations.max-size=262144
```

---

## Testing

```java
@SpringBootTest
@AutoConfigureMockMvc
public class ResourceControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    public void testListResources() throws Exception {
        mockMvc.perform(get("/api/v1/resources/deployments")
                .header("Authorization", "Bearer " + token))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.success").value(true))
            .andExpect(jsonPath("$.data.items").isArray())
            .andExpect(jsonPath("$.data.type").value("deployments"));
    }

    @Test
    public void testGetResourceDetails() throws Exception {
        mockMvc.perform(get("/api/v1/resources/deployments/api-server?namespace=production")
                .header("Authorization", "Bearer " + token))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.success").value(true))
            .andExpect(jsonPath("$.data.metadata").isNotEmpty())
            .andExpect(jsonPath("$.data.spec").isNotEmpty());
    }

    @Test
    public void testUpdateResourceLabels() throws Exception {
        mockMvc.perform(put("/api/v1/resources/deployments/api-server")
                .contentType(MediaType.APPLICATION_JSON)
                .header("Authorization", "Bearer " + token)
                .content("{\"labels\":{\"environment\":\"production\",\"updated\":\"true\"}}"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.success").value(true));
    }
}
```

---

## Future Enhancements

- [ ] Resource dependency graph visualization
- [ ] Resource timeline view
- [ ] Bulk resource operations
- [ ] Resource templates and presets
- [ ] Resource comparison (diff between two versions)
- [ ] Resource lifecycle events
- [ ] Advanced filtering (by age, by label, by annotation)
- [ ] Custom resource views (table, card, list)
- [ ] Resource search with regex patterns
- [ ] Resource export (YAML, JSON)
- [ ] Resource import (from YAML file)
- [ ] Multi-cluster resource view
- [ ] Resource analytics dashboard
