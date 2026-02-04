package com.k8smanager.dto;

import io.swagger.v3.oas.annotations.media.Schema;

import java.time.Instant;

/**
 * DTO for session information.
 */
@Schema(description = "User session information including metadata and activity tracking")
public record SessionDTO(
        @Schema(description = "Unique identifier of the session", example = "1")
        Long id,
        @Schema(description = "ID of the user who owns this session", example = "1")
        Long userId,
        @Schema(description = "IP address from which the session was initiated", example = "192.168.1.100")
        String ipAddress,
        @Schema(description = "User agent string of the client browser", example = "Mozilla/5.0 (Windows NT 10.0; Win64; x64)")
        String userAgent,
        @Schema(description = "Timestamp when the session was created", example = "2024-02-04T09:00:00Z")
        Instant createdAt,
        @Schema(description = "Timestamp of last user activity", example = "2024-02-04T10:30:00Z")
        Instant lastActivityAt,
        @Schema(description = "Timestamp when the session expires", example = "2024-02-05T09:00:00Z")
        Instant expiresAt,
        @Schema(description = "Whether the session is currently active", example = "true")
        boolean active
) {
}
