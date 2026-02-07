package com.k8smanager.service;

import com.k8smanager.dto.NamespaceDTO;
import com.k8smanager.dto.NamespaceRequestDTO;
import com.k8smanager.dto.ResourceQuotaDTO;
import com.k8smanager.rbac.RbacService;
import io.fabric8.kubernetes.api.model.Namespace;
import io.fabric8.kubernetes.api.model.NamespaceList;
import io.fabric8.kubernetes.api.model.NamespaceStatus;
import io.fabric8.kubernetes.api.model.ObjectMeta;
import io.fabric8.kubernetes.api.model.Quantity;
import io.fabric8.kubernetes.api.model.ResourceQuota;
import io.fabric8.kubernetes.api.model.ResourceQuotaList;
import io.fabric8.kubernetes.api.model.ResourceQuotaSpec;
import io.fabric8.kubernetes.api.model.ResourceQuotaStatus;
import io.fabric8.kubernetes.client.KubernetesClient;
import io.fabric8.kubernetes.client.dsl.MixedOperation;
import io.fabric8.kubernetes.client.dsl.NonNamespaceOperation;
import io.fabric8.kubernetes.client.dsl.Resource;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class NamespaceServiceTest {

    @Mock
    private KubernetesClient kubernetesClient;

    @Mock
    private RbacService rbacService;

    @Mock
    private MixedOperation<Namespace, NamespaceList, Resource<Namespace>> namespaceOperation;

    @Mock
    private MixedOperation<ResourceQuota, ResourceQuotaList, Resource<ResourceQuota>> resourceQuotaOperation;

    @Mock
    private Resource<Namespace> namespaceResource;

    @Mock
    private NonNamespaceOperation<ResourceQuota, ResourceQuotaList, Resource<ResourceQuota>> namespacedQuotaOperation;

    @InjectMocks
    private NamespaceService namespaceService;

    @BeforeEach
    void setUp() {
        lenient().when(kubernetesClient.namespaces()).thenReturn(namespaceOperation);
        lenient().when(kubernetesClient.resourceQuotas()).thenReturn(resourceQuotaOperation);
    }

    @Test
    void testGetNamespaces() {
        NamespaceList namespaceList = new NamespaceList();
        Namespace ns1 = createMockNamespace("ns1", "Active");
        Namespace ns2 = createMockNamespace("ns2", "Terminating");
        namespaceList.setItems(List.of(ns1, ns2));

        when(namespaceOperation.list()).thenReturn(namespaceList);

        List<NamespaceDTO> result = namespaceService.getNamespaces();

        assertThat(result).hasSize(2);
        assertThat(result.get(0).name()).isEqualTo("ns1");
        assertThat(result.get(0).status()).isEqualTo("Active");
        assertThat(result.get(1).name()).isEqualTo("ns2");
        assertThat(result.get(1).status()).isEqualTo("Terminating");
    }

    @Test
    void testGetNamespaceFound() {
        String name = "test-ns";
        Namespace ns = createMockNamespace(name, "Active");

        when(namespaceOperation.withName(name)).thenReturn(namespaceResource);
        when(namespaceResource.get()).thenReturn(ns);

        NamespaceDTO result = namespaceService.getNamespace(name);

        assertThat(result).isNotNull();
        assertThat(result.name()).isEqualTo(name);
        assertThat(result.status()).isEqualTo("Active");
    }

    @Test
    void testGetNamespaceNotFound() {
        String name = "non-existent";

        when(namespaceOperation.withName(name)).thenReturn(namespaceResource);
        when(namespaceResource.get()).thenReturn(null);

        NamespaceDTO result = namespaceService.getNamespace(name);

        assertThat(result).isNull();
    }

    @Test
    void testCreateNamespace() {
        String name = "new-ns";
        NamespaceRequestDTO request = new NamespaceRequestDTO(name, Map.of("app", "test"), Map.of("key", "val"));
        
        Namespace createdNs = createMockNamespace(name, "Active");
        createdNs.getMetadata().setLabels(request.labels());
        createdNs.getMetadata().setAnnotations(request.annotations());

        when(namespaceOperation.resource(any(Namespace.class))).thenReturn(namespaceResource);
        when(namespaceResource.create()).thenReturn(createdNs);

        NamespaceDTO result = namespaceService.createNamespace(request);

        assertThat(result).isNotNull();
        assertThat(result.name()).isEqualTo(name);
        assertThat(result.labels()).containsEntry("app", "test");
        assertThat(result.annotations()).containsEntry("key", "val");
        verify(namespaceOperation).resource(any(Namespace.class));
        verify(namespaceResource).create();
    }

    @Test
    void testUpdateNamespace() {
        String name = "test-ns";
        NamespaceRequestDTO request = new NamespaceRequestDTO(name, Map.of("new-label", "val"), null);
        
        Namespace existingNs = createMockNamespace(name, "Active");
        Namespace updatedNs = createMockNamespace(name, "Active");
        updatedNs.getMetadata().setLabels(request.labels());

        when(namespaceOperation.withName(name)).thenReturn(namespaceResource);
        when(namespaceResource.get()).thenReturn(existingNs);
        when(namespaceOperation.resource(existingNs)).thenReturn(namespaceResource);
        when(namespaceResource.replace()).thenReturn(updatedNs);

        NamespaceDTO result = namespaceService.updateNamespace(name, request);

        assertThat(result).isNotNull();
        assertThat(result.labels()).containsEntry("new-label", "val");
        verify(namespaceResource).replace();
    }

    @Test
    void testUpdateNamespaceNotFound() {
        String name = "non-existent";
        NamespaceRequestDTO request = new NamespaceRequestDTO(name, null, null);

        when(namespaceOperation.withName(name)).thenReturn(namespaceResource);
        when(namespaceResource.get()).thenReturn(null);

        NamespaceDTO result = namespaceService.updateNamespace(name, request);

        assertThat(result).isNull();
        verify(namespaceResource, never()).replace();
    }

    @Test
    void testDeleteNamespace() {
        String name = "test-ns";
        Namespace ns = createMockNamespace(name, "Active");

        when(namespaceOperation.withName(name)).thenReturn(namespaceResource);
        when(namespaceResource.get()).thenReturn(ns);
        when(namespaceOperation.resource(ns)).thenReturn(namespaceResource);

        namespaceService.deleteNamespace(name);

        verify(namespaceResource).delete();
    }

    @Test
    void testDeleteNamespaceNotFound() {
        String name = "non-existent";

        when(namespaceOperation.withName(name)).thenReturn(namespaceResource);
        when(namespaceResource.get()).thenReturn(null);

        namespaceService.deleteNamespace(name);

        verify(namespaceResource, never()).delete();
    }

    @Test
    void testGetNamespaceQuota() {
        String namespace = "test-ns";
        String quotaName = "compute-quota";
        
        ResourceQuota quota = new ResourceQuota();
        ObjectMeta metadata = new ObjectMeta();
        metadata.setName(quotaName);
        metadata.setNamespace(namespace);
        quota.setMetadata(metadata);
        
        ResourceQuotaSpec spec = new ResourceQuotaSpec();
        spec.setHard(Map.of("cpu", new Quantity("2"), "memory", new Quantity("4Gi")));
        quota.setSpec(spec);
        
        ResourceQuotaStatus status = new ResourceQuotaStatus();
        status.setUsed(Map.of("cpu", new Quantity("1"), "memory", new Quantity("2Gi")));
        quota.setStatus(status);
        
        ResourceQuotaList quotaList = new ResourceQuotaList();
        quotaList.setItems(List.of(quota));

        when(resourceQuotaOperation.inNamespace(namespace)).thenReturn(namespacedQuotaOperation);
        when(namespacedQuotaOperation.list()).thenReturn(quotaList);

        ResourceQuotaDTO result = namespaceService.getNamespaceQuota(namespace);

        assertThat(result).isNotNull();
        assertThat(result.name()).isEqualTo(quotaName);
        assertThat(result.hard()).containsEntry("cpu", "2");
        assertThat(result.used()).containsEntry("memory", "2Gi");
    }

    @Test
    void testGetNamespaceQuotaNotFound() {
        String namespace = "test-ns";
        ResourceQuotaList quotaList = new ResourceQuotaList();
        quotaList.setItems(Collections.emptyList());

        when(resourceQuotaOperation.inNamespace(namespace)).thenReturn(namespacedQuotaOperation);
        when(namespacedQuotaOperation.list()).thenReturn(quotaList);

        ResourceQuotaDTO result = namespaceService.getNamespaceQuota(namespace);

        assertThat(result).isNull();
    }

    @Test
    void testSearchNamespaces() {
        NamespaceList namespaceList = new NamespaceList();
        Namespace ns1 = createMockNamespace("prod-backend", "Active");
        Namespace ns2 = createMockNamespace("prod-frontend", "Active");
        Namespace ns3 = createMockNamespace("dev-backend", "Active");
        namespaceList.setItems(List.of(ns1, ns2, ns3));

        when(namespaceOperation.list()).thenReturn(namespaceList);

        List<NamespaceDTO> result = namespaceService.searchNamespaces("prod");

        assertThat(result).hasSize(2);
        assertThat(result).extracting(NamespaceDTO::name).containsExactly("prod-backend", "prod-frontend");
    }

    private Namespace createMockNamespace(String name, String statusPhase) {
        Namespace ns = new Namespace();
        ObjectMeta metadata = new ObjectMeta();
        metadata.setName(name);
        metadata.setLabels(new HashMap<>());
        metadata.setAnnotations(new HashMap<>());
        metadata.setCreationTimestamp("2023-01-01T00:00:00Z");
        ns.setMetadata(metadata);
        
        NamespaceStatus status = new NamespaceStatus();
        status.setPhase(statusPhase);
        ns.setStatus(status);
        
        return ns;
    }
}
