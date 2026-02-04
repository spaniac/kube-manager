package com.k8smanager.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;

import java.util.Map;

/**
 * Request DTO for updating container environment variables.
 */
@Schema(description = "Request to update environment variables in a deployment container")
public record UpdateContainerEnvRequestDTO(
        @Schema(description = "Name of the container to update", example = "nginx", required = true)
        @NotBlank String containerName,
        @Schema(description = "Map of environment variable name to value", example = "{DEBUG: 'true', LOG_LEVEL: 'info'}")
        Map<String, String> envVars
) {
}
