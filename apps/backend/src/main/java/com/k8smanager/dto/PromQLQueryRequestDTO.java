package com.k8smanager.dto;

/**
 * DTO for PromQL query request.
 * Contains query string and time range for Prometheus queries.
 */
public record PromQLQueryRequestDTO(
        String query,
        String range
) {
}
