package com.k8smanager.dto;

import io.swagger.v3.oas.annotations.media.Schema;

/**
 * Request DTO for restarting a deployment.
 */
@Schema(description = "Request to restart a deployment by rolling out new pods")
public record RestartDeploymentRequestDTO() {
}
