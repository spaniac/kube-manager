package com.k8smanager.persistence.entity;

import jakarta.persistence.*;
import lombok.*;

/**
 * Permission entity representing granular RBAC permissions.
 * Permissions define what actions can be performed on specific resource types.
 */
@Entity
@Table(name = "permissions")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Permission {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 50)
    private PermissionType type;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ResourceType resourceType;

    @ManyToMany(mappedBy = "permissions")
    private Set<RolePermission> rolePermissions = java.util.HashSet<>();

    /**
     * Permission types (actions).
     */
    public enum PermissionType {
        READ, WRITE, DELETE, EXEC, LOGS
    }

    /**
     * Resource types that permissions can be applied to.
     */
    public enum ResourceType {
        POD, DEPLOYMENT, STATEFULSET, DAEMONSET, SERVICE, CONFIGMAP, SECRET, NAMESPACE
    }
}
