- Added Flyway dependency/version 10.0.0 and enabled Flyway baseline migration settings in application.properties to enforce SQL-first schema evolution.
- Established V1 baseline migration at apps/backend/src/main/resources/db/migration/V1__baseline_schema.sql aligned with current RBAC/user/session/audit JPA entities, including FK constraints and entity-defined indexes/uniques.

- Added persistent `Alert` entity + Flyway `V2__create_alerts_table.sql` with indexed `severity`, `namespace`, `created_at`, and `acknowledged` to support queryable history across service restarts.
- Introduced dedicated alert APIs under `/alerts` and kept backward compatibility by delegating `/metrics/alerts/*` endpoints to `AlertService`.
- Chose paginated history response shape (`AlertListResponseDTO`) so frontend filters (`namespace`, `severity`, `acknowledged`) and page controls map directly to backend query semantics.
- Implemented acknowledgment write path in `AlertService` to persist actor + timestamp (`acknowledgedBy`, `acknowledgedAt`) while preserving existing `AlertDTO` payload compatibility.

- Extended roles schema with role_key, is_custom, and display_name; made enum name nullable for custom roles; and backfilled preset compatibility via V3__extend_roles_for_custom_roles.sql with case-insensitive unique indexes.
- Added dedicated admin role CRUD flow (RoleController plus RoleService) while keeping assignment endpoints in RoleManagementController as thin delegates for idempotent assign/revoke with audit log writes.
- Standardized role authorities on roleKey through Role.getAuthorityName() to preserve preset behavior and avoid null enum usage for mixed preset/custom assignments in user profile responses.
- Implemented frontend admin role management (src/api/role.ts, RoleList, RoleEditor) with preset/custom grouping, immutable preset UX, permission matrix selection, and namespace-scoped grant submission wired to /api/v1/admin/roles routes.

- Added dedicated `permission_rules` model (entity/repository/Flyway V4) to support explicit `ALLOW`/`DENY` policy overlays on role permissions with optional namespace and resource-name pattern selectors.
- Implemented deny-overrides evaluation in `RbacService.hasPermission(..., namespace)` by resolving effective user grants first, then short-circuiting on matching `DENY` rules before checking `ALLOW`, preserving backward-compatible global checks.
- Centralized permission-rule CRUD in `RbacService` (called by `RoleManagementController`) so cache invalidation (`@CacheEvict(allEntries=true)`) and RBAC audit writes (`PERMISSION_RULE_*`) happen atomically on create/update/delete.
