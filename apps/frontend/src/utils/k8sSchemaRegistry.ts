import { YamlDiagnostic } from './yamlValidation';

export interface K8sSchema {
  apiVersion: string;
  kind: string;
  properties: {
    [key: string]: {
      type: string;
      description?: string;
      required?: boolean;
      // Add more schema properties as needed for validation and autocompletion
      // e.g., items, properties for nested objects, enum for allowed values
    };
  };
  required?: string[]; // Top-level required fields
}

// A simplified registry for common Kubernetes kinds
const k8sSchemaRegistry: { [kind: string]: K8sSchema } = {
  Deployment: {
    apiVersion: 'apps/v1',
    kind: 'Deployment',
    properties: {
      apiVersion: { type: 'string', required: true, description: 'APIVersion defines the versioned schema of this representation of an object.' },
      kind: { type: 'string', required: true, description: 'Kind is a string value representing the REST resource this object represents.' },
      metadata: { type: 'object', required: true, description: 'Standard object metadata.' },
      spec: { type: 'object', required: true, description: 'Specification of the desired behavior of the Deployment.' },
      status: { type: 'object', description: 'Most recently observed status of the Deployment.' },
    },
    required: ['apiVersion', 'kind', 'metadata', 'spec'],
  },
  Service: {
    apiVersion: 'v1',
    kind: 'Service',
    properties: {
      apiVersion: { type: 'string', required: true },
      kind: { type: 'string', required: true },
      metadata: { type: 'object', required: true },
      spec: { type: 'object', required: true },
      status: { type: 'object' },
    },
    required: ['apiVersion', 'kind', 'metadata', 'spec'],
  },
  Pod: {
    apiVersion: 'v1',
    kind: 'Pod',
    properties: {
      apiVersion: { type: 'string', required: true },
      kind: { type: 'string', required: true },
      metadata: { type: 'object', required: true },
      spec: { type: 'object', required: true },
      status: { type: 'object' },
    },
    required: ['apiVersion', 'kind', 'metadata', 'spec'],
  },
  // Add more K8s schemas as needed
};

export function getK8sSchema(kind: string): K8sSchema | undefined {
  return k8sSchemaRegistry[kind];
}

export function validateAgainstK8sSchema(yamlDoc: any): YamlDiagnostic[] {
  const diagnostics: YamlDiagnostic[] = [];

  if (!yamlDoc || typeof yamlDoc !== 'object') {
    return diagnostics; // Cannot validate if not an object
  }

  const kind = yamlDoc.kind;
  const schema = getK8sSchema(kind);

  if (!schema) {
    diagnostics.push({
      message: `Unknown Kubernetes kind: "${kind}". Schema validation skipped.`,
      severity: 'warning',
      range: {
        startLineNumber: 1, // Placeholder, ideally find line of 'kind'
        startColumn: 1,
        endLineNumber: 1,
        endColumn: 1,
      },
    });
    return diagnostics;
  }

  // Validate top-level required fields
  schema.required?.forEach(requiredField => {
    if (!(requiredField in yamlDoc)) {
      diagnostics.push({
        message: `Missing required field: "${requiredField}" for kind "${kind}".`,
        severity: 'error',
        range: {
          startLineNumber: 1, // Placeholder
          startColumn: 1,
          endLineNumber: 1,
          endColumn: 1,
        },
      });
    }
  });

  // Validate properties based on schema
  for (const key in schema.properties) {
    const propSchema = schema.properties[key];
    if (propSchema.required && !(key in yamlDoc)) {
      diagnostics.push({
        message: `Missing required property: "${key}" in "${kind}".`,
        severity: 'error',
        range: {
          startLineNumber: 1, // Placeholder
          startColumn: 1,
          endLineNumber: 1,
          endColumn: 1,
        },
      });
    }
    // Add more complex validation logic here (e.g., type checking, nested object validation)
  }

  return diagnostics;
}

// Placeholder for getting completion suggestions based on schema and current path
export function getK8sCompletionSuggestions(yamlDoc: any, path: string[]): any[] {
  // This function will be more complex, traversing the schema based on the YAML path
  console.log('Getting K8s completion suggestions for:', yamlDoc, path);
  return [];
}
