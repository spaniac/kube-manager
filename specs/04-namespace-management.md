# Namespace Management

## Overview

Namespace Management provides APIs and UI for creating, viewing, updating, and deleting Kubernetes namespaces with resource quota management and template support.

---

## Features

1. **Namespace CRUD** - Create, read, update, delete namespaces
2. **Resource Quotas** - Manage CPU, memory, storage limits per namespace
3. **Limit Ranges** - Set default resource limits for pods
4. **Namespace Templates** - Predefined templates for quick creation
5. **Namespace Locking** - Prevent accidental modifications
6. **Network Policies** - Control traffic between namespaces
7. **Service Accounts** - Manage service accounts per namespace

---

## API Endpoints

### List Namespaces

```http
GET /api/v1/namespaces?query={search}
Authorization: Bearer <access_token>
```

Response:
```json
{
  "success": true,
  "data": [
    {
      "name": "default",
      "status": "Active",
      "labels": {
        "kubernetes.io/metadata.name": "default"
      },
      "annotations": {},
      "age": "30d",
      "createdAt": "2024-01-15T10:00:00Z"
    },
    {
      "name": "production",
      "status": "Active",
      "labels": {
        "environment": "prod",
        "team": "platform"
      },
      "annotations": {
        "description": "Production environment"
      },
      "age": "25d",
      "createdAt": "2024-01-20T14:30:00Z"
    }
  ]
}
```

### Get Namespace Details

```http
GET /api/v1/namespaces/{name}
Authorization: Bearer <access_token>
```

Response:
```json
{
  "success": true,
  "data": {
    "name": "production",
    "status": "Active",
    "phase": "Active",
    "labels": {
      "environment": "prod",
      "team": "platform"
    },
    "annotations": {
      "description": "Production environment",
      "owner": "platform-team"
    },
    "createdAt": "2024-01-20T14:30:00Z",
    "resourceQuota": {
      "cpu": {
        "used": "5",
        "hard": "10",
        "usagePercent": 50
      },
      "memory": {
        "used": "8Gi",
        "hard": "16Gi",
        "usagePercent": 50
      },
      "pods": {
        "used": 20,
        "hard": 50,
        "usagePercent": 40
      },
      "storage": {
        "used": "50Gi",
        "hard": "100Gi",
        "usagePercent": 50
      }
    },
    "limitRange": {
      "defaultContainer": {
        "cpu": "500m",
        "memory": "512Mi"
      }
    },
    "locked": false,
    "lockedBy": null
  }
}
```

### Create Namespace

```http
POST /api/v1/namespaces
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "name": "staging",
  "labels": {
    "environment": "staging",
    "team": "platform"
  },
  "annotations": {
    "description": "Staging environment"
  },
  "resourceQuota": {
    "cpu": "5",
    "memory": "10Gi",
    "pods": "50",
    "storage": "100Gi"
  },
  "limitRange": {
    "defaultContainer": {
      "cpu": "500m",
      "memory": "512Mi"
    }
  }
}
```

Response:
```json
{
  "success": true,
  "data": {
    "name": "staging",
    "status": "Active",
    "labels": { ... },
    "annotations": { ... },
    "resourceQuota": { ... },
    "limitRange": { ... },
    "createdAt": "2024-02-06T14:30:00Z"
  },
  "message": "Namespace created successfully"
}
```

### Update Namespace

```http
PUT /api/v1/namespaces/{name}
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "labels": {
    "environment": "staging",
    "updated": "true"
  },
  "annotations": {
    "description": "Updated staging description"
  }
}
```

Response:
```json
{
  "success": true,
  "data": { ... },
  "message": "Namespace updated successfully"
}
```

### Delete Namespace

```http
DELETE /api/v1/namespaces/{name}?force={force}&gracePeriodSeconds={grace}
Authorization: Bearer <access_token>
```

**Query Parameters:**
- `force` (optional, default: `false`) - Force delete without waiting for finalization
- `gracePeriodSeconds` (optional, default: `0`) - Grace period in seconds before termination

Response:
```json
{
  "success": true,
  "message": "Namespace deleted successfully"
}
```

**Protection Rules:**
- Cannot delete `kube-system`, `kube-public`, `kube-node-lease`
- Production namespaces require `force=true` if not unlocked
- Grace period respects PodDisruptionBudgets

### Get Namespace Quota

```http
GET /api/v1/namespaces/{name}/quota
Authorization: Bearer <access_token>
```

Response:
```json
{
  "success": true,
  "data": {
    "cpu": {
      "used": "5.5",
      "hard": "10",
      "usagePercent": 55
    },
    "memory": {
      "used": "9Gi",
      "hard": "16Gi",
      "usagePercent": 56.25
    },
    "pods": {
      "used": 22,
      "hard": "50",
      "usagePercent": 44
    },
    "storage": {
      "used": "55Gi",
      "hard": "100Gi",
      "usagePercent": 55
    },
    "persistentVolumeClaims": {
      "used": "5",
      "hard": "10",
      "usagePercent": 50
    },
    "services": {
      "used": 8,
      "hard": "20",
      "usagePercent": 40
    },
    "secrets": {
      "used": 15,
      "hard": "50",
      "usagePercent": 30
    }
  }
}
```

---

## Namespace Templates

### List Templates

```http
GET /api/v1/namespaces/templates
Authorization: Bearer <access_token>
```

Response:
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Production",
      "description": "Production environment with strict quotas",
      "labels": {
        "environment": "prod"
      },
      "resourceQuota": {
        "cpu": "10",
        "memory": "32Gi",
        "pods": "100",
        "storage": "200Gi"
      },
      "limitRange": {
        "defaultContainer": {
          "cpu": "1000m",
          "memory": "1Gi"
        }
      }
    },
    {
      "id": 2,
      "name": "Development",
      "description": "Development environment with moderate quotas",
      "labels": {
        "environment": "dev"
      },
      "resourceQuota": {
        "cpu": "5",
        "memory": "16Gi",
        "pods": "50",
        "storage": "100Gi"
      }
    },
    {
      "id": 3,
      "name": "Testing",
      "description": "Testing environment with minimal quotas",
      "labels": {
        "environment": "test"
      },
      "resourceQuota": {
        "cpu": "2",
        "memory": "8Gi",
        "pods": "20",
        "storage": "50Gi"
      }
    }
  ]
}
```

### Create Template

```http
POST /api/v1/namespaces/templates
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "name": "Microservice",
  "description": "Microservice environment template",
  "labels": {
    "type": "microservice"
  },
  "resourceQuota": {
    "cpu": "1",
    "memory": "4Gi",
    "pods": "20",
    "storage": "20Gi"
  }
}
```

### Create Namespace from Template

```http
POST /api/v1/namespaces/from-template/{templateId}
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "name": "order-service",
  "overwriteLabels": {
    "service": "order"
  }
}
```

### Delete Template

```http
DELETE /api/v1/namespaces/templates/{templateId}
Authorization: Bearer <access_token>
```

---

## Namespace Locking

### Lock Namespace

Prevents accidental modifications to critical namespaces.

```http
POST /api/v1/namespaces/{name}/lock
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "reason": "Production freeze during release",
  "expiresAt": "2024-02-07T18:00:00Z"
}
```

Response:
```json
{
  "success": true,
  "message": "Namespace locked successfully"
}
```

### Unlock Namespace

```http
DELETE /api/v1/namespaces/{name}/lock
Authorization: Bearer <access_token>
```

### Get Lock Status

```http
GET /api/v1/namespaces/{name}/lock
Authorization: Bearer <access_token>
```

Response:
```json
{
  "success": true,
  "data": {
    "locked": true,
    "lockedBy": "admin@example.com",
    "lockedAt": "2024-02-06T14:00:00Z",
    "reason": "Production freeze during release",
    "expiresAt": "2024-02-07T18:00:00Z"
  }
}
```

---

## Network Policies

### List Network Policies

```http
GET /api/v1/namespaces/{name}/network-policies
Authorization: Bearer <access_token>
```

Response:
```json
{
  "success": true,
  "data": [
    {
      "name": "deny-all-ingress",
      "podSelector": {
        "matchLabels": {}
      },
      "policyTypes": ["Ingress"],
      "ingress": []
    },
    {
      "name": "allow-from-namespace",
      "podSelector": {
        "matchLabels": {
          "app": "api-server"
        }
      },
      "policyTypes": ["Ingress"],
      "ingress": [
        {
          "from": [
            {
              "namespaceSelector": {
                "matchLabels": {
                  "environment": "prod"
                }
              }
            }
          }
        ]
      }
    }
  ]
}
```

### Create Network Policy

```http
POST /api/v1/namespaces/{name}/network-policies
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "name": "allow-api-traffic",
  "podSelector": {
    "matchLabels": {
      "app": "api-server"
    }
  },
  "policyTypes": ["Ingress"],
  "ingress": [
    {
      "from": [
        {
          "namespaceSelector": {
            "matchLabels": {
              "environment": "prod"
            }
          }
        }
      ]
    }
  ]
}
```

### Delete Network Policy

```http
DELETE /api/v1/namespaces/{name}/network-policies/{policyName}
Authorization: Bearer <access_token>
```

---

## Service Accounts

### List Service Accounts

```http
GET /api/v1/namespaces/{name}/service-accounts
Authorization: Bearer <access_token>
```

Response:
```json
{
  "success": true,
  "data": [
    {
      "name": "default",
      "secrets": [
        {
          "name": "default-token-xxxxx",
          "type": "kubernetes.io/service-account-token"
        }
      ],
      "createdAt": "2024-01-15T10:00:00Z"
    },
    {
      "name": "api-server",
      "secrets": [
        {
          "name": "api-server-token-yyyyy",
          "type": "kubernetes.io/service-account-token"
        }
      ],
      "createdAt": "2024-01-20T14:30:00Z"
    }
  ]
}
```

### Create Service Account

```http
POST /api/v1/namespaces/{name}/service-accounts
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "name": "order-service",
  "automountServiceAccountToken": false
}
```

### Delete Service Account

```http
DELETE /api/v1/namespaces/{name}/service-accounts/{accountName}
Authorization: Bearer <access_token>
```

---

## Frontend Components

### NamespaceList Component

```typescript
function NamespaceList() {
  const { data: namespaces } = useNamespaces();
  const [filter, setFilter] = useState('');

  const filtered = namespaces?.filter(ns =>
    ns.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <SearchInput value={filter} onChange={setFilter} placeholder="Search namespaces..." />
      <Table>
        <TableHeader>
          <HeaderCell>Name</HeaderCell>
          <HeaderCell>Status</HeaderCell>
          <HeaderCell>Age</HeaderCell>
          <HeaderCell>Actions</HeaderCell>
        </TableHeader>
        {filtered.map(ns => (
          <Row key={ns.name}>
            <Cell>
              <Link to={`/namespaces/${ns.name}`}>{ns.name}</Link>
            </Cell>
            <Cell>
              <StatusBadge status={ns.status} />
            </Cell>
            <Cell>{formatAge(ns.age)}</Cell>
            <Cell>
              <Button onClick={() => deleteNamespace(ns.name)}>Delete</Button>
            </Cell>
          </Row>
        ))}
      </Table>
      {hasPermission('WRITE', 'NAMESPACE') && (
        <Button onClick={() => openCreateDialog()}>
          Create Namespace
        </Button>
      )}
    </div>
  );
}
```

### CreateNamespaceDialog Component

```typescript
function CreateNamespaceDialog({ isOpen, onClose }: DialogProps) {
  const [name, setName] = useState('');
  const [template, setTemplate] = useState('');
  const [labels, setLabels] = useState<Record<string, string>>({});
  const [annotations, setAnnotations] = useState<Record<string, string>>({});
  const { data: templates } = useNamespaceTemplates();

  const handleTemplateSelect = (templateId: string) => {
    const selectedTemplate = templates?.find(t => t.id === templateId);
    if (selectedTemplate) {
      setLabels(selectedTemplate.labels);
      setAnnotations({ description: selectedTemplate.description });
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <h2>Create Namespace</h2>

      <Input
        label="Namespace Name"
        value={name}
        onChange={setName}
        placeholder="my-namespace"
      />

      <Select
        label="Template"
        value={template}
        onChange={setTemplate}
        options={templates?.map(t => ({
          value: t.id,
          label: `${t.name} - ${t.description}`
        }))}
      />

      <KeyValueEditor
        label="Labels"
        values={labels}
        onChange={setLabels}
      />

      <KeyValueEditor
        label="Annotations"
        values={annotations}
        onChange={setAnnotations}
      />

      <Button onClick={handleSubmit}>Create</Button>
    </Dialog>
  );
}
```

### Workspace Multi-Tenancy
- Workspace concept for grouping resources
- Workspace-level resource quotas and policies
- Multi-tenant resource isolation
- Workspace member management
- Workspace-level RBAC inheritance

### Workspace Management

**Workspace Overview:**
```http
GET /api/v1/workspaces
Authorization: Bearer <access_token>
```

Response:
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "production",
      "description": "Production environment workspace",
      "createdBy": "admin@example.com",
      "createdAt": "2024-02-01T10:00:00Z",
      "namespaces": ["production", "staging"],
      "members": 5,
      "resourceQuota": {
        "cpu": "16",
        "memory": "64Gi",
        "pods": 100,
        "services": 50
      }
    },
    {
      "id": 2,
      "name": "development",
      "description": "Development workspace",
      "createdBy": "admin@example.com",
      "createdAt": "2024-01-15T09:00:00Z",
      "namespaces": ["development"],
      "members": 8,
      "resourceQuota": {
        "cpu": "8",
        "memory": "32Gi",
        "pods": 50,
        "services": 20
      }
    }
  ],
  "total": 2
}
```

**Create Workspace:**
```http
POST /api/v1/workspaces
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "name": "workspace-name",
  "description": "Workspace description",
  "resourceQuota": {
    "cpu": "16",
    "memory": "64Gi",
    "pods": 100,
    "services": 50
  }
}
```

**Workspace Members:**
```http
GET /api/v1/workspaces/{id}/members
Authorization: Bearer <access_token>
```

Response:
```json
{
  "success": true,
  "data": [
    {
      "id": 101,
      "workspaceId": 1,
      "userId": "user1@example.com",
      "role": "WORKSPACE_ADMIN",
      "joinedAt": "2024-02-01T10:00:00Z"
    },
    {
      "id": 102,
      "workspaceId": 1,
      "userId": "user2@example.com",
      "role": "WORKSPACE_MEMBER",
      "joinedAt": "2024-02-01T11:00:00Z"
    }
  ],
  "total": 2
}
```

**Add Workspace Member:**
```http
POST /api/v1/workspaces/{id}/members
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "email": "user3@example.com",
  "role": "WORKSPACE_MEMBER"
}
```

**Workspace RBAC:**
- WORKSPACE_ADMIN: Full workspace management
- WORKSPACE_MEMBER: View workspace resources
- Workspace-level roles inherit to all namespaces in workspace

---

### NamespaceDetails Component

```typescript
function NamespaceDetails({ namespaceName }: { namespaceName: string }) {
  const { data: namespace } = useNamespace(namespaceName);
  const { data: quota } = useNamespaceQuota(namespaceName);

  return (
    <div>
      <Header>
        <Title>{namespace?.name}</Title>
        {namespace?.locked && (
          <Badge variant="warning">
            Locked by {namespace?.lockedBy}
          </Badge>
        )}
      </Header>

      <Section title="Overview">
        <OverviewCard
          labels={namespace?.labels}
          annotations={namespace?.annotations}
          createdAt={namespace?.createdAt}
        />
      </Section>

      <Section title="Resource Quota">
        <QuotaGauge quota={quota} />
      </Section>

      <Actions>
        {hasPermission('WRITE', 'NAMESPACE') && (
          <>
            {!namespace?.locked && (
              <Button onClick={() => lockNamespace(namespaceName)}>
                Lock Namespace
              </Button>
            )}
            {namespace?.locked && (
              <Button onClick={() => unlockNamespace(namespaceName)}>
                Unlock Namespace
              </Button>
            )}
            <Button onClick={() => openEditDialog(namespace)}>
              Edit Namespace
            </Button>
          </>
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
| List namespaces | READ + NAMESPACE |
| View namespace details | READ + NAMESPACE |
| Create namespace | WRITE + NAMESPACE |
| Update namespace | WRITE + NAMESPACE |
| Delete namespace | DELETE + NAMESPACE |
| View resource quota | READ + NAMESPACE |
| Manage resource quota | WRITE + NAMESPACE |
| View network policies | READ + NAMESPACE |
| Create network policy | WRITE + NAMESPACE |
| Delete network policy | WRITE + NAMESPACE |
| View service accounts | READ + NAMESPACE |
| Create service account | WRITE + NAMESPACE |
| Delete service account | WRITE + NAMESPACE |

---

## Validation Rules

### Namespace Name
- Must be a valid DNS subdomain name (RFC 1123)
- Maximum length: 253 characters
- Cannot start or end with hyphen
- Cannot contain uppercase letters
- Examples: `my-app`, `production-2`, `team-alpha`

### Resource Quota
- CPU must be in format: `0.5`, `1`, `4` (cores)
- Memory must be in format: `512Mi`, `1Gi`, `16Gi`
- Storage must be in format: `10Gi`, `100Gi`, `1Ti`
- Pods must be integer

---

## Error Handling

### Namespace Already Exists
```json
{
  "success": false,
  "message": "Namespace already exists",
  "error": "NAMESPACE_EXISTS",
  "statusCode": 409
}
```

### Invalid Namespace Name
```json
{
  "success": false,
  "message": "Invalid namespace name",
  "error": "INVALID_NAMESPACE_NAME",
  "statusCode": 400
}
```

### Namespace Locked
```json
{
  "success": false,
  "message": "Namespace is locked",
  "error": "NAMESPACE_LOCKED",
  "statusCode": 403,
  "details": {
    "lockedBy": "admin@example.com",
    "lockedAt": "2024-02-06T14:00:00Z",
    "reason": "Production freeze"
  }
}
```

### Quota Exceeded
```json
{
  "success": false,
  "message": "Cannot create pod: quota exceeded",
  "error": "QUOTA_EXCEEDED",
  "statusCode": 403,
  "details": {
    "resource": "cpu",
    "used": "5",
    "hard": "5",
    "requested": "500m"
  }
}
```

---

## Configuration

```properties
# Namespace Management
namespace.name.max-length=253
namespace.name.validation-regex=^[a-z0-9]([-a-z0-9]*[a-z0-9])?$

# Namespace Locking
namespace.lock.max-duration-hours=168
namespace.lock.auto-expire=true

# Resource Quota Defaults
namespace.quota.default-cpu=4
namespace.quota.default-memory=8Gi
namespace.quota.default-pods=50

# Network Policies
namespace.network-policies.enabled=true
namespace.network-policies.default-deny=false

# Service Accounts
namespace.service-account.token-auto-mount=true
```

---

## Testing

```java
@SpringBootTest
@AutoConfigureMockMvc
public class NamespaceControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    public void testCreateNamespace() throws Exception {
        mockMvc.perform(post("/api/v1/namespaces")
                .contentType(MediaType.APPLICATION_JSON)
                .header("Authorization", "Bearer " + token)
                .content("{\"name\":\"test-ns\",\"resourceQuota\":{\"cpu\":\"2\"}}"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.success").value(true))
            .andExpect(jsonPath("$.data.name").value("test-ns"));
    }

    @Test
    public void testDeleteProductionNamespaceWithoutForce() throws Exception {
        mockMvc.perform(delete("/api/v1/namespaces/production")
                .header("Authorization", "Bearer " + token))
            .andExpect(status().isBadRequest());
    }

    @Test
    public void testGetNamespaceQuota() throws Exception {
        mockMvc.perform(get("/api/v1/namespaces/production/quota")
                .header("Authorization", "Bearer " + token))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.success").value(true))
            .andExpect(jsonPath("$.data.cpu.hard").isNumber());
    }
}
```

---

## Future Enhancements

- [ ] Namespace health checks (healthy/warning/critical status)
- [ ] Namespace cloning (copy with resources)
- [ ] Namespace import/export (CRD based)
- [ ] Hierarchical namespace management
- [ ] Namespace-level RBAC policies
- [ ] Resource quota alerting (email on threshold exceed)
- [ ] Namespace usage trends and forecasting
- [ ] Network policy visual editor
