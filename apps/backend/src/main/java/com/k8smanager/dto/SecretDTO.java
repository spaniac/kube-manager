package com.k8smanager.dto;

import java.util.Map;

public record SecretDTO(
        String name,
        String namespace,
        String type,
        long creationTimestamp,
        Map<String, String> data,
        Map<String, String> labels,
        boolean immutable
) {
}
