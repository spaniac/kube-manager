package com.k8smanager.dto;

/**
 * DTO for cluster metrics.
 */
public record ClusterMetricsDTO(
        int totalNodes,
        int readyNodes,
        int totalPods,
        int runningPods,
        String cpuCapacity,
        String memoryCapacity,
        String storageCapacity
) {
}
