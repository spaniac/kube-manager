package com.k8smanager.dto;

import java.util.Map;

/**
 * Metadata DTO for Kubernetes resources.
 */
public record ObjectMetadataDTO(
        String name,
        String namespace,
        String uid,
        String resourceVersion,
        long creationTimestamp,
        Map<String, String> labels,
        Map<String, String> annotations
) {
}
