package com.k8smanager.dto;

public interface PermissionGrant {
    String permissionType();
    String resourceType();
    String namespace();
}