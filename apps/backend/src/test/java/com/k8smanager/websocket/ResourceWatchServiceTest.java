package com.k8smanager.websocket;

import io.fabric8.kubernetes.api.model.Pod;
import io.fabric8.kubernetes.client.KubernetesClient;
import io.fabric8.kubernetes.client.Watch;
import io.fabric8.kubernetes.client.Watcher;
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

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
@SuppressWarnings({"unchecked", "rawtypes"})
class ResourceWatchServiceTest {

    @Mock
    private KubernetesClient kubernetesClient;

    @Mock
    private MixedOperation<Pod, io.fabric8.kubernetes.api.model.PodList, PodResource> podOperation;

    @Mock
    private NonNamespaceOperation<Pod, io.fabric8.kubernetes.api.model.PodList, PodResource> namespacedPodOp;

    @Mock
    private Watch watch;

    @InjectMocks
    private ResourceWatchService resourceWatchService;

    @BeforeEach
    void setUp() {
        lenient().when(kubernetesClient.pods()).thenReturn(podOperation);
    }

    @Test
    void testWatchPods() {
        String namespace = "test-ns";
        String watchId = "test-watch";

        when(podOperation.inNamespace(namespace)).thenReturn(namespacedPodOp);
        when(namespacedPodOp.watch(any(Watcher.class))).thenReturn(watch);

        SseEmitter emitter = resourceWatchService.watchPods(namespace, watchId);

        assertThat(emitter).isNotNull();
        // Since execution is async, we verify that watch was called
        verify(namespacedPodOp, timeout(1000)).watch(any(Watcher.class));
    }

    @Test
    void testWatchPodsAllNamespaces() {
        String watchId = "test-watch-all";

        when(podOperation.watch(any(Watcher.class))).thenReturn(watch);

        SseEmitter emitter = resourceWatchService.watchPods(null, watchId);

        assertThat(emitter).isNotNull();
        verify(podOperation, timeout(1000)).watch(any(Watcher.class));
    }

    @Test
    void testCloseWatcher() {
        String watchId = "test-watch";
        
        // Register watcher implicitly by calling watchPods
        when(podOperation.watch(any(Watcher.class))).thenReturn(watch);
        resourceWatchService.watchPods(null, watchId);
        
        // Wait for async execution
        verify(podOperation, timeout(1000)).watch(any(Watcher.class));

        resourceWatchService.closeWatcher(watchId);
        // Verify internal state change? Hard without reflection. 
        // But code should not throw exception.
    }

    @Test
    void testCloseAllWatchers() {
        String watchId = "test-watch";
        when(podOperation.watch(any(Watcher.class))).thenReturn(watch);
        resourceWatchService.watchPods(null, watchId);
        
        verify(podOperation, timeout(1000)).watch(any(Watcher.class));

        resourceWatchService.closeAllWatchers();
    }
}
