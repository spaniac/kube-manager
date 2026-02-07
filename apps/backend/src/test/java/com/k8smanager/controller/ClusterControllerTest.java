package com.k8smanager.controller;

import com.k8smanager.common.response.ApiResponse;
import com.k8smanager.dto.*;
import com.k8smanager.rbac.RbacService;
import com.k8smanager.service.ClusterService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class ClusterControllerTest {

    @Mock
    private ClusterService clusterService;

    @Mock
    private RbacService rbacService;

    @InjectMocks
    private ClusterController clusterController;

    @Test
    void testGetCluster() {
        ClusterMetricsDTO metrics = new ClusterMetricsDTO(3, 3, 50, 50, "12", "12Gi", "100Gi");
        ClusterInfoDTO clusterInfo = new ClusterInfoDTO("test-cluster", "v1.28.0", "linux", "amd64", metrics);
        when(clusterService.getClusterInfo()).thenReturn(clusterInfo);

        ApiResponse<ClusterInfoDTO> response = clusterController.getCluster();

        assertThat(response.isSuccess()).isTrue();
        assertThat(response.getData()).isEqualTo(clusterInfo);
        verify(clusterService).getClusterInfo();
    }

    @Test
    void testGetNodes() {
        List<NodeInfoDTO> nodes = List.of(new NodeInfoDTO("node1", "Ready", "v1.28.0", "linux", "amd64", "5.15", null, null, List.of(), List.of()));
        when(clusterService.getNodes()).thenReturn(nodes);

        ApiResponse<List<NodeInfoDTO>> response = clusterController.getNodes();

        assertThat(response.isSuccess()).isTrue();
        assertThat(response.getData()).isEqualTo(nodes);
        verify(clusterService).getNodes();
    }

    @Test
    void testGetNode() {
        String name = "node1";
        NodeInfoDTO node = new NodeInfoDTO(name, "Ready", "v1.28.0", "linux", "amd64", "5.15", null, null, List.of(), List.of());
        when(clusterService.getNode(name)).thenReturn(node);

        ApiResponse<NodeInfoDTO> response = clusterController.getNode(name);

        assertThat(response.isSuccess()).isTrue();
        assertThat(response.getData()).isEqualTo(node);
        verify(clusterService).getNode(name);
    }

    @Test
    void testCordonNode() {
        String name = "node1";
        
        ApiResponse<Void> response = clusterController.cordonNode(name);

        assertThat(response.isSuccess()).isTrue();
        assertThat(response.getMessage()).contains("cordoned");
        verify(clusterService).cordonNode(name);
    }

    @Test
    void testUncordonNode() {
        String name = "node1";
        
        ApiResponse<Void> response = clusterController.uncordonNode(name);

        assertThat(response.isSuccess()).isTrue();
        assertThat(response.getMessage()).contains("uncordoned");
        verify(clusterService).uncordonNode(name);
    }

    @Test
    void testDrainNode() {
        String name = "node1";
        
        ApiResponse<Void> response = clusterController.drainNode(name);

        assertThat(response.isSuccess()).isTrue();
        assertThat(response.getMessage()).contains("drained");
        verify(clusterService).drainNode(name);
    }

    @Test
    void testGetClusterHealth() {
        ClusterHealthDTO health = new ClusterHealthDTO("Healthy", 3, 3, 10, 10, 0, System.currentTimeMillis());
        when(clusterService.getClusterHealth()).thenReturn(health);

        ApiResponse<ClusterHealthDTO> response = clusterController.getClusterHealth();

        assertThat(response.isSuccess()).isTrue();
        assertThat(response.getData()).isEqualTo(health);
        verify(clusterService).getClusterHealth();
    }

    @Test
    void testGetClusterUsage() {
        ClusterResourceUsageDTO usage = new ClusterResourceUsageDTO("32", "16", 50.0, "128Gi", "64Gi", 50.0, 100);
        when(clusterService.getResourceUsage()).thenReturn(usage);

        ApiResponse<ClusterResourceUsageDTO> response = clusterController.getClusterUsage();

        assertThat(response.isSuccess()).isTrue();
        assertThat(response.getData()).isEqualTo(usage);
        verify(clusterService).getResourceUsage();
    }
}
