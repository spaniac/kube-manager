package com.k8smanager.dto;

import io.swagger.v3.oas.annotations.media.Schema;

/**
 * Request DTO for resource requests.
 */
@Schema(description = "Minimum CPU and memory resources required for containers")
public record ResourceRequestsDTO(
        @Schema(description = "CPU request (e.g., '250m', '500m', '1')", example = "250m")
        String cpu,
        @Schema(description = "Memory request (e.g., '128Mi', '256Mi', '512Mi')", example = "128Mi")
        String memory
) {
}
