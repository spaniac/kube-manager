package com.k8smanager.persistence.repository;

import com.k8smanager.persistence.entity.RolePermission;
import com.k8smanager.persistence.entity.Role;
import com.k8smanager.persistence.entity.Permission;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

/**
 * Repository for RolePermission entity.
 */
public interface RolePermissionRepository extends JpaRepository<RolePermission, Long> {

    List<RolePermission> findByRole_Id(Long roleId);

    List<RolePermission> findByRole_IdAndNamespace(Long roleId, String namespace);

    List<RolePermission> findByPermission_Id(Long permissionId);

    void deleteByRole_Id(Long roleId);
}
