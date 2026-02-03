package com.k8smanager.dto;

/**
 * Pod condition DTO.
 */
public record PodConditionDTO(
        String type,
        String status,
        String reason,
        String message,
        long lastTransitionTime
) {
}
