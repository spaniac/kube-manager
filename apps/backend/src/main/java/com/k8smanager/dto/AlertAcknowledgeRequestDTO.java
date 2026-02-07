package com.k8smanager.dto;

import io.swagger.v3.oas.annotations.media.Schema;

/**
 * Request DTO for acknowledging an alert.
 */
@Schema(description = "Request payload for acknowledging an alert")
public record AlertAcknowledgeRequestDTO(
        @Schema(description = "Optional actor override for acknowledgement", example = "ops-user@company.com")
        String acknowledgedBy
) {
}
