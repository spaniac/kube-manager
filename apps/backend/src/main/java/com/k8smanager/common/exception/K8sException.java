package com.k8smanager.common.exception;

/**
 * Exception for Kubernetes-related errors.
 */
public class K8sException extends BaseException {

    public K8sException(String message) {
        super(ErrorCode.K8S_OPERATION_FAILED, message);
    }

    public K8sException(String message, Throwable cause) {
        super(ErrorCode.K8S_OPERATION_FAILED, message, cause);
    }

    public K8sException(ErrorCode errorCode, String message) {
        super(errorCode, message);
    }

    public K8sException(ErrorCode errorCode, String message, Throwable cause) {
        super(errorCode, message, cause);
    }
}
