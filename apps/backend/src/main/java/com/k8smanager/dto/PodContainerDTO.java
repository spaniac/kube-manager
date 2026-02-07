package com.k8smanager.dto;

import java.util.List;

/**
 * Pod container DTO.
 */
public record PodContainerDTO(
        String name,
        String image,
        List<ContainerPortRequestDTO> ports,
        List<ContainerEnvVarRequestDTO> env,
        ResourceRequirementsDTO resources,
        List<VolumeMountRequestDTO> volumeMounts
) {
}
