package com.k8smanager.dto;

/**
 * Service port DTO.
 */
public record ServicePortDTO(
        String name,
        String protocol,
        int port,
        int targetPort
) {
}
