package com.k8smanager.dto;

import lombok.Builder;
import lombok.Data;

import java.util.List;
import java.util.Map;

@Data
@Builder
public class K8sSchemaProperty {
    private String type;
    private String description;
    private boolean required;
    private Map<String, K8sSchemaProperty> properties;
    private List<String> enumValues;
    private K8sSchemaProperty items;
}
