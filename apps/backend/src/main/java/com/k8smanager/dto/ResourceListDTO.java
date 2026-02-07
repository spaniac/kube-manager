package com.k8smanager.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;

import java.time.Instant;
import java.util.List;

/**
 * Response DTO wrapper for list operations.
 */
@Schema(description = "Paginated list of Kubernetes resources")
public record ResourceListDTO<T>(
        @Schema(description = "Type of resources in list", example = "PodList")
        String kind,
        @Schema(description = "API version of resources", example = "v1")
        String apiVersion,
        @Schema(description = "List of resource items", required = true)
        List<T> items,
        @Schema(description = "Metadata about list including pagination info")
        ResourceListMetaDTO metadata
) {
}

/**
 * Response DTO for workload status.
 */
@Schema(description = "Current status of a workload (deployment, statefulset, daemonset)")
record WorkloadStatusDTO(
        @Schema(description = "Type of workload", example = "Deployment", required = true)
        String type,
        @Schema(description = "Name of the workload", example = "nginx-deployment", required = true)
        @NotBlank String name,
        @Schema(description = "Namespace where the workload is located", example = "default")
        String namespace,
        @Schema(description = "Information about replica counts and images")
        WorkloadInfoDTO info,
        @Schema(description = "List of workload conditions (Available, Progressing, etc.)")
        List<WorkloadConditionDTO> conditions
) {
}

/**
 * Workload info DTO.
 */
@Schema(description = "Detailed information about workload replicas and image")
record WorkloadInfoDTO(
        @Schema(description = "Desired number of replicas", example = "3")
        int replicas,
        @Schema(description = "Number of replicas with ready containers", example = "3")
        int readyReplicas,
        @Schema(description = "Number of replicas available to serve traffic", example = "3")
        int availableReplicas,
        @Schema(description = "Number of replicas unavailable", example = "0")
        int unavailableReplicas,
        @Schema(description = "Number of replicas updated to latest version", example = "3")
        int updatedReplicas,
        @Schema(description = "Container image used by the workload", example = "nginx:1.21.0")
        String image
) {
}

/**
 * Workload condition DTO.
 */
@Schema(description = "Condition describing the state of a workload")
record WorkloadConditionDTO(
        @Schema(description = "Type of condition (Available, Progressing, ReplicaFailure)", example = "Available")
        String type,
        @Schema(description = "Status of the condition (True, False, Unknown)", example = "True")
        String status,
        @Schema(description = "Brief reason for the condition's last transition", example = "MinimumReplicasAvailable")
        String reason,
        @Schema(description = "Human-readable message indicating details about the condition", example = "Deployment has minimum availability.")
        String message,
        @Schema(description = "Last time the condition transitioned from one status to another", example = "2024-02-04T10:30:00Z")
        Instant lastTransitionTime
) {
}

/**
 * Response DTO for pod logs.
 */
@Schema(description = "Container logs from a pod with pagination support")
record PodLogsDTO(
        @Schema(description = "Name of the pod", example = "nginx-pod-abc123", required = true)
        String podName,
        @Schema(description = "Namespace of the pod", example = "default", required = true)
        String namespace,
        @Schema(description = "Name of the container", example = "nginx")
        String containerName,
        @Schema(description = "List of log entries with timestamps and messages")
        List<LogEntryDTO> entries,
        @Schema(description = "Whether more log entries are available", example = "true")
        boolean hasMore
) {
}

/**
 * Log entry DTO.
 */
@Schema(description = "Single log entry with timestamp and severity")
record LogEntryDTO(
        @Schema(description = "Timestamp of the log entry", example = "2024-02-04T10:30:00Z")
        Instant timestamp,
        @Schema(description = "Log message content", example = "GET /health 200 12ms")
        String message,
        @Schema(description = "Severity level of the log (INFO, WARN, ERROR)", example = "INFO")
        String severity
) {
}

/**
 * Response DTO for pod events.
 */
@Schema(description = "List of Kubernetes events related to a pod")
record PodEventsDTO(
        @Schema(description = "Name of the pod", example = "nginx-pod-abc123")
        String podName,
        @Schema(description = "Namespace of the pod", example = "default")
        String namespace,
        @Schema(description = "List of events associated with the pod")
        List<EventDTO> events
) {
}

/**
 * Response DTO for resource YAML.
 */
@Schema(description = "Kubernetes resource represented in YAML format")
record ResourceYamlDTO(
        @Schema(description = "Name of the resource", example = "nginx-deployment")
        String name,
        @Schema(description = "Kind of resource (Deployment, Service, ConfigMap, etc.)", example = "Deployment")
        String kind,
        @Schema(description = "Namespace of the resource", example = "default")
        String namespace,
        @Schema(description = "YAML representation of the resource specification", example = "apiVersion: apps/v1\\nkind: Deployment\\n...")
        String yaml
) {
}

/**
 * Response DTO for resource diff.
 */
@Schema(description = "Comparison between two versions of a resource showing changes")
record ResourceDiffDTO(
        @Schema(description = "Name of the resource", example = "nginx-deployment")
        String name,
        @Schema(description = "Kind of resource", example = "Deployment")
        String kind,
        @Schema(description = "List of changes between versions")
        List<DiffEntryDTO> changes
) {
}

/**
 * Diff entry DTO.
 */
@Schema(description = "Single field change between resource versions")
record DiffEntryDTO(
        @Schema(description = "Path to the changed field in JSONPath format", example = ".spec.replicas")
        String path,
        @Schema(description = "Previous value of the field", example = "2")
        String oldValue,
        @Schema(description = "New value of the field", example = "3")
        String newValue,
        @Schema(description = "Type of change (add, modify, delete)", example = "modify")
        String operation
) {
}

/**
 * Response DTO for validation result.
 */
@Schema(description = "Result of validating Kubernetes resource YAML")
record ValidationResultDTO(
        @Schema(description = "Whether the resource is valid", example = "true", required = true)
        boolean valid,
        @Schema(description = "List of validation errors that must be fixed")
        List<ValidationErrorDTO> errors,
        @Schema(description = "List of warnings that should be reviewed")
        List<ValidationWarningDTO> warnings
) {
}

/**
 * Validation error DTO.
 */
@Schema(description = "Single validation error indicating a problem with the resource")
record ValidationErrorDTO(
        @Schema(description = "Path to the field with error in JSONPath format", example = ".spec.containers[0].image")
        String path,
        @Schema(description = "Human-readable error message", example = "image is required")
        String message,
        @Schema(description = "Error code for programmatic handling", example = "REQUIRED_FIELD_MISSING")
        String code
) {
}

/**
 * Validation warning DTO.
 */
@Schema(description = "Single validation warning indicating a potential issue")
record ValidationWarningDTO(
        @Schema(description = "Path to the field with warning in JSONPath format", example = ".spec.replicas")
        String path,
        @Schema(description = "Human-readable warning message", example = "replicas is higher than recommended for testing")
        String message,
        @Schema(description = "Warning code for programmatic handling", example = "HIGH_REPLICA_COUNT")
        String code
) {
}
