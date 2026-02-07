package com.k8smanager.dto;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "Kubernetes event representing a state change or significant occurrence")
public record EventDTO(
        @Schema(description = "Type of event (Normal, Warning)", example = "Normal")
        String type,
        @Schema(description = "Machine-readable reason for the event's occurrence", example = "Started")
        String reason,
        @Schema(description = "Human-readable description of the event", example = "Started container nginx")
        String message,
        @Schema(description = "Last time the event was observed", example = "2024-01-04T12:00:00Z")
        String lastTimestamp
) {
}
