package com.k8smanager.dto;

/**
 * Job DTO.
 */
public record JobDTO(
        String name,
        String namespace,
        String status,
        int completions,
        int active,
        int succeeded,
        int failed,
        PodTemplateDTO template
) {
}
