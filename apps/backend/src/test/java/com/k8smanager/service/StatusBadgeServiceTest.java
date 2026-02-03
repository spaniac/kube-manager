package com.k8smanager.service;

import io.fabric8.kubernetes.api.model.Namespace;
import io.fabric8.kubernetes.api.model.ObjectMeta;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

class StatusBadgeServiceTest {

    @Test
    void testGetConfigStatusBadgeForExisting() {
        StatusBadgeService service = new StatusBadgeService();
        var result = service.getConfigStatusBadge("test-config", true);
        assertThat(result.severity()).isEqualTo("success");
    }

    @Test
    void testGetConfigStatusBadgeForNotExisting() {
        StatusBadgeService service = new StatusBadgeService();
        var result = service.getConfigStatusBadge("test-config", false);
        assertThat(result.severity()).isEqualTo("neutral");
    }

    @Test
    void testGetNamespaceStatusBadgeForActive() {
        StatusBadgeService service = new StatusBadgeService();
        Namespace ns = new Namespace();
        ObjectMeta metadata = new ObjectMeta();
        metadata.setName("test-ns");
        ns.setMetadata(metadata);
        io.fabric8.kubernetes.api.model.NamespaceStatus status = new io.fabric8.kubernetes.api.model.NamespaceStatus();
        status.setPhase("Active");
        ns.setStatus(status);

        var result = service.getNamespaceStatusBadge(ns);
        assertThat(result.severity()).isEqualTo("success");
    }

    @Test
    void testGetNamespaceStatusBadgeForTerminating() {
        StatusBadgeService service = new StatusBadgeService();
        Namespace ns = new Namespace();
        ObjectMeta metadata = new ObjectMeta();
        metadata.setName("test-ns");
        ns.setMetadata(metadata);
        io.fabric8.kubernetes.api.model.NamespaceStatus status = new io.fabric8.kubernetes.api.model.NamespaceStatus();
        status.setPhase("Terminating");
        ns.setStatus(status);

        var result = service.getNamespaceStatusBadge(ns);
        assertThat(result.severity()).isEqualTo("warning");
    }
}
