package com.k8smanager.dto;

import java.util.List;
import java.util.Map;

/**
 * Base DTO for all Kubernetes resources.
 */
public record K8sResourceDTO(
        String kind,
        String apiVersion,
        ObjectMetadataDTO metadata
) {}

/**
 * Metadata DTO for Kubernetes resources.
 */
public record ObjectMetadataDTO(
        String name,
        String namespace,
        String uid,
        String resourceVersion,
        long creationTimestamp,
        Map<String, String> labels,
        Map<String, String> annotations
) {}

/**
 * Pod DTO.
 */
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
) {}

/**
 * Pod container DTO.
 */
public record PodContainerDTO(
        String name,
        String image,
        boolean ready,
        int restartCount,
        String state
) {}

/**
 * Pod condition DTO.
 */
public record PodConditionDTO(
        String type,
        String status,
        String reason,
        String message,
        long lastTransitionTime
) {}

/**
 * Deployment DTO.
 */
public record DeploymentDTO(
        String name,
        String namespace,
        int replicas,
        int readyReplicas,
        int availableReplicas,
        int updatedReplicas,
        String strategy,
        String selector,
        PodTemplateDTO template
) {}

/**
 * Pod template DTO.
 */
public record PodTemplateDTO(
        Map<String, String> labels,
        List<PodContainerDTO> containers
) {}

/**
 * Service DTO.
 */
public record ServiceDTO(
        String name,
        String namespace,
        String type,
        List<String> clusterIPs,
        List<ServicePortDTO> ports,
        String selector,
        List<ServiceEndpointDTO> endpoints
) {}

/**
 * Service port DTO.
 */
public record ServicePortDTO(
        String name,
        String protocol,
        int port,
        int targetPort
) {}

/**
 * Service endpoint DTO.
 */
public record ServiceEndpointDTO(
        String ip,
        List<Integer> ports,
        boolean ready
) {}

/**
 * Namespace DTO.
 */
public record NamespaceDTO(
        String name,
        String status,
        long creationTimestamp,
        Map<String, String> labels,
        Map<String, String> annotations
) {}

/**
 * ConfigMap DTO.
 */
public record ConfigMapDTO(
        String name,
        String namespace,
        long creationTimestamp,
        Map<String, String> data,
        Map<String, Map<String, String>> binaryData,
        Map<String, String> labels
) {}

/**
 * Secret DTO.
 */
public record SecretDTO(
        String name,
        String namespace,
        String type,
        long creationTimestamp,
        Map<String, String> data,
        Map<String, String> labels,
        boolean immutable
) {}

/**
 * StatefulSet DTO.
 */
public record StatefulSetDTO(
        String name,
        String namespace,
        int replicas,
        int readyReplicas,
        int currentReplicas,
        String selector
) {}

/**
 * DaemonSet DTO.
 */
public record DaemonSetDTO(
        String name,
        String namespace,
        String selector,
        int replicas,
        int readyReplicas,
        int availableReplicas
) {}

/**
 * Related resources DTO.
 */
public record RelatedResourcesDTO(
        String deployments,
        String statefulSets,
        String daemonSets,
        String services,
        String configMaps,
        String secrets,
        String podDisruptionBudgets
) {}

/**
 * Resource quota DTO.
 */
public record ResourceQuotaDTO(
        String cpuUsed,
        String cpuHard,
        String memoryUsed,
        String memoryHard,
        String podsUsed,
        String podsHard
) {}

/**
 * Deployment revision DTO.
 */
public record DeploymentRevisionDTO(
        String name,
        String revision,
        long creationTimestamp,
        int replicas
) {}

/**
 * Job DTO.
 */
public record JobDTO(
        String name,
        String namespace,
        String status,
        String startTime,
        String completionTime,
        int active,
        int succeeded,
        int failed
) {}

/**
 * CronJob DTO.
 */
public record CronJobDTO(
        String name,
        String namespace,
        String schedule,
        String suspend,
        String lastSchedule,
        String nextSchedule,
        String active,
        int succeeded,
        int failed
) {}
