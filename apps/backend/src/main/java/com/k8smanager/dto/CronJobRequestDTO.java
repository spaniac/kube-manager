package com.k8smanager.dto;

import java.util.List;
import java.util.Map;

/**
 * Request DTO for creating a CronJob.
 */
public record CronJobRequestDTO(
        String name,
        String namespace,
        String schedule,
        String concurrencyPolicy,
        boolean suspend,
        List<PodContainerRequestDTO> containers,
        Map<String, String> labels,
        Map<String, String> annotations,
        int successfulJobsHistoryLimit,
        int failedJobsHistoryLimit,
        int startingDeadlineSeconds
) {
}
