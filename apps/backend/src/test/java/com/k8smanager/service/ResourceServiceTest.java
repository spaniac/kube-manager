package com.k8smanager.service;

import com.k8smanager.dto.*;
import com.k8smanager.k8s.K8sMapper;
import io.fabric8.kubernetes.api.model.*;
import io.fabric8.kubernetes.api.model.apps.*;
import io.fabric8.kubernetes.client.KubernetesClient;
import io.fabric8.kubernetes.client.dsl.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Collections;
import java.util.List;
import java.util.Map;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
@SuppressWarnings({"unchecked", "rawtypes"})
class ResourceServiceTest {

    @Mock
    private KubernetesClient kubernetesClient;

    @Mock
    private K8sMapper k8sMapper;

    @Mock
    private StatusBadgeService statusBadgeService;

    @Mock
    private MixedOperation<Pod, PodList, PodResource> podOperation;
    
    @Mock
    private MixedOperation<Deployment, DeploymentList, RollableScalableResource<Deployment>> deploymentOperation;

    @Mock
    private MixedOperation<io.fabric8.kubernetes.api.model.Service, ServiceList, ServiceResource<io.fabric8.kubernetes.api.model.Service>> serviceOperation;
    
    @Mock
    private NonNamespaceOperation<Pod, PodList, PodResource> namespacedPodOp;
    
    @Mock
    private NonNamespaceOperation<Deployment, DeploymentList, RollableScalableResource<Deployment>> namespacedDeployOp;

    @Mock
    private NonNamespaceOperation<io.fabric8.kubernetes.api.model.Service, ServiceList, ServiceResource<io.fabric8.kubernetes.api.model.Service>> namespacedServiceOp;

    @Mock
    private PodResource podResource;
    
    @Mock
    private RollableScalableResource<Deployment> deploymentResource;
    
    @Mock
    private ServiceResource<io.fabric8.kubernetes.api.model.Service> serviceResource;

    @Mock
    private AppsAPIGroupDSL appsApi;

    @InjectMocks
    private ResourceService resourceService;

    @BeforeEach
    void setUp() {
        lenient().when(kubernetesClient.pods()).thenReturn(podOperation);
        lenient().when(kubernetesClient.apps()).thenReturn(appsApi);
        lenient().when(appsApi.deployments()).thenReturn(deploymentOperation);
        lenient().when(kubernetesClient.services()).thenReturn(serviceOperation);
    }

    @Test
    void testListResourcesPods() {
        String namespace = "test-ns";
        PodList podList = new PodList();
        podList.setItems(List.of(new Pod()));

        when(podOperation.inNamespace(namespace)).thenReturn(namespacedPodOp);
        when(namespacedPodOp.list()).thenReturn(podList);
        when(k8sMapper.mapToPodDto(any(Pod.class))).thenReturn(new PodDTO("pod1", namespace, "Running", "Running", "node1", "10.0.0.1", "2d", List.of(), List.of()));

        ResourceListDTO<?> result = resourceService.listResources("pods", namespace, null, null, null);

        assertThat(result.kind()).isEqualTo("PodList");
        assertThat(result.items()).hasSize(1);
    }

    @Test
    void testGetResourceDeployment() {
        String namespace = "test-ns";
        String name = "test-deploy";
        Deployment deployment = new Deployment();
        
        when(deploymentOperation.inNamespace(namespace)).thenReturn(namespacedDeployOp);
        when(namespacedDeployOp.withName(name)).thenReturn(deploymentResource);
        when(deploymentResource.get()).thenReturn(deployment);
        when(k8sMapper.mapToDeploymentDto(any(Deployment.class))).thenReturn(new DeploymentDTO(name, namespace, 1, 1, 1, 0, "RollingUpdate", "app=test", null));

        Object result = resourceService.getResource("deployments", namespace, name);

        assertThat(result).isInstanceOf(DeploymentDTO.class);
        assertThat(((DeploymentDTO) result).name()).isEqualTo(name);
    }

    @Test
    void testDeleteResourceService() {
        String namespace = "test-ns";
        String name = "test-svc";
        
        when(serviceOperation.inNamespace(namespace)).thenReturn(namespacedServiceOp);
        when(namespacedServiceOp.withName(name)).thenReturn(serviceResource);

        resourceService.deleteResource("services", namespace, name);

        verify(serviceResource).delete();
    }

    @Test
    void testGetStatusBadge() {
        String namespace = "test-ns";
        String name = "test-pod";
        Pod pod = new Pod();
        StatusBadgeDTO badge = new StatusBadgeDTO("Running", "success", "Running", "All good", "check", "green");
        
        when(podOperation.inNamespace(namespace)).thenReturn(namespacedPodOp);
        when(namespacedPodOp.withName(name)).thenReturn(podResource);
        when(podResource.get()).thenReturn(pod);
        when(statusBadgeService.getPodStatusBadge(pod)).thenReturn(badge);

        StatusBadgeDTO result = resourceService.getStatusBadge("pods", namespace, name);

        assertThat(result).isEqualTo(badge);
    }
    
    @Test
    void testListResourcesDefault() {
         ResourceListDTO<?> result = resourceService.listResources("unknown", "ns", null, null, null);
         assertThat(result.kind()).isEqualTo("unknown");
         assertThat(result.items()).isEmpty();
    }
}
