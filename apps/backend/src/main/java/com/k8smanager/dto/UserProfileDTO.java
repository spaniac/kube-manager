package com.k8smanager.dto;

import io.swagger.v3.oas.annotations.media.Schema;

import java.time.Instant;
import java.util.Set;

/**
 * DTO for user profile information.
 */
@Schema(description = "User profile information including roles and timestamps")
public record UserProfileDTO(
        @Schema(description = "Unique identifier of the user", example = "1")
        Long id,
        @Schema(description = "Email address of the user", example = "user@example.com", required = true)
        String email,
        @Schema(description = "Display name of the user", example = "John Doe")
        String name,
        @Schema(description = "URL to user avatar image", example = "https://example.com/avatar.jpg")
        String avatarUrl,
        @Schema(description = "Timestamp when user account was created", example = "2024-01-01T00:00:00Z")
        Instant createdAt,
        @Schema(description = "Timestamp of last successful login", example = "2024-02-04T10:30:00Z")
        Instant lastLoginAt,
        @Schema(description = "Set of roles assigned to the user", example = "[\"admin\", \"developer\"]")
        Set<String> roles
) {
}
