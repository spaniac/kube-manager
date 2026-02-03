package com.k8smanager.dto;

/**
 * DTO for cluster overview information.
 */
public record ClusterInfoDTO(
        String name,
        String version,
        String platform,
        String architecture,
        ClusterMetricsDTO metrics
) {
}
