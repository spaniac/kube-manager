package com.k8smanager.persistence.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.Set;

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

    @ManyToMany(mappedBy = "roles")
    private Set<Permission> permissions = new java.util.HashSet<>();

    @OneToMany(mappedBy = "role")
    private Set<UserRole> userRoles = new java.util.HashSet<>();

    /**
     * Predefined role types.
     */
    public enum RoleType {
        ADMIN, DEVELOPER, VIEWER
    }
}
