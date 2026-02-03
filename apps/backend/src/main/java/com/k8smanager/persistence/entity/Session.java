package com.k8smanager.persistence.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;

/**
 * Session entity for managing OAuth2 sessions.
 * Tracks active user sessions with timeout.
 */
@Entity
@Table(name = "sessions", indexes = {
        @Index(name = "idx_session_user_id", columnList = "user_id"),
        @Index(name = "idx_session_refresh_token", columnList = "refresh_token")
})
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Session {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false, unique = true, length = 500)
    private String accessToken;

    @Column(nullable = false, unique = true, length = 500)
    private String refreshToken;

    @Column(nullable = false)
    private Instant expiresAt;

    @Column(nullable = false)
    private Instant lastActivityAt;

    @Column(nullable = false)
    private Instant createdAt;

    @Column(length = 50)
    private String ipAddress;

    @Column(length = 500)
    private String userAgent;

    /**
     * Check if session is expired.
     */
    public boolean isExpired() {
        return Instant.now().isAfter(expiresAt);
    }

    /**
     * Check if session is inactive (timeout).
     */
    public boolean isInactive(long timeoutMinutes) {
        return Instant.now().minus(java.time.Duration.ofMinutes(timeoutMinutes))
                .isAfter(lastActivityAt);
    }
}
