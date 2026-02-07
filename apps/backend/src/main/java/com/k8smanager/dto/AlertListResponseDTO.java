package com.k8smanager.dto;

import io.swagger.v3.oas.annotations.media.Schema;

import java.util.List;

/**
 * Paginated response DTO for alert history queries.
 */
@Schema(description = "Paginated alert history response")
public record AlertListResponseDTO(
        @Schema(description = "Alert page content")
        List<AlertDTO> alerts,
        @Schema(description = "Current page number (0-based)", example = "0")
        int page,
        @Schema(description = "Current page size", example = "20")
        int size,
        @Schema(description = "Total alert count matching filters", example = "125")
        long totalElements,
        @Schema(description = "Total page count", example = "7")
        int totalPages
) {
}
