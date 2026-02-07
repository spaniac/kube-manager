package com.k8smanager.service;

import com.k8smanager.dto.K8sSchema;
import com.k8smanager.dto.K8sSchemaProperty;
import com.k8smanager.dto.YamlValidationResponseDTO;
import com.k8smanager.dto.YamlValidationResponseDTO.ValidationError;
import com.k8smanager.dto.YamlValidationResponseDTO.ValidationWarning;
import org.springframework.stereotype.Service;
import org.yaml.snakeyaml.Yaml;
import org.yaml.snakeyaml.error.Mark;
import org.yaml.snakeyaml.error.YAMLException;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class YamlValidationService {

    private final Map<String, K8sSchema> k8sSchemas = new HashMap<>();

    public YamlValidationService() {
        // Initialize with some basic K8s schemas
        // In a real application, these would be loaded from a more comprehensive source
        k8sSchemas.put("Deployment", K8sSchema.builder()
                .apiVersion("apps/v1")
                .kind("Deployment")
                .addProperty("apiVersion", "string", true, "APIVersion defines the versioned schema of this representation of an object.")
                .addProperty("kind", "string", true, "Kind is a string value representing the REST resource this object represents.")
                .addProperty("metadata", "object", true, "Standard object metadata.",
                        new HashMap<String, K8sSchemaProperty>() {{
                            put("name", K8sSchemaProperty.builder().type("string").required(true).build());
                            put("namespace", K8sSchemaProperty.builder().type("string").required(false).build());
                            put("labels", K8sSchemaProperty.builder().type("object").required(false).build());
                        }}, null, null)
                .addProperty("spec", "object", true, "Specification of the desired behavior of the Deployment.",
                        new HashMap<String, K8sSchemaProperty>() {{
                            put("replicas", K8sSchemaProperty.builder().type("integer").required(false).build());
                            put("selector", K8sSchemaProperty.builder().type("object").required(true).build());
                            put("template", K8sSchemaProperty.builder().type("object").required(true).build());
                        }}, null, null)
                .addRequiredField("apiVersion")
                .addRequiredField("kind")
                .addRequiredField("metadata")
                .addRequiredField("spec")
                .build());

        k8sSchemas.put("Service", K8sSchema.builder()
                .apiVersion("v1")
                .kind("Service")
                .addProperty("apiVersion", "string", true, null)
                .addProperty("kind", "string", true, null)
                .addProperty("metadata", "object", true, null,
                        new HashMap<String, K8sSchemaProperty>() {{
                            put("name", K8sSchemaProperty.builder().type("string").required(true).build());
                            put("namespace", K8sSchemaProperty.builder().type("string").required(false).build());
                            put("labels", K8sSchemaProperty.builder().type("object").required(false).build());
                        }}, null, null)
                .addProperty("spec", "object", true, null,
                        new HashMap<String, K8sSchemaProperty>() {{
                            put("selector", K8sSchemaProperty.builder().type("object").required(false).build());
                            put("ports", K8sSchemaProperty.builder().type("array").required(false)
                                    .items(K8sSchemaProperty.builder().type("object").properties(
                                            new HashMap<String, K8sSchemaProperty>() {{
                                                put("protocol", K8sSchemaProperty.builder().type("string").enumValues(List.of("TCP", "UDP", "SCTP")).build());
                                                put("port", K8sSchemaProperty.builder().type("integer").build());
                                                put("targetPort", K8sSchemaProperty.builder().type("integer").build());
                                            }}
                                    ).build()).build());
                            put("type", K8sSchemaProperty.builder().type("string").enumValues(List.of("ClusterIP", "NodePort", "LoadBalancer", "ExternalName")).build());
                        }}, null, null)
                .addRequiredField("apiVersion")
                .addRequiredField("kind")
                .addRequiredField("metadata")
                .addRequiredField("spec")
                .build());

        k8sSchemas.put("Pod", K8sSchema.builder()
                .apiVersion("v1")
                .kind("Pod")
                .addProperty("apiVersion", "string", true, null)
                .addProperty("kind", "string", true, null)
                .addProperty("metadata", "object", true, null,
                        new HashMap<String, K8sSchemaProperty>() {{
                            put("name", K8sSchemaProperty.builder().type("string").required(true).build());
                            put("namespace", K8sSchemaProperty.builder().type("string").required(false).build());
                            put("labels", K8sSchemaProperty.builder().type("object").required(false).build());
                        }}, null, null)
                .addProperty("spec", "object", true, null,
                        new HashMap<String, K8sSchemaProperty>() {{
                            put("containers", K8sSchemaProperty.builder().type("array").required(true)
                                    .items(K8sSchemaProperty.builder().type("object").properties(
                                            new HashMap<String, K8sSchemaProperty>() {{
                                                put("name", K8sSchemaProperty.builder().type("string").required(true).build());
                                                put("image", K8sSchemaProperty.builder().type("string").required(true).build());
                                                put("ports", K8sSchemaProperty.builder().type("array").required(false)
                                                        .items(K8sSchemaProperty.builder().type("object").properties(
                                                                new HashMap<String, K8sSchemaProperty>() {{
                                                                    put("containerPort", K8sSchemaProperty.builder().type("integer").build());
                                                                }}
                                                        ).build()).build());
                                            }}
                                    ).build()).build());
                            put("restartPolicy", K8sSchemaProperty.builder().type("string").enumValues(List.of("Always", "OnFailure", "Never")).build());
                        }}, null, null)
                .addRequiredField("apiVersion")
                .addRequiredField("kind")
                .addRequiredField("metadata")
                .addRequiredField("spec")
                .build());
    }

    public YamlValidationResponseDTO validateYaml(String yamlContent) {
        YamlValidationResponseDTO response = new YamlValidationResponseDTO();
        response.setValid(true);
        response.setErrors(new ArrayList<>());
        response.setWarnings(new ArrayList<>());

        // 1. Basic YAML syntax validation
        Yaml yaml = new Yaml();
        Object parsedYaml = null;
        try {
            parsedYaml = yaml.load(yamlContent);
        } catch (YAMLException e) {
            response.setValid(false);
            response.getErrors().add(createErrorFromYamlException(e));
            return response;
        }

        if (parsedYaml == null) {
            response.setValid(false);
            response.getErrors().add(createError("YAML content is empty or invalid.", 1, 1));
            return response;
        }

        // If multiple documents are present, validate each
        if (parsedYaml instanceof Iterable) {
            for (Object doc : (Iterable) parsedYaml) {
                validateSingleDocument(doc, response);
            }
        } else {
            validateSingleDocument(parsedYaml, response);
        }

        return response;
    }

    private void validateSingleDocument(Object doc, YamlValidationResponseDTO response) {
        if (!(doc instanceof Map)) {
            response.setValid(false);
            response.getErrors().add(createError("YAML document must be a map.", 1, 1)); // Line/col might be inaccurate here
            return;
        }

        Map<String, Object> yamlMap = (Map<String, Object>) doc;

        // 2. K8s Schema validation
        String kind = (String) yamlMap.get("kind");
        if (kind == null) {
            response.setValid(false);
            response.getErrors().add(createError("Missing required field 'kind'.", 1, 1)); // Line/col might be inaccurate
            return;
        }

        K8sSchema schema = k8sSchemas.get(kind);
        if (schema == null) {
            response.getWarnings().add(createWarning("Unknown Kubernetes kind: '" + kind + "'. Schema validation skipped.", 1, 1)); // Line/col might be inaccurate
            return;
        }

        validateProperties(yamlMap, schema.getProperties(), response, "");
    }

    private void validateProperties(Map<String, Object> currentYamlMap, Map<String, K8sSchemaProperty> schemaProperties,
                                    YamlValidationResponseDTO response, String currentPath) {
        if (schemaProperties == null || schemaProperties.isEmpty()) {
            return;
        }

        for (Map.Entry<String, K8sSchemaProperty> entry : schemaProperties.entrySet()) {
            String propertyName = entry.getKey();
            K8sSchemaProperty schemaProperty = entry.getValue();
            String propertyPath = currentPath.isEmpty() ? propertyName : currentPath + "." + propertyName;

            Object value = currentYamlMap.get(propertyName);

            if (schemaProperty.isRequired() && value == null) {
                response.setValid(false);
                response.getErrors().add(createError("Missing required field: '" + propertyPath + "'.", 1, 1));
                continue;
            }

            if (value != null) {
                boolean typeMismatch = false;
                switch (schemaProperty.getType()) {
                    case "string":
                        if (!(value instanceof String)) typeMismatch = true;
                        break;
                    case "integer":
                        if (!(value instanceof Integer || value instanceof Long)) typeMismatch = true;
                        break;
                    case "boolean":
                        if (!(value instanceof Boolean)) typeMismatch = true;
                        break;
                    case "object":
                        if (!(value instanceof Map)) typeMismatch = true;
                        break;
                    case "array":
                        if (!(value instanceof List)) typeMismatch = true;
                        break;
                }

                if (typeMismatch) {
                    response.setValid(false);
                    response.getErrors().add(createError("Type mismatch for field '" + propertyPath + "'. Expected '" + schemaProperty.getType() + "'.", 1, 1));
                }

                if ("object".equals(schemaProperty.getType()) && value instanceof Map && schemaProperty.getProperties() != null) {
                    validateProperties((Map<String, Object>) value, schemaProperty.getProperties(), response, propertyPath);
                }

                if ("array".equals(schemaProperty.getType()) && value instanceof List && schemaProperty.getItems() != null) {
                    List<Object> items = (List<Object>) value;
                    for (int i = 0; i < items.size(); i++) {
                        Object item = items.get(i);
                        if ("object".equals(schemaProperty.getItems().getType()) && item instanceof Map) {
                            validateProperties((Map<String, Object>) item, schemaProperty.getItems().getProperties(), response, propertyPath + "[" + i + "]");
                        } else if (!checkSimpleType(item, schemaProperty.getItems().getType())) {
                            response.setValid(false);
                            response.getErrors().add(createError("Type mismatch for array item '" + propertyPath + "[" + i + "]'. Expected '" + schemaProperty.getItems().getType() + "'.", 1, 1));
                        }
                    }
                }

                if (schemaProperty.getEnumValues() != null && !schemaProperty.getEnumValues().isEmpty()) {
                    if (!schemaProperty.getEnumValues().contains(value.toString())) {
                        response.setValid(false);
                        response.getErrors().add(createError("Invalid value for field '" + propertyPath + "'. Expected one of " + schemaProperty.getEnumValues() + ".", 1, 1));
                    }
                }
            }
        }
    }

    private boolean checkSimpleType(Object value, String expectedType) {
        switch (expectedType) {
            case "string": return value instanceof String;
            case "integer": return value instanceof Integer || value instanceof Long;
            case "boolean": return value instanceof Boolean;
            default: return false;
        }
    }

    public Map<String, K8sSchema> getSchemas() {
        return k8sSchemas;
    }

    private ValidationError createError(String message, int line, int column) {
        ValidationError error = new ValidationError();
        error.setMessage(message);
        error.setLine(line);
        error.setColumn(column);
        return error;
    }

    private ValidationWarning createWarning(String message, int line, int column) {
        ValidationWarning warning = new ValidationWarning();
        warning.setMessage(message);
        warning.setLine(line);
        warning.setColumn(column);
        return warning;
    }

    private ValidationError createErrorFromYamlException(YAMLException e) {
        int line = 1;
        int column = 1;
        if (e.getProblemMark() != null) {
            Mark mark = e.getProblemMark();
            line = mark.getLine() + 1; // SnakeYAML is 0-indexed
            column = mark.getColumn() + 1; // SnakeYAML is 0-indexed
        }
        return createError(e.getMessage(), line, column);
    }
}
