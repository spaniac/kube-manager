## Context

**Current State**:
- Backend Spring Boot 3.5.9 application with Java 21
- Already has `springdoc-openapi-starter-webmvc-ui:2.3.0` dependency installed
- API documentation exists in `API.md` but is disconnected from codebase
- No OpenAPI annotations on any REST controllers or DTOs
- 10 REST controllers across multiple modules: cluster, namespace, resource, workload, pod, monitoring, log, terminal, YAML, RBAC, and user management
- 60+ DTO classes without schema documentation
- Swagger UI endpoints available at `/swagger-ui.html` and `/v3/api-docs` but with minimal auto-generated documentation

**Constraints**:
- Must follow Google Java Style Guide for Spring Boot code
- All API responses use `ApiResponse<T>` wrapper structure with `success`, `data`, `message` fields
- Authentication via OAuth2/OIDC with Bearer tokens (Keycloak)
- Must not modify API behavior - only add documentation
- Must use Java 21 records for DTOs
- Spring Security configuration uses Lambda DSL
- GlobalExceptionHandler uses ProblemDetail (RFC 7807) for error handling

**Stakeholders**:
- Frontend developers consuming backend APIs
- External API integrators
- Backend developers maintaining the API
- DevOps teams deploying and monitoring the service

## Goals / Non-Goals

**Goals:**
1. Provide interactive Swagger UI at `/swagger-ui.html` with complete API documentation
2. Add OpenAPI 3.0 annotations to all 10 REST controllers covering all endpoints
3. Document all request/response DTOs with type information, examples, and validation rules
4. Configure OAuth2 security scheme in OpenAPI spec for Bearer token authentication
5. Group endpoints by functional modules using `@Tag` annotations for better organization
6. Add operation summaries, descriptions, and response codes for all endpoints
7. Provide example request/response data for complex operations
8. Ensure documentation stays in sync with code (compile-time enforcement via annotations)

**Non-Goals:**
- Modifying existing API behavior or endpoints
- Changing API response structures
- Removing or replacing existing `API.md` documentation
- Implementing new API endpoints or features
- Changing authentication mechanism
- Adding frontend TypeScript code generation (can be done separately)

## Decisions

### Decision 1: OpenAPI 3.0 Specification Version

**Choice**: Use OpenAPI 3.0.0 (default in springdoc 2.3.0)

**Rationale**:
- OpenAPI 3.0.0 is mature, widely supported, and sufficient for our needs
- springdoc-openapi-starter-webmvc-ui:2.3.0 uses 3.0 by default
- All major API clients support OpenAPI 3.0
- Provides all features we need: security schemes, examples, schema validation

**Alternatives Considered**:
- **OpenAPI 3.1**: Newer but limited tool support; springdoc doesn't fully support it yet
- **Swagger 2.0**: Legacy, lacks features like security schemes and improved schema definitions

### Decision 2: Annotation Strategy - Controller-Level vs DTO-Level

**Choice**: Apply annotations at both levels for comprehensive documentation

**Rationale**:
- **Controller-level** (`@Operation`, `@ApiResponse`, `@Tag`, `@Parameter`, `@RequestBody`): Documents endpoint behavior, HTTP methods, request/response formats, authentication requirements
- **DTO-level** (`@Schema`, `@ExampleObject`): Documents data structures, validation rules, field descriptions, example values
- Dual approach provides complete API contract: what endpoints accept and what data looks like

**Alternatives Considered**:
- **Controller-only**: Simpler but misses field-level documentation and validation rules
- **DTO-only**: Doesn't capture HTTP-specific details like status codes, security, path parameters

### Decision 3: Security Scheme Definition

**Choice**: Use `@SecurityRequirement` and configure OAuth2 Bearer token security scheme in `OpenApiConfig`

**Rationale**:
- Application uses OAuth2/OIDC with Keycloak
- All protected endpoints require `Authorization: Bearer <token>` header
- Standard OAuth2 flow is well-documented and understood
- Spring Security already configured for Bearer token validation
- Swagger UI will show "Authorize" button and accept token input

**Implementation**:
```java
@Bean
public OpenAPI customOpenAPI() {
    SecurityScheme securityScheme = new SecurityScheme()
        .type(SecurityScheme.Type.HTTP)
        .scheme("bearer")
        .bearerFormat("JWT")
        .in(SecurityScheme.In.HEADER)
        .name("Authorization");
    
    return new OpenAPI()
        .info(new Info().title("K8s Manager API").version("v1"))
        .addSecurityItem(new SecurityRequirement().addList("Bearer Token", Arrays.asList("read", "write")))
        .components(new Components().addSecuritySchemes("Bearer Token", securityScheme));
}
```

**Alternatives Considered**:
- **API Key**: Simpler but less secure; doesn't match our OAuth2 implementation
- **No security scheme**: Would require manual token entry for each request; poor developer experience

### Decision 4: Module Organization with @Tag

**Choice**: Group endpoints by functional modules using `@Tag(name = "Cluster Management")` at controller class level

**Rationale**:
- Matches project structure: 10 controllers = 10 functional areas
- Improves Swagger UI navigation with clear sections
- Aligns with existing specs: cluster-management, namespace-management, etc.
- Each controller maps to one tag for clean organization

**Tags**:
- Cluster Management: `@Tag(name = "Cluster Management", description = "Cluster overview, nodes, health, events")`
- Namespace Management: `@Tag(name = "Namespace Management", description = "Namespace CRUD operations")`
- Resource Visualization: `@Tag(name = "Resource Visualization", description = "Generic resource operations")`
- Workload Management: `@Tag(name = "Workload Management", description = "Deployments, StatefulSets, DaemonSets")`
- Pod Management: `@Tag(name = "Pod Management", description = "Pod operations and lifecycle")`
- Resource Monitoring: `@Tag(name = "Resource Monitoring", description = "Metrics and monitoring data")`
- Log Explorer: `@Tag(name = "Log Explorer", description = "Log streaming and filtering")`
- Terminal Emulator: `@Tag(name = "Terminal Emulator", description = "WebSocket-based terminal access")`
- YAML Editor: `@Tag(name = "YAML Editor", description = "YAML validation and application")`
- RBAC: `@Tag(name = "Role-Based Access Control", description = "Roles and permissions management")`
- User Authentication: `@Tag(name = "User Authentication", description = "Authentication and token management")`

### Decision 5: Error Response Documentation

**Choice**: Document common error responses using `@ApiResponse(responseCode = "404", description = "Resource not found")` and reference ProblemDetail (RFC 7807) schema

**Rationale**:
- Application uses standardized error responses via GlobalExceptionHandler
- ProblemDetail provides: type, title, status, detail, instance fields
- HTTP status codes: 400, 401, 403, 404, 409, 500
- Consistent with API documentation in `API.md`

**Example**:
```java
@Operation(summary = "Get cluster overview")
@ApiResponses({
    @ApiResponse(responseCode = "200", description = "Cluster information retrieved successfully"),
    @ApiResponse(responseCode = "401", description = "Unauthorized - Invalid or missing token"),
    @ApiResponse(responseCode = "500", description = "Internal server error")
})
```

**Alternatives Considered**:
- **Single generic @ApiResponse**: Less informative, doesn't guide API consumers on expected errors
- **No error documentation**: Developers must read code or trial-and-error; poor experience

### Decision 6: Configuration Approach

**Choice**: Create single `OpenApiConfig` class in `com.k8smanager.config` package

**Rationale**:
- Centralized configuration is easier to maintain
- Follows existing config pattern: SecurityConfig, PrometheusConfig, K8sClientConfig, WebSocketConfig
- Bean-based Spring Boot configuration is idiomatic
- Single place to update API info, version, security schemes

**Class Structure**:
```java
@Configuration
public class OpenApiConfig {
    @Bean
    public OpenAPI customOpenAPI() {
        // Configure API metadata, security schemes
    }

    @Bean
    public GroupedOpenApi customOpenApiGroup() {
        // Group all endpoints under single API spec
    }
}
```

### Decision 7: DTO Schema Documentation Approach

**Choice**: Use `@Schema` annotations on Java record fields with descriptions and examples where complex

**Rationale**:
- Java 21 records provide immutable DTOs (project requirement)
- `@Schema` on record fields provides inline documentation
- Use `@Schema(description = "...")
`, `@Schema(required = true)`, `@Schema(example = "...")
` for clarity
- Complex nested objects can use `@Schema(subTypes = ...)`
- Arrays use `@Schema(type = "array", implementation = ...)`

**Example**:
```java
public record ClusterInfoDTO(
    @Schema(description = "Cluster name", example = "production-cluster")
    String name,
    
    @Schema(description = "Kubernetes version", example = "v1.28.2")
    String version,
    
    @Schema(description = "Operating system/platform", example = "Linux/amd64")
    String platform
) {}
```

**Alternatives Considered**:
- **Separate schema files**: More verbose, requires manual synchronization with code
- **JavaDoc only**: Not visible in Swagger UI, defeats purpose of annotations

### Decision 8: Example Data Strategy

**Choice**: Provide `@ExampleObject` for complex request DTOs (create/update operations) and `@Schema(example = "...")` for simple fields

**Rationale**:
- Examples make API easier to understand and test
- Swagger UI's "Try it out" feature pre-fills examples
- Focus on complex objects: create deployment, create namespace, update resources
- Simple fields can use inline examples in `@Schema`

**When to Provide Examples**:
- **Always**: Create operations (POST /deployments, POST /namespaces)
- **Always**: Update operations with complex payloads (PUT /deployments/{name}/image)
- **Optional**: Simple queries (GET /cluster, GET /pods) - clear from schema

**Example**:
```java
@Schema(
    example = "{\"name\":\"nginx\",\"replicas\":3,\"image\":\"nginx:1.21.0\"}"
)
@RequestBody
CreateDeploymentRequestDTO request
```

### Decision 9: Annotation Priority and Order

**Choice**: Annotate in order: DTOs first, then controllers; DTOs bottom-up, controllers top-down

**Rationale**:
- DTOs are building blocks - annotate first to establish data contracts
- Controllers reference DTOs - annotate second to use established schemas
- Avoids circular dependencies in documentation
- Enables incremental testing: Swagger UI updates as each controller is annotated

**Implementation Order**:
1. Common DTOs: `ApiResponse<T>`, `ClusterInfoDTO`, `NodeInfoDTO`
2. Module-specific DTOs: PodDTO, DeploymentDTO, NamespaceDTO
3. Base controllers: ClusterController, PodController
4. Complex controllers: WorkloadController, ResourceController
5. Specialized controllers: TerminalController, PodYamlController

### Decision 10: Compatibility with Springdoc 2.3.0

**Choice**: Use springdoc-openapi-starter-webmvc-ui:2.3.0 features without upgrade

**Rationale**:
- Already installed and working
- Version 2.3.0 supports OpenAPI 3.0, Spring Boot 3.5.9, Java 21
- No new dependencies required
- Upgrading introduces risk without clear benefit

**Supported Features**:
- `@Operation`, `@ApiResponse`, `@Tag`, `@Parameter`, `@RequestBody`
- `@Schema` for DTO documentation
- Security schemes and requirements
- Swagger UI auto-configuration
- Spring MVC controller scanning

## Risks / Trade-offs

### Risk 1: Annotation Duplication with JavaDoc

**Risk**: Developers might maintain both JavaDoc and `@Schema` descriptions, leading to inconsistency

**Mitigation**:
- Use `@Schema` descriptions as source of truth for API documentation
- Extract common descriptions to constants or use DRY principles
- Provide team training on annotation-first approach
- Consider Lombok's `@FieldNameConstants` for field names if needed

### Risk 2: Performance Impact on Startup

**Risk**: Scanning 60+ DTOs and 10 controllers for OpenAPI annotations may increase application startup time

**Mitigation**:
- springdoc uses compile-time annotation processing - minimal runtime overhead
- Benchmark startup time before and after annotation addition
- Acceptable trade-off: startup time increase < 200ms is acceptable for comprehensive documentation

### Risk 3: Documentation Drift from Implementation

**Risk**: Code changes might not update annotations, causing Swagger UI to show outdated information

**Mitigation**:
- Annotations are in code alongside implementation - harder to forget than separate docs
- Consider CI check: ensure new endpoints have required annotations
- Add integration tests that validate OpenAPI spec completeness
- Team code review checklist: verify annotations for new endpoints

### Risk 4: Security Scheme Misconfiguration

**Risk**: Incorrect security scheme configuration could allow Swagger UI to bypass authentication

**Mitigation**:
- Test Swagger UI "Authorize" button with valid token
- Verify `@PreAuthorize` annotations still enforce RBAC
- Confirm security is NOT disabled in production
- Spring Security configuration should block `/swagger-ui.html` in production (or require authentication)

### Risk 5: Over-Documentation Clutter

**Risk**: Too many `@ApiResponse` entries or verbose descriptions could overwhelm Swagger UI

**Mitigation**:
- Focus on common success/failure cases (200, 201, 400, 401, 404, 500)
- Don't document every possible validation error - rely on field-level `@Schema`
- Keep descriptions concise: 1-2 sentences, not paragraphs
- Use clear tag names and operation summaries for organization

### Trade-off: Development Velocity vs. Documentation Quality

**Trade-off**: Adding comprehensive annotations takes time vs. quick endpoint implementation

**Rationale**:
- Upfront investment: ~2-3 hours per controller for full documentation
- Long-term benefit: Reduced support questions, easier onboarding, better API contract
- Decision: Prioritize high-traffic and complex endpoints first (Cluster, Workload, Pod)

### Trade-off: Swagger UI in Production

**Trade-off**: Swagger UI exposes API surface to public in production

**Decision**: Disable Swagger UI in production or require authentication

**Implementation**:
```java
@ConditionalOnProperty(
    name = "springdoc.api-docs.enabled",
    havingValue = "true"
)
public class OpenApiConfig { ... }
```

- Set `springdoc.api-docs.enabled=false` in production properties
- Or use Spring Security to restrict access: `.requestMatchers("/swagger-ui.html").authenticated()`

## Migration Plan

### Phase 1: Configuration Setup (Day 1)

1. Create `OpenApiConfig.java` in `com.k8smanager.config`
2. Configure OpenAPI metadata: title "K8s Manager API", version "v1.0", description
3. Set up OAuth2 Bearer token security scheme
4. Test Swagger UI at `http://localhost:8080/swagger-ui.html` (should show basic structure)

### Phase 2: DTO Annotation (Days 1-2)

1. Start with common DTOs: `ApiResponse<T>`, base response types
2. Annotate cluster-related DTOs: `ClusterInfoDTO`, `NodeInfoDTO`, `NodeCapacityDTO`
3. Annotate pod-related DTOs: `PodDTO`, `ContainerDTO`, `PodConditionDTO`
4. Annotate workload DTOs: `DeploymentDTO`, `DeploymentStatusDTO`, `DeploymentRevisionDTO`
5. Annotate namespace DTOs: `NamespaceDTO`, `NamespaceQuotaDTO`
6. Verify Swagger UI shows schema details for annotated DTOs

### Phase 3: Controller Annotation (Days 2-3)

1. **ClusterController**: Add `@Tag`, `@Operation` for all endpoints, `@ApiResponse` for common codes
2. **PodController**: Document list, details, delete operations
3. **WorkloadController**: Document deployment CRUD, scale, restart, rollback (complex operations)
4. **ResourceController**: Document generic resource endpoints
5. **MonitoringController**: Document metrics and monitoring endpoints
6. **PodLogController**: Document log streaming endpoints
7. **PodYamlController**: Document YAML operations
8. **TerminalController**: Document WebSocket terminal access
9. **RoleManagementController**: Document RBAC endpoints
10. **UserController**: Document authentication and user management

### Phase 4: Testing & Refinement (Day 3)

1. Access Swagger UI at `/swagger-ui.html` and verify all endpoints appear
2. Test "Authorize" button with valid OAuth2 token
3. Use "Try it out" feature on sample endpoints: `GET /cluster`, `GET /pods`
4. Verify request schemas are populated with examples
5. Check response schemas match actual DTO structure
6. Export OpenAPI JSON from `/v3/api-docs` and validate with online validator
7. Fix any inconsistencies or missing annotations

### Phase 5: Production Hardening (Day 4)

1. Configure `springdoc.api-docs.enabled=false` for production profile
2. Or secure Swagger UI with Spring Security: `.requestMatchers("/swagger-ui.html").authenticated()`
3. Update CI/CD to ensure Swagger UI disabled in production builds
4. Document Swagger UI access for developers (staging/dev only)

### Rollback Strategy

**If Issues Arise**:
- Revert controller annotations: Git checkout on individual controller files
- Revert `OpenApiConfig.java`: Delete configuration class, springdoc uses defaults
- No API behavior changes, so no data migration or version rollback needed
- Swagger UI will revert to minimal auto-generated documentation

**Rollback Verification**:
- Application should start without OpenApiConfig (springdoc provides defaults)
- All endpoints should still work (no behavior changes)
- Test critical API calls to ensure functionality intact

## Open Questions

1. **Swagger UI Access in Production**: Should Swagger UI be completely disabled or just authenticated?
   - *Recommendation*: Disable in production, enable in dev/staging only
   - *Decision needed*: Team consensus on security posture

2. **Example Data Complexity**: How detailed should example objects be for complex DTOs?
   - *Option A*: Minimal examples (just required fields)
   - *Option B*: Realistic examples with optional fields
   - *Recommendation*: Use realistic examples for create operations, minimal for queries

3. **API Versioning**: How to handle future API versions (v1, v2)?
   - *Current*: All endpoints under `/api/v1/`
   - *Future*: May need separate OpenAPI specs per version
   - *Decision needed*: Versioning strategy before v2 endpoints are added

4. **Validation Annotations Integration**: Should we expose Jakarta Validation rules (`@NotNull`, `@NotBlank`) in Swagger UI?
   - *Current*: Springdoc automatically exposes validation constraints
   - *Decision needed*: Verify if manual `@Schema(required = true)` needed or if auto-detection works

5. **Code Review Checklist**: Should we enforce annotation coverage in code reviews?
   - *Suggested*: Add checklist item: "New endpoints must have @Operation, @ApiResponse, @Tag annotations"
   - *Decision needed*: Team approval for process change
