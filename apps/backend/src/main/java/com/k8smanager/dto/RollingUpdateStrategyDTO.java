package com.k8smanager.dto;

import io.swagger.v3.oas.annotations.media.Schema;

/**
 * Request DTO for rolling update strategy.
 */
@Schema(description = "Parameters for rolling update strategy of a deployment")
public record RollingUpdateStrategyDTO(
        @Schema(description = "Maximum number of unavailable pods during update (can be number or percentage)", example = "25%")
        int maxUnavailable,
        @Schema(description = "Maximum number of pods that can be created above desired replicas (can be number or percentage)", example = "1")
        int maxSurge
) {
}
