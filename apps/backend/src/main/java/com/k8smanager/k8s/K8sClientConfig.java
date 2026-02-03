package com.k8smanager.k8s;

import io.fabric8.kubernetes.client.Config;
import io.fabric8.kubernetes.client.ConfigBuilder;
import io.fabric8.kubernetes.client.KubernetesClient;
import io.fabric8.kubernetes.client.KubernetesClientBuilder;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * Configuration for Fabric8 Kubernetes client.
 */
@Configuration
public class K8sClientConfig {

    private static final Logger logger = LoggerFactory.getLogger(K8sClientConfig.class);

    @Value("${kubernetes.client.in-cluster:false}")
    private boolean inCluster;

    @Value("${kubernetes.client.logging.enabled:true}")
    private boolean loggingEnabled;

    @Value("${kubernetes.client.logging.debugging:false}")
    private boolean debuggingEnabled;

    /**
     * Create Kubernetes client configured for in-cluster or local development.
     */
    @Bean
    public KubernetesClient kubernetesClient() {
        Config config;

        if (inCluster) {
            logger.info("Configuring Kubernetes client for in-cluster mode");
            config = new ConfigBuilder()
                    .withRequestTimeout(30000)
                    .withConnectionTimeout(10000)
                    .build();
        } else {
            logger.info("Configuring Kubernetes client for local development");
            config = Config.autoConfigure(null)
                    .withRequestTimeout(30000)
                    .withConnectionTimeout(10000);
        }

        if (loggingEnabled) {
            System.setProperty(Config.KUBERNETES_AUTH_TRYKUBECONFIG_SYSTEM_PROPERTY, "false");
            System.setProperty(Config.KUBERNETES_NAMESPACE_SYSTEM_PROPERTY, "default");
        }

        logger.info("Kubernetes client created. In-cluster: {}, Logging: {}",
                inCluster, loggingEnabled);

        return new KubernetesClientBuilder()
                .withConfig(config)
                .build();
    }
}
