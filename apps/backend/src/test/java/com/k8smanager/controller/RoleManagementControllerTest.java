package com.k8smanager.controller;

import com.k8smanager.common.response.ApiResponse;
import com.k8smanager.persistence.entity.Role;
import com.k8smanager.persistence.entity.User;
import com.k8smanager.persistence.entity.UserRole;
import com.k8smanager.persistence.repository.RoleRepository;
import com.k8smanager.persistence.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class RoleManagementControllerTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private RoleRepository roleRepository;

    @InjectMocks
    private RoleManagementController roleManagementController;

    @Test
    void testGetAllRoles() {
        Role role = new Role();
        role.setName(Role.RoleType.ADMIN);
        when(roleRepository.findAll()).thenReturn(List.of(role));

        ApiResponse<List<Role>> response = roleManagementController.getAllRoles();

        assertThat(response.isSuccess()).isTrue();
        assertThat(response.getData()).hasSize(1);
        assertThat(response.getData().get(0).getName()).isEqualTo(Role.RoleType.ADMIN);
    }

    @Test
    void testGetRole() {
        Role role = new Role();
        role.setName(Role.RoleType.ADMIN);
        when(roleRepository.findByName(Role.RoleType.ADMIN)).thenReturn(Optional.of(role));

        ApiResponse<Role> response = roleManagementController.getRole("ADMIN");

        assertThat(response.isSuccess()).isTrue();
        assertThat(response.getData().getName()).isEqualTo(Role.RoleType.ADMIN);
    }

    @Test
    void testGetRoleNotFound() {
        when(roleRepository.findByName(Role.RoleType.ADMIN)).thenReturn(Optional.empty());

        ApiResponse<Role> response = roleManagementController.getRole("ADMIN");

        assertThat(response.isSuccess()).isFalse();
        assertThat(response.getMessage()).isEqualTo("Role not found");
    }

    @Test
    void testAssignRole() {
        String email = "test@example.com";
        String roleName = "ADMIN";
        
        User user = new User();
        user.setEmail(email);
        user.setUserRoles(new java.util.HashSet<>());
        
        Role role = new Role();
        role.setName(Role.RoleType.ADMIN);

        when(userRepository.findByEmail(email)).thenReturn(Optional.of(user));
        when(roleRepository.findByName(Role.RoleType.ADMIN)).thenReturn(Optional.of(role));

        UserRole existingUserRole = new UserRole();
        existingUserRole.setRole(role);
        existingUserRole.setUser(user);
        user.getUserRoles().add(existingUserRole);

        ApiResponse<Void> response = roleManagementController.assignRole(roleName, Map.of("email", email));

        assertThat(response.isSuccess()).isTrue();
        verify(userRepository).save(user);
    }

    @Test
    void testRevokeRole() {
        String email = "test@example.com";
        String roleName = "ADMIN";
        
        User user = new User();
        user.setEmail(email);
        
        Role role = new Role();
        role.setName(Role.RoleType.ADMIN);
        
        UserRole userRole = new UserRole();
        userRole.setRole(role);
        userRole.setUser(user);
        
        user.setUserRoles(new java.util.HashSet<>(Set.of(userRole)));

        when(userRepository.findByEmail(email)).thenReturn(Optional.of(user));

        ApiResponse<Void> response = roleManagementController.revokeRole(roleName, Map.of("email", email));

        assertThat(response.isSuccess()).isTrue();
        assertThat(user.getUserRoles()).isEmpty();
        verify(userRepository).save(user);
    }
}
