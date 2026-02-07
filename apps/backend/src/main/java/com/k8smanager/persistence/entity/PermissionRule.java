package com.k8smanager.persistence.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Index;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "permission_rules", indexes = {
        @Index(name = "idx_permission_rules_role_id", columnList = "role_id"),
        @Index(name = "idx_permission_rules_permission_id", columnList = "permission_id"),
        @Index(name = "idx_permission_rules_namespace", columnList = "namespace")
})
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PermissionRule {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "role_id", nullable = false)
    @lombok.ToString.Exclude
    @lombok.EqualsAndHashCode.Exclude
    private Role role;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "permission_id", nullable = false)
    @lombok.ToString.Exclude
    @lombok.EqualsAndHashCode.Exclude
    private Permission permission;

    public Permission getPermission() {
        return permission;
    }

    public void setPermission(Permission permission) {
        this.permission = permission;
    }

    @Column(length = 255)
    private String namespace;

    public String getNamespace() {
        return namespace;
    }

    public void setNamespace(String namespace) {
        this.namespace = namespace;
    }

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private Effect effect;

    public Effect getEffect() {
        return effect;
    }

    public void setEffect(Effect effect) {
        this.effect = effect;
    }

    @Column(name = "resource_name_pattern", length = 255)
    private String resourceNamePattern;

    public String getResourceNamePattern() {
        return resourceNamePattern;
    }

    public void setResourceNamePattern(String resourceNamePattern) {
        this.resourceNamePattern = resourceNamePattern;
    }

    public enum Effect {
        ALLOW,
        DENY
    }
}
