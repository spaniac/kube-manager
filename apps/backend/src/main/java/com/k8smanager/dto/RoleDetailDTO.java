package com.k8smanager.dto;

import io.swagger.v3.oas.annotations.media.Schema;

import java.util.List;

@Schema(description = "Detailed role payload with permissions")
public record RoleDetailDTO(
        @Schema(description = "Role identifier", example = "1")
        Long id,
        @Schema(description = "Predefined role type when role is preset", example = "ADMIN")
        String roleType,
        @Schema(description = "Unique role key", example = "TEAM_OBSERVABILITY")
        String roleKey,
        @Schema(description = "Human-friendly role name", example = "Team Observability")
        String displayName,
        @Schema(description = "Whether this is a custom role", example = "true")
        boolean custom,
        @Schema(description = "Role description")
        String description,
        @Schema(description = "Permissions granted by this role")
        List<PermissionDTO> permissions
) {
    public record PermissionDTO(
            @Schema(description = "Permission action", example = "READ")
            String permissionType,
            @Schema(description = "Target Kubernetes resource", example = "POD")
            String resourceType,
            @Schema(description = "Optional namespace scope", example = "production")
            String namespace
    ) {
    }
}
