# Role-Based Access Control (RBAC)

## Overview

K8s Manager implements a comprehensive RBAC system that provides fine-grained access control to Kubernetes resources. The system supports predefined roles, custom roles, namespace-scoped permissions, resource-specific permissions, and deny policies.

---

## RBAC Model

### Hierarchy

```
ADMIN (Cluster-wide, no deny policies apply)
├── All permissions (READ, WRITE, DELETE, EXEC, LOGS)
├── All resource types (POD, DEPLOYMENT, NAMESPACE, ALL)
├── Applies to all namespaces
└── Cannot be restricted by deny policies

DEVELOPER (Namespace-scoped)
├── READ + WRITE + EXEC + LOGS permissions
├── All resource types (except DELETE)
├── Namespace-scoped (must be assigned to specific namespace)
└── Subject to deny policies

VIEWER (Read-only)
├── READ + LOGS permissions
├── All resource types
├── Namespace-scoped
└── Cannot modify any resources

CUSTOM ROLES
├── Flexible permission combinations
├── Namespace-scoped
├── Can have resource-specific permissions
└── Subject to deny policies
```

### Permission Types

| Type | Description |
|-------|-------------|
| READ | View resource details, list resources |
| WRITE | Create and modify resources |
| DELETE | Delete resources |
| EXEC | Execute commands in terminal/shell |
| LOGS | View pod logs |
| ALL | All permissions |

### Resource Types

| Resource | Available Permissions |
|----------|---------------------|
| NAMESPACE | READ, WRITE, DELETE |
| POD | READ, WRITE, DELETE, EXEC, LOGS |
| DEPLOYMENT | READ, WRITE, DELETE |
| STATEFULSET | READ, WRITE, DELETE |
| DAEMONSET | READ, WRITE, DELETE |
| SERVICE | READ, WRITE, DELETE |
| CONFIGMAP | READ, WRITE, DELETE |
| SECRET | READ, WRITE, DELETE |
| JOB | READ, WRITE, DELETE |
| CRONJOB | READ, WRITE, DELETE |
| ALL | All permissions for all resources |

---

## Database Schema

### Tables

#### roles
```sql
CREATE TABLE roles (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL,
    description VARCHAR(255)
);
```

#### permissions
```sql
CREATE TABLE permissions (
    id BIGSERIAL PRIMARY KEY,
    type VARCHAR(50) NOT NULL,
    resource_type VARCHAR(50) NOT NULL
);
```

#### role_permissions
```sql
CREATE TABLE role_permissions (
    id BIGSERIAL PRIMARY KEY,
    role_id BIGINT REFERENCES roles(id),
    permission_id BIGINT REFERENCES permissions(id),
    UNIQUE(role_id, permission_id)
);
```

#### user_roles
```sql
CREATE TABLE user_roles (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT REFERENCES users(id),
    role_id BIGINT REFERENCES roles(id),
    namespace VARCHAR(255),
    created_at TIMESTAMP DEFAULT NOW(),
    UNIQUE(user_id, role_id, namespace)
);
```

#### resource_permissions
```sql
CREATE TABLE resource_permissions (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT REFERENCES users(id),
    resource_type VARCHAR(50) NOT NULL,
    resource_id VARCHAR(255) NOT NULL,
    permissions JSONB NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);
```

#### temporary_role_assignments
```sql
CREATE TABLE temporary_role_assignments (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT REFERENCES users(id),
    role_id BIGINT REFERENCES roles(id),
    namespace VARCHAR(255),
    expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);
```

#### deny_policies
```sql
CREATE TABLE deny_policies (
    id BIGSERIAL PRIMARY KEY,
    rule_type VARCHAR(50) NOT NULL,
    resource_type VARCHAR(50),
    namespace VARCHAR(255),
    created_by BIGINT REFERENCES users(id),
    created_at TIMESTAMP DEFAULT NOW()
);
```

---

## API Endpoints

### Role Management

#### List All Roles
```http
GET /api/v1/admin/roles
Authorization: Bearer <admin-token>
```

Response:
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "ADMIN",
      "description": "Full cluster access"
    },
    {
      "id": 2,
      "name": "DEVELOPER",
      "description": "Namespace access with read/write"
    },
    {
      "id": 3,
      "name": "VIEWER",
      "description": "Read-only access"
    },
    {
      "id": 4,
      "name": "NAMESPACE_ADMIN",
      "description": "Custom role for namespace management",
      "type": "CUSTOM"
    }
  ]
}
```

#### Get Role Details
```http
GET /api/v1/admin/roles/{roleName}
Authorization: Bearer <admin-token>
```

Response:
```json
{
  "success": true,
  "data": {
    "id": 2,
    "name": "DEVELOPER",
    "description": "Namespace access with read/write",
    "permissions": [
      { "type": "READ", "resourceType": "POD" },
      { "type": "WRITE", "resourceType": "POD" },
      { "type": "EXEC", "resourceType": "POD" },
      { "type": "LOGS", "resourceType": "POD" },
      { "type": "READ", "resourceType": "DEPLOYMENT" },
      { "type": "WRITE", "resourceType": "DEPLOYMENT" },
      ...
    ]
  }
}
```

#### Create Custom Role
```http
POST /api/v1/admin/roles
Authorization: Bearer <admin-token>
Content-Type: application/json

{
  "name": "DEPLOYMENT_READER",
  "description": "Can view deployments only",
  "permissions": [
    { "type": "READ", "resourceType": "DEPLOYMENT" }
  ]
}
```

Response:
```json
{
  "success": true,
  "data": {
    "id": 5,
    "name": "DEPLOYMENT_READER",
    "description": "Can view deployments only",
    "type": "CUSTOM",
    "permissions": [...]
  }
}
```

#### Update Role Permissions
```http
PUT /api/v1/admin/roles/{roleName}
Authorization: Bearer <admin-token>
Content-Type: application/json

{
  "description": "Updated description",
  "permissions": [
    { "type": "READ", "resourceType": "DEPLOYMENT" },
    { "type": "READ", "resourceType": "SERVICE" }
  ]
}
```

#### Delete Custom Role
```http
DELETE /api/v1/admin/roles/{roleName}
Authorization: Bearer <admin-token>
```

#### Get All Permissions
```http
GET /api/v1/admin/permissions
Authorization: Bearer <admin-token>
```

Response:
```json
{
  "success": true,
  "data": [
    { "id": 1, "type": "READ", "resourceType": "POD" },
    { "id": 2, "type": "WRITE", "resourceType": "POD" },
    ...
  ]
}
```

### Role Assignment

#### Assign Role to User
```http
POST /api/v1/admin/roles/{roleName}/assign
Authorization: Bearer <admin-token>
Content-Type: application/json

{
  "email": "user@example.com",
  "namespace": "production"
}
```

Response:
```json
{
  "success": true,
  "message": "Role assigned successfully"
}
```

#### Revoke Role from User
```http
DELETE /api/v1/admin/roles/{roleName}/revoke
Authorization: Bearer <admin-token>
Content-Type: application/json

{
  "email": "user@example.com"
}
```

#### Get User Roles
```http
GET /api/v1/admin/users/{email}/roles
Authorization: Bearer <admin-token>
```

Response:
```json
{
  "success": true,
  "data": [
    {
      "role": "DEVELOPER",
      "namespace": "production",
      "assignedAt": "2024-01-15T10:00:00Z"
    },
    {
      "role": "VIEWER",
      "namespace": "staging",
      "assignedAt": "2024-01-20T14:30:00Z"
    }
  ]
}
```

### Resource-Specific Permissions

#### Grant Resource-Specific Permission
```http
POST /api/v1/admin/permissions/resource
Authorization: Bearer <admin-token>
Content-Type: application/json

{
  "email": "user@example.com",
  "resourceType": "DEPLOYMENT",
  "resourceId": "api-server",
  "permissions": ["READ", "LOGS"]
}
```

Response:
```json
{
  "success": true,
  "message": "Resource permission granted"
}
```

#### Revoke Resource-Specific Permission
```http
DELETE /api/v1/admin/permissions/resource/{permissionId}
Authorization: Bearer <admin-token>
```

#### Get Resource Permissions
```http
GET /api/v1/admin/permissions/resource?user={email}&resourceType={type}
Authorization: Bearer <admin-token>
```

Response:
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "resourceType": "DEPLOYMENT",
      "resourceId": "api-server",
      "permissions": ["READ", "LOGS"]
    }
  ]
}
```

### Temporary Role Assignments

#### Create Temporary Assignment
```http
POST /api/v1/admin/roles/temporary
Authorization: Bearer <admin-token>
Content-Type: application/json

{
  "email": "user@example.com",
  "role": "ADMIN",
  "namespace": null,
  "expiresAt": "2024-02-13T18:00:00Z"
}
```

Response:
```json
{
  "success": true,
  "message": "Temporary role assigned"
}
```

#### List Active Temporary Assignments
```http
GET /api/v1/admin/roles/temporary?email={email}
Authorization: Bearer <admin-token>
```

Response:
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "role": "ADMIN",
      "namespace": null,
      "expiresAt": "2024-02-13T18:00:00Z",
      "expiresInHours": 168,
      "assignedAt": "2024-02-06T14:00:00Z"
    }
  ]
}
```

### Deny Policies

#### Create Deny Policy
```http
POST /api/v1/admin/deny-policies
Authorization: Bearer <admin-token>
Content-Type: application/json

{
  "ruleType": "PRODUCTION_PROTECTION",
  "resourceType": "NAMESPACE",
  "namespace": "production"
}
```

Response:
```json
{
  "success": true,
  "message": "Deny policy created"
}
```

**Rule Types:**
- `PRODUCTION_PROTECTION`: Prevents modifications to production namespace
- `MAINTENANCE_WINDOW`: Denies modifications during maintenance window
- `CUSTOM`: User-defined deny rule

#### List Deny Policies
```http
GET /api/v1/admin/deny-policies
Authorization: Bearer <admin-token>
```

Response:
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "ruleType": "PRODUCTION_PROTECTION",
      "resourceType": "NAMESPACE",
      "namespace": "production",
      "createdBy": "admin@example.com",
      "createdAt": "2024-01-15T10:00:00Z"
    }
  ]
}
```

#### Delete Deny Policy
```http
DELETE /api/v1/admin/deny-policies/{policyId}
Authorization: Bearer <admin-token>
```

### Permission Conflicts

#### Check for Conflicts
```http
GET /api/v1/admin/permissions/conflicts?user={email}
Authorization: Bearer <admin-token>
```

Response:
```json
{
  "success": true,
  "data": [
    {
      "namespace": "production",
      "conflictType": "DUPLICATE_ROLE",
      "description": "User has both VIEWER and DEVELOPER roles",
      "resolution": "Keep DEVELOPER (most permissive)"
    }
  ]
}
```

#### Auto-Resolve Conflicts
```http
POST /api/v1/admin/permissions/conflicts/resolve
Authorization: Bearer <admin-token>
Content-Type: application/json

{
  "email": "user@example.com",
  "namespace": "production",
  "resolution": "MOST_PERMISSIVE"
}
```

**Resolution Strategies:**
- `MOST_PERMISSIVE`: Keep the most permissive permission
- `LEAST_PERMISSIVE`: Keep the least permissive permission
- `MANUAL`: Keep specific roles (requires manual role selection)

### Role Templates

#### Get Role Templates
```http
GET /api/v1/admin/roles/templates
Authorization: Bearer <admin-token>
```

Response:
```json
{
  "success": true,
  "data": [
    {
      "name": "ADMIN",
      "description": "Full cluster access",
      "permissions": ["ALL"]
    },
    {
      "name": "DEVELOPER",
      "description": "Namespace access with read/write/exec/logs",
      "permissions": ["READ", "WRITE", "EXEC", "LOGS"]
    },
    {
      "name": "VIEWER",
      "description": "Read-only access",
      "permissions": ["READ", "LOGS"]
    }
  ]
}
```

#### Create Role from Template
```http
POST /api/v1/admin/roles/from-template
Authorization: Bearer <admin-token>
Content-Type: application/json

{
  "templateName": "DEVELOPER",
  "customName": "FRONTEND_DEVELOPER",
  "description": "Frontend team developer role"
}
```

### Keycloak Group Sync

#### Sync Roles from Keycloak Groups
```http
POST /api/v1/admin/roles/sync-keycloak
Authorization: Bearer <admin-token>
Content-Type: application/json

{
  "mappings": {
    "k8s-admins": "ADMIN",
    "k8s-developers": "DEVELOPER",
    "k8s-viewers": "VIEWER"
  }
}
```

Response:
```json
{
  "success": true,
  "message": "Role sync completed",
  "data": {
    "usersUpdated": 45,
    "rolesAssigned": 45,
    "errors": []
  }
}
```

---

## Permission Resolution Algorithm

### Step 1: Collect All Permissions

For a given user and namespace, collect:

1. **Role-based permissions** (from user_roles table)
2. **Resource-specific permissions** (from resource_permissions table)
3. **Temporary role permissions** (from temporary_role_assignments table)

### Step 2: Apply Deny Policies

1. Check for deny policies matching:
   - Resource type
   - Namespace
   - Rule type

2. Remove denied permissions from result set

**Exception**: ADMIN role ignores deny policies

### Step 3: Resolve Conflicts

If multiple roles grant conflicting permissions:

- Apply `MOST_PERMISSIVE` strategy by default
- Keep the most permissive permission for each (type, resourceType) pair

### Step 4: Final Permission Set

Return final set of permissions for authorization check.

**Example:**

```javascript
// User has:
// - DEVELOPER role in "production" namespace (READ, WRITE, EXEC, LOGS)
// - VIEWER role in "staging" namespace (READ, LOGS)
// - Resource-specific permission: READ for deployment "api-server" in "production"

// Request: DELETE deployment "api-server" in "production"

// Resolution:
// 1. Role-based: DEVELOPER has READ, WRITE, EXEC, LOGS (no DELETE)
// 2. Resource-specific: READ only for "api-server"
// 3. Final: READ permission only (not enough to delete)
// 4. Result: DENY
```

---

## Authorization in Controllers

### Method-Level Security

```java
@RestController
@RequestMapping("/pods")
public class PodController {

    @GetMapping
    @PreAuthorize("hasAnyAuthority('READ', 'POD')")
    public ApiResponse<List<PodDTO>> listPods() {
        // User must have READ permission for POD resource type
        ...
    }

    @DeleteMapping("/{namespace}/{name}")
    @PreAuthorize("hasAnyAuthority('DELETE', 'POD')")
    public ApiResponse<Void> deletePod() {
        // User must have DELETE permission for POD resource type
        ...
    }

    @GetMapping("/{namespace}/{name}/logs")
    @PreAuthorize("hasAnyAuthority('LOGS', 'POD')")
    public SseEmitter streamLogs() {
        // User must have LOGS permission for POD resource type
        ...
    }
}
```

### Custom Authorization Service

```java
@Service
public class RbacService {

    public boolean hasPermission(String userId, String namespace,
                           PermissionType permissionType, ResourceType resourceType) {
        // Load user's permissions
        Set<Permission> permissions = getUserPermissions(userId, namespace);

        // Check if permission exists
        return permissions.stream().anyMatch(p ->
            p.getType() == permissionType &&
            p.getResourceType() == resourceType
        );
    }

    public boolean canModifyNamespace(String userId, String namespace) {
        // Check deny policies
        List<DenyPolicy> denyPolicies = denyPolicyRepository
            .findByResourceTypeAndNamespace("NAMESPACE", namespace);

        if (!denyPolicies.isEmpty()) {
            return false;
        }

        // Check user permissions
        return hasPermission(userId, namespace, PermissionType.WRITE, ResourceType.NAMESPACE);
    }
}
```

---

## Permission Matrix

| Resource Type | ADMIN | DEVELOPER | VIEWER |
|---------------|---------|------------|---------|
| **NAMESPACE** |  |  |  |
| READ | ✓ | ✗ | ✗ |
| WRITE | ✓ | ✗ | ✗ |
| DELETE | ✓ | ✗ | ✗ |
| **POD** |  |  |  |
| READ | ✓ | ✓ | ✓ |
| WRITE | ✓ | ✓ | ✗ |
| DELETE | ✓ | ✗ | ✗ |
| EXEC | ✓ | ✓ | ✗ |
| LOGS | ✓ | ✓ | ✓ |
| **DEPLOYMENT** |  |  |  |
| READ | ✓ | ✓ | ✓ |
| WRITE | ✓ | ✓ | ✗ |
| DELETE | ✓ | ✗ | ✗ |
| **SERVICE** |  |  |  |
| READ | ✓ | ✓ | ✓ |
| WRITE | ✓ | ✓ | ✗ |
| DELETE | ✓ | ✗ | ✗ |
| **CONFIGMAP** |  |  |  |
| READ | ✓ | ✓ | ✓ |
| WRITE | ✓ | ✓ | ✗ |
| DELETE | ✓ | ✗ | ✗ |
| **SECRET** |  |  |  |
| READ | ✓ | ✓ | ✓ |
| WRITE | ✓ | ✓ | ✗ |
| DELETE | ✓ | ✗ | ✗ |

---

## Frontend Integration

### Permission-Based UI

```typescript
import { useAuth } from '../contexts/AuthContext';

function PodList() {
  const { user, hasPermission } = useAuth();

  return (
    <div>
      <h2>Pods</h2>

      {hasPermission('READ', 'POD') && (
        <PodTable />
      )}

      {hasPermission('WRITE', 'POD') && (
        <Button>Create Pod</Button>
      )}

      {hasPermission('DELETE', 'POD') && (
        <Button variant="danger">Delete Selected</Button>
      )}
    </div>
  );
}
```

### Role Management UI

```typescript
function RoleAssignmentDialog() {
  const [selectedRole, setSelectedRole] = useState('');
  const [selectedNamespace, setSelectedNamespace] = useState('');

  const assignRole = async () => {
    await api.post(`/admin/roles/${selectedRole}/assign`, {
      email: user.email,
      namespace: selectedNamespace
    });
  };

  return (
    <Dialog>
      <RoleSelect onChange={setSelectedRole} />
      <NamespaceSelect onChange={setSelectedNamespace} />
      <Button onClick={assignRole}>Assign Role</Button>
    </Dialog>
  );
}
```

---

## Testing

### Permission Testing

```java
@SpringBootTest
@AutoConfigureMockMvc
public class RbacServiceTest {

    @Test
    public void testDeveloperHasReadPermission() {
        // Given: User has DEVELOPER role in "production" namespace
        User user = createTestUserWithRole("user@test.com", "DEVELOPER", "production");

        // When: Check for READ permission on POD
        boolean hasPermission = rbacService.hasPermission(
            user.getId(), "production",
            PermissionType.READ, ResourceType.POD
        );

        // Then: Permission granted
        assertTrue(hasPermission);
    }

    @Test
    public void testViewerCannotDeletePods() {
        // Given: User has VIEWER role
        User user = createTestUserWithRole("user@test.com", "VIEWER", "default");

        // When: Check for DELETE permission on POD
        boolean canDelete = rbacService.hasPermission(
            user.getId(), "default",
            PermissionType.DELETE, ResourceType.POD
        );

        // Then: Permission denied
        assertFalse(canDelete);
    }

    @Test
    public void testDenyPolicyPreventsModification() {
        // Given: DEVELOPER role + deny policy on "production" namespace
        User user = createTestUserWithRoleAndDenyPolicy(
            "user@test.com", "DEVELOPER", "production"
        );

        // When: Try to modify "production" namespace
        boolean canModify = rbacService.canModifyNamespace(
            user.getId(), "production"
        );

        // Then: Permission denied
        assertFalse(canModify);
    }
}
```

---

## Configuration

```properties
# RBAC Settings
rbac.default-role=VIEWER
rbac.allow-self-management=true

# Temporary Assignment Settings
rbac.temporary.max-duration-days=30
rbac.temporary.cleanup-interval-hours=24

# Conflict Resolution
rbac.conflict-resolution-strategy=MOST_PERMISSIVE

# Deny Policies
rbac.deny-policies.enabled=true
rbac.deny-policies.production-protection.enabled=true
```

---

## Security Considerations

1. **Admin Role**: Cannot be restricted by deny policies (superuser)
2. **Escalation Prevention**: Users cannot assign roles higher than their own
3. **Audit Logging**: All permission changes logged for compliance
4. **Permission Caching**: Cache user permissions for 5 minutes to reduce DB load
5. **Namespace Isolation**: Namespace-scoped permissions cannot affect other namespaces

---

## Troubleshooting

### Issue: Temporary role not working
**Possible Causes:**
1. Assignment expired
2. Cleanup job removed it prematurely
3. User has conflicting regular role
**Solution:**
```bash
# Check active temporary assignments
GET /admin/roles/temporary?email={email}

# Verify expiresAt is in future
```

### Issue: User cannot access resource they should have access to
**Possible Causes:**
1. Role assignment missing namespace
2. Permission conflict not resolved
3. Deny policy blocking access
4. Permission cache not refreshed
**Solution:**
```bash
# Check user's roles
GET /admin/users/{email}/roles

# Check for conflicts
GET /admin/permissions/conflicts?user={email}

# Check deny policies
GET /admin/deny-policies?namespace={namespace}
```

### Issue: Permission conflict not resolved
**Possible Causes:**
1. Conflict strategy not applied
2. Manual role override not set
3. Cache not refreshed after update
**Solution:**
```bash
# Check for conflicts
GET /admin/permissions/conflicts?user={email}

# Resolve conflict if exists
POST /admin/permissions/conflicts/resolve
```

---

## Policy-as-Code Security (OPA/Rego Integration)

### Integration Points
- Policy definitions stored as Rego modules
- Admission decisions evaluated before RBAC resolution
- Audit logs include OPA decision metadata

---

## Future Enhancements

- [ ] Time-based permissions (only during business hours)
- [ ] Location-based permissions (from office IP only)
- [ ] Approval workflow for high-risk operations
- [ ] Permission groups (combine multiple permissions)
- [ ] Inheritance (parent-child roles)
- [ ] External policy engine integration (OPA/Rego)
