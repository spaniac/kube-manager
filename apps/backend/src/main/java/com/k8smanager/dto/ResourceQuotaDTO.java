package com.k8smanager.dto;

import java.util.Map;

/**
 * Resource quota DTO.
 */
public record ResourceQuotaDTO(
        String name,
        String namespace,
        Map<String, String> hard,
        Map<String, String> used
) {
}
