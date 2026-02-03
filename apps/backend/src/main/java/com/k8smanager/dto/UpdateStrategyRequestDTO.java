package com.k8smanager.dto;

/**
 * Request DTO for updating deployment strategy.
 */
public record UpdateStrategyRequestDTO(
        String type,
        RollingUpdateStrategyDTO rollingUpdate
) {}
