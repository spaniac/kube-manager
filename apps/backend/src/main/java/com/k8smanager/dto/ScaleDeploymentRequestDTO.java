package com.k8smanager.dto;

/**
 * Request DTO for scaling a deployment.
 */
public record ScaleDeploymentRequestDTO(
        int replicas
) {
}
