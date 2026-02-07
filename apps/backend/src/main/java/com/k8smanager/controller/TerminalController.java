package com.k8smanager.controller;

import com.k8smanager.common.response.ApiResponse;
import io.fabric8.kubernetes.client.KubernetesClient;
import io.fabric8.kubernetes.client.dsl.ExecWatch;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;

/**
 * Controller for WebSocket-based terminal emulation for pod containers.
 * Implements terminal access via Kubernetes exec API.
 */
@RestController
@RequestMapping("/terminal")
public class TerminalController {

    private final KubernetesClient kubernetesClient;
    private final ConcurrentMap<String, ExecWatch> activeSessions = new ConcurrentHashMap<>();
    private final int MAX_CONCURRENT_SESSIONS = 5;

    public TerminalController(KubernetesClient kubernetesClient) {
        this.kubernetesClient = kubernetesClient;
    }

    /**
     * Establish WebSocket connection for terminal session.
     * GET /api/v1/terminal/connect/{namespace}/{podName}
     * <p>
     * Note: Actual WebSocket upgrade should be handled by WebSocketConfig.
     * This endpoint provides session info and validates RBAC permissions.
     */
    @GetMapping("/connect/{namespace}/{podName}")
    @PreAuthorize("hasAnyAuthority('EXEC', 'POD')")
    public ResponseEntity<ApiResponse<SessionInfo>> connectTerminal(
            @PathVariable String namespace,
            @PathVariable String podName,
            @RequestParam(defaultValue = "") String container,
            @AuthenticationPrincipal Jwt jwt) {

        // Validate concurrent session limit
        String sessionId = generateSessionId(namespace, podName, container);
        if (activeSessions.size() >= MAX_CONCURRENT_SESSIONS) {
            return ResponseEntity.status(429)
                    .body(ApiResponse.error(HttpStatus.TOO_MANY_REQUESTS,
                            "Maximum concurrent terminal sessions (" + MAX_CONCURRENT_SESSIONS + ") reached. " +
                                    "Please close an existing session."));
        }

        return ResponseEntity.ok(ApiResponse.success(new SessionInfo(sessionId, namespace, podName, container)));
    }

    /**
     * Get list of active terminal sessions for current user.
     * GET /api/v1/terminal/sessions
     */
    @GetMapping("/sessions")
    @PreAuthorize("hasAnyAuthority('EXEC', 'POD')")
    public ResponseEntity<ApiResponse<Map<String, SessionInfo>>> getActiveSessions(@AuthenticationPrincipal Jwt jwt) {
        // Filter sessions by current user (simplified - in production, track user per
        // session)
        Map<String, SessionInfo> sessions = Map.ofEntries(activeSessions.entrySet().toArray(new Map.Entry[0]));
        return ResponseEntity.ok(ApiResponse.success(sessions));
    }

    /**
     * Close a terminal session.
     * DELETE /api/v1/terminal/sessions/{sessionId}
     */
    @DeleteMapping("/sessions/{sessionId}")
    @PreAuthorize("hasAnyAuthority('EXEC', 'POD')")
    public ResponseEntity<ApiResponse<Void>> closeTerminal(
            @PathVariable String sessionId,
            @AuthenticationPrincipal Jwt jwt) {

        ExecWatch execWatch = activeSessions.remove(sessionId);
        if (execWatch != null) {
            execWatch.close();
        }

        return ResponseEntity.ok(ApiResponse.success(null, "Terminal session closed successfully"));
    }

    /**
     * Resize terminal window.
     * POST /api/v1/terminal/sessions/{sessionId}/resize
     */
    @PostMapping("/sessions/{sessionId}/resize")
    @PreAuthorize("hasAnyAuthority('EXEC', 'POD')")
    public ResponseEntity<ApiResponse<Void>> resizeTerminal(
            @PathVariable String sessionId,
            @RequestBody ResizeRequest request,
            @AuthenticationPrincipal Jwt jwt) {

        ExecWatch execWatch = activeSessions.get(sessionId);
        if (execWatch == null) {
            return ResponseEntity.status(404)
                    .body(ApiResponse.error(HttpStatus.NOT_FOUND, "Terminal session not found"));
        }

        try {
            // Send resize signal to terminal
            byte[] resizeCommand = String.format(
                    "\033[%d;%dt",
                    request.rows(),
                    request.columns()).getBytes();

            execWatch.getInput().write(resizeCommand);
            execWatch.getInput().flush();

            return ResponseEntity.ok(ApiResponse.success(null, "Terminal resized successfully"));
        } catch (IOException e) {
            return ResponseEntity.status(500)
                    .body(ApiResponse.error(HttpStatus.INTERNAL_SERVER_ERROR,
                            "Failed to resize terminal: " + e.getMessage()));
        }
    }

    /**
     * Execute shell command in terminal.
     * POST /api/v1/terminal/sessions/{sessionId}/command
     */
    @PostMapping("/sessions/{sessionId}/command")
    @PreAuthorize("hasAnyAuthority('EXEC', 'POD')")
    public ResponseEntity<ApiResponse<Void>> executeCommand(
            @PathVariable String sessionId,
            @RequestBody CommandRequest request,
            @AuthenticationPrincipal Jwt jwt) {

        ExecWatch execWatch = activeSessions.get(sessionId);
        if (execWatch == null) {
            return ResponseEntity.status(404)
                    .body(ApiResponse.error(HttpStatus.NOT_FOUND, "Terminal session not found"));
        }

        try {
            byte[] commandWithNewline = (request.command() + "\n").getBytes();
            execWatch.getInput().write(commandWithNewline);
            execWatch.getInput().flush();

            return ResponseEntity.ok(ApiResponse.success(null, "Command executed successfully"));
        } catch (IOException e) {
            return ResponseEntity.status(500)
                    .body(ApiResponse.error(HttpStatus.INTERNAL_SERVER_ERROR,
                            "Failed to execute command: " + e.getMessage()));
        }
    }

    /**
     * Send interrupt signal (Ctrl+C) to terminal.
     * POST /api/v1/terminal/sessions/{sessionId}/interrupt
     */
    @PostMapping("/sessions/{sessionId}/interrupt")
    @PreAuthorize("hasAnyAuthority('EXEC', 'POD')")
    public ResponseEntity<ApiResponse<Void>> interruptTerminal(
            @PathVariable String sessionId,
            @AuthenticationPrincipal Jwt jwt) {

        ExecWatch execWatch = activeSessions.get(sessionId);
        if (execWatch == null) {
            return ResponseEntity.status(404)
                    .body(ApiResponse.error(HttpStatus.NOT_FOUND, "Terminal session not found"));
        }

        try {
            // Send interrupt signal (SIGINT, Ctrl+C)
            execWatch.getInput().write(new byte[] { 3 }); // ASCII ETX character
            execWatch.getInput().flush();

            return ResponseEntity.ok(ApiResponse.success(null, "Terminal interrupted successfully"));
        } catch (IOException e) {
            return ResponseEntity.status(500)
                    .body(ApiResponse.error(HttpStatus.INTERNAL_SERVER_ERROR,
                            "Failed to interrupt terminal: " + e.getMessage()));
        }
    }

    /**
     * Register an active terminal session.
     * Internal method called by WebSocket handler.
     */
    public void registerSession(String sessionId, ExecWatch execWatch) {
        activeSessions.put(sessionId, execWatch);
    }

    /**
     * Get active terminal session.
     * Internal method called by WebSocket handler.
     */
    public ExecWatch getSession(String sessionId) {
        return activeSessions.get(sessionId);
    }

    /**
     * Remove terminal session.
     * Internal method called by WebSocket handler on disconnect.
     */
    public void removeSession(String sessionId) {
        activeSessions.remove(sessionId);
    }

    /**
     * Check if session limit is reached.
     */
    public boolean isSessionLimitReached() {
        return activeSessions.size() >= MAX_CONCURRENT_SESSIONS;
    }

    /**
     * Generate unique session ID.
     */
    private String generateSessionId(String namespace, String podName, String container) {
        return String.format("%s-%s-%s-%d", namespace, podName, container, System.currentTimeMillis());
    }

    /**
     * Session information DTO.
     */
    public record SessionInfo(
            String sessionId,
            String namespace,
            String podName,
            String container) {
    }

    /**
     * Resize request DTO.
     */
    public record ResizeRequest(Integer rows, Integer columns) {
    }

    /**
     * Command request DTO.
     */
    public record CommandRequest(String command) {
    }
}
