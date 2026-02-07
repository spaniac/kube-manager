# K8s Manager Deployment Guide

This guide provides step-by-step instructions for deploying K8s Manager to a Kubernetes cluster.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Environment Setup](#environment-setup)
3. [Application Build](#application-build)
4. [Database Setup](#database-setup)
5. [Authentication Setup](#authentication-setup)
6. [Deployment](#deployment)
7. [Post-Deployment Verification](#post-deployment-verification)
8. [Troubleshooting](#troubleshooting)

## Prerequisites

### Required Software

- **Kubernetes Cluster** (v1.25+)
- **kubectl** configured to access the cluster
- **Docker** (for building images)
- **PostgreSQL** database (v15+)
- **Keycloak** (or compatible OAuth2/OIDC provider)
- **Prometheus** and **Grafana** (for monitoring)

### Cluster Requirements

- **Minimum 3 worker nodes** with:
  - 4 CPU cores per node
  - 8GB RAM per node
  - 50GB storage per node
- **Ingress Controller** (nginx recommended)
- **cert-manager** for SSL certificate management
- **StorageClass** for persistent volumes

## Environment Setup

### 1. Create Namespaces

```bash
# Create namespace for K8s Manager
kubectl create namespace k8s-manager

# Optional: Create separate namespace for monitoring
kubectl create namespace monitoring
```

### 2. Configure Storage

```bash
# Check available storage classes
kubectl get storageclass

# Create PersistentVolumeClaim for PostgreSQL
kubectl apply -f - <<EOF
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: postgres-pvc
  namespace: k8s-manager
spec:
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 20Gi
  storageClassName: standard
EOF
```

### 3. Set up cert-manager (if not already installed)

```bash
# Add Jetstack Helm repository
helm repo add jetstack https://charts.jetstack.io

# Install cert-manager
helm install cert-manager jetstack/cert-manager \
  --namespace cert-manager \
  --create-namespace \
  --version v1.11.0 \
  --set installCRDs=true

# Verify installation
kubectl get pods -n cert-manager
```

## Application Build

### 1. Clone Repository

```bash
git clone https://github.com/your-org/kube-manager.git
cd kube-manager
```

### 2. Build Backend

```bash
cd apps/backend

# Build JAR
./gradlew build -x test

# Build Docker image
docker build -t your-registry.com/k8s-manager-backend:latest .

# Push to registry
docker push your-registry.com/k8s-manager-backend:latest
```

### 3. Build Frontend

```bash
cd apps/frontend

# Install dependencies
npm ci

# Build production bundle
npm run build

# Build Docker image
docker build -t your-registry.com/k8s-manager-frontend:latest .

# Push to registry
docker push your-registry.com/k8s-manager-frontend:latest
```

## Database Setup

### 1. Deploy PostgreSQL

```bash
# Using Helm chart
helm repo add bitnami https://charts.bitnami.com/bitnami
helm install postgres bitnami/postgresql \
  --namespace k8s-manager \
  --set auth.postgresPassword=your-db-password \
  --set auth.database=k8smanager \
  --set persistence.enabled=true \
  --set persistence.size=20Gi
```

### 2. Create Database Schema

```bash
# Get PostgreSQL password
export POSTGRES_PASSWORD=$(kubectl get secret --namespace k8s-manager postgres-postgresql -o jsonpath="{.data.postgres-password}" | base64 --decode)

# Run Liquibase migrations
cd apps/backend

# Either:
./gradlew update  # If using Gradle Liquibase plugin
# OR connect with psql and run migrations manually
```

### 3. Verify Database Connection

```bash
# Port-forward PostgreSQL
kubectl port-forward -n k8s-manager svc/postgres-postgresql 5432:5432 &

# Test connection
psql -h localhost -p 5432 -U postgres -d k8smanager -W
```

## Authentication Setup

### 1. Deploy Keycloak (if not already available)

```bash
helm repo add codecentric https://codecentric.github.io/helm-charts
helm install keycloak codecentric/keycloak \
  --namespace k8s-manager \
  --set auth.adminUser=admin \
  --set auth.adminPassword=admin-secret \
  --set persistence.enabled=true
```

### 2. Configure Keycloak Realm

1. Access Keycloak Admin Console: `https://keycloak.example.com/auth/admin`
2. Create new realm: `k8s-manager`
3. Create client:
   - Client ID: `k8s-manager`
   - Client Authentication: OFF
   - Valid Redirect URIs: `https://k8s-manager.example.com/*`
4. Create roles: `admin`, `developer`, `viewer`
5. Create test users with appropriate roles

### 3. Extract Configuration Values

```bash
# These values will be used in ConfigMap
KEYCLOAK_ISSUER_URI="https://keycloak.example.com/realms/k8s-manager"
KEYCLOAK_JWKS_URI="${KEYCLOAK_ISSUER_URI}/protocol/openid-connect/certs"
```

## Deployment

### 1. Update Configuration

Edit `apps/backend/k8s/manifests/configmap.yaml`:

```yaml
data:
  db.host: "postgres-postgresql.k8s-manager.svc.cluster.local"
  db.port: "5432"
  db.name: "k8smanager"
  db.username: "postgres"
  keycloak.issuer-uri: "https://keycloak.example.com/realms/k8s-manager"
  prometheus.url: "http://prometheus-operated.monitoring.svc.cluster.local:9090"
  frontend.api-url: "https://k8s-manager.example.com/api"
```

### 2. Update Image References

Edit `apps/backend/k8s/manifests/deployment.yaml` to use your registry:

```yaml
containers:
- name: backend
  image: your-registry.com/k8s-manager-backend:latest
- name: frontend
  image: your-registry.com/k8s-manager-frontend:latest
```

### 3. Create Secrets

```bash
# Database password
kubectl create secret generic k8s-manager-secrets \
  --namespace k8s-manager \
  --from-literal=db.password=your-db-password

# Optional: OAuth2 client secret
kubectl create secret generic k8s-manager-secrets \
  --namespace k8s-manager \
  --from-literal=oauth2.client-secret=your-client-secret \
  --dry-run=client -o yaml | kubectl apply -f -
```

### 4. Deploy Application

```bash
# Navigate to k8s manifests directory
cd apps/backend/k8s

# Deploy RBAC
kubectl apply -f manifests/k8s-manager-rbac.yaml

# Deploy ConfigMap
kubectl apply -f manifests/configmap.yaml

# Deploy Secrets (already done in step 3)
# kubectl apply -f manifests/secret.yaml

# Deploy Services
kubectl apply -f manifests/service.yaml

# Deploy Ingress
kubectl apply -f manifests/ingress.yaml

# Deploy Deployments
kubectl apply -f manifests/deployment.yaml

# Deploy HPA
kubectl apply -f manifests/hpa.yaml

# Deploy NetworkPolicies
kubectl apply -f manifests/networkpolicy.yaml

# Deploy Monitoring
kubectl apply -f manifests/servicemonitor.yaml
kubectl apply -f manifests/grafana-dashboard.yaml

# Deploy Backup CronJob
kubectl apply -f manifests/postgres-backup-cronjob.yaml
```

### 5. Use Deployment Script (Alternative)

```bash
# Make script executable
chmod +x k8s/deploy.sh

# Deploy with custom configuration
NAMESPACE=k8s-manager \
REGISTRY=your-registry.com \
BACKEND_IMAGE=k8s-manager-backend:v1.0.0 \
FRONTEND_IMAGE=k8s-manager-frontend:v1.0.0 \
./k8s/deploy.sh
```

## Post-Deployment Verification

### 1. Check Pod Status

```bash
# Wait for pods to be ready
kubectl wait --for=condition=ready pod \
  -l app=k8s-manager \
  -n k8s-manager \
  --timeout=300s

# Check pod logs
kubectl logs -l app=k8s-manager-backend -n k8s-manager --tail=50
kubectl logs -l app=k8s-manager-frontend -n k8s-manager --tail=50
```

### 2. Verify Services

```bash
# Check service endpoints
kubectl get endpoints -n k8s-manager -l app=k8s-manager

# Test backend health endpoint
kubectl port-forward -n k8s-manager svc/k8s-manager-backend 8080:8080 &
curl http://localhost:8080/api/v1/actuator/health
```

### 3. Check Ingress

```bash
# Verify ingress is created
kubectl get ingress -n k8s-manager

# Check SSL certificate
kubectl describe certificate k8s-manager-tls -n k8s-manager
```

### 4. Access Application

Open browser and navigate to: `https://k8s-manager.example.com`

- You should be redirected to Keycloak login
- Login with test user credentials
- Verify you can see cluster overview

### 5. Verify Monitoring

```bash
# Check Prometheus targets
kubectl port-forward -n monitoring svc/prometheus-operated 9090:9090 &
# Open http://localhost:9090/targets

# Check Grafana dashboards
kubectl port-forward -n monitoring svc/grafana 3000:3000 &
# Open http://localhost:3000 and search for "K8s Manager Backend Dashboard"
```

## Troubleshooting

### Pods Not Starting

```bash
# Check pod status
kubectl describe pod <pod-name> -n k8s-manager

# Common issues:
# - Image pull errors: Verify registry access and image tags
# - Resource limits: Check if nodes have enough resources
# - ConfigMap/Secret issues: Verify all required values are set
```

### Database Connection Issues

```bash
# Test database connectivity from pod
kubectl exec -it <backend-pod> -- nc -zv postgres-postgresql 5432

# Check database logs
kubectl logs -n k8s-manager postgres-postgresql-0 --tail=50
```

### Authentication Issues

```bash
# Check Keycloak logs
kubectl logs -n k8s-manager keycloak-0 --tail=50

# Verify JWT issuer URI in ConfigMap
kubectl get configmap k8s-manager-config -n k8s-manager -o yaml
```

### Ingress/Certificate Issues

```bash
# Check ingress controller logs
kubectl logs -n ingress-nginx deployment/ingress-nginx-controller

# Check cert-manager logs
kubectl logs -n cert-manager deployment/cert-manager

# Manually trigger certificate renewal
kubectl delete certificate k8s-manager-tls -n k8s-manager
```

### Performance Issues

```bash
# Check resource usage
kubectl top pods -n k8s-manager
kubectl top nodes

# Check HPA status
kubectl get hpa -n k8s-manager
kubectl describe hpa k8s-manager-backend-hpa -n k8s-manager
```

## Next Steps

- Set up backup and restore procedures
- Configure alerting (Prometheus Alertmanager)
- Review security settings (NetworkPolicies, RBAC)
- Plan for disaster recovery
- Set up CI/CD pipeline for automated deployments

## Support

For issues and questions:
- Create an issue in GitHub repository
- Contact the DevOps team
- Review [Troubleshooting Guide](TROUBLESHOOTING.md)
