package com.k8smanager.service;

import com.k8smanager.dto.StatusBadgeDTO;
import com.k8smanager.dto.StatusBadge;
import com.k8smanager.dto.*;
import io.fabric8.kubernetes.api.model.*;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

/**
 * Service for determining status badges for Kubernetes resources.
 * Provides standardized status information for UI display.
 */
@Service
public class StatusBadgeService {

    /**
     * Get status badge for a Pod.
     */
    public StatusBadgeDTO getPodStatusBadge(Pod pod) {
        if (pod == null || pod.getStatus() == null) {
            return StatusBadge.POD_UNKNOWN.toDTO("Unknown", "Pod status is unknown");
        }

        String phase = pod.getStatus().getPhase();

        return switch (phase) {
            case "Running" -> {
                boolean allContainersReady = pod.getStatus().getContainerStatuses() != null &&
                        pod.getStatus().getContainerStatuses().stream()
                                .allMatch(cs -> cs.getReady() != null && cs.getReady());

                if (allContainersReady) {
                    String label = String.format("Ready (%d/%d)",
                            pod.getStatus().getContainerStatuses() != null ?
                                    pod.getStatus().getContainerStatuses().size() : 0,
                            pod.getStatus().getContainerStatuses() != null ?
                                    pod.getStatus().getContainerStatuses().size() : 0);
                    yield StatusBadge.POD_RUNNING.toDTO(label, "Pod is running and all containers are ready");
                } else {
                    long readyCount = pod.getStatus().getContainerStatuses() != null ?
                            pod.getStatus().getContainerStatuses().stream()
                                    .filter(cs -> cs.getReady() != null && cs.getReady())
                                    .count() : 0;
                    long totalCount = pod.getStatus().getContainerStatuses() != null ?
                            pod.getStatus().getContainerStatuses().size() : 0;
                    String label = String.format("Running (%d/%d)", readyCount, totalCount);
                    yield StatusBadge.DEPLOYMENT_PROGRESSING.toDTO(label,
                            "Pod is running but not all containers are ready");
                }
            }
            case "Pending" -> {
                String reason = getPendingReason(pod);
                yield StatusBadge.POD_PENDING.toDTO("Pending",
                        reason != null ? reason : "Pod is pending scheduling or initialization");
            }
            case "Failed" -> {
                String reason = getFailedReason(pod);
                yield StatusBadge.POD_FAILED.toDTO("Failed",
                        reason != null ? reason : "Pod has failed to start or run");
            }
            case "Succeeded" -> StatusBadge.POD_SUCCEEDED.toDTO("Succeeded",
                    "Pod has completed successfully");
            case "Unknown" -> StatusBadge.POD_UNKNOWN.toDTO("Unknown",
                    "Pod status cannot be determined");
            default -> StatusBadge.POD_UNKNOWN.toDTO(phase, "Pod status: " + phase);
        };
    }

    /**
     * Get status badge for a Deployment.
     */
    public StatusBadgeDTO getDeploymentStatusBadge(Deployment deployment) {
        if (deployment == null || deployment.getStatus() == null) {
            return StatusBadge.POD_UNKNOWN.toDTO("Unknown", "Deployment status is unknown");
        }

        DeploymentStatus status = deployment.getStatus();
        DeploymentSpec spec = deployment.getSpec();

        if (status == null || spec == null) {
            return StatusBadge.POD_UNKNOWN.toDTO("Unknown", "Deployment status is unknown");
        }

        int desiredReplicas = spec.getReplicas() != null ? spec.getReplicas() : 0;
        int updatedReplicas = status.getUpdatedReplicas() != null ? status.getUpdatedReplicas() : 0;
        int readyReplicas = status.getReadyReplicas() != null ? status.getReadyReplicas() : 0;
        int availableReplicas = status.getAvailableReplicas() != null ? status.getAvailableReplicas() : 0;

        // Check if deployment is paused
        if (spec.getPaused() != null && spec.getPaused()) {
            return StatusBadge.DEPLOYMENT_PAUSED.toDTO("Paused",
                    String.format("Deployment is paused (%d/%d ready)", readyReplicas, desiredReplicas));
        }

        // Check for degraded condition
        boolean isDegraded = status.getConditions() != null &&
                status.getConditions().stream()
                        .anyMatch(c -> "Progressing".equals(c.getType()) &&
                                "False".equals(c.getStatus()) &&
                                "NewReplicaSetAvailable".equals(c.getReason()));

        if (isDegraded) {
            return StatusBadge.DEPLOYMENT_DEGRADED.toDTO(
                    String.format("Degraded (%d/%d)", readyReplicas, desiredReplicas),
                    getConditionMessage(status.getConditions(), "Progressing"));
        }

        // Check if all replicas are ready
        if (readyReplicas == desiredReplicas && availableReplicas == desiredReplicas &&
                updatedReplicas == desiredReplicas) {
            return StatusBadge.DEPLOYMENT_READY.toDTO(
                    String.format("Ready (%d/%d)", readyReplicas, desiredReplicas),
                    "All replicas are up to date and available");
        }

        // Deployment is progressing
        return StatusBadge.DEPLOYMENT_PROGRESSING.toDTO(
                String.format("Progressing (%d/%d)", readyReplicas, desiredReplicas),
                String.format("Updating: %d/%d replicas ready, %d/%d updated",
                        readyReplicas, desiredReplicas, updatedReplicas, desiredReplicas));
    }

    /**
     * Get status badge for a StatefulSet.
     */
    public StatusBadgeDTO getStatefulSetStatusBadge(StatefulSet statefulSet) {
        if (statefulSet == null || statefulSet.getStatus() == null) {
            return StatusBadge.POD_UNKNOWN.toDTO("Unknown", "StatefulSet status is unknown");
        }

        StatefulSetStatus status = statefulSet.getStatus();
        StatefulSetSpec spec = statefulSet.getSpec();

        if (status == null || spec == null) {
            return StatusBadge.POD_UNKNOWN.toDTO("Unknown", "StatefulSet status is unknown");
        }

        int desiredReplicas = spec.getReplicas() != null ? spec.getReplicas() : 0;
        int readyReplicas = status.getReadyReplicas() != null ? status.getReadyReplicas() : 0;
        int currentReplicas = status.getCurrentReplicas() != null ? status.getCurrentReplicas() : 0;

        if (readyReplicas == desiredReplicas && currentReplicas == desiredReplicas) {
            return StatusBadge.DEPLOYMENT_READY.toDTO(
                    String.format("Ready (%d/%d)", readyReplicas, desiredReplicas),
                    "All replicas are ready");
        }

        return StatusBadge.DEPLOYMENT_PROGRESSING.toDTO(
                String.format("Progressing (%d/%d)", readyReplicas, desiredReplicas),
                String.format("%d/%d replicas ready, %d current",
                        readyReplicas, desiredReplicas, currentReplicas));
    }

    /**
     * Get status badge for a DaemonSet.
     */
    public StatusBadgeDTO getDaemonSetStatusBadge(DaemonSet daemonSet) {
        if (daemonSet == null || daemonSet.getStatus() == null) {
            return StatusBadge.POD_UNKNOWN.toDTO("Unknown", "DaemonSet status is unknown");
        }

        DaemonSetStatus status = daemonSet.getStatus();
        DaemonSetSpec spec = daemonSet.getSpec();

        if (status == null || spec == null) {
            return StatusBadge.POD_UNKNOWN.toDTO("Unknown", "DaemonSet status is unknown");
        }

        int desiredReplicas = status.getDesiredNumberScheduled() != null ?
                status.getDesiredNumberScheduled() : 0;
        int readyReplicas = status.getNumberReady() != null ? status.getNumberReady() : 0;
        int availableReplicas = status.getNumberAvailable() != null ? status.getNumberAvailable() : 0;
        int currentReplicas = status.getCurrentNumberScheduled() != null ?
                status.getCurrentNumberScheduled() : 0;

        if (readyReplicas == desiredReplicas && availableReplicas == desiredReplicas) {
            return StatusBadge.DEPLOYMENT_READY.toDTO(
                    String.format("Ready (%d/%d)", readyReplicas, desiredReplicas),
                    "All DaemonSet pods are ready and available");
        }

        if (currentReplicas < desiredReplicas) {
            return StatusBadge.DEPLOYMENT_PROGRESSING.toDTO(
                    String.format("Scheduling (%d/%d)", currentReplicas, desiredReplicas),
                    String.format("Scheduling pods: %d/%d scheduled, %d ready",
                            currentReplicas, desiredReplicas, readyReplicas));
        }

        return StatusBadge.DEPLOYMENT_NOT_READY.toDTO(
                String.format("Not Ready (%d/%d)", readyReplicas, desiredReplicas),
                String.format("%d/%d pods ready, %d available",
                        readyReplicas, desiredReplicas, availableReplicas));
    }

    /**
     * Get status badge for a Job.
     */
    public StatusBadgeDTO getJobStatusBadge(io.fabric8.kubernetes.api.model.Job job) {
        if (job == null || job.getStatus() == null) {
            return StatusBadge.POD_UNKNOWN.toDTO("Unknown", "Job status is unknown");
        }

        JobStatus status = job.getStatus();
        int active = status.getActive() != null ? status.getActive() : 0;
        int succeeded = status.getSucceeded() != null ? status.getSucceeded() : 0;
        int failed = status.getFailed() != null ? status.getFailed() : 0;

        if (failed > 0) {
            return StatusBadge.JOB_FAILED.toDTO(
                    String.format("Failed (%d)", failed),
                    String.format("Job has failed: %d completed, %d succeeded", failed, succeeded));
        }

        if (succeeded > 0 && active == 0) {
            return StatusBadge.JOB_COMPLETE.toDTO(
                    String.format("Complete (%d)", succeeded),
                    String.format("Job completed successfully"));
        }

        if (active > 0) {
            return StatusBadge.JOB_ACTIVE.toDTO(
                    String.format("Active (%d)", active),
                    String.format("Job is running: %d active, %d succeeded", active, succeeded));
        }

        return StatusBadge.POD_UNKNOWN.toDTO("Unknown", "Job status is unknown");
    }

    /**
     * Get status badge for a CronJob.
     */
    public StatusBadgeDTO getCronJobStatusBadge(CronJob cronJob) {
        if (cronJob == null || cronJob.getStatus() == null) {
            return StatusBadge.POD_UNKNOWN.toDTO("Unknown", "CronJob status is unknown");
        }

        CronJobStatus status = cronJob.getStatus();
        CronJobSpec spec = cronJob.getSpec();

        if (spec != null && Boolean.TRUE.equals(spec.getSuspend())) {
            return StatusBadge.CRONJOB_SUSPENDED.toDTO("Suspended",
                    "CronJob is suspended and will not create new jobs");
        }

        int active = status.getActive() != null ? status.getActive().size() : 0;
        int succeeded = status.getLastSuccessfulTime() != null ? 1 : 0;

        if (active > 0) {
            return StatusBadge.CRONJOB_SCHEDULED.toDTO(
                    String.format("Active (%d)", active),
                    String.format("%d active jobs, last successful run at %s",
                            active, status.getLastSuccessfulTime()));
        }

        if (succeeded > 0) {
            return StatusBadge.CRONJOB_SCHEDULED.toDTO("Scheduled",
                    String.format("Last successful run at %s", status.getLastSuccessfulTime()));
        }

        return StatusBadge.CRONJOB_SCHEDULED.toDTO("Scheduled",
                "CronJob is scheduled and waiting for next execution");
    }

    /**
     * Get status badge for a Service.
     */
    public StatusBadgeDTO getServiceStatusBadge(Service service) {
        if (service == null || service.getSpec() == null) {
            return StatusBadge.POD_UNKNOWN.toDTO("Unknown", "Service status is unknown");
        }

        String type = service.getSpec().getType();
        StatusBadge badge = switch (type) {
            case "LoadBalancer" -> StatusBadge.SERVICE_LOAD_BALANCER;
            case "NodePort" -> StatusBadge.SERVICE_NODE_PORT;
            case "ExternalName" -> StatusBadge.SERVICE_EXTERNAL_NAME;
            default -> StatusBadge.SERVICE_CLUSTER_IP;
        };

        // Check if service has endpoints
        // Note: This would require querying endpoints separately in a real implementation
        return badge.toDTO(type, String.format("Service type: %s", type));
    }

    /**
     * Get status badge for a Node.
     */
    public StatusBadgeDTO getNodeStatusBadge(Node node) {
        if (node == null || node.getStatus() == null) {
            return StatusBadge.POD_UNKNOWN.toDTO("Unknown", "Node status is unknown");
        }

        List<NodeCondition> conditions = node.getStatus().getConditions();

        // Check for critical conditions first
        if (conditions != null) {
            boolean isReady = conditions.stream()
                    .anyMatch(c -> "Ready".equals(c.getType()) && "True".equals(c.getStatus()));

            boolean hasMemoryPressure = conditions.stream()
                    .anyMatch(c -> "MemoryPressure".equals(c.getType()) && "True".equals(c.getStatus()));

            boolean hasDiskPressure = conditions.stream()
                    .anyMatch(c -> "DiskPressure".equals(c.getType()) && "True".equals(c.getStatus()));

            boolean hasPIDPressure = conditions.stream()
                    .anyMatch(c -> "PIDPressure".equals(c.getType()) && "True".equals(c.getStatus()));

            boolean isNetworkUnavailable = conditions.stream()
                    .anyMatch(c -> "NetworkUnavailable".equals(c.getType()) && "True".equals(c.getStatus()));

            if (isNetworkUnavailable) {
                return StatusBadge.NODE_NETWORK_UNAVAILABLE.toDTO("Network Unavailable",
                        "Node has no network connectivity");
            }

            if (!isReady) {
                return StatusBadge.NODE_NOT_READY.toDTO("Not Ready",
                        getConditionMessage(conditions, "Ready"));
            }

            if (hasMemoryPressure) {
                return StatusBadge.NODE_MEMORY_PRESSURE.toDTO("Memory Pressure",
                        "Node is under memory pressure");
            }

            if (hasDiskPressure) {
                return StatusBadge.NODE_DISK_PRESSURE.toDTO("Disk Pressure",
                        "Node is under disk pressure");
            }

            if (hasPIDPressure) {
                return StatusBadge.NODE_PID_PRESSURE.toDTO("PID Pressure",
                        "Node is under PID pressure");
            }

            if (isReady) {
                return StatusBadge.NODE_READY.toDTO("Ready", "Node is ready and healthy");
            }
        }

        return StatusBadge.POD_UNKNOWN.toDTO("Unknown", "Node status cannot be determined");
    }

    /**
     * Get status badge for a Namespace.
     */
    public StatusBadgeDTO getNamespaceStatusBadge(Namespace namespace) {
        if (namespace == null || namespace.getStatus() == null) {
            return StatusBadge.POD_UNKNOWN.toDTO("Unknown", "Namespace status is unknown");
        }

        String phase = namespace.getStatus().getPhase();

        return switch (phase) {
            case "Active" -> StatusBadge.NAMESPACE_ACTIVE.toDTO("Active",
                    "Namespace is active and accepting resources");
            case "Terminating" -> StatusBadge.NAMESPACE_TERMINATING.toDTO("Terminating",
                    "Namespace is being terminated");
            default -> StatusBadge.POD_UNKNOWN.toDTO(phase, "Namespace status: " + phase);
        };
    }

    /**
     * Get status badge for a ConfigMap or Secret.
     */
    public StatusBadgeDTO getConfigStatusBadge(String name, boolean exists) {
        if (exists) {
            return StatusBadge.RESOURCE_READY.toDTO("Ready",
                    String.format("%s exists and is ready", name));
        }
        return StatusBadge.RESOURCE_NOT_FOUND.toDTO("Not Found",
                String.format("%s not found", name));
    }

    // Helper methods

    private String getPendingReason(Pod pod) {
        if (pod.getStatus() == null || pod.getStatus().getConditions() == null) {
            return "Pending";
        }

        return pod.getStatus().getConditions().stream()
                .filter(c -> "PodScheduled".equals(c.getType()) && "False".equals(c.getStatus()))
                .map(c -> c.getReason() != null ? c.getReason() : "Pod cannot be scheduled")
                .findFirst()
                .orElse(null);
    }

    private String getFailedReason(Pod pod) {
        if (pod.getStatus() == null || pod.getStatus().getContainerStatuses() == null) {
            return "Failed";
        }

        return pod.getStatus().getContainerStatuses().stream()
                .filter(cs -> cs.getState() != null && cs.getState().getTerminated() != null)
                .map(cs -> {
                    ContainerStateTerminated terminated = cs.getState().getTerminated();
                    return terminated.getReason() != null ? terminated.getReason() :
                            terminated.getMessage() != null ? truncated(terminated.getMessage(), 100) : "Failed";
                })
                .findFirst()
                .orElse("Failed");
    }

    private String getConditionMessage(List<? extends Condition> conditions, String type) {
        if (conditions == null) {
            return null;
        }

        return conditions.stream()
                .filter(c -> type.equals(c.getType()))
                .map(Condition::getMessage)
                .findFirst()
                .orElse(null);
    }

    private String truncated(String str, int maxLength) {
        if (str == null) {
            return null;
        }
        if (str.length() <= maxLength) {
            return str;
        }
        return str.substring(0, maxLength) + "...";
    }
}
