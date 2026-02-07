package com.k8smanager.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

@Schema(description = "Permission rule payload for namespace-scoped allow/deny policies")
public record PermissionRuleDTO(
        @Schema(description = "Rule id", example = "10")
        Long id,
        @Schema(description = "Role id", example = "5")
        Long roleId,
        @NotBlank
        @Schema(description = "Permission action", example = "READ")
        String permissionType,
        @NotBlank
        @Schema(description = "Target Kubernetes resource", example = "POD")
        String resourceType,
        @Size(max = 255)
        @Schema(description = "Optional namespace scope", example = "production")
        String namespace,
        @NotBlank
        @Schema(description = "Rule effect", example = "DENY")
        String effect,
        @Size(max = 255)
        @Schema(description = "Optional resource name pattern", example = "payments-*")
        String resourceNamePattern
) {
}
