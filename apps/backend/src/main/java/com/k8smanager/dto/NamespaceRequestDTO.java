package com.k8smanager.dto;

import java.util.Map;

/**
 * Request DTO for creating a namespace.
 */
public record NamespaceRequestDTO(
        String name,
        Map<String, String> labels,
        Map<String, String> annotations
) {
}
