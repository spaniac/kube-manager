package com.k8smanager.dto;

import io.swagger.v3.oas.annotations.media.Schema;

/**
 * Request DTO for resource requirements.
 */
@Schema(description = "Resource requirements specifying both limits and requests for containers")
public record ResourceRequirementsDTO(
        @Schema(description = "Maximum resources the container can use (CPU, memory)")
        ResourceLimitsDTO limits,
        @Schema(description = "Minimum resources the container needs to run (CPU, memory)")
        ResourceRequestsDTO requests
) {
}
