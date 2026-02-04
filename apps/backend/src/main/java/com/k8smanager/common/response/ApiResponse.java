package com.k8smanager.common.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;

/**
 * Standard API response wrapper.
 * Provides consistent structure for all API responses.
 */
@Schema(description = "Standard API response wrapper with success status, data payload, optional error details, and HTTP status code")
@Data
@NoArgsConstructor
public class ApiResponse<T> {

    private boolean success;
    private T data;
    private ApiError error;
    private String message;
    private HttpStatus status;

    public ApiResponse(boolean success, T data, ApiError error, String message, HttpStatus status) {
        this.success = success;
        this.data = data;
        this.error = error;
        this.message = message;
        this.status = status;
    }

    /**
     * Create success response.
     */
    public static <T> ApiResponse<T> success(T data) {
        return new ApiResponse<>(true, data, null, null, HttpStatus.OK);
    }

    /**
     * Create success response with custom message.
     */
    public static <T> ApiResponse<T> success(T data, String message) {
        return new ApiResponse<>(true, data, null, message, HttpStatus.OK);
    }

    /**
     * Create success response with HTTP status.
     */
    public static <T> ApiResponse<T> success(T data, String message, HttpStatus status) {
        return new ApiResponse<>(true, data, null, message, status);
    }

    /**
     * Create error response with just a message (defaults to BAD_REQUEST).
     */
    public static <T> ApiResponse<T> error(String message) {
        return error(HttpStatus.BAD_REQUEST, message);
    }

    /**
     * Create error response with custom HTTP status.
     */
    public static <T> ApiResponse<T> error(HttpStatus status, String message) {
        return new ApiResponse<>(false, null, null, message, status);
    }

    /**
     * Create error response from ProblemDetail.
     */
    public static <T> ApiResponse<T> error(ProblemDetail problemDetail) {
        ApiError apiError = new ApiError(
                problemDetail.getType().toString(),
                problemDetail.getTitle(),
                problemDetail.getDetail(),
                problemDetail.getInstance() != null ? problemDetail.getInstance().toString() : null,
                problemDetail.getStatus(),
                (String) problemDetail.getProperties().get("errorCode"));
        return new ApiResponse<>(false, null, apiError, problemDetail.getTitle(),
                HttpStatus.valueOf(problemDetail.getStatus()));
    }

    /**
     * Error details from ProblemDetail.
     */
    @Schema(description = "Error details extracted from RFC 7807 ProblemDetail", subTypes = {ApiError.class})
    @Data
    @NoArgsConstructor
    public static class ApiError {
        private String type;
        private String title;
        private String detail;
        private String instance;
        private int status;
        private String errorCode;

        public ApiError(String type, String title, String detail, String instance, int status, String errorCode) {
            this.type = type;
            this.title = title;
            this.detail = detail;
            this.instance = instance;
            this.status = status;
            this.errorCode = errorCode;
        }
    }
}
