package com.k8smanager.dto;

import io.swagger.v3.oas.annotations.media.Schema;

import java.time.Instant;

@Schema(description = "Single data point in a time-series metric")
public record MetricPointDTO(
        @Schema(description = "Timestamp when the metric was collected", example = "2024-01-04T12:00:00Z")
        Instant timestamp,
        @Schema(description = "Metric value at the given timestamp", example = "75.5")
        double value
) {
}
