package com.k8smanager.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;

/**
 * DTO for PromQL query request.
 * Contains query string and time range for Prometheus queries.
 */
@Schema(description = "Request to execute a PromQL query against Prometheus")
public record PromQLQueryRequestDTO(
        @Schema(description = "PromQL query string to execute", example = "rate(container_cpu_usage_seconds_total[5m])", required = true)
        @NotBlank String query,
        @Schema(description = "Time range for the query (e.g., '1h', '24h', '7d')", example = "1h")
        String range
) {
}
