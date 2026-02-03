package com.k8smanager.dto;

import java.util.Map;

/**
 * Request DTO for updating container resources.
 */
public record UpdateContainerResourcesRequestDTO(
        String containerName,
        ResourceRequirementsDTO resources
) {}
