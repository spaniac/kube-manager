package com.k8smanager.dto;

import io.swagger.v3.oas.annotations.media.Schema;

/**
 * Request DTO for deployment strategy.
 */
@Schema(description = "Deployment strategy configuration")
public record DeploymentStrategyDTO(
        @Schema(description = "Strategy type (RollingUpdate, Recreate)", example = "RollingUpdate")
        String type,
        @Schema(description = "Rolling update configuration")
        RollingUpdateStrategyDTO rollingUpdate
) {
}
