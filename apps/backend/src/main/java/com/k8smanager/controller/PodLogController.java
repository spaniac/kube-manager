package com.k8smanager.controller;

import com.k8smanager.common.response.ApiResponse;
import com.k8smanager.dto.*;
import io.fabric8.kubernetes.api.model.Pod;
import io.fabric8.kubernetes.api.model.Container;
import io.fabric8.kubernetes.client.KubernetesClient;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Controller for pod log streaming.
 */
@RestController
@RequestMapping("/pods")
public class PodLogController {

    private final KubernetesClient kubernetesClient;

    public PodLogController(KubernetesClient kubernetesClient) {
        this.kubernetesClient = kubernetesClient;
    }

    /**
     * Stream pod logs with filtering options.
     * GET /api/v1/pods/{namespace}/{name}/logs
     */
    @GetMapping("/{namespace}/{name}/logs")
    @PreAuthorize("hasAuthority('LOGS', 'POD')")
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
                            .data(SseEmitter.event()
                                    .name("connected")
                                    .data(ApiResponse.success("Streaming logs for container: " + containerName + " in pod: " + podName))
                                    .build())
                            .build());
            } else {
                emitter.send(SseEmitter.event()
                            .data(SseEmitter.event()
                                    .name("connected")
                                    .data(ApiResponse.success("Streaming logs for pod: " + podName))
                                    .build())
                            .build());
            }

            // Get logs from pod
            io.fabric8.kubernetes.client.dsl.PodResource<Pod, io.fabric8.kubernetes.client.dsl.LogWatch, io.fabric8.kubernetes.client.dsl.Resource<Pod>> logs =
                    kubernetesClient.pods()
                            .inNamespace(namespace)
                            .withName(name)
                            .getLog();

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

            // Stream logs with filtering
            logs.watch(new io.fabric8.kubernetes.client.dsl.Watch<Pod>() {
                try {
                    logs.resource(resource -> {
                        io.fabric8.kubernetes.client.dsl.LogWatch log = resource;

                        String logLine = new String(log.getBytes(), StandardCharsets.UTF_8);
                        java.time.Instant timestamp = java.time.Instant.ofEpochMilli(
                                log.getMetadata().getCreationTimestamp() + (log.getLine() * 1000)
                        );

                        // Apply filters
                        if (severity != null || severity.isEmpty()) {
                            emitter.send(SseEmitter.event()
                                                    .name("log")
                                                    .data(SseEmitter.event()
                                                            .name("severity")
                                                            .value(severity.toLowerCase()))
                                                            .build())
                                                    .build());
                        }

                        if (search != null && !search.isEmpty() && logLine.toLowerCase().contains(search.toLowerCase())) {
                            emitter.send(SseEmitter.event()
                                                    .name("log")
                                                    .data(SseEmitter.event()
                                                            .name("match")
                                                            .value(search))
                                                            .build())
                                                    .build());
                        }

                        if (finalSinceTimestamp > 0 && timestamp < finalSinceTimestamp) {
                            return; // Skip old logs
                        }

                        if (finalUntilTimestamp > 0 && timestamp > finalUntilTimestamp) {
                            break; // Stop streaming
                        }

                        emitter.send(SseEmitter.event()
                                            .data(SseEmitter.event()
                                                    .name("log")
                                                    .data(logLine)
                                                    .build())
                                            .build());
                    });
                } catch (Exception e) {
                    emitter.send(SseEmitter.event()
                                    .data(ApiResponse.error("Failed to read logs: " + e.getMessage()))
                                    .build());
                    emitter.completeWithError(e);
                }
            });

            // Send completion event
            emitter.send(SseEmitter.event()
                            .data(SseEmitter.event().name("done").build())
                            .build());

            // Keep connection for cleanup
            emitter.onCompletion(() -> logs.close());
            emitter.onTimeout(() -> {
                logs.close();
            });

        } catch (Exception e) {
            emitter.send(SseEmitter.event()
                            .data(ApiResponse.error("Failed to stream logs: " + e.getMessage()))
                            .build());
            emitter.completeWithError(e);
            return emitter;
        }
    }
}
