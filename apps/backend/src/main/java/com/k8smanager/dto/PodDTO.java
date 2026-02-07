package com.k8smanager.dto;

import java.util.List;

public record PodDTO(
        String name,
        String namespace,
        String status,
        String phase,
        String nodeName,
        String podIP,
        String startTime,
        List<PodContainerDTO> containers,
        List<PodConditionDTO> conditions
) {
}
