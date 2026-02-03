package com.k8smanager.controller;

import com.k8smanager.common.response.ApiResponse;
import com.k8smanager.dto.*;
import com.k8smanager.rbac.RbacService;
import com.k8smanager.service.ClusterService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Controller for cluster management.
 */
@RestController
@RequestMapping("/cluster")
public class ClusterController {

    private final ClusterService clusterService;
    private final RbacService rbacService;

    public ClusterController(ClusterService clusterService, RbacService rbacService) {
        this.clusterService = clusterService;
        this.rbacService = rbacService;
    }

    /**
     * Get cluster overview.
     * GET /api/v1/cluster
     */
    @GetMapping
    @PreAuthorize("hasAnyAuthority('READ', 'POD')")
    public ApiResponse<ClusterInfoDTO> getCluster() {
        return ApiResponse.success(clusterService.getClusterInfo());
    }

    /**
     * Get all nodes.
     * GET /api/v1/cluster/nodes
     */
    @GetMapping("/nodes")
    @PreAuthorize("hasAnyAuthority('READ', 'POD')")
    public ApiResponse<List<NodeInfoDTO>> getNodes() {
        return ApiResponse.success(clusterService.getNodes());
    }

    /**
     * Get node by name.
     * GET /api/v1/cluster/nodes/{name}
     */
    @GetMapping("/nodes/{name}")
    @PreAuthorize("hasAnyAuthority('READ', 'POD')")
    public ApiResponse<NodeInfoDTO> getNode(@PathVariable String name) {
        return ApiResponse.success(clusterService.getNode(name));
    }

    /**
     * Cordon a node.
     * POST /api/v1/cluster/nodes/{name}/cordon
     */
    @PostMapping("/nodes/{name}/cordon")
    @PreAuthorize("hasAnyAuthority('WRITE', 'POD')")
    public ApiResponse<Void> cordonNode(@PathVariable String name) {
        clusterService.cordonNode(name);
        return ApiResponse.success(null, "Node cordoned successfully");
    }

    /**
     * Uncordon a node.
     * POST /api/v1/cluster/nodes/{name}/uncordon
     */
    @PostMapping("/nodes/{name}/uncordon")
    @PreAuthorize("hasAnyAuthority('WRITE', 'POD')")
    public ApiResponse<Void> uncordonNode(@PathVariable String name) {
        clusterService.uncordonNode(name);
        return ApiResponse.success(null, "Node uncordoned successfully");
    }

    /**
     * Drain a node.
     * POST /api/v1/cluster/nodes/{name}/drain
     */
    @PostMapping("/nodes/{name}/drain")
    @PreAuthorize("hasAnyAuthority('WRITE', 'POD')")
    public ApiResponse<Void> drainNode(@PathVariable String name) {
        clusterService.drainNode(name);
        return ApiResponse.success(null, "Node drained successfully");
    }

    /**
     * Get cluster health.
     * GET /api/v1/cluster/health
     */
    @GetMapping("/health")
    @PreAuthorize("hasAnyAuthority('READ', 'POD')")
    public ApiResponse<ClusterHealthDTO> getClusterHealth() {
        return ApiResponse.success(clusterService.getClusterHealth());
    }

    /**
     * Get cluster resource usage.
     * GET /api/v1/cluster/usage
     */
    @GetMapping("/usage")
    @PreAuthorize("hasAnyAuthority('READ', 'POD')")
    public ApiResponse<ClusterResourceUsageDTO> getClusterUsage() {
        return ApiResponse.success(clusterService.getResourceUsage());
    }

    /**
     * Get cluster events.
     * GET /api/v1/cluster/events
     */
    @GetMapping("/events")
    @PreAuthorize("hasAnyAuthority('READ', 'POD')")
    public ApiResponse<List<EventDTO>> getClusterEvents(
            @RequestParam(required = false) String type,
            @RequestParam(required = false) String namespace) {
        return ApiResponse.success(clusterService.getClusterEvents(type, namespace));
    }

    /**
     * Get cluster metrics history.
     * GET /api/v1/cluster/metrics
     */
    @GetMapping("/metrics")
    @PreAuthorize("hasAnyAuthority('READ', 'POD')")
    public ApiResponse<ClusterMetricsHistoryDTO> getClusterMetricsHistory(
            @RequestParam(defaultValue = "cpu") String metricType,
            @RequestParam(required = false) Long since) {
        return ApiResponse.success(clusterService.getMetricsHistory(metricType, since != null ? since : 0));
    }
}
