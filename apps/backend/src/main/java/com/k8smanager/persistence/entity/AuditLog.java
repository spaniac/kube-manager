package com.k8smanager.persistence.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;

/**
 * Audit log entity for tracking all CRUD operations.
 * Used for compliance and security auditing.
 */
@Entity
@Table(name = "audit_logs", indexes = {
        @Index(name = "idx_audit_user_id", columnList = "user_id"),
        @Index(name = "idx_audit_timestamp", columnList = "created_at"),
        @Index(name = "idx_audit_resource_type", columnList = "resource_type")
})
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AuditLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false, length = 50)
    private String action;

    @Column(length = 50)
    private String resourceType;

    @Column(length = 255)
    private String resourceId;

    @Column(nullable = false)
    private Instant createdAt;

    @Column(length = 255)
    private String ipAddress;

    @Column(nullable = false, length = 50)
    private String userAgent;

    @Column(length = 500)
    private String oldValues;

    @Column(length = 500)
    private String newValues;

    @Column(length = 255)
    private String result;
}
