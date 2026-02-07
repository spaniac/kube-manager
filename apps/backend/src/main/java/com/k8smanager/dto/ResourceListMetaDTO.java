package com.k8smanager.dto;

import io.swagger.v3.oas.annotations.media.Schema;

/**
 * Metadata for resource lists.
 */
@Schema(description = "Pagination and metadata information for resource lists")
public record ResourceListMetaDTO(
        @Schema(description = "Resource version for optimistic concurrency", example = "123456789")
        long resourceVersion,
        @Schema(description = "Token to continue fetching more items", example = "eyJ...")
        String continueToken,
        @Schema(description = "Number of items remaining after current page", example = "50")
        int remainingItemCount
) {
}
