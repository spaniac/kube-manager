#!/bin/bash
# K8s Manager Deployment Script
# This script deploys K8s Manager to a Kubernetes cluster using kubectl

set -e

# Configuration
NAMESPACE="default"
REGISTRY="your-registry.com"
BACKEND_IMAGE="${REGISTRY}/k8s-manager-backend:latest"
FRONTEND_IMAGE="${REGISTRY}/k8s-manager-frontend:latest"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Functions
log_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

log_warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

check_kubectl() {
    if ! command -v kubectl &> /dev/null; then
        log_error "kubectl is not installed. Please install kubectl first."
        exit 1
    fi
    log_info "kubectl found: $(kubectl version --client --short)"
}

check_cluster() {
    if ! kubectl cluster-info &> /dev/null; then
        log_error "Cannot connect to Kubernetes cluster. Please check your kubeconfig."
        exit 1
    fi
    log_info "Connected to cluster: $(kubectl config current-context)"
}

create_namespace() {
    if kubectl get namespace "$NAMESPACE" &> /dev/null; then
        log_info "Namespace $NAMESPACE already exists"
    else
        log_info "Creating namespace: $NAMESPACE"
        kubectl create namespace "$NAMESPACE"
    fi
}

deploy_rbac() {
    log_info "Deploying RBAC resources..."
    kubectl apply -f k8s/manifests/k8s-manager-rbac.yaml
    log_info "RBAC resources deployed"
}

deploy_config() {
    log_info "Deploying ConfigMap..."
    kubectl apply -f k8s/manifests/configmap.yaml

    log_warn "Please update the Secret with actual credentials before deploying:"
    log_warn "kubectl create secret generic k8s-manager-secrets --from-literal=db.password=YOUR_PASSWORD --dry-run=client -o yaml | kubectl apply -f -"

    read -p "Have you updated the Secret? (y/n) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        log_error "Deployment aborted. Please update the secret and run again."
        exit 1
    fi
}

deploy_deployment() {
    log_info "Updating deployment images..."
    # Update images in deployment.yaml
    sed -i.bak "s|image: k8s-manager-backend:latest|image: ${BACKEND_IMAGE}|g" k8s/manifests/deployment.yaml
    sed -i.bak "s|image: k8s-manager-frontend:latest|image: ${FRONTEND_IMAGE}|g" k8s/manifests/deployment.yaml

    log_info "Deploying Deployments..."
    kubectl apply -f k8s/manifests/deployment.yaml

    # Restore original file
    mv k8s/manifests/deployment.yaml.bak k8s/manifests/deployment.yaml

    log_info "Deployments created"
}

deploy_service() {
    log_info "Deploying Services..."
    kubectl apply -f k8s/manifests/service.yaml
    log_info "Services deployed"
}

deploy_ingress() {
    log_info "Deploying Ingress..."
    kubectl apply -f k8s/manifests/ingress.yaml
    log_info "Ingress deployed"
    log_warn "Please ensure cert-manager is installed for SSL certificate creation"
}

deploy_hpa() {
    log_info "Deploying Horizontal Pod Autoscalers..."
    kubectl apply -f k8s/manifests/hpa.yaml
    log_info "HPA deployed"
}

deploy_networkpolicy() {
    log_info "Deploying NetworkPolicies..."
    kubectl apply -f k8s/manifests/networkpolicy.yaml
    log_info "NetworkPolicies deployed"
}

deploy_monitoring() {
    log_info "Deploying monitoring resources..."
    kubectl apply -f k8s/manifests/servicemonitor.yaml
    log_info "ServiceMonitors deployed"

    log_info "Deploying Grafana dashboards..."
    kubectl apply -f k8s/manifests/grafana-dashboard.yaml
    log_info "Grafana dashboards deployed"
}

wait_for_pods() {
    log_info "Waiting for pods to be ready..."
    kubectl wait --for=condition=ready pod -l app=k8s-manager -n "$NAMESPACE" --timeout=300s
    log_info "All pods are ready"
}

show_status() {
    log_info "Deployment status:"
    echo ""
    kubectl get all -n "$NAMESPACE" -l app=k8s-manager
    echo ""
    log_info "HPA status:"
    kubectl get hpa -n "$NAMESPACE" -l app=k8s-manager
    echo ""
    log_info "Ingress status:"
    kubectl get ingress -n "$NAMESPACE"
    echo ""
}

main() {
    log_info "Starting K8s Manager deployment..."

    check_kubectl
    check_cluster
    create_namespace

    deploy_rbac
    deploy_config
    deploy_deployment
    deploy_service
    deploy_ingress
    deploy_hpa
    deploy_networkpolicy
    deploy_monitoring

    wait_for_pods
    show_status

    log_info "Deployment completed successfully!"
    log_info "Access the application at: https://k8s-manager.example.com"
}

# Run main function
main "$@"
