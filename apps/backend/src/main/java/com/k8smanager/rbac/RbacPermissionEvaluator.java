package com.k8smanager.rbac;

import com.k8smanager.persistence.entity.Permission;
import org.springframework.security.access.PermissionEvaluator;
import org.springframework.security.core.Authentication;

import java.io.Serializable;

/**
 * Custom permission evaluator for RBAC.
 */
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
        if (parts.length != 2) {
            return false;
        }

        Permission.PermissionType permissionType = Permission.PermissionType.valueOf(parts[0]);
        Permission.ResourceType resourceType = Permission.ResourceType.valueOf(parts[1]);

        return rbacService.hasPermission(permissionType, resourceType);
    }

    @Override
    public boolean hasPermission(Authentication authentication,
                                   Serializable targetId,
                                   String permissionType,
                                   Object permission) {
        return hasPermission(authentication, targetId, new String[]{permissionType, permission});
    }
}
