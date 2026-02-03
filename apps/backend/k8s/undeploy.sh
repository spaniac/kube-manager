#!/bin/bash
# K8s Manager Undeployment Script
# This script removes K8s Manager from a Kubernetes cluster

set -e

# Configuration
NAMESPACE="default"

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

confirm_delete() {
    log_warn "This will delete all K8s Manager resources from namespace: $NAMESPACE"
    read -p "Are you sure you want to continue? (yes/no): " -r
    if [[ ! $REPLY =~ ^yes$ ]]; then
        log_info "Operation cancelled"
        exit 0
    fi
}

delete_resources() {
    log_info "Deleting K8s Manager resources..."

    # Delete in reverse order of dependencies
    log_info "Deleting Ingress..."
    kubectl delete ingress k8s-manager-ingress -n "$NAMESPACE" --ignore-not-found=true

    log_info "Deleting HPAs..."
    kubectl delete hpa k8s-manager-backend-hpa -n "$NAMESPACE" --ignore-not-found=true
    kubectl delete hpa k8s-manager-frontend-hpa -n "$NAMESPACE" --ignore-not-found=true

    log_info "Deleting NetworkPolicies..."
    kubectl delete networkpolicy k8s-manager-backend-policy -n "$NAMESPACE" --ignore-not-found=true
    kubectl delete networkpolicy k8s-manager-frontend-policy -n "$NAMESPACE" --ignore-not-found=true

    log_info "Deleting Services..."
    kubectl delete service k8s-manager-backend -n "$NAMESPACE" --ignore-not-found=true
    kubectl delete service k8s-manager-frontend -n "$NAMESPACE" --ignore-not-found=true

    log_info "Deleting Deployments..."
    kubectl delete deployment k8s-manager-backend -n "$NAMESPACE" --ignore-not-found=true
    kubectl delete deployment k8s-manager-frontend -n "$NAMESPACE" --ignore-not-found=true

    log_info "Deleting ConfigMaps and Secrets..."
    kubectl delete configmap k8s-manager-config -n "$NAMESPACE" --ignore-not-found=true
    kubectl delete configmap k8s-manager-grafana-dashboards -n "$NAMESPACE" --ignore-not-found=true
    kubectl delete secret k8s-manager-secrets -n "$NAMESPACE" --ignore-not-found=true

    log_info "Deleting RBAC resources..."
    kubectl delete serviceaccount k8s-manager -n "$NAMESPACE" --ignore-not-found=true
    kubectl delete clusterrole k8s-manager --ignore-not-found=true
    kubectl delete clusterrolebinding k8s-manager --ignore-not-found=true

    log_info "Deleting monitoring resources..."
    kubectl delete servicemonitor k8s-manager-backend -n "$NAMESPACE" --ignore-not-found=true
    kubectl delete servicemonitor k8s-manager-frontend -n "$NAMESPACE" --ignore-not-found=true

    log_info "All resources deleted"
}

verify_deletion() {
    log_info "Verifying deletion..."
    if kubectl get all -n "$NAMESPACE" -l app=k8s-manager 2>/dev/null | grep -q "k8s-manager"; then
        log_warn "Some resources still exist"
        kubectl get all -n "$NAMESPACE" -l app=k8s-manager
    else
        log_info "All K8s Manager resources have been removed"
    fi
}

main() {
    log_info "Starting K8s Manager undeployment..."

    confirm_delete
    delete_resources
    verify_deletion

    log_info "Undeployment completed successfully!"
}

# Run main function
main "$@"
