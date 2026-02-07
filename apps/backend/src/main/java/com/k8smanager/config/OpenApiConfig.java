package com.k8smanager.config;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.Arrays;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI customOpenAPI() {
        SecurityScheme securityScheme = new SecurityScheme()
                .type(SecurityScheme.Type.HTTP)
                .scheme("bearer")
                .bearerFormat("JWT")
                .in(SecurityScheme.In.HEADER)
                .name("Authorization");

        return new OpenAPI()
                .components(new Components()
                        .addSecuritySchemes("Bearer Token", securityScheme))
                .info(new Info()
                        .title("K8s Manager API")
                        .version("v1.0")
                        .description("Kubernetes Management Platform API - Interactive documentation for cluster, namespace, workload, pod, monitoring, log, terminal, YAML, RBAC, and user management endpoints")
                        .contact(new Contact()
                                .name("K8s Manager Team")
                                .email("support@k8smanager.example.com"))
                        .license(new License()
                                .name("Apache 2.0")
                                .url("https://www.apache.org/licenses/LICENSE-2.0")))
                .addSecurityItem(new SecurityRequirement()
                                .addList("Bearer Token", Arrays.asList("read", "write")));
    }
}
