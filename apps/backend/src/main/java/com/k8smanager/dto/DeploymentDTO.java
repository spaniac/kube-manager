package com.k8smanager.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

@Schema(description = "Kubernetes deployment managing replicated pods")
public record DeploymentDTO(
                @Schema(description = "Name of the deployment", example = "nginx-deployment", required = true)
                @NotBlank String name,
                @Schema(description = "Namespace where deployment is located", example = "default", required = true)
                @NotBlank String namespace,
                @Schema(description = "Desired number of replicas", example = "3")
                @Min(0) int replicas,
                @Schema(description = "Number of replicas with all containers ready", example = "3")
                int readyReplicas,
                @Schema(description = "Number of replicas available for serving traffic", example = "3")
                int availableReplicas,
                @Schema(description = "Number of replicas updated to the latest pod template", example = "3")
                int updatedReplicas,
                @Schema(description = "Deployment strategy type (RollingUpdate, Recreate)", example = "RollingUpdate")
                String strategy,
                @Schema(description = "Label selector for pods managed by this deployment", example = "app=nginx")
                String selector,
                @Schema(description = "Pod template specification", required = true)
                @NotNull PodTemplateDTO template) {
}
