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

    List<Role> findByUserRoles_User_Email(String userEmail);
}
