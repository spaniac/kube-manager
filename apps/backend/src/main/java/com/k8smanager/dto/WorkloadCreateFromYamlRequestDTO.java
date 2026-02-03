package com.k8smanager.dto;

/**
 * Request DTO for creating a workload from YAML.
 */
public record WorkloadCreateFromYamlRequestDTO(
        String yaml,
        String namespace,
        boolean dryRun
) {
}
