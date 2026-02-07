package com.k8smanager.dto;

import java.util.List;

/**
 * DTO for secret transformation responses.
 */
public class SecretTransformResponseDTO {

    /**
     * Indicates if the transformation was successful.
     */
    private boolean success;

    /**
     * A message providing details about the transformation result (e.g., success message, error description).
     */
    private String message;

    /**
     * The transformed YAML content, if the transformation was successful.
     */
    private String transformedYaml;

    /**
     * A list of errors encountered during the transformation, if any.
     */
    private List<TransformError> errors;

    /**
     * Default constructor.
     */
    public SecretTransformResponseDTO() {
    }

    /**
     * Constructor with all fields.
     * @param success True if the transformation was successful, false otherwise.
     * @param message A message providing details about the transformation result.
     * @param transformedYaml The transformed YAML content.
     * @param errors A list of errors encountered during the transformation.
     */
    public SecretTransformResponseDTO(boolean success, String message, String transformedYaml, List<TransformError> errors) {
        this.success = success;
        this.message = message;
        this.transformedYaml = transformedYaml;
        this.errors = errors;
    }

    /**
     * Gets the success status of the transformation.
     * @return True if successful, false otherwise.
     */
    public boolean isSuccess() {
        return success;
    }

    /**
     * Sets the success status of the transformation.
     * @param success True if successful, false otherwise.
     */
    public void setSuccess(boolean success) {
        this.success = success;
    }

    /**
     * Gets the message detailing the transformation result.
     * @return The message.
     */
    public String getMessage() {
        return message;
    }

    /**
     * Sets the message detailing the transformation result.
     * @param message The message.
     */
    public void setMessage(String message) {
        this.message = message;
    }

    /**
     * Gets the transformed YAML content.
     * @return The transformed YAML content.
     */
    public String getTransformedYaml() {
        return transformedYaml;
    }

    /**
     * Sets the transformed YAML content.
     * @param transformedYaml The transformed YAML content.
     */
    public void setTransformedYaml(String transformedYaml) {
        this.transformedYaml = transformedYaml;
    }

    /**
     * Gets the list of transformation errors.
     * @return The list of errors.
     */
    public List<TransformError> getErrors() {
        return errors;
    }

    /**
     * Sets the list of transformation errors.
     * @param errors The list of errors.
     */
    public void setErrors(List<TransformError> errors) {
        this.errors = errors;
    }

    /**
     * Represents an error that occurred during secret transformation.
     */
    public static class TransformError {
        /**
         * The key in the secret that caused the error.
         */
        private String key;
        /**
         * A descriptive message about the error.
         */
        private String message;
        /**
         * The specific field within the key that caused the error, if applicable.
         */
        private String field;

        /**
         * Default constructor.
         */
        public TransformError() {
        }

        /**
         * Constructor with all fields.
         * @param key The key in the secret that caused the error.
         * @param message A descriptive message about the error.
         * @param field The specific field within the key that caused the error.
         */
        public TransformError(String key, String message, String field) {
            this.key = key;
            this.message = message;
            this.field = field;
        }

        /**
         * Gets the key that caused the error.
         * @return The key.
         */
        public String getKey() {
            return key;
        }

        /**
         * Sets the key that caused the error.
         * @param key The key.
         */
        public void setKey(String key) {
            this.key = key;
        }

        /**
         * Gets the error message.
         * @return The error message.
         */
        public String getMessage() {
            return message;
        }

        /**
         * Sets the error message.
         * @param message The error message.
         */
        public void setMessage(String message) {
            this.message = message;
        }

        /**
         * Gets the field that caused the error.
         * @return The field.
         */
        public String getField() {
            return field;
        }

        /**
         * Sets the field that caused the error.
         * @param field The field.
         */
        public void setField(String field) {
            this.field = field;
        }
    }
}
