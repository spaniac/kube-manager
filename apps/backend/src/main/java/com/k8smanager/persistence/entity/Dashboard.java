package com.k8smanager.persistence.entity;

import com.k8smanager.dto.DashboardShareRequestDTO;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import jakarta.persistence.*;
import java.time.Instant;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "dashboards", indexes = {
        @Index(name = "idx_dashboard_owner_id", columnList = "owner_id"),

        @Index(name = "idx_dashboard_created_at", columnList = "created_at"),
        @Index(name = "idx_dashboard_visibility", columnList = "visibility"),
        @Index(name = "idx_dashboard_share_token", columnList = "share_token", unique = true)
})
public class Dashboard {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    private String description;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "owner_id", nullable = false)
    private User owner;



    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private Instant createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at", nullable = false)
    private Instant updatedAt;

    @OneToMany(mappedBy = "dashboard", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<DashboardWidget> widgets;
}
