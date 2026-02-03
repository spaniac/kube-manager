package com.k8smanager.dto;

import java.util.Map;

public record ConfigMapDTO(
        String name,
        String namespace,
        long creationTimestamp,
        Map<String, String> data,
        Map<String, Map<String, String>> binaryData,
        Map<String, String> labels
) {
}
