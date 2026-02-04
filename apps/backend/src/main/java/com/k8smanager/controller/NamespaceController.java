package com.k8smanager.controller;

import com.k8smanager.common.response.ApiResponse;
import com.k8smanager.dto.NamespaceDTO;
import com.k8smanager.dto.NamespaceRequestDTO;
import com.k8smanager.dto.ResourceQuotaDTO;
import com.k8smanager.service.NamespaceService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Controller for namespace management.
 */
@RestController
@RequestMapping("/namespaces")
@Tag(name = "Namespace Management", description = "Namespace CRUD operations and resource quota management")
@SecurityRequirement(name = "Bearer Token")
public class NamespaceController {

    private final NamespaceService namespaceService;

    public NamespaceController(NamespaceService namespaceService) {
        this.namespaceService = namespaceService;
    }

    /**
     * List namespaces.
     * GET /api/v1/namespaces
     */
    @Operation(summary = "List namespaces", description = "Retrieve all namespaces with optional search filter")
    @ApiResponses({
        @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "List of namespaces retrieved successfully"),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "401", description = "Unauthorized - Invalid or missing token"),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "500", description = "Internal server error")
    })
    @GetMapping
    @PreAuthorize("hasAnyAuthority('READ', 'NAMESPACE')")
    public ResponseEntity<ApiResponse<List<NamespaceDTO>>> listNamespaces(
            @Parameter(description = "Search query to filter namespaces by name", example = "prod")
            @RequestParam(required = false) String query) {
        List<NamespaceDTO> namespaces = namespaceService.searchNamespaces(query);
        return ResponseEntity.ok(ApiResponse.success(namespaces));
    }

    /**
     * Get namespace details.
     * GET /api/v1/namespaces/{name}
     */
    @Operation(summary = "Get namespace details", description = "Retrieve detailed information about a specific namespace")
    @ApiResponses({
        @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "Namespace details retrieved successfully"),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "401", description = "Unauthorized - Invalid or missing token"),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "404", description = "Namespace not found"),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "500", description = "Internal server error")
    })
    @GetMapping("/{name}")
    @PreAuthorize("hasAnyAuthority('READ', 'NAMESPACE')")
    public ResponseEntity<ApiResponse<NamespaceDTO>> getNamespace(
            @Parameter(description = "Name of the namespace", example = "production", required = true)
            @PathVariable String name) {
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
    @Operation(summary = "Create namespace", description = "Create a new namespace in the cluster")
    @ApiResponses({
        @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "Namespace created successfully"),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "400", description = "Bad request - Invalid input"),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "401", description = "Unauthorized - Invalid or missing token"),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "500", description = "Internal server error")
    })
    @PostMapping
    @PreAuthorize("hasAnyAuthority('WRITE', 'NAMESPACE')")
    public ResponseEntity<ApiResponse<NamespaceDTO>> createNamespace(
            @io.swagger.v3.oas.annotations.parameters.RequestBody(description = "Namespace creation request")
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
    @Operation(summary = "Update namespace", description = "Update labels and annotations of an existing namespace")
    @ApiResponses({
        @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "Namespace updated successfully"),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "400", description = "Bad request - Invalid input"),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "401", description = "Unauthorized - Invalid or missing token"),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "404", description = "Namespace not found"),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "500", description = "Internal server error")
    })
    @PutMapping("/{name}")
    @PreAuthorize("hasAnyAuthority('WRITE', 'NAMESPACE')")
    public ResponseEntity<ApiResponse<NamespaceDTO>> updateNamespace(
            @Parameter(description = "Name of the namespace to update", example = "production", required = true)
            @PathVariable String name,
            @io.swagger.v3.oas.annotations.parameters.RequestBody(description = "Namespace update request")
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
    @Operation(summary = "Delete namespace", description = "Delete a namespace with optional force and grace period settings")
    @ApiResponses({
        @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "Namespace deleted successfully"),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "400", description = "Bad request - Cannot delete namespace"),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "401", description = "Unauthorized - Invalid or missing token"),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "500", description = "Internal server error")
    })
    @DeleteMapping("/{name}")
    @PreAuthorize("hasAnyAuthority('DELETE', 'NAMESPACE')")
    public ResponseEntity<ApiResponse<Void>> deleteNamespace(
            @Parameter(description = "Name of the namespace to delete", example = "production", required = true)
            @PathVariable String name,
            @Parameter(description = "Force delete the namespace without waiting for finalization", example = "false")
            @RequestParam(defaultValue = "false") boolean force,
            @Parameter(description = "Grace period in seconds before terminating resources", example = "0")
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
    @Operation(summary = "Get namespace quota", description = "Retrieve resource quota information for a specific namespace")
    @ApiResponses({
        @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "Quota information retrieved successfully"),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "401", description = "Unauthorized - Invalid or missing token"),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "404", description = "Quota not found"),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "500", description = "Internal server error")
    })
    @GetMapping("/{name}/quota")
    @PreAuthorize("hasAnyAuthority('READ', 'NAMESPACE')")
    public ResponseEntity<ApiResponse<ResourceQuotaDTO>> getNamespaceQuota(
            @Parameter(description = "Name of the namespace", example = "production", required = true)
            @PathVariable String name) {
        ResourceQuotaDTO quota = namespaceService.getNamespaceQuota(name);
        if (quota == null) {
            return ResponseEntity.status(404).body(
                    ApiResponse.error("Quota not found"));
        }
        return ResponseEntity.ok(ApiResponse.success(quota));
    }
}
