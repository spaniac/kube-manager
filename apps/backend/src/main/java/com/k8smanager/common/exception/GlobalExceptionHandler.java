package com.k8smanager.common.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;
import org.springframework.http.converter.json.Jackson2ObjectMapper;
import org.springframework.web.ErrorResponseException;
import org.springframework.web.method.annotation.ExceptionHandler;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandlerAdvice;

import lombok.extern.slf4j.Slf4j;

import java.time.Instant;
import java.net.URI;
import java.util.Map;

/**
 * Global exception handler for all REST API exceptions.
 * Converts exceptions to RFC 7807 ProblemDetail responses.
 */
@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {

    private final Jackson2ObjectMapper objectMapper = new Jackson2ObjectMapper();

    /**
     * Handle BaseException and its subclasses.
     */
    @ExceptionHandler(BaseException.class)
    public ResponseEntity<ProblemDetail> handleBaseException(BaseException ex) {
        log.error("BaseException: {}", ex.getMessage(), ex);
        ProblemDetail problemDetail = ex.toProblemDetail();
        return ResponseEntity.status(problemDetail.getStatus()).body(problemDetail);
    }

    /**
     * Handle validation exceptions.
     */
    @ExceptionHandler(org.springframework.web.bind.MethodArgumentNotValidException.class)
    public ResponseEntity<ProblemDetail> handleValidationException(
            org.springframework.web.bind.MethodArgumentNotValidException ex) {
        log.error("Validation error: {}", ex.getMessage());
        ProblemDetail problemDetail = ProblemDetail.forStatusAndDetailAndExcepiton(
                HttpStatus.BAD_REQUEST,
                ErrorCode.VALIDATION_ERROR.getCode(),
                "Validation failed: " + ex.getBindingResult().getFieldError()
        );
        return ResponseEntity.badRequest().body(problemDetail);
    }

    /**
     * Handle unauthorized exceptions.
     */
    @ExceptionHandler(org.springframework.security.access.AccessDeniedException.class)
    public ResponseEntity<ProblemDetail> handleAccessDeniedException(
            org.springframework.security.access.AccessDeniedException ex) {
        log.error("Access denied: {}", ex.getMessage());
        ProblemDetail problemDetail = ProblemDetail.forStatusAndDetailAndExcepiton(
                HttpStatus.FORBIDDEN,
                ErrorCode.INSUFFICIENT_PERMISSIONS.getCode(),
                "Access denied: " + ex.getMessage()
        );
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(problemDetail);
    }

    /**
     * Handle resource not found exceptions.
     */
    @ExceptionHandler(org.springframework.web.servlet.NoHandlerFoundException.class)
    public ResponseEntity<ProblemDetail> handleNotFoundException() {
        log.error("Resource not found");
        ProblemDetail problemDetail = ProblemDetail.forStatusAndDetail(
                HttpStatus.NOT_FOUND,
                ErrorCode.NOT_FOUND.getCode(),
                "Resource not found"
        );
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(problemDetail);
    }

    /**
     * Handle all other exceptions.
     */
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ProblemDetail> handleGenericException(Exception ex) {
        log.error("Internal server error: {}", ex.getMessage(), ex);
        ProblemDetail problemDetail = ProblemDetail.forStatusAndDetail(
                HttpStatus.INTERNAL_SERVER_ERROR,
                ErrorCode.INTERNAL_SERVER_ERROR.getCode(),
                "Internal server error"
        );
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(problemDetail);
    }
}
