package com.k8smanager.controller;

import com.k8smanager.common.response.ApiResponse;
import com.k8smanager.service.PodYamlService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.ResponseEntity;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class PodYamlControllerTest {

    @Mock
    private PodYamlService podYamlService;

    @InjectMocks
    private PodYamlController podYamlController;

    @Test
    void testGetPodYaml() {
        String namespace = "test-ns";
        String name = "test-pod";
        String yaml = "apiVersion: v1\nkind: Pod";

        when(podYamlService.getPodAsYaml(namespace, name)).thenReturn(yaml);

        ResponseEntity<ApiResponse<String>> response = podYamlController.getPodYaml(namespace, name);

        assertThat(response.getStatusCode().is2xxSuccessful()).isTrue();
        assertThat(response.getBody().getData()).isEqualTo(yaml);
    }

    @Test
    void testGetPodYamlNotFound() {
        String namespace = "test-ns";
        String name = "non-existent";

        when(podYamlService.getPodAsYaml(namespace, name)).thenReturn(null);

        ResponseEntity<ApiResponse<String>> response = podYamlController.getPodYaml(namespace, name);

        assertThat(response.getStatusCode().is4xxClientError()).isTrue();
    }
}
