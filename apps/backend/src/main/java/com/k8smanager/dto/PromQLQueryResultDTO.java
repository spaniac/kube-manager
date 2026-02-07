package com.k8smanager.dto;

import io.swagger.v3.oas.annotations.media.Schema;

import java.util.List;

/**
 * DTO for PromQL query result.
 * Contains query response with metric data from Prometheus.
 */
@Schema(description = "Result of a PromQL query with metric data points and summary statistics")
public record PromQLQueryResultDTO(
        @Schema(description = "The PromQL query that was executed", example = "rate(container_cpu_usage_seconds_total[5m])")
        String query,
        @Schema(description = "Time range used for the query", example = "1h")
        String range,
        @Schema(description = "List of metric data points matching the query", required = true)
        List<MetricPointDTO> data,
        @Schema(description = "Summary statistics (min, max, average) of the metric data")
        MetricSummaryDTO summary,
        @Schema(description = "Error message if query failed", example = "parse error at char 15")
        String error
) {
    public PromQLQueryResultDTO(String query, String range, List<MetricPointDTO> data,
                                MetricSummaryDTO summary) {
        this(query, range, data, summary, null);
    }
}
