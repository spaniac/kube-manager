package com.k8smanager.controller;

import com.k8smanager.common.response.ApiResponse;
import com.k8smanager.dto.*;
import com.k8smanager.service.AlertService;
import com.k8smanager.service.MonitoringService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Controller for resource monitoring.
 */
@RestController
@RequestMapping("/metrics")
public class MonitoringController {

    private final MonitoringService monitoringService;
    private final AlertService alertService;

    public MonitoringController(MonitoringService monitoringService, AlertService alertService) {
        this.monitoringService = monitoringService;
        this.alertService = alertService;
    }

    /**
     * Get pod metrics.
     * GET /api/v1/metrics/pods/{namespace}/{name}
     */
    @GetMapping("/pods/{namespace}/{name}")
    @PreAuthorize("hasAnyAuthority('READ', 'POD')")
    public ResponseEntity<ApiResponse<MetricsResponseDTO>> getPodMetrics(
            @PathVariable String namespace,
            @PathVariable String name,
            @RequestParam(required = false) String metricType) {
        MetricsResponseDTO metrics = monitoringService.getPodMetrics(namespace, name, metricType);
        if (metrics == null) {
            return ResponseEntity.status(404).body(ApiResponse.error("Metrics not found"));
        }
        return ResponseEntity.ok(ApiResponse.success(metrics));
    }

    /**
     * Get node metrics.
     * GET /api/v1/metrics/nodes/{name}
     */
    @GetMapping("/nodes/{name}")
    @PreAuthorize("hasAnyAuthority('READ', 'NODE')")
    public ResponseEntity<ApiResponse<MetricsResponseDTO>> getNodeMetrics(
            @PathVariable String name,
            @RequestParam(required = false) String metricType) {
        MetricsResponseDTO metrics = monitoringService.getNodeMetrics(name, metricType);
        if (metrics == null) {
            return ResponseEntity.status(404).body(ApiResponse.error("Metrics not found"));
        }
        return ResponseEntity.ok(ApiResponse.success(metrics));
    }

    /**
     * Get workload metrics.
     * GET /api/v1/metrics/workloads/{kind}/{namespace}/{name}
     */
    @GetMapping("/workloads/{kind}/{namespace}/{name}")
    @PreAuthorize("hasAnyAuthority('READ', 'DEPLOYMENT')")
    public ResponseEntity<ApiResponse<MetricsResponseDTO>> getWorkloadMetrics(
            @PathVariable String kind,
            @PathVariable String namespace,
            @PathVariable String name,
            @RequestParam(required = false) String metricType) {
        MetricsResponseDTO metrics = monitoringService.getWorkloadMetrics(kind, namespace, name, metricType);
        if (metrics == null) {
            return ResponseEntity.status(404).body(ApiResponse.error("Metrics not found"));
        }
        return ResponseEntity.ok(ApiResponse.success(metrics));
    }

    /**
     * Get network I/O metrics.
     * GET /api/v1/metrics/network/{namespace}/{name}
     */
    @GetMapping("/network/{namespace}/{name}")
    @PreAuthorize("hasAnyAuthority('READ', 'POD')")
    public ResponseEntity<ApiResponse<MetricsResponseDTO>> getNetworkMetrics(
            @PathVariable String namespace,
            @PathVariable String name) {
        try {
            MetricsResponseDTO metrics = monitoringService.getNetworkMetrics(namespace, name);
            if (metrics == null) {
                return ResponseEntity.status(404).body(ApiResponse.error("Metrics not found for pod " + namespace + "/" + name));
            }
            return ResponseEntity.ok(ApiResponse.success(metrics));
        } catch (MonitoringService.PrometheusUnavailableException e) {
            return ResponseEntity.status(e.getStatus())
                    .body(ApiResponse.error(e.getStatus(), e.getMessage()));
        }
    }

    /**
     * Get storage metrics.
     * GET /api/v1/metrics/storage/{namespace}/{name}
     */
    @GetMapping("/storage/{namespace}/{name}")
    @PreAuthorize("hasAnyAuthority('READ', 'POD')")
    public ResponseEntity<ApiResponse<MetricsResponseDTO>> getStorageMetrics(
            @PathVariable String namespace,
            @PathVariable String name) {
        MetricsResponseDTO metrics = monitoringService.getStorageMetrics(namespace, name);
        if (metrics == null) {
            return ResponseEntity.status(404).body(ApiResponse.error("Metrics not found"));
        }
        return ResponseEntity.ok(ApiResponse.success(metrics));
    }

    /**
     * Get historical metrics time series.
     * GET /api/v1/metrics/history/{namespace}/{name}
     */
    @GetMapping("/history/{namespace}/{name}")
    @PreAuthorize("hasAnyAuthority('READ', 'POD')")
    public ResponseEntity<ApiResponse<TimeSeriesDTO>> getHistoricalMetrics(
            @PathVariable String namespace,
            @PathVariable String name,
            @RequestParam(defaultValue = "1h") String range,
            @RequestParam(required = false) String metricType,
            @RequestParam(required = false) String step) {
        try {
            TimeSeriesDTO timeSeries = monitoringService.getHistoricalMetrics(namespace, name, range, metricType, step);
            if (timeSeries == null || timeSeries.data().isEmpty()) {
                return ResponseEntity.status(404).body(ApiResponse.error("Historical metrics not found for " + namespace + "/" + name));
            }
            return ResponseEntity.ok(ApiResponse.success(timeSeries));
        } catch (MonitoringService.PrometheusUnavailableException e) {
            return ResponseEntity.status(e.getStatus())
                    .body(ApiResponse.error(e.getStatus(), e.getMessage()));
        }
    }

    /**
     * Execute PromQL query.
     * POST /api/v1/metrics/promql/query
     */
    @PostMapping("/promql/query")
    @PreAuthorize("hasAnyAuthority('READ', 'POD')")
    public ResponseEntity<ApiResponse<PromQLQueryResultDTO>> executePromQLQuery(
            @RequestBody PromQLQueryRequestDTO request,
            @AuthenticationPrincipal Jwt jwt) {
        PromQLQueryResultDTO result = monitoringService.executePromQLQuery(
                request.query(),
                request.range()
        );

        if (result.error() != null) {
            HttpStatus status = monitoringService.resolvePrometheusErrorStatus(result.error());
            return ResponseEntity.status(status)
                    .body(ApiResponse.error(status, monitoringService.sanitizePrometheusErrorMessage(result.error())));
        }

        return ResponseEntity.ok(ApiResponse.success(result));
    }

    /**
     * Configure alert threshold.
     * POST /api/v1/metrics/alerts/threshold
     */
    @PostMapping("/alerts/threshold")
    @PreAuthorize("hasAnyAuthority('WRITE', 'POD')")
    public ResponseEntity<ApiResponse<Void>> configureAlertThreshold(
            @RequestBody AlertThresholdDTO request,
            @AuthenticationPrincipal Jwt jwt) {
        boolean success = monitoringService.configureAlertThreshold(request);
        if (!success) {
            return ResponseEntity.status(500)
                    .body(ApiResponse.error(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to configure alert threshold"));
        }
        return ResponseEntity.ok(ApiResponse.success(null, "Alert threshold configured successfully"));
    }

    /**
     * Get alert history.
     * GET /api/v1/metrics/alerts/history
     */
    @GetMapping("/alerts/history")
    @PreAuthorize("hasAnyAuthority('READ', 'POD')")
    public ResponseEntity<ApiResponse<List<AlertDTO>>> getAlertHistory(
            @RequestParam(required = false) String namespace,
            @RequestParam(required = false) String severity,
            @AuthenticationPrincipal Jwt jwt) {
        List<AlertDTO> alerts = alertService.getAlertHistory(namespace, severity, null, 0, 100).alerts();
        return ResponseEntity.ok(ApiResponse.success(alerts));
    }

    /**
     * Detect anomalies in metrics.
     * POST /api/v1/metrics/anomalies/detect
     */
    @PostMapping("/anomalies/detect")
    @PreAuthorize("hasAnyAuthority('READ', 'POD')")
    public ResponseEntity<ApiResponse<List<AnomalyDetectionDTO>>> detectAnomalies(
            @RequestBody AnomalyDetectionRequestDTO request,
            @AuthenticationPrincipal Jwt jwt) {
        List<AnomalyDetectionDTO> anomalies = monitoringService.detectAnomalies(request);
        return ResponseEntity.ok(ApiResponse.success(anomalies));
    }

    /**
     * Acknowledge an alert.
     * POST /api/v1/metrics/alerts/{alertId}/acknowledge
     */
    @PostMapping("/alerts/{alertId}/acknowledge")
    @PreAuthorize("hasAnyAuthority('WRITE', 'POD')")
    public ResponseEntity<ApiResponse<Void>> acknowledgeAlert(
            @PathVariable Long alertId,
            @AuthenticationPrincipal Jwt jwt) {
        String actor = jwt != null ? jwt.getSubject() : "legacy-monitoring-endpoint";
        boolean success = alertService.acknowledgeAlert(alertId, actor) != null;
        if (!success) {
            return ResponseEntity.status(404)
                    .body(ApiResponse.error(HttpStatus.NOT_FOUND, "Alert not found"));
        }
        return ResponseEntity.ok(ApiResponse.success(null, "Alert acknowledged successfully"));
    }
}
