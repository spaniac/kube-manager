package com.k8smanager.dto;

import com.k8smanager.persistence.entity.DashboardWidget;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class WidgetConfigDTO {
    private Long id;
    private String type;
    private String title;
    private String config; // JSON string for widget-specific configuration
    private Integer x;
    private Integer y;
    private Integer w;
    private Integer h;
    private Integer orderIndex;

    public static WidgetConfigDTO fromEntity(DashboardWidget widget) {
        return WidgetConfigDTO.builder()
                .id(widget.getId())
                .type(widget.getType())
                .title(widget.getTitle())
                .config(widget.getConfig())
                .x(widget.getX())
                .y(widget.getY())
                .w(widget.getW())
                .h(widget.getH())
                .orderIndex(widget.getOrderIndex())
                .build();
    }
}
