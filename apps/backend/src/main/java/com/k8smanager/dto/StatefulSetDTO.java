package com.k8smanager.dto;

public record StatefulSetDTO(
        String name,
        String namespace,
        int replicas,
        int readyReplicas,
        String serviceName,
        PodTemplateDTO template
) {
}
