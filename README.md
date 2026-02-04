# K8s Manager

Web-based Kubernetes management tool similar to KubeSphere.

## Structure

```
kube-manager/
├── apps/
│   ├── backend/       # Spring Boot 3.5.9 + Java 21
│   │   └── k8s/      # Kubernetes manifests and deployment scripts
│   └── frontend/      # React 18.2 + TypeScript 5.3 + Vite 5.0
├── openspec/        # OpenSpec artifacts and specifications
├── .git/
├── DEPLOYMENT.md            # Comprehensive deployment guide
├── TROUBLESHOOTING.md      # Troubleshooting procedures
├── CONTRIBUTING.md         # Contribution guidelines
├── PRODUCTION_CHECKLIST.md # Production readiness checklist
└── README.md
```

## Documentation

- [API Documentation](API.md) - Complete RESTful API reference with all endpoints
- [Database Schema](DATABASE.md) - Database schema, entities, and migration strategy
- [Deployment Guide](DEPLOYMENT.md) - Complete guide for deploying to Kubernetes
- [Troubleshooting Guide](TROUBLESHOOTING.md) - Common issues and solutions
- [Contribution Guidelines](CONTRIBUTING.md) - How to contribute to the project
- [Production Checklist](PRODUCTION_CHECKLIST.md) - Pre-production readiness checklist
- [Interactive API Docs] - Interactive API docs (Swagger)
- [K8s Manifests](apps/backend/k8s/manifests/) - All Kubernetes resource definitions
- [Rollback Strategy](apps/backend/k8s/ROLLBACK_STRATEGY.md) - Deployment rollback procedures

## Development

### Backend (Spring Boot)
```bash
cd apps/backend
./gradlew bootRun
```

### Frontend (React + TypeScript)
```bash
cd apps/frontend
npm run dev
```

## Deployment

### Quick Deploy with Scripts

```bash
cd apps/backend/k8s

# Deploy all resources
./deploy.sh

# Remove all resources
./undeploy.sh
```

### Manual Kubectl Deploy

```bash
cd apps/backend/k8s/manifests

# Apply in order: RBAC → Config → Secrets → Services → Deployments → Ingress → HPA → NetworkPolicies → Monitoring
kubectl apply -f k8s-manager-rbac.yaml
kubectl apply -f configmap.yaml
kubectl apply -f secret.yaml
kubectl apply -f service.yaml
kubectl apply -f deployment.yaml
kubectl apply -f ingress.yaml
kubectl apply -f hpa.yaml
kubectl apply -f networkpolicy.yaml
kubectl apply -f servicemonitor.yaml
kubectl apply -f grafana-dashboard.yaml
kubectl apply -f postgres-backup-cronjob.yaml
```

## Tech Stack

- **Backend**: Spring Boot 3.5.9, Java 21, PostgreSQL 15+
- **Frontend**: React 18.2, TypeScript 5.3, Vite 5.0
- **K8s Client**: Fabric8 Kubernetes Java Client 6.x
- **Monitoring**: Prometheus + Grafana
- **Authentication**: OAuth2/OIDC (Keycloak)
- **Log Aggregation**: Loki (optional)
- **Backup**: Automated PostgreSQL backups via CronJob

## Features

- **Cluster Management**: Overview, node status, health monitoring
- **Resource Visualization**: Pods, deployments, services, ConfigMaps, secrets
- **Workload Management**: Deploy, scale, update, rollback applications
- **Resource Monitoring**: Real-time metrics (CPU, memory, network, storage)
- **Log Explorer**: Real-time log streaming with filtering and search
- **Terminal Emulator**: Web-based shell access to pods
- **YAML Editor**: Create and validate Kubernetes resources
- **RBAC**: Role-based access control with namespace isolation
- **User Authentication**: OAuth2/OIDC integration with Keycloak

## Coding Conventions

- **Java**: Google Java Style Guide
- **TypeScript**: Google TypeScript Style Guide (gts)
- **API**: RESTful, DTO-based communication
- **Error Handling**: RFC 7807 ProblemDetail

## Kubernetes Resources

### Deployed Components

| Resource Type | Name | Replicas | Purpose |
|---------------|-------|-----------|----------|
| Deployment | k8s-manager-backend | 2-10 (HPA) | Spring Boot API server |
| Deployment | k8s-manager-frontend | 2-5 (HPA) | React frontend application |
| Service | k8s-manager-backend | - | Backend ClusterIP service |
| Service | k8s-manager-frontend | - | Frontend ClusterIP service |
| HPA | k8s-manager-backend-hpa | - | Autoscale backend based on CPU/memory |
| HPA | k8s-manager-frontend-hpa | - | Autoscale frontend based on CPU |

### Infrastructure

- **RBAC**: ServiceAccount, ClusterRole, ClusterRoleBinding for K8s API access
- **Ingress**: NGINX ingress controller with SSL/TLS termination (cert-manager)
- **Monitoring**: Prometheus ServiceMonitors and Grafana dashboards
- **Backup**: Daily PostgreSQL backups via CronJob (7-day retention)
- **NetworkPolicies**: Restrict traffic between components

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on:
- Setting up development environment
- Coding standards and conventions
- Testing requirements
- Submitting changes
- Reporting issues

## Support

- Check [Troubleshooting Guide](TROUBLESHOOTING.md) for common issues
- Review [Deployment Guide](DEPLOYMENT.md) for deployment help
- Create an issue on GitHub for bugs or feature requests

## License

[License Information]
