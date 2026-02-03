package com.k8smanager.dto;

import java.time.Instant;
import java.util.List;

/**
 * DTO for alert history and triggered alerts.
 * Contains information about fired alerts with severity and timestamps.
 */
public record AlertDTO(
        Long id,
        String metricType,
        String condition,
        Double currentValue,
        Double thresholdValue,
        String severity,
        Instant timestamp,
        String namespace,
        String resourceName,
        String message,
        Boolean acknowledged,
        String source
) {}
