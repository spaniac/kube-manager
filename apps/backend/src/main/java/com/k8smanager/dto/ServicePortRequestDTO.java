package com.k8smanager.dto;

/**
 * Request DTO for service port.
 */
public record ServicePortRequestDTO(
        String name,
        String protocol,
        int port,
        int targetPort
) {
}
