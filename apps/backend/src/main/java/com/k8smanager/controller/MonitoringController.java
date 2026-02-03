package com.k8smanager.controller;

import com.k8smanager.common.response.ApiResponse;
import com.k8smanager.dto.*;
import com.k8smanager.service.MonitoringService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

/**
 * Controller for resource monitoring.
 */
@RestController
@RequestMapping("/metrics")
public class MonitoringController {

    private final MonitoringService monitoringService;

    public MonitoringController(MonitoringService monitoringService) {
        this.monitoringService = monitoringService;
    }

    /**
     * Get pod metrics.
     * GET /api/v1/metrics/pods/{namespace}/{name}
     */
    @GetMapping("/pods/{namespace}/{name}")
    @PreAuthorize("hasAuthority('READ', 'POD')")
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
    @PreAuthorize("hasAuthority('READ', 'NODE')")
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
    @PreAuthorize("hasAuthority('READ', 'DEPLOYMENT')")
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
    @PreAuthorize("hasAuthority('READ', 'POD')")
    public ResponseEntity<ApiResponse<MetricsResponseDTO>> getNetworkMetrics(
            @PathVariable String namespace,
            @PathVariable String name) {
        MetricsResponseDTO metrics = monitoringService.getNetworkMetrics(namespace, name);
        if (metrics == null) {
            return ResponseEntity.status(404).body(ApiResponse.error("Metrics not found"));
        }
        return ResponseEntity.ok(ApiResponse.success(metrics));
    }

    /**
     * Get storage metrics.
     * GET /api/v1/metrics/storage/{namespace}/{name}
     */
    @GetMapping("/storage/{namespace}/{name}")
    @PreAuthorize("hasAuthority('READ', 'POD')")
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
    @PreAuthorize("hasAuthority('READ', 'POD')")
    public ResponseEntity<ApiResponse<TimeSeriesDTO>> getHistoricalMetrics(
            @PathVariable String namespace,
            @PathVariable String name,
            @RequestParam(defaultValue = "1h") String range,
            @RequestParam(required = false) String metricType) {
        TimeSeriesDTO timeSeries = monitoringService.getHistoricalMetrics(namespace, name, range, metricType);
        if (timeSeries == null || timeSeries.getData().isEmpty()) {
            return ResponseEntity.status(404).body(ApiResponse.error("Historical metrics not found"));
        }
        return ResponseEntity.ok(ApiResponse.success(timeSeries));
    }

    /**
     * Execute PromQL query.
     * POST /api/v1/metrics/promql/query
     */
    @PostMapping("/promql/query")
    @PreAuthorize("hasAuthority('READ', 'POD')")
    public ResponseEntity<ApiResponse<PromQLQueryResultDTO>> executePromQLQuery(
            @RequestBody PromQLQueryRequestDTO request,
            @AuthenticationPrincipal Jwt jwt) {
        PromQLQueryResultDTO result = monitoringService.executePromQLQuery(
                request.query(),
                request.range()
        );

        if (result.error() != null) {
            return ResponseEntity.status(500)
                    .body(ApiResponse.error("PROMQL_QUERY_FAILED", result.error()));
        }

        return ResponseEntity.ok(ApiResponse.success(result));
    }

    /**
     * Configure alert threshold.
     * POST /api/v1/metrics/alerts/threshold
     */
    @PostMapping("/alerts/threshold")
    @PreAuthorize("hasAuthority('WRITE', 'POD')")
    public ResponseEntity<ApiResponse<Void>> configureAlertThreshold(
            @RequestBody AlertThresholdDTO request,
            @AuthenticationPrincipal Jwt jwt) {
        boolean success = monitoringService.configureAlertThreshold(request);
        if (!success) {
            return ResponseEntity.status(500)
                    .body(ApiResponse.error("ALERT_CONFIG_FAILED", "Failed to configure alert threshold"));
        }
        return ResponseEntity.ok(ApiResponse.success(null, "Alert threshold configured successfully"));
    }

    /**
     * Get alert history.
     * GET /api/v1/metrics/alerts/history
     */
    @GetMapping("/alerts/history")
    @PreAuthorize("hasAuthority('READ', 'POD')")
    public ResponseEntity<ApiResponse<List<AlertDTO>>> getAlertHistory(
            @RequestParam(required = false) String namespace,
            @RequestParam(required = false) String severity,
            @AuthenticationPrincipal Jwt jwt) {
        List<AlertDTO> alerts = monitoringService.getAlertHistory(namespace, severity);
        return ResponseEntity.ok(ApiResponse.success(alerts));
    }

    /**
     * Detect anomalies in metrics.
     * POST /api/v1/metrics/anomalies/detect
     */
    @PostMapping("/anomalies/detect")
    @PreAuthorize("hasAuthority('READ', 'POD')")
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
    @PreAuthorize("hasAuthority('WRITE', 'POD')")
    public ResponseEntity<ApiResponse<Void>> acknowledgeAlert(
            @PathVariable Long alertId,
            @AuthenticationPrincipal Jwt jwt) {
        boolean success = monitoringService.acknowledgeAlert(alertId);
        if (!success) {
            return ResponseEntity.status(404)
                    .body(ApiResponse.error("ALERT_NOT_FOUND", "Alert not found"));
        }
        return ResponseEntity.ok(ApiResponse.success(null, "Alert acknowledged successfully"));
    }
}
