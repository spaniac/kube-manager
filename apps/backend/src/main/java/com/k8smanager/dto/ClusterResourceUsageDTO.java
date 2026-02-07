package com.k8smanager.dto;

import io.swagger.v3.oas.annotations.media.Schema;

/**
 * Cluster resource usage.
 */
@Schema(description = "Current resource usage across entire cluster")
public record ClusterResourceUsageDTO(
        @Schema(description = "Total CPU cores available", example = "32")
        String totalCpu,
        @Schema(description = "CPU cores currently in use", example = "18.5")
        String usedCpu,
        @Schema(description = "Percentage of CPU used", example = "57.8")
        double cpuUsagePercent,
        @Schema(description = "Total memory available", example = "128Gi")
        String totalMemory,
        @Schema(description = "Memory currently in use", example = "72Gi")
        String usedMemory,
        @Schema(description = "Percentage of memory used", example = "56.25")
        double memoryUsagePercent,
        @Schema(description = "Total number of pods in cluster", example = "120")
        long podCount
) {
}
