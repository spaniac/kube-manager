# K8s Manager Database Schema

## Overview

K8s Manager uses PostgreSQL 15+ as its primary database for storing user management, RBAC policies, audit logs, and session tracking. The schema follows a relational model with proper normalization and referential integrity.

**Database**: PostgreSQL 15+
**ORM**: Spring Data JPA with Hibernate
**Migration Tool**: Liquibase
**Schema Version**: 1.0.0

---

## Table of Contents

1. [Entity Relationship Diagram](#entity-relationship-diagram)
2. [Tables](#tables)
   - [users](#users)
   - [roles](#roles)
   - [permissions](#permissions)
   - [role_permissions](#role_permissions)
   - [user_roles](#user_roles)
   - [sessions](#sessions)
   - [audit_logs](#audit_logs)
3. [Indexes](#indexes)
4. [Migration Strategy](#migration-strategy)
5. [Data Retention Policy](#data-retention-policy)

---

## Entity Relationship Diagram

```
┌─────────────┐
│   users     │
└──────┬──────┘
       │
       ├─────────────┐
       │user_roles   │
       └──────┬──────┘
              │
       ┌─────┴─────┐
       │   roles      │
       └──────┬──────┘
              │
       ┌───────────┴──────────┐
       │   role_permissions      │
       └──────┬─────────────────┘
              │
       ┌─────┴─────┐
       │ permissions   │
       └──────────────┘
              
       ┌─────────────┐
       │ audit_logs  │
       └─────┬──────┘
             │
    ┌────┴────────┐
    │   sessions   │
    └─────────────┘
```

**Relationship Types**:
- **One-to-Many**: User → UserRole (1:N)
- **Many-to-Many**: Role ↔ Permission (N:M via role_permissions)
- **One-to-Many**: User → Session (1:N)
- **One-to-Many**: User → AuditLog (1:N)
- **Many-to-One**: Role → UserRole (N:1)

---

## Tables

### users

Stores user accounts and profile information.

**Table Name**: `users`

| Column | Type | Constraints | Description |
|---------|--------|-------------|-------------|
| id | BIGINT | PK, AUTO_INCREMENT | Unique user identifier |
| email | VARCHAR(255) | UNIQUE, NOT NULL | User email (used for OAuth2 login) |
| name | VARCHAR(255) | NULLABLE | Display name |
| avatar_url | VARCHAR(255) | NULLABLE | Avatar image URL |
| created_at | TIMESTAMP | NOT NULL, DEFAULT NOW() | Account creation timestamp |
| last_login_at | TIMESTAMP | NULLABLE | Last successful login timestamp |

**Entity**: `com.k8smanager.persistence.entity.User`

**JPA Annotations**:
```java
@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
```

**Indexes**:
- `idx_users_email` (UNIQUE) on `email`

---

### roles

Predefined and custom RBAC roles with their permissions.

**Table Name**: `roles`

| Column | Type | Constraints | Description |
|---------|--------|-------------|-------------|
| id | BIGINT | PK, AUTO_INCREMENT | Unique role identifier |
| name | VARCHAR(50) | UNIQUE, NOT NULL | Role type name (ADMIN, DEVELOPER, VIEWER, or custom) |
| description | VARCHAR(255) | NULLABLE | Human-readable description |

**Entity**: `com.k8smanager.persistence.entity.Role`

**JPA Annotations**:
```java
@Entity
@Table(name = "roles")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
```

**Enums**:
```java
public enum RoleType {
    ADMIN,      // Full cluster access
    DEVELOPER,  // Namespace access with read/write
    VIEWER      // Read-only access
}
```

**Indexes**:
- `idx_roles_name` (UNIQUE) on `name`

---

### permissions

Granular permissions for RBAC system defining actions on resource types.

**Table Name**: `permissions`

| Column | Type | Constraints | Description |
|---------|--------|-------------|-------------|
| id | BIGINT | PK, AUTO_INCREMENT | Unique permission identifier |
| type | VARCHAR(50) | NOT NULL | Permission type (READ, WRITE, DELETE, EXEC, LOGS) |
| resource_type | VARCHAR(50) | NOT NULL | Resource type (POD, DEPLOYMENT, SERVICE, etc.) |

**Entity**: `com.k8smanager.persistence.entity.Permission`

**JPA Annotations**:
```java
@Entity
@Table(name = "permissions")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
```

**Enums**:
```java
public enum PermissionType {
    READ,    // Read access
    WRITE,   // Create/modify access
    DELETE,  // Delete access
    EXEC,    // Execute/terminal access
    LOGS,    // View logs access
    ALL       // All permissions
}

public enum ResourceType {
    POD,
    DEPLOYMENT,
    STATEFULSET,
    DAEMONSET,
    SERVICE,
    CONFIGMAP,
    SECRET,
    NAMESPACE,
    ALL        // All resource types
}
```

---

### role_permissions

Many-to-many relationship table between roles and permissions.

**Table Name**: `role_permissions`

| Column | Type | Constraints | Description |
|---------|--------|-------------|-------------|
| id | BIGINT | PK, AUTO_INCREMENT | Unique mapping identifier |
| role_id | BIGINT | FK → roles(id), NOT NULL | Reference to role |
| permission_id | BIGINT | FK → permissions(id), NOT NULL | Reference to permission |

**Entity**: `com.k8smanager.persistence.entity.RolePermission`

**JPA Annotations**:
```java
@Entity
@Table(name = "role_permissions")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
```

**Indexes**:
- `idx_role_permissions_role` on `role_id`
- `idx_role_permissions_permission` on `permission_id`
- `uk_role_permission` (UNIQUE) on (`role_id`, `permission_id`)

**Purpose**: This join table allows many-to-many relationship between roles and permissions, enabling flexible RBAC where:
- Each role can have multiple permissions
- Each permission can be assigned to multiple roles

---

### user_roles

Many-to-many relationship table between users and roles with namespace scoping support.

**Table Name**: `user_roles`

| Column | Type | Constraints | Description |
|---------|--------|-------------|-------------|
| id | BIGINT | PK, AUTO_INCREMENT | Unique assignment identifier |
| user_id | BIGINT | FK → users(id), NOT NULL | Reference to user |
| role_id | BIGINT | FK → roles(id), NOT NULL | Reference to role |
| namespace | VARCHAR(255) | NULLABLE | Namespace for namespace-scoped role assignment |
| created_at | TIMESTAMP | NOT NULL, DEFAULT NOW() | Assignment creation timestamp |

**Entity**: `com.k8smanager.persistence.entity.UserRole`

**JPA Annotations**:
```java
@Entity
@Table(name = "user_roles", 
         uniqueConstraints = {
             @UniqueConstraint(columnNames = {"user_id", "role_id", "namespace"})
         })
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
```

**Constraints**:
- **Unique**: (`user_id`, `role_id`, `namespace`) - Prevents duplicate role assignments for the same namespace

**Indexes**:
- `idx_user_roles_user` on `user_id`
- `idx_user_roles_role` on `role_id`
- `idx_user_roles_namespace` on `namespace`

**Purpose**: Supports namespace-level RBAC where a user can have different roles in different namespaces. The `namespace` field enables isolation between namespaces.

**Business Logic**:
- When `namespace` is NULL: Role applies globally (cluster-wide access)
- When `namespace` is NOT NULL: Role is restricted to that specific namespace only
- A user can have multiple role assignments (e.g., ADMIN globally + DEVELOPER in `production` namespace)

---

### sessions

Stores active OAuth2/OIDC sessions with tokens and metadata.

**Table Name**: `sessions`

| Column | Type | Constraints | Description |
|---------|--------|-------------|-------------|
| id | BIGINT | PK, AUTO_INCREMENT | Unique session identifier |
| user_id | BIGINT | FK → users(id), NOT NULL | Reference to user |
| access_token | VARCHAR(500) | UNIQUE, NOT NULL | OAuth2 access token |
| refresh_token | VARCHAR(500) | UNIQUE, NOT NULL | OAuth2 refresh token |
| expires_at | TIMESTAMP | NOT NULL | Token expiration timestamp |
| last_activity_at | TIMESTAMP | NULLABLE | Last user activity timestamp |
| created_at | TIMESTAMP | NOT NULL, DEFAULT NOW() | Session creation timestamp |
| ip_address | VARCHAR(50) | NULLABLE | Client IP address |
| user_agent | VARCHAR(500) | NULLABLE | Client user agent string |

**Entity**: `com.k8smanager.persistence.entity.Session`

**JPA Annotations**:
```java
@Entity
@Table(name = "sessions", 
         indexes = {
             @Index(name = "idx_session_user_id", columnList = "user_id"),
             @Index(name = "idx_session_refresh_token", columnList = "refresh_token")
         })
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
```

**Business Methods**:
```java
public boolean isExpired() {
    return Instant.now().isAfter(expiresAt);
}

public boolean isInactive(long timeoutMinutes) {
    return Instant.now().minus(Duration.ofMinutes(timeoutMinutes))
            .isAfter(lastActivityAt);
}
```

**Indexes**:
- `idx_session_user_id` on `user_id` - Query user's active sessions
- `idx_session_refresh_token` on `refresh_token` - Token refresh lookups
- `idx_session_access_token` (UNIQUE) on `access_token`

**Purpose**: Tracks all active user sessions for:
- Session timeout enforcement (30 minutes default)
- Token refresh mechanism
- Concurrent session limiting (max 5 per user)
- Security tracking (IP, user agent)

---

### audit_logs

Comprehensive audit trail for all CRUD operations and security events.

**Table Name**: `audit_logs`

| Column | Type | Constraints | Description |
|---------|--------|-------------|-------------|
| id | BIGINT | PK, AUTO_INCREMENT | Unique audit entry identifier |
| user_id | BIGINT | FK → users(id), NULLABLE | User who performed action |
| action | VARCHAR(50) | NOT NULL | Action performed (CREATE, READ, UPDATE, DELETE, EXEC, LOGS) |
| resource_type | VARCHAR(50) | NOT NULL | Type of resource affected |
| resource_id | VARCHAR(255) | NULLABLE | Identifier of affected resource |
| old_values | VARCHAR(500) | NULLABLE | Values before change (JSON) |
| new_values | VARCHAR(500) | NULLABLE | Values after change (JSON) |
| result | VARCHAR(255) | NULLABLE | Operation result (SUCCESS, FAILURE, ERROR) |
| created_at | TIMESTAMP | NOT NULL, DEFAULT NOW() | Audit entry timestamp |
| ip_address | VARCHAR(255) | NULLABLE | Client IP address |
| user_agent | VARCHAR(500) | NULLABLE | Client user agent |

**Entity**: `com.k8smanager.persistence.entity.AuditLog`

**JPA Annotations**:
```java
@Entity
@Table(name = "audit_logs", 
         indexes = {
             @Index(name = "idx_audit_user_id", columnList = "user_id"),
             @Index(name = "idx_audit_timestamp", columnList = "created_at"),
             @Index(name = "idx_audit_resource_type", columnList = "resource_type")
         })
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
```

**Purpose**: Provides comprehensive audit trail for:
- Compliance requirements (SOX, PCI-DSS, HIPAA)
- Security monitoring (failed login attempts, unauthorized access)
- Forensic investigation (who changed what and when)
- Change history tracking (old_values vs new_values)

**Actions Logged**:
- `CREATE` - Resource creation (namespace, deployment, pod, etc.)
- `READ` - Resource access (view details, list resources)
- `UPDATE` - Resource modification (scale deployment, update image)
- `DELETE` - Resource deletion (delete namespace, delete pod)
- `EXEC` - Terminal/exec access
- `LOGS` - Log viewing
- `LOGIN` - Successful authentication
- `LOGOUT` - User logout
- `AUTH_FAIL` - Failed authentication attempt

---

## Indexes

### Performance Indexes

| Table | Index Name | Columns | Type | Purpose |
|--------|-------------|---------|---------|
| users | idx_users_email | email | UNIQUE | Fast user lookup by email |
| roles | idx_roles_name | name | UNIQUE | Fast role lookup |
| permissions | idx_permissions_type | type | Filter permissions by type |
| permissions | idx_permissions_resource_type | resource_type | Filter permissions by resource type |
| role_permissions | idx_role_permissions_role | role_id | Join optimization |
| role_permissions | idx_role_permissions_permission | permission_id | Join optimization |
| role_permissions | uk_role_permission | role_id, permission_id | Unique constraint |
| user_roles | idx_user_roles_user | user_id | Query user's role assignments |
| user_roles | idx_user_roles_role | role_id | Query roles by role |
| user_roles | idx_user_roles_namespace | namespace | Namespace-based filtering |
| sessions | idx_session_user_id | user_id | Query user sessions |
| sessions | idx_session_refresh_token | refresh_token | Token refresh lookup |
| sessions | idx_session_access_token | access_token | UNIQUE constraint |
| audit_logs | idx_audit_user_id | user_id | Query user's audit history |
| audit_logs | idx_audit_timestamp | created_at | Time-based queries |
| audit_logs | idx_audit_resource_type | resource_type | Filter by resource type |

---

## Migration Strategy

### Liquibase Migrations

All database schema changes are managed through Liquibase with numbered changelog files.

**Migration Path**: `src/main/resources/db/changelog`

**Naming Convention**: `v{major}.{minor}.{patch}_{description}.xml`

**Example**: `v1.0.0_create_users_table.xml`

### Migration Rollback

Rollback support is implemented via Liquibase rollback capability. Each migration can be rolled back individually.

**Rollback Command**:
```bash
cd apps/backend
./gradlew rollback -Dliquibase.rollbackCount=1
```

---

## Data Retention Policy

### Audit Logs

**Retention Period**: 1 year (365 days)

**Rationale**: Compliance requirements typically require 1-year audit trail retention.

**Cleanup Strategy**:
- Scheduled job runs daily at 2:00 AM UTC
- Deletes audit logs older than 365 days
- Cannot be manually deleted if referenced by open investigations

**Implementation**:
- Database trigger or application-level scheduled task
- Soft delete with archival option for extended retention

---

### Sessions

**Retention Period**: 30 days (default, configurable)

**Cleanup Strategy**:
- Expired sessions are cleaned up on every session validation check
- Inactive sessions (timeout exceeded) are marked for cleanup

**Purpose**: 
- Security: Remove stale sessions to prevent session hijacking
- Storage: Manage database size by removing expired entries

---

## RBAC Model

### Role Hierarchy

```
ADMIN (Cluster-wide access)
├── All Permissions (READ, WRITE, DELETE, EXEC, LOGS)
├── Applies to all namespaces
└── Cannot be restricted by deny policies

DEVELOPER (Namespace access)
├── READ + WRITE + EXEC + LOGS permissions
├── Namespace-scoped (must be assigned to specific namespace)
└── Cannot delete production namespace (explicit deny policy may apply)

VIEWER (Read-only access)
├── READ + LOGS permissions only
├── Namespace-scoped
└── Cannot modify any resources

Custom Roles
├── Flexible permission combinations
├── Namespace-scoped
└── Can have deny policies applied
```

### Permission Matrix

| Resource Type | READ | WRITE | DELETE | EXEC | LOGS |
|---------------|-------|-------|--------|------|------|
| NAMESPACE | ✓ | ✓ | ✓ | ✗ | ✗ |
| POD | ✓ | ✓ | ✓ | ✓ | ✓ |
| DEPLOYMENT | ✓ | ✓ | ✓ | ✗ | ✗ |
| STATEFULSET | ✓ | ✓ | ✓ | ✗ | ✗ |
| DAEMONSET | ✓ | ✓ | ✓ | ✗ | ✗ |
| SERVICE | ✓ | ✓ | ✓ | ✗ | ✗ |
| CONFIGMAP | ✓ | ✓ | ✓ | ✗ | ✗ |
| SECRET | ✓ | ✓ | ✓ | ✗ | ✗ |
| ALL | ✓ | ✓ | ✓ | ✓ | ✓ |

**Legend**:
- ✓ = Allowed by default role
- ✗ = Not allowed by default role

---

## Security Considerations

### Sensitive Data

**Access Tokens**:
- Stored in `sessions.access_token` column (VARCHAR 500)
- Never logged or exposed in error messages
- Revoked immediately on logout

**Secrets in Database**:
- The database only stores references to K8s secrets, not actual secret values
- Secret values are only stored in Kubernetes cluster

**PII (Personally Identifiable Information)**:
- Email in `users.email` column - Used for OAuth2 authentication
- IP address and user agent in audit logs for security monitoring

### Data Encryption

**At Rest**: 
- PostgreSQL database encryption (TDE) for sensitive fields (recommended)
- SSL/TLS for database connections

**In Transit**:
- All database connections over SSL/TLS
- API calls over HTTPS

### SQL Injection Prevention

**Parameterized Queries**: All database access through JPA/Hibernate prevents SQL injection

**Input Validation**:
- All user inputs validated before database operations
- Application-level sanitization of user-provided data

---

## Query Patterns

### Common Queries

#### User Authentication

```sql
SELECT u.*, r.name as role_name, ur.namespace 
FROM users u
LEFT JOIN user_roles ur ON u.id = ur.user_id
LEFT JOIN roles r ON ur.role_id = r.id
WHERE u.email = ?;
```

#### Get User Permissions

```sql
SELECT p.type, p.resource_type
FROM permissions p
JOIN role_permissions rp ON p.id = rp.permission_id
JOIN roles r ON rp.role_id = r.id
JOIN user_roles ur ON r.id = ur.role_id
WHERE ur.user_id = ?
  AND (ur.namespace = ? OR ur.namespace IS NULL);
```

#### Audit Log Query

```sql
SELECT al.*, u.email as user_email
FROM audit_logs al
JOIN users u ON al.user_id = u.id
WHERE al.created_at BETWEEN ? AND ?
ORDER BY al.created_at DESC
LIMIT ?;
```

#### Session Cleanup

```sql
DELETE FROM sessions
WHERE expires_at < NOW() 
  OR (last_activity_at < NOW() - INTERVAL '30 minutes');
```

---

## Performance Considerations

### Connection Pooling

- **Maximum Connections**: 100 (configurable in `application.properties`)
- **Connection Timeout**: 30 seconds
- **Idle Timeout**: 10 minutes

### Batch Operations

- Audit log writes batched for performance
- Session cleanup runs in background job

### Indexing Strategy

- All foreign keys indexed
- All frequently queried columns indexed
- Composite indexes for multi-column queries (user_roles namespace scoping)

---

## Backup and Recovery

### Database Backup Strategy

**Full Backups**: Daily at 3:00 AM UTC
**Incremental Backups**: Hourly
**Retention**: 30 days for daily backups, 7 days for incremental

### Disaster Recovery

1. **Point-in-Time Recovery**: WAL (Write-Ahead Logging) enabled
2. **Standby Server**: Optional for HA deployments
3. **Failover**: Manual or automatic with database promotion

### Backup Storage

- **Primary**: Local SSD storage (RAID 10)
- **Secondary**: Cloud storage (S3, GCS) for offsite backups
- **Encryption**: AES-256 at rest

---

## Troubleshooting

### Common Issues

#### Connection Timeout

**Symptom**: `org.postgresql.util.PSQLException: Connection attempt failed`

**Solution**: 
1. Check PostgreSQL service is running: `systemctl status postgresql`
2. Verify connection pool settings in `application.properties`
3. Check firewall rules allow database port (5432)

#### Lock Timeout

**Symptom**: `org.springframework.dao.QueryTimeoutException: could not extract ResultSet`

**Solution**:
1. Check for long-running transactions
2. Review slow query logs: `SELECT * FROM pg_stat_statements ORDER BY total_exec_time DESC LIMIT 10`
3. Add indexes to optimize slow queries
4. Increase `spring.jpa.properties.hibernate.jdbc.time_limit`

#### Constraint Violation

**Symptom**: `org.springframework.dao.DataIntegrityViolationException: could not execute statement`

**Solution**:
1. Check `uniqueConstraints` in entity annotations
2. Verify application handles duplicate key errors gracefully
3. Review RBAC unique constraints (user_roles namespace uniqueness)

#### Migration Failure

**Symptom**: Liquibase migration fails with checksum mismatch

**Solution**:
1. Verify no manual changes made to database
2. Check if correct changelog file is being used
3. Use `--force` flag to bypass checksum validation (if safe)
4. Review rollback strategy in `ROLLBACK_STRATEGY.md`

---

## Maintenance Operations

### Regular Maintenance

#### Vacuum and Analyze

**Frequency**: Weekly (Sunday at 3:00 AM UTC)

**Commands**:
```sql
VACUUM ANALYZE;
VACUUM FULL;
REINDEX DATABASE;
```

**Purpose**:
- Recover disk space from dead tuples
- Update query planner statistics
- Rebuild indexes for optimal performance

#### Statistics Collection

**Frequency**: Daily

**Metrics to Collect**:
- Table sizes: `SELECT * FROM pg_tables ORDER BY pg_total_relation_size DESC`
- Index usage: `SELECT * FROM pg_stat_user_tables ORDER BY idx_scan DESC`
- Bloat analysis: `SELECT * FROM pg_stat_progress`

---

## Monitoring and Alerting

### Database Metrics to Monitor

| Metric | Target | Threshold | Alert |
|---------|--------|-----------|-------|
| Active Connections | < 80 | Warning |
| Idle Connections | > 20 | Info |
| Long-running Queries | > 5 seconds | Warning |
| Deadlocks | > 0 | Critical |
| Cache Hit Ratio | < 0.9 | Warning |
| Transaction Rollbacks | > 10/hour | Critical |

### Health Checks

**Liveness Probe**:
```bash
pg_isready()
```

**Readiness Probe**:
```bash
-- Check all tables are accessible
SELECT COUNT(*) FROM pg_tables WHERE schemaname = 'public';
```

---

## Schema Version History

### Version 1.0.0 (2024-01-15)

**Initial Release**:
- Complete database schema for K8s Manager
- All core tables: users, roles, permissions, role_permissions, user_roles, sessions, audit_logs
- Full index coverage for performance
- Comprehensive RBAC model
- Audit logging capabilities

---

## Appendix A: SQL Scripts

### Create Database

```sql
CREATE DATABASE k8s_manager
    WITH OWNER = k8s_manager
    ENCODING = 'UTF8'
    LC_COLLATE = 'en_US.UTF-8'
    LC_CTYPE = 'en_US.UTF-8';
```

### Grant Privileges

```sql
GRANT ALL PRIVILEGES ON DATABASE k8s_manager TO k8s_manager;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO k8s_manager;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO k8s_manager;
```

---

## Appendix B: Configuration

### application.properties (Database Section)

```properties
# Database Configuration
spring.datasource.url=jdbc:postgresql://localhost:5432/k8s_manager
spring.datasource.username=k8s_manager
spring.datasource.password=${DB_PASSWORD}
spring.datasource.driver-class-name=org.postgresql.Driver

# Connection Pool
spring.datasource.hikari.maximum-pool-size=100
spring.datasource.hikari.minimum-idle=10
spring.datasource.hikari.idle-timeout=600000
spring.datasource.hikari.connection-timeout=30000

# JPA/Hibernate
spring.jpa.database-platform=org.hibernate.dialect.PostgreSQLDialect
spring.jpa.hibernate.ddl-auto=validate
spring.jpa.hibernate.show-sql=false
spring.jpa.open-in-view=true
spring.jpa.properties.hibernate.jdbc.batch_size=50
spring.jpa.properties.hibernate.order_inserts=true
spring.jpa.properties.hibernate.order_updates=true

# Liquibase
spring.liquibase.enabled=true
spring.liquibase.change-log=src/main/resources/db/changelog/changelog.xml
spring.liquibase.contexts=public

# Session Management
spring.session.timeout=1800
spring.session.store-type=memory

# Cache
spring.cache.type=simple
spring.jpa.cache.use_second_level_cache=true
```

---

*Last Updated: 2024-01-15*
