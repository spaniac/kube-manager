package com.k8smanager.config;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.client.WebClient;

import java.time.Duration;

/**
 * Configuration for Prometheus API client integration.
 * Provides a configured WebClient bean for querying Prometheus metrics via HTTP API.
 */
@Configuration
public class PrometheusConfig {

    private static final Logger logger = LoggerFactory.getLogger(PrometheusConfig.class);

    @Value("${prometheus.url:http://localhost:9090}")
    private String prometheusUrl;

    @Value("${prometheus.timeout:30s}")
    private Duration prometheusTimeout;

    @Value("${prometheus.enabled:true}")
    private boolean prometheusEnabled;

    /**
     * Create WebClient bean for Prometheus API.
     * This client is used to execute PromQL queries against the Prometheus HTTP API.
     *
     * @return Configured WebClient instance
     */
    @Bean
    public WebClient prometheusWebClient() {
        if (!prometheusEnabled) {
            logger.info("Prometheus client is disabled by configuration");
            return WebClient.builder().baseUrl("http://localhost:9090").build();
        }

        logger.info("Configuring Prometheus WebClient with URL: {}", prometheusUrl);
        logger.info("Prometheus timeout: {}", prometheusTimeout);

        WebClient client = WebClient.builder()
                .baseUrl(prometheusUrl)
                .codecs(configurer -> configurer.defaultCodecs().maxInMemorySize(2 * 1024 * 1024)) // 2MB for query results
                .build();

        logger.info("Prometheus WebClient configured successfully");
        return client;
    }
}
