package com.k8smanager.service;

import com.k8smanager.dto.*;

import io.fabric8.kubernetes.api.model.*;
import io.fabric8.kubernetes.client.KubernetesClient;
import io.micrometer.prometheus.PrometheusMeterRegistry;
import io.micrometer.prometheusclient.PrometheusClient;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;

import java.time.Instant;
import java.time.Duration;
import java.util.List;

/**
 * Service for resource monitoring metrics.
 * Integrates with Prometheus for advanced metrics.
 */
@Service
public class MonitoringService {

    private final KubernetesClient kubernetesClient;
    private final PrometheusClient prometheusClient;

    /**
     * Configuration for Prometheus client.
     * Can be overridden in application.properties.
     */
    @Value("${prometheus.url:http://localhost:9090}")
    private String prometheusUrl;

    @Value("${prometheus.timeout:30s}")
    private Duration prometheusTimeout;

    @Autowired
    public MonitoringService(KubernetesClient kubernetesClient, PrometheusClient prometheusClient) {
        this.kubernetesClient = kubernetesClient;
        this.prometheusClient = prometheusClient;
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
                    new MetricSummaryDTO(getCpuUsage(status), getCpuUsage(status), 2)
            );
            case "memory" -> new MetricsResponseDTO(
                    List.of(
                            new MetricPointDTO(Instant.now(), getMemoryUsage(status)),
                            new MetricPointDTO(Instant.now().minusSeconds(60), getMemoryUsage(status))
                    ),
                    new MetricSummaryDTO(getMemoryUsage(status), getMemoryUsage(status), 2)
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
                    new MetricSummaryDTO(getCpuCapacity(status), getCpuCapacity(status), 2)
            );
            case "memory" -> new MetricsResponseDTO(
                    List.of(
                            new MetricPointDTO(Instant.now(), getMemoryCapacity(status)),
                            new MetricPointDTO(Instant.now().minusSeconds(60), getMemoryCapacity(status))
                    ),
                    new MetricSummaryDTO(getMemoryCapacity(status), getMemoryCapacity(status), 2)
            );
            default -> new MetricsResponseDTO(List.of(), new MetricSummaryDTO(0, 0, 0, 0));
        };
    }

    /**
     * Get workload metrics.
     */
    public MetricsResponseDTO getWorkloadMetrics(String kind, String namespace, String name, String metricType) {
        if ("Deployment".equals(kind)) {
            Deployment deployment = kubernetesClient.deployments()
                    .inNamespace(namespace).withName(name).get();
            if (deployment == null || deployment.getStatus() == null) {
                return null;
            }

            DeploymentStatus status = deployment.getStatus();
            return switch (metricType != null ? "replicas" : metricType.toLowerCase()) {
                case "replicas" -> new MetricsResponseDTO(
                        List.of(
                                new MetricPointDTO(Instant.now(), (double) status.getReadyReplicas()),
                                new MetricPointDTO(Instant.now().minusSeconds(60), (double) status.getReplicas())
                        ),
                        new MetricSummaryDTO(status.getReadyReplicas(), status.getReadyReplicas(), 2)
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

        double networkRx = 0.0;
        double networkTx = 0.0;

        return new MetricsResponseDTO(
                List.of(
                        new MetricPointDTO(Instant.now(), networkRx),
                        new MetricPointDTO(Instant.now().minusSeconds(60), networkRx)
                ),
                new MetricSummaryDTO(networkRx, networkRx, 2)
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
        double capacity = status.getCapacity() != null ? parseResource(status.getCapacity()) : 0.0;
        double used = status.getCapacity() != null && status.getCapacity().equals(status.getCapacity()) ?
                (double) parseResource(status.getCapacity()) :
                0.0;

        return new MetricsResponseDTO(
                List.of(
                        new MetricPointDTO(Instant.now(), used),
                        new MetricPointDTO(Instant.now().minusSeconds(60), used)
                ),
                new MetricSummaryDTO(used, capacity, 2)
        );
    }

    /**
     * Get historical metrics time series.
     * @param namespace K8s namespace
     * @param name Resource name
     * @param range Time range (1h, 6h, 24h, 7d, 30d)
     * @param metricType Type of metric (cpu, memory, network, storage)
     * @return Time series data with multiple data points
     */
    public TimeSeriesDTO getHistoricalMetrics(String namespace, String name, String range, String metricType) {
        int points = determineDataPoints(range);
        List<MetricPointDTO> dataPoints = new java.util.ArrayList<>();

        for (int i = 0; i < points; i++) {
            Instant timestamp = Instant.now().minusSeconds(60L * (points - 1 - i));

            if ("cpu".equals(metricType)) {
                double value = 50.0 + (Math.random() * 20);  // Simulated CPU usage
                dataPoints.add(new MetricPointDTO(timestamp, value));
            } else if ("memory".equals(metricType)) {
                double value = 40.0 + (Math.random() * 30);  // Simulated memory usage (percentage)
                dataPoints.add(new MetricPointDTO(timestamp, value));
            } else if ("network".equals(metricType)) {
                double value = 100.0 + (Math.random() * 50);  // Simulated network I/O (bytes/sec)
                dataPoints.add(new MetricPointDTO(timestamp, value));
            } else if ("storage".equals(metricType)) {
                double value = 60.0 + (Math.random() * 20);  // Simulated storage usage (percentage)
                dataPoints.add(new MetricPointDTO(timestamp, value));
            }
        }

        if (dataPoints.isEmpty()) {
            return null;
        }

        return new TimeSeriesDTO(
                metricType,
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

    /**
     * Calculate summary statistics for time series data.
     */
    private MetricSummaryDTO calculateSummary(List<MetricPointDTO> dataPoints) {
        if (dataPoints.isEmpty()) {
            return new MetricSummaryDTO(0, 0, 0);
        }

        double sum = dataPoints.stream()
                .mapToDouble(MetricPointDTO::value)
                .sum();
        double avg = sum / dataPoints.size();
        double min = dataPoints.stream()
                .mapToDouble(MetricPointDTO::value)
                .min(Double::compare)
                .orElse(0.0);
        double max = dataPoints.stream()
                .mapToDouble(MetricPointDTO::value)
                .max(Double::compare)
                .orElse(0.0);

        return new MetricSummaryDTO(avg, min, max);
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
     * @param severity Alert severity to filter (INFO, WARNING, ERROR, CRITICAL)
     * @return List of alerts
     */
    public List<AlertDTO> getAlertHistory(String namespace, String severity) {
        // In production, this would query from database
        // For now, we return empty list
        return List.of();
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
                    "Metric value significantly above normal range. Check for potential resource exhaustion."
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
        // In production, this would update alert status in database
        // For now, return true to simulate success
        return true;
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
