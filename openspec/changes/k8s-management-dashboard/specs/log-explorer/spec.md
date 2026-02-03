## ADDED Requirements

### Requirement: Pod log streaming
The system SHALL stream pod logs in real-time using Server-Sent Events (SSE) with configurable tail lines and follow mode.

#### Scenario: View pod logs with follow mode
- **WHEN** user opens a pod's logs with "Follow" enabled
- **THEN** system streams new log entries as they are generated

#### Scenario: View last 100 lines
- **WHEN** user sets tail lines to 100 and opens pod logs
- **THEN** system displays the last 100 lines of the pod log

### Requirement: Container selection for multi-container pods
The system SHALL allow users to select which container's logs to view for pods with multiple containers.

#### Scenario: Select container for logs
- **WHEN** user views a multi-container pod and selects "sidecar" container
- **THEN** system displays logs from the selected container only

### Requirement: Log filtering by severity
The system SHALL allow filtering log lines by severity level (INFO, WARNING, ERROR, DEBUG).

#### Scenario: Filter logs by ERROR level
- **WHEN** user applies a filter showing only ERROR severity lines
- **THEN** system displays only log lines containing ERROR level

### Requirement: Log text search
The system SHALL allow searching log lines by text keyword or regular expression pattern.

#### Scenario: Search logs by keyword
- **WHEN** user searches for "timeout" keyword in pod logs
- **THEN** system displays only log lines containing "timeout"

#### Scenario: Search logs by regex pattern
- **WHEN** user searches with regex pattern "error \d{3}"
- **THEN** system displays log lines matching the pattern

### Requirement: Log time range filtering
The System SHALL allow filtering logs by time range with selectable presets and custom ranges.

#### Scenario: View logs for last hour
- **WHEN** user selects "Last 1 hour" time range
- **THEN** system displays log entries from the last hour

#### Scenario: View logs with custom range
- **WHEN** user specifies custom start and end times
- **THEN** system displays log entries within the specified time range

### Requirement: Log download
The system SHALL allow users to download pod logs as plain text or compressed files.

#### Scenario: Download logs as text
- **WHEN** user clicks "Download" and selects plain text format
- **THEN** system downloads the pod logs as a .txt file

#### Scenario: Download logs as compressed file
- **WHEN** user clicks "Download" and selects gzip format
- **THEN** system downloads the pod logs as a .txt.gz file

### Requirement: Previous container logs
The system SHALL allow users to view logs from previously terminated containers for pods that have restarted.

#### Scenario: View previous container logs
- **WHEN** user selects "Previous" container instance for a restarted pod
- **THEN** system displays logs from the terminated container instance

### Requirement: Log highlighting
The system SHALL provide syntax highlighting and color coding for log lines based on severity or custom patterns.

#### Scenario: View highlighted logs
- **WHEN** user views pod logs with highlighting enabled
- **THEN** system displays logs with color-coded severity levels

### Requirement: Log line wrapping
The system SHALL allow toggling log line wrapping between wrapped and unwrapped modes.

#### Scenario: Toggle line wrapping
- **WHEN** user clicks "Wrap Lines" toggle button
- **THEN** system switches between wrapped and unwrapped display modes

### Requirement: Log statistics
The system SHALL display statistics including total lines, error count, warning count, and log volume.

#### Scenario: View log statistics
- **WHEN** user views pod logs
- **THEN** system displays total lines, error count, warning count, and total bytes

### Requirement: Namespace log search
The system SHALL allow searching logs across multiple pods within a namespace.

#### Scenario: Search logs across namespace
- **WHEN** user enters a search term and selects a namespace
- **THEN** system displays matching log entries from all pods in the namespace

### Requirement: Log bookmarking
The system SHALL allow users to bookmark specific log lines for later reference.

#### Scenario: Bookmark log line
- **WHEN** user clicks "Bookmark" on a specific log line
- **THEN** system saves the bookmark with timestamp and line number

#### Scenario: View saved bookmarks
- **WHEN** user navigates to the bookmarks section
- **THEN** system displays all saved log line bookmarks

### Requirement: Log sharing
The system SHALL allow users to share log views with other users through shareable URLs.

#### Scenario: Share log view
- **WHEN** user clicks "Share" and copies the generated URL
- **THEN** system creates a shareable URL that recreates the same log view with filters

### Requirement: Log export to external system
The system SHALL allow exporting logs to external logging systems (ELK, Loki, Splunk).

#### Scenario: Export logs to ELK
- **WHEN** user selects "Export to ELK" for a pod's logs
- **THEN** system sends the logs to the configured ELK instance

### Requirement: Log aggregation across multiple pods
The system SHALL allow viewing and searching logs from multiple selected pods simultaneously.

#### Scenario: Aggregate logs from multiple pods
- **WHEN** user selects 3 pods and clicks "Aggregate Logs"
- **THEN** system displays interleaved logs from all selected pods

### Requirement: Log annotation
The system SHALL allow users to add annotations to log lines for context and collaboration.

#### Scenario: Annotate log line
- **WHEN** user adds an annotation to a log line with a note
- **THEN** system saves the annotation with user, timestamp, and note

### Requirement: Log query history
The system SHALL maintain a history of log queries and filters for quick re-execution.

#### Scenario: View query history
- **WHEN** user clicks "Query History"
- **THEN** system displays previous log queries with timestamps

#### Scenario: Re-run previous query
- **WHEN** user selects a previous query from history
- **THEN** system re-executes the query with the same parameters

### Requirement: Log auto-scroll control
The system SHALL provide controls to pause and resume auto-scrolling in follow mode.

#### Scenario: Pause auto-scroll
- **WHEN** user clicks "Pause" while viewing logs in follow mode
- **THEN** system stops auto-scrolling to allow reading current logs

#### Scenario: Resume auto-scroll
- **WHEN** user clicks "Resume" after pausing
- **THEN** system resumes auto-scrolling to new log entries

### Requirement: Log parsing and structuring
The system SHALL attempt to parse and structure JSON or structured log formats for better visualization.

#### Scenario: View structured JSON logs
- **WHEN** pod logs contain JSON-formatted entries
- **THEN** system displays them as structured, collapsible objects

### Requirement: Log retention policy
The system SHALL respect K8s log retention policies and display warnings when logs are truncated due to rotation.

#### Scenario: Warning for truncated logs
- **WHEN** pod logs have been rotated and are incomplete
- **THEN** system displays a warning that logs are truncated
