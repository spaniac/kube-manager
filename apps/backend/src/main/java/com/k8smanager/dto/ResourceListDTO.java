package com.k8smanager.dto;

import java.time.Instant;
import java.util.List;

/**
 * Response DTO wrapper for list operations.
 */
public record ResourceListDTO<T>(
        String kind,
        String apiVersion,
        List<T> items,
        ResourceListMetaDTO metadata
) {
}

/**
 * Metadata for resource lists.
 */
record ResourceListMetaDTO(
        long resourceVersion,
        String continueToken,
        int remainingItemCount
) {
}

/**
 * Response DTO for workload status.
 */
record WorkloadStatusDTO(
        String type,
        String name,
        String namespace,
        WorkloadInfoDTO info,
        List<WorkloadConditionDTO> conditions
) {
}

/**
 * Workload info DTO.
 */
record WorkloadInfoDTO(
        int replicas,
        int readyReplicas,
        int availableReplicas,
        int unavailableReplicas,
        int updatedReplicas,
        String image
) {
}

/**
 * Workload condition DTO.
 */
record WorkloadConditionDTO(
        String type,
        String status,
        String reason,
        String message,
        Instant lastTransitionTime
) {
}

/**
 * Response DTO for pod logs.
 */
record PodLogsDTO(
        String podName,
        String namespace,
        String containerName,
        List<LogEntryDTO> entries,
        boolean hasMore
) {
}

/**
 * Log entry DTO.
 */
record LogEntryDTO(
        Instant timestamp,
        String message,
        String severity
) {
}

/**
 * Response DTO for pod events.
 */
record PodEventsDTO(
        String podName,
        String namespace,
        List<EventDTO> events
) {
}

/**
 * Response DTO for resource YAML.
 */
record ResourceYamlDTO(
        String name,
        String kind,
        String namespace,
        String yaml
) {
}

/**
 * Response DTO for resource diff.
 */
record ResourceDiffDTO(
        String name,
        String kind,
        List<DiffEntryDTO> changes
) {
}

/**
 * Diff entry DTO.
 */
record DiffEntryDTO(
        String path,
        String oldValue,
        String newValue,
        String operation
) {
}

/**
 * Response DTO for validation result.
 */
record ValidationResultDTO(
        boolean valid,
        List<ValidationErrorDTO> errors,
        List<ValidationWarningDTO> warnings
) {
}

/**
 * Validation error DTO.
 */
record ValidationErrorDTO(
        String path,
        String message,
        String code
) {
}

/**
 * Validation warning DTO.
 */
record ValidationWarningDTO(
        String path,
        String message,
        String code
) {
}
