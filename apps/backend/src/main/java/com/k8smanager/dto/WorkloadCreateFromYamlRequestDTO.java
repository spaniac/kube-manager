package com.k8smanager.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;

/**
 * Request DTO for creating a workload from YAML.
 */
@Schema(description = "Request to create a workload by applying YAML manifest")
public record WorkloadCreateFromYamlRequestDTO(
        @Schema(description = "YAML manifest of the workload to create", example = "apiVersion: apps/v1\\nkind: Deployment\\n...", required = true)
        @NotBlank String yaml,
        @Schema(description = "Namespace where workload will be created", example = "production")
        String namespace,
        @Schema(description = "If true, validate YAML without creating resources", example = "false")
        boolean dryRun
) {
}
