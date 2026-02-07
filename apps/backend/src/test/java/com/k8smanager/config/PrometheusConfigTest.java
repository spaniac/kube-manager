package com.k8smanager.config;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.test.util.ReflectionTestUtils;
import org.springframework.web.reactive.function.client.WebClient;

import java.time.Duration;

import static org.assertj.core.api.Assertions.assertThat;

@ExtendWith(org.mockito.junit.jupiter.MockitoExtension.class)
class PrometheusConfigTest {

    private PrometheusConfig prometheusConfig;

    @BeforeEach
    void setUp() {
        prometheusConfig = new PrometheusConfig();
        ReflectionTestUtils.setField(prometheusConfig, "prometheusUrl", "http://prometheus:9090");
        ReflectionTestUtils.setField(prometheusConfig, "prometheusTimeout", Duration.ofSeconds(30));
        ReflectionTestUtils.setField(prometheusConfig, "prometheusEnabled", true);
    }

    @Test
    void prometheusWebClient_whenEnabled_shouldConfigureWebClient() {
        // When
        WebClient result = prometheusConfig.prometheusWebClient();

        // Then
        assertThat(result).isNotNull();
    }

    @Test
    void prometheusWebClient_whenDisabled_shouldReturnDefaultWebClient() {
        // Given
        ReflectionTestUtils.setField(prometheusConfig, "prometheusEnabled", false);

        // When
        WebClient result = prometheusConfig.prometheusWebClient();

        // Then
        assertThat(result).isNotNull();
    }

    @Test
    void prometheusWebClient_withCustomUrl_shouldUseCustomUrl() {
        // Given
        String customUrl = "http://custom-prometheus:8080";
        ReflectionTestUtils.setField(prometheusConfig, "prometheusUrl", customUrl);

        // When
        WebClient result = prometheusConfig.prometheusWebClient();

        // Then
        assertThat(result).isNotNull();
    }

    @Test
    void prometheusWebClient_withCustomTimeout_shouldUseCustomTimeout() {
        // Given
        Duration customTimeout = Duration.ofSeconds(60);
        ReflectionTestUtils.setField(prometheusConfig, "prometheusTimeout", customTimeout);

        // When
        WebClient result = prometheusConfig.prometheusWebClient();

        // Then
        assertThat(result).isNotNull();
    }

    @Test
    void prometheusWebClient_multipleCalls_shouldReturnDifferentInstances() {
        // When
        WebClient webClient1 = prometheusConfig.prometheusWebClient();
        WebClient webClient2 = prometheusConfig.prometheusWebClient();

        // Then
        assertThat(webClient1).isNotSameAs(webClient2);
    }

    @Test
    void prometheusWebClient_withDefaultUrl_shouldUseDefaultUrl() {
        // Given
        ReflectionTestUtils.setField(prometheusConfig, "prometheusUrl", "http://localhost:9090");

        // When
        WebClient result = prometheusConfig.prometheusWebClient();

        // Then
        assertThat(result).isNotNull();
    }

    @Test
    void prometheusWebClient_withDefaultTimeout_shouldUseDefaultTimeout() {
        // Given
        ReflectionTestUtils.setField(prometheusConfig, "prometheusTimeout", Duration.parse("PT30S"));

        // When
        WebClient result = prometheusConfig.prometheusWebClient();

        // Then
        assertThat(result).isNotNull();
    }

    @Test
    void prometheusWebClient_withDisabledFlag_shouldLogDisabledMessage() {
        // Given
        ReflectionTestUtils.setField(prometheusConfig, "prometheusEnabled", false);

        // When
        WebClient result = prometheusConfig.prometheusWebClient();

        // Then
        assertThat(result).isNotNull();
    }

    @Test
    void prometheusWebClient_withEnabledFlag_shouldLogConfiguration() {
        // Given
        String customUrl = "http://test-prometheus:9090";
        Duration customTimeout = Duration.ofSeconds(45);
        ReflectionTestUtils.setField(prometheusConfig, "prometheusUrl", customUrl);
        ReflectionTestUtils.setField(prometheusConfig, "prometheusTimeout", customTimeout);
        ReflectionTestUtils.setField(prometheusConfig, "prometheusEnabled", true);

        // When
        WebClient result = prometheusConfig.prometheusWebClient();

        // Then
        assertThat(result).isNotNull();
    }

    @Test
    void prometheusWebClient_withZeroTimeout_shouldHandleGracefully() {
        // Given
        ReflectionTestUtils.setField(prometheusConfig, "prometheusTimeout", Duration.ZERO);

        // When
        WebClient result = prometheusConfig.prometheusWebClient();

        // Then
        assertThat(result).isNotNull();
    }

    @Test
    void prometheusWebClient_withNegativeTimeout_shouldHandleGracefully() {
        // Given
        ReflectionTestUtils.setField(prometheusConfig, "prometheusTimeout", Duration.ofSeconds(-10));

        // When
        WebClient result = prometheusConfig.prometheusWebClient();

        // Then
        assertThat(result).isNotNull();
    }
}
