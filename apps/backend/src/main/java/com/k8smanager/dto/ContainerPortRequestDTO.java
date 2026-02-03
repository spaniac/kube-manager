package com.k8smanager.dto;

/**
 * Request DTO for container port.
 */
public record ContainerPortRequestDTO(
        String name,
        int containerPort,
        String protocol
) {
}
