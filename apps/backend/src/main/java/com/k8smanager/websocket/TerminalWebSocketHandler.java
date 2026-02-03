package com.k8smanager.websocket;

import com.k8smanager.controller.TerminalController;
import io.fabric8.kubernetes.client.KubernetesClient;
import io.fabric8.kubernetes.client.dsl.ExecListener;
import io.fabric8.kubernetes.client.dsl.ExecWatch;
import io.fabric8.kubernetes.client.dsl.ExecutableExec;
import io.fabric8.kubernetes.client.dsl.NonClosingExecWatch;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.BinaryMessage;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.PipedInputStream;
import java.io.PipedOutputStream;
import java.nio.ByteBuffer;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.TimeUnit;

/**
 * WebSocket configuration for terminal emulation.
 * Handles WebSocket connections for pod shell access.
 */
@Configuration
@EnableWebSocket
public class WebSocketConfig implements WebSocketConfigurer {

    private static final Logger log = LoggerFactory.getLogger(WebSocketConfig.class);
    private static final int READ_BUFFER_SIZE = 8192;
    private static final int WRITE_BUFFER_SIZE = 8192;

    private final TerminalController terminalController;

    @Autowired
    public WebSocketConfig(TerminalController terminalController) {
        this.terminalController = terminalController;
    }

    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        registry.addHandler(new TerminalWebSocketHandler(), "/api/v1/terminal/ws")
                .setAllowedOrigins("*");
    }

    /**
     * WebSocket handler for terminal connections.
     */
    class TerminalWebSocketHandler implements WebSocketHandler {

        @Override
        public void afterConnectionEstablished(WebSocketSession session) throws Exception {
            log.info("Terminal WebSocket connected: sessionId={}", session.getId());

            // Extract session parameters from session ID
            String sessionId = extractSessionId(session.getId());
            String namespace = extractNamespace(session.getId());
            String podName = extractPodName(session.getId());
            String container = extractContainer(session.getId());

            // Validate session exists
            var execWatch = terminalController.getSession(sessionId);
            if (execWatch == null) {
                log.warn("Invalid terminal session attempt: sessionId={}", sessionId);
                session.close(CloseStatus.NOT_ACCEPTABLE, "Invalid session ID");
                return;
            }

            try {
                // Create Kubernetes exec client for the pod
                KubernetesClient k8sClient = getKubernetesClient(sessionId);
                ExecWatch watch = k8sClient.v1().pods()
                        .inNamespace(namespace)
                        .withName(podName)
                        .executing("sh", container.isEmpty() ? null : container)
                        .redirectingInput()
                        .redirectingOutput()
                        .redirectingError()
                        .withListener(new TerminalExecListener(session))
                        .usingListener()
                        .terminate();

                // Register session with the exec watch
                terminalController.registerSession(sessionId, (NonClosingExecWatch) watch);

                log.info("Terminal session established: sessionId={}, pod={}/{}", sessionId, podName);

            } catch (Exception e) {
                log.error("Failed to establish terminal connection: sessionId={}, error={}", sessionId, e.getMessage(), e);
                session.close(CloseStatus.SERVER_ERROR, "Failed to connect to pod: " + e.getMessage());
            }
        }

        @Override
        public void handleMessage(WebSocketSession session, WebSocketMessage<?> message) throws Exception {
            String sessionId = extractSessionId(session.getId());
            var execWatch = terminalController.getSession(sessionId);

            if (execWatch == null) {
                log.warn("Received message for invalid session: sessionId={}", sessionId);
                return;
            }

            try {
                // Handle text messages (commands to send to pod)
                if (message instanceof TextMessage) {
                    String command = ((TextMessage) message).getPayload();
                    if (command != null && !command.trim().isEmpty()) {
                        log.debug("Received command for terminal sessionId={}: command={}", sessionId, command);
                        sendCommandToPod(execWatch, command);
                    }
                }
                // Handle resize requests
                else if (message instanceof BinaryMessage) {
                    handleBinaryMessage(sessionId, execWatch, (BinaryMessage) message);
                }
            } catch (IOException e) {
                log.error("Failed to send command to pod: sessionId={}, error={}", sessionId, e.getMessage(), e);
            }
        }

        @Override
        public void handleTransportError(WebSocketSession session, Throwable exception) throws Exception {
            log.error("WebSocket transport error: sessionId={}, error={}", session.getId(), exception.getMessage());
        }

        @Override
        public void afterConnectionClosed(WebSocketSession session, CloseStatus closeStatus, String reason) throws Exception {
            String sessionId = extractSessionId(session.getId());
            log.info("Terminal WebSocket closed: sessionId={}, status={}, reason={}", sessionId, closeStatus, reason);

            // Cleanup terminal session
            terminalController.removeSession(sessionId);
        }

        @Override
        public boolean supportsPartialMessages() {
            return true;
        }

        @Override
        public void handleMessage(WebSocketSession session, WebSocketMessage<?> message, boolean partial) throws Exception {
            // Not needed for terminal use case
        }

        /**
         * Send command to Kubernetes pod.
         */
        private void sendCommandToPod(ExecWatch watch, String command) throws IOException {
            byte[] commandBytes = (command + "\n").getBytes();
            watch.getInput().write(commandBytes);
            watch.getInput().flush();
        }

        /**
         * Handle binary messages (e.g., resize requests, special keys).
         */
        private void handleBinaryMessage(String sessionId, ExecWatch watch, BinaryMessage message) {
            ByteBuffer buffer = message.getPayload();
            byte[] data = new byte[buffer.remaining()];
            buffer.get(data);

            try {
                // If binary data, send directly to pod input
                watch.getInput().write(data);
                watch.getInput().flush();
            } catch (IOException e) {
                log.error("Failed to send binary data to pod: sessionId={}, error={}", sessionId, e.getMessage(), e);
            }
        }

        /**
         * Extract session ID from WebSocket session ID.
         * Format: "terminal-{namespace}-{podName}-{container}-{timestamp}"
         */
        private String extractSessionId(String sessionId) {
            return sessionId.split("-")[0];
        }

        /**
         * Extract namespace from WebSocket session ID.
         */
        private String extractNamespace(String sessionId) {
            String[] parts = sessionId.split("-");
            return parts.length > 1 ? parts[1] : "";
        }

        /**
         * Extract pod name from WebSocket session ID.
         */
        private String extractPodName(String sessionId) {
            String[] parts = sessionId.split("-");
            return parts.length > 2 ? parts[2] : "";
        }

        /**
         * Extract container name from WebSocket session ID.
         */
        private String extractContainer(String sessionId) {
            String[] parts = sessionId.split("-");
            return parts.length > 3 ? parts[3] : "";
        }

        /**
         * Get Kubernetes client instance.
         * In production, this would be the in-cluster client.
         * For testing, may need a different configuration.
         */
        private KubernetesClient getKubernetesClient(String sessionId) {
            // This should match the same client used in TerminalController
            // In a real implementation, this would be autowired from the same bean
            // For now, return null to be fixed with proper dependency injection
            return null;
        }
    }

    /**
     * K8s exec listener for handling pod output streams.
     */
    class TerminalExecListener implements ExecListener {

        private final WebSocketSession session;
        private final ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        private CompletableFuture<Void> execFuture;

        public TerminalExecListener(WebSocketSession session) {
            this.session = session;
            this.execFuture = new CompletableFuture<>();
        }

        @Override
        public void onOpen() {
            log.info("Exec stream opened for session: {}", session.getId());
            sendToClient(new byte[0]); // Send initial byte
        }

        @Override
        public void onFail(Throwable t, Exec exec) {
            log.error("Exec failed for session: {}, error: {}", session.getId(), t.getMessage(), t);
            try {
                session.sendMessage(new TextMessage("ERROR: " + t.getMessage()));
            } catch (Exception e) {
                log.error("Failed to send error message: {}", e.getMessage());
            }
            execFuture.completeExceptionally(t);
        }

        @Override
        public void onClose(int code, String reason) {
            log.info("Exec stream closed for session: {}, code={}, reason={}", session.getId(), code, reason);
            execFuture.complete(null);
        }

        @Override
        public void onExit(int code, String reason) {
            log.info("Exec process exited for session: {}, code={}, reason={}", session.getId(), code, reason);
            try {
                session.sendMessage(new TextMessage("Process exited with code: " + code));
            } catch (Exception e) {
                log.error("Failed to send exit message: {}", e.getMessage());
            }
            execFuture.complete(null);
        }

        @Override
        public boolean onStdout(byte[] data, boolean complete) {
            try {
                // Send pod stdout to WebSocket client
                session.sendMessage(new BinaryMessage(data));
            } catch (Exception e) {
                log.error("Failed to send stdout to client: {}", e.getMessage());
            }
            return false;
        }

        @Override
        public boolean onStderr(byte[] data, boolean complete) {
            try {
                // Send pod stderr to WebSocket client (typically prefixed with error indicator)
                session.sendMessage(new BinaryMessage(data));
            } catch (Exception e) {
                log.error("Failed to send stderr to client: {}", e.getMessage());
            }
            return false;
        }

        public CompletableFuture<Void> getExecFuture() {
            return execFuture;
        }
    }
}
