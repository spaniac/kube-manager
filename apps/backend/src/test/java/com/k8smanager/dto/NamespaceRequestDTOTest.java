package com.k8smanager.dto;

import org.junit.jupiter.api.Test;

import java.util.Map;

import static org.assertj.core.api.Assertions.assertThat;

class NamespaceRequestDTOTest {

    @Test
    void testNamespaceRequestDTOCreation() {
        NamespaceRequestDTO dto = new NamespaceRequestDTO(
                "test-namespace",
                Map.of("key", "value"),
                Map.of("annotation", "value")
        );

        assertThat(dto.name()).isEqualTo("test-namespace");
        assertThat(dto.labels()).isEqualTo(Map.of("key", "value"));
        assertThat(dto.annotations()).isEqualTo(Map.of("annotation", "value"));
    }

    @Test
    void testNamespaceRequestDTOWithNullLabels() {
        NamespaceRequestDTO dto = new NamespaceRequestDTO(
                "test-namespace",
                null,
                null
        );

        assertThat(dto.name()).isEqualTo("test-namespace");
        assertThat(dto.labels()).isNull();
        assertThat(dto.annotations()).isNull();
    }
}
