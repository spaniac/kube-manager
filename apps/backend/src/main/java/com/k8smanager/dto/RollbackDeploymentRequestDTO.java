package com.k8smanager.dto;

/**
 * Request DTO for rolling back a deployment.
 */
public record RollbackDeploymentRequestDTO(
        long revision
) {
}
