package com.k8smanager.dto;

import java.time.Instant;
import java.util.Set;

/**
 * DTO for user profile information.
 */
public record UserProfileDTO(
        Long id,
        String email,
        String name,
        String avatarUrl,
        Instant createdAt,
        Instant lastLoginAt,
        Set<String> roles
) {
}
