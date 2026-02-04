package com.k8smanager.dto;

import io.swagger.v3.oas.annotations.media.Schema;

import java.util.Map;

@Schema(description = "Kubernetes secret for storing sensitive data")
public record SecretDTO(
        @Schema(description = "Name of the secret", example = "mysql-secret")
        String name,
        @Schema(description = "Namespace where secret is located", example = "default")
        String namespace,
        @Schema(description = "Type of the secret", example = "Opaque")
        String type,
        @Schema(description = "Timestamp when secret was created", example = "1704326400000")
        long creationTimestamp,
        @Schema(description = "Key-value pairs containing sensitive data (base64 encoded)")
        Map<String, String> data,
        @Schema(description = "Labels attached to the secret")
        Map<String, String> labels,
        @Schema(description = "Whether the secret is immutable", example = "false")
        boolean immutable
) {
}
