package com.k8smanager.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Min;

/**
 * Request DTO for rolling back a deployment.
 */
@Schema(description = "Request to rollback a deployment to a specific revision")
public record RollbackDeploymentRequestDTO(
        @Schema(description = "Revision number to rollback to", example = "1", required = true)
        @Min(1) long revision
) {
}
