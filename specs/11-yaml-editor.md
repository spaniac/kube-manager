# YAML Editor

## Overview

YAML Editor provides a comprehensive editor for creating, viewing, and editing Kubernetes resources with syntax highlighting, auto-completion, validation, and templates.

---

## Features

1. **Monaco Editor Integration** - Full-featured code editor with K8s support
2. **Real-time Validation** - Syntax and schema validation as you type
3. **Auto-completion** - Smart suggestions for K8s fields and values
4. **Templates** - Pre-built templates for common resources
5. **Multi-tab Editing** - Edit multiple resources simultaneously
6. **Diff View** - Compare changes before applying
7. **Form-based Editing** - ConfigMap/Secret editors for non-technical users
8. **Secret Handling** - Mask and decode base64 secrets
9. **Keyboard Shortcuts** - Productivity shortcuts (Ctrl+S, Ctrl+K, etc.)
10. **YAML Operations** - Format, minify, beautify

---

## API Endpoints

### Validate YAML Syntax

```http
POST /api/v1/yaml-editor/validate
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "yaml": "apiVersion: apps/v1\nkind: Deployment\nmetadata:\n  name: nginx\nspec:\n  replicas: 3"
}
```

Response:
```json
{
  "success": true,
  "data": {
    "valid": true,
    "kind": "Deployment",
    "apiVersion": "apps/v1",
    "parsed": {
      "metadata": { "name": "nginx" },
      "spec": { "replicas": 3 }
    }
  },
  "message": "YAML is valid"
}
```

### Validate K8s Schema

```http
POST /api/v1/yaml-editor/validate-schema
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "yaml": "apiVersion: apps/v1\nkind: Deployment\nspec:\n  replicas: 3",
  "kind": "Deployment",
  "namespace": "production"
}
```

Response:
```json
{
  "success": true,
  "data": {
    "valid": true,
    "schemaValid": true,
    "apiVersion": "apps/v1",
    "kind": "Deployment",
    "warnings": []
  },
  "message": "YAML is valid for Deployment in production namespace"
}
```

**Schema Validation Checks:**
- Required fields present
- Field types match K8s schema
- Valid values for enums
- Minimum/maximum constraints
- Image reference format

### Get Templates

```http
GET /api/v1/yaml-editor/templates?kind={type}
Authorization: Bearer <access_token>
```

**Query Parameters:**
- `kind` (optional) - Resource type: `Deployment`, `Service`, `ConfigMap`, `Secret`, etc.

Response:
```json
{
  "success": true,
  "data": {
    "templates": [
      {
        "id": 1,
        "name": "Nginx Deployment",
        "kind": "Deployment",
        "description": "Basic nginx deployment with 3 replicas",
        "yaml": "apiVersion: apps/v1\nkind: Deployment\nmetadata:\n  name: nginx\nspec:\n  replicas: 3\n  selector:\n    matchLabels:\n      app: nginx\n  template:\n    metadata:\n      labels:\n        app: nginx\n    spec:\n      containers:\n      - name: nginx\n        image: nginx:1.21\n        ports:\n        - containerPort: 80"
      }
    },
      {
        "id": 2,
        "name": "Node.js Application",
        "kind": "Deployment",
        "description": "Node.js application with environment variables",
        "yaml": "..."
      }
    ]
  }
}
```

### Get Auto-completion Suggestions

```http
POST /api/v1/yaml-editor/autocomplete
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "yaml": "apiVersion: apps/v1\nkind: Deployment\nmetadata:\n  name: nginx\nspec:\n  r",
  "cursor": {
    "line": 5,
    "column": 2
  }
}
```

Response:
```json
{
  "success": true,
  "data": {
    "suggestions": [
      {
        "label": "replicas",
        "type": "integer",
        "insertText": "3",
        "detail": "Number of pod replicas"
      },
      {
        "label": "image",
        "type": "string",
        "insertText": "nginx:",
        "detail": "Container image name"
      },
      {
        "label": "env",
        "type": "array",
        "insertText": "- name: VALUE",
        "detail": "Environment variable"
      }
    ]
  }
}
```

### Format YAML

```http
POST /api/v1/yaml-editor/format
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "yaml": "apiVersion: apps/v1\nkind: Deployment\nspec:\n  replicas: 3",
  "operation": "beautify"
}
```

Response:
```json
{
  "success": true,
  "data": {
    "yaml": "apiVersion: apps/v1\nkind: Deployment\nmetadata:\n  name: nginx\nspec:\n  replicas: 3\n",
    "message": "YAML formatted successfully"
  }
}
```

**Supported Operations:**
- `beautify` - Format with proper indentation
- `minify` - Remove unnecessary whitespace and comments
- `sort` - Sort keys alphabetically

### Preview Resource

```http
POST /api/v1/yaml-editor/preview
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "yaml": "apiVersion: apps/v1\nkind: Deployment\nmetadata:\n  name: nginx\nspec:\n  replicas: 3",
  "dryRun": true
}
```

Response:
```json
{
  "success": true,
  "data": {
    "kind": "Deployment",
    "name": "nginx",
    "preview": {
      "metadata": { "name": "nginx" },
      "spec": { "replicas": 3 },
      "warnings": []
    },
    "message": "Dry-run successful"
}
```

### Apply Resource

```http
POST /api/v1/yaml-editor/apply
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "yaml": "apiVersion: apps/v1\nkind: Deployment\nmetadata:\n  name: nginx\nspec:\n  replicas: 3",
  "namespace": "production",
  "dryRun": false
}
```

Response:
```json
{
  "success": true,
  "data": {
    "kind": "Deployment",
    "name": "nginx",
    "namespace": "production",
    "apiVersion": "apps/v1",
    "metadata": { "name": "nginx" }
  },
  "message": "Resource applied successfully"
}
```

### Get Resource Diff

```http
POST /api/v1/yaml-editor/diff
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "oldYaml": "apiVersion: apps/v1\nkind: Deployment\nmetadata:\n  name: nginx\nspec:\n  replicas: 2",
  "newYaml": "apiVersion: apps/v1\nkind: Deployment\nmetadata:\n  name: nginx\nspec:\n  replicas: 3",
  "namespace": "production"
}
```

Response:
```json
{
  "success": true,
  "data": {
    "diff": {
      "kind": "Deployment",
      "name": "nginx",
      "changes": [
        {
          "type": "modified",
          "path": "spec.replicas",
          "oldValue": "2",
          "newValue": "3"
        },
        {
          "type": "added",
          "path": "spec.template.spec.containers[0].env",
          "newValue": "- name: NEW_VAR"
        }
      ]
    }
  },
  "message": "Diff generated successfully"
}
```

---

## YAML Editor Features

### Auto-completion

**Kubernetes Fields:**

| Field | Type | Auto-completion Options |
|-------|-------|----------------------|
| apiVersion | String | v1, apps/v1, batch/v1, etc. |
| kind | String | Pod, Deployment, Service, ConfigMap, etc. |
| metadata.name | String | Resource name (DNS subdomain format) |
| spec.replicas | Integer | Number of replicas |
| spec.template.spec.containers | Array | Container specifications |
| spec.template.spec.containers[*].name | String | Container name |
| spec.template.spec.containers[*].image | String | Image reference |
| spec.template.spec.containers[*].ports | Array | Port definitions |
| spec.selector.matchLabels | Object | Label selector |
| spec.strategy.type | String | RollingUpdate, Recreate |
| spec.template.spec.containers[*].resources | Object | Resource requests/limits |

**Auto-completion Triggers:**
- After `:` or `  ` (array start)
- After `:` or `{` (object key start)
- After `-` (list item separator)

### Syntax Highlighting

**Language Configuration:**

```typescript
const yamlLanguages = {
  deployment: 'yaml',
  pod: 'yaml',
  service: 'yaml',
  configmap: 'yaml',
  secret: 'yaml'
};
```

**Theme Support:**
- Light theme
- Dark theme
- High contrast

**Validation Rules:**
- Indentation: 2 spaces per level
- Line length: Maximum 120 characters (wrap)
- Key quotes: Double quotes recommended
- Comments: `#` for single-line

### Keyboard Shortcuts

| Shortcut | Action | Description |
|----------|---------|-------------|
| Ctrl+S | Save/Apply | Apply current YAML to cluster |
| Ctrl+Shift+S | Save As | Download YAML as file |
| Ctrl+K | Format | Beautify current YAML |
| Ctrl+Shift+K | Minify | Minify current YAML |
| Ctrl+Z | Undo | Undo last action |
| Ctrl+Shift+Z | Redo | Redo last undone action |
| Ctrl+F | Find | Open find dialog |
| Ctrl+G | Go to Line | Jump to specific line |
| Ctrl+/ | Fold All | Collapse all sections |
| Ctrl+- | Fold/Unfold | Toggle current section |
| Alt+Up/Down | Navigate | Move cursor up/down |
| Ctrl+Enter | New Line | Insert new line at cursor |

---

## Frontend Components

### YamlEditor Component

```typescript
function YamlEditor() {
  const [yaml, setYaml] = useState('');
  const [language, setLanguage] = useState<YamlLanguage>('deployment');
  const [theme, setTheme] = useState<EditorTheme>('dark');
  const [validation, setValidation] = useState<ValidationResult>({ valid: true, errors: [] });
  const [activeTab, setActiveTab] = useState<number>(0);

  const handleSave = async () => {
    const result = await api.post('/api/v1/yaml-editor/apply', {
      yaml,
      namespace: 'production',
      dryRun: false
    });

    showToast('Resource applied successfully');
  };

  return (
    <div className="yaml-editor-container">
      <Toolbar
        theme={theme}
        onThemeChange={setTheme}
        language={language}
        onLanguageChange={setLanguage}
        validation={validation}
      />

      <Tabs>
        {tabs.map((tab, index) => (
          <Tab
            key={tab.id}
            label={tab.label}
            isActive={activeTab === index}
            onClick={() => setActiveTab(index)}
          >
            <MonacoEditor
              value={tab.yaml}
              language={tab.language}
              theme={theme}
              options={{
                minimap: { enabled: true },
                automaticLayout: 'advanced',
                scrollBeyondLastLine: false,
                wordWrap: 'on',
                lineNumbers: 'on',
                renderWhitespace: 'all',
                tabSize: 2
              }}
              onDidChange={(newValue) => {
                setYaml(newValue);
                validateYaml(newValue);
              }}
            />
          </Tab>
        ))}
      </Tabs>

      <Footer>
        <ValidationStatus validation={validation} />
        <CursorPosition />
        <FileStats yaml={yaml} />
      </Footer>
    </div>
  );
}
```

### DiffViewer Component

```typescript
function DiffViewer({ oldYaml, newYaml }: DiffViewerProps) {
  const { data: diff } = useResourceDiff(oldYaml, newYaml);

  return (
    <div>
      <h2>Resource Changes</h2>

      <DiffDisplay
        diff={diff?.changes}
        oldYaml={oldYaml}
        newYaml={newYaml}
        renderSideBySide={true}
      />

      <Actions>
        <Button onClick={() => applyChanges()}>
          Apply Changes
        </Button>
        <Button onClick={() => downloadDiff()}>
          Download Diff
        </Button>
      </Actions>
    </div>
  );
}
```

### SecretEditor Component (Form-based)

```typescript
function SecretEditor({ namespace, name }: SecretEditorProps) {
  const [keys, setKeys] = useState<SecretKey[]>([]);
  const [masking, setMasking] = useState(true);

  const handleAddKey = () => {
    setKeys([...keys, { name: `KEY_${keys.length}`, value: '', encoded: '' }]);
  };

  const handleDeleteKey = (id: string) => {
    setKeys(keys.filter(k => k.id !== id));
  };

  return (
    <Card>
      <h2>Edit Secret: {name}</h2>

      <KeyValueEditor
        keys={keys}
        onAdd={handleAddKey}
        onDelete={handleDeleteKey}
        readOnly={false}
      />

      <SecretView
        keys={keys}
        masked={masking}
        onToggleMask={() => setMasking(!masking)}
      />

      <Actions>
        <Button onClick={handleSave}>Save Secret</Button>
        <Button onClick={() => generateBase64()}>Generate Encoded Value</Button>
      </Actions>
    </Card>
  );
}
```

---

## Validation

### YAML Syntax Validation

```typescript
function validateYaml(yaml: string): ValidationResult {
  try {
    const parsed = yaml.load(yaml);
    return {
      valid: true,
      errors: []
    };
  } catch (error) {
    return {
      valid: false,
      errors: [{
        line: error.mark.line,
        column: error.mark.column,
        message: error.message,
        severity: 'error'
      }]
    };
  }
}
```

### K8s Schema Validation

```typescript
function validateK8sSchema(yaml: string, kind: string, namespace: string): SchemaValidationResult {
  const schema = getSchemaForKind(kind, namespace);
  const errors: SchemaError[] = [];

  // Check required fields
  const requiredFields = getRequiredFieldsForKind(kind);
  requiredFields.forEach(field => {
    if (!yaml.hasOwnProperty(field.path)) {
      errors.push({
        path: field.path,
        message: `Required field '${field.name}' is missing`,
        severity: 'error'
      });
    }
  });

  // Validate field types
  const { document } = yaml.parse(yaml);
  validateFieldTypes(document, kind, errors);

  return {
    valid: errors.length === 0,
    errors,
    warnings: []
  };
}
```

---

## RBAC Permissions

| Operation | Permission Required |
|-----------|-------------------|
| Validate YAML | READ + {RESOURCE_TYPE} |
| Get templates | READ + {RESOURCE_TYPE} |
| Preview resource | READ + {RESOURCE_TYPE} |
| Apply resource | WRITE + {RESOURCE_TYPE} |
| Format YAML | READ + {RESOURCE_TYPE} |
| Get diff | READ + {RESOURCE_TYPE} |

---

## Configuration

```properties
# YAML Editor
yaml-editor.theme=default
yaml-editor.font-size=14
yaml-editor.tab-size=2
yaml-editor.max-file-size-mb=10
yaml-editor.validation.real-time=true
yaml-editor.auto-save-interval-seconds=60

# Auto-completion
yaml-editor.autocomplete.enabled=true
yaml-editor.autocomplete-delay-ms=200
yaml-editor.suggestion-count=10

# Templates
yaml-editor.templates.enabled=true
yaml-editor.templates.cache-seconds=300
```

---

## Testing

```java
@SpringBootTest
@AutoConfigureMockMvc
public class YamlEditorControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    public void testValidateYaml() throws Exception {
        mockMvc.perform(post("/api/v1/yaml-editor/validate")
                .contentType(MediaType.APPLICATION_JSON)
                .header("Authorization", "Bearer " + token)
                .content("{\"yaml\":\"apiVersion: v1\\nkind: Pod\\nmetadata:\\n  name: test\"}"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.success").value(true))
            .andExpect(jsonPath("$.data.valid").value(true));
    }

    @Test
    public void testPreviewResource() throws Exception {
        mockMvc.perform(post("/api/v1/yaml-editor/preview")
                .contentType(MediaType.APPLICATION_JSON)
                .header("Authorization", "Bearer " + token)
                .content("{\"yaml\":\"...\",\"dryRun\":true}"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.success").value(true))
            .andExpect(jsonPath("$.data.preview").isNotEmpty());
    }

    @Test
    public void testGetTemplates() throws Exception {
        mockMvc.perform(get("/api/v1/yaml-editor/templates?kind=Deployment")
                .header("Authorization", "Bearer " + token))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.success").value(true))
            .andExpect(jsonPath("$.data.templates").isArray());
    }
}
```

---

## Future Enhancements

- [ ] YAML snippet library (common code snippets)
- [ ] Multi-cursor support (multiple cursors)
- [ ] Visual schema builder (drag-and-drop fields)
- [ ] Live YAML preview (real-time cluster status)
- [ ] Resource cloning from templates
- [ ] Import from existing resources (read from cluster)
- [ ] Git integration (version control)
- [ ] YAML to Helm conversion
- [ ] Advanced diff viewer (3-way diff, side-by-side)
- [ ] Collaborative editing (multi-user with comments)
- [ ] Custom snippets (user-defined templates)
