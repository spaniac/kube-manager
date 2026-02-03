package com.k8smanager.websocket;

import io.fabric8.kubernetes.api.model.Pod;
import io.fabric8.kubernetes.client.KubernetesClient;
import io.fabric8.kubernetes.client.Watcher;
import io.fabric8.kubernetes.client.WatcherException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

/**
 * Service for watching Kubernetes resources and streaming events via SSE.
 */
@Service
public class ResourceWatchService {

    private static final Logger logger = LoggerFactory.getLogger(ResourceWatchService.class);

    private final KubernetesClient kubernetesClient;
    private final ExecutorService executorService = Executors.newCachedThreadPool();

    // Store active watchers by ID
    private final ConcurrentHashMap<String, Watcher<?>> activeWatchers = new ConcurrentHashMap<>();

    public ResourceWatchService(KubernetesClient kubernetesClient) {
        this.kubernetesClient = kubernetesClient;
    }

    /**
     * Watch pods in a namespace and stream events via SSE.
     */
    public SseEmitter watchPods(String namespace, String watchId) {
        SseEmitter emitter = new SseEmitter(60000L); // 60 second timeout

        executorService.submit(() -> {
            try {
                Watcher<Pod> watcher = new Watcher<>() {
                    @Override
                    public void eventReceived(Action action, Pod pod) {
                        try {
                            emitter.send(SseEmitter.event()
                                    .name("pod")
                                    .data(action + ": " + pod.getMetadata().getName()));
                        } catch (IOException e) {
                            logger.error("Failed to send SSE event: {}", e.getMessage());
                            emitter.completeWithError(e);
                        }
                    }

                    @Override
                    public void onClose(WatcherException cause) {
                        logger.info("Watcher closed for watchId: {}", watchId);
                        if (cause != null) {
                            logger.warn("Watcher closed with error", cause);
                            emitter.completeWithError(cause);
                        } else {
                            emitter.complete();
                        }
                        activeWatchers.remove(watchId);
                    }
                };

                activeWatchers.put(watchId, watcher);

                if (namespace != null && !namespace.isEmpty()) {
                    kubernetesClient.pods()
                            .inNamespace(namespace)
                            .watch(watcher);
                } else {
                    kubernetesClient.pods().watch(watcher);
                }

            } catch (Exception e) {
                logger.error("Error watching pods: {}", e.getMessage(), e);
                emitter.completeWithError(e);
            }
        });

        // Cleanup on timeout or disconnect
        emitter.onTimeout(() -> {
            logger.info("SSE emitter timeout for watchId: {}", watchId);
            closeWatcher(watchId);
        });

        emitter.onError(e -> {
            logger.error("SSE emitter error for watchId: {}", watchId, e);
            closeWatcher(watchId);
        });

        return emitter;
    }

    /**
     * Close a watcher by ID.
     */
    public void closeWatcher(String watchId) {
        Watcher<?> watcher = activeWatchers.remove(watchId);
        if (watcher != null) {
            logger.info("Removed watcher for watchId: {}", watchId);
        }
    }

    /**
     * Close all active watchers.
     */
    public void closeAllWatchers() {
        int count = activeWatchers.size();
        activeWatchers.clear();
        logger.info("Cleared {} active watchers", count);
    }
}
