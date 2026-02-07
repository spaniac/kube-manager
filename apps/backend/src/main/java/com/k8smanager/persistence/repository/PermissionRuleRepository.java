package com.k8smanager.persistence.repository;

import com.k8smanager.persistence.entity.PermissionRule;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

public interface PermissionRuleRepository extends JpaRepository<PermissionRule, Long> {

    List<PermissionRule> findByRole_IdOrderByIdAsc(Long roleId);

    Optional<PermissionRule> findByIdAndRole_Id(Long id, Long roleId);

    List<PermissionRule> findByRole_IdInAndPermission_IdIn(Collection<Long> roleIds, Collection<Long> permissionIds);
}
