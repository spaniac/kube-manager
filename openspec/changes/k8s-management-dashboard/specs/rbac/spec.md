## ADDED Requirements

### Requirement: Role-based access control
The system SHALL implement role-based access control (RBAC) with predefined roles (admin, developer, viewer) and custom roles.

#### Scenario: Assign admin role
- **WHEN** administrator assigns admin role to a user
- **THEN** user gains full cluster access including all resources and actions

#### Scenario: Assign developer role
- **WHEN** administrator assigns developer role to a user
- **THEN** user gains access to assigned namespaces with read/write permissions for standard resources

#### Scenario: Assign viewer role
- **WHEN** administrator assigns viewer role to a user
- **THEN** user gains read-only access to assigned namespaces

### Requirement: Namespace-level permissions
The system SHALL support assigning role permissions scoped to specific namespaces for multi-tenant isolation.

#### Scenario: Grant namespace access
- **WHEN** administrator grants developer role for namespace "production" to a user
- **THEN** user can only access resources in the "production" namespace

#### Scenario: Deny namespace access
- **WHEN** user does not have permission for namespace "finance"
- **THEN** system does not display the namespace and returns 403 for API requests

### Requirement: Resource type permissions
The system SHALL define granular permissions for each resource type (pods, deployments, services, configmaps, secrets).

#### Scenario: Pod read permission
- **WHEN** user has read permission for pods in namespace "dev"
- **THEN** user can view pod list and details but cannot create, modify, or delete

#### Scenario: Deployment write permission
- **WHEN** user has write permission for deployments in namespace "dev"
- **THEN** user can create, update, and scale deployments

### Requirement: Action-level permissions
The system SHALL define permissions for specific actions including read, write, delete, exec, and logs for each resource type.

#### Scenario: Grant exec permission
- **WHEN** user has exec permission for pods in namespace "dev"
- **THEN** user can open terminal sessions in pods

#### Scenario: Deny delete permission
- **WHEN** user does not have delete permission for deployments
- **THEN** delete button is hidden and API returns 403 for delete operations

### Requirement: Permission inheritance
The system SHALL support role hierarchy where higher-level roles inherit permissions from lower-level roles.

#### Scenario: Admin role inheritance
- **WHEN** user is assigned admin role
- **THEN** user automatically inherits all developer and viewer permissions

### Requirement: Custom role creation
The system SHALL allow administrators to create custom roles with specific combinations of permissions.

#### Scenario: Create custom role
- **WHEN** administrator creates custom role "namespace-admin" with full permissions for a single namespace
- **THEN** role is available for assignment to users

### Requirement: Permission validation
The system SHALL validate user permissions on every API request and deny access if permissions are insufficient.

#### Scenario: Validate API request
- **WHEN** user attempts to delete a pod without delete permission
- **THEN** system returns 403 Forbidden and logs the authorization failure

#### Scenario: Validate frontend action
- **WHEN** user views a resource without read permission
- **THEN** system hides the resource from the UI

### Requirement: Role assignment management
The system SHALL provide UI and API for managing user role assignments including creating, updating, and removing assignments.

#### Scenario: Create role assignment
- **WHEN** administrator assigns developer role to user for namespace "staging"
- **THEN** assignment is saved and permissions take effect immediately

#### Scenario: Remove role assignment
- **WHEN** administrator removes user's developer role for namespace "staging"
- **THEN** user loses access to the namespace

### Requirement: Permission caching
The system SHALL cache user permissions for performance while supporting cache invalidation on role changes.

#### Scenario: Cache permissions
- **WHEN** user authenticates and permissions are loaded
- **THEN** permissions are cached in memory for subsequent requests

#### Scenario: Invalidate permission cache
- **WHEN** administrator modifies user's role assignments
- **THEN** permission cache is invalidated and user permissions are reloaded on next request

### Requirement: RBAC audit logging
The system SHALL log all permission checks, role assignments, and access control decisions for compliance auditing.

#### Scenario: Log permission check
- **WHEN** API request is validated for permissions
- **THEN** system logs user, resource, action, and authorization decision

#### Scenario: Log role assignment change
- **WHEN** administrator modifies user's role assignment
- **THEN** system logs the change with timestamp, administrator, and new assignment

### Requirement: Namespace isolation enforcement
The system SHALL enforce namespace isolation so users cannot access resources in namespaces they don't have permission for.

#### Scenario: Cross-namespace access denied
- **WHEN** user with access to "dev" namespace attempts to access "prod" namespace
- **THEN** system returns 403 Forbidden and logs the unauthorized access attempt

### Requirement: Secret access control
The system SHALL apply stricter access controls for secrets, requiring explicit permissions even for users with general namespace access.

#### Scenario: Restrict secret access
- **WHEN** user has general namespace access but no specific secret read permission
- **THEN** system denies access to secrets and displays masked values

### Requirement: Permission display in UI
The system SHALL display user's current permissions and role assignments in a user settings page.

#### Scenario: View user permissions
- **WHEN** user navigates to their settings page
- **THEN** system displays their role assignments and associated permissions

### Requirement: Role templates
The system SHALL provide pre-configured role templates for common use cases (admin, developer, viewer, namespace-admin).

#### Scenario: Apply role template
- **WHEN** administrator selects "developer" template when creating a new role
- **THEN** system pre-fills the role with standard developer permissions

### Requirement: Resource-specific permissions
The system SHALL support assigning permissions at the individual resource level (e.g., access to specific deployment only).

#### Scenario: Grant resource-specific access
- **WHEN** administrator grants read permission for specific deployment "api-server" to a user
- **THEN** user can view only that deployment, not other deployments in the namespace

### Requirement: Temporary role assignments
The system SHALL support time-limited role assignments with automatic expiration.

#### Scenario: Create temporary role assignment
- **WHEN** administrator assigns developer role with 1-week expiration to a user
- **THEN** user has access for 1 week, after which assignment is automatically removed

### Requirement: RBAC policy import/export
The system SHALL allow importing and exporting RBAC policies as configuration files for version control and backup.

#### Scenario: Export RBAC policies
- **WHEN** administrator clicks "Export Policies"
- **THEN** system downloads a YAML file containing all role assignments and permissions

#### Scenario: Import RBAC policies
- **WHEN** administrator uploads a RBAC policy YAML file
- **THEN** system applies the role assignments and permissions

### Requirement: Permission conflict resolution
The system SHALL resolve permission conflicts by using the most permissive permission when multiple roles grant different access levels.

#### Scenario: Resolve permission conflict
- **WHEN** user has viewer role (read-only) and custom role with write permission for pods
- **THEN** user has write permission for pods (most permissive)

### Requirement: RBAC sync with identity provider
The system SHALL support synchronizing roles and group memberships from the identity provider (e.g., Keycloak groups).

#### Scenario: Sync from Keycloak groups
- **WHEN** user belongs to "developers" group in Keycloak
- **THEN** system automatically assigns developer role in the application

### Requirement: Deny policies
The system SHALL support explicit deny policies that override any allow permissions for specific users or conditions.

#### Scenario: Apply deny policy
- **WHEN** administrator applies deny policy preventing any modification to "production" namespace
- **THEN** even admin users cannot modify production resources until deny policy is removed
