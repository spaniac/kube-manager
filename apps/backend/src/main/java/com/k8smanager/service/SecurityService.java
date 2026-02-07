package com.k8smanager.service;

import com.k8smanager.persistence.entity.User;
import org.springframework.stereotype.Service;

@Service
public class SecurityService {

    // Placeholder for fetching the current authenticated user
    public User getCurrentUser(String subject) {
        return User.builder()
                .id(Long.valueOf(subject))
                .email("dummy@example.com")
                .name("dummyUser")
                .build();
    }

    // Placeholder for dashboard owner check
    public boolean isDashboardOwner(Long dashboardId, String subject) {
        // In a real application, this would check if the user (identified by subject)
        // is the owner of the dashboard with dashboardId.
        // For now, we'll return true for simplicity, assuming the user is the owner
        // if they are authenticated.
        return true;
    }
}