package com.k8smanager.dto;

/**
 * Request DTO for resource limits.
 */
public record ResourceLimitsDTO(
        String cpu,
        String memory
) {
}
