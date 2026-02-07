package com.k8smanager.dto;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "Kubernetes StatefulSet for managing stateful applications")
public record StatefulSetDTO(
        @Schema(description = "Name of the StatefulSet", example = "mysql-statefulset")
        String name,
        @Schema(description = "Namespace where StatefulSet is located", example = "default")
        String namespace,
        @Schema(description = "Number of desired replicas", example = "3")
        int replicas,
        @Schema(description = "Number of replicas ready", example = "3")
        int readyReplicas,
        @Schema(description = "Name of the headless service for this StatefulSet", example = "mysql")
        String serviceName,
        @Schema(description = "Pod template specification")
        PodTemplateDTO template
) {
}
