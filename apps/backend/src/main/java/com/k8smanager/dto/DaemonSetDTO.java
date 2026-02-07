package com.k8smanager.dto;

public record DaemonSetDTO(
        String name,
        String namespace,
        int desiredNumberScheduled,
        int currentNumberScheduled,
        int numberReady,
        String selector,
        PodTemplateDTO template
) {
}
