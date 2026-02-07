package com.k8smanager.persistence.repository;

import com.k8smanager.persistence.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

/**
 * Repository for Role entity.
 */
public interface RoleRepository extends JpaRepository<Role, Long> {

    Optional<Role> findByName(Role.RoleType name);

    Optional<Role> findByRoleKey(String roleKey);

    Optional<Role> findByDisplayName(String displayName);

    List<Role> findByIsCustom(boolean isCustom);

    List<Role> findAllByOrderByIsCustomAscDisplayNameAsc();

    boolean existsByRoleKeyIgnoreCase(String roleKey);

    boolean existsByRoleKeyIgnoreCaseAndIdNot(String roleKey, Long id);

    List<Role> findByUserRoles_User_Email(String userEmail);
}
