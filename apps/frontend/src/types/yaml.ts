/**
 * TypeScript types for YAML Editor component
 */

/**
 * YAML validation error details
 */
export interface YamlValidationError {
  path?: string;
  message: string;
  line?: number;
  column?: number;
  code?: string;
}

/**
 * YAML validation result from backend API
 */
export interface YamlValidationResult {
  valid: boolean;
  errors: YamlValidationError[];
  warnings: YamlValidationError[];
  applied?: boolean;
}

/**
 * Resource template type
 */
export interface ResourceTemplate {
  kind: string;
  name: string;
  template: string;
  description?: string;
}

/**
 * Editor history entry for undo/redo
 */
export interface EditorHistoryEntry {
  content: string;
  timestamp: number;
  version: number;
}

/**
 * Diff change type
 */
export type DiffChangeType = 'added' | 'removed' | 'modified' | 'unchanged';

/**
 * Single diff line
 */
export interface DiffLine {
  type: DiffChangeType;
  line: number;
  content: string;
}

/**
 * Diff view data
 */
export interface DiffData {
  diffLines: DiffLine[];
  changesCount: number;
}

/**
 * Find and replace options
 */
export interface FindReplaceOptions {
  caseSensitive?: boolean;
  wholeWord?: boolean;
  regex?: boolean;
  replaceAll?: boolean;
}

/**
 * Find match result
 */
export interface FindMatch {
  startLineNumber: number;
  startColumn: number;
  endLineNumber: number;
  endColumn: number;
  matches: number[];
}

/**
 * Editor mode
 */
export type EditorMode = 'edit' | 'preview' | 'diff' | 'minify';

/**
 * Line action (jump to line)
 */
export interface LineAction {
  lineNumber: number;
  reason?: string;
}

/**
 * Auto-completion item
 */
export interface CompletionItem {
  label: string;
  kind: string;
  insertText: string;
  detail?: string;
  documentation?: string;
}

/**
 * Secret handling options
 */
export interface SecretOptions {
  masked: boolean;
  encodeAsBase64: boolean;
}

/**
 * ConfigMap form entry
 */
export interface ConfigMapEntry {
  key: string;
  value: string;
  isNew?: boolean;
}

/**
 * Editor configuration options
 */
export interface YamlEditorOptions {
  readOnly?: boolean;
  minimap?: { enabled: boolean };
  fontSize?: number;
  lineHeight?: number;
  fontFamily?: string;
  lineNumbers?: 'on' | 'off' | 'relative' | 'interval';
  renderLineHighlight?: 'all' | 'line' | 'none' | 'gutter';
  scrollBeyondLastLine?: boolean;
  automaticLayout?: boolean;
  wordWrap?: 'on' | 'off' | 'wordWrapColumn' | 'bounded';
  folding?: boolean;
  foldingStrategy?: 'auto' | 'indentation';
  showFoldingControls?: 'always' | 'mouseover';
  matchBrackets?: 'always' | 'near' | 'never';
  autoClosingBrackets?: 'always' | 'never' | 'beforeWhitespace' | 'languageDefined';
  autoClosingQuotes?: 'always' | 'never' | 'beforeWhitespace' | 'languageDefined';
  formatOnPaste?: boolean;
  formatOnType?: boolean;
  tabSize?: number;
  insertSpaces?: boolean;
  detectIndentation?: boolean;
  trimAutoWhitespace?: boolean;
}

/**
 * Props for YamlEditor component
 */
export interface YamlEditorProps {
  /** Current YAML content */
  value: string;
  /** Callback when content changes */
  onChange?: (value: string) => void;
  /** Editor mode */
  mode?: EditorMode;
  /** Original YAML for diff view */
  originalValue?: string;
  /** Selected resource template */
  selectedTemplate?: string;
  /** Callback when template is selected */
  onTemplateSelect?: (template: string) => void;
  /** Callback when validation is triggered */
  onValidate?: (yaml: string) => Promise<YamlValidationResult>;
  /** Callback when YAML is applied */
  onApply?: (yaml: string, dryRun?: boolean) => Promise<void>;
  /** Callback when file is uploaded */
  onFileUpload?: (file: File) => void;
  /** Callback when file is downloaded */
  onDownload?: () => void;
  /** Namespace for resource creation */
  namespace?: string;
  /** Callback when namespace changes */
  onNamespaceChange?: (namespace: string) => void;
  /** Available namespaces */
  namespaces?: string[];
  /** Editor configuration options */
  options?: YamlEditorOptions;
  /** Secret handling options */
  secretOptions?: SecretOptions;
  /** Whether to show line numbers (clickable) */
  showLineNumbers?: boolean;
  /** Whether to show validation errors inline */
  showValidationErrors?: boolean;
  /** Whether to enable auto-completion */
  enableAutoComplete?: boolean;
  /** Custom auto-completion items */
  customCompletions?: CompletionItem[];
  /** Whether editor is in read-only mode */
  readOnly?: boolean;
  /** Loading state */
  loading?: boolean;
  /** Error message */
  error?: string;
  /** Additional CSS class name */
  className?: string;
  /** Minimum height */
  minHeight?: string | number;
  /** Maximum height */
  maxHeight?: string | number;
  /** Height (fixed) */
  height?: string | number;
}

/**
 * Props for ResourceTemplateSelector component
 */
export interface ResourceTemplateSelectorProps {
  templates: ResourceTemplate[];
  selectedTemplate?: string;
  onSelect: (template: ResourceTemplate) => void;
  loading?: boolean;
}

/**
 * Props for DiffViewer component
 */
export interface DiffViewerProps {
  original: string;
  modified: string;
  showLineNumbers?: boolean;
  sideBySide?: boolean;
  hideUnchangedLines?: boolean;
}

/**
 * Props for ConfigMapFormEditor component
 */
export interface ConfigMapFormEditorProps {
  entries: ConfigMapEntry[];
  onChange: (entries: ConfigMapEntry[]) => void;
  readOnly?: boolean;
}

/**
 * Props for SecretEditor component
 */
export interface SecretEditorProps {
  secretName: string;
  namespace: string;
  data: Record<string, string>;
  options: SecretOptions;
  onOptionsChange: (options: SecretOptions) => void;
  onDecodeValue?: (key: string, value: string) => string;
  onUpdateData: (data: Record<string, string>) => void;
}

/**
 * Keyboard shortcut definition
 */
export interface KeyboardShortcut {
  key: string;
  ctrlKey?: boolean;
  shiftKey?: boolean;
  altKey?: boolean;
  metaKey?: boolean;
  action: () => void;
  description: string;
}

/**
 * Editor toolbar action
 */
export interface ToolbarAction {
  id: string;
  label: string;
  icon?: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  loading?: boolean;
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
}

/**
 * YAML format options
 */
export interface YamlFormatOptions {
  indent: number;
  lineWidth: number;
  minify: boolean;
  sortKeys: boolean;
}

/**
 * File upload options
 */
export interface FileUploadOptions {
  accept?: string;
  maxSize?: number;
  multiple?: boolean;
}
