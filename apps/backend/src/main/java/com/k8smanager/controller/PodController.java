package com.k8smanager.controller;

import com.k8smanager.common.response.ApiResponse;
import com.k8smanager.dto.*;
import com.k8smanager.service.*;
import io.fabric8.kubernetes.api.model.Pod;
import io.fabric8.kubernetes.client.KubernetesClient;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Controller for pod management.
 */
@RestController
@RequestMapping("/pods")
public class PodController {

    private final PodService podService;
    private final EventService eventService;
    private final PodYamlService podYamlService;
    private final ResourceService resourceService;
    private final WorkloadService workloadService;
    private final KubernetesClient kubernetesClient;

    public PodController(PodService podService,
                        EventService eventService,
                        PodYamlService podYamlService,
                        ResourceService resourceService,
                        WorkloadService workloadService,
                        KubernetesClient kubernetesClient) {
        this.podService = podService;
        this.eventService = eventService;
        this.podYamlService = podYamlService;
        this.resourceService = resourceService;
        this.workloadService = workloadService;
        this.kubernetesClient = kubernetesClient;
    }

    /**
     * List pods.
     * GET /api/v1/pods
     */
    @GetMapping
    @PreAuthorize("hasAuthority('READ', 'POD')")
    public ApiResponse<List<PodDTO>> listPods(
            @RequestParam(required = false) String namespace,
            @RequestParam(required = false) String labelSelector) {
        List<PodDTO> pods = podService.listPods(namespace, labelSelector);
        return ApiResponse.success(pods);
    }

    /**
     * Get pod details with containers.
     * GET /api/v1/pods/{namespace}/{name}
     */
    @GetMapping("/{namespace}/{name}")
    @PreAuthorize("hasAuthority('READ', 'POD')")
    public ApiResponse<PodDTO> getPod(
            @PathVariable String namespace,
            @PathVariable String name) {
        PodDTO pod = podService.getPod(namespace, name);
        if (pod == null) {
            return ApiResponse.error("Pod not found");
        }
        return ApiResponse.success(pod);
    }

    /**
     * Delete pod.
     * DELETE /api/v1/pods/{namespace}/{name}
     */
    @DeleteMapping("/{namespace}/{name}")
    @PreAuthorize("hasAuthority('DELETE', 'POD')")
    public ApiResponse<Void> deletePod(
            @PathVariable String namespace,
            @PathVariable String name) {
        resourceService.deleteResource("pods", namespace, name);
        return ApiResponse.success(null, "Pod deleted successfully");
    }

    /**
     * Get pod events.
     * GET /api/v1/pods/{namespace}/{name}/events
     */
    @GetMapping("/{namespace}/{name}/events")
    @PreAuthorize("hasAuthority('READ', 'POD')")
    public ApiResponse<List<EventDTO>> getPodEvents(
            @PathVariable String namespace,
            @PathVariable String name) {
        return ApiResponse.success(eventService.getPodEvents(namespace, name));
    }

    /**
     * Get pod YAML.
     * GET /api/v1/pods/{namespace}/{name}/yaml
     */
    @GetMapping("/{namespace}/{name}/yaml")
    @PreAuthorize("hasAuthority('READ', 'POD')")
    public ApiResponse<String> getPodYaml(
            @PathVariable String namespace,
            @PathVariable String name) {
        String yaml = podYamlService.getPodAsYaml(namespace, name);
        if (yaml == null) {
            return ApiResponse.error("Pod not found");
        }
        return ApiResponse.success(yaml);
    }

    /**
     * Get related resources for pod.
     * GET /api/v1/pods/{namespace}/{name}/related
     */
    @GetMapping("/{namespace}/{name}/related")
    @PreAuthorize("hasAuthority('READ', 'POD')")
    public ApiResponse<RelatedResourcesDTO> getRelatedResources(
            @PathVariable String namespace,
            @PathVariable String name) {
        Pod pod = kubernetesClient.pods()
                .inNamespace(namespace)
                .withName(name)
                .get();

        if (pod == null) {
            return ApiResponse.error("Pod not found");
        }

        String ownerUid = pod.getMetadata().getUid();
        String ownerName = pod.getMetadata().getName();

        String deployments = kubernetesClient.deployments()
                .inNamespace(namespace)
                .list().getItems().stream()
                .filter(d -> d.getMetadata().getOwnerReferences() != null
                        && d.getMetadata().getOwnerReferences().stream()
                        .anyMatch(ref -> ref.getUid().equals(ownerUid)))
                .map(d -> d.getMetadata().getName())
                .toList()
                .toString();

        String statefulSets = kubernetesClient.statefulSets()
                .inNamespace(namespace)
                .list().getItems().stream()
                .filter(s -> s.getMetadata().getOwnerReferences() != null
                        && s.getMetadata().getOwnerReferences().stream()
                        .anyMatch(ref -> ref.getUid().equals(ownerUid)))
                .map(s -> s.getMetadata().getName())
                .toList()
                .toString();

        String daemonSets = kubernetesClient.daemonSets()
                .inNamespace(namespace)
                .list().getItems().stream()
                .filter(d -> d.getMetadata().getOwnerReferences() != null
                        && d.getMetadata().getOwnerReferences().stream()
                        .anyMatch(ref -> ref.getUid().equals(ownerUid)))
                .map(d -> d.getMetadata().getName())
                .toList()
                .toString();

        String services = kubernetesClient.services()
                .inNamespace(namespace)
                .list().getItems().stream()
                .filter(s -> s.getSpec() != null && s.getSpec().getSelector() != null
                        && s.getSpec().getSelector().getMatchLabels() != null
                        && s.getSpec().getSelector().getMatchLabels().entrySet().stream()
                        .anyMatch(entry -> entry.getValue().equals(ownerName)))
                .map(s -> s.getMetadata().getName())
                .toList()
                .toString();

        String configMaps = kubernetesClient.configMaps()
                .inNamespace(namespace)
                .list().getItems().stream()
                .filter(cm -> cm.getMetadata().getOwnerReferences() != null
                        && cm.getMetadata().getOwnerReferences().stream()
                        .anyMatch(ref -> ref.getUid().equals(ownerUid)))
                .map(cm -> cm.getMetadata().getName())
                .toList()
                .toString();

        String secrets = kubernetesClient.secrets()
                .inNamespace(namespace)
                .list().getItems().stream()
                .filter(s -> s.getMetadata().getOwnerReferences() != null
                        && s.getMetadata().getOwnerReferences().stream()
                        .anyMatch(ref -> ref.getUid().equals(ownerUid)))
                .map(s -> s.getMetadata().getName())
                .toList()
                .toString();

        String podDisruptionBudgets = "";
        String podDisruptionBudgetsDescription = "";

        return ApiResponse.success(new RelatedResourcesDTO(
                deployments,
                statefulSets,
                daemonSets,
                services,
                configMaps,
                secrets,
                podDisruptionBudgets
        ));
    }

    /**
     * Get pod logs.
     * GET /api/v1/pods/{namespace}/{name}/logs
     */
    @GetMapping("/{namespace}/{name}/logs")
    @PreAuthorize("hasAuthority('LOGS', 'POD')")
    public ApiResponse<String> getPodLogs(
            @PathVariable String namespace,
            @PathVariable String name,
            @RequestParam(required = false) String container,
            @RequestParam(defaultValue = "false") boolean previous,
            @RequestParam(defaultValue = "100") int tailLines) {
        Pod pod = kubernetesClient.pods()
                .inNamespace(namespace)
                .withName(name)
                .get();

        if (pod == null) {
            return ApiResponse.error("Pod not found");
        }

        return ApiResponse.success("Logs not yet implemented - use SSE streaming");
    }
}


    /**
     * List pods.
     * GET /api/v1/pods
     */
    @GetMapping
    @PreAuthorize("hasAuthority('READ', 'POD')")
    public ApiResponse<List<PodDTO>> listPods(
            @RequestParam(required = false) String namespace,
            @RequestParam(required = false) String labelSelector) {
        List<PodDTO> pods = podService.listPods(namespace, labelSelector);
        return ApiResponse.success(pods);
    }

    /**
     * Get pod details with containers.
     * GET /api/v1/pods/{namespace}/{name}
     */
    @GetMapping("/{namespace}/{name}")
    @PreAuthorize("hasAuthority('READ', 'POD')")
    public ApiResponse<PodDTO> getPod(
            @PathVariable String namespace,
            @PathVariable String name) {
        PodDTO pod = podService.getPod(namespace, name);
        if (pod == null) {
            return ApiResponse.error("Pod not found");
        }
        return ApiResponse.success(pod);
    }

    /**
     * Delete pod.
     * DELETE /api/v1/pods/{namespace}/{name}
     */
    @DeleteMapping("/{namespace}/{name}")
    @PreAuthorize("hasAuthority('DELETE', 'POD')")
    public ApiResponse<Void> deletePod(
            @PathVariable String namespace,
            @PathVariable String name) {
        resourceService.deleteResource("pods", namespace, name);
        return ApiResponse.success(null, "Pod deleted successfully");
    }

    /**
     * Get pod events.
     * GET /api/v1/pods/{namespace}/{name}/events
     */
    @GetMapping("/{namespace}/{name}/events")
    @PreAuthorize("hasAuthority('READ', 'POD')")
    public ApiResponse<List<com.k8smanager.dto.EventDTO>> getPodEvents(
            @PathVariable String namespace,
            @PathVariable String name) {
        return ApiResponse.success(eventService.getPodEvents(namespace, name));
    }

    /**
     * Get pod logs.
     * GET /api/v1/pods/{namespace}/{name}/logs
     */
    @GetMapping("/{namespace}/{name}/logs")
    @PreAuthorize("hasAuthority('LOGS', 'POD')")
    public ApiResponse<String> getPodLogs(
            @PathVariable String namespace,
            @PathVariable String name,
            @RequestParam(required = false) String container,
            @RequestParam(defaultValue = "false") boolean previous,
            @RequestParam(defaultValue = "100") int tailLines) {
        Pod pod = kubernetesClient.pods()
                .inNamespace(namespace)
                .withName(name)
                .get();

        if (pod == null) {
            return ApiResponse.error("Pod not found");
        }

        // TODO: Implement log streaming
        String logs = "Logs not yet implemented";
        return ApiResponse.success(logs);
    }

    /**
     * Get pod YAML.
     * GET /api/v1/pods/{namespace}/{name}/yaml
     */
    @GetMapping("/{namespace}/{name}/yaml")
    @PreAuthorize("hasAuthority('READ', 'POD')")
    public ApiResponse<String> getPodYaml(
            @PathVariable String namespace,
            @PathVariable String name) {
        String yaml = podYamlService.getPodAsYaml(namespace, name);
        if (yaml == null) {
            return ApiResponse.error("Pod not found");
        }
        return ApiResponse.success(yaml);
    }

    /**
     * Get related resources for pod.
     * GET /api/v1/pods/{namespace}/{name}/related
     */
    @GetMapping("/{namespace}/{name}/related")
    @PreAuthorize("hasAuthority('READ', 'POD')")
    public ApiResponse<RelatedResourcesDTO> getRelatedResources(
            @PathVariable String namespace,
            @PathVariable String name) {
        // Get pod to find owner
        Pod pod = kubernetesClient.pods()
                .inNamespace(namespace)
                .withName(name)
                .get();

        if (pod == null) {
            return ApiResponse.error("Pod not found");
        }

        String ownerUid = pod.getMetadata().getUid();
        String ownerName = pod.getMetadata().getName();

        // Find related resources by owner reference
        String relatedResources = "";
        return ApiResponse.success(new RelatedResourcesDTO(
                relatedResources,
                "Resources owned by " + ownerName + " (" + ownerUid + ")"
        ));
    }
}
