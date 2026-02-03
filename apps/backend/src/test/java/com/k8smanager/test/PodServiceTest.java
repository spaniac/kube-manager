package com.k8smanager.test;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;

import io.fabric8.kubernetes.api.model.Container;
import io.fabric8.kubernetes.api.model.Pod;
import io.fabric8.kubernetes.api.model.PodList;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.k8smanager.dto.PodDTO;
import com.k8smanager.service.PodService;

@ExtendWith(MockitoExtension.class)
class PodServiceTest {

    @Mock
    private io.fabric8.kubernetes.client.KubernetesClient kubernetesClient;

    @InjectMocks
    private PodService podService;

    private Pod mockPod;

    @BeforeEach
    void setUp() {
        mockPod = mock(Pod.class);
    }

    @Test
    void testListPods_InNamespace_ShouldReturnPodsFromNamespace() {
        // Given
        String namespace = "test-ns";
        PodList podList = new PodList();
        podList.setItems(List.of(mockPod));

        when(kubernetesClient.pods().inNamespace(eq(namespace))).thenReturn(podList);

        // When
        List<PodDTO> result = podService.listPods(namespace, null);

        // Then
        assertThat(result).isNotNull();
        assertThat(result).hasSize(1);
        assertThat(result.get(0).getName()).isEqualTo(mockPod.getMetadata().getName());
        assertThat(result.get(0).getNamespace()).isEqualTo(namespace);

        verify(kubernetesClient, times(1)).pods().inNamespace(eq(namespace));
    }

    @Test
    void testListPods_AllNamespaces_ShouldReturnPodsFromAllNamespaces() {
        // Given
        PodList podList = new PodList();
        podList.setItems(List.of(mockPod));

        when(kubernetesClient.pods().inAnyNamespace()).thenReturn(podList);

        // When
        List<PodDTO> result = podService.listPods(null, null);

        // Then
        assertThat(result).isNotNull();
        assertThat(result).hasSize(1);
        verify(kubernetesClient, times(1)).pods().inAnyNamespace();
    }

    @Test
    void testListPods_WithLabelSelector_ShouldReturnFilteredPods() {
        // Given
        String namespace = "test-ns";
        String labelSelector = "app=nginx";
        PodList podList = new PodList();
        podList.setItems(List.of(mockPod));

        when(kubernetesClient.pods().inNamespace(eq(namespace))).thenReturn(podList);

        // When
        List<PodDTO> result = podService.listPods(namespace, labelSelector);

        // Then
        assertThat(result).isNotNull();
        assertThat(result).hasSize(1);
        verify(kubernetesClient, times(1)).pods().inNamespace(eq(namespace));
    }

    @Test
    void testGetPod_ExistingPod_ShouldReturnPodDto() {
        // Given
        String namespace = "test-ns";
        String podName = "test-pod";
        PodList podList = new PodList();
        podList.setItems(List.of(mockPod));

        when(kubernetesClient.pods().inNamespace(eq(namespace))).thenReturn(podList);
        when(kubernetesClient.pods().inNamespace(eq(namespace)).withName(eq(podName))).thenReturn(mockPod);

        // When
        PodDTO result = podService.getPod(namespace, podName);

        // Then
        assertThat(result).isNotNull();
        assertThat(result.getName()).isEqualTo(podName);
        assertThat(result.getNamespace()).isEqualTo(namespace);

        verify(kubernetesClient, times(1)).pods().inNamespace(eq(namespace));
        verify(kubernetesClient, times(1)).pods().inNamespace(eq(namespace)).withName(eq(podName));
    }

    @Test
    void testGetPod_NonExistentPod_ShouldReturnNull() {
        // Given
        String namespace = "test-ns";
        String podName = "non-existent-pod";
        PodList podList = new PodList();
        podList.setItems(List.of());

        when(kubernetesClient.pods().inNamespace(eq(namespace))).thenReturn(podList);

        // When
        PodDTO result = podService.getPod(namespace, podName);

        // Then
        assertThat(result).isNull();

        verify(kubernetesClient, times(1)).pods().inNamespace(eq(namespace));
        verify(kubernetesClient, never()).pods().inNamespace(any());
    }
}
