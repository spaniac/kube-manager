package com.k8smanager.dto;

/**
 * Request DTO for volume mount.
 */
public record VolumeMountRequestDTO(
        String name,
        String mountPath,
        boolean readOnly
) {
}
