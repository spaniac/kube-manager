## ADDED Requirements

### Requirement: YAML editor interface
The system SHALL provide a web-based YAML editor with syntax highlighting, line numbers, and error indicators.

#### Scenario: Open YAML editor
- **WHEN** user clicks "Create Resource" and selects YAML editor mode
- **THEN** system displays YAML editor with syntax highlighting and line numbers

### Requirement: Resource type templates
The system SHALL provide YAML templates for common resource types (pod, deployment, service, configmap, secret, etc.).

#### Scenario: Use deployment template
- **WHEN** user selects "Deployment" template
- **THEN** system loads pre-filled deployment YAML with common structure

#### Scenario: Use service template
- **WHEN** user selects "Service" template
- **THEN** system loads pre-filled service YAML with ClusterIP type

### Requirement: Real-time syntax validation
The system SHALL perform real-time YAML syntax validation and display errors immediately.

#### Scenario: Syntax error detection
- **WHEN** user types invalid YAML (missing colon, wrong indentation)
- **THEN** system displays syntax error with line number and description

#### Scenario: Valid YAML
- **WHEN** YAML syntax is valid
- **THEN** system displays success indicator and no errors

### Requirement: K8s schema validation
The system SHALL validate YAML against K8s API schemas for the specified resource type and version.

#### Scenario: Validate against K8s schema
- **WHEN** user completes editing YAML and clicks "Validate"
- **THEN** system validates against live K8s API and displays any schema errors

#### Scenario: Missing required field
- **WHEN** deployment YAML is missing required "spec.template.spec.containers" field
- **THEN** system displays error indicating missing required field

### Requirement: Auto-completion
The system SHALL provide auto-completion for K8s resource fields, values, and enums based on schema.

#### Scenario: Auto-complete field names
- **WHEN** user starts typing "spe" in YAML editor
- **THEN** system suggests "spec:", "spec.template:", "spec.template.spec:"

#### Scenario: Auto-complete enum values
- **WHEN** user types value for "restartPolicy" field
- **THEN** system suggests enum values: "Always", "OnFailure", "Never"

### Requirement: Resource preview
The system SHALL allow users to preview the resource that will be created before applying.

#### Scenario: Preview resource
- **WHEN** user clicks "Preview" after editing YAML
- **THEN** system displays the fully rendered resource without creating it in K8s

### Requirement: Dry-run creation
The system SHALL support dry-run creation to validate resources without persisting them to K8s.

#### Scenario: Dry-run creation
- **WHEN** user clicks "Dry Run" to test YAML
- **THEN** system validates against K8s API and displays success without creating resource

### Requirement: Edit existing resources
The system SHALL allow loading existing K8s resources into the YAML editor for editing.

#### Scenario: Load existing resource
- **WHEN** user clicks "Edit YAML" on a deployment
- **THEN** system loads current deployment YAML into the editor

#### Scenario: Apply changes
- **WHEN** user modifies YAML and clicks "Apply"
- **THEN** system updates the resource in K8s with new configuration

### Requirement: Multiple resource editing
The system SHALL support editing YAML documents containing multiple resources separated by "---" delimiter.

#### Scenario: Edit multi-resource YAML
- **WHEN** user pastes YAML with deployment and service separated by "---"
- **THEN** system validates and creates both resources

### Requirement: YAML formatting
The system SHALL provide auto-formatting to ensure consistent indentation and structure.

#### Scenario: Format YAML
- **WHEN** user clicks "Format" button
- **THEN** system reformats YAML with proper indentation (2 spaces) and structure

### Requirement: Minify/Beautify toggle
The system SHALL allow switching between minimized (single line) and beautified (multi-line) YAML views.

#### Scenario: Minify YAML
- **WHEN** user clicks "Minify"
- **THEN** system displays YAML as compact single-line format

#### Scenario: Beautify YAML
- **WHEN** user clicks "Beautify"
- **THEN** system displays YAML with proper multi-line formatting

### Requirement: Comment support
The system SHALL preserve and allow adding comments in YAML files.

#### Scenario: Add comment
- **WHEN** user adds "# This is a comment" in YAML
- **THEN** system preserves comment when applying to K8s

### Requirement: Diff view
The system SHALL display a diff view when editing existing resources to show changes before applying.

#### Scenario: View diff
- **WHEN** user modifies existing resource YAML and clicks "Diff"
- **THEN** system displays side-by-side or unified diff showing changes

### Requirement: Undo/Redo
The system SHALL support undo and redo operations in the YAML editor.

#### Scenario: Undo change
- **WHEN** user clicks "Undo" after making edits
- **THEN** system reverts to previous editor state

#### Scenario: Redo change
- **WHEN** user clicks "Redo" after undoing
- **THEN** system reapplies the undone change

### Requirement: Copy/Paste support
The system SHALL allow copying and pasting YAML content including keyboard shortcuts.

#### Scenario: Copy YAML
- **WHEN** user selects text and uses Ctrl+C (Cmd+C)
- **THEN** system copies selected text to clipboard

#### Scenario: Paste YAML
- **WHEN** user uses Ctrl+V (Cmd+V) to paste
- **THEN** system inserts clipboard content at cursor position

### Requirement: Editor history
The system SHALL maintain edit history for the current YAML document to allow navigation between versions.

#### Scenario: View edit history
- **WHEN** user clicks "History"
- **THEN** system displays list of previous editor states with timestamps

#### Scenario: Restore from history
- **WHEN** user selects a previous state from history
- **THEN** system restores editor to that state

### Requirement: Resource namespace selection
The system SHALL allow specifying the target namespace for resource creation via dropdown or inline editing.

#### Scenario: Select namespace for new resource
- **WHEN** user creates new resource and selects namespace "production" from dropdown
- **THEN** system applies resource to specified namespace

### Requirement: YAML file upload
The system SHALL allow uploading YAML files from local filesystem for editing or applying.

#### Scenario: Upload YAML file
- **WHEN** user clicks "Upload File" and selects a deployment.yaml file
- **THEN** system loads file content into the editor

### Requirement: YAML file download
The system SHALL allow downloading the current YAML content to local filesystem.

#### Scenario: Download YAML
- **WHEN** user clicks "Download" after editing YAML
- **THEN** system downloads the YAML content as a .yaml file

### Requirement: Find and replace
The system SHALL provide find and replace functionality within the YAML editor.

#### Scenario: Find text
- **WHEN** user enters text in find box
- **THEN** system highlights all matches in the editor

#### Scenario: Replace text
- **WHEN** user enters find and replace text and clicks "Replace All"
- **THEN** system replaces all occurrences of find text with replace text

### Requirement: Line jump
The system SHALL allow jumping to specific line numbers by input or line number click.

#### Scenario: Jump to line
- **WHEN** user enters line number 42 in line jump box
- **THEN** editor scrolls to and highlights line 42

### Requirement: Indentation guides
The system SHALL display vertical indentation guides to help users understand YAML structure.

#### Scenario: View indentation guides
- **WHEN** user views YAML editor
- **THEN** system displays vertical lines showing indentation levels

### Requirement: Folding/Collapsing sections
The system SHALL allow collapsing and expanding sections of YAML (maps, lists) for better readability.

#### Scenario: Collapse section
- **WHEN** user clicks fold icon on a nested map or list
- **THEN** system collapses that section showing only header

#### Scenario: Expand section
- **WHEN** user clicks expand icon on collapsed section
- **THEN** system expands section showing full content

### Requirement: Secret handling
The system SHALL provide special handling for secrets including masking and encoding support.

#### Scenario: Mask secret values
- **WHEN** user views secret YAML in editor
- **THEN** system displays secret values as ****** by default

#### Scenario: Decode base64 secret
- **WHEN** user clicks "Decode" on a secret value
- **THEN** system displays decoded plaintext value (with masking option)

### Requirement: ConfigMap key-value editor
The system SHALL provide a simplified key-value editor for ConfigMaps instead of raw YAML for basic editing.

#### Scenario: Edit ConfigMap with form
- **WHEN** user views ConfigMap and selects "Form Editor"
- **THEN** system displays key-value pairs in form fields for easy editing

### Requirement: Resource validation before apply
The system SHALL perform comprehensive validation before applying resources and prevent invalid submissions.

#### Scenario: Prevent invalid apply
- **WHEN** user clicks "Apply" with YAML containing validation errors
- **THEN** system displays errors and prevents submission

#### Scenario: Apply valid resource
- **WHEN** user clicks "Apply" with valid YAML that passes all validations
- **THEN** system creates or updates the resource in K8s

### Requirement: Editor shortcuts
The system SHALL support keyboard shortcuts for common editor operations (save, format, validate, etc.).

#### Scenario: Use keyboard shortcut
- **WHEN** user presses Ctrl+S (Cmd+S)
- **THEN** system saves current YAML content

### Requirement: Multi-tab editing
The system SHALL allow editing multiple YAML documents in tabs for comparison or batch operations.

#### Scenario: Open multiple tabs
- **WHEN** user opens YAML editor for two different resources
- **THEN** system displays both in separate tabs for easy navigation
