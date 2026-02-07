package com.k8smanager.dto;

import java.util.List;

/**
 * DTO for secret transformation requests.
 */
public class SecretTransformRequestDTO {

    /**
     * The YAML content of the secret.
     */
    private String yaml;
    /**
     * The action to perform (ENCODE or DECODE).
     */
    private Action action;
    /**
     * Optional list of keys to transform. If null, all keys are transformed.
     */
    private List<String> keys;

    /**
     * Default constructor.
     */
    public SecretTransformRequestDTO() {
    }

    /**
     * Constructor with all fields.
     * @param yaml The YAML content of the secret.
     * @param action The action to perform.
     * @param keys Optional list of keys to transform.
     */
    public SecretTransformRequestDTO(String yaml, Action action, List<String> keys) {
        this.yaml = yaml;
        this.action = action;
        this.keys = keys;
    }

    /**
     * Gets the YAML content.
     * @return The YAML content.
     */
    public String getYaml() {
        return yaml;
    }

    /**
     * Sets the YAML content.
     * @param yaml The YAML content.
     */
    public void setYaml(String yaml) {
        this.yaml = yaml;
    }

    /**
     * Gets the action to perform.
     * @return The action.
     */
    public Action getAction() {
        return action;
    }

    /**
     * Sets the action to perform.
     * @param action The action.
     */
    public void setAction(Action action) {
        this.action = action;
    }

    /**
     * Gets the list of keys to transform.
     * @return The list of keys.
     */
    public List<String> getKeys() {
        return keys;
    }

    /**
     * Sets the list of keys to transform.
     * @param keys The list of keys.
     */
    public void setKeys(List<String> keys) {
        this.keys = keys;
    }

    /**
     * Enum for secret transformation actions.
     */
    public enum Action {
        ENCODE,
        DECODE
    }
}
