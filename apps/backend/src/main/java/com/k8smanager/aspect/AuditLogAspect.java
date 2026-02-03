package com.k8smanager.aspect;

import com.k8smanager.persistence.entity.AuditLog;
import com.k8smanager.persistence.repository.AuditLogRepository;
import jakarta.servlet.http.HttpServletRequest;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import java.time.Instant;

/**
 * Aspect for audit logging all API operations.
 */
@Aspect
@Component
public class AuditLogAspect {

    private static final Logger logger = LoggerFactory.getLogger(AuditLogAspect.class);

    private final AuditLogRepository auditLogRepository;

    public AuditLogAspect(AuditLogRepository auditLogRepository) {
        this.auditLogRepository = auditLogRepository;
    }

    /**
     * Pointcut for all public methods in controllers.
     */
    @Pointcut("within(@org.springframework.web.bind.annotation.RestController *)")
    public void controllerMethods() {
    }

    /**
     * Log around all controller methods.
     */
    @Around("controllerMethods()")
    public Object logAround(ProceedingJoinPoint joinPoint) throws Throwable {
        long startTime = System.currentTimeMillis();
        HttpServletRequest request = getCurrentRequest();

        String method = request != null ? request.getMethod() : "UNKNOWN";
        String uri = request != null ? request.getRequestURI() : "UNKNOWN";
        String userEmail = getCurrentUserEmail();
        String ip = request != null ? getClientIpAddress(request) : "UNKNOWN";

        logger.info("Request: {} {} by {} from {}", method, uri, userEmail, ip);

        Object result;
        try {
            result = joinPoint.proceed();
            long duration = System.currentTimeMillis() - startTime;
            logger.info("Response: {} {} - {}ms", method, uri, duration);

            // Save audit log asynchronously
            saveAuditLog(method, uri, userEmail, ip, "SUCCESS", null, duration);

            return result;
        } catch (Exception e) {
            long duration = System.currentTimeMillis() - startTime;
            logger.error("Error in {} {}: {}", method, uri, e.getMessage());

            // Save audit log for error
            saveAuditLog(method, uri, userEmail, ip, "ERROR", e.getClass().getSimpleName(), duration);

            throw e;
        }
    }

    /**
     * Get current HTTP request.
     */
    private HttpServletRequest getCurrentRequest() {
        ServletRequestAttributes attributes = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
        return attributes != null ? attributes.getRequest() : null;
    }

    /**
     * Get current authenticated user email.
     */
    private String getCurrentUserEmail() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.isAuthenticated()) {
            return authentication.getName();
        }
        return "ANONYMOUS";
    }

    /**
     * Get client IP address.
     */
    private String getClientIpAddress(HttpServletRequest request) {
        String ip = request.getHeader("X-Forwarded-For");
        if (ip == null || ip.isEmpty() || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("X-Real-IP");
        }
        if (ip == null || ip.isEmpty() || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getRemoteAddr();
        }
        return ip;
    }

    /**
     * Save audit log asynchronously.
     */
    private void saveAuditLog(String method, String uri, String userEmail, String ip,
                              String status, String errorType, long duration) {
        try {
            AuditLog auditLog = AuditLog.builder()
                    .action(method + " " + uri)
                    .resourceType(extractResourceType(uri))
                    .resourceId(extractResourceId(uri))
                    .createdAt(Instant.now())
                    .ipAddress(ip)
                    .userAgent("k8s-manager")
                    .result(status + " (" + duration + "ms)")
                    .build();

            auditLogRepository.save(auditLog);
        } catch (Exception e) {
            logger.error("Failed to save audit log: {}", e.getMessage());
        }
    }

    private String extractResourceType(String uri) {
        if (uri == null) return null;
        String[] parts = uri.split("/");
        return parts.length > 1 ? parts[1] : null;
    }

    private String extractResourceId(String uri) {
        if (uri == null) return null;
        String[] parts = uri.split("/");
        return parts.length > 2 ? parts[2] : null;
    }
}
