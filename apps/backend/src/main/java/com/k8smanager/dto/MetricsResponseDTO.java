package com.k8smanager.dto;

import java.util.List;

public record MetricsResponseDTO(
        List<MetricPointDTO> data,
        MetricSummaryDTO summary
) {
}
