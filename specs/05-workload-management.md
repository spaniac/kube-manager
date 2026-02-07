# Workload Management

## Overview

Workload Management provides APIs and UI for managing Deployments, StatefulSets, DaemonSets, Jobs, CronJobs, and PodDisruptionBudgets in Kubernetes.

---

## Features

1. **Deployments** - Scale, restart, rollback, pause/resume, update image, strategy, resources, environment variables
2. **StatefulSets** - Scale, restart, PVCs management
3. **DaemonSets** - Node selector, coverage, pod management
4. **Jobs** - One-time task execution
5. **CronJobs** - Scheduled task execution
6. **PodDisruptionBudgets** - Pod availability guarantees during disruptions

---

## Deployments

### List Deployments

```http
GET /api/v1/workloads/deployments?namespace={ns}&search={query}
Authorization: Bearer <access_token>
```

Response:
```json
{
  "success": true,
  "data": {
    "items": [
      {
        "name": "api-server",
        "namespace": "production",
        "replicas": {
          "desired": 3,
          "current": 3,
          "ready": 3,
          "updated": 3,
          "available": 3,
          "unavailable": 0
        },
        "image": "nginx:1.21",
        "strategy": {
          "type": "RollingUpdate",
          "rollingUpdate": {
            "maxSurge": "25%",
            "maxUnavailable": "25%"
          }
        },
        "age": "25d",
        "createdAt": "2024-01-15T10:00:00Z",
        "labels": {
          "app": "api-server",
          "version": "v1.0"
        }
      }
    ],
    "total": 1
  }
}
```

### Get Deployment Details

```http
GET /api/v1/workloads/deployments/{namespace}/{name}
Authorization: Bearer <access_token>
```

Response:
```json
{
  "success": true,
  "data": {
    "name": "api-server",
    "namespace": "production",
    "replicas": { ... },
    "image": "nginx:1.21",
    "strategy": { ... },
    "selector": {
      "matchLabels": {
        "app": "api-server"
      }
    },
    "pods": [
      {
        "name": "api-server-7d8b6d8f9-abc123",
        "status": "Running",
        "ready": true,
        "age": "1h",
        "node": "worker-1"
      }
    ],
    "revisionHistory": 5,
    "currentRevision": 5,
    "conditions": [
      {
        "type": "Available",
        "status": "True",
        "message": "Deployment is available"
      }
    ],
    "events": [ ... ]
  }
}
```

### Scale Deployment

```http
PUT /api/v1/workloads/deployments/{namespace}/{name}/scale
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "replicas": 5
}
```

Response:
```json
{
  "success": true,
  "data": { ... },
  "message": "Deployment scaled to 5 replicas"
}
```

### Restart Deployment

```http
POST /api/v1/workloads/deployments/{namespace}/{name}/restart
Authorization: Bearer <access_token>
```

Response:
```json
{
  "success": true,
  "data": { ... },
  "message": "Deployment restarted successfully"
}
```

**Behavior:**
1. Gets current pod template
2. Adds annotation: `kubectl.kubernetes.io/restartedAt: timestamp`
3. Triggers rolling update (no change to spec)

### Update Deployment Image

```http
PUT /api/v1/workloads/deployments/{namespace}/{name}/image
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "image": "nginx:1.22"
}
```

Response:
```json
{
  "success": true,
  "data": { ... },
  "message": "Deployment image updated to nginx:1.22"
}
```

### Rollback Deployment

```http
POST /api/v1/workloads/deployments/{namespace}/{name}/rollback
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "revision": 3
}
```

Response:
```json
{
  "success": true,
  "data": { ... },
  "message": "Deployment rolled back to revision 3"
}
```

### Get Deployment Revisions

```http
GET /api/v1/workloads/deployments/{namespace}/{name}/revisions
Authorization: Bearer <access_token>
```

Response:
```json
{
  "success": true,
  "data": [
    {
      "revision": 5,
      "revisionHistory": 5,
      "changedAt": "2024-02-06T14:00:00Z",
      "changeCause": "nginx image updated to 1.21",
      "containers": [
        {
          "name": "nginx",
          "image": "nginx:1.21"
        }
      ]
    },
    {
      "revision": 4,
      "revisionHistory": 4,
      "changedAt": "2024-02-05T10:00:00Z",
      "changeCause": "Replicas changed from 2 to 3"
    }
  ]
}
```

### Update Deployment Strategy

```http
PUT /api/v1/workloads/deployments/{namespace}/{name}/strategy
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "strategy": {
    "type": "RollingUpdate",
    "rollingUpdate": {
      "maxSurge": "50%",
      "maxUnavailable": "50%"
    }
  }
}
```

### Update Container Resources

```http
PUT /api/v1/workloads/deployments/{namespace}/{name}/resources
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "containerName": "nginx",
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
```

### Update Container Environment Variables

```http
PUT /api/v1/workloads/deployments/{namespace}/{name}/env
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "containerName": "nginx",
  "envVars": [
    {
      "name": "API_ENV",
      "value": "production"
    },
    {
      "name": "DB_HOST",
      "valueFrom": {
        "secretKeyRef": {
          "name": "db-secret",
          "key": "host"
        }
      }
    }
  ]
}
```

### Pause Deployment

```http
POST /api/v1/workloads/deployments/{namespace}/{name}/pause
Authorization: Bearer <access_token>
```

Response:
```json
{
  "success": true,
  "message": "Deployment paused"
}
```

### Resume Deployment

```http
POST /api/v1/workloads/deployments/{namespace}/{name}/resume
Authorization: Bearer <access_token>
```

Response:
```json
{
  "success": true,
  "message": "Deployment resumed"
}
```

### Delete Deployment

```http
DELETE /api/v1/workloads/deployments/{namespace}/{name}
Authorization: Bearer <access_token>
```

---

## StatefulSets

### List StatefulSets

```http
GET /api/v1/workloads/statefulsets?namespace={ns}
Authorization: Bearer <access_token>
```

Response:
```json
{
  "success": true,
  "data": [
    {
      "name": "web-server",
      "namespace": "production",
      "replicas": {
        "desired": 3,
        "current": 3,
        "ready": 3
      },
      "serviceName": "web-server",
      "podManagementPolicy": "OrderedReady",
      "volumeClaimTemplates": [
        {
          "name": "data",
          "storageClassName": "fast-ssd"
        }
      ],
      "age": "20d"
    }
  ]
}
```

### Get StatefulSet Details

```http
GET /api/v1/workloads/statefulsets/{namespace}/{name}
Authorization: Bearer <access_token>
```

Response:
```json
{
  "success": true,
  "data": {
    "name": "web-server",
    "namespace": "production",
    "replicas": { ... },
    "serviceName": "web-server",
    "pods": [
      {
        "name": "web-server-0",
        "status": "Running",
        "ordinal": 0
      },
      {
        "name": "web-server-1",
        "status": "Running",
        "ordinal": 1
      },
      {
        "name": "web-server-2",
        "status": "Running",
        "ordinal": 2
      }
    ],
    "persistentVolumeClaims": [
      {
        "name": "data-web-server-0",
        "status": "Bound",
        "capacity": "10Gi",
        "accessMode": "ReadWriteOnce"
      }
    ]
  }
}
```

### Scale StatefulSet

```http
PUT /api/v1/workloads/statefulsets/{namespace}/{name}/scale
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "replicas": 5
}
```

### Restart StatefulSet

```http
POST /api/v1/workloads/statefulsets/{namespace}/{name}/restart
Authorization: Bearer <access_token>
```

---

## DaemonSets

### List DaemonSets

```http
GET /api/v1/workloads/daemonsets?namespace={ns}
Authorization: Bearer <access_token>
```

Response:
```json
{
  "success": true,
  "data": [
    {
      "name": "log-collector",
      "namespace": "kube-system",
      "currentNumberScheduled": 5,
      "desiredNumberScheduled": 5,
      "numberReady": 5,
      "numberMisscheduled": 0,
      "nodeSelector": {
        "matchLabels": {
          "node-role.kubernetes.io/worker": ""
        }
      },
      "tolerations": [
        {
          "key": "node-role.kubernetes.io/master",
          "operator": "Exists",
          "effect": "NoSchedule"
        }
      ],
      "age": "30d"
    }
  ]
}
```

### Get DaemonSet Details

```http
GET /api/v1/workloads/daemonsets/{namespace}/{name}
Authorization: Bearer <access_token>
```

Response:
```json
{
  "success": true,
  "data": {
    "name": "log-collector",
    "namespace": "kube-system",
    "nodeSelector": { ... },
    "tolerations": [ ... ],
    "pods": [
      {
        "name": "log-collector-abcd123",
        "status": "Running",
        "node": "worker-1"
      },
      {
        "name": "log-collector-efgh456",
        "status": "Running",
        "node": "worker-2"
      }
    ],
    "coverage": "5/5 nodes (100%)"
  }
}
```

### Restart DaemonSet

```http
POST /api/v1/workloads/daemonsets/{namespace}/{name}/restart
Authorization: Bearer <access_token>
```

---

## Jobs

### List Jobs

```http
GET /api/v1/workloads/jobs?namespace={ns}
Authorization: Bearer <access_token>
```

Response:
```json
{
  "success": true,
  "data": [
    {
      "name": "data-migration-abc123",
      "namespace": "production",
      "completions": 1,
      "successfulCompletions": 1,
      "failedCompletions": 0,
      "active": 0,
      "duration": "5m23s",
      "startTime": "2024-02-06T14:00:00Z",
      "completionTime": "2024-02-06T14:05:23Z",
      "suspended": false,
      "backoffLimit": 6
    }
  ]
}
```

### Create Job

```http
POST /api/v1/workloads/jobs
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "namespace": "production",
  "name": "data-migration",
  "spec": {
    "template": {
      "spec": {
        "containers": [
          {
            "name": "migration",
            "image": "migration-tool:latest",
            "command": ["python", "migrate.py"]
          }
        ],
        "restartPolicy": "OnFailure"
      }
    },
    "backoffLimit": 6,
    "ttlSecondsAfterFinished": 3600
  }
}
```

---

## CronJobs

### List CronJobs

```http
GET /api/v1/workloads/cronjobs?namespace={ns}
Authorization: Bearer <access_token>
```

Response:
```json
{
  "success": true,
  "data": [
    {
      "name": "nightly-backup",
      "namespace": "production",
      "schedule": "0 2 * * *",
      "suspend": false,
      "lastScheduleTime": "2024-02-06T02:00:00Z",
      "lastSuccessfulTime": "2024-02-06T02:05:00Z",
      "activeJobs": 0,
      "successfulJobsHistory": 30,
      "failedJobsHistory": 2
    }
  ]
}
```

### Create CronJob

```http
POST /api/v1/workloads/cronjobs
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "namespace": "production",
  "name": "nightly-backup",
  "schedule": "0 2 * * *",
  "spec": {
    "jobTemplate": {
      "spec": {
        "template": {
          "spec": {
            "containers": [
              {
                "name": "backup",
                "image": "backup-tool:latest",
                "command": ["./backup.sh"]
              }
            ]
          }
        }
      }
    }
  },
  "successfulJobsHistoryLimit": 3,
  "failedJobsHistoryLimit": 1
}
```

---

## PodDisruptionBudgets

### Create PodDisruptionBudget

```http
POST /api/v1/workloads/poddisruptionbudgets
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "namespace": "production",
  "name": "api-server-pdb",
  "spec": {
    "minAvailable": 2,
    "selector": {
      "matchLabels": {
        "app": "api-server"
      }
    }
  }
}
```

Response:
```json
{
  "success": true,
  "data": {
    "name": "api-server-pdb",
    "namespace": "production",
    "minAvailable": 2,
    "currentHealthy": 3,
    "disruptionsAllowed": 1
  }
}
```

### Get PodDisruptionBudget

```http
GET /api/v1/workloads/poddisruptionbudgets/{namespace}/{name}
Authorization: Bearer <access_token>
```

### Delete PodDisruptionBudget

```http
DELETE /api/v1/workloads/poddisruptionbudgets/{namespace}/{name}
Authorization: Bearer <access_token>
```

---

## Create Workload from YAML

```http
POST /api/v1/workloads
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "namespace": "production",
  "yaml": "apiVersion: apps/v1\nkind: Deployment\nmetadata:\n  name: api-server\nspec:\n  replicas: 3\n  selector:\n    matchLabels:\n      app: api-server\n  template:\n    metadata:\n      labels:\n        app: api-server\n    spec:\n      containers:\n      - name: nginx\n        image: nginx:1.21\n",
  "dryRun": false
}
```

Response:
```json
{
  "success": true,
  "data": {
    "kind": "Deployment",
    "name": "api-server",
    "namespace": "production"
  },
  "message": "Workload created successfully"
}
```

---

## Clone Workload

```http
POST /api/v1/workloads/clone
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "sourceNamespace": "production",
  "sourceName": "api-server",
  "sourceKind": "Deployment",
  "targetNamespace": "staging",
  "targetName": "api-server-staging"
}
```

Response:
```json
{
  "success": true,
  "data": {
    "name": "api-server-staging",
    "namespace": "staging"
  },
  "message": "Workload cloned successfully"
}
```

---

## Frontend Components

### DeploymentList Component

```typescript
function DeploymentList() {
  const { data: deployments } = useDeployments();
  const [filter, setFilter] = useState('');
  const [namespace, setNamespace] = useState('default');

  const filtered = deployments?.filter(d =>
    d.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <NamespaceSelector value={namespace} onChange={setNamespace} />
      <SearchInput value={filter} onChange={setFilter} />

      <DeploymentGrid deployments={filtered} />
    </div>
  );
}
```

### DeploymentDetails Component

```typescript
function DeploymentDetails({ namespace, name }: DeploymentProps) {
  const { data: deployment } = useDeployment(namespace, name);
  const { data: revisions } = useDeploymentRevisions(namespace, name);

  return (
    <div>
      <DeploymentOverview deployment={deployment} />

      <Tabs>
        <Tab label="Pods">
          <PodTable pods={deployment?.pods} />
        </Tab>
        <Tab label="Revisions">
          <RevisionHistory revisions={revisions} />
        </Tab>
        <Tab label="Events">
          <EventList resource={`deployment/${name}`} namespace={namespace} />
        </Tab>
        <Tab label="YAML">
          <YamlViewer resource={`deployment/${name}`} namespace={namespace} />
        </Tab>
      </Tabs>

      <Actions>
        <ScaleDialog deployment={deployment} />
        <RestartButton onClick={() => restartDeployment(namespace, name)} />
        <RollbackDialog deployment={deployment} revisions={revisions} />
        <UpdateImageDialog deployment={deployment} />
        <UpdateResourcesDialog deployment={deployment} />
        <UpdateEnvDialog deployment={deployment} />
        <CloneDialog workload={deployment} />
      </Actions>
    </div>
  );
}
```

---

## RBAC Permissions

| Operation | Permission Required |
|-----------|-------------------|
| List deployments | READ + DEPLOYMENT |
| View deployment details | READ + DEPLOYMENT |
| Create deployment | WRITE + DEPLOYMENT |
| Scale deployment | WRITE + DEPLOYMENT |
| Restart deployment | WRITE + DEPLOYMENT |
| Rollback deployment | WRITE + DEPLOYMENT |
| Update image | WRITE + DEPLOYMENT |
| Update resources | WRITE + DEPLOYMENT |
| Update environment | WRITE + DEPLOYMENT |
| Pause/Resume | WRITE + DEPLOYMENT |
| Delete deployment | DELETE + DEPLOYMENT |
| List StatefulSets | READ + STATEFULSET |
| Manage StatefulSet | WRITE + STATEFULSET |
| List DaemonSets | READ + DAEMONSET |
| Manage DaemonSet | WRITE + DAEMONSET |
| List Jobs | READ + JOB |
| Create Job | WRITE + JOB |
| List CronJobs | READ + CRONJOB |
| Create CronJob | WRITE + CRONJOB |
| Manage PodDisruptionBudget | WRITE + DEPLOYMENT |

---

## Validation Rules

### Deployment Name
- Must be a valid DNS subdomain name
- Maximum length: 253 characters
- Cannot contain uppercase letters

### Replica Count
- Must be non-negative integer
- Minimum: 0
- Maximum: Limited by cluster capacity

### Image Format
- Must be valid image name
- Format: `registry/repository/image:tag`
- Examples: `nginx:1.21`, `gcr.io/project/app:v2.0`

---

## Error Handling

### Deployment Not Found
```json
{
  "success": false,
  "message": "Deployment not found",
  "error": "DEPLOYMENT_NOT_FOUND",
  "statusCode": 404
}
```

### Scale Failed
```json
{
  "success": false,
  "message": "Failed to scale deployment",
  "error": "SCALE_FAILED",
  "statusCode": 500,
  "details": {
    "reason": "Insufficient cluster resources"
  }
}
```

### Rollback Failed
```json
{
  "success": false,
  "message": "Failed to rollback deployment",
  "error": "ROLLBACK_FAILED",
  "statusCode": 400,
  "details": {
    "reason": "Invalid revision number"
  }
}
```

---

## Configuration

```properties
# Workload Settings
workload.scale.timeout-seconds=300
workload.restart.timeout-seconds=180
workload.rollback.max-revisions=10
workload.cron.schedule-validation=true

# Rolling Update Defaults
workload.rolling-update.max-surge-percent=25
workload.rolling-update.max-unavailable-percent=25
workload.rolling-update.timeout-seconds=600
```

---

## Testing

```java
@SpringBootTest
@AutoConfigureMockMvc
public class WorkloadControllerTest {

    @Test
    public void testScaleDeployment() throws Exception {
        mockMvc.perform(put("/api/v1/workloads/deployments/production/api-server/scale")
                .contentType(MediaType.APPLICATION_JSON)
                .header("Authorization", "Bearer " + token)
                .content("{\"replicas\":5}"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.success").value(true))
            .andExpect(jsonPath("$.message").value("Deployment scaled to 5 replicas"));
    }

    @Test
    public void testRestartDeployment() throws Exception {
        mockMvc.perform(post("/api/v1/workloads/deployments/production/api-server/restart")
                .header("Authorization", "Bearer " + token))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.success").value(true));
    }
}
```

---

## Future Enhancements

- [ ] Blue-green deployments
- [ ] Canary deployments
- [ ] Deployment auto-scaling (HPA integration)
- [ ] Job scheduling visualization
- [ ] CronJob execution history
- [ ] Workload dependency visualization
- [ ] Multi-namespace workload views
- [ ] Workload templates
