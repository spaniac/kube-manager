package com.k8smanager.dto;

import java.util.List;
import java.util.Map;

/**
 * Request DTO for creating/updating a deployment.
 */
public record DeploymentRequestDTO(
        String name,
        String namespace,
        List<PodContainerRequestDTO> containers,
        int replicas,
        Map<String, String> labels,
        Map<String, String> annotations,
        DeploymentStrategyDTO strategy
) {}

/**
 * Request DTO for pod container.
 */
public record PodContainerRequestDTO(
        String name,
        String image,
        List<ContainerPortRequestDTO> ports,
        List<ContainerEnvVarRequestDTO> env,
        ResourceRequirementsDTO resources,
        List<VolumeMountRequestDTO> volumeMounts
) {}

/**
 * Request DTO for container port.
 */
public record ContainerPortRequestDTO(
        String name,
        int containerPort,
        String protocol
) {}

/**
 * Request DTO for container environment variable.
 */
public record ContainerEnvVarRequestDTO(
        String name,
        String value,
        String valueFrom
) {}

/**
 * Request DTO for resource requirements.
 */
public record ResourceRequirementsDTO(
        ResourceLimitsDTO limits,
        ResourceRequestsDTO requests
) {}

/**
 * Request DTO for resource limits.
 */
public record ResourceLimitsDTO(
        String cpu,
        String memory
) {}

/**
 * Request DTO for resource requests.
 */
public record ResourceRequestsDTO(
        String cpu,
        String memory
) {}

/**
 * Request DTO for volume mount.
 */
public record VolumeMountRequestDTO(
        String name,
        String mountPath,
        boolean readOnly
) {}

/**
 * Request DTO for deployment strategy.
 */
public record DeploymentStrategyDTO(
        String type,
        RollingUpdateStrategyDTO rollingUpdate
) {}

/**
 * Request DTO for rolling update strategy.
 */
public record RollingUpdateStrategyDTO(
        int maxUnavailable,
        int maxSurge
) {}

/**
 * Request DTO for creating a service.
 */
public record ServiceRequestDTO(
        String name,
        String namespace,
        String type,
        List<ServicePortRequestDTO> ports,
        Map<String, String> selector,
        Map<String, String> labels
) {}

/**
 * Request DTO for service port.
 */
public record ServicePortRequestDTO(
        String name,
        String protocol,
        int port,
        int targetPort
) {}

/**
 * Request DTO for creating a namespace.
 */
public record NamespaceRequestDTO(
        String name,
        Map<String, String> labels,
        Map<String, String> annotations
) {}

/**
 * Request DTO for creating a ConfigMap.
 */
public record ConfigMapRequestDTO(
        String name,
        String namespace,
        Map<String, String> data,
        Map<String, String> labels
) {}

/**
 * Request DTO for creating a Secret.
 */
public record SecretRequestDTO(
        String name,
        String namespace,
        String type,
        Map<String, String> data,
        Map<String, String> labels,
        boolean immutable
) {}

/**
 * Request DTO for scaling a deployment.
 */
public record ScaleDeploymentRequestDTO(
        int replicas
) {}

/**
 * Request DTO for restarting a deployment.
 */
public record RestartDeploymentRequestDTO() {}

/**
 * Request DTO for rolling back a deployment.
 */
public record RollbackDeploymentRequestDTO(
        long revision
) {}

/**
 * Request DTO for deleting a resource.
 */
public record DeleteResourceRequestDTO(
        String name,
        boolean deletePods,
        boolean force,
        int gracePeriodSeconds
) {}
