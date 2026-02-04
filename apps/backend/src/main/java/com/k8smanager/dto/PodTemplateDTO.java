package com.k8smanager.dto;

import io.swagger.v3.oas.annotations.media.Schema;

import java.util.List;
import java.util.Map;

/**
 * Pod template DTO.
 */
@Schema(description = "Template for creating pods in a deployment")
public record PodTemplateDTO(
        @Schema(description = "Labels to apply to pods")
        Map<String, String> labels,
        @Schema(description = "Container specifications for the pod")
        List<PodContainerDTO> containers
) {
}
