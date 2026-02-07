package com.k8smanager.dto;

import io.swagger.v3.oas.annotations.media.Schema;

/**
 * DTOs for cluster management operations.
 */

/**
 * Cluster health status.
 */
@Schema(description = "Overall health status of the Kubernetes cluster")
public record ClusterHealthDTO(
        @Schema(description = "Overall health status (Healthy, Degraded, Unhealthy)", example = "Healthy")
        String status,
        @Schema(description = "Total number of nodes in the cluster", example = "3")
        long totalNodes,
        @Schema(description = "Number of nodes that are Ready and schedulable", example = "3")
        long readyNodes,
        @Schema(description = "Total number of pods in the cluster", example = "42")
        long totalPods,
        @Schema(description = "Number of pods in Running state", example = "38")
        long runningPods,
        @Schema(description = "Number of pods in Failed or Error state", example = "2")
        long failedPods,
        @Schema(description = "Timestamp of the last health check", example = "1704326400000")
        long lastCheckTimestamp
) {
}
