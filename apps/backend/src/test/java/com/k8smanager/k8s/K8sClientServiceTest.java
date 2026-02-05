package com.k8smanager.k8s;

import com.k8smanager.common.exception.InternalServerException;
import com.k8smanager.common.exception.K8sException;
import io.fabric8.kubernetes.client.KubernetesClient;
import io.fabric8.kubernetes.client.KubernetesClientException;
import io.micrometer.core.instrument.Counter;
import io.micrometer.core.instrument.MeterRegistry;
import io.micrometer.core.instrument.Timer;
import io.micrometer.core.instrument.simple.SimpleMeterRegistry;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;
import java.util.concurrent.Callable;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class K8sClientServiceTest {

    @Mock
    private KubernetesClient kubernetesClient;

    private MeterRegistry meterRegistry;
    private K8sClientService k8sClientService;

    @BeforeEach
    void setUp() {
        meterRegistry = new SimpleMeterRegistry();
        k8sClientService = new K8sClientService(kubernetesClient, meterRegistry);
    }

    @Test
    void testGetClient() {
        assertThat(k8sClientService.getClient()).isEqualTo(kubernetesClient);
    }

    @Test
    void testExecuteSuccess() {
        String result = k8sClientService.execute(client -> "success");
        assertThat(result).isEqualTo("success");
        assertThat(meterRegistry.get("k8s.api.calls").tag("status", "success").counter().count()).isEqualTo(1.0);
    }

    @Test
    void testExecuteKubernetesException() {
        assertThatThrownBy(() -> k8sClientService.execute(client -> {
            throw new KubernetesClientException("K8s error");
        })).isInstanceOf(K8sException.class)
           .hasMessageContaining("K8s error");
        
        assertThat(meterRegistry.get("k8s.api.calls").tag("status", "error").counter().count()).isEqualTo(1.0);
    }

    @Test
    void testExecuteUnexpectedException() {
        assertThatThrownBy(() -> k8sClientService.execute(client -> {
            throw new RuntimeException("Unexpected error");
        })).isInstanceOf(InternalServerException.class)
           .hasMessageContaining("Unexpected error");
        
        assertThat(meterRegistry.get("k8s.api.calls").tag("status", "error").counter().count()).isEqualTo(1.0);
    }

    @Test
    void testExecuteOptionalSuccess() {
        Optional<String> result = k8sClientService.executeOptional(client -> "success");
        assertThat(result).isPresent().contains("success");
    }

    @Test
    void testExecuteOptionalNotFound() {
        Optional<String> result = k8sClientService.executeOptional(client -> {
            throw new KubernetesClientException("Not Found", 404, null);
        });
        assertThat(result).isEmpty();
    }

    @Test
    void testExecuteOptionalOtherK8sException() {
        assertThatThrownBy(() -> k8sClientService.executeOptional(client -> {
            throw new KubernetesClientException("Internal Server Error", 500, null);
        })).isInstanceOf(K8sException.class);
    }
}
