package com.k8smanager.service;

import com.k8smanager.dto.PromQLQueryResultDTO;
import com.k8smanager.dto.PrometheusQueryTemplateDTO;
import org.springframework.stereotype.Service;

import java.util.Map;

/**
 * Service for building and executing reusable PromQL templates.
 */
@Service
public class PrometheusQueryService {

    private static final Map<String, PrometheusQueryTemplateDTO> QUERY_TEMPLATES = Map.of(
            "cpu", new PrometheusQueryTemplateDTO("cpu",
                    "rate(container_cpu_usage_seconds_total{namespace=\"$1\",pod=\"$2\",container!=\"\"}[5m])*100"),
            "memory", new PrometheusQueryTemplateDTO("memory",
                    "(container_memory_working_set_bytes{namespace=\"$1\",pod=\"$2\",container!=\"\"} / clamp_min(container_memory_max_limit_bytes{namespace=\"$1\",pod=\"$2\",container!=\"\"}, 1)) * 100"),
            "network", new PrometheusQueryTemplateDTO("network",
                    "rate(container_network_receive_bytes_total{namespace=\"$1\",pod=\"$2\"}[5m])*100"),
            "network_tx", new PrometheusQueryTemplateDTO("network_tx",
                    "rate(container_network_transmit_bytes_total{namespace=\"$1\",pod=\"$2\"}[5m])*100"),
            "storage", new PrometheusQueryTemplateDTO("storage",
                    "kubelet_volume_stats_used_bytes{namespace=\"$1\",persistentvolumeclaim=\"$2\"}")
    );

    private final MonitoringService monitoringService;

    public PrometheusQueryService(MonitoringService monitoringService) {
        this.monitoringService = monitoringService;
    }

    public String getMetricQuery(String metricType, String namespace, String name) {
        PrometheusQueryTemplateDTO template = QUERY_TEMPLATES.get(normalizeMetricType(metricType));
        if (template == null) {
            return null;
        }

        return template.template()
                .replace("$1", escapeLabelValue(namespace))
                .replace("$2", escapeLabelValue(name));
    }

    public PromQLQueryResultDTO executeTimeSeriesQuery(String range, String step, String query) {
        return monitoringService.executePromQLQuery(query, range, step);
    }

    private String normalizeMetricType(String metricType) {
        return metricType == null ? "cpu" : metricType.toLowerCase();
    }

    private String escapeLabelValue(String value) {
        if (value == null) {
            return "";
        }
        return value.replace("\\", "\\\\").replace("\"", "\\\"");
    }
}
