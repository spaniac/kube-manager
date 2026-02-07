package com.k8smanager.common.exception;

import org.springframework.http.HttpStatus;

/**
 * Unique error codes for all application exceptions.
 * Used for consistent error handling and RFC 7807 ProblemDetail responses.
 */
public enum ErrorCode {

    // General errors (4xx)
    BAD_REQUEST(HttpStatus.BAD_REQUEST, 400, "ERR_400", "Bad request"),
    UNAUTHORIZED(HttpStatus.UNAUTHORIZED, 401, "ERR_401", "Unauthorized"),
    FORBIDDEN(HttpStatus.FORBIDDEN, 403, "ERR_403", "Forbidden"),
    NOT_FOUND(HttpStatus.NOT_FOUND, 404, "ERR_404", "Resource not found"),
    CONFLICT(HttpStatus.CONFLICT, 409, "ERR_409", "Conflict"),
    VALIDATION_ERROR(HttpStatus.BAD_REQUEST, 422, "ERR_422", "Validation failed"),

    // Resource errors (4xx)
    RESOURCE_NOT_FOUND(HttpStatus.NOT_FOUND, 404, "ERR_RNF", "Resource not found"),
    RESOURCE_ALREADY_EXISTS(HttpStatus.CONFLICT, 409, "ERR_RAE", "Resource already exists"),
    RESOURCE_CONFLICT(HttpStatus.CONFLICT, 409, "ERR_RCF", "Resource conflict"),

    // Authentication errors (4xx)
    AUTHENTICATION_FAILED(HttpStatus.UNAUTHORIZED, 401, "ERR_AUTH", "Authentication failed"),
    TOKEN_INVALID(HttpStatus.UNAUTHORIZED, 401, "ERR_TOK", "Invalid token"),
    TOKEN_EXPIRED(HttpStatus.UNAUTHORIZED, 401, "ERR_TOK_EXP", "Token expired"),

    // Authorization errors (4xx)
    INSUFFICIENT_PERMISSIONS(HttpStatus.FORBIDDEN, 403, "ERR_PERM", "Insufficient permissions"),
    ACCESS_DENIED(HttpStatus.FORBIDDEN, 403, "ERR_ACC", "Access denied"),

    // Kubernetes errors (5xx)
    K8S_CLIENT_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, 500, "ERR_K8S", "Kubernetes client error"),
    K8S_RESOURCE_NOT_FOUND(HttpStatus.NOT_FOUND, 404, "ERR_K8S_RNF", "Kubernetes resource not found"),
    K8S_OPERATION_FAILED(HttpStatus.INTERNAL_SERVER_ERROR, 500, "ERR_K8S_OP", "Kubernetes operation failed"),

    // Database errors (5xx)
    DATABASE_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, 500, "ERR_DB", "Database error"),
    DATABASE_CONNECTION_FAILED(HttpStatus.SERVICE_UNAVAILABLE, 503, "ERR_DBC", "Database connection failed"),

    // Server errors (5xx)
    INTERNAL_SERVER_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, 500, "ERR_500", "Internal server error"),
    SERVICE_UNAVAILABLE(HttpStatus.SERVICE_UNAVAILABLE, 503, "ERR_503", "Service temporarily unavailable");

    private final HttpStatus httpStatus;
    private final int status;
    private final String code;
    private final String message;

    ErrorCode(HttpStatus httpStatus, int status, String code, String message) {
        this.httpStatus = httpStatus;
        this.status = status;
        this.code = code;
        this.message = message;
    }

    public HttpStatus getHttpStatus() {
        return httpStatus;
    }

    public int getStatus() {
        return status;
    }

    public String getCode() {
        return code;
    }

    public String getMessage() {
        return message;
    }
}
