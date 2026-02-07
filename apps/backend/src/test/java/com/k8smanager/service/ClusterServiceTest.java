package com.k8smanager.service;

import com.k8smanager.dto.*;
import io.fabric8.kubernetes.api.model.*;
import io.fabric8.kubernetes.api.model.events.v1.Event;
import io.fabric8.kubernetes.api.model.events.v1.EventList;
import io.fabric8.kubernetes.client.KubernetesClient;
import io.fabric8.kubernetes.client.VersionInfo;
import io.fabric8.kubernetes.client.dsl.MixedOperation;
import io.fabric8.kubernetes.client.dsl.NonNamespaceOperation;
import io.fabric8.kubernetes.client.dsl.Resource;
import io.fabric8.kubernetes.client.dsl.V1EventingAPIGroupDSL;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Map;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;

import io.fabric8.kubernetes.client.dsl.PodResource;

@ExtendWith(MockitoExtension.class)
@SuppressWarnings({"unchecked", "rawtypes"})
class ClusterServiceTest {

    @Mock
    private KubernetesClient kubernetesClient;

    @Mock
    private MixedOperation<Node, NodeList, Resource<Node>> nodeOperations;

    @Mock
    private MixedOperation<Pod, PodList, PodResource> podOperations;

    @Mock
    private MixedOperation<ConfigMap, ConfigMapList, Resource<ConfigMap>> configMapOperations;

    @Mock
    private NonNamespaceOperation<ConfigMap, ConfigMapList, Resource<ConfigMap>> namespacedConfigMaps;

    @Mock
    private Resource<Node> nodeResource;

    @Mock
    private Resource<ConfigMap> configMapResource;

    @Mock
    private V1EventingAPIGroupDSL v1EventDsl;

    @Mock
    private MixedOperation<Event, EventList, Resource<Event>> eventOperations;

    @Mock
    private NonNamespaceOperation<Event, EventList, Resource<Event>> namespacedEvents;

    @InjectMocks
    private ClusterService clusterService;

    @BeforeEach
    void setUp() {
        lenient().when(kubernetesClient.nodes()).thenReturn(nodeOperations);
        lenient().when(kubernetesClient.pods()).thenReturn(podOperations);
        lenient().when(kubernetesClient.configMaps()).thenReturn(configMapOperations);
    }

    @Test
    void testGetNodesReturnsAllNodes() {
        NodeList nodeList = new NodeList();
        Node node1 = createMockNode("node-1", "Ready");
        Node node2 = createMockNode("node-2", "Ready");
        nodeList.setItems(List.of(node1, node2));

        when(nodeOperations.list()).thenReturn(nodeList);

        List<NodeInfoDTO> result = clusterService.getNodes();

        assertThat(result).hasSize(2);
        assertThat(result.get(0).name()).isEqualTo("node-1");
        assertThat(result.get(1).name()).isEqualTo("node-2");

        verify(nodeOperations).list();
    }

    @Test
    void testGetNodeReturnsSpecificNode() {
        Node node = createMockNode("test-node", "Ready");

        when(nodeOperations.withName(eq("test-node"))).thenReturn(nodeResource);
        when(nodeResource.get()).thenReturn(node);

        NodeInfoDTO result = clusterService.getNode("test-node");

        assertThat(result).isNotNull();
        assertThat(result.name()).isEqualTo("test-node");
        assertThat(result.status()).isEqualTo("Ready");

        verify(nodeOperations).withName(eq("test-node"));
        verify(nodeResource).get();
    }

    @Test
    void testCordonNodeSetsUnschedulable() {
        Node node = createMockNode("test-node", "Ready");
        
        when(nodeOperations.withName(eq("test-node"))).thenReturn(nodeResource);
        when(nodeResource.get()).thenReturn(node);
        when(nodeOperations.resource(node)).thenReturn(nodeResource);
        when(nodeResource.replace()).thenReturn(node);

        clusterService.cordonNode("test-node");

        assertThat(node.getSpec().getUnschedulable()).isTrue();
        verify(nodeResource).replace();
    }

    @Test
    void testUncordonNodeSetsSchedulable() {
        Node node = createMockNode("test-node", "Ready");
        node.getSpec().setUnschedulable(true);
        
        when(nodeOperations.withName(eq("test-node"))).thenReturn(nodeResource);
        when(nodeResource.get()).thenReturn(node);
        when(nodeOperations.resource(node)).thenReturn(nodeResource);
        when(nodeResource.replace()).thenReturn(node);

        clusterService.uncordonNode("test-node");

        assertThat(node.getSpec().getUnschedulable()).isFalse();
        verify(nodeResource).replace();
    }

    @Test
    void testCordonNodeWhenNodeNotFound() {
        when(nodeOperations.withName(eq("non-existent"))).thenReturn(nodeResource);
        when(nodeResource.get()).thenReturn(null);

        clusterService.cordonNode("non-existent");

        verify(nodeResource, never()).replace();
    }

    @Test
    void testGetClusterHealthWhenAllNodesReady() {
        NodeList nodeList = new NodeList();
        nodeList.setItems(List.of(
            createMockNode("node-1", "Ready"),
            createMockNode("node-2", "Ready")
        ));

        PodList podList = new PodList();
        podList.setItems(List.of(
            createMockPod("pod-1", "Running"),
            createMockPod("pod-2", "Running")
        ));

        when(nodeOperations.list()).thenReturn(nodeList);
        when(podOperations.list()).thenReturn(podList);

        ClusterHealthDTO result = clusterService.getClusterHealth();

        assertThat(result.status()).isEqualTo("Healthy");
        assertThat(result.totalNodes()).isEqualTo(2);
        assertThat(result.readyNodes()).isEqualTo(2);
        assertThat(result.totalPods()).isEqualTo(2);
        assertThat(result.runningPods()).isEqualTo(2);
        assertThat(result.failedPods()).isEqualTo(0);
    }

    @Test
    void testGetClusterHealthWhenSomeNodesNotReady() {
        NodeList nodeList = new NodeList();
        nodeList.setItems(List.of(
            createMockNode("node-1", "Ready"),
            createMockNode("node-2", "NotReady")
        ));

        PodList podList = new PodList();
        podList.setItems(List.of(
            createMockPod("pod-1", "Running"),
            createMockPod("pod-2", "Failed")
        ));

        when(nodeOperations.list()).thenReturn(nodeList);
        when(podOperations.list()).thenReturn(podList);

        ClusterHealthDTO result = clusterService.getClusterHealth();

        assertThat(result.status()).isEqualTo("Degraded");
        assertThat(result.totalNodes()).isEqualTo(2);
        assertThat(result.readyNodes()).isEqualTo(1);
        assertThat(result.failedPods()).isEqualTo(1);
    }

    @Test
    void testGetClusterInfoReturnsClusterDetails() {
        VersionInfo versionInfo = mock(VersionInfo.class);
        when(versionInfo.getGitVersion()).thenReturn("v1.28.0");
        when(versionInfo.getPlatform()).thenReturn("linux/amd64");

        NodeList nodeList = new NodeList();
        Node node = createMockNode("node-1", "Ready");
        nodeList.setItems(List.of(node));

        PodList podList = new PodList();
        podList.setItems(List.of(createMockPod("pod-1", "Running")));

        ConfigMap configMap = new ConfigMap();
        configMap.setData(Map.of("name", "test-cluster"));

        when(kubernetesClient.getKubernetesVersion()).thenReturn(versionInfo);
        when(nodeOperations.list()).thenReturn(nodeList);
        when(podOperations.list()).thenReturn(podList);
        when(configMapOperations.inNamespace(eq("kube-system"))).thenReturn(namespacedConfigMaps);
        when(namespacedConfigMaps.withName(eq("cluster-info"))).thenReturn(configMapResource);
        when(configMapResource.get()).thenReturn(configMap);

        ClusterInfoDTO result = clusterService.getClusterInfo();

        assertThat(result.name()).isEqualTo("test-cluster");
        assertThat(result.version()).isEqualTo("v1.28.0");
        assertThat(result.metrics()).isNotNull();
        assertThat(result.metrics().totalNodes()).isEqualTo(1);
    }

    @Test
    void testGetClusterInfoUsesDefaultNameWhenConfigMapNotFound() {
        VersionInfo versionInfo = mock(VersionInfo.class);
        when(versionInfo.getGitVersion()).thenReturn("v1.28.0");
        when(versionInfo.getPlatform()).thenReturn("linux/amd64");

        NodeList nodeList = new NodeList();
        Node node = createMockNode("node-1", "Ready");
        nodeList.setItems(List.of(node));

        PodList podList = new PodList();
        podList.setItems(List.of(createMockPod("pod-1", "Running")));

        when(kubernetesClient.getKubernetesVersion()).thenReturn(versionInfo);
        when(nodeOperations.list()).thenReturn(nodeList);
        when(podOperations.list()).thenReturn(podList);
        when(configMapOperations.inNamespace(eq("kube-system"))).thenReturn(namespacedConfigMaps);
        when(namespacedConfigMaps.withName(eq("cluster-info"))).thenReturn(configMapResource);
        when(configMapResource.get()).thenReturn(null);

        ClusterInfoDTO result = clusterService.getClusterInfo();

        assertThat(result.name()).isEqualTo("kubernetes-cluster");
    }

    @Test
    void testGetResourceUsageCalculatesCorrectly() {
        NodeList nodeList = new NodeList();
        Node node = createMockNode("node-1", "Ready");
        node.getStatus().setCapacity(Map.of(
            "cpu", Quantity.parse("4"),
            "memory", Quantity.parse("8Gi")
        ));
        node.getStatus().setAllocatable(Map.of(
            "cpu", Quantity.parse("3"),
            "memory", Quantity.parse("6Gi")
        ));
        nodeList.setItems(List.of(node));

        PodList podList = new PodList();
        podList.setItems(List.of(createMockPod("pod-1", "Running")));

        when(nodeOperations.list()).thenReturn(nodeList);
        when(podOperations.list()).thenReturn(podList);

        ClusterResourceUsageDTO result = clusterService.getResourceUsage();

        assertThat(result).isNotNull();
        assertThat(result.podCount()).isEqualTo(1);
    }

    private Node createMockNode(String name, String status) {
        Node node = new Node();
        
        ObjectMeta metadata = new ObjectMeta();
        metadata.setName(name);
        metadata.setLabels(Map.of("kubernetes.io/hostname", name));
        node.setMetadata(metadata);

        NodeSpec spec = new NodeSpec();
        spec.setUnschedulable(false);
        node.setSpec(spec);

        NodeStatus nodeStatus = new NodeStatus();
        NodeCondition condition = new NodeCondition();
        condition.setType("Ready");
        condition.setStatus("Ready".equals(status) ? "True" : "False");
        condition.setMessage("Node is ready");
        condition.setReason("KubeletReady");
        nodeStatus.setConditions(List.of(condition));

        NodeSystemInfo nodeInfo = new NodeSystemInfo();
        nodeInfo.setKubeletVersion("v1.28.0");
        nodeInfo.setOsImage("Ubuntu 22.04");
        nodeInfo.setArchitecture("amd64");
        nodeInfo.setKernelVersion("5.15.0");
        nodeStatus.setNodeInfo(nodeInfo);

        nodeStatus.setCapacity(Map.of(
            "cpu", Quantity.parse("4"),
            "memory", Quantity.parse("8Gi"),
            "pods", Quantity.parse("110"),
            "ephemeral-storage", Quantity.parse("100Gi")
        ));

        nodeStatus.setAllocatable(Map.of(
            "cpu", Quantity.parse("3.8"),
            "memory", Quantity.parse("7.5Gi"),
            "pods", Quantity.parse("100"),
            "ephemeral-storage", Quantity.parse("95Gi")
        ));

        node.setStatus(nodeStatus);

        return node;
    }

    private Pod createMockPod(String name, String phase) {
        Pod pod = new Pod();
        
        ObjectMeta metadata = new ObjectMeta();
        metadata.setName(name);
        metadata.setNamespace("default");
        pod.setMetadata(metadata);

        PodSpec spec = new PodSpec();
        spec.setNodeName("node-1");
        Container container = new Container();
        container.setName("main");
        container.setImage("nginx:latest");
        spec.setContainers(List.of(container));
        pod.setSpec(spec);

        PodStatus status = new PodStatus();
        status.setPhase(phase);
        pod.setStatus(status);

        return pod;
    }
}
