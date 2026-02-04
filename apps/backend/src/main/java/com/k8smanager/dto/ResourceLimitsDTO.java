package com.k8smanager.dto;

import io.swagger.v3.oas.annotations.media.Schema;

/**
 * Request DTO for resource limits.
 */
@Schema(description = "CPU and memory resource limits for containers or pods")
public record ResourceLimitsDTO(
        @Schema(description = "CPU limit (e.g., '500m', '1', '2')", example = "500m")
        String cpu,
        @Schema(description = "Memory limit (e.g., '128Mi', '1Gi', '2Gi')", example = "256Mi")
        String memory
) {
}
