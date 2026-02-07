package com.k8smanager.dto;

import java.util.Map;

/**
 * Policy selector DTO.
 */
public record PolicySelectorDTO(
        Map<String, String> matchLabels
) {
}
