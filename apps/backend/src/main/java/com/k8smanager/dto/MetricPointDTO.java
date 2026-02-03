package com.k8smanager.dto;

import java.time.Instant;

public record MetricPointDTO(
        Instant timestamp,
        double value
) {
}
