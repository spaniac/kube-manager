package com.k8smanager.service;

import com.k8smanager.dto.RbacAuditEventDTO;
import com.k8smanager.persistence.entity.AuditLog;
import com.k8smanager.persistence.repository.AuditLogRepository;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class RbacAuditService {

    private final AuditLogRepository auditLogRepository;

    public RbacAuditService(AuditLogRepository auditLogRepository) {
        this.auditLogRepository = auditLogRepository;
    }

    public void saveAuditEvent(RbacAuditEventDTO event) {
        AuditLog auditLog = AuditLog.builder()
                .action(event.getAction())
                .resourceType(event.getTargetType())
                .resourceId(event.getTargetId())
                .oldValues(event.getBeforeData())
                .newValues(event.getAfterData())
                .createdAt(Instant.now())
                .userAgent("RBAC_AUDIT")
                .result("SUCCESS")
                .build();
        auditLogRepository.save(auditLog);
    }

    public List<RbacAuditEventDTO> getAuditEvents(String actor, String action, LocalDateTime from, LocalDateTime to) {
        Instant fromInstant = from != null ? from.atZone(ZoneId.systemDefault()).toInstant() : null;
        Instant toInstant = to != null ? to.atZone(ZoneId.systemDefault()).toInstant() : null;

        List<AuditLog> auditLogs;
        if (fromInstant != null && toInstant != null) {
            auditLogs = auditLogRepository.findByResourceTypeAndCreatedAtBetweenOrderByCreatedAtDesc(
                    "RBAC", fromInstant, toInstant
            );
        } else {
            auditLogs = auditLogRepository.findAll();
        }

        return auditLogs.stream()
                .filter(log -> actor == null || (log.getUser() != null && log.getUser().getEmail().equalsIgnoreCase(actor)))
                .filter(log -> action == null || log.getAction().equalsIgnoreCase(action))
                .filter(log -> fromInstant == null || !log.getCreatedAt().isBefore(fromInstant))
                .filter(log -> toInstant == null || !log.getCreatedAt().isAfter(toInstant))
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    private RbacAuditEventDTO toDTO(AuditLog log) {
        RbacAuditEventDTO dto = new RbacAuditEventDTO();
        dto.setActor(log.getUser() != null ? log.getUser().getEmail() : "UNKNOWN");
        dto.setAction(log.getAction());
        dto.setTimestamp(log.getCreatedAt().atZone(ZoneId.systemDefault()).toLocalDateTime());
        dto.setTargetType(log.getResourceType());
        dto.setTargetId(log.getResourceId());
        dto.setBeforeData(log.getOldValues());
        dto.setAfterData(log.getNewValues());
        return dto;
    }
}
