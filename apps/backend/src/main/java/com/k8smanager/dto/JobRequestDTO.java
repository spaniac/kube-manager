package com.k8smanager.dto;

import java.util.List;
import java.util.Map;

/**
 * Request DTO for creating a Job.
 */
public record JobRequestDTO(
        String name,
        String namespace,
        List<PodContainerRequestDTO> containers,
        Map<String, String> labels,
        Map<String, String> annotations,
        int completions,
        int parallelism,
        int backoffLimit,
        int activeDeadlineSeconds
) {
}
