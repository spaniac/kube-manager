package com.k8smanager.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record DeploymentDTO(
                @NotBlank String name,
                @NotBlank String namespace,
                @Min(0) int replicas,
                int readyReplicas,
                int availableReplicas,
                int updatedReplicas,
                String strategy,
                String selector,
                @NotNull PodTemplateDTO template) {
}
