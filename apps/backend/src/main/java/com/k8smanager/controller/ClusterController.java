package com.k8smanager.controller;

import com.k8smanager.common.response.ApiResponse;
import com.k8smanager.dto.*;
import com.k8smanager.rbac.RbacService;
import com.k8smanager.service.ClusterService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Controller for cluster management.
 */
@RestController
@RequestMapping("/cluster")
@Tag(name = "Cluster Management", description = "Cluster overview, nodes, health, events, and resource usage")
@SecurityRequirement(name = "Bearer Token")
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
    @Operation(summary = "Get cluster overview", description = "Retrieve basic cluster information including name, version, platform, and metrics")
    @ApiResponses({
        @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "Cluster information retrieved successfully"),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "401", description = "Unauthorized - Invalid or missing token"),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "500", description = "Internal server error")
    })
    @GetMapping
    @PreAuthorize("hasAnyAuthority('READ', 'POD')")
    public ApiResponse<ClusterInfoDTO> getCluster() {
        return ApiResponse.success(clusterService.getClusterInfo());
    }

    /**
     * Get all nodes.
     * GET /api/v1/cluster/nodes
     */
    @Operation(summary = "Get all nodes", description = "Retrieve list of all nodes in the cluster with their status and capacity")
    @ApiResponses({
        @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "List of nodes retrieved successfully"),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "401", description = "Unauthorized - Invalid or missing token"),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "500", description = "Internal server error")
    })
    @GetMapping("/nodes")
    @PreAuthorize("hasAnyAuthority('READ', 'POD')")
    public ApiResponse<List<NodeInfoDTO>> getNodes() {
        return ApiResponse.success(clusterService.getNodes());
    }

    /**
     * Get node by name.
     * GET /api/v1/cluster/nodes/{name}
     */
    @Operation(summary = "Get node by name", description = "Retrieve detailed information about a specific node")
    @ApiResponses({
        @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "Node information retrieved successfully"),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "401", description = "Unauthorized - Invalid or missing token"),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "404", description = "Node not found"),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "500", description = "Internal server error")
    })
    @GetMapping("/nodes/{name}")
    @PreAuthorize("hasAnyAuthority('READ', 'POD')")
    public ApiResponse<NodeInfoDTO> getNode(
            @Parameter(description = "Name of the node", example = "worker-1", required = true)
            @PathVariable String name) {
        return ApiResponse.success(clusterService.getNode(name));
    }

    /**
     * Cordon a node.
     * POST /api/v1/cluster/nodes/{name}/cordon
     */
    @Operation(summary = "Cordon a node", description = "Mark a node as unschedulable, preventing new pods from being placed on it")
    @ApiResponses({
        @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "Node cordoned successfully"),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "401", description = "Unauthorized - Invalid or missing token"),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "404", description = "Node not found"),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "500", description = "Internal server error")
    })
    @PostMapping("/nodes/{name}/cordon")
    @PreAuthorize("hasAnyAuthority('WRITE', 'POD')")
    public ApiResponse<Void> cordonNode(
            @Parameter(description = "Name of the node to cordon", example = "worker-1", required = true)
            @PathVariable String name) {
        clusterService.cordonNode(name);
        return ApiResponse.success(null, "Node cordoned successfully");
    }

    /**
     * Uncordon a node.
     * POST /api/v1/cluster/nodes/{name}/uncordon
     */
    @Operation(summary = "Uncordon a node", description = "Mark a node as schedulable again, allowing new pods to be placed on it")
    @ApiResponses({
        @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "Node uncordoned successfully"),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "401", description = "Unauthorized - Invalid or missing token"),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "404", description = "Node not found"),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "500", description = "Internal server error")
    })
    @PostMapping("/nodes/{name}/uncordon")
    @PreAuthorize("hasAnyAuthority('WRITE', 'POD')")
    public ApiResponse<Void> uncordonNode(
            @Parameter(description = "Name of the node to uncordon", example = "worker-1", required = true)
            @PathVariable String name) {
        clusterService.uncordonNode(name);
        return ApiResponse.success(null, "Node uncordoned successfully");
    }

    /**
     * Drain a node.
     * POST /api/v1/cluster/nodes/{name}/drain
     */
    @Operation(summary = "Drain a node", description = "Safely evict all pods from a node and mark it as unschedulable")
    @ApiResponses({
        @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "Node drained successfully"),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "401", description = "Unauthorized - Invalid or missing token"),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "404", description = "Node not found"),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "500", description = "Internal server error")
    })
    @PostMapping("/nodes/{name}/drain")
    @PreAuthorize("hasAnyAuthority('WRITE', 'POD')")
    public ApiResponse<Void> drainNode(
            @Parameter(description = "Name of the node to drain", example = "worker-1", required = true)
            @PathVariable String name) {
        clusterService.drainNode(name);
        return ApiResponse.success(null, "Node drained successfully");
    }

    /**
     * Get cluster health.
     * GET /api/v1/cluster/health
     */
    @Operation(summary = "Get cluster health", description = "Retrieve overall cluster health status and component information")
    @ApiResponses({
        @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "Cluster health retrieved successfully"),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "401", description = "Unauthorized - Invalid or missing token"),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "500", description = "Internal server error")
    })
    @GetMapping("/health")
    @PreAuthorize("hasAnyAuthority('READ', 'POD')")
    public ApiResponse<ClusterHealthDTO> getClusterHealth() {
        return ApiResponse.success(clusterService.getClusterHealth());
    }

    /**
     * Get cluster resource usage.
     * GET /api/v1/cluster/usage
     */
    @Operation(summary = "Get cluster resource usage", description = "Retrieve current CPU and memory usage statistics across the cluster")
    @ApiResponses({
        @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "Resource usage retrieved successfully"),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "401", description = "Unauthorized - Invalid or missing token"),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "500", description = "Internal server error")
    })
    @GetMapping("/usage")
    @PreAuthorize("hasAnyAuthority('READ', 'POD')")
    public ApiResponse<ClusterResourceUsageDTO> getClusterUsage() {
        return ApiResponse.success(clusterService.getResourceUsage());
    }

    /**
     * Get cluster events.
     * GET /api/v1/cluster/events
     */
    @Operation(summary = "Get cluster events", description = "Retrieve cluster events with optional filtering by type and namespace")
    @ApiResponses({
        @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "Events retrieved successfully"),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "401", description = "Unauthorized - Invalid or missing token"),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "500", description = "Internal server error")
    })
    @GetMapping("/events")
    @PreAuthorize("hasAnyAuthority('READ', 'POD')")
    public ApiResponse<List<EventDTO>> getClusterEvents(
            @Parameter(description = "Filter events by type (Normal, Warning)", example = "Normal")
            @RequestParam(required = false) String type,
            @Parameter(description = "Filter events by namespace", example = "default")
            @RequestParam(required = false) String namespace) {
        return ApiResponse.success(clusterService.getClusterEvents(type, namespace));
    }

    /**
     * Get cluster metrics history.
     * GET /api/v1/cluster/metrics
     */
    @Operation(summary = "Get cluster metrics history", description = "Retrieve historical metrics data for the cluster")
    @ApiResponses({
        @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "Metrics history retrieved successfully"),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "401", description = "Unauthorized - Invalid or missing token"),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "500", description = "Internal server error")
    })
    @GetMapping("/metrics")
    @PreAuthorize("hasAnyAuthority('READ', 'POD')")
    public ApiResponse<ClusterMetricsHistoryDTO> getClusterMetricsHistory(
            @Parameter(description = "Type of metric to retrieve (cpu, memory, storage)", example = "cpu")
            @RequestParam(defaultValue = "cpu") String metricType,
            @Parameter(description = "Retrieve metrics since this timestamp (milliseconds since epoch)", example = "1704326400000")
            @RequestParam(required = false) Long since) {
        return ApiResponse.success(clusterService.getMetricsHistory(metricType, since != null ? since : 0));
    }
}
