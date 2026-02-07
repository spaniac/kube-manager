package com.k8smanager.controller;

import com.k8smanager.common.response.ApiResponse;
import com.k8smanager.dto.SessionDTO;
import com.k8smanager.dto.UserProfileDTO;
import com.k8smanager.persistence.entity.Session;
import com.k8smanager.persistence.entity.User;
import com.k8smanager.persistence.repository.SessionRepository;
import com.k8smanager.persistence.repository.UserRepository;
import com.k8smanager.rbac.RbacService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Controller for user profile and session management.
 */
@RestController
@RequestMapping("/users")
public class UserController {

    private final UserRepository userRepository;
    private final SessionRepository sessionRepository;
    private final RbacService rbacService;

    public UserController(UserRepository userRepository, SessionRepository sessionRepository,
                          RbacService rbacService) {
        this.userRepository = userRepository;
        this.sessionRepository = sessionRepository;
        this.rbacService = rbacService;
    }

    /**
     * Get current user profile.
     * GET /api/v1/users/profile
     */
    @GetMapping("/profile")
    @PreAuthorize("hasAnyAuthority('READ', 'POD')")
    public ResponseEntity<ApiResponse<UserProfileDTO>> getProfile(
            @AuthenticationPrincipal Jwt jwt) {
        String email = jwt.getSubject();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        UserProfileDTO profile = new UserProfileDTO(
                user.getId(),
                user.getEmail(),
                user.getName(),
                user.getAvatarUrl(),
                user.getCreatedAt(),
                user.getLastLoginAt(),
                user.getUserRoles().stream()
                        .map(userRole -> userRole.getRole().getAuthorityName())
                        .collect(Collectors.toSet())
        );

        return ResponseEntity.ok(ApiResponse.success(profile));
    }

    /**
     * Get current user sessions.
     * GET /api/v1/users/sessions
     */
    @GetMapping("/sessions")
    @PreAuthorize("hasAnyAuthority('READ', 'POD')")
    public ResponseEntity<ApiResponse<List<SessionDTO>>> getSessions(
            @AuthenticationPrincipal Jwt jwt) {
        String email = jwt.getSubject();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        List<SessionDTO> sessions = user.getSessions().stream()
                .map(session -> new SessionDTO(
                        session.getId(),
                        session.getUser().getId(),
                        session.getIpAddress(),
                        session.getUserAgent(),
                        session.getCreatedAt(),
                        session.getLastActivityAt(),
                        session.getExpiresAt(),
                        !session.isExpired() && !session.isInactive(30)
                ))
                .collect(Collectors.toList());

        return ResponseEntity.ok(ApiResponse.success(sessions));
    }

    /**
     * Revoke a specific session.
     * DELETE /api/v1/users/sessions/{sessionId}
     */
    @DeleteMapping("/sessions/{sessionId}")
    @PreAuthorize("hasAnyAuthority('DELETE', 'POD')")
    public ResponseEntity<ApiResponse<Void>> revokeSession(
            @PathVariable Long sessionId,
            @AuthenticationPrincipal Jwt jwt) {
        String email = jwt.getSubject();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Session session = sessionRepository.findById(sessionId)
                .orElseThrow(() -> new RuntimeException("Session not found"));

        if (!session.getUser().getId().equals(user.getId())) {
            return ResponseEntity.status(403).build();
        }

        sessionRepository.delete(session);
        return ResponseEntity.ok(ApiResponse.success(null, "Session revoked successfully"));
    }

    /**
     * Revoke all sessions except current.
     * DELETE /api/v1/users/sessions/revoke-all
     */
    @DeleteMapping("/sessions/revoke-all")
    @PreAuthorize("hasAnyAuthority('DELETE', 'POD')")
    public ResponseEntity<ApiResponse<Void>> revokeAllSessions(
            @AuthenticationPrincipal Jwt jwt) {
        String email = jwt.getSubject();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Keep only sessions from last 5 minutes (current session)
        Instant cutoff = Instant.now().minus(java.time.Duration.ofMinutes(5));
        user.getSessions().removeIf(session -> session.getCreatedAt().isBefore(cutoff));

        userRepository.save(user);
        return ResponseEntity.ok(ApiResponse.success(null, "All sessions revoked successfully"));
    }

}
