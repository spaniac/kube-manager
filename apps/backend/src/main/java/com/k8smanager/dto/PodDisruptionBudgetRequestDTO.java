package com.k8smanager.dto;

/**
 * Request DTO for creating a PodDisruptionBudget.
 */
public record PodDisruptionBudgetRequestDTO(
        String name,
        String namespace,
        int minAvailable,
        int maxUnavailable,
        PolicySelectorDTO selector,
        Map<String, String> labels,
        Map<String, String> annotations
) {}

/**
 * Policy selector DTO.
 */
public record PolicySelectorDTO(
        Map<String, String> matchLabels
) {}
