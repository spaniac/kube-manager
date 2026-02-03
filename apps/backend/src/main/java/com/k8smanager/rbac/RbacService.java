package com.k8smanager.rbac;

import com.k8smanager.persistence.entity.Permission;
import com.k8smanager.persistence.entity.User;
import com.k8smanager.persistence.repository.PermissionRepository;
import com.k8smanager.persistence.repository.RoleRepository;
import com.k8smanager.persistence.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

/**
 * Service for RBAC permission checking with caching.
 */
@Service
public class RbacService {

    private static final Logger logger = LoggerFactory.getLogger(RbacService.class);
    private static final String CACHE_NAME = "rbac_permissions";

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PermissionRepository permissionRepository;

    private final Map<String, Long> permissionTimestamps = new ConcurrentHashMap<>();

    public RbacService(UserRepository userRepository,
            RoleRepository roleRepository,
            PermissionRepository permissionRepository) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.permissionRepository = permissionRepository;
    }

    /**
     * Check if current user has specific permission (cached).
     */
    @Cacheable(value = CACHE_NAME, key = "'permission:' + T(com.k8smanager.rbac.RbacService).getCurrentUserEmail() + ':' + #permissionType + ':' + #resourceType + ':' + #root.targetObject")
    public boolean hasPermission(Permission.PermissionType permissionType,
            Permission.ResourceType resourceType) {
        String email = getCurrentUserEmail();
        if (email == null) {
            return false;
        }

        User user = userRepository.findByEmail(email).orElse(null);
        if (user == null) {
            return false;
        }

        return hasPermission(user, permissionType, resourceType);
    }

    /**
     * Get all permissions for current user (cached).
     */
    @Cacheable(value = CACHE_NAME, key = "'permissions:' + #root.targetObject")
    public Set<Permission> getCurrentUserPermissions() {
        String email = getCurrentUserEmail();
        if (email == null) {
            return Set.of();
        }

        return userRepository.findByEmail(email)
                .map(user -> user.getUserRoles().stream()
                        .flatMap(userRole -> userRole.getRole().getPermissions().stream())
                        .collect(java.util.stream.Collectors.toSet()))
                .orElse(Set.of());
    }

    /**
     * Invalidate permission cache for user.
     */
    @CacheEvict(value = CACHE_NAME, key = "'permissions:' + #email")
    public void invalidatePermissionCache(String email) {
        permissionTimestamps.remove(email);
        logger.info("Permission cache invalidated for user: {}", email);
    }

    /**
     * Invalidate permission cache for current user.
     */
    public void invalidateCurrentUserCache() {
        String email = getCurrentUserEmail();
        if (email != null) {
            invalidatePermissionCache(email);
        }
    }

    /**
     * Scheduled cache invalidation (every hour).
     */
    @Scheduled(fixedRate = 3600000)
    public void invalidateExpiredCaches() {
        logger.info("Running scheduled permission cache invalidation");
        permissionTimestamps.clear();
    }

    /**
     * Get permission timestamp for user.
     */
    public Long getPermissionTimestamp(String email) {
        return permissionTimestamps.get(email);
    }

    /**
     * Update permission timestamp.
     */
    public void updatePermissionTimestamp(String email) {
        permissionTimestamps.put(email, Instant.now().toEpochMilli());
    }

    /**
     * Get current user email from security context.
     */
    public static String getCurrentUserEmail() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) {
            return null;
        }
        return authentication.getName();
    }

    /**
     * Check if user has specific permission.
     */
    private boolean hasPermission(User user, Permission.PermissionType permissionType,
            Permission.ResourceType resourceType) {
        Set<Permission> permissions = user.getUserRoles().stream()
                .flatMap(userRole -> userRole.getRole().getPermissions().stream())
                .collect(java.util.stream.Collectors.toSet());

        return permissions.stream()
                .anyMatch(permission -> permission.getPermissionType() == permissionType
                        && (resourceType == null || permission.getResourceType() == resourceType
                                || permission.getResourceType() == Permission.ResourceType.ALL));
    }
}
