package com.k8smanager.rbac;

import com.k8smanager.dto.PermissionRuleDTO;
import com.k8smanager.persistence.entity.AuditLog;
import com.k8smanager.persistence.entity.Permission;
import com.k8smanager.persistence.entity.PermissionRule;
import com.k8smanager.persistence.entity.Role;
import com.k8smanager.persistence.entity.RolePermission;
import com.k8smanager.persistence.entity.User;
import com.k8smanager.persistence.entity.UserRole;
import com.k8smanager.persistence.repository.AuditLogRepository;
import com.k8smanager.persistence.repository.PermissionRuleRepository;
import com.k8smanager.persistence.repository.PermissionRepository;
import com.k8smanager.persistence.repository.RoleRepository;
import com.k8smanager.persistence.repository.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.http.HttpStatus;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import org.springframework.web.server.ResponseStatusException;

import java.time.Instant;
import java.util.Collection;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;
import java.util.stream.Collectors;

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
    private final PermissionRuleRepository permissionRuleRepository;
    private final AuditLogRepository auditLogRepository;

    private final Map<String, Long> permissionTimestamps = new ConcurrentHashMap<>();

    public RbacService(UserRepository userRepository,
            RoleRepository roleRepository,
            PermissionRepository permissionRepository,
            PermissionRuleRepository permissionRuleRepository,
            AuditLogRepository auditLogRepository) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.permissionRepository = permissionRepository;
        this.permissionRuleRepository = permissionRuleRepository;
        this.auditLogRepository = auditLogRepository;
    }

    /**
     * Check if current user has specific permission (cached).
     */
    @Cacheable(value = CACHE_NAME, key = "'permission:' + T(com.k8smanager.rbac.RbacService).getCurrentUserEmail() + ':' + #permissionType + ':' + #resourceType + ':GLOBAL'")
    public boolean hasPermission(Permission.PermissionType permissionType,
            Permission.ResourceType resourceType) {
        return hasPermission(permissionType, resourceType, null);
    }

    /**
     * Check if current user has specific permission for a namespace (cached).
     */
    @Cacheable(value = CACHE_NAME, key = "'permission:' + T(com.k8smanager.rbac.RbacService).getCurrentUserEmail() + ':' + #permissionType + ':' + #resourceType + ':' + #namespace")
    public boolean hasPermission(Permission.PermissionType permissionType,
            Permission.ResourceType resourceType,
            String namespace) {
        String email = getCurrentUserEmail();
        if (email == null) {
            return false;
        }

        User user = userRepository.findByEmail(email).orElse(null);
        if (user == null) {
            return false;
        }

        return hasPermission(user, permissionType, resourceType, normalize(namespace));
    }

    /**
     * Get all permissions for current user (cached).
     */
    @Cacheable(value = CACHE_NAME, key = "'permissions:' + T(com.k8smanager.rbac.RbacService).getCurrentUserEmail()")
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
    @CacheEvict(value = CACHE_NAME, allEntries = true)
    public void invalidatePermissionCache(String email) {
        permissionTimestamps.remove(email);
        logger.info("Permission cache invalidated for user: {}", email);
    }

    @CacheEvict(value = CACHE_NAME, allEntries = true)
    public void invalidateAllPermissionCaches() {
        permissionTimestamps.clear();
        logger.info("All permission caches invalidated");
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
        invalidateAllPermissionCaches();
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
            Permission.ResourceType resourceType, String namespace) {
        List<EffectivePermissionGrant> grants = getEffectivePermissionGrants(user, permissionType, resourceType, namespace);
        if (grants.isEmpty()) {
            return false;
        }

        if (hasRuleWithEffect(grants, namespace, PermissionRule.Effect.DENY)) {
            return false;
        }

        if (hasRuleWithEffect(grants, namespace, PermissionRule.Effect.ALLOW)) {
            return true;
        }

        return true;
    }

    @Transactional(readOnly = true)
    public List<PermissionRuleDTO> getPermissionRules(Long roleId) {
        ensureRoleExists(roleId);
        return permissionRuleRepository.findByRole_IdOrderByIdAsc(roleId).stream()
                .map(this::toDto)
                .toList();
    }

    @Transactional
    public PermissionRuleDTO createPermissionRule(Long roleId, PermissionRuleDTO request) {
        Role role = roleRepository.findById(roleId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Role not found"));

        Permission permission = resolvePermission(request.permissionType(), request.resourceType());
        PermissionRule rule = PermissionRule.builder()
                .role(role)
                .permission(permission)
                .namespace(normalize(request.namespace()))
                .effect(parseEffect(request.effect()))
                .resourceNamePattern(normalizePattern(request.resourceNamePattern()))
                .build();

        PermissionRule saved = permissionRuleRepository.save(rule);
        writeRuleAudit("PERMISSION_RULE_CREATE", saved.getId().toString(), null, summarizeRule(saved));
        invalidateAllPermissionCaches();
        return toDto(saved);
    }

    @Transactional
    public PermissionRuleDTO updatePermissionRule(Long roleId, Long ruleId, PermissionRuleDTO request) {
        PermissionRule rule = permissionRuleRepository.findByIdAndRole_Id(ruleId, roleId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Permission rule not found"));

        String oldSnapshot = summarizeRule(rule);
        rule.setPermission(resolvePermission(request.permissionType(), request.resourceType()));
        rule.setNamespace(normalize(request.namespace()));
        rule.setEffect(parseEffect(request.effect()));
        rule.setResourceNamePattern(normalizePattern(request.resourceNamePattern()));

        PermissionRule saved = permissionRuleRepository.save(rule);
        writeRuleAudit("PERMISSION_RULE_UPDATE", saved.getId().toString(), oldSnapshot, summarizeRule(saved));
        invalidateAllPermissionCaches();
        return toDto(saved);
    }

    @Transactional
    public void deletePermissionRule(Long roleId, Long ruleId) {
        PermissionRule rule = permissionRuleRepository.findByIdAndRole_Id(ruleId, roleId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Permission rule not found"));
        String oldSnapshot = summarizeRule(rule);
        permissionRuleRepository.delete(rule);
        writeRuleAudit("PERMISSION_RULE_DELETE", ruleId.toString(), oldSnapshot, null);
        invalidateAllPermissionCaches();
    }

    private boolean hasRuleWithEffect(List<EffectivePermissionGrant> grants, String namespace, PermissionRule.Effect effect) {
        Collection<Long> roleIds = grants.stream().map(g -> g.userRole.getRole().getId()).collect(Collectors.toSet());
        Collection<Long> permissionIds = grants.stream().map(g -> g.rolePermission.getPermission().getId()).collect(Collectors.toSet());
        if (roleIds.isEmpty() || permissionIds.isEmpty()) {
            return false;
        }

        List<PermissionRule> candidateRules = permissionRuleRepository.findByRole_IdInAndPermission_IdIn(roleIds, permissionIds);
        return candidateRules.stream().anyMatch(rule ->
                rule.getEffect() == effect
                        && matchesGrant(rule, grants)
                        && namespaceMatchesScope(rule.getNamespace(), namespace)
                        && matchesResourceNamePattern(rule.getResourceNamePattern()));
    }

    private boolean matchesGrant(PermissionRule rule, List<EffectivePermissionGrant> grants) {
        return grants.stream().anyMatch(grant ->
                Objects.equals(grant.userRole.getRole().getId(), rule.getRole().getId())
                        && Objects.equals(grant.rolePermission.getPermission().getId(), rule.getPermission().getId()));
    }

    private List<EffectivePermissionGrant> getEffectivePermissionGrants(User user,
            Permission.PermissionType permissionType,
            Permission.ResourceType resourceType,
            String namespace) {
        return user.getUserRoles().stream()
                .filter(userRole -> namespaceMatchesScope(userRole.getNamespace(), namespace))
                .flatMap(userRole -> userRole.getRole().getRolePermissions().stream()
                        .filter(rolePermission -> namespaceMatchesScope(rolePermission.getNamespace(), namespace))
                        .filter(rolePermission -> rolePermissionMatches(rolePermission.getPermission(), permissionType, resourceType))
                        .map(rolePermission -> new EffectivePermissionGrant(userRole, rolePermission)))
                .toList();
    }

    private boolean rolePermissionMatches(Permission permission,
            Permission.PermissionType permissionType,
            Permission.ResourceType resourceType) {
        boolean permissionTypeMatch = permission.getPermissionType() == permissionType
                || permission.getPermissionType() == Permission.PermissionType.ALL;
        boolean resourceTypeMatch = resourceType == null
                || permission.getResourceType() == resourceType
                || permission.getResourceType() == Permission.ResourceType.ALL;
        return permissionTypeMatch && resourceTypeMatch;
    }

    private boolean namespaceMatchesScope(String scopedNamespace, String namespace) {
        if (namespace == null) {
            return scopedNamespace == null;
        }
        return scopedNamespace == null || scopedNamespace.equalsIgnoreCase(namespace);
    }

    private boolean matchesResourceNamePattern(String resourceNamePattern) {
        if (resourceNamePattern == null || resourceNamePattern.isBlank()) {
            return true;
        }
        return "*".equals(resourceNamePattern.trim());
    }

    private Permission resolvePermission(String permissionType, String resourceType) {
        Permission.PermissionType parsedPermissionType;
        Permission.ResourceType parsedResourceType;

        try {
            parsedPermissionType = Permission.PermissionType.valueOf(permissionType.trim().toUpperCase());
            parsedResourceType = Permission.ResourceType.valueOf(resourceType.trim().toUpperCase());
        } catch (IllegalArgumentException ex) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid permission or resource type");
        }

        List<Permission> existing = permissionRepository.findByTypeAndResourceType(parsedPermissionType, parsedResourceType);
        if (!existing.isEmpty()) {
            return existing.getFirst();
        }

        Permission permission = Permission.builder()
                .type(parsedPermissionType)
                .resourceType(parsedResourceType)
                .build();
        return permissionRepository.save(permission);
    }

    private PermissionRule.Effect parseEffect(String effect) {
        if (effect == null || effect.isBlank()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Rule effect is required");
        }
        try {
            return PermissionRule.Effect.valueOf(effect.trim().toUpperCase());
        } catch (IllegalArgumentException ex) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid rule effect");
        }
    }

    private PermissionRuleDTO toDto(PermissionRule rule) {
        return new PermissionRuleDTO(
                rule.getId(),
                rule.getRole().getId(),
                rule.getPermission().getType().name(),
                rule.getPermission().getResourceType().name(),
                rule.getNamespace(),
                rule.getEffect().name(),
                rule.getResourceNamePattern());
    }

    private void ensureRoleExists(Long roleId) {
        if (!roleRepository.existsById(roleId)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Role not found");
        }
    }

    private String normalize(String value) {
        if (value == null) {
            return null;
        }
        String trimmed = value.trim();
        return trimmed.isBlank() ? null : trimmed;
    }

    private String normalizePattern(String value) {
        String normalized = normalize(value);
        return normalized == null ? null : normalized;
    }

    private void writeRuleAudit(String action, String resourceId, String oldValues, String newValues) {
        User actor = resolveActor();
        if (actor == null) {
            return;
        }

        HttpServletRequest request = currentRequest();
        String userAgent = request != null && request.getHeader("User-Agent") != null
                ? request.getHeader("User-Agent")
                : "unknown";
        if (userAgent.length() > 50) {
            userAgent = userAgent.substring(0, 50);
        }

        AuditLog auditLog = AuditLog.builder()
                .user(actor)
                .action(action)
                .resourceType("PERMISSION_RULE")
                .resourceId(resourceId)
                .createdAt(Instant.now())
                .ipAddress(request != null ? request.getRemoteAddr() : null)
                .userAgent(userAgent)
                .oldValues(oldValues)
                .newValues(newValues)
                .result("SUCCESS")
                .build();

        auditLogRepository.save(auditLog);
    }

    private String summarizeRule(PermissionRule rule) {
        return "role=" + rule.getRole().getRoleKey()
                + ", permission=" + rule.getPermission().getType().name()
                + ", resource=" + rule.getPermission().getResourceType().name()
                + ", namespace=" + rule.getNamespace()
                + ", effect=" + rule.getEffect().name()
                + ", pattern=" + rule.getResourceNamePattern();
    }

    private User resolveActor() {
        String email = getCurrentUserEmail();
        if (email == null || email.isBlank()) {
            return null;
        }
        return userRepository.findByEmail(email).orElse(null);
    }

    private HttpServletRequest currentRequest() {
        if (!(RequestContextHolder.getRequestAttributes() instanceof ServletRequestAttributes attributes)) {
            return null;
        }
        return attributes.getRequest();
    }

    private static final class EffectivePermissionGrant {
        private final UserRole userRole;
        private final RolePermission rolePermission;

        private EffectivePermissionGrant(UserRole userRole, RolePermission rolePermission) {
            this.userRole = userRole;
            this.rolePermission = rolePermission;
        }
    }
}
