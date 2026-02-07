# Alert Notification System

## Overview

Alert Notification System provides comprehensive alerting capabilities with multiple notification channels, real-time delivery, alert history, acknowledgment, and suppression.

---

## Features

1. **Multiple Notification Channels** - Email, Slack, PagerDuty, Webhooks
2. **Real-time Notifications** - WebSocket-based live alert delivery
3. **Alert History** - Track all triggered and acknowledged alerts
4. **Alert Configuration** - Threshold-based alert rules per resource type
5. **Alert Acknowledgment** - Mark alerts as acknowledged and resolved
6. **Alert Suppression** - Temporarily disable specific alerts
7. **Alert Escalation** - Route critical alerts to on-call teams
8. **Notification Preferences** - User-specific notification settings
9. **Alert Templates** - Pre-built alert rule templates

---

## API Endpoints

### Configure Alert

```http
POST /api/v1/notifications/configure
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "resourceType": "POD",
  "resourceName": "api-server",
  "metricType": "CPU",
  "threshold": {
    "operator": "greater_than",
    "value": 80,
    "unit": "percent"
  },
  "duration": "5m",
  "channels": ["email", "slack"]
}
```

Response:
```json
{
  "success": true,
  "message": "Alert configured successfully"
}
```

### Get Alert History

```http
GET /api/v1/notifications/history?namespace={ns}&severity={level}&acknowledged={bool}
Authorization: Bearer <access_token>
```

**Query Parameters:**
- `namespace` (optional) - Filter by namespace
- `severity` (optional) - Filter by severity: `INFO`, `WARNING`, `CRITICAL`
- `acknowledged` (optional) - Filter by acknowledgment status

Response:
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "alertId": "alert-123",
      "resourceType": "POD",
      "resourceName": "api-server-abc123",
      "namespace": "production",
      "severity": "CRITICAL",
      "message": "CPU usage exceeded 80% threshold",
      "metricValue": 85.5,
      "thresholdValue": 80,
      "unit": "percent",
      "triggeredAt": "2024-02-06T14:30:00Z",
      "acknowledgedAt": null,
      "acknowledgedBy": null
    },
    {
      "id": 2,
      "alertId": "alert-124",
      "resourceType": "NAMESPACE",
      "resourceName": "production",
      "severity": "WARNING",
      "message": "Memory usage approaching quota limit",
      "metricValue": 14.2,
      "thresholdValue": 16,
      "unit": "Gi",
      "triggeredAt": "2024-02-06T14:00:00Z",
      "acknowledgedAt": "2024-02-06T14:45:00Z",
      "acknowledgedBy": "admin@example.com"
    }
  ]
}
```

### Acknowledge Alert

```http
POST /api/v1/notifications/{alertId}/acknowledge
Authorization: Bearer <access_token>
```

Response:
```json
{
  "success": true,
  "message": "Alert acknowledged"
}
```

### Get Notification Preferences

```http
GET /api/v1/notifications/preferences
Authorization: Bearer <access_token>
```

Response:
```json
{
  "success": true,
  "data": {
    "email": {
      "enabled": true,
      "address": "user@example.com",
      "severityThreshold": "CRITICAL"
    },
    "slack": {
      "enabled": true,
      "webhookUrl": "https://hooks.slack.com/services/...",
      "severityThreshold": "WARNING"
    },
    "pagerduty": {
      "enabled": false,
      "apiKey": "",
      "severityThreshold": "CRITICAL"
    },
    "webhook": {
      "enabled": true,
      "url": "https://api.example.com/webhook",
      "severityThreshold": "INFO"
    }
  }
}
```

### Update Notification Preferences

```http
PUT /api/v1/notifications/preferences
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "email": {
    "enabled": true,
    "address": "user@example.com",
    "severityThreshold": "CRITICAL"
  },
  "slack": {
    "enabled": true,
    "webhookUrl": "https://hooks.slack.com/services/...",
    "severityThreshold": "WARNING"
  }
}
```

Response:
```json
{
  "success": true,
  "message": "Preferences updated"
}
```

---

## Notification Channels

### Email Notifications

```http
POST /api/v1/notifications/send/email
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "to": ["user@example.com", "ops@example.com"],
  "subject": "Alert: CPU usage exceeded",
  "body": "Alert: CPU usage for pod api-server-abc123 exceeded 80% threshold\n\nTimestamp: 2024-02-06T14:30:00Z\n\nSeverity: CRITICAL",
  "html": "<html><body>...</body></html>"
}
```

### Slack Notifications

```http
POST /api/v1/notifications/send/slack
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "webhookUrl": "https://hooks.slack.com/services/T1234567890",
  "channel": "#ops-alerts",
  "username": "k8s-manager-bot",
  "blocks": [
    {
      "type": "section",
      "text": {
        "type": "mrkdwn",
        "text": "🚨 CPU Alert"
      },
      "fields": [
        {
          "type": "mrkdwn",
          "text": "Pod",
          "value": "api-server-abc123"
        }
      ]
    }
  ]
}
```

### PagerDuty Notifications

```http
POST /api/v1/notifications/send/pagerduty
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "routingKey": "abc123",
  "eventAction": "trigger",
  "severity": "critical",
  "description": "CPU usage exceeded 80% threshold",
  "incidentKey": "K8S-CPU-ALERT",
  "dedupKey": "api-server-production-cpu"
}
```

### Webhook Notifications

```http
POST /api/v1/notifications/send/webhook
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "url": "https://api.example.com/webhook",
  "method": "POST",
  "headers": {
    "Content-Type": "application/json"
  },
  "body": {
    "alertId": "alert-123",
    "severity": "CRITICAL",
    "resourceType": "POD",
    "resourceName": "api-server-abc123",
    "message": "CPU usage exceeded 80% threshold",
    "triggeredAt": "2024-02-06T14:30:00Z",
    "metricValue": 85.5,
    "thresholdValue": 80
  }
}
```

---

## Alert Severity Levels

| Severity | Color | Description | Typical Use |
|-----------|-------|-------------|------------|
| INFO | Blue | Informational, state changes, successful operations |
| WARNING | Yellow | Approaching thresholds, degraded performance |
| CRITICAL | Red | Service down, thresholds exceeded, critical errors |

## Alert Templates

### Built-in Templates

**1. High CPU Usage**
```json
{
  "id": "high-cpu",
  "name": "High CPU Usage",
  "description": "Alert when CPU usage exceeds 80%",
  "rules": [
    {
      "resourceType": "POD",
      "metricType": "CPU",
      "operator": "greater_than",
      "value": 80,
      "unit": "percent",
      "severity": "CRITICAL",
      "duration": "5m"
    }
  ]
}
```

**2. Memory Near Limit**
```json
{
  "id": "memory-near-limit",
  "name": "Memory Near Limit",
  "description": "Alert when memory usage exceeds 90% of quota",
  "rules": [
    {
      "resourceType": "NAMESPACE",
      "metricType": "MEMORY",
      "operator": "greater_than",
      "value": 90,
      "unit": "percent",
      "severity": "WARNING",
      "duration": "10m"
    }
  ]
}
```

**3. Pod Crash Loop**
```json
{
  "id": "pod-crash-loop",
  "name": "Pod Crash Loop",
  "description": "Alert when pod restarts 3+ times in 5 minutes",
  "rules": [
    {
      "resourceType": "POD",
      "condition": "status.phase == Running AND restartCount > 3",
      "severity": "CRITICAL",
      "duration": "5m",
      "window": "5m"
    }
  ]
}
```

---

## Frontend Components

### NotificationCenter Component

```typescript
function NotificationCenter() {
  const { data: notifications } = useNotifications();
  const [filter, setFilter] = useState('');
  const [severity, setSeverity] = useState<string | undefined>();

  const filtered = notifications?.filter(n =>
    (!severity || n.severity === severity)
  );

  const handleAcknowledge = async (alertId: number) => {
    await api.post(`/api/v1/notifications/${alertId}/acknowledge`);
    showToast('Alert acknowledged');
  };

  return (
    <div>
      <NotificationHeader
        count={notifications?.length || 0}
        onOpenPreferences={() => openPreferencesDialog()}
      />

      <FilterControls
        search={filter}
        onChange={setFilter}
        severity={severity}
        onChange={setSeverity}
      />

      <NotificationList
        notifications={filtered}
        onAcknowledge={handleAcknowledge}
      />
    </div>
  );
}
```

### NotificationPreferencesDialog Component

```typescript
function NotificationPreferencesDialog({ isOpen, onClose }: DialogProps) {
  const { data: preferences } = useNotificationPreferences();
  const [email, setEmail] = useState(preferences?.email?.enabled ? true : false);
  const [slack, setSlack] = useState(preferences?.slack?.enabled ? true : false);
  const [pagerduty, setPagerDuty] = useState(preferences?.pagerduty?.enabled ? true : false);
  const [webhook, setWebhook] = useState(preferences?.webhook?.enabled ? true : false);

  const handleSave = async () => {
    await api.put('/api/v1/notifications/preferences', {
      email: { enabled: email, address: email },
      slack: { enabled: slack, webhookUrl: slack?.webhookUrl },
      pagerduty: { enabled: pagerduty, apiKey: pagerduty?.apiKey },
      webhook: { enabled: webhook, url: webhook?.url }
    });

    showToast('Preferences saved');
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <h2>Notification Preferences</h2>

      <ChannelConfig
        channel="email"
        enabled={email}
        address={email}
        severityThreshold={preferences?.email?.severityThreshold || 'CRITICAL'}
      />

      <ChannelConfig
        channel="slack"
        enabled={slack}
        webhookUrl={slack?.webhookUrl}
        severityThreshold={preferences?.slack?.severityThreshold || 'WARNING'}
      />

      <ChannelConfig
        channel="pagerduty"
        enabled={pagerduty}
        apiKey={pagerduty?.apiKey}
        severityThreshold={preferences?.pagerduty?.severityThreshold || 'CRITICAL'}
      />

      <ChannelConfig
        channel="webhook"
        enabled={webhook}
        url={webhook?.url}
        severityThreshold={preferences?.webhook?.severityThreshold || 'INFO'}
      />

      <Button onClick={handleSave}>Save Preferences</Button>
    </Dialog>
  );
}
```

### AlertDetail Component

```typescript
function AlertDetail({ alert }: AlertDetailProps) {
  return (
    <Card className="alert-card">
      <AlertHeader
        severity={alert.severity}
        timestamp={alert.triggeredAt}
        title={alert.title}
      />

      <AlertBody>
        <ResourceInfo
          type={alert.resourceType}
          name={alert.resourceName}
          namespace={alert.namespace}
        />

        <MetricInfo>
          metric={alert.metricType}
          value={alert.metricValue}
          threshold={alert.thresholdValue}
          unit={alert.unit}
          condition={alert.condition}
        />

        <Message>{alert.message}</Message>

        <AlertActions>
          <Button onClick={() => viewResource(alert)}>
            View Resource
          </Button>
          <Button onClick={() => acknowledgeAlert(alert.id)}>
            Acknowledge
          </Button>
        </AlertActions>
      </Card>
  );
}
```

---

## RBAC Permissions

| Operation | Permission Required |
|-----------|-------------------|
| View alert history | READ + NOTIFICATION |
| Acknowledge alert | WRITE + NOTIFICATION |
| Configure preferences | WRITE + NOTIFICATION |
| Manage notification channels | ADMIN |

---

## WebSocket Protocol

### Real-time Notification Stream

```
Client                                      Server
  |                                            |
  | --- WebSocket Upgrade --------------> |
  |   < wss://.../ws/notifications       |
  |                                            |
  |   <----------------------------------> |
  |                                            |
  |   Notification events (JSON)            |
  |   <---------------------------------- |
  |                                            |
```

### Notification Event Types

```typescript
interface NotificationEvent {
  type: 'alert' | 'alert_acknowledged';
  data: Alert | Acknowledgment;
  timestamp: string;
}
```

**Alert Event:**
```json
{
  "type": "alert",
  "data": {
    "id": "alert-123",
    "severity": "CRITICAL",
    "message": "CPU usage exceeded 80% threshold",
    "resourceType": "POD",
    "resourceName": "api-server-abc123",
    "triggeredAt": "2024-02-06T14:30:00Z",
    "metricValue": 85.5,
    "thresholdValue": 80
  }
}
```

**Acknowledgment Event:**
```json
{
  "type": "alert_acknowledged",
  "data": {
    "alertId": "alert-123",
    "acknowledgedAt": "2024-02-06T14:45:00Z",
    "acknowledgedBy": "user@example.com"
  }
}
```

---

## Configuration

```properties
# Notification System
notification.enabled=true
notification.websocket.enabled=true
notification.websocket.reconnect-interval-seconds=5

# Email
notification.email.enabled=true
notification.email.from=noreply@k8s-manager.com
notification.email.smtp.host=${SMTP_HOST}
notification.email.smtp.port=587
notification.email.smtp.username=${SMTP_USER}
notification.email.smtp.password=${SMTP_PASSWORD}
notification.email.tls=true

# Slack
notification.slack.enabled=true
notification.slack.webhook.url=${SLACK_WEBHOOK_URL}
notification.slack.timeout-seconds=30

# PagerDuty
notification.pagerduty.enabled=false
notification.pagerduty.api-key=${PAGERDUTY_API_KEY}
notification.pagerduty.service-key=${PAGERDUTY_SERVICE_KEY}
notification.pagerduty.timeout-seconds=10

# Webhook
notification.webhook.enabled=true
notification.webhook.timeout-seconds=10
notification.webhook.max-size-kb=1024
```

---

## Testing

```java
@SpringBootTest
@AutoConfigureMockMvc
public class NotificationControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    public void testGetAlertHistory() throws Exception {
        mockMvc.perform(get("/api/v1/notifications/history")
                .header("Authorization", "Bearer " + token))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.success").value(true))
            .andExpect(jsonPath("$.data").isArray());
    }

    @Test
    public void testAcknowledgeAlert() throws Exception {
        mockMvc.perform(post("/api/v1/notifications/123/acknowledge")
                .header("Authorization", "Bearer " + token))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.success").value(true));
    }

    @Test
    public void testSendSlackNotification() throws Exception {
        mockMvc.perform(post("/api/v1/notifications/send/slack")
                .contentType(MediaType.APPLICATION_JSON)
                .header("Authorization", "Bearer " + token)
                .content("{\"channel\":\"#ops-alerts\",\"blocks\":[{\"type\":\"section\",\"text\":{\"type\":\"mrkdwn\",\"text\":\"Pod\",\"value\":\"api-server\"}]}"))
            .andExpect(status().isOk());
    }
}
```

---

## Future Enhancements

- [ ] Alert grouping and correlation
- [ ] Intelligent alert routing (based on on-call rotation)
- [ ] Alert templates marketplace (community-contributed templates)
- [ ] Multi-channel failover (if Slack fails, try PagerDuty)
- [ ] Alert deduplication (suppress duplicate alerts)
- [ ] Alert escalation policy (auto-escalate after X minutes)
- [ ] Custom alert actions (integrate with runbooks, chat tools)
- [ ] Alert analytics dashboard (visualize alert trends)
- [ ] Maintenance mode (batch alert suppression during deployments)
- [ ] Scheduled alerts (time-based alert rules, e.g., business hours only)
- [ ] ML-powered anomaly prediction (predict future issues)
- [ ] Integration with external monitoring tools (Datadog, New Relic)
