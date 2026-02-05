package com.k8smanager.service;

import com.k8smanager.dto.*;
import io.fabric8.kubernetes.api.model.*;
import io.fabric8.kubernetes.api.model.apps.Deployment;
import io.fabric8.kubernetes.api.model.apps.DeploymentList;
import io.fabric8.kubernetes.api.model.apps.DeploymentStatus;
import io.fabric8.kubernetes.client.dsl.PodResource;
import io.fabric8.kubernetes.client.KubernetesClient;
import io.fabric8.kubernetes.client.dsl.MixedOperation;
import io.fabric8.kubernetes.client.dsl.NonNamespaceOperation;
import io.fabric8.kubernetes.client.dsl.Resource;
import io.fabric8.kubernetes.client.dsl.RollableScalableResource;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.Collections;
import java.util.List;
import java.util.Map;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
@SuppressWarnings({"unchecked", "rawtypes"})
class MonitoringServiceTest {

    @Mock
    private KubernetesClient kubernetesClient;

    @Mock
    private WebClient prometheusWebClient;

    @Mock
    private MixedOperation<Pod, PodList, PodResource> podOperation;
    @Mock
    private NonNamespaceOperation<Pod, PodList, PodResource> namespacedPodOp;
    @Mock
    private PodResource podResource;

    @Mock
    private MixedOperation<Node, NodeList, Resource<Node>> nodeOperation;
    @Mock
    private Resource<Node> nodeResource;

    @Mock
    private MixedOperation<Deployment, DeploymentList, RollableScalableResource<Deployment>> deploymentOperation;
    @Mock
    private NonNamespaceOperation<Deployment, DeploymentList, RollableScalableResource<Deployment>> namespacedDeployOp;
    @Mock
    private RollableScalableResource<Deployment> deploymentResource;

    @Mock
    private MixedOperation<PersistentVolumeClaim, PersistentVolumeClaimList, Resource<PersistentVolumeClaim>> pvcOperation;
    @Mock
    private NonNamespaceOperation<PersistentVolumeClaim, PersistentVolumeClaimList, Resource<PersistentVolumeClaim>> namespacedPvcOp;
    @Mock
    private Resource<PersistentVolumeClaim> pvcResource;

    @Mock
    private WebClient.RequestHeadersUriSpec requestHeadersUriSpec;
    @Mock
    private WebClient.RequestHeadersSpec requestHeadersSpec;
    @Mock
    private WebClient.ResponseSpec responseSpec;

    @InjectMocks
    private MonitoringService monitoringService;

    @BeforeEach
    void setUp() {
        lenient().when(kubernetesClient.pods()).thenReturn(podOperation);
        lenient().when(kubernetesClient.nodes()).thenReturn(nodeOperation);
        lenient().when(kubernetesClient.apps()).thenReturn(mock(io.fabric8.kubernetes.client.dsl.AppsAPIGroupDSL.class));
        lenient().when(kubernetesClient.apps().deployments()).thenReturn(deploymentOperation);
        lenient().when(kubernetesClient.persistentVolumeClaims()).thenReturn(pvcOperation);
    }

    @Test
    void testGetPodMetrics() {
        String namespace = "test-ns";
        String podName = "test-pod";
        Pod pod = new Pod();
        pod.setStatus(new PodStatus());

        when(podOperation.inNamespace(namespace)).thenReturn(namespacedPodOp);
        when(namespacedPodOp.withName(podName)).thenReturn(podResource);
        when(podResource.get()).thenReturn(pod);

        MetricsResponseDTO result = monitoringService.getPodMetrics(namespace, podName, "cpu");

        assertThat(result).isNotNull();
        assertThat(result.summary()).isNotNull();
    }

    @Test
    void testGetNodeMetrics() {
        String nodeName = "test-node";
        Node node = new Node();
        NodeStatus status = new NodeStatus();
        status.setAllocatable(Map.of("cpu", new Quantity("4"), "memory", new Quantity("8Gi")));
        node.setStatus(status);

        when(nodeOperation.withName(nodeName)).thenReturn(nodeResource);
        when(nodeResource.get()).thenReturn(node);

        MetricsResponseDTO result = monitoringService.getNodeMetrics(nodeName, "cpu");

        assertThat(result).isNotNull();
        assertThat(result.summary().max()).isEqualTo(4.0);
    }

    @Test
    void testGetWorkloadMetrics() {
        String namespace = "test-ns";
        String name = "test-deploy";
        Deployment deployment = new Deployment();
        DeploymentStatus status = new DeploymentStatus();
        status.setReplicas(3);
        status.setReadyReplicas(3);
        deployment.setStatus(status);

        when(deploymentOperation.inNamespace(namespace)).thenReturn(namespacedDeployOp);
        when(namespacedDeployOp.withName(name)).thenReturn(deploymentResource);
        when(deploymentResource.get()).thenReturn(deployment);

        MetricsResponseDTO result = monitoringService.getWorkloadMetrics("Deployment", namespace, name, "replicas");

        assertThat(result).isNotNull();
        assertThat(result.summary().max()).isEqualTo(3.0);
    }

    @Test
    void testGetStorageMetrics() {
        String namespace = "test-ns";
        String name = "test-pvc";
        PersistentVolumeClaim pvc = new PersistentVolumeClaim();
        PersistentVolumeClaimStatus status = new PersistentVolumeClaimStatus();
        status.setCapacity(Map.of("storage", new Quantity("10Gi")));
        pvc.setStatus(status);

        when(pvcOperation.inNamespace(namespace)).thenReturn(namespacedPvcOp);
        when(namespacedPvcOp.withName(name)).thenReturn(pvcResource);
        when(pvcResource.get()).thenReturn(pvc);

        MetricsResponseDTO result = monitoringService.getStorageMetrics(namespace, name);

        assertThat(result).isNotNull();
        assertThat(result.summary().max()).isEqualTo(10.0 * 1024 * 1024 * 1024);
    }

    @Test
    void testExecutePromQLQuerySuccess() {
        String query = "up";
        String range = "1h";
        
        // Mock Prometheus response structure
        Map<String, Object> responseMap = Map.of(
            "status", "success",
            "data", Map.of(
                "resultType", "matrix",
                "result", List.of(
                    Map.of(
                        "metric", Map.of("__name__", "up"),
                        "values", List.of(
                            List.of(1678886400.0, "1"),
                            List.of(1678886460.0, "1")
                        )
                    )
                )
            )
        );

        when(prometheusWebClient.get()).thenReturn(requestHeadersUriSpec);
        when(requestHeadersUriSpec.uri(anyString())).thenReturn(requestHeadersSpec);
        when(requestHeadersSpec.retrieve()).thenReturn(responseSpec);
        when(responseSpec.bodyToMono(Map.class)).thenReturn(Mono.just(responseMap));

        PromQLQueryResultDTO result = monitoringService.executePromQLQuery(query, range);

        assertThat(result).isNotNull();
        assertThat(result.data()).hasSize(2);
        assertThat(result.data().get(0).value()).isEqualTo(1.0);
    }

    @Test
    void testExecutePromQLQueryVector() {
        String query = "up";
        String range = "1h";
        
        // Mock Prometheus response structure for vector
        Map<String, Object> responseMap = Map.of(
            "status", "success",
            "data", Map.of(
                "resultType", "vector",
                "result", List.of(
                    Map.of(
                        "metric", Map.of("__name__", "up"),
                        "value", List.of(1678886400.0, "1")
                    )
                )
            )
        );

        when(prometheusWebClient.get()).thenReturn(requestHeadersUriSpec);
        when(requestHeadersUriSpec.uri(anyString())).thenReturn(requestHeadersSpec);
        when(requestHeadersSpec.retrieve()).thenReturn(responseSpec);
        when(responseSpec.bodyToMono(Map.class)).thenReturn(Mono.just(responseMap));

        PromQLQueryResultDTO result = monitoringService.executePromQLQuery(query, range);

        assertThat(result).isNotNull();
        assertThat(result.data()).hasSize(1);
        assertThat(result.data().get(0).value()).isEqualTo(1.0);
    }

    @Test
    void testExecutePromQLQueryEmpty() {
        String query = "up";
        
        Map<String, Object> responseMap = Map.of(
            "status", "success",
            "data", Map.of(
                "resultType", "matrix",
                "result", Collections.emptyList()
            )
        );

        when(prometheusWebClient.get()).thenReturn(requestHeadersUriSpec);
        when(requestHeadersUriSpec.uri(anyString())).thenReturn(requestHeadersSpec);
        when(requestHeadersSpec.retrieve()).thenReturn(responseSpec);
        when(responseSpec.bodyToMono(Map.class)).thenReturn(Mono.just(responseMap));

        PromQLQueryResultDTO result = monitoringService.executePromQLQuery(query, "1h");

        assertThat(result).isNotNull();
        assertThat(result.data()).isEmpty();
    }
}
