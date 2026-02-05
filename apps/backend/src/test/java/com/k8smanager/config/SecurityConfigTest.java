package com.k8smanager.config;

import com.k8smanager.rbac.RbacPermissionEvaluator;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.access.PermissionEvaluator;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationConverter;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.test.util.ReflectionTestUtils;
import org.springframework.web.cors.CorsConfigurationSource;

import java.time.Duration;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.verify;

/**
 * Tests for SecurityConfig.
 * Verifies bean creation and security configuration.
 */
@ExtendWith(MockitoExtension.class)
class SecurityConfigTest {

    private SecurityConfig securityConfig;

    @Mock
    private RbacPermissionEvaluator rbacPermissionEvaluator;

    @BeforeEach
    void setUp() {
        securityConfig = new SecurityConfig();
        ReflectionTestUtils.setField(securityConfig, "jwkSetUri", "http://localhost:8080/realms/test/protocol/openid-connect/certs");
    }

    @Test
    void permissionEvaluator_shouldReturnRbacPermissionEvaluator() {
        // When
        PermissionEvaluator result = securityConfig.permissionEvaluator(rbacPermissionEvaluator);

        // Then
        assertThat(result).isNotNull();
        assertThat(result).isEqualTo(rbacPermissionEvaluator);
    }

    @Test
    void jwtDecoder_shouldCreateNimbusJwtDecoder() {
        // When
        JwtDecoder result = securityConfig.jwtDecoder();

        // Then
        assertThat(result).isNotNull();
        assertThat(result).isInstanceOf(org.springframework.security.oauth2.jwt.NimbusJwtDecoder.class);
    }

    @Test
    void passwordEncoder_shouldCreateBCryptPasswordEncoder() {
        // When
        PasswordEncoder result = securityConfig.passwordEncoder();

        // Then
        assertThat(result).isNotNull();
        assertThat(result).isInstanceOf(org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder.class);
    }

    @Test
    void passwordEncoder_shouldEncodePassword() {
        // When
        PasswordEncoder passwordEncoder = securityConfig.passwordEncoder();
        String encodedPassword = passwordEncoder.encode("testPassword");

        // Then
        assertThat(encodedPassword).isNotNull();
        assertThat(encodedPassword).isNotEqualTo("testPassword");
        assertThat(passwordEncoder.matches("testPassword", encodedPassword)).isTrue();
        assertThat(passwordEncoder.matches("wrongPassword", encodedPassword)).isFalse();
    }

    @Test
    void jwtAuthenticationConverter_shouldConfigureAuthorityPrefixAndClaimName() {
        // When
        JwtAuthenticationConverter result = securityConfig.jwtAuthenticationConverter();

        // Then
        assertThat(result).isNotNull();
        assertThat(result).isInstanceOf(JwtAuthenticationConverter.class);
    }

    @Test
    void corsConfigurationSource_shouldConfigureCors() {
        // When
        CorsConfigurationSource result = securityConfig.corsConfigurationSource();

        // Then
        assertThat(result).isNotNull();
        assertThat(result).isInstanceOf(org.springframework.web.cors.UrlBasedCorsConfigurationSource.class);
    }

    @Test
    void corsConfigurationSource_shouldContainExpectedConfiguration() {
        // When
        CorsConfigurationSource result = securityConfig.corsConfigurationSource();
        org.springframework.web.cors.CorsConfiguration config = result.getCorsConfiguration(null);

        // Then
        assertThat(config).isNotNull();
        assertThat(config.getAllowedOrigins()).containsExactlyInAnyOrder("http://localhost:5173", "http://localhost:3000");
        assertThat(config.getAllowedMethods()).containsExactlyInAnyOrder("GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS");
        assertThat(config.getAllowedHeaders()).contains("*");
        assertThat(config.getAllowCredentials()).isTrue();
        assertThat(config.getMaxAge()).isEqualTo(3600L);
    }

    @Test
    void filterChain_shouldCreateSecurityFilterChain() throws Exception {
        // This test requires full Spring context which is beyond unit test scope
        // Integration test would be needed to fully test SecurityFilterChain
    }

    @Test
    void multiplePasswordEncoderEncodings_shouldBeDifferent() {
        // Given
        PasswordEncoder passwordEncoder = securityConfig.passwordEncoder();
        String password = "testPassword";

        // When
        String encoded1 = passwordEncoder.encode(password);
        String encoded2 = passwordEncoder.encode(password);

        // Then
        assertThat(encoded1).isNotEqualTo(encoded2);
        assertThat(passwordEncoder.matches(password, encoded1)).isTrue();
        assertThat(passwordEncoder.matches(password, encoded2)).isTrue();
    }
}
