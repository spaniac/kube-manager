package com.k8smanager.controller;

import com.k8smanager.common.response.ApiResponse;
import com.k8smanager.dto.*;
import com.k8smanager.service.ResourceService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

/**
 * Controller for generic resource management.
 */
@RestController
@RequestMapping("/resources")
public class ResourceController {

    private final ResourceService resourceService;

    public ResourceController(ResourceService resourceService) {
        this.resourceService = resourceService;
    }

    /**
     * Generic list resources.
     * GET /api/v1/resources/{type}
     */
    @GetMapping("/{type}")
    @PreAuthorize("hasAuthority('READ', 'POD')")
    public ResponseEntity<ApiResponse<?>> listResources(
            @PathVariable String type,
            @RequestParam(required = false) String namespace,
            @RequestParam(required = false) String labelSelector,
            @RequestParam(required = false) String sortField,
            @RequestParam(required = false) String sortOrder) {
        Object result = resourceService.listResources(type, namespace, labelSelector, sortField, sortOrder);
        return ResponseEntity.ok(ApiResponse.success(result));
    }

    /**
     * Generic get resource.
     * GET /api/v1/resources/{type}/{name}
     */
    @GetMapping("/{type}/{name}")
    @PreAuthorize("hasAuthority('READ', 'POD')")
    public ResponseEntity<ApiResponse<?>> getResource(
            @PathVariable String type,
            @PathVariable String name,
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
    @PutMapping("/{type}/{name}")
    @PreAuthorize("hasAuthority('WRITE', 'POD')")
    public ResponseEntity<ApiResponse<?>> updateResource(
            @PathVariable String type,
            @PathVariable String name,
            @RequestParam(required = false) String namespace,
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
    @DeleteMapping("/{type}/{name}")
    @PreAuthorize("hasAuthority('DELETE', 'POD')")
    public ResponseEntity<ApiResponse<Void>> deleteResource(
            @PathVariable String type,
            @PathVariable String name,
            @RequestParam(required = false) String namespace) {
        resourceService.deleteResource(type, namespace, name);
        return ResponseEntity.ok(ApiResponse.success(null, "Resource deleted successfully"));
    }

    /**
     * Get status badge for a resource.
     * GET /api/v1/resources/{type}/{name}/status-badge
     */
    @GetMapping("/{type}/{name}/status-badge")
    @PreAuthorize("hasAuthority('READ', 'POD')")
    public ResponseEntity<ApiResponse<?>> getStatusBadge(
            @PathVariable String type,
            @PathVariable String name,
            @RequestParam(required = false) String namespace) {
        Object statusBadge = resourceService.getStatusBadge(type, namespace, name);
        if (statusBadge == null) {
            return ResponseEntity.status(404).body(ApiResponse.error("Resource not found"));
        }
        return ResponseEntity.ok(ApiResponse.success(statusBadge));
    }
}
