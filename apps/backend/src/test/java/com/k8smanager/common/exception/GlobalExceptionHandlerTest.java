package com.k8smanager.common.exception;

import com.k8smanager.common.response.ApiResponse;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.web.servlet.NoHandlerFoundException;

import static org.assertj.core.api.Assertions.assertThat;

@ExtendWith(org.mockito.junit.jupiter.MockitoExtension.class)
class GlobalExceptionHandlerTest {

    private GlobalExceptionHandler globalExceptionHandler;

    @BeforeEach
    void setUp() {
        globalExceptionHandler = new GlobalExceptionHandler();
    }

    @Test
    void handleBaseException_shouldReturnInternalServerError() {
        BaseException ex = new InternalServerException("Test error message");
        ResponseEntity<ApiResponse<Void>> result = globalExceptionHandler.handleBaseException(ex);

        assertThat(result).isNotNull();
        assertThat(result.getStatusCode()).isEqualTo(HttpStatus.INTERNAL_SERVER_ERROR);
        assertThat(result.getBody()).isNotNull();
        assertThat(result.getBody().getStatus()).isEqualTo(HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Test
    void handleK8sException_shouldReturnNotFoundStatus() {
        K8sException ex = new K8sException(ErrorCode.K8S_RESOURCE_NOT_FOUND, "Pod not found");
        ResponseEntity<ApiResponse<Void>> result = globalExceptionHandler.handleBaseException(ex);

        assertThat(result).isNotNull();
        assertThat(result.getStatusCode()).isEqualTo(HttpStatus.NOT_FOUND);
        assertThat(result.getBody().isNotNull();
        assertThat(result.getBody().getStatus()).isEqualTo(HttpStatus.NOT_FOUND);
    }

    @Test
    void handleAccessDeniedException_shouldReturnForbidden() {
        AccessDeniedException ex = new AccessDeniedException("Access denied to resource");
        ResponseEntity<ApiResponse<Void>> result = globalExceptionHandler.handleAccessDeniedException(ex);

        assertThat(result).isNotNull();
        assertThat(result.getStatusCode()).isEqualTo(HttpStatus.FORBIDDEN);
        assertThat(result.getBody()).isNotNull();
        assertThat(result.getBody().getStatus()).isEqualTo(HttpStatus.FORBIDDEN);
    }

    @Test
    void handleNotFoundException_shouldReturnNotFound() {
        NoHandlerFoundException ex = new NoHandlerFoundException("GET", "/api/v1/unknown", null);
        ResponseEntity<ApiResponse<Void>> result = globalExceptionHandler.handleNotFoundException();

        assertThat(result).isNotNull();
        assertThat(result.getStatusCode()).isEqualTo(HttpStatus.NOT_FOUND);
        assertThat(result.getBody()).isNotNull();
        assertThat(result.getBody().getStatus()).isEqualTo(HttpStatus.NOT_FOUND);
    }

    @Test
    void handleGenericException_shouldReturnInternalServerError() {
        Exception ex = new RuntimeException("Unexpected error occurred");
        ResponseEntity<ApiResponse<Void>> result = globalExceptionHandler.handleGenericException(ex);

        assertThat(result).isNotNull();
        assertThat(result.getStatusCode()).isEqualTo(HttpStatus.INTERNAL_SERVER_ERROR);
        assertThat(result.getBody()).isNotNull();
        assertThat(result.getBody().getStatus()).isEqualTo(HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Test
    void handleGenericException_withNullMessage_shouldHandleGracefully() {
        Exception ex = new RuntimeException((String) null);
        ResponseEntity<ApiResponse<Void>> result = globalExceptionHandler.handleGenericException(ex);

        assertThat(result).isNotNull();
        assertThat(result.getStatusCode()).isEqualTo(HttpStatus.INTERNAL_SERVER_ERROR);
        assertThat(result.getBody()).isNotNull();
        assertThat(result.getBody().getStatus()).isEqualTo(HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Test
    void handleGenericException_withCause_shouldHandleGracefully() {
        Throwable cause = new IllegalArgumentException("Invalid argument");
        Exception ex = new RuntimeException("Outer exception", cause);
        ResponseEntity<ApiResponse<Void>> result = globalExceptionHandler.handleGenericException(ex);

        assertThat(result).isNotNull();
        assertThat(result.getStatusCode()).isEqualTo(HttpStatus.INTERNAL_SERVER_ERROR);
        assertThat(result.getBody()).isNotNull();
        assertThat(result.getBody().getStatus()).isEqualTo(HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
