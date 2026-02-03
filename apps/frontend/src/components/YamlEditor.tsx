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
} from 'react';
import Editor, {
  Monaco,
  useMonaco,
} from '@monaco-editor/react';
import * as MonacoTypes from 'monaco-editor';
import apiClient from '../api/client';
import {
  YamlEditorProps,
  YamlValidationResult,
  ResourceTemplate,
  EditorMode,
  DiffData,
} from '../types/yaml';
import styles from './YamlEditor.module.css';

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

  // Diff view data
  const [diffData, setDiffData] = useState<DiffData | null>(null);

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
   * Load template into editor
   */
  useEffect(() => {
    if (selectedTemplate) {
      const template = templates.find((t) => t.name === selectedTemplate || t.kind === selectedTemplate);
      if (template) {
        handleLoadTemplate(template);
      }
    }
  }, [selectedTemplate, templates]);

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
    const monacoInstance = monaco;
    if (!monacoInstance) return;

    // Register YAML language
    monacoInstance.languages.register({ id: 'yaml' });

    // Configure YAML language features
    monacoInstance.languages.setLanguageConfiguration('yaml', {
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
      monacoInstance.languages.registerCompletionItemProvider('yaml', {
        provideCompletionItems: async (model, position) => {
          const suggestions = await getCompletionSuggestions(model, position);
          return { suggestions };
        },
      });
    }


  }, [monaco, enableAutoComplete]);

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

  /**
   * Toggle editor mode
   */
  const toggleMode = (newMode: EditorMode) => {
    setEditorMode(newMode);
    if (newMode === 'diff' && originalValue) {
      calculateDiff(originalValue, value);
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

        {/* Mode toggle */}
        <div className={styles.toolbarGroup}>
          <button
            className={`${styles.toolbarButton} ${editorMode === 'edit' ? styles.active : ''}`}
            onClick={() => toggleMode('edit')}
            disabled={readOnly}
            title="Edit mode"
          >
            Edit
          </button>
          <button
            className={`${styles.toolbarButton} ${editorMode === 'preview' ? styles.active : ''}`}
            onClick={() => toggleMode('preview')}
            disabled={readOnly}
            title="Preview mode"
          >
            Preview
          </button>
          {originalValue && (
            <button
              className={`${styles.toolbarButton} ${editorMode === 'diff' ? styles.active : ''}`}
              onClick={() => toggleMode('diff')}
              disabled={readOnly}
              title="Diff mode"
            >
              Diff ({diffData?.changesCount || 0})
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
          >
            Format
          </button>
          <button
            className={styles.toolbarButton}
            onClick={handleBeautify}
            disabled={readOnly}
            title="Beautify"
          >
            Beautify
          </button>
          <button
            className={styles.toolbarButton}
            onClick={handleMinify}
            disabled={readOnly}
            title="Minify"
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
          >
            ↶
          </button>
          <button
            className={styles.toolbarButton}
            onClick={handleRedo}
            disabled={historyIndex >= history.length - 1}
            title="Redo (Ctrl+Y)"
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
          >
            Upload
          </button>
          <button
            className={styles.toolbarButton}
            onClick={handleDownload}
            title="Download YAML file"
          >
            Download
          </button>
        </div>

        {/* Validation and apply */}
        <div className={styles.toolbarGroup}>
          {renderValidationStatus()}
          <button
            className={`${styles.toolbarButton} ${styles.toolbarButtonPrimary}`}
            onClick={handleSave}
            disabled={!validationResult.valid || loading || readOnly}
            title="Save (Ctrl+S)"
          >
            Save
          </button>
          <button
            className={`${styles.toolbarButton} ${styles.toolbarButtonSecondary}`}
            onClick={handleDryRun}
            disabled={!validationResult.valid || isValidating || readOnly}
            title="Dry run"
          >
            Dry Run
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
            autoFocus
          />
          <button
            className={styles.lineJumpCloseButton}
            onClick={() => {
              setShowLineJump(false);
              setTargetLine('');
            }}
          >
            ✕
          </button>
        </div>
      )}

      {/* Editor container */}
      <div className={styles.editorContainer} style={{ height: 'calc(100% - 50px)' }}>
        {editorMode === 'edit' ? (
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
              <div className={styles.diffHeader}>Original</div>
              <div className={styles.diffContent}>
                {diffData.originalLines.map((line, i) => (
                  <div
                    key={i}
                    className={`${styles.diffLine} ${styles[line.type]}`}
                    onClick={() => line.line !== undefined && handleJumpToLine(line.line)}
                  >
                    <span className={styles.diffLineNumber}>{line.line ?? ''}</span>
                    <span className={styles.diffLineContent}>{line.content ?? ' '}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className={styles.diffPanel}>
              <div className={styles.diffHeader}>Modified</div>
              <div className={styles.diffContent}>
                {diffData.modifiedLines.map((line, i) => (
                  <div key={i} className={`${styles.diffLine} ${styles[line.type]}`}>
                    <span className={styles.diffLineNumber}>{line.line}</span>
                    <span className={styles.diffLineContent}>{line.content || ' '}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : null}
      </div>

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
