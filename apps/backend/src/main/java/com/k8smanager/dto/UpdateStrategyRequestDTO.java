package com.k8smanager.dto;

import io.swagger.v3.oas.annotations.media.Schema;

/**
 * Request DTO for updating deployment strategy.
 */
@Schema(description = "Request to update deployment strategy configuration")
public record UpdateStrategyRequestDTO(
        @Schema(description = "Type of deployment strategy (RollingUpdate, Recreate)", example = "RollingUpdate", required = true)
        String type,
        @Schema(description = "Rolling update strategy parameters (required if type is RollingUpdate)")
        RollingUpdateStrategyDTO rollingUpdate
) {
}
