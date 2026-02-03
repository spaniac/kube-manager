package com.k8smanager.dto;

/**
 * Request DTO for resource requests.
 */
public record ResourceRequestsDTO(
        String cpu,
        String memory
) {
}
