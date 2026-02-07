package com.k8smanager.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;

import java.util.Map;

/**
 * Namespace DTO.
 */
@Schema(description = "Kubernetes namespace representing a virtual cluster")
public record NamespaceDTO(
                @Schema(description = "Name of the namespace", example = "production", required = true)
                @NotBlank String name,
                @Schema(description = "Current status of the namespace (Active, Terminating)", example = "Active")
                String status,
                @Schema(description = "Timestamp when namespace was created", example = "2024-01-01T00:00:00Z")
                String creationTimestamp,
                @Schema(description = "Key-value labels attached to the namespace")
                Map<String, String> labels,
                @Schema(description = "Key-value annotations attached to the namespace")
                Map<String, String> annotations) {
}
