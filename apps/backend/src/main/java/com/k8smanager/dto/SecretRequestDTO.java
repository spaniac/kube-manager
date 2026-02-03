package com.k8smanager.dto;

import java.util.Map;

/**
 * Request DTO for creating a Secret.
 */
public record SecretRequestDTO(
        String name,
        String namespace,
        String type,
        Map<String, String> data,
        Map<String, String> labels,
        boolean immutable
) {
}
