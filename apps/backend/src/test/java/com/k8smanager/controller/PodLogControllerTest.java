package com.k8smanager.controller;

import com.k8smanager.common.response.ApiResponse;
import io.fabric8.kubernetes.api.model.Container;
import io.fabric8.kubernetes.api.model.Pod;
import io.fabric8.kubernetes.api.model.PodSpec;
import io.fabric8.kubernetes.client.KubernetesClient;
import io.fabric8.kubernetes.client.dsl.LogWatch;
import io.fabric8.kubernetes.client.dsl.MixedOperation;
import io.fabric8.kubernetes.client.dsl.NonNamespaceOperation;
import io.fabric8.kubernetes.client.dsl.PodResource;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
@SuppressWarnings({"unchecked", "rawtypes"})
class PodLogControllerTest {

    @Mock
    private KubernetesClient kubernetesClient;

    @Mock
    private MixedOperation<Pod, io.fabric8.kubernetes.api.model.PodList, PodResource> podOperation;

    @Mock
    private NonNamespaceOperation<Pod, io.fabric8.kubernetes.api.model.PodList, PodResource> namespacedPodOp;

    @Mock
    private PodResource podResource;

    @Mock
    private LogWatch logWatch;

    @InjectMocks
    private PodLogController podLogController;

    @BeforeEach
    void setUp() {
        lenient().when(kubernetesClient.pods()).thenReturn(podOperation);
    }

    @Test
    void testStreamPodLogs() throws IOException {
        String namespace = "test-ns";
        String name = "test-pod";
        String logContent = "Log line 1\nLog line 2\nError line";
        
        Pod pod = new Pod();
        PodSpec spec = new PodSpec();
        spec.setContainers(List.of(new Container()));
        pod.setSpec(spec);

        when(podOperation.inNamespace(namespace)).thenReturn(namespacedPodOp);
        when(namespacedPodOp.withName(name)).thenReturn(podResource);
        when(podResource.get()).thenReturn(pod);
        when(podResource.watchLog()).thenReturn(logWatch);
        when(logWatch.getOutput()).thenReturn(new ByteArrayInputStream(logContent.getBytes(StandardCharsets.UTF_8)));

        SseEmitter emitter = podLogController.streamPodLogs(namespace, name, null, false, 100, null, null, null, null);

        assertThat(emitter).isNotNull();
        // Since SseEmitter is async, we can't easily assert the sent data without a custom SseEmitter subclass or capturing the output.
        // But verifying that the mocks were called is a good start.
        verify(podResource).watchLog();
        verify(logWatch).getOutput();
    }

    @Test
    void testStreamPodLogsNotFound() {
        String namespace = "test-ns";
        String name = "non-existent";

        when(podOperation.inNamespace(namespace)).thenReturn(namespacedPodOp);
        when(namespacedPodOp.withName(name)).thenReturn(podResource);
        when(podResource.get()).thenReturn(null);

        SseEmitter emitter = podLogController.streamPodLogs(namespace, name, null, false, 100, null, null, null, null);

        assertThat(emitter).isNotNull();
        // Should complete immediately
    }
}
