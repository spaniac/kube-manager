package com.k8smanager.controller;

import com.k8smanager.common.response.ApiResponse;
import com.k8smanager.service.ResourceService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

/**
 * Controller for generic resource management.
 */
@RestController
@RequestMapping("/resources")
@Tag(name = "Resource Visualization", description = "Generic resource operations for pods, deployments, services, configmaps, secrets")
@SecurityRequirement(name = "Bearer Token")
public class ResourceController {

    private final ResourceService resourceService;

    public ResourceController(ResourceService resourceService) {
        this.resourceService = resourceService;
    }

    /**
     * Generic list resources.
     * GET /api/v1/resources/{type}
     */
    @Operation(summary = "List resources by type", description = "Retrieve generic resources by type with optional filtering and sorting")
    @ApiResponses({
        @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "Resources listed successfully"),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "401", description = "Unauthorized - Invalid or missing token"),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "500", description = "Internal server error")
    })
    @GetMapping("/{type}")
    @PreAuthorize("hasAnyAuthority('READ', 'POD')")
    public ResponseEntity<ApiResponse<?>> listResources(
            @Parameter(description = "Resource type (pods, deployments, services, configmaps, secrets)", example = "deployments", required = true)
            @PathVariable String type,
            @Parameter(description = "Filter by namespace", example = "default")
            @RequestParam(required = false) String namespace,
            @Parameter(description = "Label selector for filtering resources", example = "app=nginx")
            @RequestParam(required = false) String labelSelector,
            @Parameter(description = "Sort field", example = "name")
            @RequestParam(required = false) String sortField,
            @Parameter(description = "Sort order (asc, desc)", example = "asc")
            @RequestParam(required = false) String sortOrder) {
        Object result = resourceService.listResources(type, namespace, labelSelector, sortField, sortOrder);
        return ResponseEntity.ok(ApiResponse.success(result));
    }

    /**
     * Generic get resource.
     * GET /api/v1/resources/{type}/{name}
     */
    @Operation(summary = "Get resource by type and name", description = "Retrieve detailed information about a specific resource")
    @ApiResponses({
        @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "Resource retrieved successfully"),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "401", description = "Unauthorized - Invalid or missing token"),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "404", description = "Resource not found"),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "500", description = "Internal server error")
    })
    @GetMapping("/{type}/{name}")
    @PreAuthorize("hasAnyAuthority('READ', 'POD')")
    public ResponseEntity<ApiResponse<?>> getResource(
            @Parameter(description = "Resource type (pods, deployments, services, configmaps, secrets)", example = "deployments", required = true)
            @PathVariable String type,
            @Parameter(description = "Resource name", example = "nginx-deployment", required = true)
            @PathVariable String name,
            @Parameter(description = "Filter by namespace", example = "default")
            @RequestParam(required = false) String namespace) {
        Object result = resourceService.getResource(type, namespace, name);
        if (result == null) {
            return ResponseEntity.status(404).body(ApiResponse.error("Resource not found"));
        }
        return ResponseEntity.ok(ApiResponse.success(result));
    }

    /**
     * Generic update resource.
     * PUT /api/v1/resources/{type}/{name}
     */
    @Operation(summary = "Update resource", description = "Update a resource by type and name")
    @ApiResponses({
        @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "Resource updated successfully"),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "400", description = "Bad request - Invalid input"),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "401", description = "Unauthorized - Invalid or missing token"),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "404", description = "Resource not found"),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "500", description = "Internal server error")
    })
    @PutMapping("/{type}/{name}")
    @PreAuthorize("hasAnyAuthority('WRITE', 'POD')")
    public ResponseEntity<ApiResponse<?>> updateResource(
            @Parameter(description = "Resource type (pods, deployments, services, configmaps, secrets)", example = "deployments", required = true)
            @PathVariable String type,
            @Parameter(description = "Resource name", example = "nginx-deployment", required = true)
            @PathVariable String name,
            @Parameter(description = "Filter by namespace", example = "default")
            @RequestParam(required = false) String namespace,
            @io.swagger.v3.oas.annotations.parameters.RequestBody(description = "Resource update payload")
            @RequestBody Object resource) {
        Object result = resourceService.updateResource(type, namespace, name, resource);
        if (result == null) {
            return ResponseEntity.status(404).body(ApiResponse.error("Resource not found"));
        }
        return ResponseEntity.ok(ApiResponse.success(result));
    }

    /**
     * Generic delete resource.
     * DELETE /api/v1/resources/{type}/{name}
     */
    @Operation(summary = "Delete resource", description = "Delete a resource by type and name")
    @ApiResponses({
        @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "Resource deleted successfully"),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "401", description = "Unauthorized - Invalid or missing token"),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "500", description = "Internal server error")
    })
    @DeleteMapping("/{type}/{name}")
    @PreAuthorize("hasAnyAuthority('DELETE', 'POD')")
    public ResponseEntity<ApiResponse<Void>> deleteResource(
            @Parameter(description = "Resource type (pods, deployments, services, configmaps, secrets)", example = "deployments", required = true)
            @PathVariable String type,
            @Parameter(description = "Resource name", example = "nginx-deployment", required = true)
            @PathVariable String name,
            @Parameter(description = "Filter by namespace", example = "default")
            @RequestParam(required = false) String namespace) {
        resourceService.deleteResource(type, namespace, name);
        return ResponseEntity.ok(ApiResponse.success(null, "Resource deleted successfully"));
    }

    /**
     * Get status badge for a resource.
     * GET /api/v1/resources/{type}/{name}/status-badge
     */
    @Operation(summary = "Get resource status badge", description = "Retrieve status badge for UI display")
    @ApiResponses({
        @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "Status badge retrieved successfully"),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "401", description = "Unauthorized - Invalid or missing token"),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "404", description = "Resource not found"),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "500", description = "Internal server error")
    })
    @GetMapping("/{type}/{name}/status-badge")
    @PreAuthorize("hasAnyAuthority('READ', 'POD')")
    public ResponseEntity<ApiResponse<?>> getStatusBadge(
            @Parameter(description = "Resource type (pods, deployments, services, configmaps, secrets)", example = "deployments", required = true)
            @PathVariable String type,
            @Parameter(description = "Resource name", example = "nginx-deployment", required = true)
            @PathVariable String name,
            @Parameter(description = "Filter by namespace", example = "default")
            @RequestParam(required = false) String namespace) {
        Object statusBadge = resourceService.getStatusBadge(type, namespace, name);
        if (statusBadge == null) {
            return ResponseEntity.status(404).body(ApiResponse.error("Resource not found"));
        }
        return ResponseEntity.ok(ApiResponse.success(statusBadge));
    }
}
