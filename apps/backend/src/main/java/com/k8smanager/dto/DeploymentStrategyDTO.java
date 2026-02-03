package com.k8smanager.dto;

/**
 * Request DTO for deployment strategy.
 */
public record DeploymentStrategyDTO(
        String type,
        RollingUpdateStrategyDTO rollingUpdate
) {
}
