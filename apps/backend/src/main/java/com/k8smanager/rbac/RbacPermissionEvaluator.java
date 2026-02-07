package com.k8smanager.rbac;

import com.k8smanager.persistence.entity.Permission;
import org.springframework.security.access.PermissionEvaluator;
import org.springframework.security.core.Authentication;

import java.io.Serializable;

import org.springframework.stereotype.Component;

/**
 * Custom permission evaluator for RBAC.
 */
@Component
public class RbacPermissionEvaluator implements PermissionEvaluator {

    private final RbacService rbacService;

    public RbacPermissionEvaluator(RbacService rbacService) {
        this.rbacService = rbacService;
    }

    @Override
    public boolean hasPermission(Authentication authentication,
            Object targetDomainObject,
            Object permission) {
        if (!(permission instanceof String[])) {
            return false;
        }

        String[] parts = (String[]) permission;
        if (parts.length != 2 && parts.length != 3) {
            return false;
        }
        try {
            Permission.PermissionType permissionType = Permission.PermissionType.valueOf(parts[0].toUpperCase());
            Permission.ResourceType resourceType = Permission.ResourceType.valueOf(parts[1].toUpperCase());
            String namespace = parts.length == 3 ? parts[2] : (targetDomainObject instanceof String ? (String) targetDomainObject : null);
            return rbacService.hasPermission(permissionType, resourceType, namespace);
        } catch (IllegalArgumentException e) {
            return false;
        }
    }

    @Override
    public boolean hasPermission(Authentication authentication,
            Serializable targetId,
            String permissionType,
            Object permission) {
        if (!(permission instanceof String)) {
            return false;
        }
        String resourceType = (String) permission;
        try {
            Permission.PermissionType permType = Permission.PermissionType.valueOf(permissionType.toUpperCase());
            Permission.ResourceType resType = Permission.ResourceType.valueOf(resourceType.toUpperCase());
            String namespace = targetId == null ? null : targetId.toString();
            return rbacService.hasPermission(permType, resType, namespace);
        } catch (IllegalArgumentException e) {
            return false;
        }
    }
}
