package com.k8smanager.dto;

/**
 * Cluster resource usage.
 */
public record ClusterResourceUsageDTO(
        String totalCpu,
        String usedCpu,
        double cpuUsagePercent,
        String totalMemory,
        String usedMemory,
        double memoryUsagePercent,
        long podCount
) {
}
