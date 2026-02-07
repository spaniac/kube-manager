package com.k8smanager.dto;

/**
 * Template definition for building PromQL queries.
 */
public record PrometheusQueryTemplateDTO(
        String metricType,
        String template
) {
}
