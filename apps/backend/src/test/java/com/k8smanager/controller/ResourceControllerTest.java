package com.k8smanager.controller;

import com.k8smanager.common.response.ApiResponse;
import com.k8smanager.dto.*;
import com.k8smanager.service.ResourceService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.ResponseEntity;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.doReturn;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class ResourceControllerTest {

    @Mock
    private ResourceService resourceService;

    @InjectMocks
    private ResourceController resourceController;

    @Test
    void testListResources() {
        String type = "deployments";
        ResourceListDTO<?> resourceList = new ResourceListDTO<>("Deployment", "apps/v1", List.of(), null);
        doReturn(resourceList).when(resourceService).listResources(type, null, null, null, null);

        ResponseEntity<ApiResponse<?>> response = resourceController.listResources(type, null, null, null, null);

        assertThat(response.getStatusCode().is2xxSuccessful()).isTrue();
        assertThat(response.getBody().getData()).isEqualTo(resourceList);
    }

    @Test
    void testGetResource() {
        String type = "deployments";
        String name = "test-deploy";
        String namespace = "default";
        DeploymentDTO deployment = new DeploymentDTO(name, namespace, 1, 1, 1, 0, "RollingUpdate", null, null);
        
        when(resourceService.getResource(type, namespace, name)).thenReturn(deployment);

        ResponseEntity<ApiResponse<?>> response = resourceController.getResource(type, name, namespace);

        assertThat(response.getStatusCode().is2xxSuccessful()).isTrue();
        assertThat(response.getBody().getData()).isEqualTo(deployment);
    }

    @Test
    void testUpdateResource() {
        String type = "deployments";
        String name = "test-deploy";
        String namespace = "default";
        DeploymentDTO updatedDeployment = new DeploymentDTO(name, namespace, 2, 2, 2, 0, "RollingUpdate", null, null);
        Object payload = new Object();
        
        when(resourceService.updateResource(type, namespace, name, payload)).thenReturn(updatedDeployment);

        ResponseEntity<ApiResponse<?>> response = resourceController.updateResource(type, name, namespace, payload);

        assertThat(response.getStatusCode().is2xxSuccessful()).isTrue();
        assertThat(response.getBody().getData()).isEqualTo(updatedDeployment);
    }

    @Test
    void testDeleteResource() {
        String type = "deployments";
        String name = "test-deploy";
        String namespace = "default";

        ResponseEntity<ApiResponse<Void>> response = resourceController.deleteResource(type, name, namespace);

        assertThat(response.getStatusCode().is2xxSuccessful()).isTrue();
        verify(resourceService).deleteResource(type, namespace, name);
    }

    @Test
    void testGetStatusBadge() {
        String type = "deployments";
        String name = "test-deploy";
        String namespace = "default";
        StatusBadgeDTO badge = new StatusBadgeDTO("Running", "success", "Running", "OK", "check", "green");
        
        when(resourceService.getStatusBadge(type, namespace, name)).thenReturn(badge);

        ResponseEntity<ApiResponse<?>> response = resourceController.getStatusBadge(type, name, namespace);

        assertThat(response.getStatusCode().is2xxSuccessful()).isTrue();
        assertThat(response.getBody().getData()).isEqualTo(badge);
    }
}
