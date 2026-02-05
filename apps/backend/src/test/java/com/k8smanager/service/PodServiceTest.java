package com.k8smanager.service;

import com.k8smanager.dto.PodDTO;
import io.fabric8.kubernetes.api.model.*;
import io.fabric8.kubernetes.client.KubernetesClient;
import io.fabric8.kubernetes.client.dsl.MixedOperation;
import io.fabric8.kubernetes.client.dsl.NonNamespaceOperation;
import io.fabric8.kubernetes.client.dsl.PodResource;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class PodServiceTest {

    @Mock
    private KubernetesClient kubernetesClient;

    @Mock
    private MixedOperation<Pod, PodList, PodResource> podOperations;

    @Mock
    private NonNamespaceOperation<Pod, PodList, PodResource> namespacedPods;

    @Mock
    private PodResource podResource;

    @InjectMocks
    private PodService podService;

    private Pod mockPod;

    @BeforeEach
    void setUp() {
        mockPod = createMockPod("test-pod", "test-ns", "Running");
    }

    @Test
    void testListPods_InNamespace_ShouldReturnPodsFromNamespace() {
        // Given
        String namespace = "test-ns";
        PodList podList = new PodList();
        podList.setItems(List.of(mockPod));

        when(kubernetesClient.pods()).thenReturn(podOperations);
        when(podOperations.inNamespace(eq(namespace))).thenReturn(namespacedPods);
        when(namespacedPods.list()).thenReturn(podList);

        // When
        List<PodDTO> result = podService.listPods(namespace, null);

        // Then
        assertThat(result).isNotNull();
        assertThat(result).hasSize(1);
        assertThat(result.get(0).name()).isEqualTo("test-pod");
        assertThat(result.get(0).namespace()).isEqualTo("test-ns");

        verify(kubernetesClient).pods();
        verify(podOperations).inNamespace(eq(namespace));
        verify(namespacedPods).list();
    }

    @Test
    void testListPods_AllNamespaces_ShouldReturnPodsFromAllNamespaces() {
        // Given
        PodList podList = new PodList();
        podList.setItems(List.of(mockPod));

        when(kubernetesClient.pods()).thenReturn(podOperations);
        when(podOperations.inAnyNamespace()).thenReturn(namespacedPods);
        when(namespacedPods.list()).thenReturn(podList);

        // When
        List<PodDTO> result = podService.listPods(null, null);

        // Then
        assertThat(result).isNotNull();
        assertThat(result).hasSize(1);

        verify(kubernetesClient).pods();
        verify(podOperations).inAnyNamespace();
        verify(namespacedPods).list();
    }

    @Test
    void testListPods_EmptyNamespace_ShouldReturnPodsFromAllNamespaces() {
        // Given
        PodList podList = new PodList();
        podList.setItems(List.of(mockPod));

        when(kubernetesClient.pods()).thenReturn(podOperations);
        when(podOperations.inAnyNamespace()).thenReturn(namespacedPods);
        when(namespacedPods.list()).thenReturn(podList);

        // When
        List<PodDTO> result = podService.listPods("", null);

        // Then
        assertThat(result).isNotNull();
        assertThat(result).hasSize(1);

        verify(podOperations).inAnyNamespace();
    }

    @Test
    void testGetPod_ExistingPod_ShouldReturnPodDto() {
        // Given
        String namespace = "test-ns";
        String podName = "test-pod";

        when(kubernetesClient.pods()).thenReturn(podOperations);
        when(podOperations.inNamespace(eq(namespace))).thenReturn(namespacedPods);
        when(namespacedPods.withName(eq(podName))).thenReturn(podResource);
        when(podResource.get()).thenReturn(mockPod);

        // When
        PodDTO result = podService.getPod(namespace, podName);

        // Then
        assertThat(result).isNotNull();
        assertThat(result.name()).isEqualTo(podName);
        assertThat(result.namespace()).isEqualTo(namespace);

        verify(kubernetesClient).pods();
        verify(podOperations).inNamespace(eq(namespace));
        verify(namespacedPods).withName(eq(podName));
        verify(podResource).get();
    }

    @Test
    void testGetPod_NonExistentPod_ShouldReturnNull() {
        // Given
        String namespace = "test-ns";
        String podName = "non-existent-pod";

        when(kubernetesClient.pods()).thenReturn(podOperations);
        when(podOperations.inNamespace(eq(namespace))).thenReturn(namespacedPods);
        when(namespacedPods.withName(eq(podName))).thenReturn(podResource);
        when(podResource.get()).thenReturn(null);

        // When
        PodDTO result = podService.getPod(namespace, podName);

        // Then
        assertThat(result).isNull();

        verify(podResource).get();
    }

    @Test
    void testListPods_EmptyList_ShouldReturnEmptyList() {
        // Given
        String namespace = "empty-ns";
        PodList podList = new PodList();
        podList.setItems(List.of());

        when(kubernetesClient.pods()).thenReturn(podOperations);
        when(podOperations.inNamespace(eq(namespace))).thenReturn(namespacedPods);
        when(namespacedPods.list()).thenReturn(podList);

        // When
        List<PodDTO> result = podService.listPods(namespace, null);

        // Then
        assertThat(result).isNotNull();
        assertThat(result).isEmpty();
    }

    @Test
    void testListPods_MultiplePods_ShouldReturnAllPods() {
        // Given
        String namespace = "multi-ns";
        Pod pod1 = createMockPod("pod-1", namespace, "Running");
        Pod pod2 = createMockPod("pod-2", namespace, "Pending");
        Pod pod3 = createMockPod("pod-3", namespace, "Failed");

        PodList podList = new PodList();
        podList.setItems(List.of(pod1, pod2, pod3));

        when(kubernetesClient.pods()).thenReturn(podOperations);
        when(podOperations.inNamespace(eq(namespace))).thenReturn(namespacedPods);
        when(namespacedPods.list()).thenReturn(podList);

        // When
        List<PodDTO> result = podService.listPods(namespace, null);

        // Then
        assertThat(result).hasSize(3);
        assertThat(result.stream().map(PodDTO::name)).containsExactly("pod-1", "pod-2", "pod-3");
    }

    // Helper method to create mock Pod
    private Pod createMockPod(String name, String namespace, String phase) {
        Pod pod = new Pod();

        ObjectMeta metadata = new ObjectMeta();
        metadata.setName(name);
        metadata.setNamespace(namespace);
        pod.setMetadata(metadata);

        PodSpec spec = new PodSpec();
        Container container = new Container();
        container.setName("main-container");
        container.setImage("nginx:latest");
        spec.setContainers(List.of(container));
        pod.setSpec(spec);

        PodStatus status = new PodStatus();
        status.setPhase(phase);
        status.setConditions(List.of());
        pod.setStatus(status);

        return pod;
    }
}
