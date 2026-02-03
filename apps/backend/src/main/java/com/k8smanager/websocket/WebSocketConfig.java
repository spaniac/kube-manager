package com.k8smanager.websocket;

import com.k8smanager.controller.TerminalController;
import io.fabric8.kubernetes.client.KubernetesClient;
import io.fabric8.kubernetes.client.dsl.ExecListener;
import io.fabric8.kubernetes.client.dsl.ExecWatch;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.*;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;
import org.springframework.web.socket.handler.AbstractWebSocketHandler;

import java.io.IOException;

/**
 * WebSocket configuration for terminal emulation.
 */
@Configuration
@EnableWebSocket
public class WebSocketConfig implements WebSocketConfigurer {

    private static final Logger log = LoggerFactory.getLogger(WebSocketConfig.class);

    @Autowired
    private KubernetesClient kubernetesClient;

    @Autowired
    private TerminalController terminalController;

    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        registry.addHandler(new TerminalWebSocketHandler(), "/ws/terminal")
                .setAllowedOrigins("*");
    }

    /**
     * WebSocket handler for terminal sessions.
     */
    public class TerminalWebSocketHandler extends AbstractWebSocketHandler {

        @Override
        public void afterConnectionEstablished(WebSocketSession session) throws Exception {
            log.info("WebSocket connection established: {}", session.getId());
        }

        @Override
        public void handleMessage(WebSocketSession session, org.springframework.web.socket.WebSocketMessage<?> message) throws Exception {
            log.debug("Message received from session {}: {}", session.getId(), message.getPayload());
        }

        @Override
        public void handleTransportError(WebSocketSession session, Throwable exception) throws Exception {
            log.error("Transport error for session {}: {}", session.getId(), exception.getMessage());
        }

        @Override
        public void afterConnectionClosed(WebSocketSession session, CloseStatus closeStatus) throws Exception {
            log.info("WebSocket connection closed: {}", session.getId());
            ExecWatch execWatch = terminalController.getSession(session.getId());
            if (execWatch != null) {
                execWatch.close();
            }
        }

        @Override
        public boolean supportsPartialMessages() {
            return false;
        }

        @Override
        public void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
            ExecWatch execWatch = terminalController.getSession(session.getId());
            if (execWatch == null) {
                String command = message.getPayload();
                log.info("Initializing terminal session for: {}", command);

                String[] parts = command.split(":");
                if (parts.length < 2) {
                    log.error("Invalid connection string: {}", command);
                    session.close(CloseStatus.BAD_DATA);
                    return;
                }
                String namespace = parts[0];
                String podName = parts[1];
                String containerName = parts.length > 2 ? parts[2] : null;

                execWatch = executeCommand(session, namespace, podName, containerName);
                terminalController.registerSession(session.getId(), execWatch);
            } else {
                // Send input to the running terminal
                if (execWatch.getInput() != null) {
                    execWatch.getInput().write(message.getPayload().getBytes());
                    execWatch.getInput().flush();
                }
            }
        }

        @Override
        public void handleBinaryMessage(WebSocketSession session, BinaryMessage message) throws Exception {
            log.debug("Binary message received from session {}", session.getId());
            ExecWatch execWatch = terminalController.getSession(session.getId());
            if (execWatch != null && execWatch.getInput() != null) {
                execWatch.getInput().write(message.getPayload().array());
                execWatch.getInput().flush();
            }
        }

        private ExecWatch executeCommand(WebSocketSession session, String namespace, String podName, String containerName, String[] command) {
            // Default to /bin/sh if no command provided (standard terminal behavior)
            String[] actualCommand = (command != null && command.length > 0) ? command : new String[]{"/bin/sh"};
            
            // Execute command and get ExecWatch. 
            // Standard streams are piped by default in Fabric8 client.
            ExecWatch watch = kubernetesClient.pods()
                    .inNamespace(namespace)
                    .withName(podName)
                    .inContainer(containerName != null ? containerName : "")
                    .usingListener(new TerminalExecListener(session))
                    .exec(actualCommand);

            // Start threads to pipe stdout and stderr to WebSocket
            streamToWebSocket(session, watch.getOutput(), "STDOUT");
            streamToWebSocket(session, watch.getError(), "STDERR");

            return watch;
        }
        
        // Helper to execute with default shell
        private ExecWatch executeCommand(WebSocketSession session, String namespace, String podName, String containerName) {
            return executeCommand(session, namespace, podName, containerName, new String[]{"/bin/sh"});
        }

        private void streamToWebSocket(WebSocketSession session, java.io.InputStream inputStream, String streamType) {
            Thread thread = new Thread(() -> {
                byte[] buffer = new byte[1024];
                int read;
                try {
                    while ((read = inputStream.read(buffer)) != -1) {
                        if (!session.isOpen()) break;
                        session.sendMessage(new TextMessage(new String(buffer, 0, read)));
                    }
                } catch (IOException e) {
                    log.error("Error reading {} stream for session {}", streamType, session.getId(), e);
                } finally {
                     // If stream closes, we might want to close session or just log
                     log.info("{} stream closed for session {}", streamType, session.getId());
                }
            });
            thread.setDaemon(true);
            thread.start();
        }

        /**
         * Exec listener for terminal connection status.
         */
        private class TerminalExecListener implements ExecListener {

            private final WebSocketSession session;

            public TerminalExecListener(WebSocketSession session) {
                this.session = session;
            }

            @Override
            public void onOpen() {
                log.info("Exec connection opened for session {}", session.getId());
            }

            @Override
            public void onClose(int code, String reason) {
                log.info("Exec connection closed for session {}: {}", session.getId(), reason);
                try {
                    if (session.isOpen()) {
                        session.close(CloseStatus.NORMAL);
                    }
                } catch (IOException e) {
                    // ignore
                }
            }
        }
    }
}
