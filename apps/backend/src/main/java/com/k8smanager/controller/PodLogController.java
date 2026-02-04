package com.k8smanager.controller;

import com.k8smanager.common.response.ApiResponse;
import io.fabric8.kubernetes.api.model.Container;
import io.fabric8.kubernetes.api.model.Pod;
import io.fabric8.kubernetes.client.KubernetesClient;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.util.List;

/**
 * Controller for pod log streaming.
 */
@RestController
@RequestMapping("/pods")
public class PodLogController {

    private static final Logger log = LoggerFactory.getLogger(PodLogController.class);
    private final KubernetesClient kubernetesClient;

    public PodLogController(KubernetesClient kubernetesClient) {
        this.kubernetesClient = kubernetesClient;
    }

    /**
     * Stream pod logs with filtering options.
     * GET /api/v1/pods/{namespace}/{name}/logs
     */
    @GetMapping("/{namespace}/{name}/logs")
    @PreAuthorize("hasAnyAuthority('LOGS', 'POD')")
    public SseEmitter streamPodLogs(
            @PathVariable String namespace,
            @PathVariable String name,
            @RequestParam(required = false) String containerName,
            @RequestParam(required = false) Boolean previous,
            @RequestParam(required = false, defaultValue = "100") Integer tailLines,
            @RequestParam(required = false) String severity,
            @RequestParam(required = false) String search,
            @RequestParam(required = false) String since,
            @RequestParam(required = false) String until) {

        SseEmitter emitter = new SseEmitter();

        try {
            Pod pod = kubernetesClient.pods()
                    .inNamespace(namespace)
                    .withName(name)
                    .get();

            if (pod == null) {
                emitter.send(SseEmitter.event()
                        .data(ApiResponse.error("Pod not found"))
                        .build());
                emitter.complete();
                return emitter;
            }

            String podName = namespace + "/" + name;
            List<Container> containers = pod.getSpec() != null
                    ? pod.getSpec().getContainers()
                    : List.of();

            if (containerName != null && !containerName.isEmpty()) {
                emitter.send(SseEmitter.event()
                        .name("connected")
                        .data(ApiResponse
                                .success("Streaming logs for container: " + containerName + " in pod: " + podName))
                        .build());
            } else {
                emitter.send(SseEmitter.event()
                        .name("connected")
                        .data(ApiResponse.success("Streaming logs for pod: " + podName))
                        .build());
            }

            // Get logs from pod
            io.fabric8.kubernetes.client.dsl.LogWatch logs = kubernetesClient.pods()
                    .inNamespace(namespace)
                    .withName(name)
                    .watchLog();

            long sinceTimestamp = 0;
            long untilTimestamp = Long.MAX_VALUE;

            if (since != null && !since.isEmpty()) {
                try {
                    sinceTimestamp = java.time.Instant.parse(since).toEpochMilli();
                } catch (Exception e) {
                    // Ignore invalid since format
                }
            }

            if (until != null && !until.isEmpty()) {
                try {
                    untilTimestamp = java.time.Instant.parse(until).toEpochMilli();
                } catch (Exception e) {
                    // Ignore invalid until format
                }
            }

            final long finalSinceTimestamp = sinceTimestamp;
            final long finalUntilTimestamp = untilTimestamp;

            io.fabric8.kubernetes.client.dsl.LogWatch logWatch = logs;

            try {
                InputStream logStream = logWatch.getOutput();
                byte[] buffer = new byte[8192];
                int bytesRead;

                while ((bytesRead = logStream.read(buffer)) != -1) {
                    String logLine = new String(buffer, 0, bytesRead, StandardCharsets.UTF_8);

                    if (search != null && !search.isEmpty() && !logLine.toLowerCase().contains(search.toLowerCase())) {
                        continue;
                    }

                    if (severity != null && !severity.isEmpty()
                            && logLine.toLowerCase().contains(severity.toLowerCase())) {
                        emitter.send(SseEmitter.event()
                                .name("log")
                                .data(logLine)
                                .build());
                    } else if (severity == null || severity.isEmpty()) {
                        emitter.send(SseEmitter.event()
                                .name("log")
                                .data(logLine)
                                .build());
                    }
                }
            } catch (Exception e) {
                emitter.send(SseEmitter.event()
                        .data(ApiResponse.error("Failed to read logs: " + e.getMessage()))
                        .build());
                emitter.completeWithError(e);
            } finally {
                logWatch.close();
            }

            emitter.onCompletion(() -> {
                try {
                    logWatch.close();
                } catch (Exception e) {
                    log.error("Error closing log watch", e);
                }
            });
            emitter.onTimeout(() -> {
                try {
                    logWatch.close();
                } catch (Exception e) {
                    log.error("Error closing log watch on timeout", e);
                }
            });
            return emitter;

        } catch (Exception e) {
            try {
                emitter.send(SseEmitter.event()
                        .data(ApiResponse.error("Failed to stream logs: " + e.getMessage()))
                        .build());
            } catch (IOException ioException) {
                log.error("Error sending error event", ioException);
            }
            emitter.completeWithError(e);
            return emitter;
        }
    }
}
