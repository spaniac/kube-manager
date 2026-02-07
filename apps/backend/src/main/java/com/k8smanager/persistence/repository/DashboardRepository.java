package com.k8smanager.persistence.repository;

import com.k8smanager.persistence.entity.Dashboard;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface DashboardRepository extends JpaRepository<Dashboard, Long> {
    Optional<Dashboard> findByShareToken(String shareToken);
}
