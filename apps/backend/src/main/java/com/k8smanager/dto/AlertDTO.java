package com.k8smanager.dto;

import io.swagger.v3.oas.annotations.media.Schema;

import java.time.Instant;

/**
 * DTO for alert history and triggered alerts.
 * Contains information about fired alerts with severity and timestamps.
 */
@Schema(description = "Alert representing a threshold violation or anomaly detected in the cluster")
public record AlertDTO(
        @Schema(description = "Unique identifier of the alert", example = "1")
        Long id,
        @Schema(description = "Type of metric that triggered the alert", example = "CPUUsage")
        String metricType,
        @Schema(description = "Condition that caused the alert to fire", example = "CPU usage > 80%")
        String condition,
        @Schema(description = "Current value of the metric that triggered the alert", example = "85.5")
        Double currentValue,
        @Schema(description = "Threshold value that was exceeded", example = "80.0")
        Double thresholdValue,
        @Schema(description = "Severity level (Critical, Warning, Info)", example = "Critical")
        String severity,
        @Schema(description = "Timestamp when the alert was triggered", example = "2024-02-04T10:30:00Z")
        Instant timestamp,
        @Schema(description = "Namespace where the alert originated", example = "production")
        String namespace,
        @Schema(description = "Name of the resource causing the alert", example = "nginx-deployment")
        String resourceName,
        @Schema(description = "Human-readable message describing the alert", example = "CPU usage exceeded 80% threshold for 5 minutes")
        String message,
        @Schema(description = "Whether the alert has been acknowledged by an operator", example = "false")
        Boolean acknowledged,
        @Schema(description = "Source of the alert (Prometheus, Loki, custom)", example = "Prometheus")
        String source
) {
}
