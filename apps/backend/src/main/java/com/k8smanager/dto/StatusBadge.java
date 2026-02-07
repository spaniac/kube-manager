package com.k8smanager.dto;

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
    DEPLOYMENT_FAILED("Failed", "error", "✖", "#EF4444"),
    DEPLOYMENT_PAUSED("Paused", "info", "⏸", "#6B7280"),
    DEPLOYMENT_DEGRADED("Degraded", "error", "✖", "#EF4444"),

    // Job statuses
    JOB_FAILED("Failed", "error", "✖", "#EF4444"),
    JOB_COMPLETE("Complete", "success", "✔", "#10B981"),
    JOB_ACTIVE("Active", "info", "⟳", "#3B82F6"),

    // CronJob statuses
    CRONJOB_SUSPENDED("Suspended", "warning", "⏸", "#F59E0B"),
    CRONJOB_SCHEDULED("Scheduled", "success", "✔", "#10B981"),

    // Service statuses
    SERVICE_ACTIVE("Active", "success", "✔", "#10B981"),
    SERVICE_PENDING("Pending", "warning", "⏳", "#F59E0B"),
    SERVICE_LOAD_BALANCER("LoadBalancer", "success", "✔", "#10B981"),
    SERVICE_NODE_PORT("NodePort", "info", "🔌", "#3B82F6"),
    SERVICE_EXTERNAL_NAME("ExternalName", "info", "🔗", "#8B5CF6"),
    SERVICE_CLUSTER_IP("ClusterIP", "success", "✔", "#10B981"),

    // Node statuses
    NODE_READY("Ready", "success", "✔", "#10B981"),
    NODE_NOT_READY("Not Ready", "error", "✖", "#EF4444"),
    NODE_MEMORY_PRESSURE("Memory Pressure", "warning", "⚠", "#F59E0B"),
    NODE_DISK_PRESSURE("Disk Pressure", "warning", "⚠", "#F59E0B"),
    NODE_PID_PRESSURE("PID Pressure", "warning", "⚠", "#F59E0B"),
    NODE_NETWORK_UNAVAILABLE("Network Unavailable", "error", "✖", "#EF4444"),

    // Namespace statuses
    NAMESPACE_ACTIVE("Active", "success", "✔", "#10B981"),
    NAMESPACE_TERMINATING("Terminating", "warning", "⏸", "#6B7280"),

    // ConfigMap/Secret statuses
    RESOURCE_READY("Ready", "success", "✔", "#10B981"),
    RESOURCE_ERROR("Error", "error", "✖", "#EF4444"),
    RESOURCE_NOT_FOUND("Not Found", "neutral", "❓", "#9CA3AF");

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

    public StatusBadgeDTO toDTO(String label, String tooltip) {
        return new StatusBadgeDTO(status, severity, label, tooltip, icon, color);
    }
}
