package com.k8smanager.dto;

/**
 * Request DTO for resource requirements.
 */
public record ResourceRequirementsDTO(
        ResourceLimitsDTO limits,
        ResourceRequestsDTO requests
) {
}
