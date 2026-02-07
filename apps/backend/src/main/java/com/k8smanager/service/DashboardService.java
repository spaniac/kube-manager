package com.k8smanager.service;

import com.k8smanager.dto.DashboardDTO;
import com.k8smanager.dto.WidgetConfigDTO;
import com.k8smanager.exception.ResourceNotFoundException;
import com.k8smanager.persistence.entity.Dashboard;
import com.k8smanager.persistence.entity.DashboardWidget;
import com.k8smanager.persistence.entity.User;
import com.k8smanager.persistence.repository.DashboardRepository;
import com.k8smanager.persistence.repository.DashboardWidgetRepository;
import com.k8smanager.persistence.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DashboardService {

    private final DashboardRepository dashboardRepository;
    private final DashboardWidgetRepository dashboardWidgetRepository;
    private final UserRepository userRepository;

    @Transactional(readOnly = true)
    @PreAuthorize("hasRole('ADMIN') or @securityService.isDashboardOwner(#userId, #dashboardId)")
    public Optional<DashboardDTO> getDashboardById(Long dashboardId, Long userId) {
        return dashboardRepository.findById(dashboardId)
                .map(DashboardDTO::fromEntity);
    }

    @Transactional(readOnly = true)
    @PreAuthorize("hasRole('ADMIN') or #userId == authentication.principal.id")
    public List<DashboardDTO> getAllDashboardsForUser(Long userId) {
        User owner = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));
        return owner.getDashboards().stream()
                .map(DashboardDTO::fromEntity)
                .collect(Collectors.toList());
    }

    @Transactional
    @PreAuthorize("hasRole('ADMIN') or #dashboardDTO.ownerEmail == authentication.principal.email")
    public DashboardDTO createDashboard(DashboardDTO dashboardDTO, Long userId, Integer refreshIntervalSec) {
        validateRefreshInterval(refreshIntervalSec);
        User owner = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));

        Dashboard dashboard = Dashboard.builder()
                .name(dashboardDTO.getName())
                .description(dashboardDTO.getDescription())
                .isPublic(dashboardDTO.getIsPublic())
                .owner(owner)
                .createdAt(Instant.now())
                .updatedAt(Instant.now())
                .refreshIntervalSec(refreshIntervalSec != null ? refreshIntervalSec : 60) // Default to 60 if not provided
                .build();

        Dashboard savedDashboard = dashboardRepository.save(dashboard);

        if (dashboardDTO.getWidgets() != null && !dashboardDTO.getWidgets().isEmpty()) {
            List<DashboardWidget> widgets = dashboardDTO.getWidgets().stream()
                    .map(widgetDTO -> DashboardWidget.builder()
                            .dashboard(savedDashboard)
                            .type(widgetDTO.getType())
                            .title(widgetDTO.getTitle())
                            .config(widgetDTO.getConfig())
                            .x(widgetDTO.getX())
                            .y(widgetDTO.getY())
                            .w(widgetDTO.getW())
                            .h(widgetDTO.getH())
                            .orderIndex(widgetDTO.getOrderIndex())
                            .build())
                    .collect(Collectors.toList());
            dashboardWidgetRepository.saveAll(widgets);
            savedDashboard.setWidgets(widgets);
        }

        return DashboardDTO.fromEntity(savedDashboard);
    }

    @Transactional
    @PreAuthorize("hasRole('ADMIN') or @securityService.isDashboardOwner(#userId, #dashboardId)")
    public DashboardDTO updateDashboard(Long dashboardId, DashboardDTO dashboardDTO, Long userId, Integer refreshIntervalSec) {
        validateRefreshInterval(refreshIntervalSec);
        Dashboard existingDashboard = dashboardRepository.findById(dashboardId)
                .orElseThrow(() -> new ResourceNotFoundException("Dashboard not found with id: " + dashboardId));

        existingDashboard.setName(dashboardDTO.getName());
        existingDashboard.setDescription(dashboardDTO.getDescription());
        existingDashboard.setIsPublic(dashboardDTO.getIsPublic());
        existingDashboard.setUpdatedAt(Instant.now());
        existingDashboard.setRefreshIntervalSec(refreshIntervalSec != null ? refreshIntervalSec : existingDashboard.getRefreshIntervalSec());

        dashboardWidgetRepository.deleteAll(existingDashboard.getWidgets());
        if (dashboardDTO.getWidgets() != null && !dashboardDTO.getWidgets().isEmpty()) {
            List<DashboardWidget> updatedWidgets = dashboardDTO.getWidgets().stream()
                    .map(widgetDTO -> DashboardWidget.builder()
                            .dashboard(existingDashboard)
                            .type(widgetDTO.getType())
                            .title(widgetDTO.getTitle())
                            .config(widgetDTO.getConfig())
                            .x(widgetDTO.getX())
                            .y(widgetDTO.getY())
                            .w(widgetDTO.getW())
                            .h(widgetDTO.getH())
                            .orderIndex(widgetDTO.getOrderIndex())
                            .build())
                    .collect(Collectors.toList());
            dashboardWidgetRepository.saveAll(updatedWidgets);
            existingDashboard.setWidgets(updatedWidgets);
        } else {
            existingDashboard.getWidgets().clear();
        }

        return DashboardDTO.fromEntity(dashboardRepository.save(existingDashboard));
    }

    @Transactional
    @PreAuthorize("hasRole('ADMIN') or @securityService.isDashboardOwner(#userId, #dashboardId)")
    public void deleteDashboard(Long dashboardId, Long userId) {
        if (!dashboardRepository.existsById(dashboardId)) {
            throw new ResourceNotFoundException("Dashboard not found with id: " + dashboardId);
        }
        dashboardRepository.deleteById(dashboardId);
    }

    @Transactional
    @PreAuthorize("hasRole('ADMIN') or @securityService.isDashboardOwner(#userId, #dashboardId)")
    public DashboardDTO cloneDashboard(Long dashboardId, Long userId) {
        Dashboard originalDashboard = dashboardRepository.findById(dashboardId)
                .orElseThrow(() -> new ResourceNotFoundException("Dashboard not found with id: " + dashboardId));

        User owner = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));

        Dashboard clonedDashboard = Dashboard.builder()
                .name("Clone of " + originalDashboard.getName())
                .description(originalDashboard.getDescription())
                .isPublic(false)
                .owner(owner)
                .createdAt(Instant.now())
                .updatedAt(Instant.now())
                .build();

        Dashboard savedClonedDashboard = dashboardRepository.save(clonedDashboard);

        if (originalDashboard.getWidgets() != null && !originalDashboard.getWidgets().isEmpty()) {
            List<DashboardWidget> clonedWidgets = originalDashboard.getWidgets().stream()
                    .map(originalWidget -> DashboardWidget.builder()
                            .dashboard(savedClonedDashboard)
                            .type(originalWidget.getType())
                            .title(originalWidget.getTitle())
                            .config(originalWidget.getConfig())
                            .x(originalWidget.getX())
                            .y(originalWidget.getY())
                            .w(originalWidget.getW())
                            .h(originalWidget.getH())
                            .orderIndex(originalWidget.getOrderIndex())
                            .build())
                    .collect(Collectors.toList());
            dashboardWidgetRepository.saveAll(clonedWidgets);
            savedClonedDashboard.setWidgets(clonedWidgets);
        }

        return DashboardDTO.fromEntity(savedClonedDashboard);
    }

    private void validateRefreshInterval(Integer refreshIntervalSec) {
        if (refreshIntervalSec != null && (refreshIntervalSec < 10 || refreshIntervalSec > 300)) {
            throw new IllegalArgumentException("Refresh interval must be between 10 and 300 seconds.");
        }
    }

    public DashboardDTO getDashboardDTOFromEntity(Dashboard dashboard) {
        return DashboardDTO.fromEntity(dashboard);
    }
}
