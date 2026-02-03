package com.k8smanager.dto;

/**
 * Request DTO for container environment variable.
 */
public record ContainerEnvVarRequestDTO(
        String name,
        String value,
        String valueFrom
) {
}
