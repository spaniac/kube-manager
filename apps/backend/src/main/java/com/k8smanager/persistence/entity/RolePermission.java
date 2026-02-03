package com.k8smanager.persistence.entity;

import jakarta.persistence.*;
import lombok.*;

/**
 * Many-to-many relationship between Role and Permission.
 * Supports namespace-scoped permissions.
 */
@Entity
@Table(name = "role_permissions", uniqueConstraints = {
        @UniqueConstraint(columnNames = {"role_id", "permission_id", "namespace"})
})
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RolePermission {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "role_id", nullable = false)
    private Role role;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "permission_id", nullable = false)
    private Permission permission;

    @Column(length = 255, nullable = true)
    private String namespace;

    /**
     * Check if permission is namespace-scoped.
     */
    public boolean isNamespaceScoped() {
        return namespace != null && !namespace.isEmpty();
    }
}
