package com.k8smanager.service;

import com.k8smanager.dto.NamespaceDTO;
import com.k8smanager.dto.NamespaceRequestDTO;
import com.k8smanager.dto.ResourceQuotaDTO;
import com.k8smanager.rbac.RbacService;
import io.fabric8.kubernetes.api.model.Namespace;
import io.fabric8.kubernetes.api.model.ObjectMeta;
import io.fabric8.kubernetes.api.model.Quantity;
import io.fabric8.kubernetes.client.KubernetesClient;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

/**
 * Service for namespace management.
 */
@Service
public class NamespaceService {

    private final KubernetesClient kubernetesClient;
    private final RbacService rbacService;

    public NamespaceService(KubernetesClient kubernetesClient, RbacService rbacService) {
        this.kubernetesClient = kubernetesClient;
        this.rbacService = rbacService;
    }

    /**
     * Get all namespaces.
     */
    public List<NamespaceDTO> getNamespaces() {
        return kubernetesClient.namespaces().list().getItems().stream()
                .map(this::mapToNamespaceDto)
                .toList();
    }

    /**
     * Get namespace by name.
     */
    public NamespaceDTO getNamespace(String namespaceName) {
        Namespace namespace = kubernetesClient.namespaces()
                .withName(namespaceName).get();
        if (namespace == null) {
            return null;
        }

        return mapToNamespaceDto(namespace);
    }

    /**
     * Create namespace.
     */
    public NamespaceDTO createNamespace(NamespaceRequestDTO request) {
        Namespace namespace = new Namespace();
        ObjectMeta metadata = new ObjectMeta();
        metadata.setName(request.name());
        if (request.labels() != null) {
            metadata.setLabels(request.labels());
        }
        if (request.annotations() != null) {
            metadata.setAnnotations(request.annotations());
        }
        namespace.setMetadata(metadata);

        Namespace created = kubernetesClient.namespaces().resource(namespace).create();
        return mapToNamespaceDto(created);
    }

    /**
     * Update namespace.
     */
    public NamespaceDTO updateNamespace(String namespaceName, NamespaceRequestDTO request) {
        Namespace namespace = kubernetesClient.namespaces()
                .withName(namespaceName).get();

        if (namespace == null) {
            return null;
        }

        if (request.labels() != null) {
            namespace.getMetadata().setLabels(request.labels());
        }
        if (request.annotations() != null) {
            namespace.getMetadata().setAnnotations(request.annotations());
        }

        Namespace updated = kubernetesClient.namespaces().resource(namespace).replace();
        return mapToNamespaceDto(updated);
    }

    /**
     * Delete namespace.
     */
    public void deleteNamespace(String namespaceName) {
        Namespace namespace = kubernetesClient.namespaces()
                .withName(namespaceName).get();

        if (namespace != null) {
            kubernetesClient.namespaces().resource(namespace).delete();
        }
    }

    /**
     * Get namespace quota.
     */
    public ResourceQuotaDTO getNamespaceQuota(String namespaceName) {
        io.fabric8.kubernetes.api.model.ResourceQuota quota =
                kubernetesClient.resourceQuotas()
                        .inNamespace(namespaceName)
                        .list()
                        .getItems()
                        .stream()
                        .findFirst()
                        .orElse(null);

        if (quota == null) {
            return null;
        }

        Map<String, Quantity> usedMap = quota.getStatus() != null
                ? quota.getStatus().getUsed()
                : Map.of();
        Map<String, Quantity> hardMap = quota.getSpec() != null
                ? quota.getSpec().getHard()
                : Map.of();

        // Convert Map<String, Quantity> to Map<String, String>
        Map<String, String> used = usedMap.entrySet().stream()
                .collect(Collectors.toMap(Map.Entry::getKey, e -> e.getValue().toString()));
        Map<String, String> hard = hardMap.entrySet().stream()
                .collect(Collectors.toMap(Map.Entry::getKey, e -> e.getValue().toString()));

        return new ResourceQuotaDTO(
                quota.getMetadata().getName(),
                quota.getMetadata().getNamespace(),
                hard,
                used
        );
    }

    /**
     * Search/filter namespaces.
     */
    public List<NamespaceDTO> searchNamespaces(String query) {
        return getNamespaces().stream()
                .filter(ns -> query == null || query.isEmpty()
                        || ns.name().toLowerCase().contains(query.toLowerCase()))
                .toList();
    }

    private NamespaceDTO mapToNamespaceDto(Namespace namespace) {
        String timestamp = namespace.getMetadata().getCreationTimestamp();
        String creationTimestamp = timestamp != null ? timestamp : "";

        return new NamespaceDTO(
                namespace.getMetadata().getName(),
                namespace.getStatus() != null ? namespace.getStatus().getPhase() : "Active",
                creationTimestamp,
                namespace.getMetadata().getLabels(),
                namespace.getMetadata().getAnnotations()
        );
    }
}
