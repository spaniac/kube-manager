package com.k8smanager.dto;

import java.util.List;
import java.util.Map;

/**
 * Pod template DTO.
 */
public record PodTemplateDTO(
        Map<String, String> labels,
        List<PodContainerDTO> containers
) {
}
