package com.k8smanager.dto;

import java.util.List;
import java.util.Map;

/**
 * Request DTO for creating a service.
 */
public record ServiceRequestDTO(
        String name,
        String namespace,
        String type,
        List<ServicePortRequestDTO> ports,
        Map<String, String> selector,
        Map<String, String> labels
) {
}
