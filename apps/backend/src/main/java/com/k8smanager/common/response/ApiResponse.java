package com.k8smanager.common.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;

/**
 * Standard API response wrapper.
 * Provides consistent structure for all API responses.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ApiResponse<T> {

    private boolean success;
    private T data;
    private ApiError error;
    private String message;
    private HttpStatus status;

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
     * Create error response.
     */
    public static <T> ApiResponse<T> error(ProblemDetail problemDetail, String message) {
        ApiError apiError = new ApiError(problemDetail.getType(), problemDetail.getTitle(), 
                problemDetail.getDetail(), problemDetail.getInstance(), 
                problemDetail.getStatus(), problemDetail.getDetail(), null);
        return new ApiResponse<>(false, null, apiError, message, problemDetail.getStatus());
    }

    /**
     * Create error response with custom HTTP status.
     */
    public static <T> ApiResponse<T> error(HttpStatus status, String message) {
        ApiError apiError = new ApiError(status.getReasonPhrase(), status.getReasonPhrase(), 
                message, null, status.value(), null, null);
        return new ApiResponse<>(false, null, apiError, message, status);
    }

    /**
     * Error details from ProblemDetail.
     */
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ApiError {
        private String type;
        private String title;
        private String detail;
        private String instance;
        private int status;
        private String errorCode;
    }
}
