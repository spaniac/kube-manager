package com.k8smanager.dto;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "Statistical summary of metric values")
public record MetricSummaryDTO(
        @Schema(description = "Average value of the metric", example = "75.5")
        double average,
        @Schema(description = "Minimum value of the metric", example = "45.2")
        double min,
        @Schema(description = "Maximum value of the metric", example = "98.7")
        double max,
        @Schema(description = "Number of data points in the summary", example = "100")
        long count
) {
}
