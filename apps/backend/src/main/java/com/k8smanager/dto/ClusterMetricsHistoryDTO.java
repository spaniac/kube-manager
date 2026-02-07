package com.k8smanager.dto;

import java.util.List;

/**
 * Cluster metrics history.
 */
public record ClusterMetricsHistoryDTO(
        String metricType,
        List<MetricPointDTO> data,
        double average,
        double max,
        double min
) {
}
