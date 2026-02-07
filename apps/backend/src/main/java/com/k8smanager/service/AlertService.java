package com.k8smanager.service;

import com.k8smanager.dto.AlertDTO;
import com.k8smanager.dto.AlertListResponseDTO;
import com.k8smanager.persistence.entity.Alert;
import com.k8smanager.persistence.repository.AlertRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.List;
import java.util.Optional;

/**
 * Service for persisted alert operations.
 */
@Service
public class AlertService {

    private final AlertRepository alertRepository;

    public AlertService(AlertRepository alertRepository) {
        this.alertRepository = alertRepository;
    }

    public List<AlertDTO> getAlerts() {
        return alertRepository.findAll(Sort.by(Sort.Direction.DESC, "createdAt"))
                .stream()
                .map(this::toDto)
                .toList();
    }

    public AlertDTO getAlert(Long id) {
        return alertRepository.findById(id)
                .map(this::toDto)
                .orElse(null);
    }

    public AlertListResponseDTO getAlertHistory(
            String namespace,
            String severity,
            Boolean acknowledged,
            int page,
            int size
    ) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "createdAt"));
        Specification<Alert> specification = Specification.where(null);

        if (namespace != null && !namespace.isBlank()) {
            specification = specification.and((root, query, cb) -> cb.equal(root.get("namespace"), namespace));
        }

        if (severity != null && !severity.isBlank()) {
            specification = specification.and((root, query, cb) -> cb.equal(root.get("severity"), severity));
        }

        if (acknowledged != null) {
            specification = specification.and((root, query, cb) -> cb.equal(root.get("acknowledged"), acknowledged));
        }

        Page<Alert> alertsPage = alertRepository.findAll(specification, pageable);
        List<AlertDTO> alerts = alertsPage.getContent().stream().map(this::toDto).toList();

        return new AlertListResponseDTO(
                alerts,
                alertsPage.getNumber(),
                alertsPage.getSize(),
                alertsPage.getTotalElements(),
                alertsPage.getTotalPages()
        );
    }

    @Transactional
    public AlertDTO acknowledgeAlert(Long id, String acknowledgedBy) {
        Optional<Alert> alertOptional = alertRepository.findById(id);
        if (alertOptional.isEmpty()) {
            return null;
        }

        Alert alert = alertOptional.get();
        alert.setAcknowledged(true);
        alert.setAcknowledgedAt(Instant.now());
        alert.setAcknowledgedBy(acknowledgedBy);

        return toDto(alertRepository.save(alert));
    }

    @Transactional
    public boolean deleteAlert(Long id) {
        if (!alertRepository.existsById(id)) {
            return false;
        }

        alertRepository.deleteById(id);
        return true;
    }

    private AlertDTO toDto(Alert alert) {
        return new AlertDTO(
                alert.getId(),
                alert.getMetricType(),
                alert.getCondition(),
                alert.getCurrentValue(),
                alert.getThresholdValue(),
                alert.getSeverity(),
                alert.getCreatedAt(),
                alert.getNamespace(),
                alert.getResourceName(),
                alert.getMessage(),
                alert.getAcknowledged(),
                alert.getSource()
        );
    }
}
