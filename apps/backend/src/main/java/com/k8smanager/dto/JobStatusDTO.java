package com.k8smanager.dto;

/**
 * Job status DTO.
 */
public record JobStatusDTO(
        String status,
        String startTime,
        String completionTime
) {
}
