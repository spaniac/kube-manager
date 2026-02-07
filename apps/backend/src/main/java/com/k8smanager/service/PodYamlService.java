package com.k8smanager.service;

import com.k8smanager.dto.PodDTO;
import com.k8smanager.dto.YamlValidationResponseDTO;
import com.k8smanager.k8s.K8sMapper;
import io.fabric8.kubernetes.api.model.Pod;
import io.fabric8.kubernetes.client.KubernetesClient;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

/**
 * Service for pod YAML display and management.
 */
@Service
public class PodYamlService {

    private final KubernetesClient kubernetesClient;
    private final K8sMapper k8sMapper;
    private final YamlValidationService yamlValidationService; // New dependency

    public PodYamlService(KubernetesClient kubernetesClient, K8sMapper k8sMapper, YamlValidationService yamlValidationService) {
        this.kubernetesClient = kubernetesClient;
        this.k8sMapper = k8sMapper;
        this.yamlValidationService = yamlValidationService;
    }

    /**
     * Get pod as YAML string.
     */
    public String getPodAsYaml(String namespace, String podName) {
        Pod pod = kubernetesClient.pods()
                .inNamespace(namespace)
                .withName(podName)
                .get();

        if (pod == null) {
            return null;
        }

        PodDTO podDto = k8sMapper.mapToPodDto(pod);
        return convertToYaml(podDto);
    }

    /**
     * Validate YAML content.
     */
    public YamlValidationResponseDTO validateYaml(String yamlContent) {
        return yamlValidationService.validateYaml(yamlContent);
    }

    /**
     * Get available Kubernetes schemas.
     */
    public Map<String, com.k8smanager.dto.K8sSchema> getYamlSchemas() { // Fully qualify K8sSchema to avoid conflict
        return yamlValidationService.getSchemas();
    }

    /**
     * Convert DTO to YAML string.
     */
    private String convertToYaml(Object dto) {
        StringBuilder yaml = new StringBuilder();
        appendYamlLine(yaml, "apiVersion: v1");
        appendYamlLine(yaml, "kind: Pod");
        appendYamlLine(yaml, "metadata:");
        appendYamlIndent(yaml, 2, "name: " + getFieldValue(dto, "name"));
        appendYamlIndent(yaml, 2, "namespace: " + getFieldValue(dto, "namespace"));
        appendYamlLine(yaml, "spec:");
        appendYamlIndent(yaml, 2, "containers:");
        appendListField(yaml, dto, "containers", 4);
        return yaml.toString();
    }

    /**
     * Format map for YAML.
     */
    private String formatMap(java.util.Map<?, ?> map) {
        if (map == null || map.isEmpty()) {
            return "{}";
        }
        StringBuilder sb = new StringBuilder();
        sb.append("{");
        map.forEach((k, v) -> {
            if (sb.length() > 1) sb.append(", ");
            sb.append(k).append(": \"").append(v).append("\"");
        });
        sb.append("}");
        return sb.toString();
    }

    /**
     * Append YAML line.
     */
    private void appendYamlLine(StringBuilder yaml, String line) {
        yaml.append(line).append("\n");
    }

    /**
     * Append YAML line with indentation.
     */
    private void appendYamlIndent(StringBuilder yaml, int indent, String line) {
        for (int i = 0; i < indent; i++) {
            yaml.append("  ");
        }
        yaml.append(line).append("\n");
    }

    /**
     * Append list field from DTO.
     */
    private void appendListField(StringBuilder yaml, Object dto, String fieldName, int indent) {
        List<?> items = getListField(dto, fieldName);
        if (items != null && !items.isEmpty()) {
            items.forEach(item -> {
                yaml.append("- ").append(fieldName).append(":");
                if (item instanceof String) {
                    yaml.append(" \"").append(item).append("\"");
                } else if (item instanceof Number) {
                    yaml.append(" ").append(item);
                }
            });
            yaml.append("\n");
        }
    }

    /**
     * Get list field from DTO.
     */
    @SuppressWarnings("unchecked")
    private List<?> getListField(Object dto, String fieldName) {
        try {
            java.lang.reflect.Field field = dto.getClass().getDeclaredField(fieldName);
            if (field != null) {
                field.setAccessible(true);
                return (List<?>) field.get(dto);
            }
        } catch (Exception e) {
            return null;
        }
        return null;
    }

    /**
     * Get field value from DTO.
     */
    @SuppressWarnings("unchecked")
    private String getFieldValue(Object dto, String fieldName) {
        try {
            java.lang.reflect.Field field = dto.getClass().getDeclaredField(fieldName);
            if (field != null) {
                field.setAccessible(true);
                Object value = field.get(dto);
                return value != null ? value.toString() : null;
            }
        } catch (Exception e) {
            return null;
        }
        return null;
    }
}
