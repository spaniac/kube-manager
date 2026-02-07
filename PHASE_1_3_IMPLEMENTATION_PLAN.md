# K8s Manager Phase 1-3 Detailed Implementation Plan

This document turns `IMPLEMENTATION_GAP_ANALYSIS.md` into an execution-ready plan for Weeks 1-12.

## Planning Assumptions

- API base path stays `server.servlet.context-path=/api/v1`; controller mappings remain path-relative (for example `@RequestMapping("/alerts")` => `/api/v1/alerts`).
- Backend keeps existing patterns: Controller -> Service -> Repository, DTOs in `com.k8smanager.dto`, `ApiResponse<T>` wrapper, `@PreAuthorize` on all new endpoints.
- Frontend keeps existing patterns: page components in `src/pages`, reusable UI in `src/components`, typed API clients in `src/api`, shared types in `src/types/api.ts` + `src/types/schemas.ts`.
- Flyway is introduced in Week 1. All schema changes below are listed with migration files under `apps/backend/src/main/resources/db/migration/`.

---

## Phase 1: Foundation & Critical Features (Weeks 1-4)

### Week 1: Alert Persistence & Real Metrics

#### 1) Weekly Objectives

- Replace in-memory/mock alert behavior with persistent database-backed alerts.
- Replace simulated network/history metrics with Prometheus query-backed metrics.
- Add production-safe migration pipeline (Flyway) to support all subsequent weeks.

**Success Criteria**
- Alert create/list/acknowledge flows survive service restarts.
- `MonitoringService.getNetworkMetrics()` and `getHistoricalMetrics()` return Prometheus-based values for valid resources.
- Flyway executes successfully on startup in local/dev environments.

#### 2) Task Breakdown

##### Task 1: Introduce Flyway Migration Baseline

**Task Description**: Add Flyway dependency/configuration and baseline migration structure so all new schema changes use versioned SQL scripts.

**Files to Create**:
- `/Users/bagsejun/workspace/kube-manager/apps/backend/src/main/resources/db/migration/V1__baseline_schema.sql`

**Files to Modify**:
- `/Users/bagsejun/workspace/kube-manager/apps/backend/build.gradle`
  - Add `org.flywaydb:flyway-core` dependency.
- `/Users/bagsejun/workspace/kube-manager/apps/backend/src/main/resources/application.properties`
  - Add Flyway configuration (`spring.flyway.enabled`, `spring.flyway.locations`, baseline options).

**Database Changes**:
- Create baseline migration with current RBAC/user/session/audit tables that match existing JPA entities.

**API Endpoints**:
- None.

**Frontend Components**:
- None.

**Acceptance Criteria**:
- Backend starts with Flyway enabled and migration history table present.
- `V1__baseline_schema.sql` executes cleanly in a fresh PostgreSQL database.

##### Task 2: Alert Persistence Domain + APIs

**Task Description**: Introduce persistent alert model and dedicated alert APIs; refactor monitoring alert methods to use persistence.

**Files to Create**:
- `/Users/bagsejun/workspace/kube-manager/apps/backend/src/main/java/com/k8smanager/persistence/entity/Alert.java`
- `/Users/bagsejun/workspace/kube-manager/apps/backend/src/main/java/com/k8smanager/persistence/repository/AlertRepository.java`
- `/Users/bagsejun/workspace/kube-manager/apps/backend/src/main/java/com/k8smanager/dto/AlertAcknowledgeRequestDTO.java`
- `/Users/bagsejun/workspace/kube-manager/apps/backend/src/main/java/com/k8smanager/dto/AlertListResponseDTO.java`
- `/Users/bagsejun/workspace/kube-manager/apps/backend/src/main/java/com/k8smanager/service/AlertService.java`
- `/Users/bagsejun/workspace/kube-manager/apps/backend/src/main/java/com/k8smanager/controller/AlertController.java`
- `/Users/bagsejun/workspace/kube-manager/apps/backend/src/main/resources/db/migration/V2__create_alerts_table.sql`
- `/Users/bagsejun/workspace/kube-manager/apps/frontend/src/api/alert.ts`
- `/Users/bagsejun/workspace/kube-manager/apps/frontend/src/pages/AlertHistory.tsx`
- `/Users/bagsejun/workspace/kube-manager/apps/frontend/src/components/alerts/AlertListTable.tsx`
- `/Users/bagsejun/workspace/kube-manager/apps/frontend/src/components/alerts/AlertSeverityBadge.tsx`

**Files to Modify**:
- `/Users/bagsejun/workspace/kube-manager/apps/backend/src/main/java/com/k8smanager/service/MonitoringService.java`
  - Replace `getAlertHistory()` and `acknowledgeAlert()` stub logic with `AlertService` calls.
- `/Users/bagsejun/workspace/kube-manager/apps/backend/src/main/java/com/k8smanager/controller/MonitoringController.java`
  - Keep backward-compatible `/metrics/alerts/*` endpoints delegating to `AlertService`.
- `/Users/bagsejun/workspace/kube-manager/apps/frontend/src/router.tsx`
  - Add route for alert history page.
- `/Users/bagsejun/workspace/kube-manager/apps/frontend/src/types/api.ts`
  - Add `Alert` fields for `acknowledged`, `acknowledgedAt`, `acknowledgedBy`.

**Database Changes**:
- `alerts` table with indexes for severity, namespace, created_at, acknowledged.

**API Endpoints**:
- `GET /api/v1/alerts`
- `GET /api/v1/alerts/{id}`
- `GET /api/v1/alerts/history?namespace={ns}&severity={level}&acknowledged={bool}&page={n}&size={n}`
- `PATCH /api/v1/alerts/{id}/acknowledge`
- `DELETE /api/v1/alerts/{id}`

**Frontend Components**:
- Alert history page with filter bar, pagination, acknowledge action.
- Reusable severity/status badges aligned with existing `Badge` component style.

**Acceptance Criteria**:
- Alerts are queryable after backend restart.
- Acknowledge operation updates persisted record with actor and timestamp.
- API responses use `ApiResponse<T>` wrapper and enforce RBAC.

##### Task 3: Real Prometheus Metrics for Network + Historical Data

**Task Description**: Replace synthetic metrics generation with PromQL-backed queries and robust error handling.

**Files to Create**:
- `/Users/bagsejun/workspace/kube-manager/apps/backend/src/main/java/com/k8smanager/dto/PrometheusQueryTemplateDTO.java`
- `/Users/bagsejun/workspace/kube-manager/apps/backend/src/main/java/com/k8smanager/service/PrometheusQueryService.java`
- `/Users/bagsejun/workspace/kube-manager/apps/frontend/src/api/metrics.ts`
- `/Users/bagsejun/workspace/kube-manager/apps/frontend/src/pages/ClusterMetricsHistory.tsx` (if refactored into smart/dumb split, add helper component)

**Files to Modify**:
- `/Users/bagsejun/workspace/kube-manager/apps/backend/src/main/java/com/k8smanager/service/MonitoringService.java`
  - Replace fixed zeros/random values in `getNetworkMetrics()` and `getHistoricalMetrics()` with PromQL.
  - Reuse `executePromQLQuery()` parsing and add query templates for cpu/memory/network/storage.
- `/Users/bagsejun/workspace/kube-manager/apps/backend/src/main/java/com/k8smanager/service/ClusterService.java`
  - Replace simulated history with real Prometheus-backed series.
- `/Users/bagsejun/workspace/kube-manager/apps/backend/src/main/java/com/k8smanager/controller/MonitoringController.java`
  - Return meaningful HTTP 502/503 when Prometheus unavailable.

**Database Changes**:
- None.

**API Endpoints**:
- Existing endpoints improved:
  - `GET /api/v1/metrics/network/{namespace}/{name}`
  - `GET /api/v1/metrics/history/{namespace}/{name}`
  - `POST /api/v1/metrics/promql/query`

**Frontend Components**:
- Update metrics views to surface backend unavailability and query latency.

**Acceptance Criteria**:
- Network RX/TX values are non-stub for active pods.
- Historical charts reflect selected range/step and do not use random generators.
- Prometheus outage shows actionable error state in UI.

#### 3) Technical Considerations

- **Dependencies**: Flyway baseline must land before `alerts` migration.
- **Blockers**: Prometheus label schema differences (`pod`, `namespace`, `container`) across environments.
- **External configuration**: Confirm `PROMETHEUS_URL` and network path from backend pod/service.

#### 4) Testing Requirements

- **Unit tests**:
  - `AlertServiceTest` (create/filter/acknowledge/delete).
  - `PrometheusQueryServiceTest` (query template rendering, parser edge cases).
- **Integration tests**:
  - `AlertControllerTest` with repository + DB.
  - `MonitoringControllerTest` with mocked Prometheus responses and timeout failures.
- **E2E tests**:
  - `/apps/frontend/e2e/alerts.spec.ts` for list/filter/acknowledge flow.
  - `/apps/frontend/e2e/metrics-history.spec.ts` for chart rendering and error fallback.

---

### Week 2: RBAC Enhancements (Custom Roles + Namespace Scope)

#### 1) Weekly Objectives

- Add true custom role CRUD and assignment flows.
- Add namespace-scoped permission evaluation with explicit deny precedence.
- Add RBAC audit trails for role/permission mutations.

**Success Criteria**
- Admin can create/edit/delete custom roles from UI.
- Permission checks correctly allow/deny by namespace.
- Role changes are traceable in `audit_logs` with actor and target metadata.

#### 2) Task Breakdown

##### Task 1: Custom Role Model and Management APIs

**Task Description**: Extend role schema from enum-only constraints to support named custom roles while preserving preset roles.

**Files to Create**:
- `/Users/bagsejun/workspace/kube-manager/apps/backend/src/main/java/com/k8smanager/dto/RoleCreateRequestDTO.java`
- `/Users/bagsejun/workspace/kube-manager/apps/backend/src/main/java/com/k8smanager/dto/RoleUpdateRequestDTO.java`
- `/Users/bagsejun/workspace/kube-manager/apps/backend/src/main/java/com/k8smanager/dto/RoleDetailDTO.java`
- `/Users/bagsejun/workspace/kube-manager/apps/backend/src/main/java/com/k8smanager/service/RoleService.java`
- `/Users/bagsejun/workspace/kube-manager/apps/backend/src/main/java/com/k8smanager/controller/RoleController.java`
- `/Users/bagsejun/workspace/kube-manager/apps/backend/src/main/resources/db/migration/V3__extend_roles_for_custom_roles.sql`
- `/Users/bagsejun/workspace/kube-manager/apps/frontend/src/api/role.ts`
- `/Users/bagsejun/workspace/kube-manager/apps/frontend/src/pages/RoleList.tsx`
- `/Users/bagsejun/workspace/kube-manager/apps/frontend/src/pages/RoleEditor.tsx`

**Files to Modify**:
- `/Users/bagsejun/workspace/kube-manager/apps/backend/src/main/java/com/k8smanager/persistence/entity/Role.java`
  - Add `roleKey` (string), `isCustom`, `displayName`; keep preset compatibility.
- `/Users/bagsejun/workspace/kube-manager/apps/backend/src/main/java/com/k8smanager/persistence/repository/RoleRepository.java`
  - Add finders by key/name/custom flag.
- `/Users/bagsejun/workspace/kube-manager/apps/backend/src/main/java/com/k8smanager/controller/RoleManagementController.java`
  - Delegate assignment/revocation to `RoleService`.
- `/Users/bagsejun/workspace/kube-manager/apps/frontend/src/router.tsx`
  - Add admin role routes.

**Database Changes**:
- Alter `roles` table to add `role_key`, `is_custom`, `display_name`, uniqueness constraints.

**API Endpoints**:
- `GET /api/v1/admin/roles`
- `POST /api/v1/admin/roles`
- `GET /api/v1/admin/roles/{roleId}`
- `PUT /api/v1/admin/roles/{roleId}`
- `DELETE /api/v1/admin/roles/{roleId}`
- `POST /api/v1/admin/roles/{roleId}/assign`
- `DELETE /api/v1/admin/roles/{roleId}/assign`

**Frontend Components**:
- Role listing with preset/custom grouping.
- Role editor with permission matrix and namespace selector.

**Acceptance Criteria**:
- Custom roles can be created with arbitrary permission sets.
- Preset roles remain immutable.
- Assignment/revocation behavior is idempotent and audited.

##### Task 2: Namespace-Scoped Permissions + Deny Policies

**Task Description**: Add allow/deny policies at namespace level and enforce deny-overrides-allow evaluation.

**Files to Create**:
- `/Users/bagsejun/workspace/kube-manager/apps/backend/src/main/java/com/k8smanager/dto/PermissionRuleDTO.java`
- `/Users/bagsejun/workspace/kube-manager/apps/backend/src/main/java/com/k8smanager/persistence/entity/PermissionRule.java`
- `/Users/bagsejun/workspace/kube-manager/apps/backend/src/main/java/com/k8smanager/persistence/repository/PermissionRuleRepository.java`
- `/Users/bagsejun/workspace/kube-manager/apps/backend/src/main/resources/db/migration/V4__add_namespace_scoped_permission_rules.sql`
- `/Users/bagsejun/workspace/kube-manager/apps/frontend/src/components/rbac/NamespacePermissionMatrix.tsx`

**Files to Modify**:
- `/Users/bagsejun/workspace/kube-manager/apps/backend/src/main/java/com/k8smanager/rbac/RbacService.java`
  - Add `hasPermission(permissionType, resourceType, namespace)` overload with deny precedence.
- `/Users/bagsejun/workspace/kube-manager/apps/backend/src/main/java/com/k8smanager/rbac/RbacPermissionEvaluator.java`
  - Wire namespace-aware evaluation.
- `/Users/bagsejun/workspace/kube-manager/apps/backend/src/main/java/com/k8smanager/persistence/entity/Permission.java`
  - Add optional namespace scope reference (or normalize through `PermissionRule`).
- `/Users/bagsejun/workspace/kube-manager/apps/backend/src/main/java/com/k8smanager/config/SecurityConfig.java`
  - Register expression support for namespace checks.

**Database Changes**:
- New `permission_rules` table (`role_id`, `permission_id`, `namespace`, `effect`, `resource_name_pattern`).

**API Endpoints**:
- `POST /api/v1/admin/roles/{roleId}/rules`
- `PUT /api/v1/admin/roles/{roleId}/rules/{ruleId}`
- `DELETE /api/v1/admin/roles/{roleId}/rules/{ruleId}`
- `GET /api/v1/admin/roles/{roleId}/rules`

**Frontend Components**:
- Namespace permission rule builder (Allow/Deny, namespace, resource selectors).

**Acceptance Criteria**:
- Explicit deny in namespace blocks operations even with global allow.
- Namespace-specific allow works when global permission absent.
- Caching invalidates correctly on rule updates.

##### Task 3: RBAC Audit Logging + Admin Visibility

**Task Description**: Emit structured RBAC audit events and show searchable history in admin UI.

**Files to Create**:
- `/Users/bagsejun/workspace/kube-manager/apps/backend/src/main/java/com/k8smanager/dto/RbacAuditEventDTO.java`
- `/Users/bagsejun/workspace/kube-manager/apps/backend/src/main/java/com/k8smanager/service/RbacAuditService.java`
- `/Users/bagsejun/workspace/kube-manager/apps/frontend/src/api/rbacAudit.ts`
- `/Users/bagsejun/workspace/kube-manager/apps/frontend/src/pages/RbacAuditLog.tsx`

**Files to Modify**:
- `/Users/bagsejun/workspace/kube-manager/apps/backend/src/main/java/com/k8smanager/aspect/AuditLogAspect.java`
  - Add RBAC-specific event metadata extraction.
- `/Users/bagsejun/workspace/kube-manager/apps/backend/src/main/java/com/k8smanager/controller/UserController.java`
  - Optionally expose current-user RBAC activity slice.

**Database Changes**:
- Optional migration `V5__add_rbac_audit_columns.sql` to extend `audit_logs` with `category`, `target_type`, `target_id`, `before_data`, `after_data`.

**API Endpoints**:
- `GET /api/v1/admin/rbac/audit?actor={email}&action={type}&from={ts}&to={ts}`

**Frontend Components**:
- RBAC audit table with filters, JSON diff drawer for before/after role permissions.

**Acceptance Criteria**:
- All role CRUD/assignment/rule changes produce audit events.
- Admin can filter RBAC audit log by actor/date/action.

#### 3) Technical Considerations

- **Dependencies**: Task 1 schema/model should precede namespace rule engine.
- **Blockers**: Existing enum-based role assumptions in code/tests require coordinated refactor.
- **External configuration**: None beyond database migration rollout sequencing.

#### 4) Testing Requirements

- **Unit tests**:
  - `RoleServiceTest` (preset protection, custom role CRUD).
  - `RbacServiceTest` extended with namespace/deny precedence matrix.
- **Integration tests**:
  - `RoleControllerTest` and `RoleManagementControllerTest` with mock security context.
  - Rule evaluation tests across multiple namespaces.
- **E2E tests**:
  - `/apps/frontend/e2e/rbac-custom-role.spec.ts`.
  - `/apps/frontend/e2e/rbac-namespace-scope.spec.ts`.

---

### Week 3: Dashboard Implementation

#### 1) Weekly Objectives

- Replace placeholder dashboard with persisted, user-specific dashboards.
- Build widget library and layout engine.
- Add RBAC-aware dashboard sharing/visibility controls.

**Success Criteria**
- User can create dashboard, add widgets, save layout, and revisit it.
- Widget data refreshes on configurable interval.
- Shared dashboard access follows role permissions.

#### 2) Task Breakdown

##### Task 1: Dashboard Persistence and CRUD APIs

**Task Description**: Build backend dashboard domain and REST APIs including ownership and sharing model.

**Files to Create**:
- `/Users/bagsejun/workspace/kube-manager/apps/backend/src/main/java/com/k8smanager/persistence/entity/Dashboard.java`
- `/Users/bagsejun/workspace/kube-manager/apps/backend/src/main/java/com/k8smanager/persistence/entity/DashboardWidget.java`
- `/Users/bagsejun/workspace/kube-manager/apps/backend/src/main/java/com/k8smanager/persistence/repository/DashboardRepository.java`
- `/Users/bagsejun/workspace/kube-manager/apps/backend/src/main/java/com/k8smanager/persistence/repository/DashboardWidgetRepository.java`
- `/Users/bagsejun/workspace/kube-manager/apps/backend/src/main/java/com/k8smanager/dto/DashboardDTO.java`
- `/Users/bagsejun/workspace/kube-manager/apps/backend/src/main/java/com/k8smanager/dto/WidgetConfigDTO.java`
- `/Users/bagsejun/workspace/kube-manager/apps/backend/src/main/java/com/k8smanager/service/DashboardService.java`
- `/Users/bagsejun/workspace/kube-manager/apps/backend/src/main/java/com/k8smanager/controller/DashboardController.java`
- `/Users/bagsejun/workspace/kube-manager/apps/backend/src/main/resources/db/migration/V6__create_dashboards_and_widgets.sql`

**Files to Modify**:
- `/Users/bagsejun/workspace/kube-manager/apps/backend/src/main/java/com/k8smanager/persistence/entity/User.java`
  - Add dashboard ownership relation.

**Database Changes**:
- New tables `dashboards`, `dashboard_widgets` with JSONB `config`, layout fields (`x`, `y`, `w`, `h`).

**API Endpoints**:
- `GET /api/v1/dashboards`
- `POST /api/v1/dashboards`
- `GET /api/v1/dashboards/{id}`
- `PUT /api/v1/dashboards/{id}`
- `DELETE /api/v1/dashboards/{id}`
- `POST /api/v1/dashboards/{id}/clone`

**Frontend Components**:
- None in this task (backend foundation only).

**Acceptance Criteria**:
- CRUD APIs persist dashboard metadata and widget layout.
- Authorization enforces owner or admin access.

##### Task 2: Widget Library + Dashboard UI Runtime

**Task Description**: Build frontend widget rendering system with configurable widgets and drag/drop layout.

**Files to Create**:
- `/Users/bagsejun/workspace/kube-manager/apps/frontend/src/api/dashboard.ts`
- `/Users/bagsejun/workspace/kube-manager/apps/frontend/src/pages/DashboardBuilder.tsx`
- `/Users/bagsejun/workspace/kube-manager/apps/frontend/src/components/dashboard/WidgetCanvas.tsx`
- `/Users/bagsejun/workspace/kube-manager/apps/frontend/src/components/dashboard/WidgetLibraryPanel.tsx`
- `/Users/bagsejun/workspace/kube-manager/apps/frontend/src/components/dashboard/widgets/ClusterHealthWidget.tsx`
- `/Users/bagsejun/workspace/kube-manager/apps/frontend/src/components/dashboard/widgets/NamespaceUsageWidget.tsx`
- `/Users/bagsejun/workspace/kube-manager/apps/frontend/src/components/dashboard/widgets/AlertFeedWidget.tsx`
- `/Users/bagsejun/workspace/kube-manager/apps/frontend/src/components/dashboard/widgets/PodStatusWidget.tsx`
- `/Users/bagsejun/workspace/kube-manager/apps/frontend/src/components/dashboard/widgetTypes.ts`

**Files to Modify**:
- `/Users/bagsejun/workspace/kube-manager/apps/frontend/src/pages/Dashboard.tsx`
  - Replace placeholder with persisted dashboard selector and canvas.
- `/Users/bagsejun/workspace/kube-manager/apps/frontend/src/router.tsx`
  - Add `/dashboards/:id` and `/dashboards/:id/edit` routes.
- `/Users/bagsejun/workspace/kube-manager/apps/frontend/package.json`
  - Add `react-grid-layout` (or equivalent) dependency.

**Database Changes**:
- None.

**API Endpoints**:
- Uses Week 3 Task 1 endpoints.

**Frontend Components**:
- Widget library panel, grid canvas, widget config modal.

**Acceptance Criteria**:
- User can add/remove/reposition widgets and persist layout.
- Widget config changes are reflected without full page reload.

##### Task 3: Real-Time Dashboard Refresh + Sharing Controls

**Task Description**: Add live refresh pipeline and sharing permissions (private/team/public link).

**Files to Create**:
- `/Users/bagsejun/workspace/kube-manager/apps/backend/src/main/java/com/k8smanager/dto/DashboardShareRequestDTO.java`
- `/Users/bagsejun/workspace/kube-manager/apps/backend/src/main/java/com/k8smanager/service/DashboardShareService.java`
- `/Users/bagsejun/workspace/kube-manager/apps/backend/src/main/resources/db/migration/V7__add_dashboard_sharing_fields.sql`
- `/Users/bagsejun/workspace/kube-manager/apps/frontend/src/components/dashboard/DashboardShareDialog.tsx`

**Files to Modify**:
- `/Users/bagsejun/workspace/kube-manager/apps/backend/src/main/java/com/k8smanager/controller/DashboardController.java`
  - Add sharing endpoints and refresh interval validation.
- `/Users/bagsejun/workspace/kube-manager/apps/frontend/src/components/dashboard/WidgetCanvas.tsx`
  - Add polling/WebSocket refresh hooks.

**Database Changes**:
- Add `visibility`, `share_token`, `refresh_interval_sec` columns to `dashboards`.

**API Endpoints**:
- `POST /api/v1/dashboards/{id}/share`
- `DELETE /api/v1/dashboards/{id}/share`
- `GET /api/v1/dashboards/shared/{token}`

**Frontend Components**:
- Share dialog with role and link options.

**Acceptance Criteria**:
- Shared dashboards open in read-only mode when link is valid.
- Widget refresh interval configurable per widget and persisted.

#### 3) Technical Considerations

- **Dependencies**: Data model/API must be stable before complex widget builder UX.
- **Blockers**: Grid layout library compatibility with existing CSS and responsive behavior.
- **External configuration**: Optional WebSocket channel for lower-latency updates.

#### 4) Testing Requirements

- **Unit tests**:
  - `DashboardServiceTest` and widget config validator tests.
- **Integration tests**:
  - `DashboardControllerTest` for CRUD/share authorization matrix.
- **E2E tests**:
  - `/apps/frontend/e2e/dashboard-builder.spec.ts` (create/add widget/save/reload).
  - `/apps/frontend/e2e/dashboard-sharing.spec.ts` (link permissions).

---

### Week 4: YAML Editor Enhancements

#### 1) Weekly Objectives

- Complete YAML validation (syntax + Kubernetes schema).
- Implement secret encode/decode workflow for `Secret` manifests.
- Finish missing editor operations (diff/format/undo-redo integration).

**Success Criteria**
- Invalid YAML/schema issues are highlighted with line-level diagnostics.
- Secret values can be encoded/decoded safely with masking and warnings.
- Format/diff/undo-redo actions are fully functional.

#### 2) Task Breakdown

##### Task 1: YAML Syntax and K8s Schema Validation Engine

**Task Description**: Replace stubbed validation/completion in `YamlEditor.tsx` with working syntax and schema checks.

**Files to Create**:
- `/Users/bagsejun/workspace/kube-manager/apps/frontend/src/utils/yamlValidation.ts`
- `/Users/bagsejun/workspace/kube-manager/apps/frontend/src/utils/k8sSchemaRegistry.ts`
- `/Users/bagsejun/workspace/kube-manager/apps/frontend/src/api/yaml.ts`
- `/Users/bagsejun/workspace/kube-manager/apps/backend/src/main/java/com/k8smanager/dto/YamlValidationRequestDTO.java`
- `/Users/bagsejun/workspace/kube-manager/apps/backend/src/main/java/com/k8smanager/dto/YamlValidationResponseDTO.java`

**Files to Modify**:
- `/Users/bagsejun/workspace/kube-manager/apps/frontend/src/components/YamlEditor.tsx`
  - Implement `getCompletionSuggestions`, validation diagnostics, keyboard shortcuts.
- `/Users/bagsejun/workspace/kube-manager/apps/backend/src/main/java/com/k8smanager/controller/PodYamlController.java`
  - Add validation endpoint.
- `/Users/bagsejun/workspace/kube-manager/apps/backend/src/main/java/com/k8smanager/service/PodYamlService.java`
  - Add schema validation orchestration.
- `/Users/bagsejun/workspace/kube-manager/apps/frontend/package.json`
  - Add `yaml`, `monaco-yaml` (or equivalent) dependency.

**Database Changes**:
- None.

**API Endpoints**:
- `POST /api/v1/yaml/validate`
- `GET /api/v1/yaml/schemas`

**Frontend Components**:
- Validation panel with errors/warnings grouped by severity and line.

**Acceptance Criteria**:
- Parser catches malformed YAML before submit.
- Schema validation catches unknown required fields for common K8s kinds.

##### Task 2: Secret Encoding/Decoding Workflow

**Task Description**: Add Secret-specific encode/decode tooling and unsafe-save checks.

**Files to Create**:
- `/Users/bagsejun/workspace/kube-manager/apps/frontend/src/utils/secretCodec.ts`
- `/Users/bagsejun/workspace/kube-manager/apps/frontend/src/components/yaml/SecretDataPanel.tsx`
- `/Users/bagsejun/workspace/kube-manager/apps/backend/src/main/java/com/k8smanager/dto/SecretTransformRequestDTO.java`
- `/Users/bagsejun/workspace/kube-manager/apps/backend/src/main/java/com/k8smanager/dto/SecretTransformResponseDTO.java`

**Files to Modify**:
- `/Users/bagsejun/workspace/kube-manager/apps/frontend/src/components/YamlEditor.tsx`
  - Detect `kind: Secret`, expose encode/decode controls, masking toggle.
- `/Users/bagsejun/workspace/kube-manager/apps/backend/src/main/java/com/k8smanager/controller/PodYamlController.java`
  - Add helper endpoint for server-side transformation if needed.

**Database Changes**:
- None.

**API Endpoints**:
- `POST /api/v1/yaml/secrets/transform` (optional backend assist)

**Frontend Components**:
- Secret panel showing key/value table, encoded state, mask toggle.

**Acceptance Criteria**:
- `stringData` to `data` conversion is accurate Base64.
- Warning shown when raw secret values remain unencoded at save time.

##### Task 3: Diff/Format/History Completion for Editor

**Task Description**: Implement currently empty editor actions for diff, formatting, minify, undo/redo.

**Files to Create**:
- `/Users/bagsejun/workspace/kube-manager/apps/frontend/src/utils/yamlDiff.ts`
- `/Users/bagsejun/workspace/kube-manager/apps/frontend/src/utils/yamlFormat.ts`

**Files to Modify**:
- `/Users/bagsejun/workspace/kube-manager/apps/frontend/src/components/YamlEditor.tsx`
  - Implement `calculateDiff`, `handleFormat`, `handleBeautify`, `handleMinify`, `handleUndo`, `handleRedo`.
- `/Users/bagsejun/workspace/kube-manager/apps/frontend/src/components/YamlEditor.module.css`
  - Add visual styles for inline diff state.

**Database Changes**:
- None.

**API Endpoints**:
- None.

**Frontend Components**:
- Diff mode with changed line counts and clear add/remove markers.

**Acceptance Criteria**:
- Format/minify actions are deterministic.
- Diff mode shows accurate changed lines between original/current.
- Undo/redo stack works with keyboard shortcuts and toolbar buttons.

#### 3) Technical Considerations

- **Dependencies**: Task 1 validation pipeline should exist before Task 2 save warnings.
- **Blockers**: Monaco YAML integration can conflict with custom completion provider.
- **External configuration**: None.

#### 4) Testing Requirements

- **Unit tests**:
  - `yamlValidation.test.ts`, `secretCodec.test.ts`, `yamlDiff.test.ts`.
  - Backend `PodYamlServiceTest` validation branch coverage.
- **Integration tests**:
  - `PodYamlControllerTest` for validation + transform endpoints.
- **E2E tests**:
  - `/apps/frontend/e2e/yaml-editor-validation.spec.ts`.
  - `/apps/frontend/e2e/yaml-editor-secret-encoding.spec.ts`.

---

## Phase 2: High Value Features (Weeks 5-8)

### Week 5: Pod Enhancements (Events, Related Resources, Metrics UX)

#### 1) Weekly Objectives

- Deliver full pod events timeline in pod detail workflow.
- Improve related-resources experience (owner graph + quick navigation).
- Embed real pod metrics panel for CPU/memory/network diagnostics.

**Success Criteria**
- Pod details page exposes events, related resources, and metrics tabs.
- Events and related APIs return stable, typed payloads.
- User can navigate from pod to owning workload/service in one click.

#### 2) Task Breakdown

##### Task 1: Pod Events API and UI Timeline

**Task Description**: Harden pod events retrieval and present it as timeline/table with filters.

**Files to Create**:
- `/Users/bagsejun/workspace/kube-manager/apps/frontend/src/components/pod/PodEventsPanel.tsx`
- `/Users/bagsejun/workspace/kube-manager/apps/frontend/src/api/event.ts`

**Files to Modify**:
- `/Users/bagsejun/workspace/kube-manager/apps/backend/src/main/java/com/k8smanager/service/EventService.java`
  - Add pagination/sort/filter support for pod events.
- `/Users/bagsejun/workspace/kube-manager/apps/backend/src/main/java/com/k8smanager/controller/PodController.java`
  - Add query params `type`, `reason`, `limit` for `/events`.
- `/Users/bagsejun/workspace/kube-manager/apps/frontend/src/pages/PodDetails.tsx`
  - Add events tab and filter controls.

**Database Changes**:
- None.

**API Endpoints**:
- `GET /api/v1/pods/{namespace}/{name}/events?type={Normal|Warning}&reason={reason}&limit={n}`

**Frontend Components**:
- Pod events timeline with severity coloring and expandable message view.

**Acceptance Criteria**:
- Events are ordered newest-first and filterable.
- Warning events are visually differentiated.

##### Task 2: Related Resources API Normalization + Graph View

**Task Description**: Refactor current related-resource lookup for correctness and add compact graph view.

**Files to Create**:
- `/Users/bagsejun/workspace/kube-manager/apps/backend/src/main/java/com/k8smanager/dto/ResourceRelationEdgeDTO.java`
- `/Users/bagsejun/workspace/kube-manager/apps/frontend/src/components/pod/RelatedResourcesGraph.tsx`

**Files to Modify**:
- `/Users/bagsejun/workspace/kube-manager/apps/backend/src/main/java/com/k8smanager/controller/PodController.java`
  - Move related-resource resolution into service and return normalized graph DTO.
- `/Users/bagsejun/workspace/kube-manager/apps/backend/src/main/java/com/k8smanager/service/PodService.java`
  - Add `getRelatedResources(namespace, name)`.
- `/Users/bagsejun/workspace/kube-manager/apps/frontend/src/pages/PodDetails.tsx`
  - Add related resources graph/tab.

**Database Changes**:
- None.

**API Endpoints**:
- `GET /api/v1/pods/{namespace}/{name}/related`

**Frontend Components**:
- Graph panel + linked resource table fallback.

**Acceptance Criteria**:
- Graph includes owner workload, services, config maps/secrets references.
- Clicking a node navigates to existing detail/list routes.

##### Task 3: Pod Metrics Tab and Correlated Troubleshooting View

**Task Description**: Add a pod-centric metrics panel with synchronized time range control.

**Files to Create**:
- `/Users/bagsejun/workspace/kube-manager/apps/frontend/src/components/pod/PodMetricsPanel.tsx`

**Files to Modify**:
- `/Users/bagsejun/workspace/kube-manager/apps/frontend/src/api/pod.ts`
  - Add typed calls for pod metrics/history queries.
- `/Users/bagsejun/workspace/kube-manager/apps/frontend/src/pages/PodDetails.tsx`
  - Add metrics tab with CPU/memory/network charts.

**Database Changes**:
- None.

**API Endpoints**:
- Reuse existing:
  - `GET /api/v1/metrics/pods/{namespace}/{name}`
  - `GET /api/v1/metrics/history/{namespace}/{name}`
  - `GET /api/v1/metrics/network/{namespace}/{name}`

**Frontend Components**:
- Multi-chart panel with shared range selector.

**Acceptance Criteria**:
- User can switch metric types without leaving pod details.
- Time range selector updates all charts together.

#### 3) Technical Considerations

- **Dependencies**: Week 1 metrics work must be complete.
- **Blockers**: Inconsistent owner references across controller-managed and standalone pods.
- **External configuration**: Prometheus retention/step values for smooth pod charts.

#### 4) Testing Requirements

- **Unit tests**:
  - `EventServiceTest` pod filtering logic.
  - `PodServiceTest` related graph builder.
- **Integration tests**:
  - `PodControllerTest` for `/events` and `/related` query variants.
- **E2E tests**:
  - `/apps/frontend/e2e/pod-details-tabs.spec.ts`.

---

### Week 6: Log Enhancements (Aggregation + Search History)

#### 1) Weekly Objectives

- Add multi-pod log aggregation with source labeling.
- Add persistent search history and quick recall.
- Expand export formats (JSON/CSV) and lay Loki adapter groundwork.

**Success Criteria**
- User can stream logs from multiple selected pods in one view.
- Search history survives refresh/login and is user-scoped.
- Export works in text/json/csv.

#### 2) Task Breakdown

##### Task 1: Multi-Pod Log Aggregation Pipeline

**Task Description**: Build backend and frontend support to aggregate logs from selected pods/label selectors.

**Files to Create**:
- `/Users/bagsejun/workspace/kube-manager/apps/backend/src/main/java/com/k8smanager/dto/MultiPodLogRequestDTO.java`
- `/Users/bagsejun/workspace/kube-manager/apps/backend/src/main/java/com/k8smanager/dto/MultiPodLogEntryDTO.java`
- `/Users/bagsejun/workspace/kube-manager/apps/backend/src/main/java/com/k8smanager/service/LogAggregationService.java`
- `/Users/bagsejun/workspace/kube-manager/apps/backend/src/main/java/com/k8smanager/controller/LogAggregationController.java`
- `/Users/bagsejun/workspace/kube-manager/apps/frontend/src/api/logAggregation.ts`
- `/Users/bagsejun/workspace/kube-manager/apps/frontend/src/components/logs/MultiPodSelector.tsx`

**Files to Modify**:
- `/Users/bagsejun/workspace/kube-manager/apps/frontend/src/pages/LogViewer.tsx`
  - Add aggregation mode, pod source chips, merged timestamp sorting.

**Database Changes**:
- None.

**API Endpoints**:
- `POST /api/v1/logs/aggregate/stream`
- `POST /api/v1/logs/aggregate/query`

**Frontend Components**:
- Multi-pod selector and source-based filter toggles.

**Acceptance Criteria**:
- Aggregated view shows pod/container metadata per line.
- Stream remains responsive with at least 5 pods selected.

##### Task 2: Log Search History Persistence

**Task Description**: Store and reuse search queries with optional filter metadata.

**Files to Create**:
- `/Users/bagsejun/workspace/kube-manager/apps/backend/src/main/java/com/k8smanager/persistence/entity/LogSearchHistory.java`
- `/Users/bagsejun/workspace/kube-manager/apps/backend/src/main/java/com/k8smanager/persistence/repository/LogSearchHistoryRepository.java`
- `/Users/bagsejun/workspace/kube-manager/apps/backend/src/main/java/com/k8smanager/service/LogSearchHistoryService.java`
- `/Users/bagsejun/workspace/kube-manager/apps/backend/src/main/java/com/k8smanager/controller/LogSearchHistoryController.java`
- `/Users/bagsejun/workspace/kube-manager/apps/backend/src/main/resources/db/migration/V8__create_log_search_history_table.sql`
- `/Users/bagsejun/workspace/kube-manager/apps/frontend/src/api/logSearchHistory.ts`

**Files to Modify**:
- `/Users/bagsejun/workspace/kube-manager/apps/frontend/src/pages/LogViewer.tsx`
  - Save successful searches, add quick history dropdown.

**Database Changes**:
- Create `log_search_history` table with `user_id`, `query`, `filters`, `search_count`, `last_searched_at`.

**API Endpoints**:
- `GET /api/v1/logs/search-history`
- `POST /api/v1/logs/search-history`
- `DELETE /api/v1/logs/search-history/{id}`

**Frontend Components**:
- Search history dropdown + pin/reuse actions.

**Acceptance Criteria**:
- History is scoped per user and sorted by recency/frequency.

##### Task 3: Export Formats and Loki Adapter Interface

**Task Description**: Add JSON/CSV exports and abstract log source provider for future Loki integration.

**Files to Create**:
- `/Users/bagsejun/workspace/kube-manager/apps/backend/src/main/java/com/k8smanager/service/log/LogSourceProvider.java`
- `/Users/bagsejun/workspace/kube-manager/apps/backend/src/main/java/com/k8smanager/service/log/KubernetesLogSourceProvider.java`
- `/Users/bagsejun/workspace/kube-manager/apps/backend/src/main/java/com/k8smanager/service/log/LokiLogSourceProvider.java`

**Files to Modify**:
- `/Users/bagsejun/workspace/kube-manager/apps/backend/src/main/java/com/k8smanager/controller/PodLogController.java`
  - Add export endpoint and source provider abstraction.
- `/Users/bagsejun/workspace/kube-manager/apps/frontend/src/pages/LogViewer.tsx`
  - Add JSON/CSV export options.

**Database Changes**:
- None.

**API Endpoints**:
- `GET /api/v1/logs/export?format={txt|json|csv}`

**Frontend Components**:
- Export menu update.

**Acceptance Criteria**:
- Exported files are valid JSON/CSV and include selected filters.
- Source provider can switch by configuration flag.

#### 3) Technical Considerations

- **Dependencies**: Aggregation and history can proceed in parallel; export abstraction best after Task 1.
- **Blockers**: SSE backpressure and browser memory use for large streams.
- **External configuration**: Optional `LOKI_URL`, auth headers.

#### 4) Testing Requirements

- **Unit tests**:
  - `LogAggregationServiceTest`, `LogSearchHistoryServiceTest`.
- **Integration tests**:
  - Controller tests for aggregation payload validation and history CRUD.
- **E2E tests**:
  - `/apps/frontend/e2e/log-aggregation.spec.ts`.
  - `/apps/frontend/e2e/log-search-history.spec.ts`.

---

### Week 7: Resource Management (Quotas + Graphs)

#### 1) Weekly Objectives

- Implement full ResourceQuota/LimitRange management lifecycle.
- Add resource dependency graph visualization with query/filter controls.
- Improve namespace-level capacity visibility.

**Success Criteria**
- Users can create/update/delete quotas and limit ranges from UI.
- Resource graph loads for namespace and supports interaction.
- Quota usage vs hard limits is visually clear.

#### 2) Task Breakdown

##### Task 1: ResourceQuota and LimitRange CRUD

**Task Description**: Extend namespace management beyond read-only quota to full CRUD for quota and limit range resources.

**Files to Create**:
- `/Users/bagsejun/workspace/kube-manager/apps/backend/src/main/java/com/k8smanager/dto/ResourceQuotaRequestDTO.java`
- `/Users/bagsejun/workspace/kube-manager/apps/backend/src/main/java/com/k8smanager/dto/LimitRangeDTO.java`
- `/Users/bagsejun/workspace/kube-manager/apps/backend/src/main/java/com/k8smanager/dto/LimitRangeRequestDTO.java`
- `/Users/bagsejun/workspace/kube-manager/apps/frontend/src/api/quota.ts`
- `/Users/bagsejun/workspace/kube-manager/apps/frontend/src/pages/NamespaceQuotaManagement.tsx`

**Files to Modify**:
- `/Users/bagsejun/workspace/kube-manager/apps/backend/src/main/java/com/k8smanager/service/NamespaceService.java`
  - Add create/update/delete quota and limit range methods.
- `/Users/bagsejun/workspace/kube-manager/apps/backend/src/main/java/com/k8smanager/controller/NamespaceController.java`
  - Add CRUD endpoints under `/namespaces/{name}/quotas` and `/limitranges`.
- `/Users/bagsejun/workspace/kube-manager/apps/frontend/src/pages/NamespaceManagement.tsx`
  - Link to quota/limit management page.

**Database Changes**:
- None (Kubernetes-native resources).

**API Endpoints**:
- `GET /api/v1/namespaces/{name}/quotas`
- `POST /api/v1/namespaces/{name}/quotas`
- `PUT /api/v1/namespaces/{name}/quotas/{quotaName}`
- `DELETE /api/v1/namespaces/{name}/quotas/{quotaName}`
- `GET /api/v1/namespaces/{name}/limitranges`
- `POST /api/v1/namespaces/{name}/limitranges`
- `PUT /api/v1/namespaces/{name}/limitranges/{limitRangeName}`
- `DELETE /api/v1/namespaces/{name}/limitranges/{limitRangeName}`

**Frontend Components**:
- Quota form, LimitRange form, usage bars.

**Acceptance Criteria**:
- CRUD operations reflect immediately in namespace views.
- Validation prevents malformed resource quantities.

##### Task 2: Resource Dependency Graph API

**Task Description**: Add backend graph endpoint for ownership and selector-based relationships.

**Files to Create**:
- `/Users/bagsejun/workspace/kube-manager/apps/backend/src/main/java/com/k8smanager/dto/ResourceGraphDTO.java`
- `/Users/bagsejun/workspace/kube-manager/apps/backend/src/main/java/com/k8smanager/service/ResourceGraphService.java`
- `/Users/bagsejun/workspace/kube-manager/apps/backend/src/main/java/com/k8smanager/controller/ResourceGraphController.java`

**Files to Modify**:
- `/Users/bagsejun/workspace/kube-manager/apps/backend/src/main/java/com/k8smanager/service/ResourceService.java`
  - Provide normalized resource metadata to graph service.

**Database Changes**:
- None.

**API Endpoints**:
- `GET /api/v1/resources/graph?namespace={ns}&kind={kind}&name={name}`

**Frontend Components**:
- None in this task.

**Acceptance Criteria**:
- Graph API returns nodes/edges for deployments, replica sets, pods, services, config maps, secrets.

##### Task 3: Interactive Resource Graph UI

**Task Description**: Create frontend graph page and embed graph snippets into resource detail pages.

**Files to Create**:
- `/Users/bagsejun/workspace/kube-manager/apps/frontend/src/api/resourceGraph.ts`
- `/Users/bagsejun/workspace/kube-manager/apps/frontend/src/pages/ResourceGraph.tsx`
- `/Users/bagsejun/workspace/kube-manager/apps/frontend/src/components/resources/ResourceGraphCanvas.tsx`

**Files to Modify**:
- `/Users/bagsejun/workspace/kube-manager/apps/frontend/src/router.tsx`
  - Add `/resources/graph` route.
- `/Users/bagsejun/workspace/kube-manager/apps/frontend/src/pages/ResourceList.tsx`
  - Add "Open graph" action.
- `/Users/bagsejun/workspace/kube-manager/apps/frontend/package.json`
  - Add graph lib dependency (`d3` or `reactflow`).

**Database Changes**:
- None.

**API Endpoints**:
- Uses Task 2 endpoint.

**Frontend Components**:
- Interactive graph with zoom, filter, and node details drawer.

**Acceptance Criteria**:
- Graph renders for namespaces with >= 200 resources without UI freeze.
- Node click routes to existing detail pages.

#### 3) Technical Considerations

- **Dependencies**: Quota CRUD independent of graph feature; can run in parallel streams.
- **Blockers**: Quantity parsing and graph complexity for large namespaces.
- **External configuration**: None.

#### 4) Testing Requirements

- **Unit tests**:
  - `NamespaceServiceTest` quota/limit CRUD cases.
  - `ResourceGraphServiceTest` edge construction.
- **Integration tests**:
  - Namespace and graph controller endpoint tests.
- **E2E tests**:
  - `/apps/frontend/e2e/namespace-quota-management.spec.ts`.
  - `/apps/frontend/e2e/resource-graph.spec.ts`.

---

### Week 8: Notifications (Email + Webhooks)

#### 1) Weekly Objectives

- Build notification rule engine and delivery history.
- Deliver email channel with templating and user preferences.
- Deliver webhook channel with retries and signature support.

**Success Criteria**
- Alert events trigger notifications through enabled channels.
- Delivery history shows status, attempt count, and error reasons.
- Users can configure notification preferences by severity/channel.

#### 2) Task Breakdown

##### Task 1: Notification Core (Rules, History, Preferences)

**Task Description**: Implement core notification domain that routes alert events to channels based on rules.

**Files to Create**:
- `/Users/bagsejun/workspace/kube-manager/apps/backend/src/main/java/com/k8smanager/persistence/entity/NotificationRule.java`
- `/Users/bagsejun/workspace/kube-manager/apps/backend/src/main/java/com/k8smanager/persistence/entity/NotificationDelivery.java`
- `/Users/bagsejun/workspace/kube-manager/apps/backend/src/main/java/com/k8smanager/persistence/entity/NotificationPreference.java`
- `/Users/bagsejun/workspace/kube-manager/apps/backend/src/main/java/com/k8smanager/persistence/repository/NotificationRuleRepository.java`
- `/Users/bagsejun/workspace/kube-manager/apps/backend/src/main/java/com/k8smanager/persistence/repository/NotificationDeliveryRepository.java`
- `/Users/bagsejun/workspace/kube-manager/apps/backend/src/main/java/com/k8smanager/persistence/repository/NotificationPreferenceRepository.java`
- `/Users/bagsejun/workspace/kube-manager/apps/backend/src/main/java/com/k8smanager/service/NotificationService.java`
- `/Users/bagsejun/workspace/kube-manager/apps/backend/src/main/java/com/k8smanager/controller/NotificationController.java`
- `/Users/bagsejun/workspace/kube-manager/apps/backend/src/main/resources/db/migration/V9__create_notification_tables.sql`

**Files to Modify**:
- `/Users/bagsejun/workspace/kube-manager/apps/backend/src/main/java/com/k8smanager/service/AlertService.java`
  - Publish alert-created/updated events to notification service.

**Database Changes**:
- New tables `notification_rules`, `notification_deliveries`, `notification_preferences`.

**API Endpoints**:
- `GET /api/v1/notifications/rules`
- `POST /api/v1/notifications/rules`
- `PUT /api/v1/notifications/rules/{id}`
- `DELETE /api/v1/notifications/rules/{id}`
- `GET /api/v1/notifications/deliveries`
- `GET /api/v1/notifications/preferences`
- `PUT /api/v1/notifications/preferences`

**Frontend Components**:
- None in this task.

**Acceptance Criteria**:
- Alert event evaluates matching rules and creates delivery records.
- User preferences are respected before channel dispatch.

##### Task 2: Email Notification Channel

**Task Description**: Add SMTP-backed email sender with template rendering and retry semantics.

**Files to Create**:
- `/Users/bagsejun/workspace/kube-manager/apps/backend/src/main/java/com/k8smanager/service/EmailNotificationChannel.java`
- `/Users/bagsejun/workspace/kube-manager/apps/backend/src/main/java/com/k8smanager/config/MailConfig.java`
- `/Users/bagsejun/workspace/kube-manager/apps/backend/src/main/resources/templates/notifications/alert-email.html`

**Files to Modify**:
- `/Users/bagsejun/workspace/kube-manager/apps/backend/build.gradle`
  - Add `spring-boot-starter-mail`.
- `/Users/bagsejun/workspace/kube-manager/apps/backend/src/main/resources/application.properties`
  - Add `spring.mail.*` and channel config.

**Database Changes**:
- Optional migration `V10__add_notification_template_columns.sql` for template keys/channel metadata.

**API Endpoints**:
- `POST /api/v1/notifications/test/email`

**Frontend Components**:
- Email settings panel (sender, recipients, severity filters) in notification settings page.

**Acceptance Criteria**:
- Test email endpoint confirms SMTP config validity.
- Failed deliveries are retried and persisted with error detail.

##### Task 3: Webhook Channel and Admin UI

**Task Description**: Add generic webhook integrations with signed payloads, retries, and management UI.

**Files to Create**:
- `/Users/bagsejun/workspace/kube-manager/apps/backend/src/main/java/com/k8smanager/persistence/entity/WebhookEndpoint.java`
- `/Users/bagsejun/workspace/kube-manager/apps/backend/src/main/java/com/k8smanager/persistence/repository/WebhookEndpointRepository.java`
- `/Users/bagsejun/workspace/kube-manager/apps/backend/src/main/java/com/k8smanager/service/WebhookNotificationChannel.java`
- `/Users/bagsejun/workspace/kube-manager/apps/backend/src/main/java/com/k8smanager/controller/WebhookController.java`
- `/Users/bagsejun/workspace/kube-manager/apps/backend/src/main/resources/db/migration/V11__create_webhook_endpoints_table.sql`
- `/Users/bagsejun/workspace/kube-manager/apps/frontend/src/api/webhook.ts`
- `/Users/bagsejun/workspace/kube-manager/apps/frontend/src/pages/NotificationSettings.tsx`
- `/Users/bagsejun/workspace/kube-manager/apps/frontend/src/components/notifications/WebhookTable.tsx`

**Files to Modify**:
- `/Users/bagsejun/workspace/kube-manager/apps/frontend/src/router.tsx`
  - Add notification settings route.

**Database Changes**:
- `webhook_endpoints` table + `webhook_delivery_attempts` table.

**API Endpoints**:
- `GET /api/v1/webhooks`
- `POST /api/v1/webhooks`
- `PUT /api/v1/webhooks/{id}`
- `DELETE /api/v1/webhooks/{id}`
- `POST /api/v1/webhooks/{id}/test`

**Frontend Components**:
- Webhook CRUD table, secret management, and test delivery UI.

**Acceptance Criteria**:
- Webhook payload includes signature header and alert metadata.
- Retry policy is configurable and delivery logs are visible.

#### 3) Technical Considerations

- **Dependencies**: Notification core must be in place before channel-specific wiring.
- **Blockers**: SMTP/network access in restricted cluster environments.
- **External configuration**: SMTP creds, outbound allowlist for webhook destinations.

#### 4) Testing Requirements

- **Unit tests**:
  - Rule matcher tests, email/webhook channel retry tests.
- **Integration tests**:
  - Notification controller + webhook test endpoint with mock server.
- **E2E tests**:
  - `/apps/frontend/e2e/notification-settings.spec.ts`.
  - `/apps/frontend/e2e/webhook-test-delivery.spec.ts`.

---

## Phase 3: Advanced Features (Weeks 9-12)

### Week 9: Advanced Deployments (Canary + Blue-Green)

#### 1) Weekly Objectives

- Add canary rollout orchestration with promotion/rollback controls.
- Add blue-green deployment orchestration with switch and fallback.
- Provide operational safety checks and rollout visibility.

**Success Criteria**
- Canary and blue-green strategies are executable from UI with RBAC control.
- Rollout states are persisted and recoverable.
- Failure thresholds trigger rollback path.

#### 2) Task Breakdown

##### Task 1: Canary Deployment Backend Workflow

**Task Description**: Add canary plan model and rollout engine using weighted service routing abstraction.

**Files to Create**:
- `/Users/bagsejun/workspace/kube-manager/apps/backend/src/main/java/com/k8smanager/persistence/entity/DeploymentRollout.java`
- `/Users/bagsejun/workspace/kube-manager/apps/backend/src/main/java/com/k8smanager/persistence/repository/DeploymentRolloutRepository.java`
- `/Users/bagsejun/workspace/kube-manager/apps/backend/src/main/java/com/k8smanager/dto/CanaryRolloutRequestDTO.java`
- `/Users/bagsejun/workspace/kube-manager/apps/backend/src/main/java/com/k8smanager/service/CanaryDeploymentService.java`
- `/Users/bagsejun/workspace/kube-manager/apps/backend/src/main/java/com/k8smanager/controller/DeploymentStrategyController.java`
- `/Users/bagsejun/workspace/kube-manager/apps/backend/src/main/resources/db/migration/V12__create_deployment_rollouts_table.sql`

**Files to Modify**:
- `/Users/bagsejun/workspace/kube-manager/apps/backend/src/main/java/com/k8smanager/service/WorkloadService.java`
  - Expose helper methods for dual deployment revisions and health checks.

**Database Changes**:
- `deployment_rollouts` table with strategy, phase, weights, status, owner, timestamps.

**API Endpoints**:
- `POST /api/v1/workloads/deployments/{namespace}/{name}/canary/start`
- `POST /api/v1/workloads/deployments/{namespace}/{name}/canary/promote`
- `POST /api/v1/workloads/deployments/{namespace}/{name}/canary/abort`
- `GET /api/v1/workloads/deployments/{namespace}/{name}/rollouts/{rolloutId}`

**Frontend Components**:
- None in this task.

**Acceptance Criteria**:
- Rollout transitions state machine correctly (start -> step -> promote/abort).
- Abort restores original stable traffic.

##### Task 2: Blue-Green Deployment Backend Workflow

**Task Description**: Build blue-green strategy with active/preview service switching.

**Files to Create**:
- `/Users/bagsejun/workspace/kube-manager/apps/backend/src/main/java/com/k8smanager/dto/BlueGreenSwitchRequestDTO.java`
- `/Users/bagsejun/workspace/kube-manager/apps/backend/src/main/java/com/k8smanager/service/BlueGreenDeploymentService.java`

**Files to Modify**:
- `/Users/bagsejun/workspace/kube-manager/apps/backend/src/main/java/com/k8smanager/controller/DeploymentStrategyController.java`
  - Add blue-green endpoints.

**Database Changes**:
- Extend `deployment_rollouts` with `active_color`, `preview_color`, `switch_time`.

**API Endpoints**:
- `POST /api/v1/workloads/deployments/{namespace}/{name}/bluegreen/start`
- `POST /api/v1/workloads/deployments/{namespace}/{name}/bluegreen/switch`
- `POST /api/v1/workloads/deployments/{namespace}/{name}/bluegreen/rollback`

**Frontend Components**:
- None in this task.

**Acceptance Criteria**:
- Switch operation is atomic from API perspective and records audit event.

##### Task 3: Rollout UI and Safety Guardrails

**Task Description**: Build rollout UI for canary/blue-green strategy management.

**Files to Create**:
- `/Users/bagsejun/workspace/kube-manager/apps/frontend/src/api/deploymentStrategy.ts`
- `/Users/bagsejun/workspace/kube-manager/apps/frontend/src/pages/DeploymentRollout.tsx`
- `/Users/bagsejun/workspace/kube-manager/apps/frontend/src/components/deployments/CanaryStepper.tsx`
- `/Users/bagsejun/workspace/kube-manager/apps/frontend/src/components/deployments/BlueGreenSwitcher.tsx`

**Files to Modify**:
- `/Users/bagsejun/workspace/kube-manager/apps/frontend/src/pages/DeploymentDetails.tsx`
  - Add rollout tab and action buttons.
- `/Users/bagsejun/workspace/kube-manager/apps/frontend/src/router.tsx`
  - Add rollout route.

**Database Changes**:
- None.

**API Endpoints**:
- Uses Task 1 and Task 2 rollout endpoints.

**Frontend Components**:
- Strategy wizard, rollout progress timeline, rollback confirmation dialog.

**Acceptance Criteria**:
- UI prevents destructive actions without confirmation and permission checks.
- Progress states auto-refresh until terminal state.

#### 3) Technical Considerations

- **Dependencies**: If Istio not yet integrated, use service-label-based interim traffic switch.
- **Blockers**: Accurate health scoring for automatic abort decisions.
- **External configuration**: Optional mesh ingress/traffic manager for weighted routing.

#### 4) Testing Requirements

- **Unit tests**:
  - `CanaryDeploymentServiceTest`, `BlueGreenDeploymentServiceTest`.
- **Integration tests**:
  - Strategy controller state transition tests.
- **E2E tests**:
  - `/apps/frontend/e2e/canary-rollout.spec.ts`.
  - `/apps/frontend/e2e/bluegreen-rollout.spec.ts`.

---

### Week 10: Observability (OpenTelemetry + Correlation)

#### 1) Weekly Objectives

- Instrument backend with OpenTelemetry traces.
- Integrate trace backend querying and correlation APIs.
- Add UI for trace search and logs/metrics correlation.

**Success Criteria**
- Requests produce trace spans visible in configured backend.
- Trace IDs are available in logs and API responses where applicable.
- User can pivot from metric spike/log event to related trace.

#### 2) Task Breakdown

##### Task 1: OpenTelemetry Instrumentation and Export

**Task Description**: Add OTEL SDK setup and exporter wiring for backend services.

**Files to Create**:
- `/Users/bagsejun/workspace/kube-manager/apps/backend/src/main/java/com/k8smanager/config/OpenTelemetryConfig.java`
- `/Users/bagsejun/workspace/kube-manager/apps/backend/src/main/java/com/k8smanager/observability/TraceContextUtil.java`

**Files to Modify**:
- `/Users/bagsejun/workspace/kube-manager/apps/backend/build.gradle`
  - Add OpenTelemetry API/SDK/exporter dependencies.
- `/Users/bagsejun/workspace/kube-manager/apps/backend/src/main/resources/application.properties`
  - Add OTEL endpoint/service-name/sampling configs.
- `/Users/bagsejun/workspace/kube-manager/apps/backend/src/main/java/com/k8smanager/K8sManagerBackendApplication.java`
  - Initialize tracing bootstrap if required.

**Database Changes**:
- None.

**API Endpoints**:
- None.

**Frontend Components**:
- None.

**Acceptance Criteria**:
- Trace spans emitted for key controllers/services.
- Trace context propagates through outbound Prometheus/WebClient calls.

##### Task 2: Trace Query and Correlation APIs

**Task Description**: Add APIs for trace search, trace detail, and linking traces to metrics/log entries.

**Files to Create**:
- `/Users/bagsejun/workspace/kube-manager/apps/backend/src/main/java/com/k8smanager/dto/TraceSummaryDTO.java`
- `/Users/bagsejun/workspace/kube-manager/apps/backend/src/main/java/com/k8smanager/dto/TraceDetailDTO.java`
- `/Users/bagsejun/workspace/kube-manager/apps/backend/src/main/java/com/k8smanager/service/TraceQueryService.java`
- `/Users/bagsejun/workspace/kube-manager/apps/backend/src/main/java/com/k8smanager/controller/TraceController.java`

**Files to Modify**:
- `/Users/bagsejun/workspace/kube-manager/apps/backend/src/main/java/com/k8smanager/service/MonitoringService.java`
  - Add trace correlation metadata in anomaly/metric responses.
- `/Users/bagsejun/workspace/kube-manager/apps/backend/src/main/java/com/k8smanager/controller/PodLogController.java`
  - Include traceId when available in structured log output.

**Database Changes**:
- Optional `V13__add_trace_reference_to_audit_logs.sql` for cross-linking audit events.

**API Endpoints**:
- `GET /api/v1/observability/traces?service={svc}&operation={op}&from={ts}&to={ts}`
- `GET /api/v1/observability/traces/{traceId}`
- `GET /api/v1/observability/correlation?namespace={ns}&resource={name}&from={ts}&to={ts}`

**Frontend Components**:
- None in this task.

**Acceptance Criteria**:
- Trace query endpoint returns filtered paged results.
- Correlation endpoint returns linked metrics/logs/traces payload.

##### Task 3: Observability UI (Trace Explorer + Correlation Timeline)

**Task Description**: Build front-end trace explorer and cross-signal timeline.

**Files to Create**:
- `/Users/bagsejun/workspace/kube-manager/apps/frontend/src/api/observability.ts`
- `/Users/bagsejun/workspace/kube-manager/apps/frontend/src/pages/TraceExplorer.tsx`
- `/Users/bagsejun/workspace/kube-manager/apps/frontend/src/components/observability/TraceWaterfall.tsx`
- `/Users/bagsejun/workspace/kube-manager/apps/frontend/src/components/observability/CorrelationTimeline.tsx`

**Files to Modify**:
- `/Users/bagsejun/workspace/kube-manager/apps/frontend/src/router.tsx`
  - Add observability routes.
- `/Users/bagsejun/workspace/kube-manager/apps/frontend/src/pages/LogViewer.tsx`
  - Add "jump to trace" link.

**Database Changes**:
- None.

**API Endpoints**:
- Uses Task 2 endpoints.

**Frontend Components**:
- Trace search/filter form, waterfall detail, correlation timeline panel.

**Acceptance Criteria**:
- User can open a trace from logs and inspect span waterfall.
- Correlation timeline aligns metrics, logs, traces on shared time axis.

#### 3) Technical Considerations

- **Dependencies**: OTEL instrumentation must precede useful trace UI.
- **Blockers**: Trace backend query API differences (Jaeger vs Tempo).
- **External configuration**: OTEL collector endpoint and auth/TLS setup.

#### 4) Testing Requirements

- **Unit tests**:
  - Trace parser and correlation composer tests.
- **Integration tests**:
  - `TraceControllerTest` with mocked backend responses.
- **E2E tests**:
  - `/apps/frontend/e2e/trace-explorer.spec.ts`.
  - `/apps/frontend/e2e/log-to-trace-correlation.spec.ts`.

---

### Week 11: GitOps (ArgoCD + Image Registry)

#### 1) Weekly Objectives

- Add ArgoCD application visibility and sync controls.
- Add image registry browsing/tag insights.
- Provide a unified GitOps operations screen with RBAC restrictions.

**Success Criteria**
- Users can view ArgoCD app health/sync status and trigger sync.
- Registry browser shows repositories/tags with search.
- Sensitive operations require explicit write/admin permissions.

#### 2) Task Breakdown

##### Task 1: ArgoCD Integration Backend

**Task Description**: Add ArgoCD API client and service endpoints for application management.

**Files to Create**:
- `/Users/bagsejun/workspace/kube-manager/apps/backend/src/main/java/com/k8smanager/gitops/ArgoCdClient.java`
- `/Users/bagsejun/workspace/kube-manager/apps/backend/src/main/java/com/k8smanager/dto/ArgoApplicationDTO.java`
- `/Users/bagsejun/workspace/kube-manager/apps/backend/src/main/java/com/k8smanager/service/GitOpsService.java`
- `/Users/bagsejun/workspace/kube-manager/apps/backend/src/main/java/com/k8smanager/controller/GitOpsController.java`

**Files to Modify**:
- `/Users/bagsejun/workspace/kube-manager/apps/backend/src/main/resources/application.properties`
  - Add `argocd.url`, token/credentials config.

**Database Changes**:
- Optional `V14__create_gitops_connections_table.sql` for external system credential references.

**API Endpoints**:
- `GET /api/v1/gitops/applications`
- `GET /api/v1/gitops/applications/{name}`
- `POST /api/v1/gitops/applications/{name}/sync`
- `POST /api/v1/gitops/applications/{name}/rollback`

**Frontend Components**:
- None in this task.

**Acceptance Criteria**:
- API returns ArgoCD status/health fields with typed DTOs.
- Sync/rollback actions return operation status and audit logs.

##### Task 2: Image Registry Integration Backend

**Task Description**: Add registry API adapter (Harbor-compatible) for repository and tag queries.

**Files to Create**:
- `/Users/bagsejun/workspace/kube-manager/apps/backend/src/main/java/com/k8smanager/gitops/RegistryClient.java`
- `/Users/bagsejun/workspace/kube-manager/apps/backend/src/main/java/com/k8smanager/dto/RegistryRepositoryDTO.java`
- `/Users/bagsejun/workspace/kube-manager/apps/backend/src/main/java/com/k8smanager/dto/RegistryTagDTO.java`

**Files to Modify**:
- `/Users/bagsejun/workspace/kube-manager/apps/backend/src/main/java/com/k8smanager/service/GitOpsService.java`
  - Add registry methods.
- `/Users/bagsejun/workspace/kube-manager/apps/backend/src/main/java/com/k8smanager/controller/GitOpsController.java`
  - Add registry endpoints.

**Database Changes**:
- Extend connection table with registry credentials reference.

**API Endpoints**:
- `GET /api/v1/gitops/registry/repositories`
- `GET /api/v1/gitops/registry/repositories/{repo}/tags`
- `GET /api/v1/gitops/registry/repositories/{repo}/tags/{tag}`

**Frontend Components**:
- None in this task.

**Acceptance Criteria**:
- Repository/tag list loads with pagination.
- Missing/invalid credentials return clear error responses.

##### Task 3: GitOps Frontend Pages and Workflows

**Task Description**: Build GitOps UI integrating ArgoCD and registry data.

**Files to Create**:
- `/Users/bagsejun/workspace/kube-manager/apps/frontend/src/api/gitops.ts`
- `/Users/bagsejun/workspace/kube-manager/apps/frontend/src/pages/GitOpsApplications.tsx`
- `/Users/bagsejun/workspace/kube-manager/apps/frontend/src/pages/ImageRegistryBrowser.tsx`
- `/Users/bagsejun/workspace/kube-manager/apps/frontend/src/components/gitops/ApplicationStatusTable.tsx`
- `/Users/bagsejun/workspace/kube-manager/apps/frontend/src/components/gitops/RegistryTagDrawer.tsx`

**Files to Modify**:
- `/Users/bagsejun/workspace/kube-manager/apps/frontend/src/router.tsx`
  - Add GitOps routes.
- `/Users/bagsejun/workspace/kube-manager/apps/frontend/src/layouts/AppLayout.tsx`
  - Add navigation entries for GitOps pages.

**Database Changes**:
- None.

**API Endpoints**:
- Uses Task 1 and Task 2 endpoints.

**Frontend Components**:
- Application table with sync action, registry browser with tag details.

**Acceptance Criteria**:
- User can trigger app sync and see status updates.
- Registry search/filter works on repository/tag names.

#### 3) Technical Considerations

- **Dependencies**: Connection management/auth required before useful UI testing.
- **Blockers**: External API rate limits and self-signed cert handling.
- **External configuration**: ArgoCD and registry endpoints, credentials, TLS trust.

#### 4) Testing Requirements

- **Unit tests**:
  - ArgoCD and registry client adapters with mocked HTTP responses.
- **Integration tests**:
  - `GitOpsControllerTest` for read/write RBAC and error mapping.
- **E2E tests**:
  - `/apps/frontend/e2e/gitops-applications.spec.ts`.
  - `/apps/frontend/e2e/image-registry-browser.spec.ts`.

---

### Week 12: Service Mesh (Istio + Mesh Topology)

#### 1) Weekly Objectives

- Add Istio resource management APIs (VirtualService, DestinationRule, Gateway).
- Add mesh topology visualization and traffic overlays.
- Integrate rollout features with mesh traffic policies.

**Success Criteria**
- Users can CRUD core Istio resources from UI.
- Topology view shows service-to-service edges with health/traffic info.
- Canary/blue-green strategies can use mesh routing where enabled.

#### 2) Task Breakdown

##### Task 1: Istio Resource Management Backend

**Task Description**: Add controllers/services for core Istio CRDs.

**Files to Create**:
- `/Users/bagsejun/workspace/kube-manager/apps/backend/src/main/java/com/k8smanager/dto/VirtualServiceDTO.java`
- `/Users/bagsejun/workspace/kube-manager/apps/backend/src/main/java/com/k8smanager/dto/DestinationRuleDTO.java`
- `/Users/bagsejun/workspace/kube-manager/apps/backend/src/main/java/com/k8smanager/dto/GatewayDTO.java`
- `/Users/bagsejun/workspace/kube-manager/apps/backend/src/main/java/com/k8smanager/service/ServiceMeshService.java`
- `/Users/bagsejun/workspace/kube-manager/apps/backend/src/main/java/com/k8smanager/controller/ServiceMeshController.java`

**Files to Modify**:
- `/Users/bagsejun/workspace/kube-manager/apps/backend/build.gradle`
  - Add Istio/fabric8 CRD model dependencies.
- `/Users/bagsejun/workspace/kube-manager/apps/backend/src/main/java/com/k8smanager/k8s/K8sClientService.java`
  - Register Istio CRD handlers if needed.

**Database Changes**:
- Optional `V15__create_mesh_policy_presets.sql` if storing reusable templates.

**API Endpoints**:
- `GET /api/v1/mesh/virtualservices`
- `POST /api/v1/mesh/virtualservices`
- `PUT /api/v1/mesh/virtualservices/{namespace}/{name}`
- `DELETE /api/v1/mesh/virtualservices/{namespace}/{name}`
- `GET /api/v1/mesh/destinationrules`
- `POST /api/v1/mesh/destinationrules`
- `PUT /api/v1/mesh/destinationrules/{namespace}/{name}`
- `DELETE /api/v1/mesh/destinationrules/{namespace}/{name}`
- `GET /api/v1/mesh/gateways`
- `POST /api/v1/mesh/gateways`

**Frontend Components**:
- None in this task.

**Acceptance Criteria**:
- CRUD endpoints validate required Istio fields and enforce RBAC.

##### Task 2: Mesh Topology API and Visualization

**Task Description**: Build service mesh topology model and frontend graph view.

**Files to Create**:
- `/Users/bagsejun/workspace/kube-manager/apps/backend/src/main/java/com/k8smanager/dto/MeshTopologyDTO.java`
- `/Users/bagsejun/workspace/kube-manager/apps/backend/src/main/java/com/k8smanager/service/MeshTopologyService.java`
- `/Users/bagsejun/workspace/kube-manager/apps/frontend/src/api/mesh.ts`
- `/Users/bagsejun/workspace/kube-manager/apps/frontend/src/pages/MeshTopology.tsx`
- `/Users/bagsejun/workspace/kube-manager/apps/frontend/src/components/mesh/MeshTopologyCanvas.tsx`

**Files to Modify**:
- `/Users/bagsejun/workspace/kube-manager/apps/backend/src/main/java/com/k8smanager/controller/ServiceMeshController.java`
  - Add topology endpoint.
- `/Users/bagsejun/workspace/kube-manager/apps/frontend/src/router.tsx`
  - Add `/mesh/topology` route.

**Database Changes**:
- None.

**API Endpoints**:
- `GET /api/v1/mesh/topology?namespace={ns}&window={5m|1h}`

**Frontend Components**:
- Topology graph with edge traffic rates and health status.

**Acceptance Criteria**:
- Topology endpoint returns deterministic nodes/edges for target namespace.
- UI supports zoom/filter and node detail drilldown.

##### Task 3: Mesh-Aware Progressive Delivery Integration

**Task Description**: Integrate Week 9 rollout strategies with Istio routing when mesh is enabled.

**Files to Create**:
- `/Users/bagsejun/workspace/kube-manager/apps/backend/src/main/java/com/k8smanager/service/MeshTrafficRoutingService.java`
- `/Users/bagsejun/workspace/kube-manager/apps/frontend/src/components/deployments/MeshTrafficSplitControl.tsx`

**Files to Modify**:
- `/Users/bagsejun/workspace/kube-manager/apps/backend/src/main/java/com/k8smanager/service/CanaryDeploymentService.java`
  - Use virtual service weighted routing when available.
- `/Users/bagsejun/workspace/kube-manager/apps/backend/src/main/java/com/k8smanager/service/BlueGreenDeploymentService.java`
  - Use destination subsets and route switching.
- `/Users/bagsejun/workspace/kube-manager/apps/frontend/src/pages/DeploymentRollout.tsx`
  - Show mesh mode and effective traffic split.

**Database Changes**:
- Optional extension of `deployment_rollouts` with `routing_mode`, `virtual_service_ref`.

**API Endpoints**:
- `POST /api/v1/workloads/deployments/{namespace}/{name}/rollouts/{id}/mesh/weights`

**Frontend Components**:
- Mesh traffic split control with guardrails.

**Acceptance Criteria**:
- Rollout can switch between native and mesh routing modes.
- Mesh route changes are audited and reversible.

#### 3) Technical Considerations

- **Dependencies**: Istio CRDs must be installed in target clusters.
- **Blockers**: Version compatibility between Istio API versions and Fabric8 models.
- **External configuration**: Istio control plane access and RBAC for CRD operations.

#### 4) Testing Requirements

- **Unit tests**:
  - `ServiceMeshServiceTest`, `MeshTopologyServiceTest`, `MeshTrafficRoutingServiceTest`.
- **Integration tests**:
  - `ServiceMeshControllerTest` for CRUD + topology responses.
- **E2E tests**:
  - `/apps/frontend/e2e/mesh-topology.spec.ts`.
  - `/apps/frontend/e2e/mesh-progressive-delivery.spec.ts`.

---

## Cross-Phase Execution Notes

- Keep feature toggles for Week 9-12 features (`feature.rollouts.enabled`, `feature.gitops.enabled`, `feature.mesh.enabled`) to support staged rollout.
- For every new endpoint, apply `@PreAuthorize` and align authorities with existing permission vocabulary (`READ`, `WRITE`, `DELETE`, `EXEC`, `LOGS`).
- Preserve strict type safety:
  - Backend DTOs should avoid raw `Map<String, Object>` where practical.
  - Frontend API clients should parse with Zod schemas in `src/types/schemas.ts`.
- Add API docs annotations for all new controllers to keep Swagger complete.
