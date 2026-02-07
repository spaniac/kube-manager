package com.k8smanager.service;

import com.k8smanager.dto.DashboardShareRequestDTO;
import com.k8smanager.persistence.entity.Dashboard;
import com.k8smanager.persistence.entity.User;
import com.k8smanager.model.Visibility;
import com.k8smanager.persistence.repository.DashboardRepository;
import com.k8smanager.persistence.repository.UserRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class DashboardShareService {

    private final DashboardRepository dashboardRepository;
    private final UserRepository userRepository;

    @Value("${app.frontend.url}")
    private String frontendUrl;

    public DashboardShareService(DashboardRepository dashboardRepository, UserRepository userRepository) {
        this.dashboardRepository = dashboardRepository;
        this.userRepository = userRepository;
    }

    @Transactional
    public String generateShareToken(Long dashboardId, DashboardShareRequestDTO shareRequest, User currentUser) {
        Dashboard dashboard = dashboardRepository.findById(dashboardId)
                .orElseThrow(() -> new IllegalArgumentException("Dashboard not found"));

        if (!dashboard.getOwnerId().equals(currentUser.getId())) {
            throw new AccessDeniedException("Only the dashboard owner can share it.");
        }

        // Generate a unique token
        String shareToken = UUID.randomUUID().toString();

        dashboard.setVisibility(shareRequest.getVisibility());
        dashboard.setShareToken(shareToken);
        dashboard.setExpiresAt(shareRequest.getExpiresAt());
        // For TEAM visibility, we might need a separate table or a more complex mechanism
        // For now, we'll just set the visibility and token.

        dashboardRepository.save(dashboard);

        return frontendUrl + "/shared-dashboard/" + shareToken;
    }

    @Transactional
    public void revokeShareToken(Long dashboardId, User currentUser) {
        Dashboard dashboard = dashboardRepository.findById(dashboardId)
                .orElseThrow(() -> new IllegalArgumentException("Dashboard not found"));

        if (!dashboard.getOwnerId().equals(currentUser.getId())) {
            throw new AccessDeniedException("Only the dashboard owner can revoke sharing.");
        }

        dashboard.setVisibility(Visibility.PRIVATE);
        dashboard.setShareToken(null);
        dashboard.setExpiresAt(null);
        dashboardRepository.save(dashboard);
    }

    public Dashboard getSharedDashboard(String token) {
        return dashboardRepository.findByShareToken(token)
                .filter(dashboard -> dashboard.getVisibility() == Visibility.PUBLIC ||
                        (dashboard.getExpiresAt() == null || dashboard.getExpiresAt().isAfter(LocalDateTime.now())))
                .orElseThrow(() -> new AccessDeniedException("Shared dashboard not found or expired."));
    }

    public boolean validateVisibility(User user, Dashboard dashboard) {
        if (dashboard.getVisibility() == Visibility.PRIVATE) {
            return dashboard.getOwnerId().equals(user.getId());
        } else if (dashboard.getVisibility() == Visibility.TEAM) {
            // This would require checking if the user is part of the team
            // For now, we'll treat TEAM as PUBLIC for simplicity if no team mechanism is in place
            // or implement a placeholder.
            // A proper implementation would involve a User-Team-Dashboard relationship.
            return true; // Placeholder: assuming all authenticated users can access team dashboards
        } else if (dashboard.getVisibility() == Visibility.PUBLIC) {
            return true; // Public dashboards are accessible by anyone
        }
        return false;
    }
}
