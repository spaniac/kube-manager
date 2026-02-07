package com.k8smanager.dto;

/**
 * CronJob DTO.
 */
public record CronJobDTO(
        String name,
        String namespace,
        String schedule,
        String concurrencyPolicy,
        boolean suspend,
        int successfulJobsHistoryLimit,
        int failedJobsHistoryLimit,
        JobStatusDTO lastSchedule,
        JobStatusDTO activeJob
) {
}
