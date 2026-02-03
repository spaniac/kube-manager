package com.k8smanager.service;

import com.k8smanager.dto.*;
import com.k8smanager.persistence.entity.Permission;
import com.k8smanager.rbac.RbacService;
import io.fabric8.kubernetes.api.model.Namespace;
import io.fabric8.kubernetes.client.KubernetesClient;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

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
        NamespaceList list = kubernetesClient.namespaces().list();
        return list.getItems().stream()
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
        Namespace namespace = kubernetesClient.namespaces()
                .resource(new Namespace());

        namespace.getMetadata().setName(request.name());
        if (request.labels() != null) {
            namespace.getMetadata().setLabels(request.labels());
        }
        if (request.annotations() != null) {
            namespace.getMetadata().setAnnotations(request.annotations());
        }

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

        Map<String, String> used = quota.getStatus() != null
                ? quota.getStatus().getUsed()
                : Map.of();
        Map<String, String> hard = quota.getSpec() != null
                ? quota.getSpec().getHard()
                : Map.of();

        return new ResourceQuotaDTO(
                used.get("cpu"),
                hard.get("cpu"),
                used.get("memory"),
                hard.get("memory"),
                used.get("pods"),
                hard.get("pods")
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
        return new NamespaceDTO(
                namespace.getMetadata().getName(),
                namespace.getStatus() != null ? namespace.getStatus().getPhase() : "Active",
                namespace.getMetadata().getCreationTimestamp().toEpochMilli(),
                namespace.getMetadata().getLabels(),
                namespace.getMetadata().getAnnotations()
        );
    }
}
