package com.k8smanager.controller;

import com.k8smanager.common.response.ApiResponse;
import com.k8smanager.dto.*;
import com.k8smanager.persistence.entity.Permission;
import com.k8smanager.service.NamespaceService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Controller for namespace management.
 */
@RestController
@RequestMapping("/namespaces")
public class NamespaceController {

    private final NamespaceService namespaceService;

    public NamespaceController(NamespaceService namespaceService) {
        this.namespaceService = namespaceService;
    }

    /**
     * List namespaces.
     * GET /api/v1/namespaces
     */
    @GetMapping
    @PreAuthorize("hasAuthority('READ', 'NAMESPACE')")
    public ResponseEntity<ApiResponse<List<NamespaceDTO>>> listNamespaces(
            @RequestParam(required = false) String query) {
        List<NamespaceDTO> namespaces = namespaceService.searchNamespaces(query);
        return ResponseEntity.ok(ApiResponse.success(namespaces));
    }

    /**
     * Get namespace details.
     * GET /api/v1/namespaces/{name}
     */
    @GetMapping("/{name}")
    @PreAuthorize("hasAuthority('READ', 'NAMESPACE')")
    public ResponseEntity<ApiResponse<NamespaceDTO>> getNamespace(@PathVariable String name) {
        NamespaceDTO namespace = namespaceService.getNamespace(name);
        if (namespace == null) {
            return ResponseEntity.status(404).body(
                    ApiResponse.error("Namespace not found"));
        }
        return ResponseEntity.ok(ApiResponse.success(namespace));
    }

    /**
     * Create namespace.
     * POST /api/v1/namespaces
     */
    @PostMapping
    @PreAuthorize("hasAuthority('WRITE', 'NAMESPACE')")
    public ResponseEntity<ApiResponse<NamespaceDTO>> createNamespace(
            @RequestBody NamespaceRequestDTO request) {
        try {
            NamespaceDTO namespace = namespaceService.createNamespace(request);
            return ResponseEntity.ok(ApiResponse.success(namespace));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(
                    ApiResponse.error("Failed to create namespace: " + e.getMessage()));
        }
    }

    /**
     * Update namespace.
     * PUT /api/v1/namespaces/{name}
     */
    @PutMapping("/{name}")
    @PreAuthorize("hasAuthority('WRITE', 'NAMESPACE')")
    public ResponseEntity<ApiResponse<NamespaceDTO>> updateNamespace(
            @PathVariable String name,
            @RequestBody NamespaceRequestDTO request) {
        try {
            NamespaceDTO namespace = namespaceService.updateNamespace(name, request);
            if (namespace == null) {
                return ResponseEntity.status(404).body(
                        ApiResponse.error("Namespace not found"));
            }
            return ResponseEntity.ok(ApiResponse.success(namespace));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(
                    ApiResponse.error("Failed to update namespace: " + e.getMessage()));
        }
    }

    /**
     * Delete namespace with protection.
     * DELETE /api/v1/namespaces/{name}
     */
    @DeleteMapping("/{name}")
    @PreAuthorize("hasAuthority('DELETE', 'NAMESPACE')")
    public ResponseEntity<ApiResponse<Void>> deleteNamespace(
            @PathVariable String name,
            @RequestParam(defaultValue = "false") boolean force,
            @RequestParam(defaultValue = "0") int gracePeriodSeconds) {
        try {
            namespaceService.deleteNamespace(name);
            return ResponseEntity.ok(ApiResponse.success(null, "Namespace deleted successfully"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(
                    ApiResponse.error("Failed to delete namespace: " + e.getMessage()));
        }
    }

    /**
     * Get namespace quota.
     * GET /api/v1/namespaces/{name}/quota
     */
    @GetMapping("/{name}/quota")
    @PreAuthorize("hasAuthority('READ', 'NAMESPACE')")
    public ResponseEntity<ApiResponse<ResourceQuotaDTO>> getNamespaceQuota(@PathVariable String name) {
        ResourceQuotaDTO quota = namespaceService.getNamespaceQuota(name);
        if (quota == null) {
            return ResponseEntity.status(404).body(
                    ApiResponse.error("Quota not found"));
        }
        return ResponseEntity.ok(ApiResponse.success(quota));
    }
}
