package com.k8smanager.persistence.repository;

import com.k8smanager.persistence.entity.DashboardWidget;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DashboardWidgetRepository extends JpaRepository<DashboardWidget, Long> {
}
