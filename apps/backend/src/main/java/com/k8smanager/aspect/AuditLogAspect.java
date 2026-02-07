package com.k8smanager.aspect;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.k8smanager.dto.RbacAuditEventDTO;
import com.k8smanager.persistence.entity.AuditLog;
import com.k8smanager.persistence.entity.Role;
import com.k8smanager.persistence.repository.AuditLogRepository;
import jakarta.servlet.http.HttpServletRequest;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.*;
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
    private final ObjectMapper objectMapper;

    public AuditLogAspect(AuditLogRepository auditLogRepository, ObjectMapper objectMapper) {
        this.auditLogRepository = auditLogRepository;
        this.objectMapper = objectMapper;
    }

    /**
     * Pointcut for all public methods in controllers.
     */
    @Pointcut("within(@org.springframework.web.bind.annotation.RestController *)")
    public void controllerMethods() {}

    /**
     * Pointcut for RBAC role operations.
     */
    @Pointcut("execution(* com.k8smanager.controller.RoleController.*(..))")
    public void roleControllerMethods() {}

    /**
     * Pointcut for RBAC role management operations.
     */
    @Pointcut("execution(* com.k8smanager.controller.RoleManagementController.*(..))")
    public void roleManagementControllerMethods() {}

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
     * Log RBAC role operations with before/after data.
     */
    @AfterReturning(pointcut = "roleControllerMethods() || roleManagementControllerMethods()", returning = "result")
    public void logRbacOperation(JoinPoint joinPoint, Object result) {
        try {
            String action = extractAction(joinPoint);
            String userEmail = getCurrentUserEmail();
            String ip = getClientIpAddress(getCurrentRequest());
            String targetType = extractTargetType(joinPoint);
            String targetId = extractTargetId(joinPoint);
            String beforeData = extractBeforeData(joinPoint);
            String afterData = extractAfterData(joinPoint, result);

            // Save RBAC-specific audit log
            saveRbacAuditLog(action, userEmail, ip, targetType, targetId, beforeData, afterData);

            logger.info("RBAC Audit: {} {} by {} on {}", action, targetType, userEmail, targetId);
        } catch (Exception e) {
            logger.error("Failed to log RBAC audit event: {}", e.getMessage());
        }
    }

    /**
     * Log RBAC operation errors.
     */
    @AfterThrowing(pointcut = "roleControllerMethods() || roleManagementControllerMethods()", throwing = "ex")
    public void logRbacOperationError(JoinPoint joinPoint, Exception ex) {
        try {
            String action = "ERROR_" + extractAction(joinPoint);
            String userEmail = getCurrentUserEmail();
            String ip = getClientIpAddress(getCurrentRequest());
            String targetType = extractTargetType(joinPoint);
            String targetId = extractTargetId(joinPoint);
            String beforeData = extractBeforeData(joinPoint);
            String afterData = "ERROR: " + ex.getMessage();

            saveRbacAuditLog(action, userEmail, ip, targetType, targetId, beforeData, afterData);

            logger.error("RBAC Audit Error: {} {} by {} on {}", action, targetType, userEmail, targetId);
        } catch (Exception e) {
            logger.error("Failed to log RBAC audit error: {}", e.getMessage());
        }
    }

    /**
     * Extract action name from method name.
     */
    private String extractAction(JoinPoint joinPoint) {
        String methodName = joinPoint.getSignature().getName();
        return methodName.toUpperCase();
    }

    /**
     * Extract target type from join point.
     */
    private String extractTargetType(JoinPoint joinPoint) {
        String className = joinPoint.getTarget().getClass().getSimpleName();
        if (className.contains("RoleController")) {
            return "ROLE";
        } else if (className.contains("RoleManagementController")) {
            Object[] args = joinPoint.getArgs();
            if (args.length > 0) {
                // Check if it's a role assignment or permission rule operation
                String firstArg = args[0] != null ? args[0].getClass().getSimpleName() : "";
                if (firstArg.contains("PermissionRule")) {
                    return "PERMISSION_RULE";
                }
            }
            return "ROLE_ASSIGNMENT";
        }
        return "UNKNOWN";
    }

    /**
     * Extract target ID from join point.
     */
    private String extractTargetId(JoinPoint joinPoint) {
        Object[] args = joinPoint.getArgs();
        for (Object arg : args) {
            if (arg instanceof String && ((String) arg).contains("@")) {
                // Email or role key
                return (String) arg;
            } else if (arg instanceof Long) {
                // ID
                return String.valueOf(arg);
            } else if (arg instanceof Role) {
                return String.valueOf(((Role) arg).getId());
            }
        }
        return "UNKNOWN";
    }

    /**
     * Extract before data from join point.
     */
    private String extractBeforeData(JoinPoint joinPoint) {
        try {
            Object[] args = joinPoint.getArgs();
            for (Object arg : args) {
                if (arg != null && !arg.getClass().isPrimitive() && !(arg instanceof String)) {
                    return objectMapper.writeValueAsString(arg);
                }
            }
        } catch (Exception e) {
            logger.warn("Failed to extract before data: {}", e.getMessage());
        }
        return null;
    }

    /**
     * Extract after data from result.
     */
    private String extractAfterData(JoinPoint joinPoint, Object result) {
        try {
            if (result != null && !(result instanceof Void)) {
                return objectMapper.writeValueAsString(result);
            }
        } catch (Exception e) {
            logger.warn("Failed to extract after data: {}", e.getMessage());
        }
        return null;
    }

    /**
     * Save RBAC-specific audit log.
     */
    private void saveRbacAuditLog(String action, String userEmail, String ip,
                                   String targetType, String targetId,
                                   String beforeData, String afterData) {
        try {
            AuditLog auditLog = AuditLog.builder()
                    .action(action)
                    .resourceType(targetType)
                    .resourceId(targetId)
                    .user(null) // TODO: Find user by email
                    .oldValues(beforeData)
                    .newValues(afterData)
                    .createdAt(Instant.now())
                    .ipAddress(ip)
                    .userAgent("RBAC_AUDIT")
                    .result("SUCCESS")
                    .build();

            auditLogRepository.save(auditLog);
        } catch (Exception e) {
            logger.error("Failed to save RBAC audit log: {}", e.getMessage());
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
            ip = request != null ? request.getRemoteAddr() : "UNKNOWN";
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
                    .resource(uri)
                    .user(null) // TODO: Find user by email
                    .createdAt(Instant.now())
                    .ipAddress(ip)
                    .userAgent("AUDIT")
                    .result(status)
                    .oldValues(errorType)
                    .newValues("Duration: " + duration + "ms")
                    .build();

            auditLogRepository.save(auditLog);
        } catch (Exception e) {
            logger.error("Failed to save audit log: {}", e.getMessage());
        }
    }
}