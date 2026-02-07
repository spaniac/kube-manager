package com.k8smanager.controller;

import com.k8smanager.common.response.ApiResponse;
import com.k8smanager.dto.AlertAcknowledgeRequestDTO;
import com.k8smanager.dto.AlertDTO;
import com.k8smanager.dto.AlertListResponseDTO;
import com.k8smanager.service.AlertService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * Controller for persisted alert APIs.
 */
@RestController
@RequestMapping("/alerts")
public class AlertController {

    private final AlertService alertService;

    public AlertController(AlertService alertService) {
        this.alertService = alertService;
    }

    @GetMapping
    @PreAuthorize("hasAnyAuthority('READ', 'POD')")
    public ResponseEntity<ApiResponse<List<AlertDTO>>> getAlerts() {
        return ResponseEntity.ok(ApiResponse.success(alertService.getAlerts()));
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyAuthority('READ', 'POD')")
    public ResponseEntity<ApiResponse<AlertDTO>> getAlert(@PathVariable Long id) {
        AlertDTO alert = alertService.getAlert(id);
        if (alert == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(ApiResponse.error(HttpStatus.NOT_FOUND, "Alert not found"));
        }
        return ResponseEntity.ok(ApiResponse.success(alert));
    }

    @GetMapping("/history")
    @PreAuthorize("hasAnyAuthority('READ', 'POD')")
    public ResponseEntity<ApiResponse<AlertListResponseDTO>> getAlertHistory(
            @RequestParam(required = false) String namespace,
            @RequestParam(required = false) String severity,
            @RequestParam(required = false) Boolean acknowledged,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size
    ) {
        AlertListResponseDTO response = alertService.getAlertHistory(namespace, severity, acknowledged, page, size);
        return ResponseEntity.ok(ApiResponse.success(response));
    }

    @PatchMapping("/{id}/acknowledge")
    @PreAuthorize("hasAnyAuthority('WRITE', 'POD')")
    public ResponseEntity<ApiResponse<AlertDTO>> acknowledgeAlert(
            @PathVariable Long id,
            @RequestBody(required = false) AlertAcknowledgeRequestDTO request,
            @AuthenticationPrincipal Jwt jwt
    ) {
        String actor = request != null && request.acknowledgedBy() != null && !request.acknowledgedBy().isBlank()
                ? request.acknowledgedBy()
                : (jwt != null ? jwt.getSubject() : "unknown");

        AlertDTO alert = alertService.acknowledgeAlert(id, actor);
        if (alert == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(ApiResponse.error(HttpStatus.NOT_FOUND, "Alert not found"));
        }

        return ResponseEntity.ok(ApiResponse.success(alert, "Alert acknowledged successfully"));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyAuthority('DELETE', 'POD')")
    public ResponseEntity<ApiResponse<Void>> deleteAlert(@PathVariable Long id) {
        boolean deleted = alertService.deleteAlert(id);
        if (!deleted) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(ApiResponse.error(HttpStatus.NOT_FOUND, "Alert not found"));
        }

        return ResponseEntity.ok(ApiResponse.success(null, "Alert deleted successfully"));
    }
}
