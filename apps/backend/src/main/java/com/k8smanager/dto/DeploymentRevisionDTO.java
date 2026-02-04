package com.k8smanager.dto;

import io.swagger.v3.oas.annotations.media.Schema;

/**
 * Deployment revision DTO.
 */
@Schema(description = "Represents a single revision of a deployment deployment with change tracking information")
public record DeploymentRevisionDTO(
        @Schema(description = "Revision number of the deployment", example = "1", required = true)
        long revision,
        @Schema(description = "Revision history details", example = "Updated image to nginx:1.21.0")
        String revisionHistory,
        @Schema(description = "User who made the change", example = "admin@example.com")
        String changedBy,
        @Schema(description = "Type of change (update, rollback, scale, etc.)", example = "update")
        String changeType,
        @Schema(description = "Timestamp when the change was made", example = "2024-01-15T10:30:00Z")
        String changeTime
) {
}
