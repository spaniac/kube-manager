package com.k8smanager.dto;

import java.util.List;

public record ServiceDTO(
        String name,
        String namespace,
        String type,
        List<String> clusterIPs,
        List<ServicePortDTO> ports,
        String selector,
        List<ServiceEndpointDTO> endpoints
) {
}
