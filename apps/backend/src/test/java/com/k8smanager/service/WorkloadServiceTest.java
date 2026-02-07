package com.k8smanager.service;

import com.k8smanager.dto.*;
import com.k8smanager.k8s.K8sMapper;
import io.fabric8.kubernetes.api.model.*;
import io.fabric8.kubernetes.api.model.apps.*;
import io.fabric8.kubernetes.client.KubernetesClient;
import io.fabric8.kubernetes.client.dsl.AppsAPIGroupDSL;
import io.fabric8.kubernetes.client.dsl.MixedOperation;
import io.fabric8.kubernetes.client.dsl.NonNamespaceOperation;
import io.fabric8.kubernetes.client.dsl.Resource;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
@SuppressWarnings({"unchecked", "rawtypes"})
class WorkloadServiceTest {

    @Mock
    private KubernetesClient kubernetesClient;

    @Mock
    private K8sMapper k8sMapper;

    @Mock
    private AppsAPIGroupDSL appsApi;

    @Mock
    private MixedOperation<Deployment, DeploymentList, io.fabric8.kubernetes.client.dsl.RollableScalableResource<Deployment>> deploymentOperations;

    @Mock
    private NonNamespaceOperation<Deployment, DeploymentList, io.fabric8.kubernetes.client.dsl.RollableScalableResource<Deployment>> namespacedDeployments;

    @Mock
    private io.fabric8.kubernetes.client.dsl.RollableScalableResource<Deployment> deploymentResource;

    @InjectMocks
    private WorkloadService workloadService;

    @BeforeEach
    void setUp() {
        lenient().when(kubernetesClient.apps()).thenReturn(appsApi);
        lenient().when(appsApi.deployments()).thenReturn(deploymentOperations);
    }

    @Test
    void testListDeploymentsInNamespace() {
        String namespace = "test-ns";
        DeploymentList deploymentList = new DeploymentList();
        Deployment deployment = createMockDeployment("test-deploy", namespace);
        deploymentList.setItems(List.of(deployment));

        DeploymentDTO deploymentDTO = new DeploymentDTO(
            "test-deploy", namespace, 3, 3, 3, 3, "RollingUpdate",
            "app=test-deploy", null
        );

        when(deploymentOperations.inNamespace(eq(namespace))).thenReturn(namespacedDeployments);
        when(namespacedDeployments.list()).thenReturn(deploymentList);
        when(k8sMapper.mapToDeploymentDto(any(Deployment.class))).thenReturn(deploymentDTO);

        ResourceListDTO<DeploymentDTO> result = workloadService.listDeployments(namespace, null);

        assertThat(result).isNotNull();
        assertThat(result.items()).hasSize(1);
        assertThat(result.items().get(0).name()).isEqualTo("test-deploy");

        verify(deploymentOperations).inNamespace(eq(namespace));
        verify(namespacedDeployments).list();
    }

    @Test
    void testListDeploymentsAllNamespaces() {
        DeploymentList deploymentList = new DeploymentList();
        Deployment deployment = createMockDeployment("test-deploy", "default");
        deploymentList.setItems(List.of(deployment));

        DeploymentDTO deploymentDTO = new DeploymentDTO(
            "test-deploy", "default", 3, 3, 3, 3, "RollingUpdate",
            "app=test-deploy", null
        );

        when(deploymentOperations.inAnyNamespace()).thenReturn(namespacedDeployments);
        when(namespacedDeployments.list()).thenReturn(deploymentList);
        when(k8sMapper.mapToDeploymentDto(any(Deployment.class))).thenReturn(deploymentDTO);

        ResourceListDTO<DeploymentDTO> result = workloadService.listDeployments(null, null);

        assertThat(result).isNotNull();
        assertThat(result.items()).hasSize(1);

        verify(deploymentOperations).inAnyNamespace();
    }

    @Test
    void testListDeploymentsWithSearch() {
        String namespace = "test-ns";
        DeploymentList deploymentList = new DeploymentList();
        Deployment deployment1 = createMockDeployment("nginx-deploy", namespace);
        Deployment deployment2 = createMockDeployment("redis-deploy", namespace);
        deploymentList.setItems(List.of(deployment1, deployment2));

        DeploymentDTO deploymentDTO = new DeploymentDTO(
            "nginx-deploy", namespace, 3, 3, 3, 3, "RollingUpdate",
            "app=nginx-deploy", null
        );

        when(deploymentOperations.inNamespace(eq(namespace))).thenReturn(namespacedDeployments);
        when(namespacedDeployments.list()).thenReturn(deploymentList);
        when(k8sMapper.mapToDeploymentDto(any(Deployment.class))).thenReturn(deploymentDTO);

        ResourceListDTO<DeploymentDTO> result = workloadService.listDeployments(namespace, "nginx");

        assertThat(result).isNotNull();
        assertThat(result.items()).hasSize(1);
        assertThat(result.items().get(0).name()).isEqualTo("nginx-deploy");
    }

    @Test
    void testGetDeploymentReturnsDeployment() {
        String namespace = "test-ns";
        String name = "test-deploy";
        Deployment deployment = createMockDeployment(name, namespace);

        DeploymentDTO deploymentDTO = new DeploymentDTO(
            name, namespace, 3, 3, 3, 3, "RollingUpdate",
            "app=" + name, null
        );

        when(deploymentOperations.inNamespace(eq(namespace))).thenReturn(namespacedDeployments);
        when(namespacedDeployments.withName(eq(name))).thenReturn(deploymentResource);
        when(deploymentResource.get()).thenReturn(deployment);
        when(k8sMapper.mapToDeploymentDto(deployment)).thenReturn(deploymentDTO);

        DeploymentDTO result = workloadService.getDeployment(namespace, name);

        assertThat(result).isNotNull();
        assertThat(result.name()).isEqualTo(name);

        verify(deploymentOperations).inNamespace(eq(namespace));
        verify(namespacedDeployments).withName(eq(name));
    }

    @Test
    void testGetDeploymentReturnsNullWhenNotFound() {
        String namespace = "test-ns";
        String name = "non-existent";

        when(deploymentOperations.inNamespace(eq(namespace))).thenReturn(namespacedDeployments);
        when(namespacedDeployments.withName(eq(name))).thenReturn(deploymentResource);
        when(deploymentResource.get()).thenReturn(null);

        DeploymentDTO result = workloadService.getDeployment(namespace, name);

        assertThat(result).isNull();
    }

    @Test
    void testDeleteDeploymentSuccessfully() {
        String namespace = "test-ns";
        String name = "test-deploy";
        Deployment deployment = createMockDeployment(name, namespace);

        when(deploymentOperations.inNamespace(eq(namespace))).thenReturn(namespacedDeployments);
        when(namespacedDeployments.withName(eq(name))).thenReturn(deploymentResource);
        when(deploymentResource.get()).thenReturn(deployment);
        when(deploymentResource.delete()).thenReturn(List.of(new StatusDetails()));

        boolean result = workloadService.deleteDeployment(namespace, name);

        assertThat(result).isTrue();
    }

    @Test
    void testDeleteDeploymentWhenNotFound() {
        String namespace = "test-ns";
        String name = "non-existent";

        when(deploymentOperations.inNamespace(eq(namespace))).thenReturn(namespacedDeployments);
        when(namespacedDeployments.withName(eq(name))).thenReturn(deploymentResource);
        when(deploymentResource.get()).thenReturn(null);

        boolean result = workloadService.deleteDeployment(namespace, name);

        assertThat(result).isFalse();
        verify(deploymentResource, never()).delete();
    }

    @Test
    void testScaleDeploymentUpdatesReplicas() {
        String namespace = "test-ns";
        String name = "test-deploy";
        int newReplicas = 5;
        Deployment deployment = createMockDeployment(name, namespace);
        Deployment updatedDeployment = createMockDeployment(name, namespace);
        updatedDeployment.getSpec().setReplicas(newReplicas);

        DeploymentDTO deploymentDTO = new DeploymentDTO(
            name, namespace, newReplicas, newReplicas, newReplicas, newReplicas, "RollingUpdate",
            "app=" + name, null
        );

        when(deploymentOperations.inNamespace(eq(namespace))).thenReturn(namespacedDeployments);
        when(namespacedDeployments.withName(eq(name))).thenReturn(deploymentResource);
        when(deploymentResource.get()).thenReturn(deployment);
        when(deploymentOperations.resource(deployment)).thenReturn(deploymentResource);
        when(deploymentResource.replace()).thenReturn(updatedDeployment);
        when(k8sMapper.mapToDeploymentDto(updatedDeployment)).thenReturn(deploymentDTO);

        DeploymentDTO result = workloadService.scaleDeployment(namespace, name, newReplicas);

        assertThat(result).isNotNull();
        assertThat(result.replicas()).isEqualTo(newReplicas);
        assertThat(deployment.getSpec().getReplicas()).isEqualTo(newReplicas);
        verify(deploymentResource).replace();
    }

    @Test
    void testScaleDeploymentReturnsNullWhenNotFound() {
        String namespace = "test-ns";
        String name = "non-existent";

        when(deploymentOperations.inNamespace(eq(namespace))).thenReturn(namespacedDeployments);
        when(namespacedDeployments.withName(eq(name))).thenReturn(deploymentResource);
        when(deploymentResource.get()).thenReturn(null);

        DeploymentDTO result = workloadService.scaleDeployment(namespace, name, 5);

        assertThat(result).isNull();
        verify(deploymentResource, never()).replace();
    }

    @Test
    void testRestartDeploymentAddsAnnotation() {
        String namespace = "test-ns";
        String name = "test-deploy";
        Deployment deployment = createMockDeployment(name, namespace);
        Deployment restartedDeployment = createMockDeployment(name, namespace);

        DeploymentDTO deploymentDTO = new DeploymentDTO(
            name, namespace, 3, 3, 3, 3, "RollingUpdate",
            "app=" + name, null
        );

        when(deploymentOperations.inNamespace(eq(namespace))).thenReturn(namespacedDeployments);
        when(namespacedDeployments.withName(eq(name))).thenReturn(deploymentResource);
        when(deploymentResource.get()).thenReturn(deployment);
        when(deploymentOperations.resource(deployment)).thenReturn(deploymentResource);
        when(deploymentResource.replace()).thenReturn(restartedDeployment);
        when(k8sMapper.mapToDeploymentDto(restartedDeployment)).thenReturn(deploymentDTO);

        DeploymentDTO result = workloadService.restartDeployment(namespace, name);

        assertThat(result).isNotNull();
        assertThat(deployment.getMetadata().getAnnotations())
            .containsKey("kubernetes.io/restartedAt");
        verify(deploymentResource).replace();
    }

    @Test
    void testUpdateDeploymentImageUpdatesContainer() {
        String namespace = "test-ns";
        String name = "test-deploy";
        String newImage = "nginx:1.22";
        Deployment deployment = createMockDeployment(name, namespace);
        Deployment updatedDeployment = createMockDeployment(name, namespace);

        DeploymentDTO deploymentDTO = new DeploymentDTO(
            name, namespace, 3, 3, 3, 3, "RollingUpdate",
            "app=" + name, null
        );

        when(deploymentOperations.inNamespace(eq(namespace))).thenReturn(namespacedDeployments);
        when(namespacedDeployments.withName(eq(name))).thenReturn(deploymentResource);
        when(deploymentResource.get()).thenReturn(deployment);
        when(deploymentOperations.resource(deployment)).thenReturn(deploymentResource);
        when(deploymentResource.replace()).thenReturn(updatedDeployment);
        when(k8sMapper.mapToDeploymentDto(updatedDeployment)).thenReturn(deploymentDTO);

        DeploymentDTO result = workloadService.updateDeploymentImage(namespace, name, newImage);

        assertThat(result).isNotNull();
        assertThat(deployment.getSpec().getTemplate().getSpec()
            .getContainers().get(0).getImage()).isEqualTo(newImage);
        verify(deploymentResource).replace();
    }

    private Deployment createMockDeployment(String name, String namespace) {
        Deployment deployment = new Deployment();
        
        ObjectMeta metadata = new ObjectMeta();
        metadata.setName(name);
        metadata.setNamespace(namespace);
        metadata.setAnnotations(new HashMap<>());
        deployment.setMetadata(metadata);

        DeploymentSpec spec = new DeploymentSpec();
        spec.setReplicas(3);

        PodTemplateSpec template = new PodTemplateSpec();
        PodSpec podSpec = new PodSpec();
        Container container = new Container();
        container.setName("main");
        container.setImage("nginx:1.21");
        podSpec.setContainers(List.of(container));
        template.setSpec(podSpec);
        spec.setTemplate(template);

        deployment.setSpec(spec);

        DeploymentStatus status = new DeploymentStatus();
        status.setReplicas(3);
        status.setReadyReplicas(3);
        status.setAvailableReplicas(3);
        status.setUpdatedReplicas(3);
        deployment.setStatus(status);

        return deployment;
    }
}
