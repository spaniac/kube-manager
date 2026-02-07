## ADDED Requirements

### Requirement: Swagger UI accessibility
The system SHALL provide interactive Swagger UI accessible at `/swagger-ui.html` for viewing and testing API documentation.

#### Scenario: Access Swagger UI
- **WHEN** developer or API consumer navigates to `/swagger-ui.html`
- **THEN** system displays interactive API documentation interface with all endpoints

#### Scenario: Access Swagger UI in development environment
- **WHEN** application runs in development or staging profile
- **THEN** Swagger UI is accessible and shows complete API documentation

### Requirement: OpenAPI JSON specification endpoint
The system SHALL provide OpenAPI 3.0.0 JSON specification at `/v3/api-docs` for programmatic access to API contract.

#### Scenario: Retrieve OpenAPI specification
- **WHEN** API client or tool requests `/v3/api-docs`
- **THEN** system returns complete OpenAPI 3.0.0 JSON specification

### Requirement: OpenAPI configuration
The system SHALL configure OpenAPI metadata including API title, version, description, and contact information.

#### Scenario: View OpenAPI metadata
- **WHEN** user views API documentation in Swagger UI
- **THEN** system displays API title "K8s Manager API", version "v1.0", and description

#### Scenario: View contact information
- **WHEN** user views API documentation
- **THEN** system provides contact information for API support

### Requirement: Security scheme configuration
The system SHALL configure OAuth2 Bearer token security scheme in OpenAPI specification for authenticated endpoints.

#### Scenario: Authorize via Swagger UI
- **WHEN** user clicks "Authorize" button in Swagger UI
- **THEN** system displays Bearer token input field and accepts OAuth2 access token

#### Scenario: Test authenticated endpoint
- **WHEN** user provides valid Bearer token and calls protected endpoint via Swagger UI
- **THEN** system authenticates request and returns expected response

### Requirement: Controller-level documentation
The system SHALL annotate all REST controller classes with `@Tag` to group endpoints by functional modules.

#### Scenario: View endpoints grouped by module
- **WHEN** user opens Swagger UI
- **THEN** system displays endpoints organized by functional modules (Cluster Management, Pod Management, etc.)

#### Scenario: View module descriptions
- **WHEN** user views a module group in Swagger UI
- **THEN** system shows module name and description for each functional area

### Requirement: Operation-level documentation
The system SHALL annotate all REST controller methods with `@Operation` to provide summary, description, and tags.

#### Scenario: View endpoint summary
- **WHEN** user expands an endpoint in Swagger UI
- **THEN** system displays operation summary and description

#### Scenario: View endpoint details
- **WHEN** user views endpoint documentation
- **THEN** system shows HTTP method, path, description, and parameters

### Requirement: Response documentation
The system SHALL annotate all endpoints with `@ApiResponse` to document success and error response codes.

#### Scenario: View successful response
- **WHEN** user calls successful endpoint (200, 201)
- **THEN** system displays response schema and description for success status code

#### Scenario: View error response
- **WHEN** endpoint returns error (400, 401, 403, 404, 500)
- **THEN** system displays error response schema using ProblemDetail format with description

### Requirement: Request parameter documentation
The system SHALL annotate all path variables, query parameters, and request bodies with `@Parameter` and `@RequestBody`.

#### Scenario: View required parameters
- **WHEN** user views endpoint with required parameters
- **THEN** system marks parameters as required and shows their types and descriptions

#### Scenario: View optional parameters
- **WHEN** user views endpoint with optional parameters
- **THEN** system indicates optional status and provides default values if specified

#### Scenario: View request body schema
- **WHEN** endpoint accepts request body (POST, PUT)
- **THEN** system displays complete request body schema with field types and validation rules

### Requirement: DTO schema documentation
The system SHALL annotate all data transfer objects (DTOs) with `@Schema` to document field types, descriptions, and constraints.

#### Scenario: View DTO field types
- **WHEN** user views request or response schema
- **THEN** system displays field types (String, Integer, Boolean, etc.) for all fields

#### Scenario: View field descriptions
- **WHEN** user views DTO schema
- **THEN** system provides descriptive text for each field explaining its purpose

#### Scenario: View validation constraints
- **WHEN** DTO field has Jakarta Validation annotations (@NotNull, @NotBlank, @Min, @Max)
- **THEN** system exposes validation constraints in schema (required flag, min/max values)

#### Scenario: View nested object schemas
- **WHEN** DTO contains nested objects or arrays
- **THEN** system displays complete schema hierarchy with inline expansion of nested types

### Requirement: Example data provision
The system SHALL provide example request and response values using `@ExampleObject` for complex DTOs and `@Schema(example = "...")` for simple fields.

#### Scenario: Try out endpoint with example
- **WHEN** user clicks "Try it out" in Swagger UI
- **THEN** system pre-fills request with example values from annotations

#### Scenario: View example response
- **WHEN** user views endpoint documentation
- **THEN** system displays example response matching actual API response structure

#### Scenario: Complex operation examples
- **WHEN** user creates or updates resource (deployment, namespace, pod)
- **THEN** system provides realistic example showing all relevant fields

### Requirement: Cluster management API documentation
The system SHALL document all cluster management endpoints including cluster overview, nodes, health, events, and metrics.

#### Scenario: View cluster endpoints
- **WHEN** user expands Cluster Management module in Swagger UI
- **THEN** system lists GET /cluster, GET /cluster/nodes, GET /cluster/nodes/{name}, POST /cluster/nodes/{name}/cordon, POST /cluster/nodes/{name}/uncordon, POST /cluster/nodes/{name}/drain

#### Scenario: View cluster health documentation
- **WHEN** user views GET /cluster/health endpoint
- **THEN** system shows response schema with health status and component list

### Requirement: Namespace management API documentation
The system SHALL document all namespace management endpoints including CRUD operations and quota management.

#### Scenario: View namespace endpoints
- **WHEN** user expands Namespace Management module
- **THEN** system lists GET /namespaces, GET /namespaces/{name}, POST /namespaces, PUT /namespaces/{name}, DELETE /namespaces/{name}

#### Scenario: View namespace creation documentation
- **WHEN** user views POST /namespaces endpoint
- **THEN** system shows request body schema with name, labels, annotations, resourceQuotas, and limitRanges

### Requirement: Resource management API documentation
The system SHALL document generic resource endpoints for pods, deployments, services, ConfigMaps, secrets, StatefulSets, DaemonSets, jobs, and CronJobs.

#### Scenario: View generic resource endpoints
- **WHEN** user expands Resource Visualization module
- **THEN** system lists GET /resources/{type}, GET /resources/{type}/{name}, PUT /resources/{type}/{name}, DELETE /resources/{type}/{name}

#### Scenario: View resource filtering documentation
- **WHEN** user views GET /resources/{type} endpoint
- **THEN** system shows query parameters for namespace, labelSelector, sortField, sortOrder, page, and pageSize

### Requirement: Workload management API documentation
The system SHALL document all workload management endpoints for deployments including CRUD, scaling, restart, rollback, image update, strategy update, resource update, environment variable update, pause, and resume operations.

#### Scenario: View deployment endpoints
- **WHEN** user expands Workload Management module
- **THEN** system lists GET /workloads/deployments, POST /workloads/deployments, DELETE /workloads/deployments/{namespace}/{name}

#### Scenario: View deployment operations documentation
- **WHEN** user views deployment-specific endpoints
- **THEN** system shows PUT /workloads/deployments/{namespace}/{name}/scale, POST /workloads/deployments/{namespace}/{name}/restart, POST /workloads/deployments/{namespace}/{name}/rollback

### Requirement: Pod management API documentation
The system SHALL document all pod management endpoints including listing, details, and deletion.

#### Scenario: View pod endpoints
- **WHEN** user expands Pod Management module
- **THEN** system lists GET /pods, GET /pods/{namespace}/{name}, DELETE /pods/{namespace}/{name}

#### Scenario: View pod filtering documentation
- **WHEN** user views GET /pods endpoint
- **THEN** system shows query parameters for namespace, labelSelector, status, page, and pageSize

### Requirement: Resource monitoring API documentation
The system SHALL document metrics and monitoring endpoints for pods, nodes, and cluster resources.

#### Scenario: View monitoring endpoints
- **WHEN** user expands Resource Monitoring module
- **THEN** system lists GET /metrics/pods/{namespace}/{name} and related metrics endpoints

#### Scenario: View metrics response documentation
- **WHEN** user views metrics endpoint
- **THEN** system shows response schema with CPU, memory, network, and storage metrics

### Requirement: Log explorer API documentation
The system SHALL document log streaming and filtering endpoints for pods.

#### Scenario: View log explorer endpoints
- **WHEN** user expands Log Explorer module
- **THEN** system lists log streaming endpoints with parameters for namespace, pod name, container name, and filters

#### Scenario: View log filtering documentation
- **WHEN** user views log endpoint
- **THEN** system shows query parameters for tail lines, follow flag, timestamps, and text search

### Requirement: Terminal emulator API documentation
The system SHALL document WebSocket-based terminal access endpoints.

#### Scenario: View terminal endpoints
- **WHEN** user expands Terminal Emulator module
- **THEN** system documents WebSocket endpoints for attaching to container shells

#### Scenario: View terminal parameters documentation
- **WHEN** user views terminal endpoint
- **THEN** system shows required parameters: namespace, pod name, container name, and optional command shell

### Requirement: YAML editor API documentation
The system SHALL document YAML validation and application endpoints for Kubernetes resources.

#### Scenario: View YAML editor endpoints
- **WHEN** user expands YAML Editor module
- **THEN** system lists endpoints for validating YAML schemas and applying resources to cluster

#### Scenario: View YAML validation documentation
- **WHEN** user views YAML validation endpoint
- **THEN** system shows request body schema for YAML content and validation rules

### Requirement: RBAC API documentation
The system SHALL document role-based access control endpoints for managing roles and permissions.

#### Scenario: View RBAC endpoints
- **WHEN** user expands Role-Based Access Control module
- **THEN** system lists endpoints for listing, creating, updating, and deleting roles and permissions

#### Scenario: View role assignment documentation
- **WHEN** user views role assignment endpoints
- **THEN** system shows request schema for assigning users to roles with namespace and resource permissions

### Requirement: User authentication API documentation
The system SHALL document authentication and user management endpoints including OAuth2 integration and token management.

#### Scenario: View authentication endpoints
- **WHEN** user expands User Authentication module
- **THEN** system documents OAuth2 endpoints for login, token refresh, and logout

#### Scenario: View user profile documentation
- **WHEN** user views user management endpoints
- **THEN** system shows endpoints for retrieving and updating user profile information

### Requirement: Production security
The system SHALL disable or restrict Swagger UI access in production environment.

#### Scenario: Swagger UI disabled in production
- **WHEN** application runs in production profile
- **THEN** system returns 404 or 403 for `/swagger-ui.html` endpoint

#### Scenario: Swagger UI authenticated in production
- **WHEN** production environment allows Swagger UI access with authentication
- **THEN** system requires valid authentication before displaying Swagger UI interface

### Requirement: API response structure documentation
The system SHALL document standard API response structure used across all endpoints.

#### Scenario: View success response schema
- **WHEN** user views any successful endpoint response
- **THEN** system shows ApiResponse<T> schema with success, data, and message fields

#### Scenario: View error response schema
- **WHEN** user views error endpoint response
- **THEN** system shows error response with success (false), error (ProblemDetail), and message fields
