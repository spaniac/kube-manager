package com.k8smanager.dto;

/**
 * Request DTO for cloning a workload.
 */
public record CloneWorkloadRequestDTO(
        String sourceNamespace,
        String sourceName,
        String sourceKind,
        String targetName,
        String targetNamespace
) {}
