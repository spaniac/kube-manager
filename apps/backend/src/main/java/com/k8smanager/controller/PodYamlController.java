package com.k8smanager.controller;

import com.k8smanager.common.response.ApiResponse;
import com.k8smanager.dto.PodDTO;
import com.k8smanager.service.PodYamlService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

/**
 * Controller for pod YAML display.
 */
@RestController
@RequestMapping("/pods")
public class PodYamlController {

    private final PodYamlService podYamlService;

    public PodYamlController(PodYamlService podYamlService) {
        this.podYamlService = podYamlService;
    }

    /**
     * Get pod as YAML.
     * GET /api/v1/pods/{namespace}/{name}/yaml
     */
    @GetMapping("/{namespace}/{name}/yaml")
    @PreAuthorize("hasAuthority('READ', 'POD')")
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
}
