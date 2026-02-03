package com.k8smanager.dto;

/**
 * Response DTO for workload creation from YAML.
 */
public record WorkloadCreateResponseDTO(
        String kind,
        String name,
        String namespace,
        boolean dryRun,
        String uid,
        String message
) {}
