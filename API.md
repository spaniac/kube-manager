# K8s Manager API Documentation

## Overview

K8s Manager provides a comprehensive RESTful API for managing Kubernetes clusters, resources, and workloads. This document describes all available endpoints, authentication methods, request/response formats, and error handling.

**Base URL**: `https://k8s-manager.example.com/api/v1`

**API Version**: v1

**Authentication**: OAuth2/OIDC (Bearer Token required for most endpoints)

**Content-Type**: `application/json`

---

## Table of Contents

1. [Authentication](#authentication)
2. [Cluster Management](#cluster-management)
3. [Namespace Management](#namespace-management)
4. [Resource Management](#resource-management)
5. [Workload Management](#workload-management)
6. [Pod Management](#pod-management)
7. [Monitoring & Metrics](#monitoring--metrics)
8. [Log Management](#log-management)
9. [Terminal Management](#terminal-management)
10. [YAML Management](#yaml-management)
11. [Role Management (Admin)](#role-management-admin)
12. [User Management](#user-management)
13. [Error Responses](#error-responses)
14. [Data Types](#data-types)

---

## Authentication

All API endpoints (except login) require Bearer token authentication via the `Authorization` header:

```
Authorization: Bearer <access_token>
```

### Token Management

Tokens are obtained through OAuth2/OIDC authentication flow with Keycloak or compatible identity providers.

- **Access Token**: Used for API authentication. Default expiration: 1 hour (configurable)
- **Refresh Token**: Used to obtain new access tokens. Default expiration: 30 days (configurable)

### Token Refresh Flow

1. Frontend stores access and refresh tokens securely (HttpOnly cookies or in-memory)
2. When access token expires (within 5 minutes), frontend automatically uses refresh token
3. Backend validates refresh token and issues new access token
4. Frontend updates stored tokens and continues session

---

## Cluster Management

### Get Cluster Overview

Retrieve cluster information including name, version, node count, and health status.

**Endpoint**: `GET /api/v1/cluster`

**Authentication Required**: Yes (`READ` permission on `POD` resource)

**Response**:

```json
{
  "success": true,
  "data": {
    "name": "production-cluster",
    "version": "v1.28.2",
    "platform": "Linux/amd64",
    "nodesCount": 5,
    "podsCount": 47
  },
  "message": null
}
```

**Fields**:
- `name` (string): Cluster name
- `version` (string): Kubernetes version
- `platform` (string): Operating system/platform
- `nodesCount` (number): Total number of nodes
- `podsCount` (number): Total number of pods

---

### Get All Nodes

Retrieve list of all nodes in the cluster with their status and resource information.

**Endpoint**: `GET /api/v1/cluster/nodes`

**Authentication Required**: Yes (`READ` permission on `POD` resource)

**Query Parameters**:
- `namespace` (optional, string): Filter nodes by namespace (not applicable for cluster-level nodes)

**Response**:

```json
{
  "success": true,
  "data": [
    {
      "name": "node-1",
      "status": "Ready",
      "roles": ["control-plane", "worker"],
      "capacity": {
        "cpu": "4",
        "memory": "16Gi",
        "storage": "100Gi"
      },
      "allocatable": {
        "cpu": "3.8",
        "memory": "15.5Gi",
        "storage": "95Gi"
      },
      "conditions": [
        {
          "type": "Ready",
          "status": "True",
          "reason": "KubeletReady",
          "message": "Kubelet is ready"
        }
      ],
      "labels": {
        "node-role.kubernetes.io/control-plane": ""
      },
      "annotations": {},
      "createdAt": "2024-01-15T10:30:00Z"
    }
  ],
  "message": null
}
```

**Node Fields**:
- `name` (string): Node name
- `status` (string): Node status (`Ready`, `NotReady`, `Unknown`)
- `roles` (array[string]): Node roles
- `capacity` (object): Total resource capacity (CPU, memory, storage)
- `allocatable` (object): Available resources
- `conditions` (array[object]): Node conditions
- `labels` (object): Kubernetes labels
- `annotations` (object): Kubernetes annotations
- `createdAt` (datetime): Creation timestamp

---

### Get Node Details

Retrieve detailed information about a specific node.

**Endpoint**: `GET /api/v1/cluster/nodes/{name}`

**Authentication Required**: Yes (`READ` permission on `POD` resource)

**Path Parameters**:
- `name` (required, string): Node name

**Response**:

```json
{
  "success": true,
  "data": {
    "name": "node-1",
    "status": "Ready",
    "roles": ["control-plane"],
    "capacity": {
      "cpu": "4",
      "memory": "16Gi",
      "storage": "100Gi",
      "pods": "110"
    },
    "allocatable": {
      "cpu": "3.8",
      "memory": "15.5Gi",
      "storage": "95Gi",
      "pods": "95"
    },
    "nodeInfo": {
      "kernelVersion": "5.15.0",
      "kubeletVersion": "v1.28.2",
      "osImage": "Ubuntu 22.04 LTS",
      "containerRuntimeVersion": "containerd://1.6.9"
    },
    "taints": [
      {
        "key": "node-role.kubernetes.io/control-plane",
        "value": "",
        "effect": "NoSchedule"
      }
    ],
    "labels": {
      "kubernetes.io/hostname": "node-1"
    },
    "annotations": {},
    "conditions": [
      {
        "type": "Ready",
        "status": "True",
        "reason": "KubeletReady",
        "message": "Kubelet is ready",
        "lastTransitionTime": "2024-01-15T10:30:00Z"
      }
    ],
    "createdAt": "2024-01-15T10:30:00Z"
  },
  "message": null
}
```

---

### Cordon Node

Mark a node as unschedulable to prevent new pods from being scheduled.

**Endpoint**: `POST /api/v1/cluster/nodes/{name}/cordon`

**Authentication Required**: Yes (`WRITE` permission on `POD` resource)

**Path Parameters**:
- `name` (required, string): Node name

**Response**:

```json
{
  "success": true,
  "data": null,
  "message": "Node cordoned successfully"
}
```

**Error Response** (404):

```json
{
  "success": false,
  "error": "Node not found"
}
```

---

### Uncordon Node

Mark a cordoned node as schedulable again.

**Endpoint**: `POST /api/v1/cluster/nodes/{name}/uncordon`

**Authentication Required**: Yes (`WRITE` permission on `POD` resource)

**Path Parameters**:
- `name` (required, string): Node name

**Response**:

```json
{
  "success": true,
  "data": null,
  "message": "Node uncordoned successfully"
}
```

---

### Drain Node

Safely evict all pods from a node for maintenance.

**Endpoint**: `POST /api/v1/cluster/nodes/{name}/drain`

**Authentication Required**: Yes (`WRITE` permission on `POD` resource)

**Path Parameters**:
- `name` (required, string): Node name

**Response**:

```json
{
  "success": true,
  "data": null,
  "message": "Node drained successfully"
}
```

---

### Get Cluster Health

Retrieve overall cluster health status.

**Endpoint**: `GET /api/v1/cluster/health`

**Authentication Required**: Yes (`READ` permission on `POD` resource)

**Response**:

```json
{
  "success": true,
  "data": {
    "healthy": true,
    "message": "All components healthy",
    "components": [
      {
        "name": "API Server",
        "status": "Healthy"
      },
      {
        "name": "Controller Manager",
        "status": "Healthy"
      },
      {
        "name": "Scheduler",
        "status": "Healthy"
      },
      {
        "name": "Kubelet",
        "status": "Healthy"
      }
    ],
    "warnings": []
  },
  "message": null
}
```

**Health Fields**:
- `healthy` (boolean): Overall cluster health status
- `message` (string): Health status message
- `components` (array[object]): Health status of individual components
- `warnings` (array[string]): Health warnings

---

### Get Cluster Resource Usage

Retrieve aggregate resource usage across the cluster.

**Endpoint**: `GET /api/v1/cluster/resources`

**Authentication Required**: Yes (`READ` permission on `POD` resource)

**Response**:

```json
{
  "success": true,
  "data": {
    "total": {
      "cpu": "20",
      "memory": "80Gi",
      "storage": "500Gi",
      "pods": "110"
    },
    "available": {
      "cpu": "8.5",
      "memory": "40Gi",
      "storage": "250Gi"
    },
    "usage": {
      "cpu": "11.5",
      "memory": "40Gi",
      "storage": "250Gi"
    },
    "percentage": {
      "cpu": 57.5,
      "memory": 100,
      "storage": 100
    }
  },
  "message": null
}
```

---

### Get Cluster Events

Retrieve recent cluster events with filtering options.

**Endpoint**: `GET /api/v1/cluster/events`

**Authentication Required**: Yes (`READ` permission on `POD` resource)

**Query Parameters**:
- `namespace` (optional, string): Filter events by namespace
- `type` (optional, string): Filter by event type (`Warning`, `Normal`)
- `limit` (optional, number): Maximum number of events to return (default: 100)

**Response**:

```json
{
  "success": true,
  "data": {
    "events": [
      {
        "type": "Warning",
        "reason": "FailedScheduling",
        "message": "0/5 nodes are available: 3 Insufficient cpu",
        "source": "scheduler",
        "involvedObject": {
          "kind": "Pod",
          "name": "nginx-deployment-xxx",
          "namespace": "default"
        },
        "count": 3,
        "firstTimestamp": "2024-01-15T10:30:00Z",
        "lastTimestamp": "2024-01-15T10:35:00Z"
      }
    ],
    "total": 1
  },
  "message": null
}
```

---

### Get Cluster Metrics History

Retrieve historical metrics data for the cluster.

**Endpoint**: `GET /api/v1/cluster/metrics/history`

**Authentication Required**: Yes (`READ` permission on `POD` resource)

**Query Parameters**:
- `range` (optional, string): Time range (`1h`, `6h`, `24h`, `7d`, `30d`, default: `24h`)
- `metricType` (optional, string): Type of metrics (`cpu`, `memory`, `storage`)

**Response**:

```json
{
  "success": true,
  "data": {
    "timeRange": "7d",
    "dataPoints": [
      {
        "timestamp": "2024-01-15T00:00:00Z",
        "cpu": "12.5",
        "memory": "40Gi",
        "storage": "250Gi"
      },
      {
        "timestamp": "2024-01-15T01:00:00Z",
        "cpu": "13.2",
        "memory": "42Gi",
        "storage": "255Gi"
      }
    ]
  }
}
```

---

## Namespace Management

### List Namespaces

Retrieve all namespaces accessible to the current user based on RBAC permissions.

**Endpoint**: `GET /api/v1/namespaces`

**Authentication Required**: Yes (`READ` permission on `NAMESPACE` resource)

**Query Parameters**:
- `query` (optional, string): Search namespaces by name or label

**Response**:

```json
{
  "success": true,
  "data": [
    {
      "name": "default",
      "status": "Active",
      "labels": {
        "name": "default"
      },
      "annotations": {},
      "createdAt": "2024-01-15T10:30:00Z"
    },
    {
      "name": "production",
      "status": "Active",
      "labels": {
        "environment": "production",
        "team": "platform"
      },
      "annotations": {
        "owner": "platform-team"
      },
      "createdAt": "2024-01-15T10:30:00Z"
    }
  ]
}
```

---

### Get Namespace Details

Retrieve detailed information about a specific namespace.

**Endpoint**: `GET /api/v1/namespaces/{name}`

**Authentication Required**: Yes (`READ` permission on `NAMESPACE` resource)

**Path Parameters**:
- `name` (required, string): Namespace name

**Response**:

```json
{
  "success": true,
  "data": {
    "name": "production",
    "status": "Active",
    "labels": {
      "environment": "production",
      "team": "platform"
    },
    "annotations": {
      "owner": "platform-team",
      "contact": "team@example.com"
    },
    "createdAt": "2024-01-15T10:30:00Z",
    "resourceQuotas": {
      "cpu": "10",
      "memory": "20Gi",
      "storage": "100Gi",
      "pods": "50"
    },
    "resourceUsage": {
      "cpu": "7.5",
      "memory": "15Gi",
      "storage": "80Gi",
      "pods": "32"
    },
    "limitRanges": {
      "cpu": {
        "default": "100m",
        "min": "100m",
        "max": "2"
      },
      "memory": {
        "default": "256Mi",
        "min": "128Mi",
        "max": "4Gi"
      }
    },
    "roleAssignments": [
      {
        "user": "john@example.com",
        "role": "developer"
      },
      {
        "user": "jane@example.com",
        "role": "viewer"
      }
    ],
    "networkPolicies": [
      {
        "name": "deny-all-ingress",
        "namespace": "production"
      }
    ]
  },
  "message": null
}
```

---

### Create Namespace

Create a new namespace with optional labels and annotations.

**Endpoint**: `POST /api/v1/namespaces`

**Authentication Required**: Yes (`WRITE` permission on `NAMESPACE` resource)

**Request Body**:

```json
{
  "name": "my-app",
  "labels": {
    "environment": "development",
    "team": "backend"
  },
  "annotations": {
    "owner": "john@example.com",
    "description": "Backend development namespace"
  },
  "resourceQuotas": {
    "cpu": "5",
    "memory": "10Gi",
    "storage": "50Gi",
    "pods": "20"
  },
  "limitRanges": {
    "cpu": {
      "default": "100m",
      "min": "100m",
      "max": "1"
    },
    "memory": {
      "default": "256Mi",
      "min": "128Mi",
      "max": "2Gi"
    }
  }
}
```

**Response**:

```json
{
  "success": true,
  "data": {
    "name": "my-app",
    "status": "Active",
    "labels": {
      "environment": "development",
      "team": "backend"
    },
    "annotations": {
      "owner": "john@example.com",
      "description": "Backend development namespace"
    },
    "createdAt": "2024-01-15T10:30:00Z"
  },
  "message": "Namespace created successfully"
}
```

---

### Update Namespace

Update an existing namespace.

**Endpoint**: `PUT /api/v1/namespaces/{name}`

**Authentication Required**: Yes (`WRITE` permission on `NAMESPACE` resource)

**Path Parameters**:
- `name` (required, string): Namespace name

**Request Body**:

```json
{
  "labels": {
    "environment": "staging"
  },
  "annotations": {
    "description": "Updated description"
  },
  "resourceQuotas": {
    "cpu": "10",
    "memory": "20Gi"
  }
}
```

**Response**:

```json
{
  "success": true,
  "data": {
    "name": "production",
    "status": "Active",
    "labels": {
      "environment": "staging"
    },
    "annotations": {
      "description": "Updated description"
    }
  },
  "message": "Namespace updated successfully"
}
```

---

### Delete Namespace

Delete a namespace and all resources within it with protection for production environments.

**Endpoint**: `DELETE /api/v1/namespaces/{name}`

**Authentication Required**: Yes (`DELETE` permission on `NAMESPACE` resource)

**Path Parameters**:
- `name` (required, string): Namespace name

**Query Parameters**:
- `force` (optional, boolean): Force deletion of production namespace (default: false)
- `gracePeriodSeconds` (optional, number): Grace period in seconds (default: 0)

**Response**:

```json
{
  "success": true,
  "data": null,
  "message": "Namespace deleted successfully"
}
```

**Error Response** (if production namespace without force):

```json
{
  "success": false,
  "error": "Cannot delete production namespace. Use force=true to override."
}
```

---

### Get Namespace Quota

Retrieve resource quota information for a namespace.

**Endpoint**: `GET /api/v1/namespaces/{name}/quota`

**Authentication Required**: Yes (`READ` permission on `NAMESPACE` resource)

**Path Parameters**:
- `name` (required, string): Namespace name

**Response**:

```json
{
  "success": true,
  "data": {
    "cpu": {
      "hard": "10",
      "used": "7.5",
      "remaining": "2.5"
    },
    "memory": {
      "hard": "20Gi",
      "used": "15Gi",
      "remaining": "5Gi"
    },
    "storage": {
      "hard": "100Gi",
      "used": "80Gi",
      "remaining": "20Gi"
    },
    "pods": {
      "hard": "50",
      "used": "32",
      "remaining": 18
    }
  }
}
```

---

## Resource Management

### List Resources (Generic)

Retrieve resources of a specific type with filtering and sorting.

**Endpoint**: `GET /api/v1/resources/{type}`

**Authentication Required**: Yes (`READ` permission on `POD` resource)

**Path Parameters**:
- `type` (required, string): Resource type (`pods`, `deployments`, `services`, `configmaps`, `secrets`, `statefulsets`, `daemonsets`, `jobs`, `cronjobs`)

**Query Parameters**:
- `namespace` (optional, string): Filter by namespace
- `labelSelector` (optional, string): Filter by Kubernetes label selector (e.g., `app=nginx`)
- `sortField` (optional, string): Sort field (`name`, `createdAt`, `status`)
- `sortOrder` (optional, string): Sort order (`asc`, `desc`)
- `page` (optional, number): Page number (default: 1)
- `pageSize` (optional, number): Items per page (default: 50)

**Response**:

```json
{
  "success": true,
  "data": {
    "items": [
      {
        "name": "nginx-pod-xxx",
        "namespace": "default",
        "status": "Running",
        "labels": {
          "app": "nginx"
        },
        "createdAt": "2024-01-15T10:30:00Z"
      }
    ],
    "total": 47,
    "page": 1,
    "pageSize": 50,
    "totalPages": 1
  }
}
```

---

### Get Resource Details (Generic)

Retrieve detailed information about a specific resource.

**Endpoint**: `GET /api/v1/resources/{type}/{name}`

**Authentication Required**: Yes (`READ` permission on `POD` resource)

**Path Parameters**:
- `type` (required, string): Resource type
- `name` (required, string): Resource name

**Query Parameters**:
- `namespace` (optional, string): Namespace (if not specified, searches all namespaces)

**Response**:

```json
{
  "success": true,
  "data": {
    "name": "nginx-deployment",
    "namespace": "default",
    "kind": "Deployment",
    "status": "Running",
    "labels": {
      "app": "nginx",
      "version": "v1.2.0"
    },
    "annotations": {
      "description": "Nginx web server"
    },
    "spec": {
      "replicas": 3,
      "selector": {
        "app": "nginx"
      },
      "strategy": {
        "type": "RollingUpdate",
        "rollingUpdate": {
          "maxSurge": 1,
          "maxUnavailable": 1
        }
      }
    },
    "containers": [
      {
        "name": "nginx",
        "image": "nginx:1.21.0",
        "ports": [
          {
            "containerPort": 80,
            "protocol": "TCP"
          }
        ],
        "resources": {
          "requests": {
            "cpu": "100m",
            "memory": "128Mi"
          },
          "limits": {
            "cpu": "500m",
            "memory": "512Mi"
          }
        }
      }
    ],
    "conditions": [
      {
        "type": "Available",
        "status": "True",
        "reason": "MinimumReplicasAvailable",
        "message": "Deployment has minimum availability"
      }
    ],
    "createdAt": "2024-01-15T10:30:00Z",
    "updatedAt": "2024-01-15T11:30:00Z"
  },
  "message": null
}
```

---

### Update Resource (Generic)

Update an existing resource.

**Endpoint**: `PUT /api/v1/resources/{type}/{name}`

**Authentication Required**: Yes (`WRITE` permission on `POD` resource)

**Path Parameters**:
- `type` (required, string): Resource type
- `name` (required, string): Resource name

**Query Parameters**:
- `namespace` (optional, string): Namespace

**Request Body**:

```json
{
  "labels": {
    "updated": "true"
  },
  "annotations": {
    "reason": "Manual update"
  },
  "spec": {
    "replicas": 5
  }
}
```

**Response**:

```json
{
  "success": true,
  "data": {
    "name": "nginx-deployment",
    "namespace": "default",
    "spec": {
      "replicas": 5
    }
  },
  "message": "Resource updated successfully"
}
```

---

### Delete Resource (Generic)

Delete a resource.

**Endpoint**: `DELETE /api/v1/resources/{type}/{name}`

**Authentication Required**: Yes (`DELETE` permission on `POD` resource)

**Path Parameters**:
- `type` (required, string): Resource type
- `name` (required, string): Resource name

**Query Parameters**:
- `namespace` (optional, string): Namespace

**Response**:

```json
{
  "success": true,
  "data": null,
  "message": "Resource deleted successfully"
}
```

---

### Get Resource Status Badge

Retrieve a status badge indicating resource health.

**Endpoint**: `GET /api/v1/resources/{type}/{name}/status-badge`

**Authentication Required**: Yes (`READ` permission on `POD` resource)

**Path Parameters**:
- `type` (required, string): Resource type
- `name` (required, string): Resource name

**Query Parameters**:
- `namespace` (optional, string): Namespace

**Response**:

```json
{
  "success": true,
  "data": {
    "status": "Running",
    "badge": {
      "label": "Healthy",
      "color": "green",
      "icon": "check-circle"
    },
    "message": "Deployment is healthy"
  }
}
```

---

## Workload Management

### List Deployments

Retrieve all deployments with optional filtering.

**Endpoint**: `GET /api/v1/workloads/deployments`

**Authentication Required**: Yes (`READ` permission on `DEPLOYMENT` resource)

**Query Parameters**:
- `namespace` (optional, string): Filter by namespace
- `search` (optional, string): Search by name or label

**Response**:

```json
{
  "success": true,
  "data": {
    "items": [
      {
        "name": "nginx-deployment",
        "namespace": "default",
        "replicas": 3,
        "availableReplicas": 3,
        "updatedReplicas": 3,
        "readyReplicas": 3,
        "status": "Running",
        "strategy": {
          "type": "RollingUpdate",
          "maxSurge": 1,
          "maxUnavailable": 1
        },
        "labels": {
          "app": "nginx"
        },
        "createdAt": "2024-01-15T10:30:00Z",
        "updatedAt": "2024-01-15T11:30:00Z"
      }
    ],
    "total": 5
  },
  "message": null
}
```

---

### Get Deployment Details

Retrieve detailed information about a specific deployment.

**Endpoint**: `GET /api/v1/workloads/deployments/{namespace}/{name}`

**Authentication Required**: Yes (`READ` permission on `DEPLOYMENT` resource)

**Path Parameters**:
- `namespace` (required, string): Namespace
- `name` (required, string): Deployment name

**Response**:

```json
{
  "success": true,
  "data": {
    "name": "nginx-deployment",
    "namespace": "default",
    "replicas": 3,
    "availableReplicas": 3,
    "updatedReplicas": 3,
    "readyReplicas": 3,
    "status": "Running",
    "strategy": {
      "type": "RollingUpdate",
      "rollingUpdate": {
        "maxSurge": 1,
        "maxUnavailable": 1
      }
    },
    "selector": {
      "app": "nginx"
    },
    "labels": {
      "app": "nginx",
      "version": "v1.2.0"
    },
    "annotations": {
      "description": "Nginx web server deployment"
    },
    "containers": [
      {
        "name": "nginx",
        "image": "nginx:1.21.0",
        "ports": [
          {
            "containerPort": 80,
            "protocol": "TCP"
          }
        ],
        "resources": {
          "requests": {
            "cpu": "100m",
            "memory": "128Mi"
          },
          "limits": {
            "cpu": "500m",
            "memory": "512Mi"
          }
        },
        "env": [
          {
            "name": "PORT",
            "value": "80"
          }
        ]
      }
    ],
    "conditions": [
      {
        "type": "Available",
        "status": "True",
        "reason": "MinimumReplicasAvailable"
        "message": "Deployment has minimum availability",
        "lastTransitionTime": "2024-01-15T10:30:00Z"
      }
    ],
    "revisionHistory": [
      {
        "revision": 1,
        "createdAt": "2024-01-15T10:30:00Z",
        "image": "nginx:1.20.0"
      },
      {
        "revision": 2,
        "createdAt": "2024-01-15T11:00:00Z",
        "image": "nginx:1.21.0"
      }
    ],
    "metrics": {
      "cpu": {
        "usage": "250m",
        "request": "300m",
        "limit": "1500m"
      },
      "memory": {
        "usage": "1.2Gi",
        "request": "384Mi",
        "limit": "1.5Gi"
      }
    },
    "createdAt": "2024-01-15T10:30:00Z",
    "updatedAt": "2024-01-15T11:30:00Z"
  },
  "message": null
}
```

---

### Create Deployment

Create a new deployment.

**Endpoint**: `POST /api/v1/workloads/deployments`

**Authentication Required**: Yes (`WRITE` permission on `DEPLOYMENT` resource)

**Request Body**:

```json
{
  "name": "my-app",
  "namespace": "default",
  "replicas": 3,
  "image": "myapp:1.0.0",
  "ports": [
    {
      "containerPort": 8080,
      "protocol": "TCP"
    }
  ],
  "resources": {
    "requests": {
      "cpu": "100m",
      "memory": "128Mi"
    },
    "limits": {
      "cpu": "500m",
      "memory": "512Mi"
    }
  },
  "env": [
    {
      "name": "ENVIRONMENT",
      "value": "production"
    },
    {
      "name": "PORT",
      "value": "8080"
    }
  ],
  "labels": {
    "app": "myapp",
    "version": "v1.0.0"
  },
  "strategy": {
    "type": "RollingUpdate",
    "rollingUpdate": {
      "maxSurge": 1,
      "maxUnavailable": 1
    }
  }
}
```

**Response**:

```json
{
  "success": true,
  "data": {
    "name": "my-app",
    "namespace": "default",
    "replicas": 3,
    "status": "Creating"
  },
  "message": "Deployment created successfully"
}
```

---

### Scale Deployment

Scale the number of replicas for a deployment.

**Endpoint**: `PUT /api/v1/workloads/deployments/{namespace}/{name}/scale`

**Authentication Required**: Yes (`WRITE` permission on `DEPLOYMENT` resource)

**Path Parameters**:
- `namespace` (required, string): Namespace
- `name` (required, string): Deployment name

**Request Body**:

```json
{
  "replicas": 5
}
```

**Response**:

```json
{
  "success": true,
  "data": {
    "name": "nginx-deployment",
    "namespace": "default",
    "replicas": 5,
    "availableReplicas": 3,
    "status": "Scaling"
  },
  "message": "Deployment scaled successfully"
}
```

---

### Restart Deployment

Trigger a rolling restart for a deployment.

**Endpoint**: `POST /api/v1/workloads/deployments/{namespace}/{name}/restart`

**Authentication Required**: Yes (`WRITE` permission on `DEPLOYMENT` resource)

**Path Parameters**:
- `namespace` (required, string): Namespace
- `name` (required, string): Deployment name

**Response**:

```json
{
  "success": true,
  "data": {
    "name": "nginx-deployment",
    "namespace": "default",
    "replicas": 3,
    "status": "Restarting"
  },
  "message": "Deployment restart initiated"
}
```

---

### Delete Deployment

Delete a deployment and all associated pods.

**Endpoint**: `DELETE /api/v1/workloads/deployments/{namespace}/{name}`

**Authentication Required**: Yes (`DELETE` permission on `DEPLOYMENT` resource)

**Path Parameters**:
- `namespace` (required, string): Namespace
- `name` (required, string): Deployment name

**Response**:

```json
{
  "success": true,
  "data": null,
  "message": "Deployment deleted successfully"
}
```

---

### Rollback Deployment

Roll back a deployment to a previous revision.

**Endpoint**: `POST /api/v1/workloads/deployments/{namespace}/{name}/rollback`

**Authentication Required**: Yes (`WRITE` permission on `DEPLOYMENT` resource)

**Path Parameters**:
- `namespace` (required, string): Namespace
- `name` (required, string): Deployment name

**Request Body**:

```json
{
  "revision": 1
}
```

**Response**:

```json
{
  "success": true,
  "data": {
    "name": "nginx-deployment",
    "namespace": "default",
    "replicas": 3,
    "revision": 1,
    "status": "RollingBack"
  },
  "message": "Deployment rolled back successfully"
}
```

---

### Get Deployment Revision History

Retrieve the revision history for a deployment.

**Endpoint**: `GET /api/v1/workloads/deployments/{namespace}/{name}/revisions`

**Authentication Required**: Yes (`READ` permission on `DEPLOYMENT` resource)

**Path Parameters**:
- `namespace` (required, string): Namespace
- `name` (required, string): Deployment name

**Response**:

```json
{
  "success": true,
  "data": [
    {
      "revision": 1,
      "createdAt": "2024-01-15T10:30:00Z",
      "image": "nginx:1.20.0",
      "changeCause": "Initial deployment"
    },
    {
      "revision": 2,
      "createdAt": "2024-01-15T11:00:00Z",
      "image": "nginx:1.21.0",
      "changeCause": "Image update to v1.21.0"
    }
  ],
  "message": null
}
```

---

### Update Deployment Image

Update the container image for a deployment.

**Endpoint**: `PUT /api/v1/workloads/deployments/{namespace}/{name}/image`

**Authentication Required**: Yes (`WRITE` permission on `DEPLOYMENT` resource)

**Path Parameters**:
- `namespace` (required, string): Namespace
- `name` (required, string): Deployment name

**Request Body**:

```json
{
  "image": "nginx:1.22.0",
  "pullPolicy": "Always"
}
```

**Response**:

```json
{
  "success": true,
  "data": {
    "name": "nginx-deployment",
    "namespace": "default",
    "image": "nginx:1.22.0",
    "status": "Updating"
  },
  "message": "Deployment image updated successfully"
}
```

---

### Update Deployment Strategy

Update the update strategy configuration for a deployment.

**Endpoint**: `PUT /api/v1/workloads/deployments/{namespace}/{name}/strategy`

**Authentication Required**: Yes (`WRITE` permission on `DEPLOYMENT` resource)

**Path Parameters**:
- `namespace` (required, string): Namespace
- `name` (required, string): Deployment name

**Request Body**:

```json
{
  "type": "RollingUpdate",
  "rollingUpdate": {
    "maxSurge": 2,
    "maxUnavailable": 1
  }
}
```

**Response**:

```json
{
  "success": true,
  "data": {
    "name": "nginx-deployment",
    "strategy": {
      "type": "RollingUpdate",
      "rollingUpdate": {
        "maxSurge": 2,
        "maxUnavailable": 1
      }
    }
  },
  "message": "Update strategy updated successfully"
}
```

---

### Update Deployment Resources

Update CPU/memory resource limits and requests for a deployment.

**Endpoint**: `PUT /api/v1/workloads/deployments/{namespace}/{name}/resources`

**Authentication Required**: Yes (`WRITE` permission on `DEPLOYMENT` resource)

**Path Parameters**:
- `namespace` (required, string): Namespace
- `name` (required, string): Deployment name

**Request Body**:

```json
{
  "resources": {
    "requests": {
      "cpu": "200m",
      "memory": "256Mi"
    },
    "limits": {
      "cpu": "1000m",
      "memory": "1Gi"
    }
  }
}
```

**Response**:

```json
{
  "success": true,
  "data": {
    "name": "nginx-deployment",
    "resources": {
      "requests": {
        "cpu": "200m",
        "memory": "256Mi"
      },
      "limits": {
        "cpu": "1000m",
        "memory": "1Gi"
      }
    }
  },
  "message": "Resources updated successfully"
}
```

---

### Update Deployment Environment Variables

Update environment variables for a deployment.

**Endpoint**: `PUT /api/v1/workloads/deployments/{namespace}/{name}/env`

**Authentication Required**: Yes (`WRITE` permission on `DEPLOYMENT` resource)

**Path Parameters**:
- `namespace` (required, string): Namespace
- `name` (required, string): Deployment name

**Request Body**:

```json
{
  "containerName": "nginx",
  "env": [
    {
      "name": "DATABASE_URL",
      "value": "postgres://db:5432/mydb"
    },
    {
      "name": "CACHE_REDIS",
      "valueFrom": {
        "configMapKeyRef": {
          "name": "app-config",
          "key": "redis-url"
        }
      }
    },
    {
      "name": "API_KEY",
      "valueFrom": {
        "secretKeyRef": {
          "name": "api-secrets",
          "key": "api-key"
        }
      }
    }
  ]
}
```

**Response**:

```json
{
  "success": true,
  "data": {
    "name": "nginx-deployment",
    "containers": [
      {
        "name": "nginx",
        "env": [
          {
            "name": "DATABASE_URL",
            "value": "postgres://db:5432/mydb"
          }
        ]
      }
    ]
  },
  "message": "Environment variables updated successfully"
}
```

---

### Pause Deployment

Pause a deployment to prevent further changes.

**Endpoint**: `POST /api/v1/workloads/deployments/{namespace}/{name}/pause`

**Authentication Required**: Yes (`WRITE` permission on `DEPLOYMENT` resource)

**Path Parameters**:
- `namespace` (required, string): Namespace
- `name` (required, string): Deployment name

**Response**:

```json
{
  "success": true,
  "data": {
    "name": "nginx-deployment",
    "paused": true
  },
  "message": "Deployment paused successfully"
}
```

---

### Resume Deployment

Resume a paused deployment.

**Endpoint**: `POST /api/v1/workloads/deployments/{namespace}/{name}/resume`

**Authentication Required**: Yes (`WRITE` permission on `DEPLOYMENT` resource)

**Path Parameters**:
- `namespace` (required, string): Namespace
- `name` (required, string): Deployment name

**Response**:

```json
{
  "success": true,
  "data": {
    "name": "nginx-deployment",
    "paused": false
  },
  "message": "Deployment resumed successfully"
}
```

---

### Clone Workload

Clone an existing workload with modifications.

**Endpoint**: `POST /api/v1/workloads/clone`

**Authentication Required**: Yes (`WRITE` permission on `DEPLOYMENT` resource)

**Request Body**:

```json
{
  "sourceWorkload": {
    "type": "deployment",
    "namespace": "default",
    "name": "nginx-deployment"
  },
  "targetWorkload": {
    "type": "deployment",
    "namespace": "production",
    "name": "nginx-deployment-prod"
  },
  "modifications": {
    "replicas": 5,
    "image": "nginx:1.21.0",
    "labels": {
      "environment": "production"
    }
  }
}
```

**Response**:

```json
{
  "success": true,
  "data": {
    "type": "deployment",
    "namespace": "production",
    "name": "nginx-deployment-prod"
    "replicas": 5
  },
  "message": "Workload cloned successfully"
}
```

---

### Create PodDisruptionBudget

Create a PodDisruptionBudget for a workload.

**Endpoint**: `POST /api/v1/workloads/pdb`

**Authentication Required**: Yes (`WRITE` permission on `DEPLOYMENT` resource)

**Request Body**:

```json
{
  "name": "nginx-pdb",
  "namespace": "default",
  "selector": {
    "app": "nginx"
  },
  "minAvailable": 2,
  "maxUnavailable": 1
}
```

**Response**:

```json
{
  "success": true,
  "data": {
    "name": "nginx-pdb",
    "namespace": "default",
    "minAvailable": 2,
    "maxUnavailable": 1
  },
  "message": "PodDisruptionBudget created successfully"
}
```

---

## Pod Management

### List Pods

Retrieve all pods with filtering options.

**Endpoint**: `GET /api/v1/pods`

**Authentication Required**: Yes (`READ` permission on `POD` resource)

**Query Parameters**:
- `namespace` (optional, string): Filter by namespace
- `labelSelector` (optional, string): Filter by label selector
- `status` (optional, string): Filter by status (`Running`, `Pending`, `Failed`, `Succeeded`)
- `page` (optional, number): Page number
- `pageSize` (optional, number): Items per page

**Response**:

```json
{
  "success": true,
  "data": {
    "items": [
      {
        "name": "nginx-pod-xxx",
        "namespace": "default",
        "status": "Running",
        "phase": "Running",
        "nodeName": "node-1",
        "podIP": "10.244.1.5",
        "hostIP": "192.168.1.100",
        "startTime": "2024-01-15T10:30:00Z",
        "containers": [
          {
            "name": "nginx",
            "image": "nginx:1.21.0",
            "ready": true,
            "restartCount": 0,
            "state": "running"
          }
        ],
        "labels": {
          "app": "nginx"
        },
        "conditions": [
          {
            "type": "Ready",
            "status": "True",
            "reason": "PodIsReady"
          }
        ]
      }
    ],
    "total": 47
  },
  "message": null
}
```

---

### Get Pod Details

Retrieve detailed information about a specific pod.

**Endpoint**: `GET /api/v1/pods/{namespace}/{name}`

**Authentication Required**: Yes (`READ` permission on `POD` resource)

**Path Parameters**:
- `namespace` (required, string): Namespace
- `name` (required, string): Pod name

**Response**:

```json
{
  "success": true,
  "data": {
    "name": "nginx-pod-xxx",
    "namespace": "default",
    "status": "Running",
    "phase": "Running",
    "nodeName": "node-1",
    "podIP": "10.244.1.5",
    "hostIP": "192.168.1.100",
    "startTime": "2024-01-15T10:30:00Z",
    "containers": [
      {
        "name": "nginx",
        "image": "nginx:1.21.0",
        "ready": true,
        "restartCount": 0,
        "state": "running",
        "ports": [
          {
            "containerPort": 80,
            "protocol": "TCP"
          }
        ],
        "resources": {
          "requests": {
            "cpu": "100m",
            "memory": "128Mi"
          },
          "limits": {
            "cpu": "500m",
            "memory": "512Mi"
          }
        },
        "env": [
          {
            "name": "PORT",
            "value": "80"
          }
        ],
        "volumeMounts": [
          {
            "name": "data-volume",
            "mountPath": "/data",
            "readOnly": false
          }
        ],
        "livenessProbe": {
          "httpGet": {
            "path": "/healthz",
            "port": 80
          },
          "initialDelaySeconds": 5,
          "periodSeconds": 10
        },
        "readinessProbe": {
          "httpGet": {
            "path": "/healthz",
            "port": 80
          },
          "initialDelaySeconds": 5,
          "periodSeconds": 10
        }
      }
    ],
    "labels": {
      "app": "nginx",
      "pod-template-hash": "1234567890"
    },
    "annotations": {},
    "conditions": [
      {
        "type": "Initialized",
        "status": "True",
        "lastTransitionTime": "2024-01-15T10:30:00Z"
      },
      {
        "type": "Ready",
        "status": "True",
        "lastTransitionTime": "2024-01-15T10:31:00Z"
      }
    ],
    "events": [
      {
        "type": "Normal",
        "reason": "Pulling",
        "message": "Pulling image nginx:1.21.0"
      }
    ],
    "relatedResources": {
      "services": [
        {
          "name": "nginx-service"
        }
      ],
      "replicaSets": [
        {
          "name": "nginx-replicaset-xxx"
        }
      ]
    }
  },
  "message": null
}
```

---

### Delete Pod

Delete a pod.

**Endpoint**: `DELETE /api/v1/pods/{namespace}/{name}`

**Authentication Required**: Yes (`DELETE` permission on `POD` resource)

**Path Parameters**:
- `namespace` (required, string): Namespace
- `name` (required, string): Pod name

**Response**:

```json
{
  "success": true,
  "data": null,
  "message": "Pod deleted successfully"
}
```

---

## Monitoring & Metrics

### Get Pod Metrics

Retrieve real-time metrics for a specific pod.

**Endpoint**: `GET /api/v1/metrics/pods/{namespace}/{name}`

**Authentication Required**: Yes (`READ` permission on `POD` resource)

**Path Parameters**:
- `namespace` (required, string): Namespace
- `name` (required, string): Pod name

**Query Parameters**:
- `metricType` (optional, string): Type of metrics (`cpu`, `memory`, `network`, `storage`)

**Response**:

```json
{
  "success": true,
  "data": {
    "pod": "nginx-pod-xxx",
    "namespace": "default",
    "cpu": {
      "usage": "250m",
      "usagePercentage": 16.7,
      "request": "300m",
      "limit": "1500m"
    },
    "memory": {
      "usage": "1.2Gi",
      "usagePercentage": 80.0,
      "request": "384Mi",
      "limit": "1.5Gi"
    },
    "network": {
      "bytesTransmitted": 1024000,
      "bytesReceived": 5120000,
      "transmitRate": "10240",
      "receiveRate": "51200"
    },
    "storage": {
      "usage": "500Mi",
      "capacity": "10Gi"
    },
    "timestamp": "2024-01-15T12:00:00Z"
  },
  "message": null
}
```

---

### Get Node Metrics

Retrieve metrics for a specific node.

**Endpoint**: `GET /api/v1/metrics/nodes/{name}`

**Authentication Required**: Yes (`READ` permission on `NODE` resource)

**Path Parameters**:
- `name` (required, string): Node name

**Query Parameters**:
- `metricType` (optional, string): Type of metrics (`cpu`, `memory`, `storage`)

**Response**:

```json
{
  "success": true,
  "data": {
    "node": "node-1",
    "cpu": {
      "usage": "3.5",
      "usagePercentage": 87.5,
      "capacity": "4"
    },
    "memory": {
      "usage": "14Gi",
      "usagePercentage": 87.5,
      "capacity": "16Gi"
    },
    "storage": {
      "usage": "95Gi",
      "usagePercentage": 95.0,
      "capacity": "100Gi"
    },
    "podCount": 15,
    "timestamp": "2024-01-15T12:00:00Z"
  },
  "message": null
}
```

---

### Get Workload Metrics

Retrieve aggregated metrics for a workload.

**Endpoint**: `GET /api/v1/metrics/workloads/{kind}/{namespace}/{name}`

**Authentication Required**: Yes (`READ` permission on `DEPLOYMENT` resource)

**Path Parameters**:
- `kind` (required, string): Workload kind (`deployment`, `statefulset`, `daemonset`)
- `namespace` (required, string): Namespace
- `name` (required, string): Workload name

**Query Parameters**:
- `metricType` (optional, string): Type of metrics (`cpu`, `memory`, `network`, `storage`)

**Response**:

```json
{
  "success": true,
  "data": {
    "kind": "deployment",
    "name": "nginx-deployment",
    "namespace": "default",
    "replicas": 3,
    "cpu": {
      "total": "750m",
      "average": "250m",
      "perPod": {
        "average": "250m"
      }
    },
    "memory": {
      "total": "1.5Gi",
      "average": "512Mi",
      "perPod": {
        "average": "512Mi"
      }
    },
    "network": {
      "totalBytesTransmitted": 10240000,
      "totalBytesReceived": 51200000,
      "transmitRate": "102400",
      "receiveRate": "512000"
    },
    "timestamp": "2024-01-15T12:00:00Z"
  },
  "message": null
}
```

---

### Get Network Metrics

Retrieve network I/O metrics for resources.

**Endpoint**: `GET /api/v1/metrics/network/{namespace}/{name}`

**Authentication Required**: Yes (`READ` permission on `POD` resource)

**Path Parameters**:
- `namespace` (required, string): Namespace
- `name` (required, string): Resource name

**Response**:

```json
{
  "success": true,
  "data": {
    "namespace": "default",
    "name": "nginx-deployment",
    "bytesTransmitted": 51200000,
    "bytesReceived": 256000000,
    "transmitRate": "512000",
    "receiveRate": "2560000",
    "errorRate": 0,
    "timestamp": "2024-01-15T12:00:00Z"
  },
  "message": null
}
```

---

### Get Storage Metrics

Retrieve storage metrics for resources.

**Endpoint**: `GET /api/v1/metrics/storage/{namespace}/{name}`

**Authentication Required**: Yes (`READ` permission on `POD` resource)

**Path Parameters**:
- `namespace` (required, string): Namespace
- `name` (required, string): Resource name

**Response**:

```json
{
  "success": true,
  "data": {
    "namespace": "default",
    "name": "nginx-pod-xxx",
    "usage": "500Mi",
    "capacity": "10Gi",
    "usagePercentage": 5.0,
    "iops": {
      "read": 150,
      "write": 50
    },
    "timestamp": "2024-01-15T12:00:00Z"
  },
  "message": null
}
```

---

### Get Historical Metrics

Retrieve historical time series metrics.

**Endpoint**: `GET /api/v1/metrics/history/{namespace}/{name}`

**Authentication Required**: Yes (`READ` permission on `POD` resource)

**Path Parameters**:
- `namespace` (required, string): Namespace
- `name` (required, string): Resource name

**Query Parameters**:
- `range` (optional, string): Time range (`1h`, `6h`, `24h`, `7d`, `30d`, default: `24h`)
- `metricType` (optional, string): Type of metrics

**Response**:

```json
{
  "success": true,
  "data": {
    "timeRange": "24h",
    "dataPoints": [
      {
        "timestamp": "2024-01-15T00:00:00Z",
        "cpu": "12.5",
        "memory": "40Gi",
        "network": {
          "transmit": 102400,
          "receive": 512000
        }
      },
      {
        "timestamp": "2024-01-15T01:00:00Z",
        "cpu": "13.2",
        "memory": "42Gi",
        "network": {
          "transmit": 104800,
          "receive": 518000
        }
      }
    ]
  },
  "message": null
}
```

---

### Execute PromQL Query

Execute a custom PromQL query against Prometheus.

**Endpoint**: `POST /api/v1/metrics/promql/query`

**Authentication Required**: Yes (`READ` permission on `POD` resource)

**Request Body**:

```json
{
  "query": "rate(http_requests_total[5m])",
  "range": "1h",
  "step": "15s"
}
```

**Response**:

```json
{
  "success": true,
  "data": {
    "query": "rate(http_requests_total[5m])",
    "result": {
      "data": [
        {
          "timestamp": "2024-01-15T12:00:00Z",
          "value": 42.5
        },
        {
          "timestamp": "2024-01-15T12:00:15Z",
          "value": 43.2
        }
      ],
      "unit": "requests per second"
    },
    "warning": "Query execution took 500ms, consider adding filters for better performance"
  },
  "message": null
}
```

---

## Log Management

### Stream Pod Logs

Stream pod logs in real-time using Server-Sent Events (SSE).

**Endpoint**: `GET /api/v1/pods/{namespace}/{name}/logs`

**Authentication Required**: Yes (`LOGS` permission on `POD` resource)

**Path Parameters**:
- `namespace` (required, string): Namespace
- `name` (required, string): Pod name

**Query Parameters**:
- `containerName` (optional, string): Container name for multi-container pods
- `previous` (optional, boolean): Get logs from previous container instance (default: false)
- `tailLines` (optional, number, default: 100): Number of lines to show initially
- `severity` (optional, string): Filter by severity (`INFO`, `WARNING`, `ERROR`)
- `search` (optional, string): Search text in logs
- `since` (optional, string): Start timestamp (ISO 8601 format)
- `until` (optional, string): End timestamp (ISO 8601 format)

**Response**:

The response is a Server-Sent Events (SSE) stream with the following event types:

**Event: connected** - Initial connection established

```json
{
  "success": true,
  "data": "Streaming logs for container: nginx in pod: default/nginx-pod-xxx"
}
```

**Event: log-line** - Each log line

```json
{
  "success": true,
  "data": {
    "timestamp": "2024-01-15T12:00:00.000Z",
    "line": 1,
    "content": "2024/01/15 12:00:00 INFO Starting nginx...",
    "level": "INFO",
    "container": "nginx"
  }
}
```

**Event: error** - If an error occurs

```json
{
  "success": false,
  "error": "Pod not found"
}
```

**Event: done** - When streaming completes

```json
{
  "success": true,
  "data": "Log streaming completed"
}
```

---

### Download Pod Logs

Download pod logs as a file.

**Endpoint**: `GET /api/v1/pods/{namespace}/{name}/logs/download`

**Authentication Required**: Yes (`LOGS` permission on `POD` resource)

**Path Parameters**:
- `namespace` (required, string): Namespace
- `name` (required, string): Pod name

**Query Parameters**:
- `containerName` (optional, string): Container name
- `previous` (optional, boolean): Previous container logs
- `since` (optional, string): Start timestamp
- `until` (optional, string): End timestamp
- `severity` (optional, string): Filter by severity
- `search` (optional, string): Search text
- `format` (optional, string): Download format (`text`, `gzip`, default: `text`)

**Response**:

The response is the log file content directly (binary stream for gzip, text for text format).

---

### Get Namespace Logs

Search and aggregate logs across all pods in a namespace.

**Endpoint**: `GET /api/v1/pods/{namespace}/logs/aggregated`

**Authentication Required**: Yes (`LOGS` permission on `POD` resource)

**Path Parameters**:
- `namespace` (required, string): Namespace

**Query Parameters**:
- `search` (optional, string): Search text
- `since` (optional, string): Start timestamp
- `until` (optional, string): End timestamp

**Response**:

SSE stream with aggregated log lines from all pods in the namespace, with event structure similar to individual pod logs.

---

## Terminal Management

### Connect Terminal

Establish a WebSocket connection for terminal access to a pod container.

**Endpoint**: `GET /api/v1/terminal/connect/{namespace}/{podName}`

**Authentication Required**: Yes (`EXEC` permission on `POD` resource)

**Path Parameters**:
- `namespace` (required, string): Namespace
- `podName` (required, string): Pod name

**Query Parameters**:
- `container` (optional, string): Container name (defaults to first container if not specified)

**Response**:

```json
{
  "success": true,
  "data": {
    "sessionId": "abc123def456",
    "namespace": "default",
    "podName": "nginx-pod-xxx",
    "container": "nginx",
    "webSocketUrl": "ws://k8s-manager.example.com/api/v1/terminal/ws/abc123def456"
  },
  "message": "Terminal session ready"
}
```

**WebSocket URL**: Use the `webSocketUrl` to establish the WebSocket connection for bidirectional terminal I/O.

---

### Get Active Sessions

Get list of active terminal sessions for the current user.

**Endpoint**: `GET /api/v1/terminal/sessions`

**Authentication Required**: Yes (`EXEC` permission on `POD` resource)

**Response**:

```json
{
  "success": true,
  "data": [
    {
      "sessionId": "abc123def456",
      "namespace": "default",
      "podName": "nginx-pod-xxx",
      "container": "nginx",
      "connectedAt": "2024-01-15T12:00:00Z",
      "lastActivityAt": "2024-01-15T12:05:00Z"
    }
  ]
}
```

---

### Resize Terminal

Resize the terminal window dimensions.

**Endpoint**: `POST /api/v1/terminal/sessions/{sessionId}/resize`

**Authentication Required**: Yes (`EXEC` permission on `POD` resource)

**Path Parameters**:
- `sessionId` (required, string): Session ID

**Request Body**:

```json
{
  "rows": 24,
  "cols": 80
}
```

**Response**:

```json
{
  "success": true,
  "data": null,
  "message": "Terminal resized successfully"
}
```

---

### Close Terminal Session

Close an active terminal session.

**Endpoint**: `DELETE /api/v1/terminal/sessions/{sessionId}`

**Authentication Required**: Yes (`EXEC` permission on `POD` resource)

**Path Parameters**:
- `sessionId` (required, string): Session ID

**Response**:

```json
{
  "success": true,
  "data": null,
  "message": "Terminal session closed successfully"
}
```

---

## YAML Management

### Validate YAML

Validate YAML against Kubernetes schema without creating resources (dry-run).

**Endpoint**: `POST /api/v1/yaml/validate`

**Authentication Required**: Yes (`WRITE` permission on `POD` resource)

**Request Body**:

```json
{
  "yaml": "apiVersion: v1\nkind: Pod\nmetadata:\n  name: nginx-pod\nspec:\n  containers:\n  - name: nginx\n    image: nginx:1.21.0",
  "dryRun": true
}
```

**Response**:

```json
{
  "success": true,
  "data": {
    "valid": true,
    "warnings": [],
    "errors": [],
    "resource": {
      "kind": "Pod",
      "name": "nginx-pod"
    }
  },
  "message": "YAML is valid"
}
```

**Error Response** (invalid YAML):

```json
{
  "success": false,
  "error": "ValidationError",
  "data": {
    "errors": [
      {
        "line": 5,
        "column": 3,
        "message": "Invalid indentation: expected 2 spaces, found 4"
      }
    ]
  }
}
```

---

### Create Workload from YAML

Create a workload (deployment, statefulset, job, cronjob) from YAML manifest.

**Endpoint**: `POST /api/v1/workloads/from-yaml`

**Authentication Required**: Yes (`WRITE` permission on `DEPLOYMENT` resource)

**Request Body**:

```json
{
  "yaml": "apiVersion: apps/v1\nkind: Deployment\nmetadata:\n  name: nginx\n  namespace: default\nspec:\n  replicas: 3\n  selector:\n    matchLabels:\n      app: nginx\n  template:\n    metadata:\n      labels:\n        app: nginx\n    spec:\n      containers:\n      - name: nginx\n        image: nginx:1.21.0\n        ports:\n        - containerPort: 80",
  "namespace": "default",
  "dryRun": false
}
```

**Response**:

```json
{
  "success": true,
  "data": {
    "name": "nginx",
    "namespace": "default",
    "kind": "Deployment",
    "status": "Creating"
  },
  "message": "Workload created from YAML"
}
```

---

### Get YAML Templates

Retrieve YAML templates for common resource types.

**Endpoint**: `GET /api/v1/yaml/templates`

**Authentication Required**: Yes (`READ` permission on `POD` resource)

**Query Parameters**:
- `type` (optional, string): Template type (`pod`, `deployment`, `service`, `configmap`, `secret`)

**Response**:

```json
{
  "success": true,
  "data": {
    "pod": "apiVersion: v1\nkind: Pod\nmetadata:\n  name: my-pod\nspec:\n  containers:\n  - name: myapp\n    image: myapp:1.0.0",
    "deployment": "apiVersion: apps/v1\nkind: Deployment\nmetadata:\n  name: my-deployment\n  namespace: default\nspec:\n  replicas: 1\n  selector:\n    matchLabels:\n      app: myapp\n  template:\n    metadata:\n      labels:\n        app: myapp\n    spec:\n      containers:\n      - name: myapp\n        image: myapp:1.0.0\n        ports:\n        - containerPort: 8080"
  }
}
```

---

## Role Management (Admin)

Admin-only endpoints for managing roles and permissions.

### Get All Roles

Retrieve all available roles.

**Endpoint**: `GET /api/v1/admin/roles`

**Authentication Required**: Yes (`ADMIN` permission required)

**Response**:

```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "ADMIN",
      "description": "Full cluster access including all resources and actions",
      "permissions": [
        "READ", "WRITE", "DELETE", "EXEC", "LOGS"
      ]
    },
    {
      "id": 2,
      "name": "DEVELOPER",
      "description": "Namespace access with read/write permissions for standard resources",
      "permissions": [
        "READ", "WRITE", "EXEC", "LOGS"
      ]
    },
    {
      "id": 3,
      "name": "VIEWER",
      "description": "Read-only access to assigned namespaces",
      "permissions": ["READ", "LOGS"]
    }
  ]
}
```

---

### Get Role Details

Retrieve details of a specific role.

**Endpoint**: `GET /api/v1/admin/roles/{name}`

**Authentication Required**: Yes (`ADMIN` permission required)

**Path Parameters**:
- `name` (required, string): Role name

**Response**:

```json
{
  "success": true,
  "data": {
    "id": 2,
    "name": "DEVELOPER",
    "description": "Namespace access with read/write permissions",
    "permissions": [
      {
        "type": "READ",
        "resourceTypes": ["POD", "DEPLOYMENT", "SERVICE", "CONFIGMAP", "SECRET", "NAMESPACE"]
      },
      {
        "type": "WRITE",
        "resourceTypes": ["POD", "DEPLOYMENT", "SERVICE", "CONFIGMAP"]
      },
      {
        "type": "EXEC",
        "resourceTypes": ["POD"]
      },
      {
        "type": "LOGS",
        "resourceTypes": ["POD", "NAMESPACE"]
      }
    ]
  }
}
```

---

### Assign Role to User

Assign a role to a user.

**Endpoint**: `POST /api/v1/admin/roles/{roleName}/assign`

**Authentication Required**: Yes (`ADMIN` permission required)

**Path Parameters**:
- `roleName` (required, string): Role name to assign

**Request Body**:

```json
{
  "email": "user@example.com",
  "namespace": "production"
}
```

**Response**:

```json
{
  "success": true,
  "data": null,
  "message": "Role assigned successfully"
}
```

---

### Revoke Role from User

Revoke a role from a user.

**Endpoint**: `DELETE /api/v1/admin/roles/{roleName}/revoke`

**Authentication Required**: Yes (`ADMIN` permission required)

**Path Parameters**:
- `roleName` (required, string): Role name to revoke

**Request Body**:

```json
{
  "email": "user@example.com",
  "namespace": "production"
}
```

**Response**:

```json
{
  "success": true,
  "data": null,
  "message": "Role revoked successfully"
}
```

---

## User Management

### Get User Profile

Retrieve current user profile information.

**Endpoint**: `GET /api/v1/user/profile`

**Authentication Required**: Yes

**Response**:

```json
{
  "success": true,
  "data": {
    "email": "user@example.com",
    "name": "John Doe",
    "avatarUrl": "https://example.com/avatar.jpg",
    "roles": [
      {
        "name": "DEVELOPER",
        "namespace": "production"
      }
    ],
    "createdAt": "2024-01-01T00:00:00Z",
    "lastLoginAt": "2024-01-15T12:00:00Z"
  },
  "message": null
}
```

---

### Update User Profile

Update user profile information.

**Endpoint**: `PUT /api/v1/user/profile`

**Authentication Required**: Yes

**Request Body**:

```json
{
  "name": "John Smith",
  "avatarUrl": "https://example.com/new-avatar.jpg"
}
```

**Response**:

```json
{
  "success": true,
  "data": {
    "email": "user@example.com",
    "name": "John Smith",
    "avatarUrl": "https://example.com/new-avatar.jpg",
    "updatedAt": "2024-01-15T12:30:00Z"
  },
  "message": "Profile updated successfully"
}
```

---

## Error Responses

### Standard Error Format

All error responses follow this structure:

```json
{
  "success": false,
  "error": "Error message",
  "errorCode": "RESOURCE_NOT_FOUND",
  "details": {}
}
```

### Common Error Codes

| Error Code | HTTP Status | Description |
|------------|--------------|-------------|
| `UNAUTHORIZED` | 401 | Invalid or expired authentication token |
| `FORBIDDEN` | 403 | Insufficient permissions for requested operation |
| `NOT_FOUND` | 404 | Requested resource not found |
| `BAD_REQUEST` | 400 | Invalid request parameters or body |
| `CONFLICT` | 409 | Resource already exists or conflict |
| `INTERNAL_SERVER_ERROR` | 500 | Unexpected server error |
| `SERVICE_UNAVAILABLE` | 503 | Service temporarily unavailable |
| `TOO_MANY_REQUESTS` | 429 | Rate limit exceeded |
| `VALIDATION_ERROR` | 400 | YAML validation failed |

### Error Response Examples

**401 Unauthorized**:

```json
{
  "success": false,
  "error": "Invalid or expired access token",
  "errorCode": "UNAUTHORIZED"
}
```

**403 Forbidden**:

```json
{
  "success": false,
  "error": "Insufficient permissions: Requires DELETE permission on DEPLOYMENT resource",
  "errorCode": "FORBIDDEN",
  "details": {
    "requiredPermission": "DELETE",
    "requiredResourceType": "DEPLOYMENT"
  }
}
```

**404 Not Found**:

```json
{
  "success": false,
  "error": "Deployment not found",
  "errorCode": "NOT_FOUND"
}
```

**400 Bad Request**:

```json
{
  "success": false,
  "error": "Invalid request parameters: namespace cannot be empty",
  "errorCode": "BAD_REQUEST",
  "details": {
    "field": "namespace",
    "constraint": "not empty"
  }
}
```

**500 Internal Server Error**:

```json
{
  "success": false,
  "error": "An unexpected error occurred while processing your request",
  "errorCode": "INTERNAL_SERVER_ERROR"
}
```

---

## Data Types

### ApiResponse

Standard wrapper for all API responses.

```typescript
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  timestamp?: string;
}
```

**Fields**:
- `success` (boolean): Indicates if the request was successful
- `data` (T, optional): Response data (only present when success is true)
- `error` (string, optional): Error message (only present when success is false)
- `message` (string, optional): Additional information message
- `timestamp` (string, optional): ISO 8601 timestamp of response

---

### ClusterInfoDTO

Cluster overview information.

```typescript
interface ClusterInfoDTO {
  name: string;
  version: string;
  platform: string;
  nodesCount: number;
  podsCount: number;
}
```

---

### NodeInfoDTO

Node details.

```typescript
interface NodeInfoDTO {
  name: string;
  status: string;
  roles: string[];
  capacity: NodeCapacityDTO;
  allocatable: NodeAllocatableDTO;
  nodeInfo: NodeInfoDetails;
  taints: Taint[];
  labels: Record<string, string>;
  annotations: Record<string, string>;
  createdAt: string;
}
```

---

### NamespaceDTO

Namespace information.

```typescript
interface NamespaceDTO {
  name: string;
  status: string;
  labels: Record<string, string>;
  annotations: Record<string, string>;
  createdAt: string;
  resourceQuotas?: ResourceQuotaDTO;
  resourceUsage?: ResourceUsageDTO;
  limitRanges?: LimitRangeDTO[];
  roleAssignments?: RoleAssignmentDTO[];
  networkPolicies?: NetworkPolicyDTO[];
}
```

---

### DeploymentDTO

Deployment details.

```typescript
interface DeploymentDTO {
  name: string;
  namespace: string;
  replicas: number;
  availableReplicas: number;
  updatedReplicas: number;
  readyReplicas: number;
  status: string;
  strategy: DeploymentStrategyDTO;
  selector: Record<string, string>;
  labels: Record<string, string>;
  annotations: Record<string, string>;
  containers: ContainerDTO[];
  conditions: ConditionDTO[];
  revisionHistory?: DeploymentRevisionDTO[];
  metrics?: DeploymentMetricsDTO;
  createdAt: string;
  updatedAt: string;
}
```

---

### PodDTO

Pod details.

```typescript
interface PodDTO {
  name: string;
  namespace: string;
  status: string;
  phase: string;
  nodeName: string;
  podIP: string;
  hostIP: string;
  startTime: string;
  containers: ContainerDTO[];
  labels: Record<string, string>;
  annotations: Record<string, string>;
  conditions: ConditionDTO[];
  events?: EventDTO[];
  relatedResources?: RelatedResourcesDTO;
}
```

---

### ContainerDTO

Container information.

```typescript
interface ContainerDTO {
  name: string;
  image: string;
  ready: boolean;
  restartCount: number;
  state: string;
  ports: PortDTO[];
  resources: ResourceRequirementsDTO;
  env: EnvVarDTO[];
  volumeMounts: VolumeMountDTO[];
  livenessProbe?: ProbeDTO;
  readinessProbe?: ProbeDTO;
}
```

---

### MetricsResponseDTO

Metrics data.

```typescript
interface MetricsResponseDTO {
  timestamp: string;
  cpu?: number;
  cpuUsagePercentage?: number;
  memory?: number;
  memoryUsagePercentage?: number;
  network?: NetworkMetricsDTO;
  storage?: StorageMetricsDTO;
  dataPoints?: MetricPointDTO[];
}
```

---

### ServiceDTO

Service information.

```typescript
interface ServiceDTO {
  name: string;
  namespace: string;
  type: string;
  clusterIP: string;
  externalIP?: string;
  ports: PortDTO[];
  selector: Record<string, string>;
  labels: Record<string, string>;
  annotations: Record<string, string>;
  endpoints: ServiceEndpointDTO[];
  createdAt: string;
}
```

---

### ConfigMapDTO

ConfigMap information.

```typescript
interface ConfigMapDTO {
  name: string;
  namespace: string;
  data: Record<string, string>;
  binaryData?: Record<string, string>;
  labels: Record<string, string>;
  annotations: Record<string, string>;
  createdAt: string;
}
```

---

### SecretDTO

Secret information.

```typescript
interface SecretDTO {
  name: string;
  namespace: string;
  type: string;
  data?: string; // Masked values
  labels: Record<string, string>;
  annotations: Record<string, string>;
  createdAt: string;
}
```

---

## WebSocket Endpoints

### Terminal WebSocket

WebSocket endpoint for terminal I/O streaming.

**Endpoint**: `ws://k8s-manager.example.com/api/v1/terminal/ws/{sessionId}`

**Connection**: Upgrade from HTTP to WebSocket after calling `/api/v1/terminal/connect`

**Message Format**:

**Client → Server** (stdin):

```json
{
  "type": "input",
  "data": "ls -la"
}
```

**Resize Command**:

```json
{
  "type": "resize",
  "rows": 24,
  "cols": 80
}
```

**Server → Client** (stdout/stderr):

```json
{
  "type": "output",
  "data": "total 16",
  "drwxr-xr-x  2 root root 4096 Jan 15 12:00:00 .\ndrwxr-xr-x  2 root root 4096 Jan 15 12:00:00 ..\ndrwxr-xr-x  2 root root 4096 Jan 15 12:00:00 bin\n",
  "timestamp": "2024-01-15T12:00:00.000Z"
}
```

**Close Command**:

```json
{
  "type": "close",
  "data": null
}
```

---

## Rate Limiting

- **Anonymous requests**: No limit
- **Authenticated requests**: 100 requests per minute per IP
- **WebSocket connections**: 5 concurrent terminal sessions per user

Exceeded limit response:

```json
{
  "success": false,
  "error": "Too many requests. Please try again later.",
  "errorCode": "TOO_MANY_REQUESTS"
}
```

---

## Authentication Flow

### 1. OAuth2/OIDC Login

**Frontend Flow**:
1. User clicks "Login"
2. Redirected to identity provider (Keycloak, Google, GitHub)
3. User authenticates with provider
4. Provider redirects back to frontend with authorization code
5. Frontend exchanges code for tokens
6. Store tokens securely (HttpOnly cookies)
7. Redirect to dashboard

**Token Usage**:
- Include `Authorization: Bearer <access_token>` header in all API requests
- Refresh tokens automatically when access token expires (within 5 minutes)
- Handle 401 responses by redirecting to login page

### 2. Session Management

**Session Timeout**: 30 minutes of inactivity (configurable)

**Session Storage**:
- Primary: In-memory storage
- Future: Redis for horizontal scaling (configurable)

**Session Cleanup**:
- Expire inactive sessions
- Invalidate sessions on logout
- Limit concurrent sessions

---

## API Versioning

Current API version: `v1`

Future versions will be indicated in the URL path (e.g., `/api/v2/`).

Backward compatibility is maintained for at least 1 major version.

---

## Support

For API-related issues, questions, or feature requests:
- **GitHub Issues**: [https://github.com/your-org/kube-manager/issues](https://github.com/your-org/kube-manager/issues)
- **Documentation**: https://k8s-manager.example.com/api-docs
- **Email**: api-support@example.com

---

## Changelog

### Version 1.0.0 (2024-01-15)

Initial API documentation release covering all implemented endpoints.

**New Features**:
- Complete API documentation for all controllers
- WebSocket endpoint documentation
- Error response documentation
- Data type definitions

---

*Last Updated: 2024-01-15*
