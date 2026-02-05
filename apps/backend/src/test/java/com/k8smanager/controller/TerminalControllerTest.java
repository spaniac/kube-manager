package com.k8smanager.controller;

import com.k8smanager.common.response.ApiResponse;
import io.fabric8.kubernetes.client.KubernetesClient;
import io.fabric8.kubernetes.client.dsl.ExecWatch;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.jwt.Jwt;

import java.io.IOException;
import java.io.OutputStream;
import java.lang.reflect.Field;
import java.util.Map;
import java.util.concurrent.ConcurrentMap;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class TerminalControllerTest {

    @Mock
    private KubernetesClient kubernetesClient;

    @Mock
    private ExecWatch execWatch;

    @Mock
    private OutputStream outputStream;

    @Mock
    private Jwt jwt;

    @InjectMocks
    private TerminalController terminalController;

    @BeforeEach
    void setUp() throws IOException {
        lenient().when(execWatch.getInput()).thenReturn(outputStream);
    }

    @Test
    void testConnectTerminal() {
        String namespace = "test-ns";
        String podName = "test-pod";
        String container = "main";

        ResponseEntity<ApiResponse<TerminalController.SessionInfo>> response = terminalController.connectTerminal(namespace, podName, container, jwt);

        assertThat(response.getStatusCode().is2xxSuccessful()).isTrue();
        assertThat(response.getBody().getData().namespace()).isEqualTo(namespace);
        assertThat(response.getBody().getData().podName()).isEqualTo(podName);
        assertThat(response.getBody().getData().container()).isEqualTo(container);
    }

    @Test
    void testCloseTerminal() throws Exception {
        String sessionId = "test-session";
        terminalController.registerSession(sessionId, execWatch);

        ResponseEntity<ApiResponse<Void>> response = terminalController.closeTerminal(sessionId, jwt);

        assertThat(response.getStatusCode().is2xxSuccessful()).isTrue();
        verify(execWatch).close();
        assertThat(terminalController.getSession(sessionId)).isNull();
    }

    @Test
    void testExecuteCommand() throws IOException {
        String sessionId = "test-session";
        terminalController.registerSession(sessionId, execWatch);
        TerminalController.CommandRequest request = new TerminalController.CommandRequest("ls -la");

        ResponseEntity<ApiResponse<Void>> response = terminalController.executeCommand(sessionId, request, jwt);

        assertThat(response.getStatusCode().is2xxSuccessful()).isTrue();
        verify(outputStream).write(any(byte[].class));
        verify(outputStream).flush();
    }

    @Test
    void testExecuteCommandSessionNotFound() {
        String sessionId = "non-existent";
        TerminalController.CommandRequest request = new TerminalController.CommandRequest("ls -la");

        ResponseEntity<ApiResponse<Void>> response = terminalController.executeCommand(sessionId, request, jwt);

        assertThat(response.getStatusCode().is4xxClientError()).isTrue();
    }

    @Test
    void testResizeTerminal() throws IOException {
        String sessionId = "test-session";
        terminalController.registerSession(sessionId, execWatch);
        TerminalController.ResizeRequest request = new TerminalController.ResizeRequest(24, 80);

        ResponseEntity<ApiResponse<Void>> response = terminalController.resizeTerminal(sessionId, request, jwt);

        assertThat(response.getStatusCode().is2xxSuccessful()).isTrue();
        verify(outputStream).write(any(byte[].class));
        verify(outputStream).flush();
    }

    @Test
    void testInterruptTerminal() throws IOException {
        String sessionId = "test-session";
        terminalController.registerSession(sessionId, execWatch);

        ResponseEntity<ApiResponse<Void>> response = terminalController.interruptTerminal(sessionId, jwt);

        assertThat(response.getStatusCode().is2xxSuccessful()).isTrue();
        verify(outputStream).write(any(byte[].class));
        verify(outputStream).flush();
    }

    @Test
    void testGetActiveSessions() {
        String sessionId = "test-session";
        terminalController.registerSession(sessionId, execWatch);

        ResponseEntity<ApiResponse<Map<String, TerminalController.SessionInfo>>> response = terminalController.getActiveSessions(jwt);

        assertThat(response.getStatusCode().is2xxSuccessful()).isTrue();
        assertThat(response.getBody().getData()).containsKey(sessionId);
    }
}
