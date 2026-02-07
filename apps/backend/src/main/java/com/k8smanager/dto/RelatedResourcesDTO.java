package com.k8smanager.dto;

import java.util.List;

public record RelatedResourcesDTO(
        List<K8sResourceDTO> resources,
        String message,
        boolean success
) {
}
