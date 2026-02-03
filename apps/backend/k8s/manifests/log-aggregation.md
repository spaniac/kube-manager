# Loki Log Aggregation Configuration
# This document describes the configuration for Loki log aggregation

## Prerequisites

The following components must be deployed in the cluster:
- Loki (log aggregation system)
- Promtail (log agent for collecting logs)
- Grafana (for log visualization - optional if using Grafana dashboard)

## Configuration Options

### Option 1: Using Loki Promtail (Recommended)

Deploy Promtail as a DaemonSet to collect logs from K8s Manager pods:

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: loki-promtail-config
  namespace: monitoring
data:
  promtail.yaml: |
    server:
      http_listen_port: 9080

    clients:
      - url: http://loki.monitoring.svc.cluster.local:3100/loki/api/v1/push

    scrape_configs:
      - job_name: k8s-pods
        kubernetes_sd_configs:
          - role: pod
        relabel_configs:
          - source_labels: [__meta_kubernetes_pod_label_app]
            action: keep
            regex: k8s-manager
          - source_labels: [__meta_kubernetes_pod_name]
            target_label: pod
          - source_labels: [__meta_kubernetes_pod_namespace]
            target_label: namespace
          - source_labels: [__meta_kubernetes_pod_container_name]
            target_label: container
          - source_labels: [__meta_kubernetes_pod_label_app, __meta_kubernetes_pod_label_component]
            target_label: app
            separator: "-"
```

### Option 2: Using Fluent Bit / Fluentd

Alternative log aggregation using Fluent Bit:

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: fluent-bit-config
  namespace: monitoring
data:
  fluent-bit.conf: |
    [SERVICE]
        Flush         1
        Daemon        Off
        Log_Level      info

    [INPUT]
        Name              tail
        Path              /var/log/containers/k8s-manager*.log
        Parser            docker
        Tag               k8s.*
        DB                /var/log/flb_k8s_manager.db
        Mem_Buf_Limit     5MB
        Skip_Long_Lines    On

    [FILTER]
        Name                kubernetes
        Match               k8s.*
        Kube_URL            https://kubernetes.default.svc:443
        Kube_CA_File        /var/run/secrets/kubernetes.io/serviceaccount/ca.crt
        Kube_Token_File     /var/run/secrets/kubernetes.io/serviceaccount/token
        Kube_Tag_Prefix     k8s.var.log.containers.
        Merge_Log           On
        Merge_Log_Key       log_processed
        K8S-Logging.Parser  On
        K8S-Logging.Exclude On

    [OUTPUT]
        Name                loki
        Match               k8s.*
        Url                 http://loki.monitoring.svc.cluster.local:3100/loki/api/v1/push
        Labels              job=fluent-bit,app=k8s-manager
```

## Application Logging Configuration

Configure Spring Boot application to log in JSON format for better parsing:

```properties
# application.properties
logging.pattern.console=%d{yyyy-MM-dd HH:mm:ss} - %msg%n
logging.json.format.enabled=true
```

## Log Retention

Configure Loki retention policy:

```yaml
# values.yaml for Loki chart
loki:
  config:
    limits_config:
      retention:
        period: 30d
      delete_old_streams_after: 168h
```

## Log Queries (Grafana)

Example Loki queries for K8s Manager:

1. **Backend Application Logs**:
   ```
   {app="k8s-manager-backend"}
   ```

2. **Backend Error Logs**:
   ```
   {app="k8s-manager-backend"} |= "ERROR"
   ```

3. **Frontend Logs**:
   ```
   {app="k8s-manager-frontend"}
   ```

4. **HTTP Request Logs**:
   ```
   {app="k8s-manager-backend"} |= "http_server_requests"
   ```

5. **K8s Client Logs**:
   ```
   {app="k8s-manager-backend"} |= "Fabric8"
   ```

## Dashboard Integration

Integrate Loki with Grafana dashboards for unified monitoring:

1. Add Loki datasource in Grafana
2. Create panels with Loki queries
3. Combine with Prometheus metrics in the same dashboard

## Alerts (Optional)

Configure alerts based on log patterns:

```yaml
groups:
  - name: k8s_manager_logs
    rules:
      - alert: HighErrorRate
        expr: |
          sum(count_over_time({app="k8s-manager-backend"} |= "ERROR" [5m])) > 10
        for: 5m
        annotations:
          summary: "High error rate in K8s Manager backend"
          description: "More than 10 errors in the last 5 minutes"
```

## Troubleshooting

### Logs not appearing in Loki:
1. Check Promtail/Fluent Bit pod logs
2. Verify network connectivity to Loki service
3. Check log file permissions
4. Verify log format (JSON preferred)

### High resource usage:
1. Reduce sampling rate
2. Implement log sampling
3. Adjust retention period
4. Limit log levels (e.g., only WARN and ERROR)
