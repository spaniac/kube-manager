package com.k8smanager.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;

/**
 * Request DTO for updating container resources.
 */
@Schema(description = "Request to update resource limits and requests for a container in a deployment")
public record UpdateContainerResourcesRequestDTO(
        @Schema(description = "Name of the container to update", example = "nginx", required = true)
        @NotBlank String containerName,
        @Schema(description = "New resource requirements for the container", required = true)
        ResourceRequirementsDTO resources
) {
}
