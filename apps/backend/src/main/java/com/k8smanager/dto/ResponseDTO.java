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
) {}

/**
 * Metadata for resource lists.
 */
public record ResourceListMetaDTO(
        long resourceVersion,
        String continueToken,
        int remainingItemCount
) {}

/**
 * Response DTO for workload status.
 */
public record WorkloadStatusDTO(
        String type,
        String name,
        String namespace,
        WorkloadInfoDTO info,
        List<WorkloadConditionDTO> conditions
) {}

/**
 * Workload info DTO.
 */
public record WorkloadInfoDTO(
        int replicas,
        int readyReplicas,
        int availableReplicas,
        int unavailableReplicas,
        int updatedReplicas,
        String image
) {}

/**
 * Workload condition DTO.
 */
public record WorkloadConditionDTO(
        String type,
        String status,
        String reason,
        String message,
        Instant lastTransitionTime
) {}

/**
 * Response DTO for pod logs.
 */
public record PodLogsDTO(
        String podName,
        String namespace,
        String containerName,
        List<LogEntryDTO> entries,
        boolean hasMore
) {}

/**
 * Log entry DTO.
 */
public record LogEntryDTO(
        Instant timestamp,
        String message,
        String severity
) {}

/**
 * Response DTO for pod events.
 */
public record PodEventsDTO(
        String podName,
        String namespace,
        List<EventDTO> events
) {}

/**
 * Event DTO.
 */
public record EventDTO(
        String type,
        String reason,
        String message,
        Instant lastTimestamp,
        int count,
        String source
) {}

/**
 * Response DTO for metrics.
 */
public record MetricsResponseDTO(
        List<MetricPointDTO> data,
        MetricSummaryDTO summary
) {}

/**
 * Metric point DTO.
 */
public record MetricPointDTO(
        Instant timestamp,
        double value
) {}

/**
 * Metric summary DTO.
 */
public record MetricSummaryDTO(
        double average,
        double min,
        double max,
        long count
) {}

/**
 * Response DTO for resource YAML.
 */
public record ResourceYamlDTO(
        String name,
        String kind,
        String namespace,
        String yaml
) {}

/**
 * Response DTO for resource diff.
 */
public record ResourceDiffDTO(
        String name,
        String kind,
        List<DiffEntryDTO> changes
) {}

/**
 * Diff entry DTO.
 */
public record DiffEntryDTO(
        String path,
        String oldValue,
        String newValue,
        String operation
) {}

/**
 * Response DTO for validation result.
 */
public record ValidationResultDTO(
        boolean valid,
        List<ValidationErrorDTO> errors,
        List<ValidationWarningDTO> warnings
) {}

/**
 * Validation error DTO.
 */
public record ValidationErrorDTO(
        String path,
        String message,
        String code
) {}

/**
 * Validation warning DTO.
 */
public record ValidationWarningDTO(
        String path,
        String message,
        String code
) {}
