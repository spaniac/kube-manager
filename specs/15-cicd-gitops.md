# CI/CD & GitOps Integration

## Overview

CI/CD & GitOps provides comprehensive DevOps automation through GitLab, GitLab Runner, Harbor, and ArgoCD integration for building, testing, and deploying applications.

---

## Features

1. **GitLab Integration** - Source code management and CI pipelines
2. **GitLab Runner Integration** - Scalable build agents with Kubernetes execution
3. **Harbor Integration** - Container registry and vulnerability scanning
4. **ArgoCD Integration** - GitOps-based continuous delivery
5. **Pipeline Visualization** - Graphical pipeline editor and execution stages
6. **Build Triggers** - Git webhooks, manual triggers, scheduled builds
7. **Image Promotion** - Image promotion across environments (dev → staging → prod)
8. **Pipeline History** - Build history, logs, and artifact management
9. **GitOps Workflow** - Git-based deployment with drift detection
10. **Multi-Environment Support** - Manage dev, staging, production environments

---

## Architecture

```
Git Flow:
Developer Push → GitLab Repository
              ↓
         GitLab CI Pipeline (GitLab Runner)
              ↓
         Build Image → Harbor Registry
              ↓
         ArgoCD monitors Git repo
              ↓
         Deploy to Kubernetes
              ↓
         Health Check & Rollback
```

---

## API Endpoints

### Get GitLab Configuration

```http
GET /api/v1/cicd/gitlab/config
Authorization: Bearer <access_token>
```

Response:
```json
{
  "success": true,
  "data": {
    "gitlabUrl": "https://gitlab.example.com",
    "enabled": true,
    "version": "16.7.0",
    "connected": true,
    "accessToken": "glpat-xxxxxxxxxxxx",
    "defaultBranch": "main"
  }
}
```

### Connect GitLab Repository

```http
POST /api/v1/cicd/gitlab/repositories/connect
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "repositoryUrl": "https://gitlab.example.com/my-project/app",
  "accessToken": "glpat-xxxxxxxxxxxx",
  "branch": "main",
  "namespace": "production",
  "projectName": "api-server"
}
```

Response:
```json
{
  "success": true,
  "data": {
    "repositoryId": "repo-001",
    "name": "api-server",
    "namespace": "production",
    "url": "https://gitlab.example.com/my-project/app",
    "branch": "main",
    "webhookUrl": "https://k8s-manager.example.com/api/v1/cicd/webhooks/gitlab/abc123",
    "connectedAt": "2024-02-06T14:00:00Z"
  },
  "message": "GitLab repository connected successfully"
}
```

### List GitLab Pipelines

```http
GET /api/v1/cicd/gitlab/pipelines?repository={repo}&status={status}&limit={count}
Authorization: Bearer <access_token>
```

**Query Parameters:**
- `repository` (optional) - Filter by repository
- `status` (optional) - Filter by status: `success`, `failed`, `running`, `pending`
- `limit` (optional, default: `20`) - Number of pipelines to return

Response:
```json
{
  "success": true,
  "data": {
    "repository": "api-server",
    "pipelines": [
      {
        "id": 123456,
        "status": "success",
        "ref": "main",
        "sha": "a1b2c3d4e5f6",
        "createdAt": "2024-02-06T14:00:00Z",
        "updatedAt": "2024-02-06T14:05:00Z",
        "duration": "5m 30s",
        "stages": [
          { "name": "build", "status": "success", "duration": "2m 15s" },
          { "name": "test", "status": "success", "duration": "1m 30s" },
          { "name": "deploy", "status": "success", "duration": "1m 45s" }
        ]
      }
    ],
    "total": 1
  }
}
```

### Trigger GitLab Pipeline

```http
POST /api/v1/cicd/gitlab/pipelines/trigger
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "repositoryId": "repo-001",
  "branch": "main",
  "variables": {
    "DEPLOY_ENVIRONMENT": "production",
    "SKIP_TESTS": "false"
  }
}
```

Response:
```json
{
  "success": true,
  "data": {
    "pipelineId": 123457,
    "webhookUrl": "https://gitlab.example.com/api/v4/projects/123/pipelines/123457",
    "status": "pending",
    "triggeredAt": "2024-02-06T14:00:00Z"
  },
  "message": "Pipeline triggered successfully"
}
```

### Get GitLab Runner Configuration

```http
GET /api/v1/cicd/gitlab-runner/config
Authorization: Bearer <access_token>
```

Response:
```json
{
  "success": true,
  "data": {
    "enabled": true,
    "registered": true,
    "runners": [
      {
        "id": "runner-001",
        "name": "k8s-builder",
        "status": "online",
        "executorType": "kubernetes",
        "tags": ["docker", "java", "nodejs"],
        "maxConcurrentJobs": 10,
        "lastContact": "2024-02-06T14:30:00Z"
      }
    ],
    "executorConfig": {
      "image": "gitlab/gitlab-runner:latest",
      "replicas": 2,
      "cpu": "2",
      "memory": "4Gi",
      "namespace": "cicd"
    }
  }
}
```

### Register GitLab Runner

```http
POST /api/v1/cicd/gitlab-runner/register
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "name": "k8s-builder",
  "tags": ["docker", "java", "nodejs"],
  "executorType": "kubernetes",
  "executorConfig": {
    "image": "gitlab/gitlab-runner:latest",
    "replicas": 2,
    "cpu": "2",
    "memory": "4Gi",
    "namespace": "cicd",
    "maxConcurrentJobs": 10
  },
  "gitlabRegistrationToken": "glrt-xxxxxxxxxxxx"
}
```

Response:
```json
{
  "success": true,
  "data": {
    "runnerId": "runner-001",
    "runnerName": "k8s-builder",
    "status": "registered",
    "registeredAt": "2024-02-06T14:00:00Z"
  },
  "message": "GitLab Runner registered successfully"
}
```

### Get Harbor Configuration

```http
GET /api/v1/cicd/harbor/config
Authorization: Bearer <access_token>
```

Response:
```json
{
  "success": true,
  "data": {
    "harborUrl": "https://harbor.example.com",
    "enabled": true,
    "version": "2.8.0",
    "connected": true,
    "apiVersion": "v2.0",
    "projects": [
      {
        "name": "api-server",
        "projectId": 1,
        "public": false,
        "createdAt": "2024-02-01T10:00:00Z"
      }
    ]
  }
}
```

### Connect Harbor Registry

```http
POST /api/v1/cicd/harbor/connect
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "harborUrl": "https://harbor.example.com",
  "username": "robot-user",
  "password": "harbor-robot-token",
  "projectName": "api-server",
  "enableVulnerabilityScanning": true,
  "enableSignatureVerification": true
}
```

Response:
```json
{
  "success": true,
  "data": {
    "projectId": 1,
    "projectName": "api-server",
    "registryUrl": "harbor.example.com/api-server",
    "webhookUrl": "https://harbor.example.com/webhook/k8s-manager"
    "connectedAt": "2024-02-06T14:00:00Z"
  },
  "message": "Harbor registry connected successfully"
}
```

### Push Image to Harbor

```http
POST /api/v1/cicd/harbor/push
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "sourceImage": "gitlab-runner:api-server:1.2.0",
  "targetProject": "api-server",
  "targetTag": "1.2.0",
  "targetTagLatest": true,
  "enableVulnerabilityScan": true,
  "signImage": true
}
```

Response:
```json
{
  "success": true,
  "data": {
    "image": "harbor.example.com/api-server:1.2.0",
    "digest": "sha256:abc123def456...",
    "vulnerabilityScan": {
      "status": "in_progress",
      "scanId": "scan-123",
      "severityCounts": { "High": 0, "Medium": 2, "Low": 5 }
    }
  },
  "message": "Image pushed to Harbor successfully"
}
```

### Get Vulnerability Scan Results

```http
GET /api/v1/cicd/harbor/vulnerabilities/{projectId}?severity={level}&tag={tag}
Authorization: Bearer <access_token>
```

Response:
```json
{
  "success": true,
  "data": {
    "projectId": 1,
    "imageTag": "1.2.0",
    "vulnerabilities": [
      {
        "id": "CVE-2023-1234",
        "severity": "Medium",
        "package": "npm-package",
        "version": "1.5.0",
        "fixedVersion": "1.6.0",
        "description": "XXE vulnerability in XML parser"
      },
      {
        "id": "CVE-2023-5678",
        "severity": "High",
        "package": "openssl",
        "version": "1.1.1",
        "fixedVersion": "1.1.1k",
        "description": "Buffer overflow in TLS handshake"
      }
    ],
    "summary": {
      "total": 12,
      "critical": 0,
      "high": 2,
      "medium": 5,
      "low": 5
    }
  }
}
```

### Get ArgoCD Configuration

```http
GET /api/v1/cicd/argocd/config
Authorization: Bearer <access_token>
```

Response:
```json
{
  "success": true,
  "data": {
    "argocdUrl": "https://argocd.example.com",
    "enabled": true,
    "version": "2.6.0",
    "connected": true,
    "namespaces": [
      "production",
      "staging",
      "development"
    ]
  }
}
```

### Create ArgoCD Application

```http
POST /api/v1/cicd/argocd/applications
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "name": "api-server",
  "namespace": "argocd",
  "project": "default",
  "source": {
    "repoUrl": "https://gitlab.example.com/my-project/app.git",
    "targetRevision": "main",
    "path": "k8s/manifests"
  },
  "destination": {
    "server": "https://kubernetes.default.svc",
    "namespace": "production"
  },
  "syncPolicy": {
    "automated": true,
    "syncOptions": ["CreateNamespace=true", "PruneLast=true"],
    "retryStrategy": { "limit": 5, "backoff": { "duration": "5s", "factor": 2 } }
  },
  "kustomize": {
    "images": ["harbor.example.com/api-server:1.2.0"]
  }
}
```

Response:
```json
{
  "success": true,
  "data": {
    "applicationName": "api-server",
    "namespace": "argocd",
    "operationState": {
      "phase": "Running",
      "message": "Creating application resources"
    },
    "syncStatus": {
      "status": "Synced",
      "revision": "a1b2c3d4e5f6",
      "syncedAt": "2024-02-06T14:00:00Z"
    }
  },
  "message": "ArgoCD application created successfully"
}
```

### Sync ArgoCD Application

```http
POST /api/v1/cicd/argocd/applications/{name}/sync
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "dryRun": false,
  "strategy": {
    "apply": "force"
  },
  "resources": ["*", "*/*"]
}
```

Response:
```json
{
  "success": true,
  "data": {
    "applicationName": "api-server",
    "syncStatus": "Syncing",
    "operationId": "sync-abc123",
    "startedAt": "2024-02-06T14:00:00Z"
  },
  "message": "ArgoCD application sync started"
}
```

### Get ArgoCD Applications

```http
GET /api/v1/cicd/argocd/applications?namespace={ns}&status={state}
Authorization: Bearer <access_token>
```

**Query Parameters:**
- `namespace` (optional) - Filter by namespace
- `status` (optional) - Filter by status: `Synced`, `OutOfSync`, `Unknown`

Response:
```json
{
  "success": true,
  "data": {
    "applications": [
      {
        "name": "api-server",
        "namespace": "production",
        "project": "default",
        "syncStatus": "Synced",
        "healthStatus": "Healthy",
        "operationState": {
          "phase": "Succeeded",
          "message": "Operation successful"
        },
        "syncHistory": [
          {
            "revision": "a1b2c3d4e5f6",
            "deployedAt": "2024-02-06T14:00:00Z",
            "status": "Synced",
            "duration": "45s"
          }
        ]
      }
    ]
  }
}
```

### Rollback ArgoCD Application

```http
POST /api/v1/cicd/argocd/applications/{name}/rollback
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "revision": "a1b2c3d4e5f6",
  "dryRun": false
}
```

Response:
```json
{
  "success": true,
  "data": {
    "applicationName": "api-server",
    "rolledBackTo": "a1b2c3d4e5f6",
    "rolledBackAt": "2024-02-06T14:30:00Z",
    "previousRevision": "def456ghi789"
  },
  "message": "ArgoCD application rolled back successfully"
}
```

### Get Pipeline History

```http
GET /api/v1/cicd/history?application={app}&environment={env}&startDate={date}&endDate={date}
Authorization: Bearer <access_token>
```

**Query Parameters:**
- `application` (optional) - Filter by application
- `environment` (optional) - Filter by environment
- `startDate` (optional) - Start date (ISO 8601)
- `endDate` (optional) - End date (ISO 8601)

Response:
```json
{
  "success": true,
  "data": {
    "application": "api-server",
    "environment": "production",
    "history": [
      {
        "pipelineId": 123456,
        "buildNumber": 1234,
        "status": "success",
        "triggeredBy": "user@example.com",
        "branch": "main",
        "commit": "a1b2c3d4e5f6",
        "message": "Update API server to v1.2.0",
        "startedAt": "2024-02-06T13:55:00Z",
        "finishedAt": "2024-02-06T14:00:30Z",
        "duration": "5m 30s",
        "image": "harbor.example.com/api-server:1.2.0",
        "deployedTo": "production"
      }
    ],
    "total": 125
  }
}
```

### Get Pipeline Details

```http
GET /api/v1/cicd/pipelines/{pipelineId}
Authorization: Bearer <access_token>
```

Response:
```json
{
  "success": true,
  "data": {
    "pipelineId": 123456,
    "buildNumber": 1234,
    "status": "success",
    "triggeredBy": "user@example.com",
    "branch": "main",
    "commit": "a1b2c3d4e5f6",
    "message": "Update API server to v1.2.0",
    "startedAt": "2024-02-06T13:55:00Z",
    "finishedAt": "2024-02-06T14:00:30Z",
    "duration": "5m 30s",
    "stages": [
      {
        "name": "clone",
        "status": "success",
        "startedAt": "2024-02-06T13:55:00Z",
        "finishedAt": "2024-02-06T13:55:30Z",
        "duration": "30s"
      },
      {
        "name": "build",
        "status": "success",
        "startedAt": "2024-02-06T13:55:30Z",
        "finishedAt": "2024-02-06T13:57:45Z",
        "duration": "2m 15s"
      },
      {
        "name": "test",
        "status": "success",
        "startedAt": "2024-02-06T13:57:45Z",
        "finishedAt": "2024-02-06T13:59:15Z",
        "duration": "1m 30s"
      },
      {
        "name": "deploy",
        "status": "success",
        "startedAt": "2024-02-06T13:59:15Z",
        "finishedAt": "2024-02-06T14:00:30Z",
        "duration": "1m 15s"
      }
    ],
    "artifacts": [
      {
        "name": "api-server.jar",
        "size": "256MB",
        "path": "/build/libs/api-server.jar"
      },
      {
        "name": "api-server-image.tar",
        "size": "512MB",
        "path": "/build/api-server-image.tar"
      }
    ],
    "deployedTo": "production",
    "deployedImage": "harbor.example.com/api-server:1.2.0",
    "gitlabUrl": "https://gitlab.example.com/my-project/app/pipelines/123456"
  }
}
```

### Get Pipeline Logs

```http
GET /api/v1/cicd/pipelines/{pipelineId}/logs?stage={name}
Authorization: Bearer <access_token>
```

**Query Parameters:**
- `stage` (optional) - Filter by stage name

Response:
```json
{
  "success": true,
  "data": {
    "pipelineId": 123456,
    "stage": "build",
    "logs": [
      {
        "timestamp": "2024-02-06T13:55:30.000Z",
        "level": "INFO",
        "message": "Starting build process"
      },
      {
        "timestamp": "2024-02-06T13:55:35.000Z",
        "level": "INFO",
        "message": "Compiling Java sources"
      },
      {
        "timestamp": "2024-02-06T13:56:00.000Z",
        "level": "WARNING",
        "message": "Dependency vulnerability found: CVE-2023-1234"
      },
      {
        "timestamp": "2024-02-06T13:57:45.000Z",
        "level": "INFO",
        "message": "Build completed successfully"
      }
    ],
    "downloadUrl": "https://k8s-manager.example.com/api/v1/cicd/pipelines/123456/logs/download"
  }
}
```

### Configure GitLab Webhook

```http
POST /api/v1/cicd/gitlab/webhooks/configure
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "repositoryId": "repo-001",
  "events": ["push", "merge_request", "tag_push"],
  "triggerConditions": {
    "branches": ["main", "develop"],
    "paths": ["src/", "k8s/"],
    "skipCi": false
  },
  "secretToken": "webhook-secret-abc123"
}
```

---

## GitOps Workflow

### Continuous Delivery Pipeline

```
Developer Push → GitLab
              ↓
    Branch Protection (Code Review)
              ↓
    GitLab CI Pipeline (GitLab Runner)
              ↓
    Build → Test → Security Scan
              ↓
    Push Image to Harbor
              ↓
    Update ArgoCD Application (auto)
              ↓
    Deploy to Kubernetes
              ↓
    Health Check & Auto-rollback
```

### Image Promotion Flow

```
Dev Environment:
Build → harbor.example.com/app:dev-1.2.0
            ↓ (manual approval)
Staging Environment:
Promote → harbor.example.com/app:staging-1.2.0
            ↓ (manual approval)
Production Environment:
Promote → harbor.example.com/app:1.2.0
            ↓
    Update ArgoCD app (git tag)
            ↓
    Deploy to production
```

---

## Frontend Components

### CICDDashboard Component

```typescript
function CICDDashboard() {
  const { data: gitLab } = useGitLabConfig();
  const { data: argoCD } = useArgoCDConfig();
  const { data: harbor } = useHarborConfig();
  const [activeTab, setActiveTab] = useState<'pipelines' | 'applications' | 'history'>('pipelines');

  return (
    <div>
      <CICDHeader
        gitLab={gitLab}
        argoCD={argoCD}
        harbor={harbor}
      />

      <Tabs value={activeTab} onChange={setActiveTab}>
        <Tab label="Pipelines" value="pipelines">
          <PipelineList />
        </Tab>
        <Tab label="Applications" value="applications">
          <ArgoCDApplications />
        </Tab>
        <Tab label="History" value="history">
          <PipelineHistory />
        </Tab>
      </Tabs>

      <BuildStats
        successRate={95.5}
        avgBuildTime="5m 30s"
        activePipelines={3}
      />
    </div>
  );
}
```

### PipelineVisualizer Component

```typescript
function PipelineVisualizer({ pipelineId }: PipelineVisualizerProps) {
  const { data: pipeline } = usePipelineDetails(pipelineId);

  return (
    <div>
      <PipelineHeader
        buildNumber={pipeline?.buildNumber}
        status={pipeline?.status}
        branch={pipeline?.branch}
        commit={pipeline?.commit}
        duration={pipeline?.duration}
      />

      <PipelineGraph>
        {pipeline?.stages.map((stage, index) => (
          <StageNode
            key={stage.name}
            name={stage.name}
            status={stage.status}
            startTime={stage.startedAt}
            duration={stage.duration}
            onClick={() => openStageLogs(stage.name)}
          >
            <StageIcon type={getStageIcon(stage.name)} />
            <StageDuration>{stage.duration}</StageDuration>
          </StageNode>

          {index < pipeline.stages.length - 1 && (
            <ConnectionLine from={stage.name} to={pipeline.stages[index + 1].name} />
          )}
        ))}
      </PipelineGraph>
      </PipelineGraph>

      <ArtifactsSection
        artifacts={pipeline?.artifacts}
        onDownload={handleArtifactDownload}
      />
    </div>
  );
}
```

### ArgoCDApplicationView Component

```typescript
function ArgoCDApplicationView({ applicationName }: AppViewProps) {
  const { data: application } = useArgoCDApplication(applicationName);
  const [resources, setResources] = useState<[]>([]);

  const handleSync = async () => {
    await api.post(`/api/v1/cicd/argocd/applications/${applicationName}/sync`);
    showToast('Application sync started');
  };

  const handleRollback = async (revision: string) => {
    await api.post(`/api/v1/cicd/argocd/applications/${applicationName}/rollback`, { revision });
    showToast('Rollback initiated');
  };

  return (
    <div>
      <AppHeader
        name={application?.name}
        namespace={application?.namespace}
        healthStatus={application?.healthStatus}
        syncStatus={application?.syncStatus}
        onSync={handleSync}
      />

      <ResourceTree
        resources={application?.resources}
        namespace={application?.namespace}
      />

      <SyncHistory
        history={application?.syncHistory}
        onRollback={handleRollback}
      />

      <DiffView
        current={application?.manifest}
        target={application?.desiredManifest}
      />
    </div>
  );
}
```

### VulnerabilityReport Component

```typescript
function VulnerabilityReport({ projectId, imageTag }: VulnerabilityReportProps) {
  const { data: vulnerabilities } = useVulnerabilityScan(projectId, imageTag);

  return (
    <Card>
      <h2>Vulnerability Scan Results: {imageTag}</h2>

      <VulnerabilitySummary
        total={vulnerabilities?.summary?.total || 0}
        critical={vulnerabilities?.summary?.critical || 0}
        high={vulnerabilities?.summary?.high || 0}
        medium={vulnerabilities?.summary?.medium || 0}
        low={vulnerabilities?.summary?.low || 0}
      />

      <VulnerabilityList>
        {vulnerabilities?.vulnerabilities?.map(vuln => (
          <VulnerabilityCard
            key={vuln.id}
            severity={vuln.severity}
            package={vuln.package}
            version={vuln.version}
            cve={vuln.id}
            description={vuln.description}
            fixedVersion={vuln.fixedVersion}
          />
        ))}
      </VulnerabilityList>
    </Card>
  );
}
```

---

## RBAC Permissions

| Operation | Permission Required |
|-----------|-------------------|
| View GitLab config | READ + CICD |
| Connect GitLab repository | WRITE + CICD |
| Trigger pipeline | EXECUTE + CICD |
| View pipeline logs | READ + CICD |
| Manage GitLab Runner | ADMIN + CICD |
| Connect Harbor registry | WRITE + CICD |
| Push image to Harbor | WRITE + CICD |
| View vulnerability scan | READ + CICD |
| Configure ArgoCD app | WRITE + CICD |
| Sync ArgoCD app | EXECUTE + CICD |
| Rollback ArgoCD app | EXECUTE + CICD |
| View pipeline history | READ + CICD |

---

## Configuration

```properties
# GitLab
cicd.gitlab.enabled=true
cicd.gitlab.url=https://gitlab.example.com
cicd.gitlab.api-version=v4
cicd.gitlab.default-branch=main
cicd.gitlab.webhook-enabled=true
cicd.gitlab.webhook-secret=${GITLAB_WEBHOOK_SECRET}

# GitLab Runner
cicd.gitlab-runner.enabled=true
cicd.gitlab-runner.replicas=2
cicd.gitlab-runner.max-concurrent-jobs=10
cicd.gitlab-runner.cpu=2
cicd.gitlab-runner.memory=4Gi
cicd.gitlab-runner.tags=docker,java,nodejs
cicd.gitlab-runner.namespace=cicd

# Harbor
cicd.harbor.enabled=true
cicd.harbor.url=https://harbor.example.com
cicd.harbor.api-version=v2.0
cicd.harbor.vulnerability-scan=true
cicd.harbor.signature-verification=true
cicd.harbor.robot-user=cicd-robot

# ArgoCD
cicd.argocd.enabled=true
cicd.argocd.url=https://argocd.example.com
cicd.argocd.version=2.6.0
cicd.argocd.namespaces=production,staging,development
cicd.argocd.sync-policy=automated
cicd.argocd.sync-interval=3m

# Image Promotion
cicd.promotion.enabled=true
cicd.promotion.environments=dev,staging,production
cicd.promotion.approval-required=true
cicd.promotion.auto-promote-on-success=true

# Pipeline
cicd.pipeline.timeout-minutes=60
cicd.pipeline.retries=3
cicd.pipeline.artifact-retention-days=30
cicd.pipeline.log-retention-days=90
cicd.pipeline.max-history=1000
```

---

## Error Handling

### GitLab Connection Failed
```json
{
  "success": false,
  "message": "Failed to connect to GitLab repository",
  "error": "GITLAB_CONNECTION_FAILED",
  "statusCode": 500,
  "details": {
    "repositoryUrl": "https://gitlab.example.com/my-project/app",
    "reason": "Invalid access token or repository not found"
  }
}
```

### Harbor Push Failed
```json
{
  "success": false,
  "message": "Failed to push image to Harbor",
  "error": "HARBOR_PUSH_FAILED",
  "statusCode": 500,
  "details": {
    "sourceImage": "gitlab-runner:api-server:1.2.0",
    "reason": "Vulnerability scan failed or image size exceeded limit"
  }
}
```

### ArgoCD Sync Failed
```json
{
  "success": false,
  "message": "ArgoCD application sync failed",
  "error": "ARGOCD_SYNC_FAILED",
  "statusCode": 500,
  "details": {
    "applicationName": "api-server",
    "revision": "a1b2c3d4e5f6",
    "reason": "Manifest validation error or resource conflict"
  }
}
```

---

## Testing

```java
@SpringBootTest
@AutoConfigureMockMvc
public class CICDControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    public void testConnectGitLabRepository() throws Exception {
        mockMvc.perform(post("/api/v1/cicd/gitlab/repositories/connect")
                .contentType(MediaType.APPLICATION_JSON)
                .header("Authorization", "Bearer " + token)
                .content("{\"repositoryUrl\":\"https://gitlab.example.com/app\",\"accessToken\":\"glpat-xxx\"}"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.success").value(true));
    }

    @Test
    public void testTriggerPipeline() throws Exception {
        mockMvc.perform(post("/api/v1/cicd/gitlab/pipelines/trigger")
                .contentType(MediaType.APPLICATION_JSON)
                .header("Authorization", "Bearer " + token)
                .content("{\"repositoryId\":\"repo-001\",\"branch\":\"main\"}"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.success").value(true));
    }

    @Test
    public void testCreateArgoCDApplication() throws Exception {
        mockMvc.perform(post("/api/v1/cicd/argocd/applications")
                .contentType(MediaType.APPLICATION_JSON)
                .header("Authorization", "Bearer " + token)
                .content("{\"name\":\"api-server\",\"source\":{\"repoUrl\":\"https://gitlab.com/app.git\"}}"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.success").value(true));
    }
}
```

---

## Future Enhancements

- [ ] Multi-environment pipeline templates (dev → staging → prod)
- [ ] Approval workflow for production deployments (four-eyes principle)
- [ ] Automated rollback on health check failure
- [ ] Blue-green deployments via ArgoCD
- [ ] Canary deployments via ArgoCD
- [ ] Pipeline performance analytics
- [ ] Pipeline optimization suggestions
- [ ] Integration with Jira/Jira for issue tracking
- [ ] Custom CI/CD stages and plugins
- [ ] Secret management for CI/CD pipelines
- [ ] Integration with SonarQube for code quality
- [ ] Pipeline artifact scanning (dependencies, licenses)
- [ ] Build cache optimization
- [ ] Resource quota management for CI/CD jobs
- [ ] Multi-cluster ArgoCD deployment
- [ ] GitOps policy validation (e.g., forbidden containers)
- [ ] Automatic vulnerability patch recommendations
- [ ] Pipeline notifications (Slack, Email, PagerDuty)
- [ ] Pipeline rollback analysis (identify root cause)
- [ ] Integration with external CI systems (Jenkins, GitHub Actions)
- [ ] Compliance checking (e.g., CIS benchmarks)
- [ ] Infrastructure as Code (IaC) validation
- [ ] Pipeline cost tracking (compute, storage usage)
- [ ] Pipeline as Code (GitLab CI YAML editor)
- [ ] Scheduled builds and deployments
- [ ] Pipeline dependency graph visualization
