package com.k8smanager.dto;

/**
 * Request DTO for rolling update strategy.
 */
public record RollingUpdateStrategyDTO(
        int maxUnavailable,
        int maxSurge
) {
}
