package com.k8smanager.persistence.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;
import java.util.stream.Collectors;

/**
 * Role entity representing RBAC roles.
 * Predefined roles: ADMIN, DEVELOPER, VIEWER.
 */
@Entity
@Table(name = "roles")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Role {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(nullable = true, length = 50)
    private RoleType name;

    @Column(name = "role_key", nullable = false, length = 100)
    private String roleKey;

    @Column(name = "is_custom", nullable = false)
    private boolean isCustom;

    @Column(name = "display_name", nullable = false, length = 100)
    private String displayName;

    @Column(length = 255)
    private String description;

    @OneToMany(mappedBy = "role", cascade = CascadeType.ALL, orphanRemoval = true)
    @lombok.ToString.Exclude
    @lombok.EqualsAndHashCode.Exclude
    private Set<RolePermission> rolePermissions = new java.util.HashSet<>();

    /**
     * Helper to get permissions derived from rolePermissions.
     */
    public Set<Permission> getPermissions() {
        return rolePermissions.stream()
                .map(RolePermission::getPermission)
                .collect(Collectors.toSet());
    }

    public String getAuthorityName() {
        return roleKey != null ? roleKey : (name != null ? name.name() : "");
    }

    @OneToMany(mappedBy = "role")
    @lombok.ToString.Exclude
    @lombok.EqualsAndHashCode.Exclude
    private Set<UserRole> userRoles = new java.util.HashSet<>();

    /**
     * Predefined role types.
     */
    public enum RoleType {
        ADMIN, DEVELOPER, VIEWER
    }
}
