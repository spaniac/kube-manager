package com.k8smanager.persistence.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.Instant;
import java.util.Set;

/**
 * User entity representing application users.
 * Users can be authenticated via OAuth2/OIDC and have RBAC roles.
 */
@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 255)
    private String email;

    @Column(length = 255)
    private String name;

    @Column(length = 255)
    private String avatarUrl;

    @Column(nullable = false)
    private Instant createdAt;

    @Column(nullable = false)
    private Instant lastLoginAt;

    @ManyToMany(mappedBy = "user")
    private Set<UserRole> userRoles = java.util.HashSet<>();

    @OneToMany(mappedBy = "createdBy")
    private Set<AuditLog> auditLogs = java.util.HashSet<>();

    @OneToMany(mappedBy = "user")
    private Set<Session> sessions = java.util.HashSet<>();

    /**
     * Check if user has a specific role.
     */
    public boolean hasRole(String roleName) {
        return userRoles.stream()
                .anyMatch(userRole -> userRole.getRole().getName().equals(roleName));
    }
}
