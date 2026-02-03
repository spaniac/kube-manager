## Context

**Background**: We need a web-based Kubernetes management tool to replace KubeSphere, which discontinued its free version. Most alternatives are paid solutions that are difficult to adopt.

**Current State**: This is a greenfield project starting from scratch. The target deployment is a single Kubernetes cluster within our company infrastructure.

**Constraints**:
- Must work with OAuth2/OIDC authentication
- Must deploy as an in-cluster service using ServiceAccount/ClusterRole
- Must integrate with existing Prometheus + Grafana stack
- Team has strong K8s expertise, so we can leverage advanced features
- Deployment target is Java 21 with Spring Boot 3.5.9

**Stakeholders**:
- DevOps team: Primary users for cluster management
- Developers: Access to namespace-level resources, deployments, logs
- Administrators: RBAC configuration, user management, audit logs

## Goals / Non-Goals

**Goals**:
- Provide a comprehensive K8s management interface comparable to KubeSphere
- Support all core resource types: pods, services, deployments, statefulsets, daemonsets, configmaps, secrets
- Enable real-time monitoring via Prometheus integration
- Provide secure RBAC with OAuth2/OIDC authentication
- Offer web-based terminal for pod access
- Support YAML editing with validation
- Enable log exploration and search across namespaces
- Allow workload deployment, scaling, and updates
- Manage namespaces with resource quotas

**Non-Goals** (see Future Considerations section):
- Multi-cluster management (single cluster scope)
- Application marketplace or helm chart management (initially - see Future Considerations)
- CI/CD pipeline integration (out of scope - see Future Considerations)
- Custom resource definition (CRD) management (standard resources only - see Future Considerations)
- Advanced networking (CNI/ingress) configuration (see Future Considerations)
- K8s version upgrades or cluster lifecycle management (see Future Considerations)

## Decisions

### Frontend Architecture: React + TypeScript + Vite

**Choice**: React 18+ with TypeScript and Vite as build tool

**Rationale**:
- React ecosystem has excellent K8s UI component libraries (kubernetes-client/javascript, react-k8s)
- TypeScript provides type safety for complex K8s resource structures
- Vite offers fast development experience and optimized production builds
- Team familiarity with React for SPA development
- Excellent charting libraries (Recharts, Chart.js) for metrics visualization

**Alternatives Considered**:
- Vue 3: Good but smaller ecosystem for K8s-specific libraries
- Angular: Overly opinionated, steeper learning curve for team

### Backend Architecture: Spring Boot 3.5.9

**Choice**: Spring Boot 3.5.9 with Java 21

**Rationale**:
- Mature, enterprise-grade framework with strong community support
- Excellent Spring Security integration for OAuth2/OIDC
- Fabric8 Kubernetes client provides comprehensive K8s API bindings
- JPA/Hibernate for PostgreSQL data access
- Spring Actuator for health checks and metrics
- Virtual threads (Java 21) for better concurrency with K8s API calls

**Alternatives Considered**:
- Node.js: Good K8s client but team prefers Java
- Go: Native K8s support but would require new skillset
- Python: FastAPI is good but less enterprise experience

### K8s Client Integration: Fabric8 Kubernetes Java Client

**Choice**: Fabric8 Kubernetes Java Client v6.x

**Rationale**:
- Official Spring Boot starter support (spring-boot-starter-kubernetes-fabric8)
- Full K8s API coverage including CRDs
- Automatic retry and rate limiting
- Strong Spring integration (auto-configuration, metrics, health checks)
- Proven production stability

**Alternatives Considered**:
- Official Java K8s client: Less feature-complete
- Direct HTTP calls: Too much boilerplate, error handling

### Authentication: Spring Security OAuth2 Resource Server + Keycloak

**Choice**: OAuth2/OIDC with Keycloak as identity provider

**Rationale**:
- Spring Security OAuth2 Resource Server has built-in support
- Keycloak provides user management, role mapping, and session handling
- Standard OAuth2/OIDC protocol allows future provider changes
- Supports multiple providers (Google, GitHub, etc.) if needed
- Fine-grained token-based authorization

**Flow**:
1. Frontend redirects to Keycloak login
2. Keycloak returns ID + access tokens (JWT)
3. Frontend sends access token in Authorization header
4. Spring validates token and extracts roles/groups
5. Backend enforces RBAC based on token claims

### Database: PostgreSQL 15+ with JPA

**Choice**: PostgreSQL with Spring Data JPA

**Rationale**:
- ACID compliance for audit log integrity
- JSONB support for flexible RBAC policy storage
- Excellent Spring Data JPA integration
- Strong performance for relational queries
- Proven reliability for production workloads

**Schema**:
- `users`: User profiles (email, name, created_at)
- `roles`: Predefined roles (admin, developer, viewer)
- `permissions`: Fine-grained permissions (read, write, delete per resource type)
- `role_permissions`: Many-to-many mapping
- `user_roles`: User-role assignments (may sync from Keycloak groups)
- `audit_logs`: All CRUD operations for compliance
- `sessions`: Active session tracking

### Real-time Communication: Server-Sent Events (SSE)

**Choice**: Spring WebFlux SSE for real-time updates

**Rationale**:
- Efficient for one-way data streaming (server → client)
- Simpler than WebSockets for K8s event watching
- Native browser support
- Works well with React components using EventSource
- Automatic reconnection on network issues

**Use Cases**:
- Pod status updates
- Real-time metrics from Prometheus
- Log streaming from pods
- K8s event notifications

### Terminal Emulator: xterm.js + WebSocket

**Choice**: xterm.js for frontend, WebSocket backend with exec API

**Rationale**:
- xterm.js is industry standard for web terminals
- Full VT100/VT220 emulation
- Works with K8s exec API through WebSocket upgrade
- Proven in similar tools (KubeSphere, Lens, k9s)

**Implementation**:
- Spring WebSocket handler upgrades HTTP to WebSocket
- Connects to K8s pod exec API
- Streams stdin/stdout/stderr through WebSocket
- Handles terminal resize signals

### Monitoring Integration: Prometheus + Grafana

**Choice**: Direct Prometheus API queries + Grafana iframe embedding

**Rationale**:
- Existing Prometheus + Grafana deployment
- Prometheus HTTP API for metric queries
- Grafana dashboards can be embedded via iframe
- Avoid duplicating monitoring logic
- Leverage existing alerts and rules

**Implementation**:
- Backend queries Prometheus API for metrics
- Frontend displays using Recharts
- Embed Grafana dashboards for complex views
- Cache metric responses to reduce load

### Architecture Pattern: Microservices with Monolith Option

**Choice**: Monolithic Spring Boot application with modular design

**Rationale**:
- Single application simplifies deployment (one Pod)
- K8s resources are managed through single service account
- Database access is simpler without distributed transactions
- Can split into microservices later if needed
- Team size doesn't warrant microservices complexity

**Module Structure**:
- `api` module: REST controllers
- `service` module: Business logic, K8s operations
- `security` module: Auth, RBAC
- `monitoring` module: Prometheus integration
- `logging` module: Log aggregation
- `persistence` module: Database access
- `audit` module: Audit logging

### Frontend State Management: React Query + Zustand

**Choice**: React Query for server state, Zustand for UI state

**Rationale**:
- React Query excels at caching, invalidation, and refetching K8s resources
- Automatic background updates perfect for K8s watches
- Zustand is simple and lightweight for UI state
- Reduces boilerplate compared to Redux

### API Design: RESTful + SSE for Real-time

**Choice**: REST for CRUD, SSE for streams

**Rationale**:
- REST is well-understood and cacheable
- SSE for real-time data (pod logs, metrics, events)
- Consistent with Spring MVC patterns
- Easy to document with OpenAPI/Swagger

**API Structure**:
```
/api/v1/cluster              - Cluster overview, health
/api/v1/namespaces           - Namespace CRUD
/api/v1/resources/{type}    - Generic resource CRUD
/api/v1/workloads            - Deployments, StatefulSets
/api/v1/pods/{id}/logs       - Pod logs (stream via SSE)
/api/v1/pods/{id}/exec       - Terminal (WebSocket)
/api/v1/metrics              - Prometheus metrics
/api/v1/audit-logs           - Audit log queries
```

### Deployment: Kubernetes Deployment + Service + Ingress

**Choice**: Single Deployment with 2-3 replicas for HA

**Rationale**:
- Spring Boot is stateless (OAuth2 sessions in memory initially)
- Horizontal Pod Autoscaler for scaling
- LoadBalancer Service type for external access
- Ingress for path-based routing and SSL termination
- ConfigMap for configuration, Secret for credentials

**RBAC**:
- `ServiceAccount` named `k8s-manager`
- `ClusterRole` with permissions to manage all resources
- `ClusterRoleBinding` binds SA to ClusterRole
- Fine-grained RBAC in application layer (not just K8s RBAC)

### Session Storage Strategy: In-Memory with Future Redis Option

**Choice**: In-memory session storage for MVP, Redis for horizontal scaling

**Rationale**:
- Memory storage is sufficient for 2-3 replicas (no sticky sessions needed)
- Simple configuration, no additional infrastructure for MVP
- Redis can be added later if scaling beyond 3 replicas or requiring session persistence
- Spring Session abstraction allows seamless switch to Redis with configuration change

**Implementation**:
- Use Spring Session with default in-memory repository
- Store OAuth2 access tokens and refresh tokens in memory
- Session timeout: 30 minutes (configurable)
- If adding Redis: Switch to Spring Data Redis session repository

**When to Add Redis**:
- Horizontal scaling beyond 3 replicas
- Need for session persistence across pod restarts
- Session analytics or monitoring requirements

### Namespace Visibility: RBAC-Based Filtering

**Choice**: Filter namespaces by user RBAC permissions

**Rationale**:
- Security by default - users only see what they have access to
- Reduces noise and improves UX for developers
- Enforces principle of least privilege
- Consistent with K8s RBAC model

**Implementation**:
- Backend filters namespaces based on user's role permissions
- Roles:
  - `admin`: Can see all namespaces
  - `developer`: Can only see namespaces they have access to (via RBAC)
  - `viewer`: Can only view namespaces with read access
- Frontend requests filtered list from backend
- Clear UI indication when access is restricted

### Log Retention Strategy: Direct K8s API Queries

**Choice**: Query pod logs directly from K8s API, don't store in database

**Rationale**:
- K8s API handles log rotation and retention natively
- Avoid database bloat and storage costs
- Real-time logs always available from source
- Audit logs track access patterns without storing full log content

**Implementation**:
- Backend streams pod logs from K8s API via SSE to frontend
- Log explorer searches K8s API with filters (labels, timestamps, keywords)
- Audit log records: user, timestamp, pod, action (e.g., "viewed logs for pod X")
- No persistent log storage in PostgreSQL
- Optional: Configure log retention at K8s cluster level (via logging operator)

### YAML Validation: K8s API Validate Endpoint

**Choice**: Use K8s API server's `validate` endpoint for schema validation

**Rationale**:
- Always uses current K8s API schema (no stale local schemas)
- Validates against live cluster configuration (CRDs, admission controllers)
- Returns detailed, contextual error messages
- Supports custom validation rules configured in cluster

**Implementation**:
- Frontend sends YAML to backend
- Backend creates a `dry-run` pod/deployment resource
- Calls K8s API `validate` endpoint with `dryRun: All`
- Returns validation errors to frontend
- Client-side basic syntax validation for fast feedback
- Server-side full validation for accuracy

### RBAC: Fine-Grained Permissions with Role Mappings

**Choice**: Role-based permissions with namespace-level scoping

**Rationale**:
- Matches K8s RBAC model users are familiar with
- Granular control per resource type (pods, deployments, services, etc.)
- Supports multi-tenant isolation
- Can sync with Keycloak groups for automated role assignment

**Permission Model**:
- **Resource Types**: pods, deployments, statefulsets, services, configmaps, secrets, namespaces
- **Actions**: read, write, delete, exec, logs
- **Scopes**: cluster-wide (admin), namespace-specific (developer/viewer)
- **Default Roles**:
  - `admin`: Full cluster access (all resources, all namespaces, all actions)
  - `developer`: Namespace access (pods, deployments, services, configmaps in assigned namespaces)
  - `viewer`: Read-only access to assigned namespaces

**Implementation**:
- PostgreSQL stores role-permission mappings
- JWT claims include role and namespace access list
- Backend checks permissions before K8s API calls
- Frontend UI respects permissions (hide/gray out unavailable actions)

## Risks / Trade-offs

### Risk 1: Complexity of K8s API Wrapping
**Risk**: K8s API is vast; wrapping all resources is error-prone
**Mitigation**: Start with core resources (pods, deployments, services), add others incrementally. Use Fabric8's type-safe client. Write comprehensive integration tests.

### Risk 2: Real-time Performance
**Risk**: Multiple SSE connections could overwhelm backend
**Mitigation**: Implement connection pooling, rate limiting, and backpressure. Use efficient serialization (JSON with minimal fields). Cache aggregated metrics.

### Risk 3: Security of In-cluster Service Account
**Risk**: Compromised pod has full cluster access
**Mitigation**: Principle of least privilege (narrow ClusterRole), network policies, audit logging, regular credential rotation. Consider separate management cluster in future.

### Risk 4: Token Management in Frontend
**Risk**: JWT tokens stored in browser can be stolen via XSS
**Mitigation**: Use HttpOnly cookies with CSRF protection, short token expiration, refresh token rotation, Content Security Policy headers.

### Risk 5: Spring Boot Memory Footprint
**Risk**: Java applications have higher memory requirements
**Mitigation**: Use JVM tuning (G1GC), container limits, pod disruption budgets for graceful restarts. Monitor memory usage and optimize.

### Trade-off 1: Monolith vs Microservices
**Chose**: Monolith
**Trade-off**: Easier deployment and testing vs harder to scale individual components
**Rationale**: Team size and current needs don't warrant microservices complexity. Can split later if needed.

### Trade-off 2: Generic Resource API vs Type-specific APIs
**Chose**: Mix of both (generic + convenience endpoints)
**Trade-off**: Generic is flexible but less type-safe; specific is verbose but clearer
**Rationale**: Generic API for extensibility, specific APIs for common resources (deployments, pods) for better DX.

### Trade-off 3: Direct K8s API vs Caching Layer
**Chose**: Direct K8s API with React Query caching
**Trade-off**: Caching reduces K8s API load but adds complexity and stale data risk
**Rationale**: K8s API is designed for high read throughput. React Query handles frontend caching well. Backend caching can be added if needed.

## Migration Plan

### Phase 1: Core Infrastructure (Weeks 1-2)
1. Set up Spring Boot project with required dependencies
2. Configure OAuth2/OIDC with Keycloak
3. Implement K8s client integration (in-cluster mode)
4. Set up PostgreSQL database schema
5. Implement basic RBAC (admin, developer, viewer roles)
6. Deploy to test K8s cluster

**Success Criteria**: Backend authenticates users, connects to K8s, reads cluster info

### Phase 2: Core Resource Management (Weeks 3-4)
1. Implement namespace CRUD operations
2. Implement pod listing and details
3. Implement deployment/statefulset operations
4. Add basic frontend routing and layout
5. Create dashboard overview page

**Success Criteria**: Users can view and manage namespaces, pods, deployments

### Phase 3: Workload Management (Weeks 5-6)
1. Implement YAML editor with K8s schema validation
2. Add workload deployment (create from YAML)
3. Implement scaling and update operations
4. Add resource monitoring (CPU/memory usage)

**Success Criteria**: Users can deploy applications, scale workloads

### Phase 4: Observability (Weeks 7-8)
1. Integrate Prometheus metrics
2. Implement log explorer with SSE streaming
3. Add real-time pod metrics
4. Embed Grafana dashboards

**Success Criteria**: Users can view metrics, search logs, access Grafana

### Phase 5: Advanced Features (Weeks 9-10)
1. Implement web-based terminal (xterm.js)
2. Add configmap/secret management
3. Implement audit logging
4. Add notification system (alerts)

**Success Criteria**: Full feature parity with initial requirements

### Rollback Strategy
- Database migrations use Flyway/Liquibase with rollback scripts
- Application can roll back to previous deployment version
- K8s resources modified by app are tracked in audit logs for manual rollback
- ConfigMaps/Secrets versioned in Git

## Future Considerations

Features and enhancements that are out of scope for MVP but may be considered in future releases:

### Custom Resource Definitions (CRDs)
**Priority**: Medium
**Effort**: High
**Description**: Add support for managing custom resources defined by CRDs
**Considerations**:
- Requires dynamic schema discovery and generation
- Need custom editors for CRD-specific fields
- Should validate against CRD validation schemas
- May need per-CRD UI components for complex resources

**When to Add**: After core features are stable and there's business demand for specific CRDs (e.g., Prometheus CRDs, Cert-Manager CRDs)

### Helm Chart Management
**Priority**: Medium
**Effort**: High
**Description**: Integrate Helm for application deployment and management
**Considerations**:
- Need Helm 3 integration with backend
- Support for chart repositories (local and remote)
- Chart installation, upgrade, rollback, and uninstall operations
- Values editor with validation against chart schema
- Release history and status tracking

**When to Add**: When manual YAML deployment becomes cumbersome or team adopts Helm for production deployments

### Multi-Cluster Management
**Priority**: Low
**Effort**: Very High
**Description**: Manage multiple Kubernetes clusters from single interface
**Considerations**:
- Requires cluster discovery and authentication per cluster
- Need cluster-level RBAC and isolation
- Cross-cluster resource search and aggregation
- Cluster health comparison dashboard
- Potential need for management cluster architecture

**When to Add**: When managing multiple clusters becomes a operational requirement

### CI/CD Pipeline Integration
**Priority**: Low
**Effort**: High
**Description**: Integrate with CI/CD systems for automated deployments
**Considerations**:
- Support for Jenkins, GitLab CI, GitHub Actions, ArgoCD
- Pipeline status visualization
- Deployment history linking to CI/CD runs
- Approval workflows for production deployments
- Rollback triggers from pipeline failures

**When to Add**: When team needs tighter integration between K8s management and deployment automation

### Advanced Networking
**Priority**: Low
**Effort**: High
**Description**: Manage CNI plugins, ingress controllers, network policies
**Considerations**:
- Complex network topology visualization
- CNI-specific configuration (Calico, Flannel, Cilium)
- Ingress resource management with route discovery
- Network policy rule builder
- Service mesh integration (Istio, Linkerd)

**When to Add**: When network configuration becomes a frequent operational task

### Cluster Lifecycle Management
**Priority**: Low
**Effort**: Very High
**Description**: Manage K8s cluster upgrades, node management, cluster configuration
**Considerations**:
- Requires cluster admin permissions beyond typical management
- Node pool management, autoscaling configuration
- K8s version upgrade planning and execution
- Cluster backup and disaster recovery
- Cluster tuning and optimization recommendations

**When to Add**: Only if team takes over cluster operations responsibilities

### Alertmanager Integration
**Priority**: Medium (already in Phase 5)
**Effort**: Medium
**Description**: Integrate with Alertmanager for notification routing and silencing
**Considerations**:
- Already planned for Phase 5
- Need alert aggregation and deduplication
- Notification channel configuration (Slack, email, PagerDuty)
- Alert history and trend analysis
- Alert silence and acknowledgment workflows

**When to Add**: Phase 5 (Weeks 9-10)

### Application Marketplace
**Priority**: Low
**Effort**: High
**Description**: Pre-packaged application templates and charts
**Considerations**:
- Requires curated application catalog
- Version management and security scanning
- Dependency resolution
- Template customization interface
- Similar to KubeSphere app store concept

**When to Add**: When managing standard applications becomes repetitive and time-consuming

### Redis Session Storage
**Priority**: Medium
**Effort**: Low
**Description**: Migrate from in-memory to Redis for session storage
**Considerations**:
- Triggers: Scaling beyond 3 replicas, session persistence needed
- Configuration change only (Spring Session abstraction)
- Need Redis deployment and HA configuration
- Session backup and restore for disaster recovery

**When to Add**: When scaling requirements indicate the need (see "Session Storage Strategy" section)

### Enhanced Observability
**Priority**: Medium
**Effort**: Medium
**Description**: Deeper integration with monitoring, logging, tracing stacks
**Considerations**:
- Distributed tracing integration (Jaeger, Zipkin)
- Log aggregation and analysis (ELK stack, Loki)
- Metrics retention and long-term trend analysis
- Custom dashboard builder
- Anomaly detection and alerting

**When to Add**: When basic Prometheus integration isn't sufficient for operational needs

### Backup and Restore
**Priority**: Low
**Effort**: High
**Description**: Backup K8s resources and application state
**Considerations**:
- Velero or similar backup solution integration
- Scheduled backup policies
- Backup verification and testing
- Point-in-time restore capabilities
- Application-specific backup strategies (e.g., database dumps)

**When to Add**: When data loss prevention becomes a critical requirement