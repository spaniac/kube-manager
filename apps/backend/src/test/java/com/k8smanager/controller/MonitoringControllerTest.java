package com.k8smanager.controller;

import com.k8smanager.common.response.ApiResponse;
import com.k8smanager.dto.*;
import com.k8smanager.service.MonitoringService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.jwt.Jwt;

import java.util.Collections;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class MonitoringControllerTest {

    @Mock
    private MonitoringService monitoringService;

    @Mock
    private Jwt jwt;

    @InjectMocks
    private MonitoringController monitoringController;

    @Test
    void testGetPodMetrics() {
        String namespace = "test-ns";
        String name = "test-pod";
        MetricsResponseDTO metrics = new MetricsResponseDTO(List.of(), null);
        when(monitoringService.getPodMetrics(namespace, name, "cpu")).thenReturn(metrics);

        ResponseEntity<ApiResponse<MetricsResponseDTO>> response = monitoringController.getPodMetrics(namespace, name, "cpu");

        assertThat(response.getStatusCode().is2xxSuccessful()).isTrue();
        assertThat(response.getBody().getData()).isEqualTo(metrics);
        verify(monitoringService).getPodMetrics(namespace, name, "cpu");
    }

    @Test
    void testGetNodeMetrics() {
        String name = "test-node";
        MetricsResponseDTO metrics = new MetricsResponseDTO(List.of(), null);
        when(monitoringService.getNodeMetrics(name, "memory")).thenReturn(metrics);

        ResponseEntity<ApiResponse<MetricsResponseDTO>> response = monitoringController.getNodeMetrics(name, "memory");

        assertThat(response.getStatusCode().is2xxSuccessful()).isTrue();
        assertThat(response.getBody().getData()).isEqualTo(metrics);
        verify(monitoringService).getNodeMetrics(name, "memory");
    }

    @Test
    void testGetWorkloadMetrics() {
        String kind = "Deployment";
        String namespace = "test-ns";
        String name = "test-deploy";
        MetricsResponseDTO metrics = new MetricsResponseDTO(List.of(), null);
        when(monitoringService.getWorkloadMetrics(kind, namespace, name, "cpu")).thenReturn(metrics);

        ResponseEntity<ApiResponse<MetricsResponseDTO>> response = monitoringController.getWorkloadMetrics(kind, namespace, name, "cpu");

        assertThat(response.getStatusCode().is2xxSuccessful()).isTrue();
        assertThat(response.getBody().getData()).isEqualTo(metrics);
        verify(monitoringService).getWorkloadMetrics(kind, namespace, name, "cpu");
    }

    @Test
    void testExecutePromQLQuery() {
        PromQLQueryRequestDTO request = new PromQLQueryRequestDTO("up", "1h");
        PromQLQueryResultDTO result = new PromQLQueryResultDTO("up", "1h", List.of(), null, null);
        
        when(monitoringService.executePromQLQuery("up", "1h")).thenReturn(result);

        ResponseEntity<ApiResponse<PromQLQueryResultDTO>> response = monitoringController.executePromQLQuery(request, jwt);

        assertThat(response.getStatusCode().is2xxSuccessful()).isTrue();
        assertThat(response.getBody().getData()).isEqualTo(result);
        verify(monitoringService).executePromQLQuery("up", "1h");
    }

    @Test
    void testConfigureAlertThreshold() {
        AlertThresholdDTO request = new AlertThresholdDTO("cpu", "above", 80.0, ">", "WARNING", List.of(), true, "High CPU");
        when(monitoringService.configureAlertThreshold(request)).thenReturn(true);

        ResponseEntity<ApiResponse<Void>> response = monitoringController.configureAlertThreshold(request, jwt);

        assertThat(response.getStatusCode().is2xxSuccessful()).isTrue();
        verify(monitoringService).configureAlertThreshold(request);
    }

    @Test
    void testGetAlertHistory() {
        String namespace = "test-ns";
        List<AlertDTO> alerts = Collections.emptyList();
        when(monitoringService.getAlertHistory(namespace, null)).thenReturn(alerts);

        ResponseEntity<ApiResponse<List<AlertDTO>>> response = monitoringController.getAlertHistory(namespace, null, jwt);

        assertThat(response.getStatusCode().is2xxSuccessful()).isTrue();
        assertThat(response.getBody().getData()).isEqualTo(alerts);
        verify(monitoringService).getAlertHistory(namespace, null);
    }

    @Test
    void testDetectAnomalies() {
        AnomalyDetectionRequestDTO request = new AnomalyDetectionRequestDTO("cpu", "test-ns", "test-pod", "1h", 0.5);
        List<AnomalyDetectionDTO> anomalies = Collections.emptyList();
        when(monitoringService.detectAnomalies(request)).thenReturn(anomalies);

        ResponseEntity<ApiResponse<List<AnomalyDetectionDTO>>> response = monitoringController.detectAnomalies(request, jwt);

        assertThat(response.getStatusCode().is2xxSuccessful()).isTrue();
        assertThat(response.getBody().getData()).isEqualTo(anomalies);
        verify(monitoringService).detectAnomalies(request);
    }

    @Test
    void testAcknowledgeAlert() {
        Long alertId = 123L;
        when(monitoringService.acknowledgeAlert(alertId)).thenReturn(true);

        ResponseEntity<ApiResponse<Void>> response = monitoringController.acknowledgeAlert(alertId, jwt);

        assertThat(response.getStatusCode().is2xxSuccessful()).isTrue();
        verify(monitoringService).acknowledgeAlert(alertId);
    }
}
