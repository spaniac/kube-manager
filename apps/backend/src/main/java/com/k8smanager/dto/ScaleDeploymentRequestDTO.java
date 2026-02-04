package com.k8smanager.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Min;

/**
 * Request DTO for scaling a deployment.
 */
@Schema(description = "Request to scale a deployment to a specific number of replicas")
public record ScaleDeploymentRequestDTO(
        @Schema(description = "Desired number of replicas for the deployment", example = "3", required = true)
        @Min(0) int replicas
) {
}
