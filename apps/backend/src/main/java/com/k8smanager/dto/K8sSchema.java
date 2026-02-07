package com.k8smanager.dto;

import lombok.Builder;
import lombok.Data;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Data
@Builder
public class K8sSchema {
    private String apiVersion;
    private String kind;
    private Map<String, K8sSchemaProperty> properties;
    private List<String> required;

    public static class K8sSchemaBuilder {
        private Map<String, K8sSchemaProperty> properties = new HashMap<>();
        private List<String> required = new ArrayList<>();

        public K8sSchemaBuilder addProperty(String name, String type, Boolean required, String description,
                                            Map<String, K8sSchemaProperty> nestedProperties, List<String> enumValues,
                                            K8sSchemaProperty items) {
            properties.put(name, K8sSchemaProperty.builder()
                    .type(type)
                    .required(required != null ? required : false)
                    .description(description)
                    .properties(nestedProperties)
                    .enumValues(enumValues)
                    .items(items)
                    .build());
            return this;
        }

        public K8sSchemaBuilder addProperty(String name, String type, Boolean required, String description) {
            return addProperty(name, type, required, description, null, null, null);
        }

        public K8sSchemaBuilder addRequiredField(String fieldName) {
            if (!this.required.contains(fieldName)) {
                this.required.add(fieldName);
            }
            return this;
        }
    }
}
