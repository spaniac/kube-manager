package com.k8smanager.dto;

import io.swagger.v3.oas.annotations.media.Schema;

import java.util.Map;

@Schema(description = "Kubernetes ConfigMap for storing non-sensitive configuration data")
public record ConfigMapDTO(
        @Schema(description = "Name of the ConfigMap", example = "app-config")
        String name,
        @Schema(description = "Namespace where ConfigMap is located", example = "default")
        String namespace,
        @Schema(description = "Timestamp when ConfigMap was created", example = "1704326400000")
        long creationTimestamp,
        @Schema(description = "Key-value configuration data")
        Map<String, String> data,
        @Schema(description = "Binary data (base64 encoded)")
        Map<String, Map<String, String>> binaryData,
        @Schema(description = "Labels attached to the ConfigMap")
        Map<String, String> labels
) {
}
