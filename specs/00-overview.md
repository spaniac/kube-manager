# K8s Manager - System Overview

## Project Information

**Project Name**: K8s Manager
**Version**: 1.0.0
**Last Updated**: 2026-02-06
**Status**: Production Ready

---

## Executive Summary

K8s Manager is a comprehensive web-based Kubernetes management platform that provides a unified interface for cluster administration, resource monitoring, workload management, and team collaboration. Built with a modern microservices architecture, it enables DevOps teams to manage Kubernetes clusters efficiently through an intuitive web interface backed by robust APIs.

---

## System Goals

1. **Unified Cluster Management**: Single interface to manage multiple Kubernetes resources and operations
2. **Enhanced Security**: Enterprise-grade RBAC with fine-grained permissions and audit logging
3. **Operational Efficiency**: Streamlined workflows for common operations with templates and automation
4. **Real-time Monitoring**: Comprehensive metrics, logs, and alerting with real-time updates
5. **Developer Experience**: Intuitive UI with powerful user features for advanced workflows
6. **Global Event Bus Architecture**: Unified event-driven communication between modules
7. **Redis Integration**: Distributed session management for horizontal scaling
8. **Unified Search & Filtering**: Cross-resource search with advanced filtering capabilities

---

## Architecture Overview

### High-Level Architecture

```
┌─────────────────────────────────────────────────────┐
│                        Frontend                           │
│                    React + TypeScript                      │
└────────────────────┬────────────────────────────────────────┘
                     │ HTTP/WebSocket
                     ↓
┌─────────────────────────────────────────────────────┐
│                       API Gateway                          │
│                    Spring Boot App                          │
└──────────────────┬──────────┬───────────┬────────────────────┘
        │              │               │
        ↓              ↓               ↓
┌─────────────┐ ┌─────────────┐ ┌──────────────┐
│  Kubernetes │ │ PostgreSQL  │ │  Identity    │
│   Cluster   │ │  Database   │ │   Provider   │
│ (Fabric8)   │ │  (JPA/LB)   │ │  (Keycloak)  │
└─────────────┘ └─────────────┘ └──────────────┘
        │              │               │
        ↓              ↓               ↓
┌───────────────────┐ ┌─────────────┐
│  Redis           │ │ Event Bus     │
│  Session Store   │ │ (Pub/Sub)     │
└───────────────────┘ └─────────────┘
        │              │
        ↓              ↓
┌───────────────────┐ ┌───────────────────────────────────────┐
│ Prometheus     │ │ Metrics + Logs + Traces           │
│ Grafana       │ │ (Real-time Observability Platform)  │
└───────────────────┘ └───────────────────────────────────────┘
```
┌─────────────────────────────────────────────────────┐
│                        Frontend                           │
│                    React + TypeScript                      │
└────────────────────┬────────────────────────────────────────┘
                     │ HTTP/WebSocket
                     ↓
┌─────────────────────────────────────────────────────┐
│                       API Gateway                          │
│                    Spring Boot App                          │
└──────────────────┬──────────┬───────────┬────────────────────┘
        │              │               │
        ↓              ↓               ↓
┌─────────────┐ ┌─────────────┐ ┌──────────────┐
│  Kubernetes │ │ PostgreSQL  │ │  Identity    │
│   Cluster   │ │  Database   │ │   Provider   │
│ (Fabric8)   │ │  (JPA/LB)   │ │  (Keycloak)  │
└─────────────┘ └─────────────┘ └──────────────┘
        │              │               │
        ↓              ↓               ↓
┌───────────────────┐ ┌─────────────┐
│  Redis           │ │ Event Bus     │
│  Session Store   │ │ (Pub/Sub)     │
└───────────────────┘ └─────────────┘
        │              │
        ↓              ↓
┌───────────────┐ ┌───────────────────────────────────────┐
│ Prometheus     │ │ Metrics + Logs + Traces           │
│ Grafana       │ │ (Real-time Observability Platform)  │
└───────────────┘ └───────────────────────────────────────┘
```

### Technology Stack

**Frontend:**
- React 18+ with TypeScript
- Monaco Editor for YAML editing
- Recharts for data visualization
- WebSocket for real-time updates
- TailwindCSS for styling

**Backend:**
- Spring Boot 3.x
- Java 17+
- Fabric8 Kubernetes Client
- Spring Security with OAuth2/OIDC
- WebSocket support

**Database:**
- PostgreSQL 15+
- Liquibase for migrations
- Spring Data JPA

**Integration:**
- Kubernetes API (via Fabric8)
- Prometheus for metrics
- Grafana for dashboards
- Keycloak for identity management
- Slack/PagerDuty for notifications

---

## Platform Services

### Event Bus Architecture
- Event-driven communication pattern between modules
- Event producers and consumers (Pub/Sub)
- Event types: ResourceEvent, AlertEvent, AuditEvent, UserEvent
- Event routing and filtering
- Event retry policies

### Redis Integration for Horizontal Scaling
- Redis Session Store implementation
- Distributed session management (multi-instance support)
- Pub/Sub messaging for real-time synchronization
- Session expiration and cleanup
- Redis Cluster configuration

---

## Core Modules

The core module index below is aligned 1:1 with feature specs `01` through `16`.

### 1. Authentication & User Management
- OAuth2/OIDC integration (Keycloak)
- Multi-provider login support
- Session management and session security
- User profile management
- Remember me and password reset

### 2. Role-Based Access Control (RBAC)
- Predefined and custom roles
- Namespace-scoped and resource-specific permissions
- Temporary role assignments
- Deny policies and conflict resolution

### 3. Cluster Management
- Cluster overview and health
- Node lifecycle management (cordon/uncordon/drain)
- Cluster events and component status
- Resource usage and historical metrics

### 4. Namespace Management
- Namespace CRUD operations
- Resource quota and limit range management
- Namespace templates and locking
- Service accounts and network policies

### 5. Workload Management
- Deployments, StatefulSets, DaemonSets
- Jobs, CronJobs, PodDisruptionBudgets
- Scale/restart/rollback/pause-resume workflows
- Workload creation from YAML and cloning

### 6. Pod Management
- Pod listing and detailed inspection
- Container info, events, and related resources
- YAML viewing and real-time status updates

### 7. Log Explorer
- Real-time log streaming (SSE)
- Multi-pod aggregation and advanced filtering
- Bookmarking, sharing, query history
- JSON parsing, statistics, and external export

### 8. Terminal Emulator
- WebSocket terminal sessions
- Shell/theme/font customization
- Session recording, sharing, and search
- Multi-session and alt-screen (vim/htop/less) support

### 9. Resource Monitoring
- Real-time and historical metrics
- PromQL query execution
- Anomaly detection and alerting
- Metrics export and dashboard integration

### 10. Resource Visualization
- Generic Kubernetes resource browsing
- Status badges and relationship views
- Resource dependency graph
- Label/annotation management and bulk operations

### 11. YAML Editor
- Monaco-based editor with K8s intelligence
- Real-time syntax/schema validation
- Auto-completion, templates, and diff view
- Multi-tab editing and secret-safe handling

### 12. Dashboard
- Cluster overview dashboard
- Custom dashboards and widget library
- Drag-and-drop layout and real-time updates
- Sharing, templates, and import/export

### 13. Alert Notification System
- Threshold-based alert rules
- Multi-channel delivery (Email/Slack/PagerDuty/Webhook)
- Real-time notifications and alert lifecycle management
- Suppression, escalation, preferences, and history

### 14. Advanced Observability Platform
- OpenTelemetry-based telemetry pipeline
- Distributed tracing, centralized logging, and metrics
- Correlation across traces/metrics/logs
- Sampling, exporter configuration, and observability dashboards

### 15. CI/CD & GitOps Integration
- GitLab + GitLab Runner pipeline integration
- Harbor image registry and vulnerability scanning
- ArgoCD-driven GitOps delivery
- Image promotion, drift detection, and multi-environment workflows

### 16. Service Mesh
- Istio/Envoy/Jaeger integration
- Traffic management (canary, blue-green, mirroring)
- Circuit breakers and resilience policies
- mTLS/service-to-service security and topology visualization

---

## API Documentation

### Base URL
- Production: `https://k8s-manager.example.com/api/v1`
- Development: `http://localhost:8080/api/v1`

### Authentication
All API endpoints require authentication via Bearer token:

```http
Authorization: Bearer <access_token>
```

### Response Format
All API responses follow a standard format:

```json
{
  "success": true,
  "message": "Operation completed successfully",
  "data": { ... }
}
```

Error responses:

```json
{
  "success": false,
  "message": "Error description",
  "error": "ERROR_CODE"
}
```

### HTTP Status Codes
- `200 OK` - Successful request
- `201 Created` - Resource created successfully
- `400 Bad Request` - Invalid request data
- `401 Unauthorized` - Missing or invalid authentication
- `403 Forbidden` - Insufficient permissions
- `404 Not Found` - Resource not found
- `429 Too Many Requests` - Rate limit exceeded
- `500 Internal Server Error` - Server error

### Rate Limiting
- Standard endpoints: 100 requests/minute
- Streaming endpoints (logs, terminal): 5 concurrent sessions per user
- Bulk operations: 10 requests/minute

---

## WebSocket Endpoints

### Real-time Notifications
```
ws://localhost:8080/ws/notifications
```

### Terminal Sessions
```
ws://localhost:8080/ws/terminal/{sessionId}
```

### Live Updates
```
ws://localhost:8080/ws/live-updates
```

---

## Database Schema

### Core Tables
- `users` - User accounts and profiles
- `roles` - RBAC roles (predefined and custom)
- `permissions` - Granular permissions
- `role_permissions` - Role-permission mappings
- `user_roles` - User-role assignments (with namespace scope)
- `sessions` - User sessions with OAuth tokens
- `audit_logs` - Comprehensive audit trail
- `dashboards` - Custom dashboard configurations
- `namespace_templates` - Namespace templates
- `log_bookmarks` - Log line bookmarks
- `notifications` - Notification history
- `notification_configs` - Notification channel configurations
- `resource_permissions` - Resource-specific permissions
- `temporary_role_assignments` - Time-limited role assignments
- `deny_policies` - Explicit deny policies
- `terminal_shares` - Shared terminal sessions

See `DATABASE.md` for complete schema documentation.

---

## Security Model

### Authentication Flow

1. User clicks "Login" button
2. Redirects to Keycloak authentication page
3. User authenticates (credentials, MFA, social login)
4. Keycloak redirects back with authorization code
5. Backend exchanges code for access/refresh tokens
6. Access token stored in session
7. Refresh token stored in HttpOnly cookie

### Authorization Flow

1. User makes API request with access token
2. Token validated (signature, expiration)
3. User's roles loaded from database
4. User's permissions resolved (including resource-specific)
5. Permission checked against required authority
6. Deny policies evaluated (explicit deny overrides allow)
7. Request allowed or denied

### RBAC Hierarchy

```
ADMIN (Cluster-wide, no deny policies apply)
├── All permissions (READ, WRITE, DELETE, EXEC, LOGS)
├── All resource types (POD, DEPLOYMENT, NAMESPACE, ALL)
└── Applies to all namespaces

DEVELOPER (Namespace-scoped)
├── READ + WRITE + EXEC + LOGS permissions
├── All resource types
├── Namespace-scoped (must be assigned to specific namespace)
└── Subject to deny policies (e.g., production protection)

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
| JOB | ✓ | ✓ | ✓ | ✗ | ✗ |
| CRONJOB | ✓ | ✓ | ✓ | ✗ | ✗ |
| ALL | ✓ | ✓ | ✓ | ✓ | ✓ |

### Audit Logging

All operations are logged with:
- User who performed action
- Action type (CREATE, READ, UPDATE, DELETE, EXEC, LOGS)
- Resource type and ID
- Old values (for updates)
- New values
- Timestamp
- IP address and user agent
- Result (SUCCESS, FAILURE, ERROR)

Audit log retention: 1 year

---

## Performance Requirements

### Response Time Targets
- Page load: < 2 seconds
- API response: < 200ms (p95)
- WebSocket latency: < 100ms
- Log streaming: < 50ms latency

### Scalability Targets
- Concurrent users: 500+
- Concurrent API requests: 10,000/minute
- Concurrent WebSocket connections: 2,000+
- Cluster resources: Support 1,000+ namespaces, 10,000+ pods

### Data Retention
- Audit logs: 1 year
- Terminal recordings: 7 days
- Metrics data: Configurable (default: 30 days)
- Notification history: 30 days

---

## Deployment Architecture

### Production Environment

```
┌─────────────────────────────────────────────────────┐
│              Load Balancer / Ingress                 │
└────────────────┬────────────────────────────────────┘
                 │
    ┌────────────┴────────────┐
    │                         │
    ↓                         ↓
┌──────────┐            ┌──────────┐
│ Frontend │            │ Backend  │
│  (Nginx) │            │ (Spring  │
│          │            │  Boot)   │
└──────────┘            └─────┬────┘
                              │
                ┌─────────────┼─────────────┐
                ↓             ↓             ↓
         ┌──────────┐ ┌──────────┐ ┌──────────┐
 │PostgreSQL │  │Keycloak │ │Prometheus│
 └──────────┘ └──────────┘ └──────────┘
```

### Container Orchestration
- Deployment: Kubernetes (managed on EKS, GKE, or AKS)
- Database: PostgreSQL (RDS, Cloud SQL, or Azure Database)
- Cache: Redis (ElastiCache, Memorystore, or Azure Cache)
- Object Storage: S3, GCS, or Azure Blob Storage

### High Availability
- Application: 3 replicas across multiple zones
- Database: Multi-AZ deployment with read replicas
- Load Balancer: Cross-zone load distribution
- Failover: Automatic health checks and restarts

---

## Monitoring & Observability

### Metrics Collection
- Application metrics: Spring Actuator + Micrometer
- Kubernetes metrics: Metrics Server + Prometheus
- Custom metrics: Business metrics exposed via Prometheus

### Logging
- Application logs: Structured JSON logs
- Kubernetes logs: Centralized in Loki/ELK
- Audit logs: Stored in PostgreSQL

### Tracing
- Distributed tracing: OpenTelemetry
- Backend traces: Jaeger or Zipkin

### Health Checks
- Liveness probe: `/actuator/health/liveness`
- Readiness probe: `/actuator/health/readiness`
- Kubernetes health: Cluster connectivity check

---

## Documentation Structure

This specification is organized into the following documents (overview + 16 aligned core modules):

1. **00-overview.md** (This file) - System overview and cross-module architecture
2. **01-authentication.md** - Authentication and user management
3. **02-rbac.md** - Role-based access control
4. **03-cluster-management.md** - Cluster management APIs
5. **04-namespace-management.md** - Namespace lifecycle, quotas, templates, and policies
6. **05-workload-management.md** - Workload orchestration (Deployments, StatefulSets, DaemonSets, Jobs, CronJobs, PDBs)
7. **06-pod-management.md** - Pod operations and real-time pod insights
8. **07-log-explorer.md** - Log streaming, filtering, aggregation, and export
9. **08-terminal-emulator.md** - Web terminal sessions and session lifecycle controls
10. **09-resource-monitoring.md** - Metrics, PromQL, anomaly detection, and alerting
11. **10-resource-visualization.md** - Unified resource views and dependency graph visualization
12. **11-yaml-editor.md** - Kubernetes YAML authoring, validation, and template tooling
13. **12-dashboard.md** - Dashboard and widget management
14. **13-notifications.md** - Alert notification rules, channels, and delivery workflows
15. **14-advanced-observability.md** - OpenTelemetry-based advanced observability platform
16. **15-cicd-gitops.md** - CI/CD and GitOps integration (GitLab, Harbor, ArgoCD)
17. **16-service-mesh.md** - Service mesh traffic, resilience, and secure service communication

---

## Glossary

- **RBAC**: Role-Based Access Control
- **K8s**: Kubernetes
- **SSE**: Server-Sent Events
- **PVC**: Persistent Volume Claim
- **PDB**: Pod Disruption Budget
- **JWT**: JSON Web Token
- **OIDC**: OpenID Connect
- **MFA**: Multi-Factor Authentication
- **PromQL**: Prometheus Query Language

---

## Changelog

### Version 1.0.0 (2026-02-06)
- Initial release
- Complete feature set including all Phase 1-5 implementations
- Full RBAC support with advanced features
- YAML Editor with Monaco integration
- Terminal emulator with themes and recording
- Log explorer with aggregation and sharing
- Custom dashboards with widget builder
- Alert notification system with multiple channels
- Authentication enhancements (remember me, password reset, multi-provider)
- Advanced observability platform with OpenTelemetry integration
- CI/CD & GitOps integration with GitLab, Harbor, and ArgoCD
- Service mesh management with traffic control and mTLS support

---

## Contact & Support

- **Documentation**: https://k8s-manager.example.com/docs
- **API Documentation**: https://k8s-manager.example.com/swagger-ui
- **Issues**: https://github.com/example/k8s-manager/issues
- **Support**: support@k8s-manager.example.com
