package com.k8smanager.dto;

import java.util.Map;

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
) {
}
