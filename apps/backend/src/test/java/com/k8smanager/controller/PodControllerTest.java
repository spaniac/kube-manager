package com.k8smanager.controller;

import com.k8smanager.common.response.ApiResponse;
import com.k8smanager.dto.PodDTO;
import com.k8smanager.service.EventService;
import com.k8smanager.service.PodService;
import com.k8smanager.service.PodYamlService;
import com.k8smanager.service.ResourceService;
import com.k8smanager.service.WorkloadService;
import io.fabric8.kubernetes.client.KubernetesClient;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class PodControllerTest {

    @Mock
    private PodService podService;
    @Mock
    private EventService eventService;
    @Mock
    private PodYamlService podYamlService;
    @Mock
    private ResourceService resourceService;
    @Mock
    private WorkloadService workloadService;
    @Mock
    private KubernetesClient kubernetesClient;

    @InjectMocks
    private PodController podController;

    @Test
    void testListPods() {
        List<PodDTO> pods = List.of(new PodDTO("pod1", "default", "Running", "Running", "node1", "10.0.0.1", "2d", List.of(), List.of()));
        when(podService.listPods(null, null)).thenReturn(pods);

        ApiResponse<List<PodDTO>> response = podController.listPods(null, null);

        assertThat(response.isSuccess()).isTrue();
        assertThat(response.getData()).isEqualTo(pods);
        verify(podService).listPods(null, null);
    }

    @Test
    void testGetPod() {
        String namespace = "default";
        String name = "pod1";
        PodDTO pod = new PodDTO(name, namespace, "Running", "Running", "node1", "10.0.0.1", "2d", List.of(), List.of());
        when(podService.getPod(namespace, name)).thenReturn(pod);

        ApiResponse<PodDTO> response = podController.getPod(namespace, name);

        assertThat(response.isSuccess()).isTrue();
        assertThat(response.getData()).isEqualTo(pod);
        verify(podService).getPod(namespace, name);
    }

    @Test
    void testDeletePod() {
        String namespace = "default";
        String name = "pod1";

        ApiResponse<Void> response = podController.deletePod(namespace, name);

        assertThat(response.isSuccess()).isTrue();
        assertThat(response.getMessage()).contains("deleted");
        verify(resourceService).deleteResource("pods", namespace, name);
    }
}
