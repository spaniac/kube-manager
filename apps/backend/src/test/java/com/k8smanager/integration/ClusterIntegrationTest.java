package com.k8smanager.integration;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.testSecurityContext;
import static org.springframework.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.user;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
@AutoConfigureMockMvc
class ClusterIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    void shouldReturnClusterInfo() throws Exception {
        mockMvc.perform(get("/api/v1/cluster/info"))
                .andExpect(status().isOk());
    }
}
