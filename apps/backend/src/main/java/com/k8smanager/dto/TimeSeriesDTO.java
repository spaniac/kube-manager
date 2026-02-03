package com.k8smanager.dto;

import java.time.Instant;
import java.util.List;

/**
 * DTO for time series metrics data.
 * Contains historical metric points over a specified time range.
 */
public record TimeSeriesDTO(
        String metricType,
        String range,
        Instant startTime,
        Instant endTime,
        List<MetricPointDTO> data,
        MetricSummaryDTO summary
) {}
