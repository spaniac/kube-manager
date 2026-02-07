/**
 * YamlEditor Component
 *
 * A comprehensive YAML editor for Kubernetes resources with Monaco Editor integration.
 *
 * Features:
 * - Syntax highlighting for YAML
 * - Line numbers with click-to-jump
 * - Real-time YAML syntax validation with error indicators
 * - Resource templates (Pod, Deployment, Service, ConfigMap, Secret)
 * - K8s schema validation (via backend dry-run API)
 * - Auto-completion for K8s fields and enum values
 * - YAML preview mode
 * - Diff view for changes
 * - Format/Beautify/Minify buttons
 * - Find and replace functionality
 * - Undo/redo support
 * - Keyboard shortcuts (Ctrl+S, Ctrl+F, etc.)
 */

import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
} from 'react';
import Editor, {
  Monaco,
  useMonaco,
} from '@monaco-editor/react';
import * as MonacoTypes from 'monaco-editor';
import {
  parseYaml,
  YamlDiagnostic as FrontendYamlDiagnostic,
} from '../utils/yamlValidation';
import { encodeBase64, decodeBase64, isBase64 } from '../utils/secretCodec';
import { SecretDataPanel } from './yaml/SecretDataPanel';
import { calculateDiff, DiffLine } from '../utils/yamlDiff';
import { formatYaml, minifyYaml } from '../utils/yamlFormat';
import {
  validateYaml as validateYamlApi,
  getK8sSchemas as getK8sSchemasApi,
  K8sSchema as BackendK8sSchema,
  YamlValidationResponse,
} from '../api/yaml';
import {
  YamlEditorProps,
  YamlValidationResult,
  ResourceTemplate,
  EditorMode,
  DiffData,
} from '../types/yaml';

interface K8sSecret {
  apiVersion: string;
  kind: 'Secret';
  metadata: {
    name: string;
    namespace?: string;
  };
  type?: string;
  data?: { [key: string]: string };
  stringData?: { [key: string]: string };
}

type K8sResource = K8sSecret | { kind: string; [key: string]: any };

import styles from './YamlEditor.module.css';
import { debounce } from 'lodash';
import apiClient from '../api/client'; // Import apiClient
import * as yaml from 'js-yaml'; // Import js-yaml

// Default YAML templates
const DEFAULT_TEMPLATES: ResourceTemplate[] = [
  {
    kind: 'Pod',
    name: 'Pod',
    template: `apiVersion: v1
kind: Pod
metadata:
  name: my-pod
  namespace: default
spec:
  containers:
  - name: main
    image: nginx:latest
    ports:
    - containerPort: 80
      protocol: TCP
  restartPolicy: Always`,
    description: 'Basic pod template with a single container',
  },
  {
    kind: 'Deployment',
    name: 'Deployment',
    template: `apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-deployment
  namespace: default
  labels:
    app: my-app
spec:
  replicas: 3
  selector:
    matchLabels:
      app: my-app
  template:
    metadata:
      labels:
        app: my-app
    spec:
      containers:
      - name: main
        image: nginx:latest
        ports:
        - containerPort: 80
          protocol: TCP
        resources:
          requests:
            cpu: 100m
            memory: 128Mi
          limits:
            cpu: 200m
            memory: 256Mi
      restartPolicy: Always`,
    description: 'Deployment with 3 replicas and resource limits',
  },
  {
    kind: 'Service',
    name: 'Service',
    template: `apiVersion: v1
kind: Service
metadata:
  name: my-service
  namespace: default
spec:
  type: ClusterIP
  selector:
    app: my-app
  ports:
  - name: http
    port: 80
    targetPort: 80
    protocol: TCP`,
    description: 'ClusterIP service exposing an application',
  },
  {
    kind: 'ConfigMap',
    name: 'ConfigMap',
    template: `apiVersion: v1
kind: ConfigMap
metadata:
  name: my-config
  namespace: default
data:
  config.yaml: |
    key: value
    nested:
      item: data
  app.properties: |
    debug=true
    port=8080`,
    description: 'ConfigMap with configuration files',
  },
  {
    kind: 'Secret',
    name: 'Secret',
    template: `apiVersion: v1
kind: Secret
metadata:
  name: my-secret
  namespace: default
type: Opaque
stringData:
  username: admin
  password: secret123
  api-key: my-api-key`,
    description: 'Secret with sensitive data (encoded automatically)',
  },
];

/**
 * YamlEditor Component
 */
export const YamlEditor: React.FC<YamlEditorProps> = ({
  value,
  onChange,
  mode = 'edit',
  originalValue = '',
  selectedTemplate,
  onTemplateSelect,
  onValidate,
  onApply,
  onFileUpload,
  onDownload,
  namespace = 'default',
  // onNamespaceChange, // Future use
  // namespaces, // Future use
  options = {},
  // secretOptions, // Future use
  showLineNumbers = true,
  showValidationErrors = true,
  enableAutoComplete = true,
  readOnly = false,
  loading = false,
  // error, // Future use
  className = '',
  minHeight = '400px',
  maxHeight,
  height,
 }) => {
   const editorRef = useRef<MonacoTypes.editor.IStandaloneCodeEditor | null>(null);
   const monacoRef = useRef<Monaco | null>(null);
   const monaco = useMonaco();

   // Editor state
   const [editorMode, setEditorMode] = useState<EditorMode>(mode);
  const [validationResult, setValidationResult] = useState<YamlValidationResult>({
    valid: true,
    errors: [],
    warnings: [],
  });
  const [isValidating, setIsValidating] = useState(false);
  const [templates, setTemplates] = useState<ResourceTemplate[]>(DEFAULT_TEMPLATES);
   const [isLoadingTemplates, setIsLoadingTemplates] = useState(false);

  // Secret specific states
  const [isSecretResource, setIsSecretResource] = useState(false);
  const [secretData, setSecretData] = useState<{ [key: string]: string } | null>(null);
  const [secretStringData, setSecretStringData] = useState<{ [key: string]: string } | null>(null);
  const [showSecretWarning, setShowSecretWarning] = useState(false);
  const [isMasked, setIsMasked] = useState(true);

  // Effect to parse YAML and detect Secret kind
  useEffect(() => {
    const { doc } = parseYaml(value);
    if (doc && typeof doc === 'object' && doc !== null) {
      const resource = doc as K8sResource;

      if (resource.kind === 'Secret' && resource.apiVersion === 'v1') {
        setIsSecretResource(true);
        setSecretData(resource.data || null);
        setSecretStringData(resource.stringData || null);

        // Check for unencoded stringData
        const hasUnencodedStringData = Object.values(resource.stringData || {}).some(
          (val) => !isBase64(val as string)
        );
        setShowSecretWarning(hasUnencodedStringData);
      } else {
        setIsSecretResource(false);
        setSecretData(null);
        setSecretStringData(null);
        setShowSecretWarning(false);
      }
    } else {
      setIsSecretResource(false);
      setSecretData(null);
      setSecretStringData(null);
      setShowSecretWarning(false);
    }
  }, [value]);

  // Find and replace state
  const [showFindReplace, setShowFindReplace] = useState(false);
  const [findText, setFindText] = useState('');
  const [replaceText, setReplaceText] = useState('');
  const [findOptions, setFindOptions] = useState({
    caseSensitive: false,
    wholeWord: false,
    regex: false,
  });

  // Line jump state
  const [showLineJump, setShowLineJump] = useState(false);
  const [targetLine, setTargetLine] = useState('');

  // Editor history
  const [history, setHistory] = useState<string[]>([value]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // Diff view data
  const [diffData, setDiffData] = useState<DiffLine[] | null>(null);

  // File upload
  const fileInputRef = useRef<HTMLInputElement>(null);

  /**
   * Fetch resource templates from API
   */
  useEffect(() => {
    const fetchTemplates = async () => {
      setIsLoadingTemplates(true);
      try {
        const response = await apiClient.get<{ templates: ResourceTemplate[] }>(
          '/api/v1/yaml/templates',
        );
        if (response.data?.templates) {
          setTemplates(response.data.templates);
        }
      } catch (err) {
          console.warn('Failed to fetch templates, using defaults:', err);
      } finally {
        setIsLoadingTemplates(false);
      }
    };

    fetchTemplates();
  }, []);

  /**
   * Update editor value from props
   */
  useEffect(() => {
    if (editorRef.current && value !== editorRef.current.getValue()) {
      const position = editorRef.current.getPosition();
      editorRef.current.setValue(value);
      if (position) {
        editorRef.current.setPosition(position);
      }
    }
  }, [value]);

  /**
   * Configure Monaco editor
   */
  useEffect(() => {
    if (!monaco) return; // Ensure monaco is loaded

    monacoRef.current = monaco; // Store monaco instance

    // Fetch K8s schemas and configure Monaco YAML language
    const fetchAndConfigureSchemas = async () => {
      try {
        const k8sSchemas = await getK8sSchemasApi();
        const monacoSchemas = k8sSchemas.map((s) => ({
          uri: `http://schemas.k8s.io/${s.apiVersion}/${s.kind}.json`,
          fileMatch: [`*://schemas.k8s.io/${s.apiVersion}/${s.kind}.json`],
          schema: {
            type: 'object',
            properties: {
              apiVersion: { type: 'string', enum: [s.apiVersion] },
              kind: { type: 'string', enum: [s.kind] },
              ...Object.fromEntries(
                Object.entries(s.properties).map(([key, prop]) => [
                  key,
                  { type: prop.type, description: prop.description },
                ]),
              ),
            },
            required: s.required,
          },
        }));

        // monaco.languages.yaml.yamlDefaults.setDiagnosticsOptions({
        //   validate: true,
        //   schemas: monacoSchemas,
        //   enableSchemaRequest: true,
        // });
      } catch (error) {
        console.error('Failed to fetch K8s schemas for Monaco:', error);
      }
    };

    fetchAndConfigureSchemas();

    // Register YAML language
    monaco.languages.register({ id: 'yaml' });

    // Configure YAML language features
    monaco.languages.setLanguageConfiguration('yaml', {
      comments: {
        lineComment: '#',
      },
      brackets: [
        ['[', ']'],
        ['{', '}'],
        ['(', ')'],
      ],
      autoClosingPairs: [
        { open: '[', close: ']' },
        { open: '{', close: '}' },
        { open: '(', close: ')' },
        { open: '"', close: '"', notIn: ['string'] },
        { open: "'", close: "'", notIn: ['string'] },
      ],
      surroundingPairs: [
        { open: '[', close: ']' },
        { open: '{', close: '}' },
        { open: '(', close: ')' },
        { open: '"', close: '"' },
        { open: "'", close: "'" },
      ],
    });

    // Set up auto-completion provider if enabled
    if (enableAutoComplete) {
      // monaco.languages.registerCompletionItemProvider('yaml', {
      //   provideCompletionItems: async (model, position) => {
      //     const suggestions = await getCompletionSuggestions(model, position);
      //     return { suggestions };
      //   },
      // });
    }
  }, [monaco, enableAutoComplete]);

  // Debounced validation effect
  const debouncedValidate = useCallback(
    debounce(async (content: string) => {
      if (!monacoRef.current || !editorRef.current) return;

      setIsValidating(true);
      const editorModel = editorRef.current.getModel();
      if (!editorModel) return;

      const diagnostics: FrontendYamlDiagnostic[] = [];

      // Frontend YAML syntax validation
      const { doc, diagnostics: syntaxDiagnostics } = parseYaml(content);
      diagnostics.push(...syntaxDiagnostics);

      // Backend K8s schema validation
      try {
        const backendValidationResult = await validateYamlApi(content);
        if (!backendValidationResult.valid) {
          backendValidationResult.errors.forEach((err) => {
            diagnostics.push({
              message: err.message,
              severity: 'error',
              range: {
                startLineNumber: err.line,
                startColumn: err.column,
                endLineNumber: err.line,
                endColumn: err.column + 1, // Placeholder, ideally get actual range
              },
            });
          });
        }
        backendValidationResult.warnings.forEach((warn) => {
          diagnostics.push({
            message: warn.message,
            severity: 'warning',
            range: {
              startLineNumber: warn.line,
              startColumn: warn.column,
              endLineNumber: warn.line,
              endColumn: warn.column + 1, // Placeholder
            },
          });
        });
      } catch (error) {
        console.error('Backend validation failed:', error);
        diagnostics.push({
          message: 'Failed to connect to backend validation service.',
          severity: 'error',
          range: { startLineNumber: 1, startColumn: 1, endLineNumber: 1, endColumn: 1 },
        });
      }

      // Set Monaco diagnostics
      monacoRef.current.editor.setModelMarkers(editorModel, 'yaml-validation', diagnostics.map(d => ({
        startLineNumber: d.range.startLineNumber,
        startColumn: d.range.startColumn,
        endLineNumber: d.range.endLineNumber,
        endColumn: d.range.endColumn,
        message: d.message,
        severity: d.severity === 'error' ? monacoRef.current.MarkerSeverity.Error : monacoRef.current.MarkerSeverity.Warning,
      })));

      // Update local validation result state
      setValidationResult({
        valid: !diagnostics.some(d => d.severity === 'error'),
        errors: diagnostics.filter(d => d.severity === 'error').map(d => ({ message: d.message, line: d.range.startLineNumber, column: d.range.startColumn })),
        warnings: diagnostics.filter(d => d.severity === 'warning').map(d => ({ message: d.message, line: d.range.startLineNumber, column: d.range.startColumn })),
      });

      setIsValidating(false);
    }, 500),
    [],
  );

  useEffect(() => {
    if (value) {
      debouncedValidate(value);
    }
  }, [value, debouncedValidate]);


  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const content = await file.text();
        if (onChange) {
          onChange(content);
        }
        if (onFileUpload) {
          onFileUpload(file);
        }
      } catch (err) {
        console.error('Failed to read file:', err);
      }
    }
  };

  const handleFileUploadClick = () => {
    fileInputRef.current?.click();
  };

  /**
   * Handle file download
   */
  const handleDownload = () => {
    const currentContent = editorRef.current?.getValue() || value;
    const blob = new Blob([currentContent], { type: 'text/yaml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'resource.yaml';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    if (onDownload) {
      onDownload();
    }
  };

  const handleSave = () => {
    if (showSecretWarning) {
      alert('Please encode all stringData values before saving.');
      return;
    }
    if (onApply) {
      onApply(editorRef.current?.getValue() || value);
      setHasUnsavedChanges(false);
    }
  };

  const handleJumpToLine = (lineNumber: number) => {
    if (editorRef.current) {
      editorRef.current.revealLineInCenter(lineNumber);
    }
  };

  const handleEditorDidMount = (editor: MonacoTypes.editor.IStandaloneCodeEditor, monaco: Monaco) => {
    editorRef.current = editor;
    monacoRef.current = monaco; // Store monaco instance

    // Register keyboard shortcuts
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, () => {
      handleSave();
    });
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyMod.Shift | monaco.KeyCode.KeyF, () => {
      handleFormat();
    });
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyZ, () => {
      handleUndo();
    });
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyMod.Shift | monaco.KeyCode.KeyZ, () => {
      handleRedo();
    });
  };

  const debouncedOnChange = useCallback(
    debounce((newValue: string) => {
      onChange?.(newValue);
      setHistory((prevHistory) => {
        const newHistory = prevHistory.slice(0, historyIndex + 1);
        if (newHistory[newHistory.length - 1] !== newValue) {
          newHistory.push(newValue);
        }
        return newHistory;
      });
      setHistoryIndex((prevIndex) => prevIndex + 1);
      setHasUnsavedChanges(true);
    }, 300),
    [onChange, historyIndex],
  );

  const handleEditorChange = (value: string | undefined) => {
    if (value !== undefined) {
      debouncedOnChange(value);
    }
  };

  const handleFormat = useCallback(() => {
    if (editorRef.current) {
      const formatted = formatYaml(editorRef.current.getValue());
      editorRef.current.setValue(formatted);
      onChange?.(formatted);
    }
  }, [onChange]);

  const handleBeautify = useCallback(() => {
    // For YAML, format and beautify are often the same.
    // If there's a specific beautify logic, it would go here.
    handleFormat();
  }, [handleFormat]);

  const handleMinify = useCallback(() => {
    if (editorRef.current) {
      const minified = minifyYaml(editorRef.current.getValue());
      editorRef.current.setValue(minified);
      onChange?.(minified);
    }
  }, [onChange]);

  const handleUndo = useCallback(() => {
    if (historyIndex > 0) {
      const prevIndex = historyIndex - 1;
      setHistoryIndex(prevIndex);
      const prevValue = history[prevIndex];
      if (editorRef.current) {
        editorRef.current.setValue(prevValue);
      }
      onChange?.(prevValue);
    }
  }, [history, historyIndex, onChange]);

  const handleRedo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      const nextIndex = historyIndex + 1;
      setHistoryIndex(nextIndex);
      const nextValue = history[nextIndex];
      if (editorRef.current) {
        editorRef.current.setValue(nextValue);
      }
      onChange?.(nextValue);
    }
  }, [history, historyIndex, onChange]);

  const handleEncodeAll = useCallback(() => {
    if (!isSecretResource || !editorRef.current) return;

    const { doc } = parseYaml(editorRef.current.getValue());
    if (doc && typeof doc === 'object' && doc !== null && doc.kind === 'Secret') {
      const secret = doc as K8sSecret;
      if (secret.stringData) {
        const encodedStringData: { [key: string]: string } = {};
        for (const key in secret.stringData) {
          encodedStringData[key] = encodeBase64(secret.stringData[key]);
        }
        secret.data = { ...secret.data, ...encodedStringData };
        delete secret.stringData;
        const newYaml = formatYaml(yaml.dump(secret)); // Convert back to YAML
        editorRef.current.setValue(newYaml);
        onChange?.(newYaml);
      }
    }
  }, [isSecretResource, onChange]);

  const handleDecodeAll = useCallback(() => {
    if (!isSecretResource || !editorRef.current) return;

    const { doc } = parseYaml(editorRef.current.getValue());
    if (doc && typeof doc === 'object' && doc !== null && doc.kind === 'Secret') {
      const secret = doc as K8sSecret;
      if (secret.data) {
        const decodedStringData: { [key: string]: string } = {};
        for (const key in secret.data) {
          if (isBase64(secret.data[key])) {
            decodedStringData[key] = decodeBase64(secret.data[key]);
          } else {
            decodedStringData[key] = secret.data[key]; // Keep as is if not base64
          }
        }
        secret.stringData = { ...secret.stringData, ...decodedStringData };
        delete secret.data;
        const newYaml = formatYaml(yaml.dump(secret)); // Convert back to YAML
        editorRef.current.setValue(newYaml);
        onChange?.(newYaml);
      }
    }
  }, [isSecretResource, onChange]);

  const handleDryRun = useCallback(async () => {
    if (!editorRef.current) return;
    const content = editorRef.current.getValue();
    setIsValidating(true);
    try {
      let finalValidationResult: YamlValidationResult;
      if (onValidate) {
        // Delegate validation to the prop and use its result
        finalValidationResult = await onValidate(content);
      } else {
        // Perform internal validation if no prop is provided
        finalValidationResult = await validateYamlApi(content);
      }

      // Update validation state based on the final validation result
      setValidationResult({
        valid: finalValidationResult.valid,
        errors: finalValidationResult.errors.map(e => ({ message: e.message, line: e.line, column: e.column })),
        warnings: finalValidationResult.warnings.map(w => ({ message: w.message, line: w.line, column: w.column })),
      });
    } catch (error) {
      console.error('Dry run failed:', error);
      setValidationResult({
        valid: false,
        errors: [{ message: 'Dry run failed: ' + (error as Error).message, line: 1, column: 1 }],
        warnings: [],
      });
    } finally {
      setIsValidating(false);
    }
  }, [onValidate]);

  /**
   * Load template into editor
   */
  const handleLoadTemplate = useCallback((template: ResourceTemplate) => {
    if (editorRef.current) {
      editorRef.current.setValue(template.template);
    }
  }, []);

  /**
   * Toggle editor mode
   */
  const toggleMode = (newMode: EditorMode) => {
    setEditorMode(newMode);
    if (newMode === 'diff' && originalValue) {
      const diffResult = calculateDiff(originalValue, value);
      setDiffData(diffResult);
    } else {
      setDiffData(null);
    }
  };

  /**
   * Build editor options
   */
  const editorOptions: MonacoTypes.editor.IStandaloneEditorConstructionOptions = {
    readOnly: readOnly,
    minimap: { enabled: options.minimap?.enabled ?? false },
    fontSize: options.fontSize ?? 14,
    lineHeight: options.lineHeight ?? 20,
    fontFamily: options.fontFamily ?? "'Fira Code', 'Fira Mono', 'Consolas', monospace",
    lineNumbers: showLineNumbers ? 'on' : 'off',
    renderLineHighlight: options.renderLineHighlight ?? 'all',
    scrollBeyondLastLine: options.scrollBeyondLastLine ?? false,
    automaticLayout: options.automaticLayout ?? true,
    wordWrap: options.wordWrap ?? 'off',
    folding: options.folding ?? true,
    foldingStrategy: options.foldingStrategy ?? 'indentation',
    showFoldingControls: options.showFoldingControls ?? 'mouseover',
    matchBrackets: options.matchBrackets ?? 'always',
    autoClosingBrackets: options.autoClosingBrackets ?? 'always',
    autoClosingQuotes: options.autoClosingQuotes ?? 'always',
    formatOnPaste: options.formatOnPaste ?? true,
    formatOnType: options.formatOnType ?? false,
    tabSize: options.tabSize ?? 2,
    insertSpaces: options.insertSpaces ?? true,
    detectIndentation: options.detectIndentation ?? true,
    trimAutoWhitespace: options.trimAutoWhitespace ?? true,
  };

  /**
   * Get editor height
   */
  const editorHeight = height || minHeight;

  /**
   * Render validation status
   */
  const renderValidationStatus = () => {
    if (isValidating) {
      return (
        <span className={`${styles.status} ${styles.statusValidating}`}>
          <span className={styles.statusSpinner} />
          Validating...
        </span>
      );
    }

    if (!validationResult.valid) {
      return (
        <span className={`${styles.status} ${styles.statusError}`}>
          {validationResult.errors.length} error{validationResult.errors.length !== 1 ? 's' : ''}
        </span>
      );
    }

    if (validationResult.warnings.length > 0) {
      return (
        <span className={`${styles.status} ${styles.statusWarning}`}>
          {validationResult.warnings.length} warning{validationResult.warnings.length !== 1 ? 's' : ''}
        </span>
      );
    }

    return (
      <span className={`${styles.status} ${styles.statusSuccess}`}>
        Valid YAML
      </span>
    );
  };

  return (
    <div
      className={`${styles.yamlEditor} ${className} ${styles[editorMode]}`}
      style={{ height: maxHeight || editorHeight, minHeight }}
    >
      {/* Toolbar */}
      <div className={styles.toolbar}>
        {/* Template selector */}
        <div className={styles.toolbarGroup}>
          <select
            className={styles.templateSelect}
            value={selectedTemplate || ''}
            onChange={(e) => onTemplateSelect?.(e.target.value)}
            disabled={isLoadingTemplates || readOnly}
          >
            <option value="">Select Template...</option>
            {templates.map((template) => (
              <option key={template.kind} value={template.kind}>
                {template.kind} {template.description ? `- ${template.description}` : ''}
              </option>
            ))}
          </select>
        </div>

        {isSecretResource && (
          <div className={styles.toolbarGroup}>
            <button
              className={styles.toolbarButton}
              onClick={handleEncodeAll}
              disabled={readOnly}
              title="Encode all stringData values to Base64"
              type="button"
            >
              Encode All
            </button>
            <button
              className={styles.toolbarButton}
              onClick={handleDecodeAll}
              disabled={readOnly}
              title="Decode all data values to plain text"
              type="button"
            >
              Decode All
            </button>
            <button
              className={styles.toolbarButton}
              onClick={() => setIsMasked(!isMasked)}
              title={isMasked ? "Show Secret values" : "Hide Secret values"}
              type="button"
            >
              {isMasked ? "Show Values" : "Hide Values"}
            </button>
          </div>
        )}

        {/* Mode toggle */}
        <div className={styles.toolbarGroup}>
          <button
            className={`${styles.toolbarButton} ${editorMode === 'edit' ? styles.active : ''}`}
            onClick={() => toggleMode('edit')}
            disabled={readOnly}
            title="Edit mode"
            type="button"
          >
            Edit
          </button>
          <button
            className={`${styles.toolbarButton} ${editorMode === 'preview' ? styles.active : ''}`}
            onClick={() => toggleMode('preview')}
            disabled={readOnly}
            title="Preview mode"
            type="button"
          >
            Preview
          </button>
          {originalValue && (
            <button
              className={`${styles.toolbarButton} ${editorMode === 'diff' ? styles.active : ''}`}
              onClick={() => toggleMode('diff')}
              disabled={readOnly}
              title="Diff mode"
              type="button"
            >
              Diff ({diffData ? diffData.filter(line => line.type !== 'unchanged').length : 0})
            </button>
          )}
        </div>

        {/* Format controls */}
        <div className={styles.toolbarGroup}>
          <button
            className={styles.toolbarButton}
            onClick={handleFormat}
            disabled={readOnly}
            title="Format (Ctrl+Shift+F)"
            type="button"
          >
            Format
          </button>
          <button
            className={styles.toolbarButton}
            onClick={handleBeautify}
            disabled={readOnly}
            title="Beautify"
            type="button"
          >
            Beautify
          </button>
          <button
            className={styles.toolbarButton}
            onClick={handleMinify}
            disabled={readOnly}
            title="Minify"
            type="button"
          >
            Minify
          </button>
        </div>

        {/* Find and replace */}
        <div className={styles.toolbarGroup}>
          <button
            className={styles.toolbarButton}
            onClick={() => setShowFindReplace(!showFindReplace)}
            title="Find (Ctrl+F)"
            type="button"
          >
            Find
          </button>
        </div>

        {/* History controls */}
        <div className={styles.toolbarGroup}>
          <button
            className={styles.toolbarButton}
            onClick={handleUndo}
            disabled={historyIndex <= 0}
            title="Undo (Ctrl+Z)"
            type="button"
          >
            ↶
          </button>
          <button
            className={styles.toolbarButton}
            onClick={handleRedo}
            disabled={historyIndex >= history.length - 1}
            title="Redo (Ctrl+Y)"
            type="button"
          >
            ↷
          </button>
        </div>

        {/* File operations */}
        <div className={styles.toolbarGroup}>
          <button
            className={styles.toolbarButton}
            onClick={handleFileUploadClick}
            disabled={readOnly}
            title="Upload YAML file"
            type="button"
          >
            Upload
          </button>
          <button
            className={styles.toolbarButton}
            onClick={handleDownload}
            title="Download YAML file"
            type="button"
          >
            Download
          </button>
        </div>

        {/* Validation and apply */}
        <div className={styles.toolbarGroup}>
          {renderValidationStatus()}
          <button
            className={`${styles.toolbarButton} ${styles.toolbarButtonPrimary}`}
            onClick={handleDryRun}
            disabled={!validationResult.valid || isValidating || readOnly}
            title="Dry run"
            type="button"
          >
            Dry Run
          </button>
          <button
            className={`${styles.toolbarButton} ${styles.toolbarButtonPrimary}`}
            onClick={handleSave}
            disabled={!validationResult.valid || loading || readOnly}
            title="Save (Ctrl+S)"
            type="button"
          >
            Save {hasUnsavedChanges && '*'}
          </button>
        </div>
      </div>

      {/* Find and replace panel */}
      {showFindReplace && (
        <div className={styles.findReplacePanel}>
          <input
            type="text"
            className={styles.findInput}
            placeholder="Find..."
            value={findText}
            onChange={(e) => setFindText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                if (editorRef.current) {
                  editorRef.current.getAction('actions.find')?.run();
                }
              }
            }}
          />
          <input
            type="text"
            className={styles.replaceInput}
            placeholder="Replace with..."
            value={replaceText}
            onChange={(e) => setReplaceText(e.target.value)}
          />
          <label className={styles.findOption}>
            <input
              type="checkbox"
              checked={findOptions.caseSensitive}
              onChange={(e) => setFindOptions({ ...findOptions, caseSensitive: e.target.checked })}
            />
            Case sensitive
          </label>
          <label className={styles.findOption}>
            <input
              type="checkbox"
              checked={findOptions.wholeWord}
              onChange={(e) => setFindOptions({ ...findOptions, wholeWord: e.target.checked })}
            />
            Whole word
          </label>
          <button
            className={styles.findCloseButton}
            onClick={() => setShowFindReplace(false)}
            type="button"
          >
            ✕
          </button>
        </div>
      )}

      {/* Line jump dialog */}
      {showLineJump && (
        <div className={styles.lineJumpDialog}>
          <span className={styles.lineJumpLabel}>Go to line:</span>
          <input
            type="number"
            className={styles.lineJumpInput}
            value={targetLine}
            onChange={(e) => setTargetLine(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                const line = parseInt(targetLine || '0', 10);
                if (!isNaN(line) && line > 0) {
                  handleJumpToLine(line);
                }
              } else if (e.key === 'Escape') {
                setShowLineJump(false);
                setTargetLine('');
              }
            }}
          />
          <button
            className={styles.lineJumpCloseButton}
            onClick={() => {
              setShowLineJump(false);
              setTargetLine('');
            }}
            type="button"
          >
            ✕
          </button>
        </div>
      )}

      {/* Editor container */}
      <div className={styles.editorContainer} style={{ height: 'calc(100% - 50px)' }}>
        {isSecretResource && (secretData || secretStringData) ? (
          <SecretDataPanel
            data={secretData || secretStringData || {}}
            encoded={!!secretData}
          />
        ) : editorMode === 'edit' ? (
          <Editor
            height="100%"
            defaultLanguage="yaml"
            value={value}
            options={editorOptions}
            onMount={handleEditorDidMount}
            onChange={handleEditorChange}
            theme="vs-dark"
            loading={<div className={styles.loading}>Loading editor...</div>}
          />
        ) : editorMode === 'preview' ? (
          <div className={styles.previewMode}>
            <pre className={styles.previewContent}>{value}</pre>
          </div>
        ) : editorMode === 'diff' && diffData ? (
          <div className={styles.diffMode}>
            <div className={styles.diffPanel}>
              <div className={styles.diffHeader}>Diff View</div>
              <div className={styles.diffContent}>
                {diffData.map((line, i) => (
                  <div
                    key={`diff-line-${i}`}
                    className={`${styles.diffLine} ${styles[line.type]}`}
                  >
                    <span className={styles.diffLineNumber}>{line.lineNumber || ''}</span>
                    <span className={styles.diffLineContent}>{line.content || ' '}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : null}
      </div>

      {showSecretWarning && (
        <div className={styles.warningBanner}>
          Warning: Unencoded stringData values detected. Please encode them before saving.
        </div>
      )}

      {/* Validation Panel */}
      {showValidationErrors && (validationResult.errors.length > 0 || validationResult.warnings.length > 0) && (
        <div className={styles.validationPanel}>
          {validationResult.errors.length > 0 && (
            <div className={styles.validationGroup}>
              <h4 className={styles.validationGroupHeader}>Errors ({validationResult.errors.length})</h4>
              {validationResult.errors.map((error, index) => (
                <button
                  key={`error-${error.line}-${index}`} // Use a more stable key if available, e.g., error.id
                  className={styles.validationItem}
                  onClick={() => handleJumpToLine(error.line ?? 0)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      handleJumpToLine(error.line ?? 0);
                    }
                  }}
                  tabIndex={0}
                >
                  <span className={styles.validationSeverity}>Error</span>
                  <span className={styles.validationMessage}>{error.message}</span>
                  <span className={styles.validationLocation}>Line {error.line}, Col {error.column}</span>
                </button>
              ))}
            </div>
          )}
          {validationResult.warnings.length > 0 && (
            <div className={styles.validationGroup}>
              <h4 className={styles.validationGroupHeader}>Warnings ({validationResult.warnings.length})</h4>
              {validationResult.warnings.map((warning, index) => (
                <button
                  key={`warning-${warning.line}-${index}`} // Use a more stable key if available, e.g., warning.id
                  className={styles.validationItem}
                  onClick={() => handleJumpToLine(warning.line ?? 0)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      handleJumpToLine(warning.line ?? 0);
                    }
                  }}
                  tabIndex={0}
                >
                  <span className={styles.validationSeverity}>Warning</span>
                  <span className={styles.validationMessage}>{warning.message}</span>
                  <span className={styles.validationLocation}>Line {warning.line}, Col {warning.column}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".yaml,.yml"
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
    </div>
  );
};

export default YamlEditor;
