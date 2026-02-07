package com.k8smanager.dto;

import io.swagger.v3.oas.annotations.media.Schema;

/**
 * Pod condition DTO.
 */
@Schema(description = "Pod condition representing the state of various aspects of a pod")
public record PodConditionDTO(
        @Schema(description = "Type of condition (e.g., Ready, ContainersReady, PodScheduled)", example = "Ready")
        String type,
        @Schema(description = "Status of the condition (True, False, or Unknown)", example = "True")
        String status,
        @Schema(description = "Human-readable reason for the condition's last transition", example = "ContainersReady")
        String reason,
        @Schema(description = "Human-readable message indicating details about the last transition", example = "All containers are ready")
        String message,
        @Schema(description = "Last time the condition transitioned from one status to another", example = "1704326400000")
        long lastTransitionTime
) {
}
