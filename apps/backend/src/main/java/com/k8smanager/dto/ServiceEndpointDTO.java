package com.k8smanager.dto;

/**
 * Service endpoint DTO.
 */
public record ServiceEndpointDTO(
        String host,
        int port
) {
}
