package com.k8smanager.dto;

/**
 * DTO for anomaly detection request.
 * Specifies metric type, namespace, resource name for anomaly detection.
 */
public record AnomalyDetectionRequestDTO(
        String metricType,
        String namespace,
        String resourceName,
        String timeRange,
        Double sensitivityThreshold
) {
}
