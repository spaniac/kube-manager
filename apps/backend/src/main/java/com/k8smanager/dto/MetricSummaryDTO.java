package com.k8smanager.dto;

public record MetricSummaryDTO(
        double average,
        double min,
        double max,
        long count
) {
}
