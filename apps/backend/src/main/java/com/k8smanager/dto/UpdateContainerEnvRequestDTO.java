package com.k8smanager.dto;

import java.util.Map;

/**
 * Request DTO for updating container environment variables.
 */
public record UpdateContainerEnvRequestDTO(
        String containerName,
        Map<String, String> envVars
) {}
