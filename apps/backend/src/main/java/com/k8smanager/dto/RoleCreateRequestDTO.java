package com.k8smanager.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;

import java.util.List;

@Schema(description = "Request payload to create a custom role")
public record RoleCreateRequestDTO(
        @NotBlank
        @Size(max = 100)
        @Schema(description = "Unique stable role key", example = "TEAM_OBSERVABILITY")
        String roleKey,
        @NotBlank
        @Size(max = 100)
        @Schema(description = "Human-friendly role name", example = "Team Observability")
        String displayName,
        @Size(max = 255)
        @Schema(description = "Optional role description", example = "Read logs and metrics in production")
        String description,
        @NotEmpty
        @Schema(description = "Role permission grants")
        List<PermissionGrantDTO> permissions
) {
    public record PermissionGrantDTO(
            @NotBlank
            @Schema(description = "Permission action", example = "READ")
            String permissionType,
            @NotBlank
            @Schema(description = "Target Kubernetes resource", example = "POD")
            String resourceType,
            @Size(max = 255)
            @Schema(description = "Optional namespace scope", example = "production")
            String namespace
    ) implements PermissionGrant {
    }
}
