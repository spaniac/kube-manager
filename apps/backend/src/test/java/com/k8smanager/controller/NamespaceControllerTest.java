package com.k8smanager.controller;

import com.k8smanager.common.response.ApiResponse;
import com.k8smanager.dto.NamespaceDTO;
import com.k8smanager.dto.NamespaceRequestDTO;
import com.k8smanager.dto.ResourceQuotaDTO;
import com.k8smanager.service.NamespaceService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Map;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class NamespaceControllerTest {

    @Mock
    private NamespaceService namespaceService;

    @InjectMocks
    private NamespaceController namespaceController;

    @Test
    void testListNamespaces() {
        List<NamespaceDTO> namespaces = List.of(new NamespaceDTO("default", "Active", "2023-01-01", Map.of(), Map.of()));
        when(namespaceService.searchNamespaces(null)).thenReturn(namespaces);

        ResponseEntity<ApiResponse<List<NamespaceDTO>>> response = namespaceController.listNamespaces(null);

        assertThat(response.getStatusCode().is2xxSuccessful()).isTrue();
        assertThat(response.getBody().getData()).isEqualTo(namespaces);
        verify(namespaceService).searchNamespaces(null);
    }

    @Test
    void testGetNamespace() {
        String name = "default";
        NamespaceDTO namespace = new NamespaceDTO(name, "Active", "2023-01-01", Map.of(), Map.of());
        when(namespaceService.getNamespace(name)).thenReturn(namespace);

        ResponseEntity<ApiResponse<NamespaceDTO>> response = namespaceController.getNamespace(name);

        assertThat(response.getStatusCode().is2xxSuccessful()).isTrue();
        assertThat(response.getBody().getData()).isEqualTo(namespace);
        verify(namespaceService).getNamespace(name);
    }

    @Test
    void testCreateNamespace() {
        NamespaceRequestDTO request = new NamespaceRequestDTO("new-ns", Map.of(), Map.of());
        NamespaceDTO namespace = new NamespaceDTO("new-ns", "Active", "2023-01-01", Map.of(), Map.of());
        when(namespaceService.createNamespace(request)).thenReturn(namespace);

        ResponseEntity<ApiResponse<NamespaceDTO>> response = namespaceController.createNamespace(request);

        assertThat(response.getStatusCode().is2xxSuccessful()).isTrue();
        assertThat(response.getBody().getData()).isEqualTo(namespace);
        verify(namespaceService).createNamespace(request);
    }

    @Test
    void testUpdateNamespace() {
        String name = "test-ns";
        NamespaceRequestDTO request = new NamespaceRequestDTO(name, Map.of(), Map.of());
        NamespaceDTO namespace = new NamespaceDTO(name, "Active", "2023-01-01", Map.of(), Map.of());
        when(namespaceService.updateNamespace(name, request)).thenReturn(namespace);

        ResponseEntity<ApiResponse<NamespaceDTO>> response = namespaceController.updateNamespace(name, request);

        assertThat(response.getStatusCode().is2xxSuccessful()).isTrue();
        assertThat(response.getBody().getData()).isEqualTo(namespace);
        verify(namespaceService).updateNamespace(name, request);
    }

    @Test
    void testDeleteNamespace() {
        String name = "test-ns";

        ResponseEntity<ApiResponse<Void>> response = namespaceController.deleteNamespace(name, false, 0);

        assertThat(response.getStatusCode().is2xxSuccessful()).isTrue();
        assertThat(response.getBody().getMessage()).contains("deleted");
        verify(namespaceService).deleteNamespace(name);
    }

    @Test
    void testGetNamespaceQuota() {
        String name = "test-ns";
        ResourceQuotaDTO quota = new ResourceQuotaDTO("quota", name, Map.of(), Map.of());
        when(namespaceService.getNamespaceQuota(name)).thenReturn(quota);

        ResponseEntity<ApiResponse<ResourceQuotaDTO>> response = namespaceController.getNamespaceQuota(name);

        assertThat(response.getStatusCode().is2xxSuccessful()).isTrue();
        assertThat(response.getBody().getData()).isEqualTo(quota);
        verify(namespaceService).getNamespaceQuota(name);
    }
}
