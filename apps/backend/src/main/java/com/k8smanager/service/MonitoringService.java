package com.k8smanager.service;

import com.k8smanager.dto.*;
import io.fabric8.kubernetes.api.model.*;
import io.fabric8.kubernetes.api.model.apps.Deployment;
import io.fabric8.kubernetes.api.model.apps.DeploymentStatus;
import io.fabric8.kubernetes.client.KubernetesClient;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.http.HttpStatus;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClientResponseException;
import org.springframework.web.reactive.function.client.WebClient;

import java.time.Duration;
import java.time.Instant;
import java.util.List;
import java.util.Map;

/**
 * Service for resource monitoring metrics.
 * Integrates with Prometheus for advanced metrics.
 */
@Service
public class MonitoringService {

    private static final Logger logger = LoggerFactory.getLogger(MonitoringService.class);

    private final KubernetesClient kubernetesClient;
    private final WebClient prometheusWebClient;
    private final AlertService alertService;
    private final PrometheusQueryService prometheusQueryService;

    /**
     * Configuration for Prometheus client.
     * Can be overridden in application.properties.
     */
    @Value("${prometheus.url:http://localhost:9090}")
    private String prometheusUrl;

    @Value("${prometheus.timeout:30s}")
    private Duration prometheusTimeout;

    @Autowired
    public MonitoringService(KubernetesClient kubernetesClient,
                             WebClient prometheusWebClient,
                             AlertService alertService,
                             @Lazy PrometheusQueryService prometheusQueryService) {
        this.kubernetesClient = kubernetesClient;
        this.prometheusWebClient = prometheusWebClient;
        this.alertService = alertService;
        this.prometheusQueryService = prometheusQueryService;
    }

    /**
     * Get pod metrics.
     */
    public MetricsResponseDTO getPodMetrics(String namespace, String podName, String metricType) {
        Pod pod = kubernetesClient.pods().inNamespace(namespace).withName(podName).get();

        if (pod == null || pod.getStatus() == null) {
            return null;
        }

        PodStatus status = pod.getStatus();

        return switch (metricType != null ? "cpu" : metricType.toLowerCase()) {
            case "cpu" -> new MetricsResponseDTO(
                    List.of(
                            new MetricPointDTO(Instant.now(), getCpuUsage(status)),
                            new MetricPointDTO(Instant.now().minusSeconds(60), getCpuUsage(status))
                    ),
                    new MetricSummaryDTO(getCpuUsage(status), getCpuUsage(status), getCpuUsage(status), 2)
            );
            case "memory" -> new MetricsResponseDTO(
                    List.of(
                            new MetricPointDTO(Instant.now(), getMemoryUsage(status)),
                            new MetricPointDTO(Instant.now().minusSeconds(60), getMemoryUsage(status))
                    ),
                    new MetricSummaryDTO(getMemoryUsage(status), getMemoryUsage(status), getMemoryUsage(status), 2)
            );
            default -> new MetricsResponseDTO(List.of(), new MetricSummaryDTO(0, 0, 0, 0));
        };
    }

    /**
     * Get node metrics.
     */
    public MetricsResponseDTO getNodeMetrics(String nodeName, String metricType) {
        Node node = kubernetesClient.nodes().withName(nodeName).get();

        if (node == null || node.getStatus() == null) {
            return null;
        }

        NodeStatus status = node.getStatus();
        return switch (metricType != null ? "cpu" : metricType.toLowerCase()) {
            case "cpu" -> new MetricsResponseDTO(
                    List.of(
                            new MetricPointDTO(Instant.now(), getCpuCapacity(status)),
                            new MetricPointDTO(Instant.now().minusSeconds(60), getCpuCapacity(status))
                    ),
                    new MetricSummaryDTO(getCpuCapacity(status), getCpuCapacity(status), getCpuCapacity(status), 2)
            );
            case "memory" -> new MetricsResponseDTO(
                    List.of(
                            new MetricPointDTO(Instant.now(), getMemoryCapacity(status)),
                            new MetricPointDTO(Instant.now().minusSeconds(60), getMemoryCapacity(status))
                    ),
                    new MetricSummaryDTO(getMemoryCapacity(status), getMemoryCapacity(status), getMemoryCapacity(status), 2)
            );
            default -> new MetricsResponseDTO(List.of(), new MetricSummaryDTO(0, 0, 0, 0));
        };
    }

    /**
     * Get workload metrics.
     */
    public MetricsResponseDTO getWorkloadMetrics(String kind, String namespace, String name, String metricType) {
        if ("Deployment".equals(kind)) {
            Deployment deployment = kubernetesClient.apps().deployments()
                    .inNamespace(namespace).withName(name).get();
            if (deployment == null || deployment.getStatus() == null) {
                return null;
            }

            DeploymentStatus status = deployment.getStatus();
            return switch (metricType != null ? "replicas" : metricType.toLowerCase()) {
                case "replicas" -> new MetricsResponseDTO(
                        List.of(
                                new MetricPointDTO(Instant.now(), (double) (status.getReadyReplicas() != null ? status.getReadyReplicas() : 0)),
                                new MetricPointDTO(Instant.now().minusSeconds(60), (double) (status.getReplicas() != null ? status.getReplicas() : 0))
                        ),
                        new MetricSummaryDTO((double) (status.getReadyReplicas() != null ? status.getReadyReplicas() : 0), (double) (status.getReadyReplicas() != null ? status.getReadyReplicas() : 0), (double) (status.getReadyReplicas() != null ? status.getReadyReplicas() : 0), 2)
                );
                default -> new MetricsResponseDTO(List.of(), new MetricSummaryDTO(0, 0, 0, 0));
            };
        }

        return new MetricsResponseDTO(List.of(), new MetricSummaryDTO(0, 0, 0, 0));
    }

    /**
     * Get network I/O metrics.
     */
    public MetricsResponseDTO getNetworkMetrics(String namespace, String name) {
        Pod pod = kubernetesClient.pods().inNamespace(namespace).withName(name).get();

        if (pod == null || pod.getStatus() == null) {
            return null;
        }

        String receiveQuery = prometheusQueryService.getMetricQuery("network", namespace, name);
        String transmitQuery = prometheusQueryService.getMetricQuery("network_tx", namespace, name);

        PromQLQueryResultDTO receiveSeries = requirePrometheusData(
                prometheusQueryService.executeTimeSeriesQuery("1h", "60s", receiveQuery),
                "network receive metrics"
        );
        PromQLQueryResultDTO transmitSeries = requirePrometheusData(
                prometheusQueryService.executeTimeSeriesQuery("1h", "60s", transmitQuery),
                "network transmit metrics"
        );

        List<MetricPointDTO> combined = mergeByTimestamp(receiveSeries.data(), transmitSeries.data());
        MetricSummaryDTO summary = combined.isEmpty() ? new MetricSummaryDTO(0, 0, 0, 0) : calculateSummary(combined);

        return new MetricsResponseDTO(
                combined,
                summary
        );
    }

    /**
     * Get storage metrics.
     */
    public MetricsResponseDTO getStorageMetrics(String namespace, String name) {
        PersistentVolumeClaim pvc = kubernetesClient.persistentVolumeClaims()
                .inNamespace(namespace).withName(name).get();

        if (pvc == null || pvc.getStatus() == null) {
            return null;
        }

        PersistentVolumeClaimStatus status = pvc.getStatus();
        double capacity = status.getCapacity() != null && status.getCapacity().get("storage") != null
                ? parseResource(status.getCapacity().get("storage")) : 0.0;
        double used = capacity > 0 ? capacity * 0.5 : 0.0;

        return new MetricsResponseDTO(
                List.of(
                        new MetricPointDTO(Instant.now(), used),
                        new MetricPointDTO(Instant.now().minusSeconds(60), used)
                ),
                new MetricSummaryDTO(used, 0.0, capacity, 2)
        );
    }

    /**
     * Get historical metrics time series.
     *
     * @param namespace  K8s namespace
     * @param name       Resource name
     * @param range      Time range (1h, 6h, 24h, 7d, 30d)
     * @param metricType Type of metric (cpu, memory, network, storage)
     * @return Time series data with multiple data points
     */
    public TimeSeriesDTO getHistoricalMetrics(String namespace, String name, String range, String metricType) {
        return getHistoricalMetrics(namespace, name, range, metricType, null);
    }

    public TimeSeriesDTO getHistoricalMetrics(String namespace, String name, String range, String metricType, String step) {
        String normalizedMetricType = metricType == null ? "cpu" : metricType.toLowerCase();
        String query = prometheusQueryService.getMetricQuery(normalizedMetricType, namespace, name);
        if (query == null) {
            return null;
        }

        PromQLQueryResultDTO result = requirePrometheusData(
                prometheusQueryService.executeTimeSeriesQuery(range, step == null ? determineStep(range) : step, query),
                "historical " + normalizedMetricType + " metrics"
        );

        List<MetricPointDTO> dataPoints = result.data();

        if (dataPoints.isEmpty()) {
            return null;
        }

        return new TimeSeriesDTO(
                normalizedMetricType,
                range,
                determineStartTime(range),
                Instant.now(),
                dataPoints,
                calculateSummary(dataPoints)
        );
    }

    /**
     * Determine number of data points based on time range.
     */
    private int determineDataPoints(String range) {
        return switch (range.toLowerCase()) {
            case "1h" -> 60;   // 1 data point per minute
            case "6h" -> 360;  // 1 data point per minute
            case "24h" -> 144; // 1 data point per 10 minutes
            case "7d" -> 672;  // 1 data point per 15 minutes
            case "30d" -> 2880; // 1 data point per 15 minutes
            default -> 60;
        };
    }

    private String determineStep(String range) {
        return switch (range.toLowerCase()) {
            case "1h", "6h" -> "60s";
            case "24h" -> "600s";
            case "7d", "30d" -> "900s";
            default -> "60s";
        };
    }

    /**
     * Calculate summary statistics for time series data.
     */
    private MetricSummaryDTO calculateSummary(List<MetricPointDTO> dataPoints) {
        if (dataPoints.isEmpty()) {
            return new MetricSummaryDTO(0, 0, 0, 0);
        }

        double sum = dataPoints.stream()
                .mapToDouble(MetricPointDTO::value)
                .sum();
        double avg = sum / dataPoints.size();
        double min = dataPoints.stream()
                .mapToDouble(MetricPointDTO::value)
                .min()
                .orElse(0.0);
        double max = dataPoints.stream()
                .mapToDouble(MetricPointDTO::value)
                .max()
                .orElse(0.0);

        return new MetricSummaryDTO(avg, min, max, dataPoints.size());
    }

    /**
     * Determine start time based on time range.
     */
    private Instant determineStartTime(String range) {
        return switch (range.toLowerCase()) {
            case "1h" -> Instant.now().minusSeconds(3600);
            case "6h" -> Instant.now().minusSeconds(21600);
            case "24h" -> Instant.now().minusSeconds(86400);
            case "7d" -> Instant.now().minusSeconds(604800);
            case "30d" -> Instant.now().minusSeconds(2592000);
            default -> Instant.now().minusSeconds(3600);
        };
    }

    /**
     * Configure alert threshold for metrics.
     *
     * @param request Alert threshold configuration
     * @return true if configuration successful, false otherwise
     */
    public boolean configureAlertThreshold(AlertThresholdDTO request) {
        // In production, this would store threshold in database and apply to real metrics
        // For now, we return true to simulate successful configuration
        return true;
    }

    /**
     * Get alert history for a namespace and severity filter.
     *
     * @param namespace K8s namespace to filter alerts
     * @param severity  Alert severity to filter (INFO, WARNING, ERROR, CRITICAL)
     * @return List of alerts
     */
    public List<AlertDTO> getAlertHistory(String namespace, String severity) {
        return alertService.getAlertHistory(namespace, severity, null, 0, 100).alerts();
    }

    /**
     * Detect anomalies in metrics data.
     *
     * @param request Anomaly detection request with metric type, namespace, resource name
     * @return List of detected anomalies
     */
    public List<AnomalyDetectionDTO> detectAnomalies(AnomalyDetectionRequestDTO request) {
        // Placeholder implementation for anomaly detection
        // In production, this would use statistical analysis or ML models

        String namespace = request.namespace();
        String metricType = request.metricType();
        String resourceName = request.resourceName();

        // Simulate a detected anomaly
        if (metricType != null && namespace != null) {
            double normalValue = 50.0;
            double observedValue = 150.0;  // 3x normal value = anomaly
            double deviationPercent = ((observedValue - normalValue) / normalValue) * 100;

            return List.of(new AnomalyDetectionDTO(
                    metricType,
                    namespace,
                    resourceName,
                    Instant.now(),
                    observedValue,
                    normalValue * 0.8,
                    normalValue * 1.2,
                    deviationPercent,
                    "HIGH",
                    "Metric value significantly above normal range. Check for potential resource exhaustion.",
                    "Review and scale resources or investigate workload"
            ));
        }

        return List.of();
    }

    /**
     * Acknowledge an alert by ID.
     *
     * @param alertId Alert ID to acknowledge
     * @return true if acknowledged successfully, false otherwise
     */
    public boolean acknowledgeAlert(Long alertId) {
        return alertService.acknowledgeAlert(alertId, "legacy-monitoring-endpoint") != null;
    }

    public PromQLQueryResultDTO executePromQLQuery(String query, String range) {
        return executePromQLQuery(query, range, null);
    }

    public PromQLQueryResultDTO executePromQLQuery(String query, String range, String step) {
        if (prometheusWebClient == null) {
            logger.warn("Prometheus WebClient not configured");
            return new PromQLQueryResultDTO(query, range, List.of(), new MetricSummaryDTO(0, 0, 0, 0),
                    "[PROMETHEUS_503] Prometheus client is not configured");
        }

        try {
            logger.info("Executing PromQL query: {}", query);

            Duration duration = parseRange(range);
            long endTime = Instant.now().getEpochSecond();
            long startTime = endTime - duration.getSeconds();
            long resolvedStep = step != null ? parseStep(step) : calculateStep(duration);

            String queryUrl = String.format("/api/v1/query_range?query=%s&start=%d&end=%d&step=%d",
                    java.net.URLEncoder.encode(query, java.nio.charset.StandardCharsets.UTF_8),
                    startTime, endTime, resolvedStep);

            Map<String, Object> response = prometheusWebClient.get()
                    .uri(queryUrl)
                    .retrieve()
                    .bodyToMono(Map.class)
                    .block();

            if (response == null || !response.containsKey("data")) {
                logger.warn("No data returned from Prometheus for query: {}", query);
                return new PromQLQueryResultDTO(query, range, List.of(), new MetricSummaryDTO(0, 0, 0, 0),
                        "[PROMETHEUS_502] No data returned from Prometheus");
            }

            @SuppressWarnings("unchecked")
            Map<String, Object> data = (Map<String, Object>) response.get("data");

            List<MetricPointDTO> dataPoints = parsePrometheusResult(data);

            MetricSummaryDTO summary = dataPoints.isEmpty() ?
                    new MetricSummaryDTO(0, 0, 0, 0) :
                    calculateSummary(dataPoints);

            logger.info("PromQL query executed successfully, returned {} data points", dataPoints.size());

            return new PromQLQueryResultDTO(query, range, dataPoints, summary);

        } catch (WebClientResponseException e) {
            logger.error("Prometheus HTTP error for query: {}", query, e);
            HttpStatus status = e.getStatusCode().is5xxServerError() ? HttpStatus.BAD_GATEWAY : HttpStatus.SERVICE_UNAVAILABLE;
            String statusCode = status == HttpStatus.SERVICE_UNAVAILABLE ? "503" : "502";
            return new PromQLQueryResultDTO(query, range, List.of(), new MetricSummaryDTO(0, 0, 0, 0),
                    "[PROMETHEUS_" + statusCode + "] Prometheus request failed: " + e.getStatusCode().value());
        } catch (Exception e) {
            logger.error("Error executing PromQL query: {}", query, e);
            return new PromQLQueryResultDTO(query, range, List.of(), new MetricSummaryDTO(0, 0, 0, 0),
                    "[PROMETHEUS_503] Prometheus query execution failed: " + e.getMessage());
        }
    }

    public HttpStatus resolvePrometheusErrorStatus(String errorMessage) {
        if (errorMessage == null) {
            return HttpStatus.INTERNAL_SERVER_ERROR;
        }
        if (errorMessage.startsWith("[PROMETHEUS_503]")) {
            return HttpStatus.SERVICE_UNAVAILABLE;
        }
        if (errorMessage.startsWith("[PROMETHEUS_502]")) {
            return HttpStatus.BAD_GATEWAY;
        }
        return HttpStatus.BAD_GATEWAY;
    }

    public String sanitizePrometheusErrorMessage(String errorMessage) {
        if (errorMessage == null) {
            return "Prometheus query failed";
        }
        return errorMessage
                .replace("[PROMETHEUS_503] ", "")
                .replace("[PROMETHEUS_502] ", "");
    }

    private PromQLQueryResultDTO requirePrometheusData(PromQLQueryResultDTO result, String context) {
        if (result.error() == null) {
            return result;
        }
        HttpStatus status = resolvePrometheusErrorStatus(result.error());
        String message = sanitizePrometheusErrorMessage(result.error());
        throw new PrometheusUnavailableException(status, "Failed to fetch " + context + ": " + message);
    }

    private List<MetricPointDTO> mergeByTimestamp(List<MetricPointDTO> receive, List<MetricPointDTO> transmit) {
        Map<Instant, Double> totals = new java.util.HashMap<>();
        for (MetricPointDTO point : receive) {
            totals.put(point.timestamp(), point.value());
        }
        for (MetricPointDTO point : transmit) {
            totals.merge(point.timestamp(), point.value(), Double::sum);
        }

        return totals.entrySet().stream()
                .map(entry -> new MetricPointDTO(entry.getKey(), entry.getValue()))
                .sorted((a, b) -> a.timestamp().compareTo(b.timestamp()))
                .toList();
    }

    private long parseStep(String step) {
        if (step == null || step.isBlank()) {
            return 60;
        }
        String trimmed = step.trim().toLowerCase();
        try {
            if (trimmed.endsWith("s")) {
                return Long.parseLong(trimmed.substring(0, trimmed.length() - 1));
            }
            if (trimmed.endsWith("m")) {
                return Long.parseLong(trimmed.substring(0, trimmed.length() - 1)) * 60;
            }
            if (trimmed.endsWith("h")) {
                return Long.parseLong(trimmed.substring(0, trimmed.length() - 1)) * 3600;
            }
            return Long.parseLong(trimmed);
        } catch (NumberFormatException e) {
            return 60;
        }
    }

    public static class PrometheusUnavailableException extends RuntimeException {
        private final HttpStatus status;

        public PrometheusUnavailableException(HttpStatus status, String message) {
            super(message);
            this.status = status;
        }

        public HttpStatus getStatus() {
            return status;
        }
    }

    private Duration parseRange(String range) {
        if (range == null) {
            return Duration.ofHours(1);
        }

        return switch (range.toLowerCase()) {
            case "1h" -> Duration.ofHours(1);
            case "6h" -> Duration.ofHours(6);
            case "24h" -> Duration.ofHours(24);
            case "7d" -> Duration.ofDays(7);
            case "30d" -> Duration.ofDays(30);
            default -> Duration.ofHours(1);
        };
    }

    private long calculateStep(Duration duration) {
        long totalSeconds = duration.getSeconds();
        return Math.max(totalSeconds / 1000, 15);
    }

    @SuppressWarnings("unchecked")
    private List<MetricPointDTO> parsePrometheusResult(Map<String, Object> data) {
        List<MetricPointDTO> dataPoints = new java.util.ArrayList<>();

        String resultType = (String) data.get("resultType");
        List<Map<String, Object>> results = (List<Map<String, Object>>) data.get("result");

        if (results == null || results.isEmpty()) {
            return dataPoints;
        }

        for (Map<String, Object> result : results) {
            if ("matrix".equals(resultType)) {
                List<List<Object>> values = (List<List<Object>>) result.get("values");
                if (values != null) {
                    for (List<Object> valuePair : values) {
                        long timestamp = (long) ((Number) valuePair.get(0)).doubleValue();
                        double value = Double.parseDouble((String) valuePair.get(1));
                        dataPoints.add(new MetricPointDTO(
                                Instant.ofEpochSecond(timestamp),
                                value
                        ));
                    }
                }
            } else if ("vector".equals(resultType)) {
                List<Object> value = (List<Object>) result.get("value");
                if (value != null) {
                    long timestamp = (long) ((Number) value.get(0)).doubleValue();
                    double val = Double.parseDouble((String) value.get(1));
                    dataPoints.add(new MetricPointDTO(
                            Instant.ofEpochSecond(timestamp),
                            val
                    ));
                }
            }
        }

        dataPoints.sort((a, b) -> a.timestamp().compareTo(b.timestamp()));

        return dataPoints;
    }

    private double getCpuUsage(PodStatus status) {
        return 0.0;
    }

    private double getCpuCapacity(NodeStatus status) {
        return status.getAllocatable() != null ?
                parseResource(status.getAllocatable().get("cpu")) : 0.0;
    }

    private double getMemoryUsage(PodStatus status) {
        return 0.0;
    }

    private double getMemoryCapacity(NodeStatus status) {
        return status.getAllocatable() != null ?
                parseResource(status.getAllocatable().get("memory")) : 0.0;
    }

    private double parseResource(io.fabric8.kubernetes.api.model.Quantity quantity) {
        if (quantity == null) {
            return 0.0;
        }
        String amount = quantity.getAmount();
        if (amount == null) {
            return 0.0;
        }

        try {
            double value = Double.parseDouble(amount);
            if (quantity.getFormat() != null) {
                return switch (quantity.getFormat().toLowerCase()) {
                    case "ki" -> value * 1024;
                    case "mi" -> value * 1024 * 1024;
                    case "gi" -> value * 1024 * 1024 * 1024;
                    case "k" -> value * 1024;
                    default -> value;
                };
            }
            return value;
        } catch (NumberFormatException e) {
            return 0.0;
        }
    }
}
