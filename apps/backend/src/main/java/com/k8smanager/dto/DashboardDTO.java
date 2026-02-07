package com.k8smanager.dto;

import com.k8smanager.persistence.entity.Dashboard;
import com.k8smanager.persistence.entity.DashboardWidget;
import lombok.Builder;
import lombok.Data;

import java.time.Instant;
import java.util.List;
import java.util.stream.Collectors;

@Data
@Builder
public class DashboardDTO {
    private Long id;
    private String name;
    private String description;
    private Boolean isPublic;
    private String ownerEmail; // Used for authorization checks
    private Instant createdAt;
    private Instant updatedAt;
    private Integer refreshIntervalSec;
    private List<WidgetConfigDTO> widgets;

    public static DashboardDTO fromEntity(Dashboard dashboard) {
        List<WidgetConfigDTO> widgetDTOs = dashboard.getWidgets() != null ?
                dashboard.getWidgets().stream()
                        .map(WidgetConfigDTO::fromEntity)
                        .collect(Collectors.toList()) :
                null;

        return DashboardDTO.builder()
                .id(dashboard.getId())
                .name(dashboard.getName())
                .description(dashboard.getDescription())
                .isPublic(dashboard.getIsPublic())
                .ownerEmail(dashboard.getOwner() != null ? dashboard.getOwner().getEmail() : null)
                .createdAt(dashboard.getCreatedAt())
                .updatedAt(dashboard.getUpdatedAt())
                .refreshIntervalSec(dashboard.getRefreshIntervalSec())
                .widgets(widgetDTOs)
                .build();
    }
}
