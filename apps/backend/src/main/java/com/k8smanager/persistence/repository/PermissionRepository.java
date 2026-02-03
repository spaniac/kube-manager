package com.k8smanager.persistence.repository;

import com.k8smanager.persistence.entity.Permission;
import com.k8smanager.persistence.entity.Permission.PermissionType;
import com.k8smanager.persistence.entity.Permission.ResourceType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

/**
 * Repository for Permission entity.
 */
public interface PermissionRepository extends JpaRepository<Permission, Long> {

    List<Permission> findByType(Permission.PermissionType type);

    List<Permission> findByResourceType(Permission.ResourceType resourceType);

    List<Permission> findByTypeAndResourceType(Permission.PermissionType type, Permission.ResourceType resourceType);
}
