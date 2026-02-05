package com.k8smanager.rbac;

import com.k8smanager.persistence.entity.Permission;
import com.k8smanager.persistence.entity.Role;
import com.k8smanager.persistence.entity.RolePermission;
import com.k8smanager.persistence.entity.User;
import com.k8smanager.persistence.entity.UserRole;
import com.k8smanager.persistence.repository.PermissionRepository;
import com.k8smanager.persistence.repository.RoleRepository;
import com.k8smanager.persistence.repository.UserRepository;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.Optional;
import java.util.Set;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class RbacServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private RoleRepository roleRepository;

    @Mock
    private PermissionRepository permissionRepository;

    @Mock
    private SecurityContext securityContext;

    @Mock
    private Authentication authentication;

    @InjectMocks
    private RbacService rbacService;

    @BeforeEach
    void setUp() {
        SecurityContextHolder.setContext(securityContext);
    }

    @AfterEach
    void tearDown() {
        SecurityContextHolder.clearContext();
    }

    @Test
    void testHasPermission() {
        String email = "test@example.com";
        User user = new User();
        user.setEmail(email);
        
        Role role = new Role();
        Permission permission = new Permission();
        permission.setType(Permission.PermissionType.READ);
        permission.setResourceType(Permission.ResourceType.POD);
        
        RolePermission rolePermission = new RolePermission();
        rolePermission.setRole(role);
        rolePermission.setPermission(permission);
        role.setRolePermissions(Set.of(rolePermission));
        
        UserRole userRole = new UserRole();
        userRole.setRole(role);
        userRole.setUser(user);
        user.setUserRoles(Set.of(userRole));

        when(securityContext.getAuthentication()).thenReturn(authentication);
        when(authentication.isAuthenticated()).thenReturn(true);
        when(authentication.getName()).thenReturn(email);
        when(userRepository.findByEmail(email)).thenReturn(Optional.of(user));

        boolean result = rbacService.hasPermission(Permission.PermissionType.READ, Permission.ResourceType.POD);

        assertThat(result).isTrue();
    }

    @Test
    void testHasPermissionNoUser() {
        String email = "test@example.com";
        when(securityContext.getAuthentication()).thenReturn(authentication);
        when(authentication.isAuthenticated()).thenReturn(true);
        when(authentication.getName()).thenReturn(email);
        when(userRepository.findByEmail(email)).thenReturn(Optional.empty());

        boolean result = rbacService.hasPermission(Permission.PermissionType.READ, Permission.ResourceType.POD);

        assertThat(result).isFalse();
    }

    @Test
    void testHasPermissionNotAuthenticated() {
        when(securityContext.getAuthentication()).thenReturn(null);

        boolean result = rbacService.hasPermission(Permission.PermissionType.READ, Permission.ResourceType.POD);

        assertThat(result).isFalse();
    }

    @Test
    void testGetCurrentUserPermissions() {
        String email = "test@example.com";
        User user = new User();
        user.setEmail(email);
        
        Role role = new Role();
        Permission permission = new Permission();
        permission.setType(Permission.PermissionType.WRITE);
        
        RolePermission rolePermission = new RolePermission();
        rolePermission.setRole(role);
        rolePermission.setPermission(permission);
        role.setRolePermissions(Set.of(rolePermission));
        
        UserRole userRole = new UserRole();
        userRole.setRole(role);
        userRole.setUser(user);
        user.setUserRoles(Set.of(userRole));

        when(securityContext.getAuthentication()).thenReturn(authentication);
        when(authentication.isAuthenticated()).thenReturn(true);
        when(authentication.getName()).thenReturn(email);
        when(userRepository.findByEmail(email)).thenReturn(Optional.of(user));

        Set<Permission> result = rbacService.getCurrentUserPermissions();

        assertThat(result).hasSize(1);
        assertThat(result.iterator().next().getPermissionType()).isEqualTo(Permission.PermissionType.WRITE);
    }

    @Test
    void testInvalidatePermissionCache() {
        String email = "test@example.com";
        rbacService.updatePermissionTimestamp(email);
        assertThat(rbacService.getPermissionTimestamp(email)).isNotNull();

        rbacService.invalidatePermissionCache(email);
        assertThat(rbacService.getPermissionTimestamp(email)).isNull();
    }

    @Test
    void testInvalidateCurrentUserCache() {
        String email = "test@example.com";
        when(securityContext.getAuthentication()).thenReturn(authentication);
        when(authentication.isAuthenticated()).thenReturn(true);
        when(authentication.getName()).thenReturn(email);

        rbacService.updatePermissionTimestamp(email);
        rbacService.invalidateCurrentUserCache();
        
        assertThat(rbacService.getPermissionTimestamp(email)).isNull();
    }
}
