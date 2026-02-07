package com.k8smanager.dto;

import io.swagger.v3.oas.annotations.media.Schema;

/**
 * Request DTO for volume mount.
 */
@Schema(description = "Volume mount specification for a container")
public record VolumeMountRequestDTO(
        @Schema(description = "Name of the volume to mount", example = "config-volume")
        String name,
        @Schema(description = "Path where the volume is mounted in the container", example = "/etc/config", required = true)
        String mountPath,
        @Schema(description = "Whether the volume is mounted read-only", example = "false")
        boolean readOnly
) {
}
