package com.k8smanager.persistence.repository;

import com.k8smanager.persistence.entity.AuditLog;
import com.k8smanager.persistence.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.Instant;
import java.util.List;

/**
 * Repository for AuditLog entity.
 */
public interface AuditLogRepository extends JpaRepository<AuditLog, Long> {

    List<AuditLog> findByUser_EmailOrderByCreatedAtDesc(String userEmail);

    Page<AuditLog> findByUser_Email(String userEmail, Pageable pageable);

    Page<AuditLog> findByResourceTypeAndCreatedAtBetween(
            @Param("resourceType") String resourceType,
            @Param("startDate") Instant startDate,
            @Param("endDate") Instant endDate,
            Pageable pageable
    );

    Page<AuditLog> findByActionAndCreatedAtBetween(
            @Param("action") String action,
            @Param("startDate") Instant startDate,
            @Param("endDate") Instant endDate,
            Pageable pageable
    );

    List<AuditLog> findByIpAddressContaining(String ipAddress);
}
