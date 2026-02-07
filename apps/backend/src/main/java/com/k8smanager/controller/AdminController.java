package com.k8smanager.controller;

import com.k8smanager.common.response.ApiResponse;
import com.k8smanager.dto.RbacAuditEventDTO;
import com.k8smanager.service.RbacAuditService;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/v1/admin/rbac")
@PreAuthorize("hasAuthority('ADMIN')")
public class AdminController {

    private final RbacAuditService rbacAuditService;

    public AdminController(RbacAuditService rbacAuditService) {
        this.rbacAuditService = rbacAuditService;
    }

    @GetMapping("/audit")
    public ResponseEntity<ApiResponse<List<RbacAuditEventDTO>>> getRbacAuditLogs(
            @RequestParam(required = false) String actor,
            @RequestParam(required = false) String action,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime from,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime to
    ) {
        List<RbacAuditEventDTO> auditEvents = rbacAuditService.getAuditEvents(actor, action, from, to);
        return ResponseEntity.ok(ApiResponse.success(auditEvents));
    }
}
