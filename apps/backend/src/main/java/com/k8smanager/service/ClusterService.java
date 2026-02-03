package com.k8smanager.service;

import com.k8smanager.dto.*;
import io.fabric8.kubernetes.api.model.*;
import io.fabric8.kubernetes.client.KubernetesClient;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;
import java.util.Map;

/**
 * Service for cluster information retrieval.
 */
@Service
public class ClusterService {

    private final KubernetesClient kubernetesClient;

    public ClusterService(KubernetesClient kubernetesClient) {
        this.kubernetesClient = kubernetesClient;
    }

    /**
     * Cordon a node (unschedulable).
     */
    public void cordonNode(String nodeName) {
        Node node = kubernetesClient.nodes().withName(nodeName).get();
        if (node != null) {
            node.getSpec().setUnschedulable(true);
            kubernetesClient.nodes().resource(node).replace();
        }
    }

    /**
     * Uncordon a node (schedulable).
     */
    public void uncordonNode(String nodeName) {
        Node node = kubernetesClient.nodes().withName(nodeName).get();
        if (node != null) {
            node.getSpec().setUnschedulable(false);
            kubernetesClient.nodes().resource(node).replace();
        }
    }

    /**
     * Drain a node (evict all pods).
     */
    public void drainNode(String nodeName) {
        NodeList nodeList = kubernetesClient.nodes().list();
        Node targetNode = nodeList.getItems().stream()
                .filter(n -> n.getMetadata().getName().equals(nodeName))
                .findFirst()
                .orElse(null);

        if (targetNode == null) {
            return;
        }

        PodList podList = kubernetesClient.pods().list();
        podList.getItems().stream()
                .filter(pod -> pod.getSpec().getNodeName() != null
                        && pod.getSpec().getNodeName().equals(nodeName))
                .filter(pod -> !pod.getSpec().get nodeName().equals("kube-system"))
                .filter(pod -> !isDaemonSet(pod))
                .forEach(pod -> {
                    try {
                        kubernetesClient.pods().resource(pod).delete();
                    } catch (Exception e) {
                        // Continue with other pods
                    }
                });
    }

    private boolean isDaemonSet(Pod pod) {
        return pod.getMetadata().getOwnerReferences() != null
                && pod.getMetadata().getOwnerReferences().stream()
                .anyMatch(ref -> "DaemonSet".equals(ref.getKind()));
    }

    /**
     * Get cluster health status.
     */
    public ClusterHealthDTO getClusterHealth() {
        NodeList nodeList = kubernetesClient.nodes().list();
        PodList podList = kubernetesClient.pods().list();

        long totalNodes = nodeList.getItems().size();
        long readyNodes = nodeList.getItems().stream()
                .filter(this::isNodeReady)
                .count();

        long totalPods = podList.getItems().size();
        long runningPods = podList.getItems().stream()
                .filter(pod -> "Running".equals(pod.getStatus().getPhase()))
                .count();

        long failedPods = podList.getItems().stream()
                .filter(pod -> !"Running".equals(pod.getStatus().getPhase())
                && !"Pending".equals(pod.getStatus().getPhase()))
                .count();

        return new ClusterHealthDTO(
                totalNodes == readyNodes ? "Healthy" : "Degraded",
                totalNodes,
                readyNodes,
                totalPods,
                runningPods,
                failedPods,
                Instant.now().toEpochMilli()
        );
    }

    /**
     * Get cluster resource usage summary.
     */
    public ClusterResourceUsageDTO getResourceUsage() {
        NodeList nodeList = kubernetesClient.nodes().list();
        PodList podList = kubernetesClient.pods().list();

        double totalCpu = 0;
        double usedCpu = 0;
        long totalMemory = 0;
        long usedMemory = 0;

        for (Node node : nodeList.getItems()) {
            NodeStatus status = node.getStatus();
            Map<String, Quantity> capacity = status.getCapacity();
            Map<String, Quantity> allocatable = status.getAllocatable();

            totalCpu += parseQuantity(capacity.get("cpu"));
            usedCpu += parseQuantity(capacity.get("cpu")) - parseQuantity(allocatable.get("cpu"));
            totalMemory += parseQuantityBytes(capacity.get("memory"));
            usedMemory += parseQuantityBytes(capacity.get("memory")) - parseQuantityBytes(allocatable.get("memory"));
        }

        double cpuUsagePercent = (usedCpu / totalCpu) * 100;
        double memoryUsagePercent = ((double) usedMemory / totalMemory) * 100;

        return new ClusterResourceUsageDTO(
                totalCpu + " cores",
                usedCpu + " cores",
                cpuUsagePercent,
                formatBytes(totalMemory),
                formatBytes(usedMemory),
                memoryUsagePercent,
                podList.getItems().size()
        );
    }

    /**
     * Get cluster events with filtering.
     */
    public List<EventDTO> getClusterEvents(String type, String namespace) {
        EventList eventList;

        if (namespace != null && !namespace.isEmpty()) {
            eventList = kubernetesClient.events().inNamespace(namespace).list();
        } else {
            eventList = kubernetesClient.events().inAnyNamespace().list();
        }

        return eventList.getItems().stream()
                .filter(event -> type == null || type.isEmpty() || event.getType().equals(type))
                .map(event -> new EventDTO(
                        event.getType(),
                        event.getReason(),
                        event.getMessage(),
                        event.getLastTimestamp().toEpochMilli(),
                        event.getCount() != null ? event.getCount() : 1,
                        event.getReportingComponent() != null ? event.getReportingComponent() : "system"
                ))
                .toList();
    }

    /**
     * Get cluster metrics history.
     */
    public ClusterMetricsHistoryDTO getMetricsHistory(String metricType, long sinceTimestamp) {
        // TODO: Implement actual metrics history from Prometheus
        List<MetricPointDTO> mockMetrics = List.of(
                new MetricPointDTO(Instant.now().minusSeconds(300).toEpochMilli(), 50),
                new MetricPointDTO(Instant.now().minusSeconds(240).toEpochMilli(), 55),
                new MetricPointDTO(Instant.now().minusSeconds(180).toEpochMilli(), 45),
                new MetricPointDTO(Instant.now().minusSeconds(120).toEpochMilli(), 60),
                new MetricPointDTO(Instant.now().minusSeconds(60).toEpochMilli(), 52)
        );

        return new ClusterMetricsHistoryDTO(
                metricType,
                mockMetrics,
                mockMetrics.stream().mapToDouble(MetricPointDTO::value).average(),
                mockMetrics.stream().mapToDouble(MetricPointDTO::value).max(),
                mockMetrics.stream().mapToDouble(MetricPointDTO::value).min()
        );
    }

    /**
     * Get cluster overview information.
     */
    public ClusterInfoDTO getClusterInfo() {
        // Get cluster version
        VersionInfo version = kubernetesClient.getKubernetesVersion();
        String platform = getPlatformInfo();

        // Get cluster metrics
        ClusterMetricsDTO metrics = getClusterMetrics();

        // Get cluster name from config or use default
        String clusterName = getClusterName();

        return new ClusterInfoDTO(
                clusterName,
                version.getGitVersion(),
                platform,
                version.getPlatform(),
                metrics
        );
    }

    /**
     * Get all nodes in the cluster.
     */
    public List<NodeInfoDTO> getNodes() {
        NodeList nodeList = kubernetesClient.nodes().list();

        return nodeList.getItems().stream()
                .map(this::mapToNodeInfoDTO)
                .toList();
    }

    /**
     * Get node by name.
     */
    public NodeInfoDTO getNode(String nodeName) {
        Node node = kubernetesClient.nodes().withName(nodeName).get();
        return mapToNodeInfoDTO(node);
    }

    /**
     * Get cluster metrics.
     */
    private ClusterMetricsDTO getClusterMetrics() {
        NodeList nodeList = kubernetesClient.nodes().list();
        PodList podList = kubernetesClient.pods().list();

        int totalNodes = nodeList.getItems().size();
        int readyNodes = (int) nodeList.getItems().stream()
                .filter(node -> isNodeReady(node))
                .count();

        int totalPods = podList.getItems().size();
        int runningPods = (int) podList.getItems().stream()
                .filter(pod -> isPodRunning(pod))
                .count();

        // Get cluster capacity (sum of all nodes)
        String cpuCapacity = formatCpu(nodeList);
        String memoryCapacity = formatMemory(nodeList);
        String storageCapacity = formatStorage(nodeList);

        return new ClusterMetricsDTO(
                totalNodes,
                readyNodes,
                totalPods,
                runningPods,
                cpuCapacity,
                memoryCapacity,
                storageCapacity
        );
    }

    /**
     * Check if node is ready.
     */
    private boolean isNodeReady(Node node) {
        return node.getStatus() != null
                && node.getStatus().getConditions() != null
                && node.getStatus().getConditions().stream()
                .anyMatch(condition -> "Ready".equals(condition.getType())
                        && "True".equals(condition.getStatus()));
    }

    /**
     * Check if pod is running.
     */
    private boolean isPodRunning(Pod pod) {
        return "Running".equals(pod.getStatus().getPhase());
    }

    /**
     * Map Node to NodeInfoDTO.
     */
    private NodeInfoDTO mapToNodeInfoDTO(Node node) {
        NodeStatus status = node.getStatus();
        NodeSpec spec = node.getSpec();

        String nodeStatus = isNodeReady(node) ? "Ready" : "NotReady";

        return new NodeInfoDTO(
                node.getMetadata().getName(),
                nodeStatus,
                status.getNodeInfo().getKubeletVersion(),
                status.getNodeInfo().getOsImage(),
                status.getNodeInfo().getArchitecture(),
                status.getNodeInfo().getKernelVersion(),
                mapToNodeCapacityDTO(status.getCapacity()),
                mapToNodeAllocatableDTO(status.getAllocatable()),
                spec.getTaints() != null ? spec.getTaints().stream()
                        .map(taint -> taint.getKey() + "=" + taint.getValue()).toList() : List.of(),
                node.getMetadata().getLabels() != null
                        ? node.getMetadata().getLabels().entrySet().stream()
                        .map(e -> e.getKey() + "=" + e.getValue()).toList() : List.of()
        );
    }

    private NodeCapacityDTO mapToNodeCapacityDTO(Map<String, Quantity> capacity) {
        return new NodeCapacityDTO(
                quantityToString(capacity.get("cpu")),
                quantityToString(capacity.get("memory")),
                quantityToString(capacity.get("pods")),
                quantityToString(capacity.get("ephemeral-storage"))
        );
    }

    private NodeAllocatableDTO mapToNodeAllocatableDTO(Map<String, Quantity> allocatable) {
        return new NodeAllocatableDTO(
                quantityToString(allocatable.get("cpu")),
                quantityToString(allocatable.get("memory")),
                quantityToString(allocatable.get("pods")),
                quantityToString(allocatable.get("ephemeral-storage"))
        );
    }

    /**
     * Get cluster name.
     */
    private String getClusterName() {
        // Try to get from config map or use default
        ConfigMap configMap = kubernetesClient.configMaps()
                .inNamespace("kube-system")
                .withName("cluster-info")
                .get();
        if (configMap != null && configMap.getData() != null) {
            return configMap.getData().get("name");
        }
        return "kubernetes-cluster";
    }

    /**
     * Get platform info.
     */
    private String getPlatformInfo() {
        try {
            Node node = kubernetesClient.nodes().list().getItems().get(0);
            return node.getStatus().getNodeInfo().getOsImage();
        } catch (Exception e) {
            return "Unknown";
        }
    }

    /**
     * Format CPU capacity.
     */
    private String formatCpu(NodeList nodeList) {
        return nodeList.getItems().stream()
                .map(node -> node.getStatus().getCapacity().get("cpu"))
                .mapToDouble(this::parseQuantity)
                .sum() + " cores";
    }

    /**
     * Format memory capacity.
     */
    private String formatMemory(NodeList nodeList) {
        long totalBytes = nodeList.getItems().stream()
                .map(node -> node.getStatus().getCapacity().get("memory"))
                .mapToLong(this::parseQuantityBytes)
                .sum();
        return formatBytes(totalBytes);
    }

    /**
     * Format storage capacity.
     */
    private String formatStorage(NodeList nodeList) {
        long totalBytes = nodeList.getItems().stream()
                .map(node -> node.getStatus().getCapacity().get("ephemeral-storage"))
                .mapToLong(this::parseQuantityBytes)
                .sum();
        return formatBytes(totalBytes);
    }

    private double parseQuantity(Quantity q) {
        return Double.parseDouble(q.getAmount());
    }

    private long parseQuantityBytes(Quantity q) {
        String amount = q.getAmount();
        String format = q.getFormat();
        if (format == null || format.isEmpty()) {
            return Long.parseLong(amount);
        }
        return switch (format) {
            case "Ki" -> Long.parseLong(amount) * 1024;
            case "Mi" -> Long.parseLong(amount) * 1024 * 1024;
            case "Gi" -> Long.parseLong(amount) * 1024 * 1024 * 1024;
            case "Ti" -> Long.parseLong(amount) * 1024L * 1024 * 1024 * 1024;
            default -> Long.parseLong(amount);
        };
    }

    private String quantityToString(Quantity q) {
        return q != null ? q.toString() : "0";
    }

    private String formatBytes(long bytes) {
        if (bytes < 1024) return bytes + " B";
        if (bytes < 1024 * 1024) return String.format("%.2f KiB", bytes / 1024.0);
        if (bytes < 1024L * 1024 * 1024) return String.format("%.2f MiB", bytes / (1024.0 * 1024));
        return String.format("%.2f GiB", bytes / (1024.0 * 1024 * 1024));
    }
}
