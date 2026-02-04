package com.k8smanager.persistence.repository;

import com.k8smanager.persistence.entity.UserRole;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

/**
 * Repository for UserRole entity.
 */
public interface UserRoleRepository extends JpaRepository<UserRole, Long> {

    List<UserRole> findByUser_Email(String userEmail);

    List<UserRole> findByUser_EmailAndRole_Name(String userEmail, String roleName);

    Optional<UserRole> findByUser_EmailAndRole_NameAndNamespace(String userEmail, String roleName, String namespace);

    void deleteByUser_Email(String userEmail);
}
