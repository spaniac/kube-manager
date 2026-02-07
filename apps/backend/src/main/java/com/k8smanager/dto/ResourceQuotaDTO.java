package com.k8smanager.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;

import java.util.Map;

/**
 * Resource quota DTO.
 */
@Schema(description = "Kubernetes resource quota limiting compute resources in a namespace")
public record ResourceQuotaDTO(
        @Schema(description = "Name of the resource quota", example = "compute-resources", required = true)
        @NotBlank String name,
        @Schema(description = "Namespace where the quota applies", example = "production", required = true)
        @NotBlank String namespace,
        @Schema(description = "Hard limits on resource usage (cpu, memory, storage, pods.count)", example = "{cpu: '4', memory: '8Gi', pods.count: '10'}")
        Map<String, String> hard,
        @Schema(description = "Current usage of resources compared to hard limits", example = "{cpu: '2.5', memory: '4Gi', pods.count: '5'}")
        Map<String, String> used
) {
}
