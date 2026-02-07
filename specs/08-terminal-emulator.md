# Terminal Emulator

## Overview

Terminal Emulator provides WebSocket-based shell access to Kubernetes containers with session management, recording, sharing, and customization options.

---

## Features

1. **WebSocket Terminal** - Real-time bidirectional shell access
2. **Shell Selection** - Choose from sh, bash, zsh, fish
3. **Terminal Themes** - Multiple color themes (Light, Dark, Solarized)
4. **Font Size Adjustment** - Customize terminal font size
5. **Session Recording** - Record commands and output for audit
6. **Session Sharing** - Share terminal sessions with read-only access
7. **Multi-Session Management** - Manage multiple concurrent sessions
8. **Terminal Search** - Search through command history
9. **Alt Screen Mode** - Support htop, vim, less applications
10. **Session Labeling** - Label sessions for easy identification

---

## API Endpoints

### Connect to Terminal

```http
GET /api/v1/terminal/connect/{namespace}/{podName}?container={cn}
Authorization: Bearer <access_token>
```

**Query Parameters:**
- `container` (optional, default: first container) - Specific container in pod

Response:
```json
{
  "success": true,
  "data": {
    "sessionId": "production-api-server-abc123-1707240000",
    "namespace": "production",
    "podName": "api-server-abc123",
    "container": "nginx",
    "shell": "bash",
    "theme": "Dark",
    "fontSize": 14,
    "created": "2024-02-06T14:00:00Z"
  }
}
```

### List Active Sessions

```http
GET /api/v1/terminal/sessions
Authorization: Bearer <access_token>
```

Response:
```json
{
  "success": true,
  "data": {
    "production-api-server-abc123-1707240000": {
      "sessionId": "production-api-server-abc123-1707240000",
      "namespace": "production",
      "podName": "api-server-abc123",
      "container": "nginx",
      "label": "Debugging session",
      "createdAt": "2024-02-06T14:00:00Z",
      "lastActivityAt": "2024-02-06T14:30:00Z"
    }
  }
}
```

### Close Terminal Session

```http
DELETE /api/v1/terminal/sessions/{sessionId}
Authorization: Bearer <access_token>
```

Response:
```json
{
  "success": true,
  "message": "Terminal session closed successfully"
}
```

### Resize Terminal

```http
POST /api/v1/terminal/sessions/{sessionId}/resize
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "rows": 24,
  "columns": 80
}
```

Response:
```json
{
  "success": true,
  "message": "Terminal resized to 24x80"
}
```

### Execute Command

```http
POST /api/v1/terminal/sessions/{sessionId}/command
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "command": "kubectl get pods"
}
```

Response:
```json
{
  "success": true,
  "message": "Command executed successfully"
}
```

### Interrupt Terminal (Ctrl+C)

```http
POST /api/v1/terminal/sessions/{sessionId}/interrupt
Authorization: Bearer <access_token>
```

Response:
```json
{
  "success": true,
  "message": "Terminal interrupted successfully"
}
```

### Search Terminal History

```http
GET /api/v1/terminal/sessions/{sessionId}/search?query={search}
Authorization: Bearer <access_token>
```

Response:
```json
{
  "success": true,
  "data": {
    "query": "kubectl",
    "matches": [
      {
        "command": "kubectl get pods",
        "output": "NAME              READY   STATUS    RESTARTS   AGE\nnginx-deploy...   3/3     Running   0          5d\n",
        "timestamp": "2024-02-06T14:00:00Z"
      },
      {
        "command": "kubectl describe pod nginx-deploy",
        "output": "Name: nginx-deploy...",
        "timestamp": "2024-02-06T14:05:00Z"
      }
    ]
  }
}
```

### Update Session Label

```http
PUT /api/v1/terminal/sessions/{sessionId}/label
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "label": "Production debugging"
}
```

Response:
```json
{
  "success": true,
  "message": "Session label updated"
}
```

### Download Session Recording

```http
GET /api/v1/terminal/sessions/{sessionId}/recording
Authorization: Bearer <access_token>
```

Response:
```json
{
  "success": true,
  "data": {
    "sessionId": "production-api-server-abc123-1707240000",
    "format": "json",
    "duration": "3600",
    "commandCount": 45,
    "recording": [
      {
        "timestamp": "2024-02-06T14:00:00Z",
        "command": "kubectl get pods",
        "output": "NAME              READY   STATUS    RESTARTS   AGE\nnginx-deploy...   3/3     Running   0          5d\n",
        "exitCode": 0
      },
      {
        "timestamp": "2024-02-06T14:01:00Z",
        "command": "ls -la",
        "output": "total 24\ndrwxr-xr-x  2 root root ...\n",
        "exitCode": 0
      }
    ]
  },
  "contentType": "application/json"
}
```

### Share Terminal Session

```http
POST /api/v1/terminal/sessions/{sessionId}/share
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "expiresIn": 24,
  "readOnly": true
}
```

Response:
```json
{
  "success": true,
  "data": {
    "shareId": "share-abc123xyz",
    "shareUrl": "https://k8s-manager.example.com/terminal/share/share-abc123xyz",
    "expiresAt": "2024-02-07T14:00:00Z",
    "readOnly": true
  }
}
```

---

## WebSocket Protocol

### Connection Flow

```
Client                                      Server
  |                                            |
  | --- WebSocket Upgrade --------------> |
  |   < wss://.../ws/terminal         |
  |                                            |
  |   <----------------------------------> |
  |                                            |
  |   Binary frames (xterm.js format)      |
  |   <---------------------------------- |
  |                                            |
```

### Frame Format

```
Frame Type: 0x00 (Data) - UTF-8 encoded
Bytes: COLS, ROWS, ... (xterm.js protocol)
```

### Session Lifecycle

1. **Connection Phase**: WebSocket handshake, session initialization
2. **PTY Allocation**: Pseudoterminal allocated on container
3. **Shell Spawn**: Shell process started
4. **Active Phase**: Commands executing, I/O streaming
5. **Cleanup Phase**: PTY closed, resources cleaned up

---

## Terminal Themes

### Available Themes

| Theme Name | Description | Background | Foreground | Colors |
|-------------|-------------|------------|----------|--------|
| Light | Light theme for bright environments | #FFFFFF | #000000 | Blue, green, orange |
| Dark | Dark theme for default use | #1E1E1E | #D4D4D4 | Blue, green, yellow |
| Solarized Dark | Solarized dark theme | #002B36 | #839496 | Solarized color palette |
| Solarized Light | Solarized light theme | #FDF6E3 | #657B83 | Solarized color palette |
| Monokai | Monokai color scheme | #272822 | #F8F8F2 | Blue, red, yellow, green |

### Theme Configuration

```typescript
const themes = {
  Light: {
    background: '#FFFFFF',
    foreground: '#000000',
    cursor: '#000000',
    colors: {
      black: '#000000',
      red: '#cd3131',
      green: '#00aa00',
      yellow: '#b58900',
      blue: '#0f62fc',
      magenta: '#e91e63',
      cyan: '#00ffff',
      white: '#ffffff'
    }
  },
  Dark: {
    background: '#1E1E1E',
    foreground: '#D4D4D4',
    cursor: '#D4D4D4',
    colors: { ... }
  }
};
```

---

## Frontend Components

### Terminal Component

```typescript
function Terminal({ namespace, podName }: TerminalProps) {
  const [theme, setTheme] = useState('Dark');
  const [fontSize, setFontSize] = useState(14);
  const [shell, setShell] = useState('bash');
  const ws = useTerminalWebSocket(namespace, podName, shell, theme, fontSize);

  const sendCommand = (command: string) => {
    ws.send(JSON.stringify({ type: 'command', command }));
  };

  const resizeTerminal = (rows: number, cols: number) => {
    ws.send(JSON.stringify({ type: 'resize', rows, cols }));
  };

  return (
    <div className="terminal-container">
      <TerminalToolbar
        theme={theme}
        onThemeChange={setTheme}
        fontSize={fontSize}
        onFontSizeChange={setFontSize}
        shell={shell}
        onShellChange={setShell}
        onSearch={() => openSearchDialog()}
        onDownloadRecording={() => downloadRecording()}
        onShare={() => shareSession()}
      />
      <XTerm
        ref={terminalRef}
        theme={themes[theme]}
        fontSize={fontSize}
        onResize={resizeTerminal}
        onData={handleTerminalData}
      />
    </div>
  );
}
```

### SessionList Component

```typescript
function SessionList() {
  const { data: sessions } = useTerminalSessions();
  const [currentSession, setCurrentSession] = useState<string | null>(null);

  const handleSwitchSession = (sessionId: string) => {
    if (currentSession) {
      closeCurrentSession();
    }
    setCurrentSession(sessionId);
    openTerminal(sessionId);
  };

  return (
    <div>
      <h2>Active Terminal Sessions</h2>

      {sessions && Object.entries(sessions).map(([id, session]) => (
        <SessionCard
          key={id}
          session={session}
          isActive={id === currentSession}
          onSwitch={() => handleSwitchSession(id)}
          onClose={() => closeSession(id)}
        />
      ))}

      <Button onClick={() => openNewTerminal()}>
        New Terminal Session
      </Button>
    </div>
  );
}
```

### TerminalToolbar Component

```typescript
function TerminalToolbar({ theme, fontSize, shell, ... }: ToolbarProps) {
  return (
    <div className="terminal-toolbar">
      <Select
        label="Shell"
        value={shell}
        onChange={onShellChange}
        options={[
          { value: 'bash', label: 'Bash' },
          { value: 'sh', label: 'Sh' },
          { value: 'zsh', label: 'Zsh' },
          { value: 'fish', label: 'Fish' }
        ]}
      />

      <Select
        label="Theme"
        value={theme}
        onChange={onThemeChange}
        options={[
          { value: 'Light', label: 'Light' },
          { value: 'Dark', label: 'Dark' },
          { value: 'Solarized Dark', label: 'Solarized Dark' },
          { value: 'Solarized Light', label: 'Solarized Light' }
        ]}
      />

      <FontControls
        fontSize={fontSize}
        onDecrease={() => onFontSizeChange(fontSize - 2)}
        onIncrease={() => onFontSizeChange(fontSize + 2)}
      />

      <Button onClick={onSearch}>Search History</Button>
      <Button onClick={onDownload}>Download Recording</Button>
      <Button onClick={onShare}>Share Session</Button>
      <Button onClick={onDisconnect} variant="danger">Disconnect</Button>
    </div>
  );
}
```

---

## RBAC Permissions

| Operation | Permission Required |
|-----------|-------------------|
| Connect to terminal | EXEC + POD |
| List sessions | EXEC + POD |
| Close session | EXEC + POD |
| Execute command | EXEC + POD |
| Resize terminal | EXEC + POD |
| Interrupt terminal | EXEC + POD |
| Search history | EXEC + POD |
| Download recording | EXEC + POD |
| Share session | EXEC + POD |

---

## Session Management

### Concurrent Session Limits

```properties
# Terminal Sessions
terminal.sessions.max-concurrent=5
terminal.sessions.timeout-minutes=30
terminal.sessions.idle-timeout-minutes=10
```

### Session Cleanup

```java
@Scheduled(cron = "0 */15 * * * *")
public class TerminalSessionCleanup {

    public void cleanupExpiredSessions() {
        // Remove sessions older than 30 minutes with no activity
        LocalDateTime cutoff = LocalDateTime.now().minusMinutes(30);
        terminalSessionRepository.deleteByLastActivityAtBefore(cutoff);
    }

    public void cleanupOrphanedSessions() {
        // Remove sessions with no associated WebSocket connections for > 1 hour
        LocalDateTime cutoff = LocalDateTime.now().minusHours(1);
        terminalSessionRepository.deleteByCreatedAtBefore(cutoff);
    }
}
```

---

## Recording Format

### Recording JSON Structure

```json
{
  "sessionId": "production-api-server-abc123-1707240000",
  "format": "json",
  "duration": 3600,
  "commandCount": 45,
  "startTime": "2024-02-06T14:00:00Z",
  "endTime": "2024-02-06T15:00:00Z",
  "recording": [
    {
      "sequence": 1,
      "timestamp": "2024-02-06T14:00:00Z",
      "command": "kubectl get pods",
      "output": "NAME              READY   STATUS    RESTARTS   AGE\nnginx-deploy...   3/3     Running   0          5d\n",
      "exitCode": 0
    },
    {
      "sequence": 2,
      "timestamp": "2024-02-06T14:01:00Z",
      "command": "ls -la",
      "output": "total 24\ndrwxr-xr-x  2 root root ...\n",
      "exitCode": 0
    }
  ]
}
```

### Recording Storage

- **Format**: JSON (for parsing) + Raw text (for download)
- **Retention**: 7 days
- **Storage**: Database (terminal_recordings table)
- **Max Size**: 10 MB per session

---

## Error Handling

### Session Limit Reached
```json
{
  "success": false,
  "message": "Maximum concurrent terminal sessions reached (5)",
  "error": "SESSION_LIMIT_EXCEEDED",
  "statusCode": 429
}
```

### Session Not Found
```json
{
  "success": false,
  "message": "Terminal session not found",
  "error": "SESSION_NOT_FOUND",
  "statusCode": 404
}
```

### Command Execution Failed
```json
{
  "success": false,
  "message": "Failed to execute command",
  "error": "COMMAND_EXECUTION_FAILED",
  "statusCode": 500,
  "details": {
    "command": "kubectl get pods",
    "reason": "Container not responding"
  }
}
```

---

## Configuration

```properties
# Terminal Settings
terminal.default-shell=bash
terminal.default-theme=Dark
terminal.default-font-size=14
terminal.encoding=utf-8

# WebSocket
terminal.websocket.max-frame-size=1048576
terminal.websocket.timeout-seconds=300
terminal.websocket.heartbeat-interval-seconds=30

# Recording
terminal.recording.enabled=true
terminal.recording.retention-days=7
terminal.recording.max-size-mb=10

# Sharing
terminal.sharing.enabled=true
terminal.sharing.expiration-hours=24
terminal.sharing.read-only=true
```

---

## Testing

```java
@SpringBootTest
@AutoConfigureMockMvc
public class TerminalControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    public void testConnectTerminal() throws Exception {
        mockMvc.perform(get("/api/v1/terminal/connect/production/api-server")
                .header("Authorization", "Bearer " + token))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.success").value(true))
            .andExpect(jsonPath("$.data.sessionId").isNotEmpty());
    }

    @Test
    public void testExecuteCommand() throws Exception {
        mockMvc.perform(post("/api/v1/terminal/sessions/test-id/command")
                .contentType(MediaType.APPLICATION_JSON)
                .header("Authorization", "Bearer " + token)
                .content("{\"command\":\"ls -la\"}"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.success").value(true));
    }

    @Test
    public void testResizeTerminal() throws Exception {
        mockMvc.perform(post("/api/v1/terminal/sessions/test-id/resize")
                .contentType(MediaType.APPLICATION_JSON)
                .header("Authorization", "Bearer " + token)
                .content("{\"rows\":24,\"columns\":80}"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.success").value(true));
    }
}
```

---

## Security Considerations

1. **Command Sanitization**: All commands validated before execution
2. **Shell Restriction**: Only allowed shells (sh, bash, zsh, fish)
3. **Command Whitelist**: Optional - Restrict dangerous commands
4. **Output Limiting**: Limit output size to prevent DoS
5. **Session Isolation**: User can only access their own sessions
6. **Recording Privacy**: Recordings encrypted at rest

---

## Future Enhancements

- [ ] File upload/download (scp/sftp)
- [ ] Multiple terminal split screens (tmux integration)
- [ ] Command auto-completion
- [ ] Command history search with regex
- [ ] Custom keyboard shortcuts
- [ ] Terminal plugins/addons
- [ ] Remote command execution (kubectl exec alternative)
- [ ] Session collaboration (multi-user viewing)
- [ ] Recording playback and replay
- [ ] Advanced session management (groups, folders)
