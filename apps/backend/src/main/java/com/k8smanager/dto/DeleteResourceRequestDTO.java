package com.k8smanager.dto;

/**
 * Request DTO for deleting a resource.
 */
public record DeleteResourceRequestDTO(
        String name,
        boolean deletePods,
        boolean force,
        int gracePeriodSeconds
) {
}
