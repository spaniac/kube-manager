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
) {}

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
) {}

/**
 * Cluster metrics history.
 */
public record ClusterMetricsHistoryDTO(
        String metricType,
        List<MetricPointDTO> data,
        double average,
        double max,
        double min
) {}
