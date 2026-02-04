## Why

The backend Spring Boot application currently has no Swagger/OpenAPI annotations, despite having the springdoc-openapi-starter-webmvc-ui dependency installed. While API documentation exists in API.md, it's not integrated with the codebase and cannot be accessed via interactive Swagger UI. This disconnects the documentation from the actual implementation, leading to potential inconsistencies and making it harder for developers and API consumers to understand the available endpoints, request/response formats, and authentication requirements. Adding Swagger annotations will provide interactive API documentation, enable automatic API client generation, and ensure documentation stays in sync with the code.

## What Changes

- Add OpenAPI 3.0 annotations (@Operation, @ApiResponse, @Tag, @Parameter, @RequestBody, @Schema) to all REST controllers
- Create OpenAPI configuration class to customize API documentation (title, version, description, security schemes)
- Add security scheme definition for OAuth2/Bearer token authentication
- Document request/response DTOs using @Schema annotations for better type information
- Group endpoints by functional modules using @Tag annotations
- Add example request/response values using @ExampleObject where appropriate
- Configure Swagger UI endpoint at /swagger-ui.html
- Configure OpenAPI JSON endpoint at /v3/api-docs
- Add operation summaries and descriptions for each endpoint
- Document authentication requirements, request parameters, and response codes

## Capabilities

### New Capabilities
- `backend-swagger-api`: Interactive API documentation via Swagger UI with complete endpoint coverage including authentication, parameters, request/response schemas, and examples for all cluster, namespace, resource, workload, pod, monitoring, log, terminal, YAML, RBAC, and user management APIs

### Modified Capabilities

All existing capabilities will have their API documentation enhanced through Swagger annotations. No spec-level behavior changes - this is purely an implementation-level documentation addition:
- `cluster-management`: Swagger annotations for cluster overview, nodes, health, events, and metrics endpoints
- `namespace-management`: Swagger annotations for namespace CRUD and quota endpoints
- `resource-visualization`: Swagger annotations for generic resource list/details/update/delete endpoints
- `workload-management`: Swagger annotations for deployment CRUD, scaling, restart, rollback, and update operations
- `pod-management`: Swagger annotations for pod list, details, and delete operations
- `resource-monitoring`: Swagger annotations for metrics and monitoring endpoints
- `log-explorer`: Swagger annotations for log streaming and filtering endpoints
- `terminal-emulator`: Swagger annotations for WebSocket-based terminal access endpoints
- `yaml-editor`: Swagger annotations for YAML validation and application endpoints
- `rbac`: Swagger annotations for role and permission management endpoints
- `user-authentication`: Swagger annotations for user authentication and token management endpoints

## Impact

**Affected Code**:
- All REST controllers in `apps/backend/src/main/java/com/k8smanager/controller/`
  - ClusterController
  - PodController
  - WorkloadController
  - ResourceController
  - MonitoringController
  - PodLogController
  - PodYamlController
  - TerminalController
  - RoleManagementController
  - UserController
- All DTO classes in `apps/backend/src/main/java/com/k8smanager/dto/` for @Schema annotations
- Configuration package: New `OpenApiConfig` class

**Affected APIs**:
- All existing API endpoints will have enhanced documentation without breaking changes
- New endpoints: `/swagger-ui.html` and `/v3/api-docs` (already provided by springdoc)

**Dependencies**:
- Already present: `springdoc-openapi-starter-webmvc-ui:2.3.0`
- No new dependencies required

**Systems**:
- Interactive Swagger UI available at runtime
- OpenAPI JSON specification exportable at `/v3/api-docs`
- Improved developer experience for API consumers
- Better API testing capabilities via Swagger UI's "Try it out" feature
