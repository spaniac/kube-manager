package com.k8smanager.controller;

import com.k8smanager.common.response.ApiResponse;
import com.k8smanager.persistence.entity.Role;
import com.k8smanager.persistence.entity.User;
import com.k8smanager.persistence.repository.RoleRepository;
import com.k8smanager.persistence.repository.UserRepository;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

/**
 * Controller for role assignment management.
 */
@RestController
@RequestMapping("/admin/roles")
@PreAuthorize("hasAnyAuthority('ADMIN')")
public class RoleManagementController {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;

    public RoleManagementController(UserRepository userRepository, RoleRepository roleRepository) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
    }

    /**
     * Get all roles.
     * GET /api/v1/admin/roles
     */
    @GetMapping
    public ApiResponse<List<Role>> getAllRoles() {
        return ApiResponse.success(roleRepository.findAll());
    }

    /**
     * Get role by name.
     * GET /api/v1/admin/roles/{name}
     */
    @GetMapping("/{name}")
    public ApiResponse<Role> getRole(@PathVariable String name) {
        return roleRepository.findByName(Role.RoleType.valueOf(name))
                .map(ApiResponse::success)
                .orElse(ApiResponse.error("Role not found"));
    }

    /**
     * Assign role to user.
     * POST /api/v1/admin/roles/{roleName}/assign
     */
    @PostMapping("/{roleName}/assign")
    public ApiResponse<Void> assignRole(
            @PathVariable String roleName,
            @RequestBody Map<String, String> request) {
        String email = request.get("email");
        User user = userRepository.findByEmail(email)
                .orElse(null);

        if (user == null) {
            return ApiResponse.error("User not found");
        }

        Role role = roleRepository.findByName(Role.RoleType.valueOf(roleName))
                .orElse(null);

        if (role == null) {
            return ApiResponse.error("Role not found");
        }

        user.getUserRoles().stream()
                .filter(ur -> ur.getRole().getName() == role.getName())
                .findFirst()
                .ifPresentOrElse(
                        userRole -> {
                            userRole.setUser(user);
                            userRole.setRole(role);
                            user.getUserRoles().add(userRole);
                            userRepository.save(user);
                        },
                        () -> {
                        }
                );
        return ApiResponse.success(null, "Role assigned successfully");
    }

    /**
     * Revoke role from user.
     * DELETE /api/v1/admin/roles/{roleName}/revoke
     */
    @DeleteMapping("/{roleName}/revoke")
    public ApiResponse<Void> revokeRole(
            @PathVariable String roleName,
            @RequestBody Map<String, String> request) {
        String email = request.get("email");
        User user = userRepository.findByEmail(email)
                .orElse(null);

        if (user == null) {
            return ApiResponse.error("User not found");
        }

        user.getUserRoles().removeIf(userRole ->
                userRole.getRole().getName() == Role.RoleType.valueOf(roleName));
        userRepository.save(user);

        return ApiResponse.success(null, "Role revoked successfully");
    }
}
