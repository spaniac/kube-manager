package com.k8smanager.dto;

import io.swagger.v3.oas.annotations.media.Schema;

/**
 * Request DTO for container environment variable.
 */
@Schema(description = "Environment variable to set in a container")
public record ContainerEnvVarRequestDTO(
        @Schema(description = "Name of the environment variable", example = "DATABASE_URL")
        String name,
        @Schema(description = "Value of the environment variable", example = "postgresql://localhost:5432/mydb")
        String value,
        @Schema(description = "Reference to a secret or config map for the value", example = "secretRef: db-password")
        String valueFrom
) {
}
