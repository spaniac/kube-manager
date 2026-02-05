package com.k8smanager.controller;

import com.k8smanager.common.response.ApiResponse;
import com.k8smanager.dto.*;
import com.k8smanager.service.WorkloadService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Map;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class WorkloadControllerTest {

    @Mock
    private WorkloadService workloadService;

    @InjectMocks
    private WorkloadController workloadController;

    @Test
    void testListDeployments() {
        ResourceListDTO<DeploymentDTO> deployments = new ResourceListDTO<>("Deployment", "apps/v1", List.of(), new ResourceListMetaDTO(0, "", 0));
        when(workloadService.listDeployments(null, null)).thenReturn(deployments);

        ResponseEntity<ApiResponse<ResourceListDTO<DeploymentDTO>>> response = workloadController.listDeployments(null, null);

        assertThat(response.getStatusCode().is2xxSuccessful()).isTrue();
        assertThat(response.getBody().getData()).isEqualTo(deployments);
        verify(workloadService).listDeployments(null, null);
    }

    @Test
    void testGetDeployment() {
        String namespace = "default";
        String name = "test-deploy";
        DeploymentDTO deployment = new DeploymentDTO(name, namespace, 1, 1, 1, 0, "RollingUpdate", "app=test", null);
        when(workloadService.getDeployment(namespace, name)).thenReturn(deployment);

        ResponseEntity<ApiResponse<DeploymentDTO>> response = workloadController.getDeployment(namespace, name);

        assertThat(response.getStatusCode().is2xxSuccessful()).isTrue();
        assertThat(response.getBody().getData()).isEqualTo(deployment);
        verify(workloadService).getDeployment(namespace, name);
    }

    @Test
    void testDeleteDeployment() {
        String namespace = "default";
        String name = "test-deploy";
        when(workloadService.deleteDeployment(namespace, name)).thenReturn(true);

        ResponseEntity<ApiResponse<Void>> response = workloadController.deleteDeployment(namespace, name);

        assertThat(response.getStatusCode().is2xxSuccessful()).isTrue();
        assertThat(response.getBody().getMessage()).contains("deleted");
        verify(workloadService).deleteDeployment(namespace, name);
    }

    @Test
    void testScaleDeployment() {
        String namespace = "default";
        String name = "test-deploy";
        ScaleDeploymentRequestDTO request = new ScaleDeploymentRequestDTO(5);
        DeploymentDTO deployment = new DeploymentDTO(name, namespace, 5, 1, 1, 0, "RollingUpdate", "app=test", null);
        
        when(workloadService.scaleDeployment(namespace, name, 5)).thenReturn(deployment);

        ResponseEntity<ApiResponse<DeploymentDTO>> response = workloadController.scaleDeployment(namespace, name, request);

        assertThat(response.getStatusCode().is2xxSuccessful()).isTrue();
        assertThat(response.getBody().getData()).isEqualTo(deployment);
        verify(workloadService).scaleDeployment(namespace, name, 5);
    }

    @Test
    void testRestartDeployment() {
        String namespace = "default";
        String name = "test-deploy";
        DeploymentDTO deployment = new DeploymentDTO(name, namespace, 1, 1, 1, 0, "RollingUpdate", "app=test", null);
        
        when(workloadService.restartDeployment(namespace, name)).thenReturn(deployment);

        ResponseEntity<ApiResponse<DeploymentDTO>> response = workloadController.restartDeployment(namespace, name);

        assertThat(response.getStatusCode().is2xxSuccessful()).isTrue();
        assertThat(response.getBody().getData()).isEqualTo(deployment);
        verify(workloadService).restartDeployment(namespace, name);
    }

    @Test
    void testCreateJob() {
        JobRequestDTO request = new JobRequestDTO("job1", "default", List.of(), Map.of(), Map.of(), 1, 1, 6, 60);
        JobDTO job = new JobDTO("job1", "default", "Active", 1, 1, 0, 0, null);
        
        when(workloadService.createJob("default", request)).thenReturn(job);

        ResponseEntity<ApiResponse<JobDTO>> response = workloadController.createJob(request);

        assertThat(response.getStatusCode().is2xxSuccessful()).isTrue();
        assertThat(response.getBody().getData()).isEqualTo(job);
    }
}
