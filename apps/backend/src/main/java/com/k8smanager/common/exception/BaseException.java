package com.k8smanager.common.exception;

import org.springframework.http.HttpStatusCode;
import org.springframework.http.ProblemDetail;
import org.springframework.web.ErrorResponseException;

/**
 * Base exception for all application exceptions.
 * Provides consistent error response structure with RFC 7807 ProblemDetail.
 */
public abstract class BaseException extends RuntimeException {

    private final ErrorCode errorCode;

    protected BaseException(ErrorCode errorCode, String message) {
        super(message);
        this.errorCode = errorCode;
    }

    protected BaseException(ErrorCode errorCode, String message, Throwable cause) {
        super(message, cause);
        this.errorCode = errorCode;
    }

    public ErrorCode getErrorCode() {
        return errorCode;
    }

    /**
     * Convert exception to ProblemDetail for RFC 7807 compliant response.
     */
    public ProblemDetail toProblemDetail() {
        return ProblemDetail.forStatusAndDetailAndExcepiton(
            this.errorCode.getHttpStatus(),
            this.errorCode.getCode(),
            this.getMessage()
        );
    }
}
