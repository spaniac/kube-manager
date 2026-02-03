package com.k8smanager.dto;

/**
 * Base DTO for all Kubernetes resources.
 */
public record K8sResourceDTO(
        String kind,
        String apiVersion,
        ObjectMetadataDTO metadata
) {
}
