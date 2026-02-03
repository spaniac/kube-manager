package com.k8smanager.dto;

/**
 * DTOs for cluster management operations.
 */

/**
 * Cluster health status.
 */
public record ClusterHealthDTO(
        String status,
        long totalNodes,
        long readyNodes,
        long totalPods,
        long runningPods,
        long failedPods,
        long lastCheckTimestamp
) {
}
