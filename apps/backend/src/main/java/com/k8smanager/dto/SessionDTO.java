package com.k8smanager.dto;

import java.time.Instant;

/**
 * DTO for session information.
 */
public record SessionDTO(
        Long id,
        Long userId,
        String ipAddress,
        String userAgent,
        Instant createdAt,
        Instant lastActivityAt,
        Instant expiresAt,
        boolean active
) {
}
