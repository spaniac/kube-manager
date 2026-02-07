package com.k8smanager.dto;

import io.swagger.v3.oas.annotations.media.Schema;

import java.util.List;

@Schema(description = "Kubernetes service exposing pods to network traffic")
public record ServiceDTO(
        @Schema(description = "Name of the service", example = "nginx-service")
        String name,
        @Schema(description = "Namespace where service is located", example = "default")
        String namespace,
        @Schema(description = "Type of service (ClusterIP, NodePort, LoadBalancer)", example = "ClusterIP")
        String type,
        @Schema(description = "Cluster IP addresses assigned to the service", example = "[\"10.96.0.1\"]")
        List<String> clusterIPs,
        @Schema(description = "List of ports exposed by the service")
        List<ServicePortDTO> ports,
        @Schema(description = "Label selector for pods this service routes to", example = "app=nginx")
        String selector,
        @Schema(description = "List of endpoints (pods) the service routes to")
        List<ServiceEndpointDTO> endpoints
) {
}
