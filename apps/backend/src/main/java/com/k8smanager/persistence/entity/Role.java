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
    @Column(nullable = false, length = 50)
    private RoleType name;

    @Column(length = 255)
    private String description;

    @OneToMany(mappedBy = "role", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<RolePermission> rolePermissions = new java.util.HashSet<>();

    /**
     * Helper to get permissions derived from rolePermissions.
     */
    public Set<Permission> getPermissions() {
        return rolePermissions.stream()
                .map(RolePermission::getPermission)
                .collect(Collectors.toSet());
    }

    @OneToMany(mappedBy = "role")
    private Set<UserRole> userRoles = new java.util.HashSet<>();

    /**
     * Predefined role types.
     */
    public enum RoleType {
        ADMIN, DEVELOPER, VIEWER
    }
}
