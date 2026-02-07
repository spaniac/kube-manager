package com.k8smanager.k8s;

import com.k8smanager.dto.*;
import io.fabric8.kubernetes.api.model.*;
import io.fabric8.kubernetes.api.model.apps.*;
import io.fabric8.kubernetes.api.model.batch.v1.*;
import org.junit.jupiter.api.Test;

import java.util.List;
import java.util.Map;

import static org.assertj.core.api.Assertions.assertThat;

class K8sMapperTest {

    private final K8sMapper k8sMapper = new K8sMapper();

    @Test
    void testMapToPod() {
        PodDTO podDto = new PodDTO("test-pod", "default", "Running", "Running", "node1", "10.0.0.1", "2d", List.of(new PodContainerDTO("main", "nginx", List.of(), List.of(), null, List.of())), List.of());
        Pod pod = k8sMapper.mapToPod(podDto);

        assertThat(pod.getMetadata().getName()).isEqualTo("test-pod");
        assertThat(pod.getMetadata().getNamespace()).isEqualTo("default");
        assertThat(pod.getSpec().getContainers()).hasSize(1);
        assertThat(pod.getSpec().getContainers().get(0).getName()).isEqualTo("main");
        assertThat(pod.getSpec().getContainers().get(0).getImage()).isEqualTo("nginx");
    }

    @Test
    void testMapToPodDto() {
        Pod pod = new Pod();
        ObjectMeta metadata = new ObjectMeta();
        metadata.setName("test-pod");
        metadata.setNamespace("default");
        pod.setMetadata(metadata);
        
        PodStatus status = new PodStatus();
        status.setPhase("Running");
        status.setPodIP("10.0.0.1");
        status.setStartTime("2023-01-01T00:00:00Z");
        pod.setStatus(status);
        
        PodSpec spec = new PodSpec();
        spec.setNodeName("node1");
        Container container = new Container();
        container.setName("main");
        container.setImage("nginx");
        spec.setContainers(List.of(container));
        pod.setSpec(spec);

        PodDTO podDto = k8sMapper.mapToPodDto(pod);

        assertThat(podDto.name()).isEqualTo("test-pod");
        assertThat(podDto.namespace()).isEqualTo("default");
        assertThat(podDto.status()).isEqualTo("Running");
        assertThat(podDto.podIP()).isEqualTo("10.0.0.1");
        assertThat(podDto.nodeName()).isEqualTo("node1");
        assertThat(podDto.containers()).hasSize(1);
        assertThat(podDto.containers().get(0).name()).isEqualTo("main");
        assertThat(podDto.containers().get(0).image()).isEqualTo("nginx");
    }

    @Test
    void testMapToDeployment() {
        DeploymentRequestDTO request = new DeploymentRequestDTO("test-deploy", "default", List.of(new PodContainerRequestDTO("main", "nginx", List.of(), List.of(), null, List.of())), 3, Map.of("app", "test"), Map.of(), null);
        Deployment deployment = k8sMapper.mapToDeployment(request);

        System.out.println("Deployment: " + deployment);
        System.out.println("Spec: " + (deployment != null ? deployment.getSpec() : "null"));

        assertThat(deployment.getMetadata().getName()).isEqualTo("test-deploy");
        assertThat(deployment.getSpec().getReplicas()).isEqualTo(3);
        assertThat(deployment.getSpec().getTemplate().getSpec().getContainers()).hasSize(1);
    }

    @Test
    void testMapToDeploymentDto() {
        Deployment deployment = new Deployment();
        ObjectMeta metadata = new ObjectMeta();
        metadata.setName("test-deploy");
        metadata.setNamespace("default");
        metadata.setLabels(Map.of("app", "test"));
        deployment.setMetadata(metadata);
        
        DeploymentSpec spec = new DeploymentSpec();
        spec.setReplicas(3);
        spec.setStrategy(new DeploymentStrategyBuilder().withType("RollingUpdate").build());
        spec.setSelector(new LabelSelectorBuilder().withMatchLabels(Map.of("app", "test")).build());
        
        PodTemplateSpec template = new PodTemplateSpec();
        PodSpec podSpec = new PodSpec();
        podSpec.setContainers(List.of(new ContainerBuilder().withName("main").withImage("nginx").build()));
        template.setSpec(podSpec);
        spec.setTemplate(template);
        
        deployment.setSpec(spec);
        
        DeploymentStatus status = new DeploymentStatus();
        status.setReadyReplicas(3);
        deployment.setStatus(status);

        DeploymentDTO dto = k8sMapper.mapToDeploymentDto(deployment);

        assertThat(dto.name()).isEqualTo("test-deploy");
        assertThat(dto.replicas()).isEqualTo(3);
        assertThat(dto.readyReplicas()).isEqualTo(3);
        assertThat(dto.strategy()).isEqualTo("RollingUpdate");
        assertThat(dto.template().containers()).hasSize(1);
    }

    @Test
    void testMapToService() {
        ServiceRequestDTO request = new ServiceRequestDTO("test-svc", "default", "ClusterIP", List.of(new ServicePortRequestDTO("http", "TCP", 80, 8080)), Map.of("app", "test"), Map.of());
        io.fabric8.kubernetes.api.model.Service service = k8sMapper.mapToService(request);

        assertThat(service.getMetadata().getName()).isEqualTo("test-svc");
        assertThat(service.getSpec().getType()).isEqualTo("ClusterIP");
        assertThat(service.getSpec().getPorts()).hasSize(1);
        assertThat(service.getSpec().getPorts().get(0).getPort()).isEqualTo(80);
    }

    @Test
    void testMapToServiceDto() {
        io.fabric8.kubernetes.api.model.Service service = new io.fabric8.kubernetes.api.model.Service();
        ObjectMeta metadata = new ObjectMeta();
        metadata.setName("test-svc");
        metadata.setNamespace("default");
        service.setMetadata(metadata);
        
        ServiceSpec spec = new ServiceSpec();
        spec.setType("ClusterIP");
        spec.setClusterIPs(List.of("10.0.0.1"));
        spec.setPorts(List.of(new ServicePortBuilder().withName("http").withProtocol("TCP").withPort(80).withNewTargetPort(8080).build()));
        service.setSpec(spec);

        ServiceDTO dto = k8sMapper.mapToServiceDto(service);

        assertThat(dto.name()).isEqualTo("test-svc");
        assertThat(dto.type()).isEqualTo("ClusterIP");
        assertThat(dto.clusterIPs()).contains("10.0.0.1");
        assertThat(dto.ports()).hasSize(1);
        assertThat(dto.ports().get(0).port()).isEqualTo(80);
    }

    @Test
    void testMapToConfigMap() {
        ConfigMapRequestDTO request = new ConfigMapRequestDTO("test-cm", "default", Map.of("key", "value"), Map.of());
        ConfigMap cm = k8sMapper.mapToConfigMap(request);

        assertThat(cm.getMetadata().getName()).isEqualTo("test-cm");
        assertThat(cm.getData()).containsEntry("key", "value");
    }

    @Test
    void testMapToConfigMapDto() {
        ConfigMap cm = new ConfigMap();
        ObjectMeta metadata = new ObjectMeta();
        metadata.setName("test-cm");
        metadata.setNamespace("default");
        cm.setMetadata(metadata);
        cm.setData(Map.of("key", "value"));

        ConfigMapDTO dto = k8sMapper.mapToConfigMapDto(cm);

        assertThat(dto.name()).isEqualTo("test-cm");
        assertThat(dto.data()).containsEntry("key", "value");
    }

    @Test
    void testMapToNamespace() {
        NamespaceRequestDTO request = new NamespaceRequestDTO("test-ns", Map.of("app", "test"), Map.of());
        Namespace ns = k8sMapper.mapToNamespace(request);

        assertThat(ns.getMetadata().getName()).isEqualTo("test-ns");
        assertThat(ns.getMetadata().getLabels()).containsEntry("app", "test");
    }

    @Test
    void testMapToNamespaceDto() {
        Namespace ns = new Namespace();
        ObjectMeta metadata = new ObjectMeta();
        metadata.setName("test-ns");
        metadata.setCreationTimestamp("2023-01-01T00:00:00Z");
        ns.setMetadata(metadata);
        
        NamespaceStatus status = new NamespaceStatus();
        status.setPhase("Active");
        ns.setStatus(status);

        NamespaceDTO dto = k8sMapper.mapToNamespaceDto(ns);

        assertThat(dto.name()).isEqualTo("test-ns");
        assertThat(dto.status()).isEqualTo("Active");
    }
}
