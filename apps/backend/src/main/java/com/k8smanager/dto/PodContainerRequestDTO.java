package com.k8smanager.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;

import java.util.List;

/**
 * Request DTO for pod container.
 */
@Schema(description = "Container specification for a pod or deployment")
public record PodContainerRequestDTO(
        @Schema(description = "Name of the container", example = "nginx", required = true)
        @NotBlank String name,
        @Schema(description = "Container image with tag", example = "nginx:1.21.0", required = true)
        @NotBlank String image,
        @Schema(description = "List of ports to expose from the container")
        List<ContainerPortRequestDTO> ports,
        @Schema(description = "Environment variables to set in the container")
        List<ContainerEnvVarRequestDTO> env,
        @Schema(description = "Resource requirements (CPU and memory) for the container")
        ResourceRequirementsDTO resources,
        @Schema(description = "Volume mounts to attach to the container")
        List<VolumeMountRequestDTO> volumeMounts
) {
}
