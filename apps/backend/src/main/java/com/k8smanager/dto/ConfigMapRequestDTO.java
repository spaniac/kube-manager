package com.k8smanager.dto;

import java.util.Map;

/**
 * Request DTO for creating a ConfigMap.
 */
public record ConfigMapRequestDTO(
        String name,
        String namespace,
        Map<String, String> data,
        Map<String, String> labels
) {
}
