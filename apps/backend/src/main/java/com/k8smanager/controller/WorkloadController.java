package com.k8smanager.controller;

import com.k8smanager.common.response.ApiResponse;
import com.k8smanager.dto.*;
import com.k8smanager.service.WorkloadService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

/**
 * Controller for workload management.
 */
@RestController
@Tag(name = "Workload Management", description = "Deployments, StatefulSets, DaemonSets, Jobs, and CronJobs")
@SecurityRequirement(name = "Bearer Token")
public class WorkloadController {

    private final WorkloadService workloadService;

    public WorkloadController(WorkloadService workloadService) {
        this.workloadService = workloadService;
    }

    /**
     * List deployments.
     * GET /api/v1/workloads/deployments
     */
    @GetMapping("/deployments")
    @PreAuthorize("hasAnyAuthority('READ', 'DEPLOYMENT')")
    public ResponseEntity<ApiResponse<ResourceListDTO<DeploymentDTO>>> listDeployments(
            @RequestParam(required = false) String namespace,
            @RequestParam(required = false) String search) {
        ResourceListDTO<DeploymentDTO> deployments = workloadService.listDeployments(namespace, search);
        return ResponseEntity.ok(ApiResponse.success(deployments));
    }

    /**
     * Get deployment details.
     * GET /api/v1/workloads/deployments/{namespace}/{name}
     */
    @GetMapping("/deployments/{namespace}/{name}")
    @PreAuthorize("hasAnyAuthority('READ', 'DEPLOYMENT')")
    public ResponseEntity<ApiResponse<DeploymentDTO>> getDeployment(
            @PathVariable String namespace,
            @PathVariable String name) {
        DeploymentDTO deployment = workloadService.getDeployment(namespace, name);
        if (deployment == null) {
            return ResponseEntity.status(404).body(ApiResponse.error("Deployment not found"));
        }
        return ResponseEntity.ok(ApiResponse.success(deployment));
    }

    /**
     * Delete deployment.
     * DELETE /api/v1/workloads/deployments/{namespace}/{name}
     */
    @DeleteMapping("/deployments/{namespace}/{name}")
    @PreAuthorize("hasAnyAuthority('DELETE', 'DEPLOYMENT')")
    public ResponseEntity<ApiResponse<Void>> deleteDeployment(
            @PathVariable String namespace,
            @PathVariable String name) {
        boolean deleted = workloadService.deleteDeployment(namespace, name);
        if (!deleted) {
            return ResponseEntity.status(404).body(ApiResponse.error("Deployment not found"));
        }
        return ResponseEntity.ok(ApiResponse.success(null, "Deployment deleted successfully"));
    }

    /**
     * Scale deployment.
     * PUT /api/v1/workloads/deployments/{name}/scale
     */
    @PutMapping("/deployments/{namespace}/{name}/scale")
    @PreAuthorize("hasAnyAuthority('WRITE', 'DEPLOYMENT')")
    public ResponseEntity<ApiResponse<DeploymentDTO>> scaleDeployment(
            @PathVariable String namespace,
            @PathVariable String name,
            @RequestBody ScaleDeploymentRequestDTO request) {
        DeploymentDTO deployment = workloadService.scaleDeployment(namespace, name, request.replicas());
        if (deployment == null) {
            return ResponseEntity.status(404).body(ApiResponse.error("Deployment not found"));
        }
        return ResponseEntity.ok(ApiResponse.success(deployment));
    }

    /**
     * Restart deployment.
     * POST /api/v1/workloads/deployments/{namespace}/{name}/restart
     */
    @PostMapping("/deployments/{namespace}/{name}/restart")
    @PreAuthorize("hasAnyAuthority('WRITE', 'DEPLOYMENT')")
    public ResponseEntity<ApiResponse<DeploymentDTO>> restartDeployment(
            @PathVariable String namespace,
            @PathVariable String name) {
        DeploymentDTO deployment = workloadService.restartDeployment(namespace, name);
        if (deployment == null) {
            return ResponseEntity.status(404).body(ApiResponse.error("Deployment not found"));
        }
        return ResponseEntity.ok(ApiResponse.success(deployment));
    }

    /**
     * Update deployment image.
     * PUT /api/v1/workloads/deployments/{namespace}/{name}/image
     */
    @PutMapping("/deployments/{namespace}/{name}/image")
    @PreAuthorize("hasAnyAuthority('WRITE', 'DEPLOYMENT')")
    public ResponseEntity<ApiResponse<DeploymentDTO>> updateDeploymentImage(
            @PathVariable String namespace,
            @PathVariable String name,
            @RequestBody Map<String, String> request) {
        String image = request.get("image");
        if (image == null || image.isEmpty()) {
            return ResponseEntity.badRequest().body(ApiResponse.error("Image is required"));
        }
        DeploymentDTO deployment = workloadService.updateDeploymentImage(namespace, name, image);
        if (deployment == null) {
            return ResponseEntity.status(404).body(ApiResponse.error("Deployment not found"));
        }
        return ResponseEntity.ok(ApiResponse.success(deployment));
    }

    /**
     * Rollback deployment.
     * POST /api/v1/workloads/deployments/{namespace}/{name}/rollback
     */
    @PostMapping("/deployments/{namespace}/{name}/rollback")
    @PreAuthorize("hasAnyAuthority('WRITE', 'DEPLOYMENT')")
    public ResponseEntity<ApiResponse<DeploymentDTO>> rollbackDeployment(
            @PathVariable String namespace,
            @PathVariable String name,
            @RequestBody RollbackDeploymentRequestDTO request) {
        DeploymentDTO deployment = workloadService.rollbackDeployment(namespace, name, request.revision());
        if (deployment == null) {
            return ResponseEntity.status(404).body(ApiResponse.error("Deployment not found"));
        }
        return ResponseEntity.ok(ApiResponse.success(deployment));
    }

    /**
     * Get deployment revision history.
     * GET /api/v1/workloads/deployments/{namespace}/{name}/revisions
     */
    @GetMapping("/deployments/{namespace}/{name}/revisions")
    @PreAuthorize("hasAnyAuthority('READ', 'DEPLOYMENT')")
    public ResponseEntity<ApiResponse<List<DeploymentRevisionDTO>>> getDeploymentRevisions(
            @PathVariable String namespace,
            @PathVariable String name) {
        List<DeploymentRevisionDTO> revisions = workloadService.getDeploymentRevisions(namespace, name);
        return ResponseEntity.ok(ApiResponse.success(revisions));
    }

    /**
     * Create job.
     * POST /api/v1/workloads/jobs
     */
    @PostMapping("/jobs")
    @PreAuthorize("hasAnyAuthority('WRITE', 'DEPLOYMENT')")
    public ResponseEntity<ApiResponse<JobDTO>> createJob(
            @RequestBody JobRequestDTO request) {
        String namespace = request.namespace();
        if (namespace == null || namespace.isEmpty()) {
            namespace = "default";
        }
        JobDTO job = workloadService.createJob(namespace, request);
        return ResponseEntity.ok(ApiResponse.success(job));
    }

    /**
     * Create cron job.
     * POST /api/v1/workloads/cronjobs
     */
    @PostMapping("/cronjobs")
    @PreAuthorize("hasAnyAuthority('WRITE', 'DEPLOYMENT')")
    public ResponseEntity<ApiResponse<CronJobDTO>> createCronJob(
            @RequestBody CronJobRequestDTO request) {
        String namespace = request.namespace();
        if (namespace == null || namespace.isEmpty()) {
            namespace = "default";
        }
        CronJobDTO cronJob = workloadService.createCronJob(namespace, request);
        return ResponseEntity.ok(ApiResponse.success(cronJob));
    }

    /**
     * Create workload from YAML.
     * POST /api/v1/workloads
     */
    @PostMapping("/workloads")
    @PreAuthorize("hasAnyAuthority('WRITE', 'DEPLOYMENT')")
    public ResponseEntity<ApiResponse<?>> createWorkloadFromYaml(
            @RequestBody WorkloadCreateFromYamlRequestDTO request) {
        try {
            Object result = workloadService.createWorkloadFromYaml(
                    request.namespace(),
                    request.yaml(),
                    request.dryRun());
            return ResponseEntity.ok(ApiResponse.success(result));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest()
                    .body(ApiResponse.error(e.getMessage()));
        }
    }

    /**
     * Update deployment strategy.
     * PUT /api/v1/workloads/deployments/{namespace}/{name}/strategy
     */
    @PutMapping("/deployments/{namespace}/{name}/strategy")
    @PreAuthorize("hasAnyAuthority('WRITE', 'DEPLOYMENT')")
    public ResponseEntity<ApiResponse<DeploymentDTO>> updateDeploymentStrategy(
            @PathVariable String namespace,
            @PathVariable String name,
            @RequestBody UpdateStrategyRequestDTO request) {
        DeploymentDTO deployment = workloadService.updateDeploymentStrategy(namespace, name, request);
        if (deployment == null) {
            return ResponseEntity.status(404).body(ApiResponse.error("Deployment not found"));
        }
        return ResponseEntity.ok(ApiResponse.success(deployment));
    }

    /**
     * Update container resources.
     * PUT /api/v1/workloads/deployments/{namespace}/{name}/resources
     */
    @PutMapping("/deployments/{namespace}/{name}/resources")
    @PreAuthorize("hasAnyAuthority('WRITE', 'DEPLOYMENT')")
    public ResponseEntity<ApiResponse<DeploymentDTO>> updateContainerResources(
            @PathVariable String namespace,
            @PathVariable String name,
            @RequestBody UpdateContainerResourcesRequestDTO request) {
        DeploymentDTO deployment = workloadService.updateContainerResources(
                namespace, name, request.containerName(), request.resources());
        if (deployment == null) {
            return ResponseEntity.status(404).body(ApiResponse.error("Deployment or container not found"));
        }
        return ResponseEntity.ok(ApiResponse.success(deployment));
    }

    /**
     * Create PodDisruptionBudget.
     * POST /api/v1/workloads/poddisruptionbudgets
     */
    @PostMapping("/poddisruptionbudgets")
    @PreAuthorize("hasAnyAuthority('WRITE', 'DEPLOYMENT')")
    public ResponseEntity<ApiResponse<Object>> createPodDisruptionBudget(
            @RequestBody PodDisruptionBudgetRequestDTO request) {
        Object pdb = workloadService.createPodDisruptionBudget(request);
        return ResponseEntity.ok(ApiResponse.success(pdb));
    }

    /**
     * Get PodDisruptionBudget.
     * GET /api/v1/workloads/poddisruptionbudgets/{namespace}/{name}
     */
    @GetMapping("/poddisruptionbudgets/{namespace}/{name}")
    @PreAuthorize("hasAnyAuthority('READ', 'DEPLOYMENT')")
    public ResponseEntity<ApiResponse<Object>> getPodDisruptionBudget(
            @PathVariable String namespace,
            @PathVariable String name) {
        Object pdb = workloadService.getPodDisruptionBudget(namespace, name);
        if (pdb == null) {
            return ResponseEntity.status(404).body(ApiResponse.error("PodDisruptionBudget not found"));
        }
        return ResponseEntity.ok(ApiResponse.success(pdb));
    }

    /**
     * Delete PodDisruptionBudget.
     * DELETE /api/v1/workloads/poddisruptionbudgets/{namespace}/{name}
     */
    @DeleteMapping("/poddisruptionbudgets/{namespace}/{name}")
    @PreAuthorize("hasAnyAuthority('DELETE', 'DEPLOYMENT')")
    public ResponseEntity<ApiResponse<Void>> deletePodDisruptionBudget(
            @PathVariable String namespace,
            @PathVariable String name) {
        boolean deleted = workloadService.deletePodDisruptionBudget(namespace, name);
        if (!deleted) {
            return ResponseEntity.status(404).body(ApiResponse.error("PodDisruptionBudget not found"));
        }
        return ResponseEntity.ok(ApiResponse.success(null, "PodDisruptionBudget deleted successfully"));
    }

    /**
     * Update container environment variables.
     * PUT /api/v1/workloads/deployments/{namespace}/{name}/env
     */
    @PutMapping("/deployments/{namespace}/{name}/env")
    @PreAuthorize("hasAnyAuthority('WRITE', 'DEPLOYMENT')")
    public ResponseEntity<ApiResponse<DeploymentDTO>> updateContainerEnvVars(
            @PathVariable String namespace,
            @PathVariable String name,
            @RequestBody UpdateContainerEnvRequestDTO request) {
        DeploymentDTO deployment = workloadService.updateContainerEnvVars(
                namespace, name, request.containerName(), request.envVars());
        if (deployment == null) {
            return ResponseEntity.status(404).body(ApiResponse.error("Deployment or container not found"));
        }
        return ResponseEntity.ok(ApiResponse.success(deployment));
    }

    /**
     * Clone workload.
     * POST /api/v1/workloads/clone
     */
    @PostMapping("/workloads/clone")
    @PreAuthorize("hasAnyAuthority('WRITE', 'DEPLOYMENT')")
    public ResponseEntity<ApiResponse<?>> cloneWorkload(@RequestBody CloneWorkloadRequestDTO request) {
        try {
            Object result = workloadService.cloneWorkload(
                    request.sourceNamespace(),
                    request.sourceName(),
                    request.sourceKind(),
                    request.targetNamespace(),
                    request.targetName());
            return ResponseEntity.ok(ApiResponse.success(result));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest()
                    .body(ApiResponse.error(e.getMessage()));
        }
    }

    /**
     * Pause deployment.
     * POST /api/v1/workloads/deployments/{namespace}/{name}/pause
     */
    @PostMapping("/deployments/{namespace}/{name}/pause")
    @PreAuthorize("hasAnyAuthority('WRITE', 'DEPLOYMENT')")
    public ResponseEntity<ApiResponse<DeploymentDTO>> pauseDeployment(
            @PathVariable String namespace,
            @PathVariable String name) {
        DeploymentDTO deployment = workloadService.pauseDeployment(namespace, name);
        if (deployment == null) {
            return ResponseEntity.status(404).body(ApiResponse.error("Deployment not found"));
        }
        return ResponseEntity.ok(ApiResponse.success(deployment));
    }

    /**
     * Resume deployment.
     * POST /api/v1/workloads/deployments/{namespace}/{name}/resume
     */
    @PostMapping("/deployments/{namespace}/{name}/resume")
    @PreAuthorize("hasAnyAuthority('WRITE', 'DEPLOYMENT')")
    public ResponseEntity<ApiResponse<DeploymentDTO>> resumeDeployment(
            @PathVariable String namespace,
            @PathVariable String name) {
        DeploymentDTO deployment = workloadService.resumeDeployment(namespace, name);
        if (deployment == null) {
            return ResponseEntity.status(404).body(ApiResponse.error("Deployment not found"));
        }
        return ResponseEntity.ok(ApiResponse.success(deployment));
    }
}
