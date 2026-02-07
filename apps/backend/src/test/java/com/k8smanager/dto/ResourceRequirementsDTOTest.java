package com.k8smanager.dto;

import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

class ResourceRequirementsDTOTest {

    @Test
    void testResourceRequirementsDTOCreation() {
        ResourceLimitsDTO limits = new ResourceLimitsDTO("200m", "200Mi");
        ResourceRequestsDTO requests = new ResourceRequestsDTO("100m", "100Mi");

        ResourceRequirementsDTO dto = new ResourceRequirementsDTO(limits, requests);

        assertThat(dto.requests()).isNotNull();
        assertThat(dto.requests().cpu()).isEqualTo("100m");
        assertThat(dto.requests().memory()).isEqualTo("100Mi");
        assertThat(dto.limits().cpu()).isEqualTo("200m");
        assertThat(dto.limits().memory()).isEqualTo("200Mi");
    }

    @Test
    void testResourceRequirementsDTOWithNullRequests() {
        ResourceRequirementsDTO dto = new ResourceRequirementsDTO(null, null);

        assertThat(dto.requests()).isNull();
        assertThat(dto.limits()).isNull();
    }

    @Test
    void testResourceLimitsDTOCreation() {
        ResourceLimitsDTO dto = new ResourceLimitsDTO("200m", "200Mi");

        assertThat(dto.cpu()).isEqualTo("200m");
        assertThat(dto.memory()).isEqualTo("200Mi");
    }
}
