package com.k8smanager.k8s;

import com.k8smanager.common.exception.K8sException;
import com.k8smanager.common.exception.InternalServerException;
import io.fabric8.kubernetes.api.model.KubernetesResourceList;
import io.fabric8.kubernetes.api.model.ObjectMeta;
import io.fabric8.kubernetes.client.KubernetesClient;
import io.fabric8.kubernetes.client.KubernetesClientException;
import io.micrometer.core.instrument.Counter;
import io.micrometer.core.instrument.MeterRegistry;
import io.micrometer.core.instrument.Timer;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.Optional;

/**
 * Service wrapper for Kubernetes client with error handling.
 */
@Service
public class K8sClientService {

    private static final Logger logger = LoggerFactory.getLogger(K8sClientService.class);

    private final KubernetesClient kubernetesClient;
    private final Counter k8sApiSuccessCounter;
    private final Counter k8sApiErrorCounter;
    private final Timer k8sApiCallTimer;

    public K8sClientService(KubernetesClient kubernetesClient, MeterRegistry meterRegistry) {
        this.kubernetesClient = kubernetesClient;
        this.k8sApiSuccessCounter = Counter.builder("k8s.api.calls")
                .tag("status", "success")
                .description("K8s API successful calls")
                .register(meterRegistry);
        this.k8sApiErrorCounter = Counter.builder("k8s.api.calls")
                .tag("status", "error")
                .description("K8s API error calls")
                .register(meterRegistry);
        this.k8sApiCallTimer = Timer.builder("k8s.api.call.duration")
                .description("K8s API call duration")
                .register(meterRegistry);
    }

    /**
     * Get the Kubernetes client.
     */
    public KubernetesClient getClient() {
        return kubernetesClient;
    }

    /**
     * Execute a Kubernetes operation with error handling.
     */
    public <T> T execute(K8sOperation<T> operation) {
        return k8sApiCallTimer.record(() -> {
            try {
                T result = operation.execute(kubernetesClient);
                k8sApiSuccessCounter.increment();
                return result;
            } catch (KubernetesClientException e) {
                k8sApiErrorCounter.increment();
                logger.error("Kubernetes operation failed: {}", e.getMessage(), e);
                throw new K8sException("Kubernetes operation failed: " + e.getMessage(), e);
            } catch (Exception e) {
                k8sApiErrorCounter.increment();
                logger.error("Unexpected error: {}", e.getMessage(), e);
                throw new InternalServerException("Unexpected error: " + e.getMessage(), e);
            }
        });
    }

    /**
     * Execute a Kubernetes operation and return Optional.
     */
    public <T> Optional<T> executeOptional(K8sOperation<T> operation) {
        try {
            return Optional.ofNullable(operation.execute(kubernetesClient));
        } catch (KubernetesClientException e) {
            if (e.getCode() == 404) {
                return Optional.empty();
            }
            logger.error("Kubernetes operation failed: {}", e.getMessage(), e);
            throw new K8sException("Kubernetes operation failed: " + e.getMessage(), e);
        } catch (Exception e) {
            logger.error("Unexpected error: {}", e.getMessage(), e);
            throw new InternalServerException("Unexpected error: " + e.getMessage(), e);
        }
    }

    /**
     * Get resource name from metadata.
     */
    public static String getResourceName(KubernetesResourceList<?> resourceList) {
        if (resourceList != null && resourceList.getItems() != null
                && !resourceList.getItems().isEmpty()) {
            ObjectMeta metadata = resourceList.getItems().get(0).getMetadata();
            return metadata != null ? metadata.getName() : null;
        }
        return null;
    }

    /**
     * Functional interface for Kubernetes operations.
     */
    @FunctionalInterface
    public interface K8sOperation<T> {
        T execute(KubernetesClient client) throws Exception;
    }
}
