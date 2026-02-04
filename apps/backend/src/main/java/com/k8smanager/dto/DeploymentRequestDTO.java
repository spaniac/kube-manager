package com.k8smanager.dto;

import io.swagger.v3.oas.annotations.media.Schema;

import java.util.List;
import java.util.Map;

/**
 * Request DTO for creating/updating a deployment.
 */
@Schema(description = "Request to create or update a deployment")
public record DeploymentRequestDTO(
        @Schema(description = "Name of the deployment", example = "nginx-deployment")
        String name,
        @Schema(description = "Namespace for the deployment", example = "default")
        String namespace,
        @Schema(description = "List of container specifications")
        List<PodContainerRequestDTO> containers,
        @Schema(description = "Number of desired replicas", example = "3")
        int replicas,
        @Schema(description = "Labels to apply to the deployment")
        Map<String, String> labels,
        @Schema(description = "Annotations to apply to the deployment")
        Map<String, String> annotations,
        @Schema(description = "Deployment strategy configuration")
        DeploymentStrategyDTO strategy
) {
}
