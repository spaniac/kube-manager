package com.k8smanager.dto;

import io.swagger.v3.oas.annotations.media.Schema;

/**
 * Request DTO for container port.
 */
@Schema(description = "Request to configure container port settings for a deployment")
public record ContainerPortRequestDTO(
        @Schema(description = "Name of the port (optional for containerPort)", example = "http")
        String name,
        @Schema(description = "Port number on the container", example = "8080", required = true)
        int containerPort,
        @Schema(description = "Protocol of the port (TCP or UDP)", example = "TCP")
        String protocol
) {
}
