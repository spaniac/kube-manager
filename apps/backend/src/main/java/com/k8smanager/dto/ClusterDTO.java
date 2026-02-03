package com.k8smanager.dto;

import java.util.List;

/**
 * DTO for cluster overview information.
 */
public record ClusterInfoDTO(
        String name,
        String version,
        String platform,
        String architecture,
        ClusterMetricsDTO metrics
) {}

/**
 * DTO for cluster metrics.
 */
public record ClusterMetricsDTO(
        int totalNodes,
        int readyNodes,
        int totalPods,
        int runningPods,
        String cpuCapacity,
        String memoryCapacity,
        String storageCapacity
) {}

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
) {}

/**
 * DTO for node capacity.
 */
public record NodeCapacityDTO(
        String cpu,
        String memory,
        String pods,
        String ephemeralStorage
) {}

/**
 * DTO for node allocatable.
 */
public record NodeAllocatableDTO(
        String cpu,
        String memory,
        String pods,
        String ephemeralStorage
) {}
