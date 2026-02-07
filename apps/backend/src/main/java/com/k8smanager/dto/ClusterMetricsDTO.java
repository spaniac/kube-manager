package com.k8smanager.dto;

import io.swagger.v3.oas.annotations.media.Schema;

/**
 * DTO for cluster metrics.
 */
@Schema(description = "Aggregated metrics for the entire cluster")
public record ClusterMetricsDTO(
        @Schema(description = "Total number of nodes in the cluster", example = "5")
        int totalNodes,
        @Schema(description = "Number of nodes in Ready state", example = "5")
        int readyNodes,
        @Schema(description = "Total number of pods across all namespaces", example = "120")
        int totalPods,
        @Schema(description = "Number of pods in Running state", example = "115")
        int runningPods,
        @Schema(description = "Total CPU capacity across all nodes", example = "32")
        String cpuCapacity,
        @Schema(description = "Total memory capacity across all nodes", example = "128Gi")
        String memoryCapacity,
        @Schema(description = "Total storage capacity across all nodes", example = "1Ti")
        String storageCapacity
) {
}
