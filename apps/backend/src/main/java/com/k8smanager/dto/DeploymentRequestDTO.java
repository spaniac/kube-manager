package com.k8smanager.dto;

import java.util.List;
import java.util.Map;

/**
 * Request DTO for creating/updating a deployment.
 */
public record DeploymentRequestDTO(
        String name,
        String namespace,
        List<PodContainerRequestDTO> containers,
        int replicas,
        Map<String, String> labels,
        Map<String, String> annotations,
        DeploymentStrategyDTO strategy
) {
}
