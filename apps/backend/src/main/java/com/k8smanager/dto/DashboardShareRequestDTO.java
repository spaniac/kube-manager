package com.k8smanager.dto;

import java.time.LocalDateTime;
import java.util.List;

public class DashboardShareRequestDTO {

    public enum Visibility {
        PRIVATE,
        TEAM,
        PUBLIC
    }

    private Visibility visibility;
    private List<String> shareWithEmails;
    private LocalDateTime expiresAt;


    public Visibility getVisibility() {
        return visibility;
    }

    public void setVisibility(Visibility visibility) {
        this.visibility = visibility;
    }

    public List<String> getShareWithEmails() {
        return shareWithEmails;
    }

    public void setShareWithEmails(List<String> shareWithEmails) {
        this.shareWithEmails = shareWithEmails;
    }

    public LocalDateTime getExpiresAt() {
        return expiresAt;
    }

    public void setExpiresAt(LocalDateTime expiresAt) {
        this.expiresAt = expiresAt;
    }
}
