package com.k8smanager.dto;

/**
 * Deployment revision DTO.
 */
public record DeploymentRevisionDTO(
        long revision,
        String revisionHistory,
        String changedBy,
        String changeType,
        String changeTime
) {
}
