package com.k8smanager.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

class OpenApiConfigTest {

    private final OpenApiConfig openApiConfig = new OpenApiConfig();

    @Test
    void customOpenAPI_shouldCreateOpenAPIBean() {
        // When
        OpenAPI result = openApiConfig.customOpenAPI();

        // Then
        assertThat(result).isNotNull();
    }

    @Test
    void customOpenAPI_shouldHaveSecurityScheme() {
        // When
        OpenAPI result = openApiConfig.customOpenAPI();

        // Then
        assertThat(result.getComponents()).isNotNull();
        assertThat(result.getComponents().getSecuritySchemes()).isNotNull();
        assertThat(result.getComponents().getSecuritySchemes()).containsKey("Bearer Token");

        SecurityScheme securityScheme = result.getComponents().getSecuritySchemes().get("Bearer Token");
        assertThat(securityScheme.getType()).isEqualTo(SecurityScheme.Type.HTTP);
        assertThat(securityScheme.getScheme()).isEqualTo("bearer");
        assertThat(securityScheme.getBearerFormat()).isEqualTo("JWT");
        assertThat(securityScheme.getIn()).isEqualTo(SecurityScheme.In.HEADER);
        assertThat(securityScheme.getName()).isEqualTo("Authorization");
    }

    @Test
    void customOpenAPI_shouldHaveInfo() {
        // When
        OpenAPI result = openApiConfig.customOpenAPI();

        // Then
        assertThat(result.getInfo()).isNotNull();

        Info info = result.getInfo();
        assertThat(info.getTitle()).isEqualTo("K8s Manager API");
        assertThat(info.getVersion()).isEqualTo("v1.0");
        assertThat(info.getDescription()).contains("Kubernetes Management Platform API");
    }

    @Test
    void customOpenAPI_shouldHaveContact() {
        // When
        OpenAPI result = openApiConfig.customOpenAPI();

        // Then
        assertThat(result.getInfo()).isNotNull();
        assertThat(result.getInfo().getContact()).isNotNull();

        Contact contact = result.getInfo().getContact();
        assertThat(contact.getName()).isEqualTo("K8s Manager Team");
        assertThat(contact.getEmail()).isEqualTo("support@k8smanager.example.com");
    }

    @Test
    void customOpenAPI_shouldHaveLicense() {
        // When
        OpenAPI result = openApiConfig.customOpenAPI();

        // Then
        assertThat(result.getInfo()).isNotNull();
        assertThat(result.getInfo().getLicense()).isNotNull();

        License license = result.getInfo().getLicense();
        assertThat(license.getName()).isEqualTo("Apache 2.0");
        assertThat(license.getUrl()).isEqualTo("https://www.apache.org/licenses/LICENSE-2.0");
    }

    @Test
    void customOpenAPI_shouldHaveSecurityRequirement() {
        // When
        OpenAPI result = openApiConfig.customOpenAPI();

        // Then
        assertThat(result.getSecurity()).isNotNull();
        assertThat(result.getSecurity()).hasSize(1);

        SecurityRequirement securityRequirement = result.getSecurity().get(0);
        assertThat(securityRequirement).containsKey("Bearer Token");
        assertThat(securityRequirement.get("Bearer Token")).containsExactly("read", "write");
    }

    @Test
    void customOpenAPI_multipleCalls_shouldReturnSameConfiguration() {
        // When
        OpenAPI result1 = openApiConfig.customOpenAPI();
        OpenAPI result2 = openApiConfig.customOpenAPI();

        // Then
        assertThat(result1.getInfo().getTitle()).isEqualTo(result2.getInfo().getTitle());
        assertThat(result1.getInfo().getVersion()).isEqualTo(result2.getInfo().getVersion());
    }
}
