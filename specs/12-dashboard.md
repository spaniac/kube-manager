# Dashboard

## Overview

Dashboard provides a unified view for monitoring cluster health, resource usage, and custom metrics with customizable widgets and real-time data updates.

---

## Features

1. **Cluster Overview Dashboard** - Built-in cluster summary with key metrics
2. **Custom Dashboards** - Create, edit, and manage user-defined dashboards
3. **Widget Library** - Drag-and-drop widgets for visualization
4. **Real-time Updates** - WebSocket-based live data streaming
5. **Dashboard Sharing** - Share dashboards with other users
6. **Dashboard Templates** - Pre-built dashboard templates
7. **Widget Configuration** - Configure widget properties (time range, refresh interval)
8. **Multi-dashboard Support** - Switch between multiple dashboards
9. **Export/Import** - Backup and restore dashboard configurations

---

## API Endpoints

### Get Cluster Overview Dashboard

```http
GET /api/v1/dashboards/cluster-overview
Authorization: Bearer <access_token>
```

Response:
```json
{
  "success": true,
  "data": {
    "name": "Cluster Overview",
    "widgets": [
      {
        "id": "node-health",
        "type": "StatusBadges",
        "title": "Node Health",
        "position": { "x": 0, "y": 0, "w": 4, "h": 2 },
        "config": {
          "refreshInterval": 30000,
          "data": "node-status"
        }
      },
      {
        "id": "resource-usage",
        "type": "MetricChart",
        "title": "Resource Usage",
        "position": { "x": 5, "y": 0, "w": 4, "h": 2 },
        "config": {
          "metricType": "cpu",
          "timeRange": "1h",
          "refreshInterval": 30000
        }
      },
      {
        "id": "namespace-stats",
        "type": "StatTable",
        "title": "Namespace Statistics",
        "position": { "x": 0, "y": 4, "w": 4, "h": 3 },
        "config": {
          "sortBy": "podCount",
          "limit": 10
        }
      },
      {
        "id": "recent-events",
        "type": "EventList",
        "title": "Recent Events",
        "position": { "x": 5, "y": 0, "w": 4, "h": 4 },
        "config": {
          "limit": 10,
          "severity": ["WARNING", "ERROR"]
        }
      }
    ],
    "lastUpdated": "2024-02-06T14:00:00Z"
  }
}
```

### List User Dashboards

```http
GET /api/v1/dashboards
Authorization: Bearer <access_token>
```

Response:
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Production Monitoring",
      "description": "Production cluster monitoring",
      "widgets": [ ... ],
      "isDefault": true,
      "createdAt": "2024-02-01T10:00:00Z",
      "lastModified": "2024-02-06T14:00:00Z"
    },
    {
      "id": 2,
      "name": "Development Dashboard",
      "description": "Development environment metrics",
      "widgets": [ ... ],
      "isDefault": false,
      "createdAt": "2024-02-05T08:30:00Z",
      "lastModified": "2024-02-06T13:30:00Z"
    }
  ]
}
```

### Get Dashboard Details

```http
GET /api/v1/dashboards/{id}
Authorization: Bearer <access_token>
```

Response:
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Production Monitoring",
    "description": "Production cluster monitoring",
    "widgets": [ ... ],
    "isDefault": false,
    "createdAt": "2024-02-01T10:00:00Z",
    "lastModified": "2024-02-06T14:00:00Z"
  }
}
```

### Create Dashboard

```http
POST /api/v1/dashboards
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "name": "Application Dashboard",
  "description": "Application-specific metrics",
  "widgets": [],
  "layout": {
    "columns": 2,
    "rows": 3
  }
}
```

Response:
```json
{
  "success": true,
  "data": {
    "id": 3,
    "name": "Application Dashboard",
    "description": "Application-specific metrics",
    "widgets": [],
    "layout": { ... },
    "createdAt": "2024-02-06T14:30:00Z",
    "lastModified": "2024-02-06T14:30:00Z"
  },
  "message": "Dashboard created successfully"
}
```

### Update Dashboard

```http
PUT /api/v1/dashboards/{id}
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "name": "Application Dashboard",
  "description": "Updated description",
  "widgets": [...]
}
```

Response:
```json
{
  "success": true,
  "data": { ... },
  "message": "Dashboard updated successfully"
}
```

### Delete Dashboard

```http
DELETE /api/v1/dashboards/{id}
Authorization: Bearer <access_token>
```

Response:
```json
{
  "success": true,
  "message": "Dashboard deleted successfully"
}
```

### Get Widget Library

```http
GET /api/v1/dashboards/widgets
Authorization: Bearer <access_token>
```

Response:
```json
{
  "success": true,
  "data": {
    "widgets": [
      {
        "id": "metric-chart",
        "type": "MetricChart",
        "name": "CPU Usage",
        "description": "Display CPU metrics over time",
        "supportedMetrics": ["cpu", "memory", "network"],
        "config": {
          "metricTypes": ["cpu", "memory", "network"],
          "timeRanges": ["1h", "6h", "24h", "7d"],
          "refreshInterval": 30000
        }
      },
      {
        "id": "status-badges",
        "type": "StatusBadges",
        "name": "Pod Status",
        "description": "Display status badges for pods",
        "config": {
          "resourceType": "pod",
          "statusField": "status"
        }
      },
      {
        "id": "stat-table",
        "type": "StatTable",
        "name": "Namespace Statistics",
        "description": "Display statistics table",
        "config": {
          "columns": ["name", "podCount", "status"],
          "sortBy": "podCount",
          "limit": 10
        }
      },
      {
        "id": "event-list",
        "type": "EventList",
        "name": "Recent Events",
        "description": "Display recent events",
        "config": {
          "limit": 10,
          "severity": ["WARNING", "ERROR"]
        }
      },
      {
        "id": "text-widget",
        "type": "Text",
        "name": "Custom Text",
        "description": "Display custom text/markdown",
        "config": {
          "markdown": true,
          "refreshInterval": 60000
        }
      }
    ]
  }
}
```

### Add Widget to Dashboard

```http
POST /api/v1/dashboards/{dashboardId}/widgets
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "widgetId": "metric-chart",
  "position": { "x": 1, "y": 1 },
  "config": {
    "title": "API Server CPU",
    "metricType": "cpu",
    "resource": {
      "namespace": "production",
      "podName": "api-server"
    },
    "timeRange": "1h"
  }
}
```

Response:
```json
{
  "success": true,
  "data": {
    "id": "widget-123",
    "dashboardId": 1,
    "widgetId": "metric-chart",
    "position": { "x": 1, "y": 1 },
    "config": { ... }
  },
  "message": "Widget added successfully"
}
```

### Update Widget

```http
PUT /api/v1/dashboards/{dashboardId}/widgets/{widgetId}
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "config": {
    "title": "API Server CPU (Updated)"
  }
}
```

Response:
```json
{
  "success": true,
  "message": "Widget updated successfully"
}
```

### Delete Widget

```http
DELETE /api/v1/dashboards/{dashboardId}/widgets/{widgetId}
Authorization: Bearer <access_token>
```

Response:
```json
{
  "success": true,
  "message": "Widget deleted successfully"
}
```

### Get Dashboard Templates

```http
GET /api/v1/dashboards/templates
Authorization: Bearer <access_token>
```

Response:
```json
{
  "success": true,
  "data": [
    {
      "id": "cluster-monitoring",
      "name": "Cluster Monitoring",
      "description": "Built-in cluster overview dashboard",
      "widgets": [
        {
          "type": "metric-chart",
          "config": {
            "metricType": "cpu",
            "resource": "cluster"
          }
        },
        {
          "type": "metric-chart",
          "config": {
            "metricType": "memory",
            "resource": "cluster"
          }
        },
        {
          "type": "status-badges",
          "config": {
            "resourceType": "node",
            "statusField": "status"
          }
        }
      ]
    },
    {
      "id": "application-monitoring",
      "name": "Application Monitoring",
      "description": "Application workload monitoring",
      "widgets": [ ... ]
    }
  ]
}
```

---

## Widget Types

### Metric Chart Widget

Display time-series metrics with customizable options.

**Configuration:**
```json
{
  "type": "MetricChart",
  "config": {
    "title": "CPU Usage",
    "metricType": "cpu",
    "resource": {
      "namespace": "production",
      "podName": "api-server"
    },
    "timeRange": "1h",
    "refreshInterval": 30000,
    "chartType": "line",
    "showLegend": true,
    "showGrid": true
  }
}
```

**Supported Metric Types:**
- `cpu` - CPU usage
- `memory` - Memory usage
- `network` - Network I/O
- `storage` - Disk usage
- `pod-count` - Number of pods

### Status Badges Widget

Display status badges for resources.

**Configuration:**
```json
{
  "type": "StatusBadges",
  "config": {
    "title": "Pod Status",
    "resourceType": "pod",
    "statusField": "status"
  }
}
```

**Supported Resource Types:**
- `pod` - Pod status badges
- `node` - Node status badges
- `deployment` - Deployment status badges
- `service` - Service status badges

### Stat Table Widget

Display tabular statistics.

**Configuration:**
```json
{
  "type": "StatTable",
  "config": {
    "title": "Namespace Statistics",
    "resource": "namespace",
    "columns": [
      {
        "field": "name",
        "label": "Name"
      },
      {
        "field": "podCount",
        "label": "Pods"
      },
      {
        "field": "status",
        "label": "Status"
      }
    ],
    "sortBy": "podCount",
    "limit": 10,
    "format": "compact"
  }
}
```

### Event List Widget

Display recent cluster events with filtering.

**Configuration:**
```json
{
  "type": "EventList",
  "config": {
    "title": "Recent Events",
    "limit": 10,
    "severity": ["WARNING", "ERROR"],
    "showTimestamp": true,
    "groupBy": "type"
  }
}
```

### Text Widget

Display custom text or markdown.

**Configuration:**
```json
{
  "type": "Text",
  "config": {
    "title": "Release Notes",
    "content": "# Release v1.2.0\n\n- Added feature X\n- Fixed bug Y",
    "markdown": true,
    "refreshInterval": 60000
  }
}
```

---

## Frontend Components

### DashboardView Component

```typescript
function DashboardView({ dashboardId }: DashboardViewProps) {
  const { data: dashboard } = useDashboard(dashboardId);
  const [editing, setEditing] = useState(false);

  const handleAddWidget = (widgetType: string) => {
    // Open widget configuration dialog
  };

  return (
    <div>
      <DashboardHeader
        dashboard={dashboard}
        editing={editing}
        onEdit={() => setEditing(true)}
        onSave={handleSave}
        onDelete={handleDelete}
        onShare={handleShare}
      />

      <WidgetGrid
        widgets={dashboard?.widgets}
        layout={dashboard?.layout}
        onWidgetAdd={handleAddWidget}
        onWidgetUpdate={handleWidgetUpdate}
        onWidgetDelete={handleWidgetDelete}
      />

      {editing && (
        <EditDashboardModal
          dashboard={dashboard}
          onSave={handleSave}
        />
      )}
    </div>
  );
}
```

### WidgetGrid Component

```typescript
interface WidgetGridProps {
  widgets: Widget[];
  layout: DashboardLayout;
}

function WidgetGrid({ widgets, layout }: WidgetGridProps) {
  const sortedWidgets = sortWidgetsByPosition(widgets, layout);

  return (
    <div
      {sortedWidgets.map(widget => (
        <Widget
          key={widget.id}
          widget={widget}
          position={widget.position}
          onMove={handleWidgetMove}
          onResize={handleWidgetResize}
          onEdit={handleWidgetEdit}
          onDelete={handleWidgetDelete}
        />
      ))}
    </div>
  );
}
```

### MetricChartWidget Component

```typescript
function MetricChartWidget({ widget }: MetricChartWidgetProps) {
  const { data: metrics } = useWidgetMetrics(widget.id);
  const [timeRange, setTimeRange] = useState('1h');

  return (
    <Card>
      <WidgetHeader
        widget={widget}
        onEdit={handleWidgetEdit}
        onDelete={handleWidgetDelete}
      />

      <MetricControls
        metricType={widget.config.metricType}
        timeRange={timeRange}
        onMetricTypeChange={setMetricType}
        onTimeRangeChange={setTimeRange}
      />

      <LineChart
        data={metrics?.dataPoints}
        metricType={widget.config.metricType}
        timeRange={timeRange}
      />

      <MetricSummary
        current={metrics?.current}
        average={metrics?.average}
        maximum={metrics?.maximum}
        minimum={metrics?.minimum}
        trend={metrics?.trend}
      />
    </Card>
  );
}
```

---

## RBAC Permissions

| Operation | Permission Required |
|-----------|-------------------|
| View dashboards | READ + DASHBOARD |
| Create dashboard | WRITE + DASHBOARD |
| Update dashboard | WRITE + DASHBOARD |
| Delete dashboard | DELETE + DASHBOARD |
| Add widget | WRITE + DASHBOARD |
| Update widget | WRITE + DASHBOARD |
| Delete widget | WRITE + DASHBOARD |
| Share dashboard | WRITE + DASHBOARD |

---

## Dashboard Layout

### Grid System

Widgets arranged in a grid with positions:

```
Column 0 (2 cols):    | Widget at (0,0), (0,1)
Column 1 (2 cols):    | Widget at (1,0), (1,1)
```

**Example Layout:**
```json
{
  "columns": 2,
  "rows": 2,
  "widgets": [
    { "id": 1, "position": {"x": 0, "y": 0} },
    { "id": 2, "position": {"x": 1, "y": 0} }
  ]
}
```

### Responsive Design

- **Desktop**: Full grid layout (up to 12x8)
- **Tablet**: Reduced columns (up to 8x12)
- **Mobile**: Single column layout (up to 4x12)

---

## Configuration

```properties
# Dashboard
dashboard.max-widgets=20
dashboard.max-columns=4
dashboard.max-rows=6
dashboard.default-refresh-interval-seconds=30
dashboard.grid.snap-enabled=true
dashboard.export-enabled=true

# Widgets
widget.refresh.interval-seconds=30
widget.metric.max-points=100
widget.chart.max-data-points=1000
```

---

## Testing

```java
@SpringBootTest
@AutoConfigureMockMvc
public class DashboardControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    public void testGetClusterOverview() throws Exception {
        mockMvc.perform(get("/api/v1/dashboards/cluster-overview")
                .header("Authorization", "Bearer " + token))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.success").value(true))
            .andExpect(jsonPath("$.data.widgets").isArray());
    }

    @Test
    public void testCreateDashboard() throws Exception {
        mockMvc.perform(post("/api/v1/dashboards")
                .contentType(MediaType.APPLICATION_JSON)
                .header("Authorization", "Bearer " + token)
                .content("{\"name\":\"Test Dashboard\",\"widgets\":[],\"layout\":{\"columns\":2,\"rows\":2}}"))
            .andExpect(status().isCreated())
            .andExpect(jsonPath("$.success").value(true));
    }

    @Test
    public void testAddWidget() throws Exception {
        mockMvc.perform(post("/api/v1/dashboards/1/widgets")
                .contentType(MediaType.APPLICATION_JSON)
                .header("Authorization", "Bearer " + token)
                .content("{\"widgetId\":\"metric-chart\",\"position\":{\"x\":0,\"y\":0}}"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.success").value(true));
    }
}
```

---

## Future Enhancements

- [ ] Widget library expansion (gauge charts, pie charts, heatmaps)
- [ ] Dashboard cloning (duplicate dashboard with different scope)
- [ ] Widget templates (user-defined widget presets)
- [ ] Advanced chart options (logarithmic scale, dual Y-axis)
- [ ] Custom data sources (external APIs, databases)
- [ ] Dashboard export (JSON, YAML, image)
- [ ] Scheduled reports (daily/weekly PDF export)
- [ ] Dashboard versioning (history, rollback)
- [ ] Real-time collaboration (multi-user editing)
- [ ] Widget linking (navigate to resource from widget)
- [ ] Alert integration (click widget to view alert details)
- [ ] AI-powered insights (anomaly detection, recommendations)
