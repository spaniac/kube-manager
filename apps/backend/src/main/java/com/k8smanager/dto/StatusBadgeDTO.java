package com.k8smanager.dto;

/**
 * DTO for status badge information.
 * Provides standardized status representation for UI display.
 */
public record StatusBadgeDTO(
        String status,          // e.g., "Running", "Pending", "Failed", "Terminating"
        String severity,        // "success", "warning", "error", "info", "neutral"
        String label,           // Human-readable label, e.g., "3/3 Ready"
        String tooltip,         // Detailed explanation
        String icon,            // Icon identifier for UI
        String color            // CSS color code (hex) for background or text
) {}

/**
 * Status badge enumeration for common Kubernetes statuses.
 */
public enum StatusBadge {
    // Pod statuses
    POD_RUNNING("Running", "success", "✔", "#10B981"),
    POD_PENDING("Pending", "warning", "⏳", "#F59E0B"),
    POD_FAILED("Failed", "error", "✖", "#EF4444"),
    POD_SUCCEEDED("Succeeded", "success", "✔", "#10B981"),
    POD_TERMINATING("Terminating", "info", "⏸", "#6B7280"),
    POD_UNKNOWN("Unknown", "neutral", "❓", "#9CA3AF"),

    // Deployment/StatefulSet/DaemonSet statuses
    DEPLOYMENT_READY("Ready", "success", "✔", "#10B981"),
    DEPLOYMENT_PROGRESSING("Progressing", "info", "⟳", "#3B82F6"),
    DEPLOYMENT_NOT_READY("Not Ready", "warning", "⚠", "#F59E0B"),
    DEPLOYMENT_DEGRADED("Degraded", "error", "✖", "#EF4444"),
    DEPLOYMENT_PAUSED("Paused", "info", "⏸", "#6B7280"),

    // Job statuses
    JOB_ACTIVE("Active", "info", "⟳", "#3B82F6"),
    JOB_COMPLETE("Complete", "success", "✔", "#10B981"),
    JOB_FAILED("Failed", "error", "✖", "#EF4444"),

    // CronJob statuses
    CRONJOB_SCHEDULED("Scheduled", "success", "📅", "#10B981"),
    CRONJOB_SUSPENDED("Suspended", "warning", "⏸", "#F59E0B"),

    // Service statuses
    SERVICE_CLUSTER_IP("ClusterIP", "success", "🌐", "#10B981"),
    SERVICE_LOAD_BALANCER("LoadBalancer", "success", "⚖", "#10B981"),
    SERVICE_NODE_PORT("NodePort", "success", "🔌", "#10B981"),
    SERVICE_EXTERNAL_NAME("ExternalName", "info", "🔗", "#6B7280"),
    SERVICE_NO_ENDPOINTS("No Endpoints", "warning", "⚠", "#F59E0B"),

    // Node statuses
    NODE_READY("Ready", "success", "✔", "#10B981"),
    NODE_NOT_READY("NotReady", "error", "✖", "#EF4444"),
    NODE_UNREACHABLE("Unreachable", "error", "⛔", "#EF4444"),
    NODE_MEMORY_PRESSURE("MemoryPressure", "warning", "⚠", "#F59E0B"),
    NODE_DISK_PRESSURE("DiskPressure", "warning", "⚠", "#F59E0B"),
    NODE_PID_PRESSURE("PIDPressure", "warning", "⚠", "#F59E0B"),
    NODE_NETWORK_UNAVAILABLE("NetworkUnavailable", "error", "✖", "#EF4444"),

    // Namespace statuses
    NAMESPACE_ACTIVE("Active", "success", "✔", "#10B981"),
    NAMESPACE_TERMINATING("Terminating", "info", "⏸", "#6B7280"),

    // ConfigMap/Secret statuses
    RESOURCE_READY("Ready", "success", "✔", "#10B981"),
    RESOURCE_NOT_FOUND("Not Found", "error", "✖", "#EF4444");

    private final String status;
    private final String severity;
    private final String icon;
    private final String color;

    StatusBadge(String status, String severity, String icon, String color) {
        this.status = status;
        this.severity = severity;
        this.icon = icon;
        this.color = color;
    }

    public String getStatus() {
        return status;
    }

    public String getSeverity() {
        return severity;
    }

    public String getIcon() {
        return icon;
    }

    public String getColor() {
        return color;
    }

    /**
     * Convert to StatusBadgeDTO with label and tooltip.
     */
    public StatusBadgeDTO toDTO(String label, String tooltip) {
        return new StatusBadgeDTO(status, severity, label, tooltip, icon, color);
    }
}
