package com.k8smanager.service;

import io.fabric8.kubernetes.api.model.*;
import io.fabric8.kubernetes.api.model.apps.*;
import io.fabric8.kubernetes.api.model.batch.v1.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

class StatusBadgeServiceTest {

    private StatusBadgeService service;

    @BeforeEach
    void setUp() {
        service = new StatusBadgeService();
    }

    @Test
    void testGetConfigStatusBadgeForExisting() {
        var result = service.getConfigStatusBadge("test-config", true);
        assertThat(result.severity()).isEqualTo("success");
    }

    @Test
    void testGetConfigStatusBadgeForNotExisting() {
        var result = service.getConfigStatusBadge("test-config", false);
        assertThat(result.severity()).isEqualTo("neutral");
    }

    @Test
    void testGetNamespaceStatusBadgeForActive() {
        Namespace ns = createNamespace("test-ns", "Active");
        var result = service.getNamespaceStatusBadge(ns);
        assertThat(result.severity()).isEqualTo("success");
    }

    @Test
    void testGetNamespaceStatusBadgeForTerminating() {
        Namespace ns = createNamespace("test-ns", "Terminating");
        var result = service.getNamespaceStatusBadge(ns);
        assertThat(result.severity()).isEqualTo("warning");
    }

    @Test
    void testGetNamespaceStatusBadgeForNull() {
        var result = service.getNamespaceStatusBadge(null);
        assertThat(result.severity()).isEqualTo("neutral");
    }

    @Test
    void testGetPodStatusBadgeRunning() {
        Pod pod = createPod("Running", true);
        var result = service.getPodStatusBadge(pod);
        assertThat(result.severity()).isEqualTo("success");
    }

    @Test
    void testGetPodStatusBadgePending() {
        Pod pod = createPod("Pending", false);
        var result = service.getPodStatusBadge(pod);
        assertThat(result.severity()).isEqualTo("warning");
    }

    @Test
    void testGetPodStatusBadgeFailed() {
        Pod pod = createPod("Failed", false);
        var result = service.getPodStatusBadge(pod);
        assertThat(result.severity()).isEqualTo("error");
    }

    @Test
    void testGetPodStatusBadgeSucceeded() {
        Pod pod = createPod("Succeeded", false);
        var result = service.getPodStatusBadge(pod);
        assertThat(result.severity()).isEqualTo("success");
    }

    @Test
    void testGetPodStatusBadgeUnknown() {
        Pod pod = createPod("Unknown", false);
        var result = service.getPodStatusBadge(pod);
        assertThat(result.severity()).isEqualTo("neutral");
    }

    @Test
    void testGetPodStatusBadgeForNull() {
        var result = service.getPodStatusBadge(null);
        assertThat(result.severity()).isEqualTo("neutral");
    }

    @Test
    void testGetDeploymentStatusBadgeReady() {
        Deployment deployment = createDeployment(3, 3, 3, 3, false);
        var result = service.getDeploymentStatusBadge(deployment);
        assertThat(result.severity()).isEqualTo("success");
    }

    @Test
    void testGetDeploymentStatusBadgeProgressing() {
        Deployment deployment = createDeployment(3, 2, 2, 2, false);
        var result = service.getDeploymentStatusBadge(deployment);
        assertThat(result.severity()).isEqualTo("info");
    }

    @Test
    void testGetDeploymentStatusBadgePaused() {
        Deployment deployment = createDeployment(3, 3, 3, 3, true);
        var result = service.getDeploymentStatusBadge(deployment);
        assertThat(result.severity()).isEqualTo("info");
    }

    @Test
    void testGetDeploymentStatusBadgeForNull() {
        var result = service.getDeploymentStatusBadge(null);
        assertThat(result.severity()).isEqualTo("neutral");
    }

    @Test
    void testGetStatefulSetStatusBadgeReady() {
        StatefulSet statefulSet = createStatefulSet(3, 3, 3);
        var result = service.getStatefulSetStatusBadge(statefulSet);
        assertThat(result.severity()).isEqualTo("success");
    }

    @Test
    void testGetStatefulSetStatusBadgeProgressing() {
        StatefulSet statefulSet = createStatefulSet(3, 2, 2);
        var result = service.getStatefulSetStatusBadge(statefulSet);
        assertThat(result.severity()).isEqualTo("info");
    }

    @Test
    void testGetStatefulSetStatusBadgeForNull() {
        var result = service.getStatefulSetStatusBadge(null);
        assertThat(result.severity()).isEqualTo("neutral");
    }

    @Test
    void testGetDaemonSetStatusBadgeReady() {
        DaemonSet daemonSet = createDaemonSet(3, 3, 3, 3);
        var result = service.getDaemonSetStatusBadge(daemonSet);
        assertThat(result.severity()).isEqualTo("success");
    }

    @Test
    void testGetDaemonSetStatusBadgeScheduling() {
        DaemonSet daemonSet = createDaemonSet(3, 2, 2, 2);
        var result = service.getDaemonSetStatusBadge(daemonSet);
        assertThat(result.severity()).isEqualTo("info");
    }

    @Test
    void testGetDaemonSetStatusBadgeNotReady() {
        DaemonSet daemonSet = createDaemonSet(3, 3, 2, 2);
        var result = service.getDaemonSetStatusBadge(daemonSet);
        assertThat(result.severity()).isEqualTo("warning");
    }

    @Test
    void testGetDaemonSetStatusBadgeForNull() {
        var result = service.getDaemonSetStatusBadge(null);
        assertThat(result.severity()).isEqualTo("neutral");
    }

    @Test
    void testGetJobStatusBadgeComplete() {
        Job job = createJob(0, 1, 0);
        var result = service.getJobStatusBadge(job);
        assertThat(result.severity()).isEqualTo("success");
    }

    @Test
    void testGetJobStatusBadgeActive() {
        Job job = createJob(1, 0, 0);
        var result = service.getJobStatusBadge(job);
        assertThat(result.severity()).isEqualTo("info");
    }

    @Test
    void testGetJobStatusBadgeFailed() {
        Job job = createJob(0, 0, 1);
        var result = service.getJobStatusBadge(job);
        assertThat(result.severity()).isEqualTo("error");
    }

    @Test
    void testGetJobStatusBadgeForNull() {
        var result = service.getJobStatusBadge(null);
        assertThat(result.severity()).isEqualTo("neutral");
    }

    @Test
    void testGetNodeStatusBadgeReady() {
        Node node = createNode(true, false, false, false, false);
        var result = service.getNodeStatusBadge(node);
        assertThat(result.severity()).isEqualTo("success");
    }

    @Test
    void testGetNodeStatusBadgeNotReady() {
        Node node = new Node();
        NodeStatus status = new NodeStatus();
        status.setConditions(List.of(createNodeCondition("Ready", false)));
        node.setStatus(status);
        var result = service.getNodeStatusBadge(node);
        assertThat(result.severity()).isEqualTo("error");
    }

    @Test
    void testGetNodeStatusBadgeMemoryPressure() {
        Node node = createNode(true, true, false, false, false);
        var result = service.getNodeStatusBadge(node);
        assertThat(result.severity()).isEqualTo("warning");
    }

    @Test
    void testGetNodeStatusBadgeDiskPressure() {
        Node node = createNode(true, false, true, false, false);
        var result = service.getNodeStatusBadge(node);
        assertThat(result.severity()).isEqualTo("warning");
    }

    @Test
    void testGetNodeStatusBadgeNetworkUnavailable() {
        Node node = createNode(true, false, false, false, true);
        var result = service.getNodeStatusBadge(node);
        assertThat(result.severity()).isEqualTo("error");
    }

    @Test
    void testGetNodeStatusBadgeForNull() {
        var result = service.getNodeStatusBadge(null);
        assertThat(result.severity()).isEqualTo("neutral");
    }

    @Test
    void testGetServiceStatusBadgeClusterIP() {
        Service svc = createService("ClusterIP");
        var result = service.getServiceStatusBadge(svc);
        assertThat(result.severity()).isEqualTo("success");
    }

    @Test
    void testGetServiceStatusBadgeLoadBalancer() {
        Service svc = createService("LoadBalancer");
        var result = service.getServiceStatusBadge(svc);
        assertThat(result.severity()).isEqualTo("success");
    }

    @Test
    void testGetServiceStatusBadgeNodePort() {
        Service svc = createService("NodePort");
        var result = service.getServiceStatusBadge(svc);
        assertThat(result.severity()).isEqualTo("info");
    }

    @Test
    void testGetServiceStatusBadgeForNull() {
        var result = service.getServiceStatusBadge(null);
        assertThat(result.severity()).isEqualTo("neutral");
    }

    private Namespace createNamespace(String name, String phase) {
        Namespace ns = new Namespace();
        ObjectMeta metadata = new ObjectMeta();
        metadata.setName(name);
        ns.setMetadata(metadata);
        NamespaceStatus status = new NamespaceStatus();
        status.setPhase(phase);
        ns.setStatus(status);
        return ns;
    }

    private Pod createPod(String phase, boolean allContainersReady) {
        Pod pod = new Pod();
        PodStatus status = new PodStatus();
        status.setPhase(phase);
        if ("Running".equals(phase)) {
            ContainerStatus cs = new ContainerStatus();
            cs.setReady(allContainersReady);
            status.setContainerStatuses(List.of(cs));
        }
        pod.setStatus(status);
        return pod;
    }

    private Deployment createDeployment(int desired, int ready, int available, int updated, boolean paused) {
        Deployment deployment = new Deployment();
        DeploymentSpec spec = new DeploymentSpec();
        spec.setReplicas(desired);
        spec.setPaused(paused);
        deployment.setSpec(spec);

        DeploymentStatus status = new DeploymentStatus();
        status.setReadyReplicas(ready);
        status.setAvailableReplicas(available);
        status.setUpdatedReplicas(updated);
        deployment.setStatus(status);
        return deployment;
    }

    private StatefulSet createStatefulSet(int desired, int ready, int current) {
        StatefulSet ss = new StatefulSet();
        StatefulSetSpec spec = new StatefulSetSpec();
        spec.setReplicas(desired);
        ss.setSpec(spec);

        StatefulSetStatus status = new StatefulSetStatus();
        status.setReadyReplicas(ready);
        status.setCurrentReplicas(current);
        ss.setStatus(status);
        return ss;
    }

    private DaemonSet createDaemonSet(int desired, int current, int ready, int available) {
        DaemonSet ds = new DaemonSet();
        ds.setSpec(new DaemonSetSpec());

        DaemonSetStatus status = new DaemonSetStatus();
        status.setDesiredNumberScheduled(desired);
        status.setCurrentNumberScheduled(current);
        status.setNumberReady(ready);
        status.setNumberAvailable(available);
        ds.setStatus(status);
        return ds;
    }

    private Job createJob(int active, int succeeded, int failed) {
        Job job = new Job();
        JobStatus status = new JobStatus();
        status.setActive(active);
        status.setSucceeded(succeeded);
        status.setFailed(failed);
        job.setStatus(status);
        return job;
    }

    private Node createNode(boolean ready, boolean memPressure, boolean diskPressure, boolean pidPressure, boolean networkUnavailable) {
        Node node = new Node();
        NodeStatus status = new NodeStatus();
        status.setConditions(List.of(
            createNodeCondition("Ready", ready),
            createNodeCondition("MemoryPressure", memPressure),
            createNodeCondition("DiskPressure", diskPressure),
            createNodeCondition("PIDPressure", pidPressure),
            createNodeCondition("NetworkUnavailable", networkUnavailable)
        ));
        node.setStatus(status);
        return node;
    }

    private NodeCondition createNodeCondition(String type, boolean value) {
        NodeCondition condition = new NodeCondition();
        condition.setType(type);
        condition.setStatus(value ? "True" : "False");
        condition.setMessage("Test condition message");
        condition.setReason("TestReason");
        return condition;
    }

    private Service createService(String type) {
        Service svc = new Service();
        ServiceSpec spec = new ServiceSpec();
        spec.setType(type);
        svc.setSpec(spec);
        return svc;
    }
}
