package com.k8smanager.dto;

import java.util.List;

/**
 * DTO for PromQL query result.
 * Contains query response with metric data from Prometheus.
 */
public record PromQLQueryResultDTO(
        String query,
        String range,
        List<MetricPointDTO> data,
        MetricSummaryDTO summary,
        String error
) {
    public PromQLQueryResultDTO(String query, String range, List<MetricPointDTO> data,
                                MetricSummaryDTO summary) {
        this(query, range, data, summary, null);
    }
}
