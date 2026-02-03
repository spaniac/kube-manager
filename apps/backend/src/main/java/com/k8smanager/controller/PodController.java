package com.k8smanager.controller;

import com.k8smanager.common.response.ApiResponse;
import com.k8smanager.dto.EventDTO;
import com.k8smanager.dto.K8sResourceDTO;
import com.k8smanager.dto.ObjectMetadataDTO;
import com.k8smanager.dto.PodDTO;
import com.k8smanager.dto.RelatedResourcesDTO;
import com.k8smanager.service.*;
import io.fabric8.kubernetes.api.model.Pod;
import io.fabric8.kubernetes.client.KubernetesClient;
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
    @PreAuthorize("hasAnyAuthority('READ', 'POD')")
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
    @PreAuthorize("hasAnyAuthority('READ', 'POD')")
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
    @PreAuthorize("hasAnyAuthority('DELETE', 'POD')")
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
    @PreAuthorize("hasAnyAuthority('READ', 'POD')")
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
    @PreAuthorize("hasAnyAuthority('READ', 'POD')")
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
    @PreAuthorize("hasAnyAuthority('READ', 'POD')")
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

        List<K8sResourceDTO> resources = new java.util.ArrayList<>();

        // Add deployments
        kubernetesClient.apps().deployments()
                .inNamespace(namespace)
                .list().getItems().stream()
                .filter(d -> d.getMetadata().getOwnerReferences() != null
                        && d.getMetadata().getOwnerReferences().stream()
                        .anyMatch(ref -> ref.getUid().equals(ownerUid)))
                .forEach(d -> resources.add(new K8sResourceDTO(
                        "Deployment",
                        "apps/v1",
                        new ObjectMetadataDTO(
                                d.getMetadata().getName(),
                                d.getMetadata().getNamespace(),
                                d.getMetadata().getUid(),
                                d.getMetadata().getResourceVersion(),
                                d.getMetadata().getCreationTimestamp() != null ? java.time.Instant.parse(d.getMetadata().getCreationTimestamp()).toEpochMilli() : 0,
                                d.getMetadata().getLabels(),
                                d.getMetadata().getAnnotations()
                        )
                )));

        // Add stateful sets
        kubernetesClient.apps().statefulSets()
                .inNamespace(namespace)
                .list().getItems().stream()
                .filter(s -> s.getMetadata().getOwnerReferences() != null
                        && s.getMetadata().getOwnerReferences().stream()
                        .anyMatch(ref -> ref.getUid().equals(ownerUid)))
                .forEach(s -> resources.add(new K8sResourceDTO(
                        "StatefulSet",
                        "apps/v1",
                        new ObjectMetadataDTO(
                                s.getMetadata().getName(),
                                s.getMetadata().getNamespace(),
                                s.getMetadata().getUid(),
                                s.getMetadata().getResourceVersion(),
                                s.getMetadata().getCreationTimestamp() != null ? java.time.Instant.parse(s.getMetadata().getCreationTimestamp()).toEpochMilli() : 0,
                                s.getMetadata().getLabels(),
                                s.getMetadata().getAnnotations()
                        )
                )));

        // Add daemon sets
        kubernetesClient.apps().daemonSets()
                .inNamespace(namespace)
                .list().getItems().stream()
                .filter(ds -> ds.getMetadata().getOwnerReferences() != null
                        && ds.getMetadata().getOwnerReferences().stream()
                        .anyMatch(ref -> ref.getUid().equals(ownerUid)))
                .forEach(ds -> resources.add(new K8sResourceDTO(
                        "DaemonSet",
                        "apps/v1",
                        new ObjectMetadataDTO(
                                ds.getMetadata().getName(),
                                ds.getMetadata().getNamespace(),
                                ds.getMetadata().getUid(),
                                ds.getMetadata().getResourceVersion(),
                                ds.getMetadata().getCreationTimestamp() != null ? java.time.Instant.parse(ds.getMetadata().getCreationTimestamp()).toEpochMilli() : 0,
                                ds.getMetadata().getLabels(),
                                ds.getMetadata().getAnnotations()
                        )
                )));

        // Add services
        kubernetesClient.services()
                .inNamespace(namespace)
                .list().getItems().stream()
                .filter(s -> s.getSpec() != null && s.getSpec().getSelector() != null
                        && s.getSpec().getSelector().entrySet().stream()
                        .anyMatch(entry -> entry.getValue().equals(ownerName)))
                .forEach(s -> resources.add(new K8sResourceDTO(
                        "Service",
                        "v1",
                        new ObjectMetadataDTO(
                                s.getMetadata().getName(),
                                s.getMetadata().getNamespace(),
                                s.getMetadata().getUid(),
                                s.getMetadata().getResourceVersion(),
                                s.getMetadata().getCreationTimestamp() != null ? java.time.Instant.parse(s.getMetadata().getCreationTimestamp()).toEpochMilli() : 0,
                                s.getMetadata().getLabels(),
                                s.getMetadata().getAnnotations()
                        )
                )));

        // Add config maps
        kubernetesClient.configMaps()
                .inNamespace(namespace)
                .list().getItems().stream()
                .filter(cm -> cm.getMetadata().getOwnerReferences() != null
                        && cm.getMetadata().getOwnerReferences().stream()
                        .anyMatch(ref -> ref.getUid().equals(ownerUid)))
                .forEach(cm -> resources.add(new K8sResourceDTO(
                        "ConfigMap",
                        "v1",
                        new ObjectMetadataDTO(
                                cm.getMetadata().getName(),
                                cm.getMetadata().getNamespace(),
                                cm.getMetadata().getUid(),
                                cm.getMetadata().getResourceVersion(),
                                cm.getMetadata().getCreationTimestamp() != null ? java.time.Instant.parse(cm.getMetadata().getCreationTimestamp()).toEpochMilli() : 0,
                                cm.getMetadata().getLabels(),
                                cm.getMetadata().getAnnotations()
                        )
                )));

        // Add secrets
        kubernetesClient.secrets()
                .inNamespace(namespace)
                .list().getItems().stream()
                .filter(s -> s.getMetadata().getOwnerReferences() != null
                        && s.getMetadata().getOwnerReferences().stream()
                        .anyMatch(ref -> ref.getUid().equals(ownerUid)))
                .forEach(s -> resources.add(new K8sResourceDTO(
                        "Secret",
                        "v1",
                        new ObjectMetadataDTO(
                                s.getMetadata().getName(),
                                s.getMetadata().getNamespace(),
                                s.getMetadata().getUid(),
                                s.getMetadata().getResourceVersion(),
                                s.getMetadata().getCreationTimestamp() != null ? java.time.Instant.parse(s.getMetadata().getCreationTimestamp()).toEpochMilli() : 0,
                                s.getMetadata().getLabels(),
                                s.getMetadata().getAnnotations()
                        )
                )));

        return ApiResponse.success(new RelatedResourcesDTO(
                resources,
                "Related resources retrieved successfully",
                true
        ));
    }

    /**
     * Get pod logs.
     * GET /api/v1/pods/{namespace}/{name}/logs
     */
    @GetMapping("/{namespace}/{name}/logs")
    @PreAuthorize("hasAnyAuthority('LOGS', 'POD')")
    public ApiResponse<String> getPodLogs(
            @PathVariable String namespace,
            @PathVariable String name,
            @RequestParam(required = false) String container,
            @RequestParam(defaultValue = "false") boolean previous,
            @RequestParam(defaultValue = "100") int tailLines) {
        return ApiResponse.success("Logs not yet implemented - use SSE streaming");
    }
}
