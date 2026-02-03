package com.k8smanager.dto;

public record EventDTO(
        String type,
        String reason,
        String message,
        String lastTimestamp
) {
}
