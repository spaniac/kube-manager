import axios from 'axios';

export interface YamlValidationRequest {
  yaml: string;
}

export interface YamlDiagnostic {
  message: string;
  line: number;
  column: number;
}

export interface YamlValidationResponse {
  valid: boolean;
  errors: YamlDiagnostic[];
  warnings: YamlDiagnostic[];
}

export interface K8sSchemaProperty {
  type: string;
  description?: string;
  required?: boolean;
}

export interface K8sSchema {
  apiVersion: string;
  kind: string;
  properties: {
    [key: string]: K8sSchemaProperty;
  };
  required?: string[];
}

const API_BASE_URL = '/api/v1/yaml';

export const validateYaml = async (yamlContent: string): Promise<YamlValidationResponse> => {
  try {
    const response = await axios.post<YamlValidationResponse>(`${API_BASE_URL}/validate`, { yaml: yamlContent });
    return response.data;
  } catch (error) {
    console.error('Error validating YAML:', error);
    // Return a default error response to prevent crashing the UI
    return {
      valid: false,
      errors: [{ message: 'Failed to connect to validation service.', line: 1, column: 1 }],
      warnings: [],
    };
  }
};

export const getK8sSchemas = async (): Promise<K8sSchema[]> => {
  try {
    const response = await axios.get<K8sSchema[]>(`${API_BASE_URL}/schemas`);
    return response.data;
  } catch (error) {
    console.error('Error fetching K8s schemas:', error);
    return [];
  }
};
