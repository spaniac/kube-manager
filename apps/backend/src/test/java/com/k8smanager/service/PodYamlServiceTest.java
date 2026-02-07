package com.k8smanager.service;

import com.k8smanager.dto.PodDTO;
import com.k8smanager.k8s.K8sMapper;
import io.fabric8.kubernetes.api.model.Pod;
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
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.lenient;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
@SuppressWarnings({"unchecked", "rawtypes"})
class PodYamlServiceTest {

    @Mock
    private KubernetesClient kubernetesClient;

    @Mock
    private K8sMapper k8sMapper;

    @Mock
    private MixedOperation<Pod, io.fabric8.kubernetes.api.model.PodList, PodResource> podOperation;

    @Mock
    private NonNamespaceOperation<Pod, io.fabric8.kubernetes.api.model.PodList, PodResource> namespacedPodOp;

    @Mock
    private PodResource podResource;

    @InjectMocks
    private PodYamlService podYamlService;

    @BeforeEach
    void setUp() {
        lenient().when(kubernetesClient.pods()).thenReturn(podOperation);
    }

    @Test
    void testGetPodAsYaml() {
        String namespace = "test-ns";
        String name = "test-pod";
        Pod pod = new Pod();
        PodDTO podDto = new PodDTO(name, namespace, "Running", "Running", "node1", "10.0.0.1", "2d", List.of(), List.of());

        when(podOperation.inNamespace(namespace)).thenReturn(namespacedPodOp);
        when(namespacedPodOp.withName(name)).thenReturn(podResource);
        when(podResource.get()).thenReturn(pod);
        when(k8sMapper.mapToPodDto(any(Pod.class))).thenReturn(podDto);

        String yaml = podYamlService.getPodAsYaml(namespace, name);

        assertThat(yaml).isNotNull();
        assertThat(yaml).contains("apiVersion: v1");
        assertThat(yaml).contains("kind: Pod");
        assertThat(yaml).contains("name: " + name);
        assertThat(yaml).contains("namespace: " + namespace);
    }

    @Test
    void testGetPodAsYamlNotFound() {
        String namespace = "test-ns";
        String name = "non-existent";

        when(podOperation.inNamespace(namespace)).thenReturn(namespacedPodOp);
        when(namespacedPodOp.withName(name)).thenReturn(podResource);
        when(podResource.get()).thenReturn(null);

        String yaml = podYamlService.getPodAsYaml(namespace, name);

        assertThat(yaml).isNull();
    }
}
