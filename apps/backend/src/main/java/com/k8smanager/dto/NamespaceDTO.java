package com.k8smanager.dto;

import jakarta.validation.constraints.NotBlank;

import java.util.Map;

/**
 * Namespace DTO.
 */
public record NamespaceDTO(
                @NotBlank String name,
                String status,
                String creationTimestamp,
                Map<String, String> labels,
                Map<String, String> annotations) {
}
