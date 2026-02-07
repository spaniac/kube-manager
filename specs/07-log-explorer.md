# Log Explorer

## Overview

Log Explorer provides real-time log streaming, filtering, aggregation, bookmarking, and export capabilities for Kubernetes pod logs.

---

## Features

1. **Real-time Streaming** - SSE-based log streaming with low latency
2. **Multi-Pod Aggregation** - View logs from multiple pods simultaneously
3. **Advanced Filtering** - Filter by severity, search, time range, container
4. **Log Bookmarking** - Save important log lines for later reference
5. **Log Sharing** - Share filtered log views with URLs
6. **Log Export** - Download logs as text or gzip
7. **External Export** - Send logs to ELK, Loki, Splunk
8. **JSON Log Parsing** - Structure and pretty-print JSON logs
9. **Log Statistics** - Track total lines, error counts, volume
10. **Log Query History** - Save and replay filter combinations

---

## API Endpoints

### Stream Pod Logs

```http
GET /api/v1/pods/{namespace}/{name}/logs?containerName={cn}&previous={bool}&tailLines={n}&severity={level}&search={query}&since={ts}&until={ts}
Authorization: Bearer <access_token>
```

**Response:** Server-Sent Events (SSE) stream

**Query Parameters:**
- `containerName` (optional) - Specific container name in pod
- `previous` (optional, default: `false`) - Get logs from previous container instance
- `tailLines` (optional, default: `100`) - Number of lines to tail from end
- `severity` (optional) - Filter by log level (ERROR, WARN, INFO, DEBUG)
- `search` (optional) - Search for text in log lines
- `since` (optional) - ISO 8601 timestamp to start from
- `until` (optional) - ISO 8601 timestamp to end at

**SSE Event Format:**
```
event: connected
data: {"success":true,"message":"Streaming logs for container: nginx in pod: api-server-abc123"}

event: log
data: 2024-02-06T14:00:00Z [INFO] Starting nginx process...

event: log
data: 2024-02-06T14:00:01Z [INFO] Configuration loaded

event: error
data: {"success":false,"message":"Failed to read logs: Pod not found"}
```

### Aggregate Logs from Multiple Pods

```http
POST /api/v1/logs/aggregate
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "namespace": "production",
  "podNames": ["api-server-1", "api-server-2", "api-server-3"],
  "containerName": "nginx",
  "filters": {
    "severity": "ERROR",
    "search": "connection timeout"
  }
}
```

**Response:** SSE stream with pod name prefix for each line

```
event: connected
data: {"success":true,"message":"Aggregating logs from 3 pods"}

event: log
data: [api-server-1] 2024-02-06T14:00:00Z [ERROR] Connection timeout

event: log
data: [api-server-2] 2024-02-06T14:00:00Z [INFO] Request received

event: log
data: [api-server-3] 2024-02-06T14:00:00Z [INFO] Processing request
```

### Download Pod Logs

```http
GET /api/v1/pods/{namespace}/{name}/logs/download?format={fmt}&containerName={cn}&previous={bool}
Authorization: Bearer <access_token>
```

**Query Parameters:**
- `format` (optional, default: `text`) - Download format: `text`, `gzip`
- `containerName` (optional) - Specific container name
- `previous` (optional, default: `false`) - Get logs from previous container

**Response:**
- Content-Type: `text/plain` or `application/gzip`
- Content-Disposition: `attachment; filename="{pod-name}_{timestamp}.log"` or `.log.gz`

### Save Log Bookmark

```http
POST /api/v1/logs/bookmarks
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "namespace": "production",
  "podName": "api-server-abc123",
  "containerName": "nginx",
  "lineNumber": 1234,
  "timestamp": "2024-02-06T14:30:00Z",
  "logLine": "2024-02-06T14:30:00Z [ERROR] Database connection failed",
  "annotation": "Critical error - investigate immediately"
}
```

Response:
```json
{
  "success": true,
  "data": {
    "id": 1,
    "namespace": "production",
    "podName": "api-server-abc123",
    "lineNumber": 1234,
    "timestamp": "2024-02-06T14:30:00Z"
  },
  "message": "Bookmark saved"
}
```

### List Log Bookmarks

```http
GET /api/v1/logs/bookmarks?namespace={ns}&podName={name}
Authorization: Bearer <access_token>
```

Response:
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "namespace": "production",
      "podName": "api-server-abc123",
      "containerName": "nginx",
      "lineNumber": 1234,
      "timestamp": "2024-02-06T14:30:00Z",
      "logLine": "2024-02-06T14:30:00Z [ERROR] Database connection failed",
      "annotation": "Critical error - investigate immediately",
      "createdAt": "2024-02-06T14:35:00Z"
    },
    {
      "id": 2,
      "namespace": "production",
      "podName": "api-server-abc123",
      "containerName": "nginx",
      "lineNumber": 1250,
      "timestamp": "2024-02-06T14:35:00Z",
      "logLine": "2024-02-06T14:35:00Z [INFO] Retrying connection...",
      "annotation": "Auto-retry mechanism",
      "createdAt": "2024-02-06T14:40:00Z"
    }
  ]
}
```

### Delete Log Bookmark

```http
DELETE /api/v1/logs/bookmarks/{bookmarkId}
Authorization: Bearer <access_token>
```

### Export Logs to External System

```http
POST /api/v1/logs/export-external
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "namespace": "production",
  "podNames": ["api-server-1", "api-server-2"],
  "externalSystem": "ELK",
  "config": {
    "endpoint": "https://elk.example.com/_bulk",
    "index": "k8s-logs-*",
    "apiKey": "xxx"
  },
  "timeRange": {
    "since": "2024-02-06T10:00:00Z",
    "until": "2024-02-06T14:00:00Z"
  },
  "filters": {
    "severity": ["ERROR", "WARN"]
  }
}
```

**Supported External Systems:**
- `ELK` - Elasticsearch/Kibana
- `LOKI` - Grafana Loki
- `SPLUNK` - Splunk
- `CUSTOM` - Custom HTTP endpoint

---

## Log Parsing

### JSON Log Detection

Automatic detection of JSON-formatted logs and structured display.

**Example JSON Log:**
```json
{"timestamp":"2024-02-06T14:00:00Z","level":"INFO","message":"Request processed","duration_ms":123,"user_id":"user123"}
```

**Structured Display:**
```typescript
interface LogEntry {
  timestamp: string;
  level: 'INFO' | 'WARN' | 'ERROR' | 'DEBUG';
  message: string;
  duration_ms?: number;
  user_id?: string;
  [key: string]: any;
}

function LogViewer({ logLine }: { logLine: string }) {
  const jsonMatch = logLine.match(/^\{.*\}$/);

  if (jsonMatch) {
    const logData = JSON.parse(jsonMatch[0]);
    return <StructuredLogView data={logData} />;
  } else {
    return <PlainTextLogView line={logLine} />;
  }
}
```

---

## Frontend Components

### LogViewer Component

```typescript
function LogViewer({ namespace, podName }: LogViewerProps) {
  const [severity, setSeverity] = useState<string | undefined>();
  const [search, setSearch] = useState('');
  const [follow, setFollow] = useState(true);
  const [pause, setPause] = useState(false);
  const eventSource = useEventSource(`/api/v1/pods/${namespace}/${podName}/logs`);

  useEffect(() => {
    eventSource.addEventListener('log', (event: MessageEvent) => {
      if (!pause) {
        appendLogLine(event.data);
      }
    });

    eventSource.addEventListener('error', (event: MessageEvent) => {
      const error = JSON.parse(event.data);
      showErrorToast(error.message);
    });
  }, [eventSource, pause]);

  const filteredLogs = logs.filter(log =>
    filterBySeverity(log, severity) &&
    filterBySearch(log, search)
  );

  return (
    <div>
      <LogToolbar
        severity={severity}
        onSeverityChange={setSeverity}
        search={search}
        onSearchChange={setSearch}
        follow={follow}
        onFollowChange={setFollow}
        pause={pause}
        onPauseChange={setPause}
        bookmarksAvailable={true}
      />
      <LogContainer>
        {filteredLogs.map((log, index) => (
          <LogLine
            key={`${podName}-${index}`}
            line={log}
            lineNumber={index + 1}
            bookmarked={isBookmarked(log)}
            onBookmark={() => toggleBookmark(log)}
          />
        ))}
        <ScrollButton onClick={handleScroll} />
      </LogContainer>
      <LogPagination />
    </div>
  );
}
```

### AggregateLogs Component

```typescript
function AggregateLogs() {
  const [selectedPods, setSelectedPods] = useState<string[]>([]);
  const [aggregateSettings, setAggregateSettings] = useState({
    severity: undefined,
    search: ''
  });

  const availablePods = usePods();

  const handleAggregate = async () => {
    const response = await api.post('/api/v1/logs/aggregate', {
      namespace: 'production',
      podNames: selectedPods,
      filters: aggregateSettings
    });

    navigateToAggregateStream(response.data.streamUrl);
  };

  return (
    <Dialog>
      <h2>Aggregate Logs from Multiple Pods</h2>

      <PodSelector
        pods={availablePods}
        selected={selectedPods}
        onChange={setSelectedPods}
        maxSelection={5}
      />

      <FilterControls
        severity={aggregateSettings.severity}
        search={aggregateSettings.search}
        onChange={setAggregateSettings}
      />

      <Button onClick={handleAggregate} disabled={selectedPods.length === 0}>
        Start Aggregation
      </Button>
    </Dialog>
  );
}
```

### LogExportDialog Component

```typescript
function LogExportDialog({ isOpen, onClose }: DialogProps) {
  const [format, setFormat] = useState<'text' | 'gzip'>('text');
  const [externalSystem, setExternalSystem] = useState<string | undefined>();

  const handleDownload = async () => {
    const response = await api.get(`/api/v1/pods/${namespace}/${podName}/logs/download`, {
      params: { format }
    });

    downloadFile(response.data, `${podName}_${timestamp}.log`);
  };

  const handleExternalExport = async () => {
    await api.post('/api/v1/logs/export-external', {
      namespace,
      podNames: [podName],
      externalSystem,
      timeRange: { since, until }
    });

    showToast('Logs exported to ' + externalSystem);
  };

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <h2>Export Logs</h2>

      <RadioGroup
        label="Format"
        value={format}
        onChange={setFormat}
        options={[
          { value: 'text', label: 'Plain Text' },
          { value: 'gzip', label: 'GZIP Compressed' }
        ]}
      />

      <Button onClick={handleDownload}>Download</Button>

      <Divider />

      <Select
        label="Export to External System"
        value={externalSystem}
        onChange={setExternalSystem}
        options={[
          { value: 'ELK', label: 'Elasticsearch/Kibana' },
          { value: 'LOKI', label: 'Grafana Loki' },
          { value: 'SPLUNK', label: 'Splunk' },
          { value: 'CUSTOM', label: 'Custom Endpoint' }
        ]}
      />

      {externalSystem && (
        <>
          <Input label="Endpoint" value={endpoint} onChange={setEndpoint} />
          <Button onClick={handleExternalExport}>Export</Button>
        </>
      )}
    </Dialog>
  );
}
```

---

## RBAC Permissions

| Operation | Permission Required |
|-----------|-------------------|
| Stream pod logs | LOGS + POD |
| Aggregate logs (multiple pods) | LOGS + POD |
| Download logs | LOGS + POD |
| Save bookmarks | LOGS + POD |
| Export to external system | LOGS + POD |

---

## Performance Considerations

1. **SSE Rate Limiting**: 5 concurrent log streams per user
2. **Aggregation Limit**: Maximum 5 pods per aggregation request
3. **Log Buffer**: 10,000 lines in memory buffer
4. **Bookmark Storage**: Retained for 30 days
5. **Export Timeout**: 30 seconds for external system exports

---

## Configuration

```properties
# Log Streaming
log.streaming.buffer-size=10000
log.streaming.sse-timeout-seconds=300

# Aggregation
log.aggregation.max-pods=5
log.aggregation.timeout-seconds=60

# Bookmarks
log.bookmarks.retention-days=30
log.bookmarks.max-per-user=100

# Export
log.export.max-size-mb=100
log.export.timeout-seconds=30

# External Systems
log.export.elk.enabled=true
log.export.loki.enabled=true
log.export.splunk.enabled=true
```

---

## Testing

```java
@SpringBootTest
@AutoConfigureMockMvc
public class PodLogControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    public void testStreamLogs() throws Exception {
        MvcResult result = mockMvc.perform(get("/api/v1/pods/default/test-pod/logs")
                .header("Authorization", "Bearer " + token));

        result.andExpect(status().isOk());

        // Verify SSE stream
        verify(response.getResponse().getContentType()).contains("text/event-stream");
    }

    @Test
    public void testDownloadLogs() throws Exception {
        mockMvc.perform(get("/api/v1/pods/default/test-pod/logs/download")
                .header("Authorization", "Bearer " + token)
                .param("format", "text"))
            .andExpect(status().isOk())
            .andExpect(header().string("Content-Disposition"))
            .contains("test-pod_"));
    }

    @Test
    public void testAggregateLogsUnauthorized() throws Exception {
        mockMvc.perform(post("/api/v1/logs/aggregate")
                .contentType(MediaType.APPLICATION_JSON)
                .header("Authorization", "Bearer " + unauthorizedToken)
                .content("{\"podNames\":[\"pod1\"],\"namespace\":\"default\"}"))
            .andExpect(status().isForbidden());
    }
}
```

---

## Future Enhancements

- [ ] Live log tailing with auto-scroll
- [ ] Log line highlighting based on patterns
- [ ] Multi-container log viewing side-by-side
- [ ] Log correlation across services
- [ ] Log anomaly detection
- [ ] Custom log parsers (regex-based)
- [ ] Log replay functionality
- [ ] Log sharing with expiration
- [ ] External system authentication
- [ ] Advanced bookmarking (collections, tags)
- [ ] Log volume monitoring and alerting
