# K8s Manager Troubleshooting Guide

This guide helps diagnose and resolve common issues with K8s Manager.

## Table of Contents

1. [General Troubleshooting Approach](#general-troubleshooting-approach)
2. [Installation Issues](#installation-issues)
3. [Runtime Issues](#runtime-issues)
4. [Performance Issues](#performance-issues)
5. [Security Issues](#security-issues)
6. [Monitoring and Logging](#monitoring-and-logging)

## General Troubleshooting Approach

### Step 1: Gather Information

```bash
# Check pod status
kubectl get pods -n k8s-manager -l app=k8s-manager

# Check pod events
kubectl describe pod <pod-name> -n k8s-manager

# Check pod logs
kubectl logs <pod-name> -n k8s-manager --tail=100

# Check recent events
kubectl get events -n k8s-manager --sort-by='.lastTimestamp'
```

### Step 2: Identify the Component

```
┌─────────────────┐
│   Ingress       │
│   (Nginx)      │
└────────┬────────┘
         │
    ┌────┴────┐
    │         │
┌───▼────┐ ┌─▼──────┐
│Frontend │ │Backend │
│(React)  │ │(Spring)│
└───┬────┘ └─┬──────┘
    │         │
    └────┬────┘
         │
    ┌────▼─────┐
    │Keycloak  │
    │  (Auth)  │
    └──────────┘
         │
    ┌────▼─────┐
    │PostgreSQL │
    │  (DB)    │
    └──────────┘
```

### Step 3: Use Systematic Approach

1. Check health endpoints
2. Review application logs
3. Verify configuration
4. Test connectivity
5. Check resource availability

## Installation Issues

### Issue: Pods Not Starting

**Symptoms**:
- Pods remain in `Pending` or `CrashLoopBackOff` state
- Image pull errors

**Diagnosis**:
```bash
# Describe pod for detailed status
kubectl describe pod <pod-name> -n k8s-manager

# Check events
kubectl get events -n k8s-manager --sort-by='.lastTimestamp' | tail -20
```

**Solutions**:

1. **Image Pull Errors**:
   ```bash
   # Verify image exists
   docker pull your-registry.com/k8s-manager-backend:latest

   # Check image pull secrets (if using private registry)
   kubectl get secrets -n k8s-manager | grep docker

   # Create image pull secret if missing
   kubectl create secret docker-registry regcred \
     --docker-server=your-registry.com \
     --docker-username=your-username \
     --docker-password=your-password \
     -n k8s-manager
   ```

2. **Resource Insufficiency**:
   ```bash
   # Check node resources
   kubectl describe nodes

   # Increase resource limits in deployment.yaml
   resources:
     requests:
       memory: "512Mi"  # Increase from 256Mi
       cpu: "500m"       # Increase from 250m
   ```

3. **Pending State**:
   ```bash
   # Check for taints
   kubectl describe nodes | grep -A5 Taints

   # Check scheduling constraints
   kubectl get pods -n k8s-manager -o wide
   ```

### Issue: Database Connection Failed

**Symptoms**:
- Backend logs show: "Connection refused" or "No route to host"
- Application health endpoint returns DOWN

**Diagnosis**:
```bash
# Check database pod status
kubectl get pods -n k8s-manager -l app=postgresql

# Test connectivity from backend pod
kubectl exec -it <backend-pod> -- nc -zv postgres-postgresql 5432

# Check database service
kubectl get svc postgres-postgresql -n k8s-manager
```

**Solutions**:

1. **Service Not Found**:
   ```bash
   # Verify service exists
   kubectl get svc -n k8s-manager

   # Check ConfigMap for correct DB host
   kubectl get configmap k8s-manager-config -n k8s-manager -o yaml | grep db.host
   ```

2. **Network Policy Blocking**:
   ```bash
   # Check network policies
   kubectl get networkpolicy -n k8s-manager

   # Temporarily disable for testing
   kubectl delete networkpolicy k8s-manager-backend-policy -n k8s-manager
   ```

3. **Wrong Database Credentials**:
   ```bash
   # Verify secret exists
   kubectl get secret k8s-manager-secrets -n k8s-manager

   # Decode and check
   kubectl get secret k8s-manager-secrets -n k8s-manager -o jsonpath='{.data.db\.password}' | base64 -d
   ```

### Issue: SSL Certificate Not Working

**Symptoms**:
- Browser shows "Not Secure" or certificate errors
- Ingress controller logs show certificate errors

**Diagnosis**:
```bash
# Check certificate status
kubectl get certificate -n k8s-manager

# Describe certificate
kubectl describe certificate k8s-manager-tls -n k8s-manager

# Check cert-manager logs
kubectl logs -n cert-manager deployment/cert-manager --tail=50
```

**Solutions**:

1. **Certificate Pending**:
   ```bash
   # Check if DNS is correct
   nslookup k8s-manager.example.com

   # Verify ingress DNS configuration
   kubectl get ingress k8s-manager-ingress -n k8s-manager -o yaml | grep host

   # Manually trigger renewal
   kubectl delete certificate k8s-manager-tls -n k8s-manager
   ```

2. **Issuer Not Found**:
   ```bash
   # Check cluster issuer
   kubectl get clusterissuer

   # Create issuer if missing
   kubectl apply -f - <<EOF
   apiVersion: cert-manager.io/v1
   kind: ClusterIssuer
   metadata:
     name: letsencrypt-prod
   spec:
     acme:
       server: https://acme-v02.api.letsencrypt.org/directory
       email: your-email@example.com
       privateKeySecretRef:
         name: letsencrypt-prod
       solvers:
       - http01:
           ingress:
             class: nginx
   EOF
   ```

## Runtime Issues

### Issue: Authentication Failing

**Symptoms**:
- Users cannot log in
- Token validation errors in logs
- 401 Unauthorized responses

**Diagnosis**:
```bash
# Check Keycloak status
kubectl get pods -n k8s-manager -l app=keycloak

# Test Keycloak endpoint
curl -k https://keycloak.example.com/realms/k8s-manager/.well-known/openid-configuration

# Check backend logs for auth errors
kubectl logs -l app=k8s-manager-backend -n k8s-manager --tail=100 | grep -i auth
```

**Solutions**:

1. **Wrong Issuer URI**:
   ```bash
   # Update ConfigMap
   kubectl edit configmap k8s-manager-config -n k8s-manager

   # Restart pods to pick up changes
   kubectl rollout restart deployment/k8s-manager-backend -n k8s-manager
   ```

2. **CORS Issues**:
   ```bash
   # Check ingress CORS configuration
   kubectl get ingress k8s-manager-ingress -n k8s-manager -o yaml | grep cors

   # Update application.properties if needed
   # spring.security.oauth2.resourceserver.cors.allowed-origins=https://k8s-manager.example.com
   ```

### Issue: K8s API Access Denied

**Symptoms**:
- Cannot view cluster resources
- RBAC errors in logs
- Empty resource lists

**Diagnosis**:
```bash
# Check RBAC resources
kubectl get serviceaccount,clusterrole,clusterrolebinding -n k8s-manager -l app=k8s-manager

# Test cluster access from pod
kubectl exec -it <backend-pod> -- kubectl auth can-i get pods --all-namespaces
```

**Solutions**:

1. **Update RBAC Permissions**:
   ```bash
   # Edit ClusterRole
   kubectl edit clusterrole k8s-manager

   # Add missing rules
   rules:
   - apiGroups: [""]
     resources: ["pods/log"]
     verbs: ["get", "list"]
   ```

2. **ServiceAccount Not Associated**:
   ```bash
   # Verify deployment uses correct serviceAccount
   kubectl get deployment k8s-manager-backend -n k8s-manager -o yaml | grep serviceAccountName
   ```

### Issue: SSE/WebSocket Connections Failing

**Symptoms**:
- Logs not streaming
- Terminal not connecting
- Connection timeout errors

**Diagnosis**:
```bash
# Check ingress annotations for WebSocket support
kubectl get ingress k8s-manager-ingress -n k8s-manager -o yaml | grep nginx.ingress

# Test SSE endpoint
curl -N http://localhost:8080/api/v1/pods/test/logs
```

**Solutions**:

1. **Ingress WebSocket Configuration**:
   ```yaml
   annotations:
     nginx.ingress.kubernetes.io/proxy-read-timeout: "3600"
     nginx.ingress.kubernetes.io/proxy-send-timeout: "3600"
   ```

2. **Service Configuration**:
   ```bash
   # Ensure service exposes correct ports
   kubectl get svc k8s-manager-backend -n k8s-manager -o yaml | grep ports
   ```

## Performance Issues

### Issue: High Memory Usage

**Symptoms**:
- Pods OOMKilled
- Slow response times
- High memory metrics

**Diagnosis**:
```bash
# Check pod metrics
kubectl top pod <pod-name> -n k8s-manager

# Check pod status for OOM
kubectl describe pod <pod-name> -n k8s-manager | grep -i oom

# Check JVM heap (backend)
kubectl exec -it <backend-pod> -- jps -l | xargs -I {} jstat -gcutil {}
```

**Solutions**:

1. **Increase Memory Limits**:
   ```yaml
   resources:
     limits:
       memory: "2Gi"  # Increase from 1Gi
   ```

2. **Tune JVM**:
   ```bash
   # Add JVM options to deployment
   env:
   - name: JAVA_OPTS
     value: "-Xmx1536m -Xms512m"
   ```

3. **Check for Memory Leaks**:
   ```bash
   # Take heap dump
   kubectl exec -it <backend-pod> -- jmap -dump:format=b,file=/tmp/heap.hprof <pid>

   # Copy heap dump for analysis
   kubectl cp <pod-name>:/tmp/heap.hprof ./heap.hprof
   ```

### Issue: High CPU Usage

**Symptoms**:
- CPU throttling
- Slow request processing
- High CPU metrics

**Diagnosis**:
```bash
# Check CPU usage
kubectl top pod <pod-name> -n k8s-manager

# Check CPU throttling
kubectl describe pod <pod-name> -n k8s-manager | grep -i cpu

# Profile application
kubectl exec -it <backend-pod> -- async-profiler start --event cpu
```

**Solutions**:

1. **Scale Up HPA**:
   ```bash
   # Increase HPA max replicas
   kubectl edit hpa k8s-manager-backend-hpa -n k8s-manager
   ```

2. **Optimize Queries**:
   ```bash
   # Check slow queries in database
   kubectl exec -it <postgres-pod> -- psql -U postgres -d k8smanager \
     -c "SELECT * FROM pg_stat_statements ORDER BY mean_exec_time DESC LIMIT 10;"
   ```

## Security Issues

### Issue: Unauthorized Access

**Symptoms**:
- Users accessing resources they shouldn't
- RBAC not being enforced

**Diagnosis**:
```bash
# Check audit logs
kubectl logs -l app=k8s-manager-backend -n k8s-manager | grep -i "unauthorized"

# Review ClusterRole permissions
kubectl get clusterrole k8s-manager -o yaml
```

**Solutions**:

1. **Tighten RBAC**:
   ```yaml
   # Remove unnecessary permissions
   - apiGroups: [""]
     resources: ["secrets"]
     verbs: ["list"]  # Remove if not needed
   ```

2. **Enable Audit Logging**:
   ```bash
   # Ensure audit log aspect is enabled
   grep -r "audit" apps/backend/src/main/resources/
   ```

## Monitoring and Logging

### Enable Debug Logging

```bash
# Update ConfigMap
kubectl edit configmap k8s-manager-config -n k8s-manager

# Add debug logging
data:
  logging.level.com.k8smanager: "DEBUG"
  logging.level.org.springframework: "DEBUG"
```

### Collect Diagnostic Information

```bash
# Create diagnostic bundle
kubectl get all,pvc,configmap,secret -n k8s-manager -o yaml > k8s-manager-resources.yaml
kubectl logs -l app=k8s-manager-backend -n k8s-manager > backend-logs.txt
kubectl logs -l app=k8s-manager-frontend -n k8s-manager > frontend-logs.txt
kubectl describe nodes > nodes-info.txt
kubectl get events -n k8s-manager --sort-by='.lastTimestamp' > events.txt

# Package everything
tar czf k8s-manager-diagnostics.tgz *.yaml *.txt
```

## Getting Help

If you're unable to resolve the issue:

1. Check [GitHub Issues](https://github.com/your-org/kube-manager/issues)
2. Review [Deployment Guide](DEPLOYMENT.md)
3. Create a new issue with:
   - Complete error messages
   - Logs from affected components
   - Configuration values
   - Steps to reproduce
   - Environment details (K8s version, OS, etc.)
