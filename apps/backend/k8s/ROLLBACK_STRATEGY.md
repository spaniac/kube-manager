# K8s Manager Rollback Strategy

This document describes the rollback strategy for K8s Manager deployments.

## Overview

The rollback strategy provides multiple levels of recovery options depending on the scope and severity of issues
encountered during or after deployment.

## Rollback Levels

### Level 1: Configuration Rollback (Fastest)

Use when only configuration changes need to be reverted without rebuilding images.

**Scenario**: Recent ConfigMap or Secret changes caused issues

**Steps**:

```bash
# View current configuration
kubectl get configmap k8s-manager-config -o yaml > current-config.yaml
kubectl get secret k8s-manager-secrets -o yaml > current-secret.yaml

# Restore previous configuration from Git or backup
git checkout <previous-commit> -- apps/backend/k8s/manifests/configmap.yaml
git checkout <previous-commit> -- apps/backend/k8s/manifests/secret.yaml

# Apply restored configuration
kubectl apply -f apps/backend/k8s/manifests/configmap.yaml
kubectl apply -f apps/backend/k8s/manifests/secret.yaml

# Restart pods to pick up new configuration
kubectl rollout restart deployment/k8s-manager-backend
kubectl rollout restart deployment/k8s-manager-frontend
```

**Time to recover**: < 2 minutes

---

### Level 2: Application Rollback

Use when a new application version needs to be reverted.

**Scenario**: New backend or frontend release has bugs

**Steps**:

```bash
# Check rollout history
kubectl rollout history deployment/k8s-manager-backend
kubectl rollout history deployment/k8s-manager-frontend

# Rollback to previous revision
kubectl rollout undo deployment/k8s-manager-backend
kubectl rollout undo deployment/k8s-manager-frontend

# Or rollback to specific revision
kubectl rollout undo deployment/k8s-manager-backend --to-revision=3
kubectl rollout undo deployment/k8s-manager-frontend --to-revision=5

# Verify rollback status
kubectl rollout status deployment/k8s-manager-backend
kubectl rollout status deployment/k8s-manager-frontend
```

**Time to recover**: 2-5 minutes

---

### Level 3: Database Rollback

Use when database schema or data changes caused issues.

**Scenario**: Liquibase migration failed or data corruption

**Prerequisites**: Database backup is available (automatically created by CronJob)

**Steps**:

```bash
# 1. Scale down deployments to prevent further writes
kubectl scale deployment k8s-manager-backend --replicas=0

# 2. Find the backup to restore
kubectl exec -it <postgres-pod-name> -- ls -lh /var/lib/postgresql/backups/

# 3. Identify the correct backup file
# Example: postgres_backup_20260202_020001.sql.gz

# 4. Restore from backup
kubectl exec -it <postgres-pod-name> -- sh -c '
  PGPASSWORD="$DB_PASSWORD" gunzip -c < /var/lib/postgresql/backups/postgres_backup_20260202_020001.sql.gz |
  PGPASSWORD="$DB_PASSWORD" psql -h localhost -U k8smanager -d k8smanager
'

# 5. Verify data integrity
kubectl exec -it <postgres-pod-name> -- psql -U k8smanager -d k8smanager -c "\dt"

# 6. Scale up deployments
kubectl scale deployment k8s-manager-backend --replicas=2
```

**Note**: After restoring, you may need to re-run specific Liquibase migrations to bring the schema to the correct
state.

**Time to recover**: 10-30 minutes (depending on database size)

---

### Level 4: Full Cluster Rollback

Use when the entire deployment needs to be reverted.

**Scenario**: Complete deployment failure, incompatible Kubernetes changes, or major infrastructure issues

**Steps**:

```bash
# 1. Stop HPA to prevent automatic scaling
kubectl patch hpa k8s-manager-backend -p '{"spec":{"minReplicas":0,"maxReplicas":0}}'
kubectl patch hpa k8s-manager-frontend -p '{"spec":{"minReplicas":0,"maxReplicas":0}}'

# 2. Scale down all deployments
kubectl scale deployment k8s-manager-backend --replicas=0
kubectl scale deployment k8s-manager-frontend --replicas=0

# 3. Checkout previous stable version from Git
git log --oneline | head -10  # Find the commit before the issue
git checkout <previous-stable-commit>

# 4. Rebuild images (if using local images)
cd apps/backend && ./gradlew build && docker build -t k8s-manager-backend:<tag> .
cd apps/frontend && npm run build && docker build -t k8s-manager-frontend:<tag> .

# 5. Update manifests with new image tags
sed -i "s|image: k8s-manager-backend:.*|image: k8s-manager-backend:<tag>|g" k8s/manifests/deployment.yaml
sed -i "s|image: k8s-manager-frontend:.*|image: k8s-manager-frontend:<tag>|g" k8s/manifests/deployment.yaml

# 6. Deploy previous version
kubectl apply -f k8s/manifests/deployment.yaml

# 7. Re-enable HPA
kubectl patch hpa k8s-manager-backend --type='json' -p='[{"op": "replace", "path": "/spec/minReplicas", "value":2}, {"op": "replace", "path": "/spec/maxReplicas", "value":10}]'
kubectl patch hpa k8s-manager-frontend --type='json' -p='[{"op": "replace", "path": "/spec/minReplicas", "value":2}, {"op": "replace", "path": "/spec/maxReplicas", "value":5}]'

# 8. Monitor deployment
kubectl rollout status deployment/k8s-manager-backend
kubectl rollout status deployment/k8s-manager-frontend
```

**Time to recover**: 15-30 minutes

---

## Automated Rollback Script

Create an automated rollback script for faster recovery:

```bash
#!/bin/bash
# rollback.sh - Automated rollback script

set -e

ROLLBACK_LEVEL=${1:-"application"}
NAMESPACE="default"

case $ROLLBACK_LEVEL in
  config)
    echo "Rolling back configuration..."
    kubectl rollout restart deployment/k8s-manager-backend -n $NAMESPACE
    kubectl rollout restart deployment/k8s-manager-frontend -n $NAMESPACE
    ;;
  application)
    echo "Rolling back application..."
    kubectl rollout undo deployment/k8s-manager-backend -n $NAMESPACE
    kubectl rollout undo deployment/k8s-manager-frontend -n $NAMESPACE
    ;;
  *)
    echo "Usage: $0 {config|application}"
    exit 1
    ;;
esac

echo "Rollback completed. Checking status..."
kubectl rollout status deployment/k8s-manager-backend -n $NAMESPACE
kubectl rollout status deployment/k8s-manager-frontend -n $NAMESPACE
```

## Rollback Decision Tree

```
Issue Detected
    |
    +-- Configuration issue?
    |       +-- Yes --> Level 1: Config Rollback
    |       +-- No  --> Application issue?
    |                   +-- Yes --> Level 2: App Rollback
    |                   +-- No  --> Database issue?
    |                               +-- Yes --> Level 3: DB Rollback
    |                               +-- No  --> Level 4: Full Cluster Rollback
```

## Rollback Verification

After any rollback, perform these verification steps:

1. **Pod Health**:
   ```bash
   kubectl get pods -l app=k8s-manager -n $NAMESPACE
   kubectl describe pod <pod-name> | grep -A5 State
   ```

2. **Application Health**:
   ```bash
   curl -k https://k8s-manager.example.com/api/v1/actuator/health
   ```

3. **Database Connectivity**:
   ```bash
   kubectl exec -it <backend-pod> -- env | grep DB
   ```

4. **Error Logs**:
   ```bash
   kubectl logs -l app=k8s-manager-backend -n $NAMESPACE --tail=50 | grep -i error
   ```

5. **User Access**:
    - Login to the web interface
    - Verify key features (cluster view, pod listing, etc.)

## Post-Rollback Actions

1. **Root Cause Analysis**:
    - Review logs for the failed deployment
    - Check audit logs for unusual activity
    - Review recent changes (Git commits, config updates)

2. **Fix Implementation**:
    - Create a bug fix in a separate branch
    - Thoroughly test the fix
    - Follow the deployment process to re-deploy

3. **Update Documentation**:
    - Document the root cause and fix
    - Update rollback procedures if needed
    - Share lessons learned with the team

## Best Practices

1. **Always Have Recent Backups**:
    - Ensure the backup CronJob is running successfully
    - Verify backup files exist and are valid

2. **Test Rollback Procedures**:
    - Practice rollback in a staging environment
    - Document any environment-specific issues

3. **Use Blue-Green Deployments** (Future Enhancement):
    - Maintain two production environments
    - Switch traffic between them for instant rollbacks

4. **Monitor During Rollback**:
    - Watch logs in real-time
    - Monitor resource usage
    - Check for cascading failures

5. **Communicate During Rollback**:
    - Notify stakeholders of the rollback
    - Provide estimated downtime
    - Update status when complete

## Emergency Contacts

- **On-call Engineer**: [Contact Info]
- **Database Administrator**: [Contact Info]
- **Infrastructure Team**: [Contact Info]
- **Management**: [Contact Info]

## References

- [Liquibase Rollback Documentation](https://docs.liquibase.com/concepts/changelogs/rollback.html)
- [Kubernetes Deployment Rollback](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/#rolling-back-a-deployment)
- [PostgreSQL Backup and Restore](https://www.postgresql.org/docs/current/backup-restore.html)
