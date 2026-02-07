package com.k8smanager.dto;

import java.time.Instant;

/**
 * DTO for anomaly detection result.
 * Contains detected anomalies with confidence score and suggested actions.
 */
public record AnomalyDetectionDTO(
        String metricType,
        String namespace,
        String resourceName,
        Instant timestamp,
        Double observedValue,
        Double expectedRangeMin,
        Double expectedRangeMax,
        Double deviationPercent,
        String severity,
        String description,
        String suggestedAction
) {
}
