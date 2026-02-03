package com.k8smanager.dto;

/**
 * DTO for node capacity.
 */
public record NodeCapacityDTO(
        String cpu,
        String memory,
        String pods,
        String ephemeralStorage
) {
}
