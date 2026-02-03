package com.k8smanager.persistence.repository;

import com.k8smanager.persistence.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

/**
 * Repository for User entity.
 */
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);

    List<User> findByEmailContainingIgnoreCase(String email);

    boolean existsByEmail(String email);

    void deleteByEmail(String email);
}
