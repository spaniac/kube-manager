package com.k8smanager.dto;

import java.util.List;

/**
 * Request DTO for pod container.
 */
public record PodContainerRequestDTO(
        String name,
        String image,
        List<ContainerPortRequestDTO> ports,
        List<ContainerEnvVarRequestDTO> env,
        ResourceRequirementsDTO resources,
        List<VolumeMountRequestDTO> volumeMounts
) {
}
