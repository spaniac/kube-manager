package com.k8smanager.controller;

import com.k8smanager.common.response.ApiResponse;
import com.k8smanager.dto.K8sSchema;
import com.k8smanager.dto.YamlValidationRequestDTO;
import com.k8smanager.dto.YamlValidationResponseDTO;
import com.k8smanager.service.PodYamlService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

/**
 * Controller for pod YAML display.
 */
@RestController
@RequestMapping("/api/v1/yaml")
public class PodYamlController {

    private final PodYamlService podYamlService;

    public PodYamlController(PodYamlService podYamlService) {
        this.podYamlService = podYamlService;
    }

    /**
     * Get pod as YAML.
     * GET /api/v1/yaml/pods/{namespace}/{name}
     */
    @GetMapping("/pods/{namespace}/{name}")
    @PreAuthorize("hasAnyAuthority('READ', 'POD')")
    public ResponseEntity<ApiResponse<String>> getPodYaml(
            @PathVariable String namespace,
            @PathVariable String name) {
        String yaml = podYamlService.getPodAsYaml(namespace, name);
        if (yaml == null) {
            return ResponseEntity.status(404).body(
                    ApiResponse.error("Pod not found"));
        }
        return ResponseEntity.ok(ApiResponse.success(yaml));
    }

    /**
     * Validate YAML syntax and schema.
     * POST /api/v1/yaml/validate
     */
    @PostMapping("/validate")
    @PreAuthorize("hasAnyAuthority('READ', 'POD')")
    public ResponseEntity<ApiResponse<YamlValidationResponseDTO>> validateYaml(
            @Valid @RequestBody YamlValidationRequestDTO request) {
        YamlValidationResponseDTO response = podYamlService.validateYaml(request.getYaml());
        return ResponseEntity.ok(ApiResponse.success(response));
    }

    /**
     * Get available Kubernetes schemas.
     * GET /api/v1/yaml/schemas
     */
    @GetMapping("/schemas")
    @PreAuthorize("hasAnyAuthority('READ', 'POD')")
    public ResponseEntity<ApiResponse<Map<String, K8sSchema>>> getYamlSchemas() {
        Map<String, K8sSchema> schemas = podYamlService.getYamlSchemas();
        return ResponseEntity.ok(ApiResponse.success(schemas));
    }
}
