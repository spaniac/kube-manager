package com.k8smanager.service;

import com.k8smanager.dto.PodConditionDTO;
import com.k8smanager.dto.PodContainerDTO;
import com.k8smanager.dto.PodDTO;
import com.k8smanager.dto.ResourceRequirementsDTO;
import io.fabric8.kubernetes.api.model.*;
import io.fabric8.kubernetes.client.KubernetesClient;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Service for pod management.
 */
@Service
public class PodService {

    private final KubernetesClient kubernetesClient;

    public PodService(KubernetesClient kubernetesClient) {
        this.kubernetesClient = kubernetesClient;
    }

    /**
     * List pods.
     */
    public List<PodDTO> listPods(String namespace, String labelSelector) {
        PodList list;
        if (namespace != null && !namespace.isEmpty()) {
            list = kubernetesClient.pods().inNamespace(namespace).list();
        } else {
            list = kubernetesClient.pods().inAnyNamespace().list();
        }

        return list.getItems().stream()
                .map(this::mapToPodDto)
                .toList();
    }

    /**
     * Get pod by name.
     */
    public PodDTO getPod(String namespace, String podName) {
        Pod pod = kubernetesClient.pods()
                .inNamespace(namespace)
                .withName(podName)
                .get();
        return pod != null ? mapToPodDto(pod) : null;
    }

    private PodDTO mapToPodDto(Pod pod) {
        PodSpec spec = pod.getSpec();
        PodStatus status = pod.getStatus();

        return new PodDTO(
                pod.getMetadata().getName(),
                pod.getMetadata().getNamespace(),
                status != null ? status.getPhase() : "Unknown",
                status != null ? status.getPhase() : "Unknown",
                spec != null ? spec.getNodeName() : null,
                status != null ? status.getPodIP() : null,
                status != null ? status.getStartTime() : null,
                spec != null ? spec.getContainers().stream()
                        .map(this::mapToPodContainerDto)
                        .toList() : List.of(),
                status != null ? status.getConditions().stream()
                        .map(this::mapToPodConditionDto)
                        .toList() : List.of()
        );
    }

    private PodContainerDTO mapToPodContainerDto(Container container) {
        return new PodContainerDTO(
                container.getName(),
                container.getImage(),
                List.of(), // TODO: Map actual ports
                List.of(), // TODO: Map actual env vars
                new ResourceRequirementsDTO(null, null), // TODO: Map actual resources
                List.of() // TODO: Map actual volume mounts
        );
    }

    private PodConditionDTO mapToPodConditionDto(PodCondition condition) {
        return new PodConditionDTO(
                condition.getType(),
                condition.getStatus(),
                condition.getReason(),
                condition.getMessage(),
                condition.getLastTransitionTime() != null ? 0 : 0 // TODO: Parse timestamp properly
        );
    }
}
