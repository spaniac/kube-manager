package com.k8smanager.dto;

import java.util.List;

/**
 * DTO for alert threshold configuration.
 * Contains alert rules for metrics with thresholds and notification settings.
 */
public record AlertThresholdDTO(
        String metricType,
        String condition,
        Double threshold,
        String operator,
        String severity,
        List<String> notificationChannels,
        Boolean enabled,
        String description
) {
}
