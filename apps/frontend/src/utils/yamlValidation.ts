import * as yaml from 'yaml';

export interface YamlDiagnostic {
  message: string;
  severity: 'error' | 'warning' | 'info';
  range: {
    startLineNumber: number;
    startColumn: number;
    endLineNumber: number;
    endColumn: number;
  };
}

export function parseYaml(yamlString: string): { doc: any | null; diagnostics: YamlDiagnostic[] } {
  const diagnostics: YamlDiagnostic[] = [];
  let doc: any | null = null;

  try {
    doc = yaml.parse(yamlString);
    if (doc && doc.errors && doc.errors.length > 0) {
      doc.errors.forEach((error: yaml.YAMLError) => {
        diagnostics.push({
          message: error.message,
          severity: error.name.includes('YAMLParseError') ? 'error' : 'warning',
          range: {
            startLineNumber: error.linePos?.[0]?.line || 1,
            startColumn: error.linePos?.[0]?.col || 1,
            endLineNumber: error.linePos?.[1]?.line || error.linePos?.[0]?.line || 1,
            endColumn: error.linePos?.[1]?.col || error.linePos?.[0]?.col || 1,
          },
        });
      });
    }
  } catch (e: any) {
    diagnostics.push({
      message: e.message,
      severity: 'error',
      range: {
        startLineNumber: 1,
        startColumn: 1,
        endLineNumber: 1,
        endColumn: 1,
      },
    });
  }

  return { doc, diagnostics };
}

// This function can be extended for more sophisticated structural validation
export function validateYamlStructure(doc: any): YamlDiagnostic[] {
  const diagnostics: YamlDiagnostic[] = [];
  // Example: Check if the document is an array of objects or a single object
  if (doc !== null && typeof doc === 'object' && !Array.isArray(doc)) {
    // Further checks can be added here, e.g., for required top-level keys
  } else if (Array.isArray(doc)) {
    // Handle multiple YAML documents or an array at the root
  } else if (doc !== null) {
    diagnostics.push({
      message: 'YAML document must be an object or an array of objects.',
      severity: 'error',
      range: {
        startLineNumber: 1,
        startColumn: 1,
        endLineNumber: 1,
        endColumn: 1,
      },
    });
  }
  return diagnostics;
}

// Placeholder for future completion suggestions logic
export function getCompletionSuggestions(yamlString: string, position: { lineNumber: number; column: number }): any[] {
  // This will eventually interact with the K8s schema registry
  console.log('Getting completion suggestions for:', yamlString, position);
  return [];
}
