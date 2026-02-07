package com.k8smanager.controller;

import com.k8smanager.common.response.ApiResponse;
import com.k8smanager.dto.SessionDTO;
import com.k8smanager.dto.UserProfileDTO;
import com.k8smanager.persistence.entity.Role;
import com.k8smanager.persistence.entity.Session;
import com.k8smanager.persistence.entity.User;
import com.k8smanager.persistence.entity.UserRole;
import com.k8smanager.persistence.repository.SessionRepository;
import com.k8smanager.persistence.repository.UserRepository;
import com.k8smanager.rbac.RbacService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.jwt.Jwt;

import java.time.Instant;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class UserControllerTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private SessionRepository sessionRepository;

    @Mock
    private RbacService rbacService;

    @Mock
    private Jwt jwt;

    @InjectMocks
    private UserController userController;

    @Test
    void testGetProfile() {
        String email = "test@example.com";
        when(jwt.getSubject()).thenReturn(email);

        User user = new User();
        user.setId(1L);
        user.setEmail(email);
        user.setName("Test User");
        user.setCreatedAt(Instant.now());
        user.setLastLoginAt(Instant.now());
        
        Role role = new Role();
        role.setName(Role.RoleType.VIEWER);
        UserRole userRole = new UserRole();
        userRole.setRole(role);
        user.setUserRoles(Set.of(userRole));

        when(userRepository.findByEmail(email)).thenReturn(Optional.of(user));

        ResponseEntity<ApiResponse<UserProfileDTO>> response = userController.getProfile(jwt);

        assertThat(response.getStatusCode().is2xxSuccessful()).isTrue();
        assertThat(response.getBody().getData().email()).isEqualTo(email);
        assertThat(response.getBody().getData().roles()).contains("VIEWER");
    }

    @Test
    void testGetSessions() {
        String email = "test@example.com";
        when(jwt.getSubject()).thenReturn(email);

        User user = new User();
        user.setId(1L);
        user.setEmail(email);
        
        Session session = new Session();
        session.setId(100L);
        session.setUser(user);
        session.setIpAddress("127.0.0.1");
        session.setCreatedAt(Instant.now());
        session.setLastActivityAt(Instant.now());
        session.setExpiresAt(Instant.now().plusSeconds(3600));
        
        user.setSessions(Set.of(session));

        when(userRepository.findByEmail(email)).thenReturn(Optional.of(user));

        ResponseEntity<ApiResponse<List<SessionDTO>>> response = userController.getSessions(jwt);

        assertThat(response.getStatusCode().is2xxSuccessful()).isTrue();
        assertThat(response.getBody().getData()).hasSize(1);
        assertThat(response.getBody().getData().get(0).ipAddress()).isEqualTo("127.0.0.1");
    }

    @Test
    void testRevokeSession() {
        String email = "test@example.com";
        Long sessionId = 100L;
        when(jwt.getSubject()).thenReturn(email);

        User user = new User();
        user.setId(1L);
        user.setEmail(email);

        Session session = new Session();
        session.setId(sessionId);
        session.setUser(user);

        when(userRepository.findByEmail(email)).thenReturn(Optional.of(user));
        when(sessionRepository.findById(sessionId)).thenReturn(Optional.of(session));

        ResponseEntity<ApiResponse<Void>> response = userController.revokeSession(sessionId, jwt);

        assertThat(response.getStatusCode().is2xxSuccessful()).isTrue();
        verify(sessionRepository).delete(session);
    }

    @Test
    void testRevokeSessionForbidden() {
        String email = "test@example.com";
        Long sessionId = 100L;
        when(jwt.getSubject()).thenReturn(email);

        User user = new User();
        user.setId(1L);
        user.setEmail(email);

        User otherUser = new User();
        otherUser.setId(2L);

        Session session = new Session();
        session.setId(sessionId);
        session.setUser(otherUser);

        when(userRepository.findByEmail(email)).thenReturn(Optional.of(user));
        when(sessionRepository.findById(sessionId)).thenReturn(Optional.of(session));

        ResponseEntity<ApiResponse<Void>> response = userController.revokeSession(sessionId, jwt);

        assertThat(response.getStatusCode().is4xxClientError()).isTrue();
        verify(sessionRepository, never()).delete(session);
    }

    @Test
    void testRevokeAllSessions() {
        String email = "test@example.com";
        when(jwt.getSubject()).thenReturn(email);

        User user = new User();
        user.setId(1L);
        user.setEmail(email);
        
        // This session is old and should be removed
        Session oldSession = new Session();
        oldSession.setId(100L);
        oldSession.setCreatedAt(Instant.now().minus(java.time.Duration.ofMinutes(10)));
        
        // This session is new and should be kept (simulating current session)
        Session currentSession = new Session();
        currentSession.setId(101L);
        currentSession.setCreatedAt(Instant.now());
        
        // Use a mutable set (HashSet is mutable)
        user.setSessions(new java.util.HashSet<>(java.util.Arrays.asList(oldSession, currentSession)));

        when(userRepository.findByEmail(email)).thenReturn(Optional.of(user));

        ResponseEntity<ApiResponse<Void>> response = userController.revokeAllSessions(jwt);

        assertThat(response.getStatusCode().is2xxSuccessful()).isTrue();
        verify(userRepository).save(user);
        assertThat(user.getSessions()).hasSize(1);
        assertThat(user.getSessions()).contains(currentSession);
    }
}
