package com.k8smanager.dto;

public record StatusBadgeDTO(
        String status,
        String severity,
        String label,
        String tooltip,
        String icon,
        String color
) {
}
