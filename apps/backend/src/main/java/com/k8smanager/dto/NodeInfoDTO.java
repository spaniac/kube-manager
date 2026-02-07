package com.k8smanager.dto;

import java.util.List;

/**
 * DTO for node information.
 */
public record NodeInfoDTO(
        String name,
        String status,
        String version,
        String os,
        String architecture,
        String kernelVersion,
        NodeCapacityDTO capacity,
        NodeAllocatableDTO allocatable,
        List<String> taints,
        List<String> labels
) {
}
