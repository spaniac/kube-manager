package com.k8smanager.dto;

/**
 * Request DTO for updating container resources.
 */
public record UpdateContainerResourcesRequestDTO(
        String containerName,
        ResourceRequirementsDTO resources
) {
}
