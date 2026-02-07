package com.k8smanager.dto;

/**
 * DTO for node allocatable.
 */
public record NodeAllocatableDTO(
        String cpu,
        String memory,
        String pods,
        String ephemeralStorage
) {
}
