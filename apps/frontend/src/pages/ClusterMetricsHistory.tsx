import { useMemo, useState } from 'react';
import { useApiQuery } from '../hooks/useApi';
import { Spinner } from '../components/Spinner';
import { Select } from '../components/Select';
import { getHistoricalMetrics, getNetworkMetrics, type MetricsRange, type MetricsStep, type MetricsType } from '../api/metrics';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const stepOptions: Array<{ value: MetricsStep; label: string }> = [
  { value: '30s', label: '30s' },
  { value: '60s', label: '60s' },
  { value: '300s', label: '5m' },
  { value: '600s', label: '10m' },
  { value: '900s', label: '15m' },
];

export default function ClusterMetricsHistory() {
  const [namespace, setNamespace] = useState('default');
  const [name, setName] = useState('');
  const [range, setRange] = useState<MetricsRange>('24h');
  const [step, setStep] = useState<MetricsStep>('60s');
  const [metricType, setMetricType] = useState<MetricsType>('cpu');

  const hasTarget = name.trim().length > 0;

  const historicalQuery = useApiQuery(
    ['metrics-history', namespace, name, range, step, metricType],
    () => getHistoricalMetrics({ namespace, name, range, step, metricType }),
    { enabled: hasTarget },
  );

  const networkQuery = useApiQuery(
    ['metrics-network', namespace, name],
    () => getNetworkMetrics(namespace, name),
    { enabled: hasTarget && metricType === 'network' },
  );

  const chartData = useMemo(() => {
    const points = historicalQuery.data?.series.data ?? [];
    return points.map((point) => ({
      time: new Date(point.timestamp).toLocaleString('en-US', { month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit' }),
      value: point.value,
    }));
  }, [historicalQuery.data]);

  const summary = historicalQuery.data?.series.summary;
  const latencyMs = historicalQuery.data?.latencyMs;
  const networkLatency = networkQuery.data?.latencyMs;

  const errorMessage = (historicalQuery.error as Error | null)?.message ?? (networkQuery.error as Error | null)?.message;
  const isBackendUnavailable = !!errorMessage && /prometheus|unavailable|failed/i.test(errorMessage);

  return (
    <div className="metrics-history-page">
      <div className="page-title">
        <h1>Cluster Metrics History</h1>
        <p>Prometheus-backed time series for pod-level metrics.</p>
      </div>

      <div className="target-row">
        <label>
          Namespace
          <input value={namespace} onChange={(e) => setNamespace(e.target.value)} placeholder="default" />
        </label>
        <label>
          Pod Name
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="my-app-7d4f6c4bb7-2l9rd" />
        </label>
      </div>

      <div className="controls-row">
        <Select
          label="Metric"
          value={metricType}
          onChange={(value) => setMetricType(value as MetricsType)}
          options={[
            { value: 'cpu', label: 'CPU' },
            { value: 'memory', label: 'Memory' },
            { value: 'network', label: 'Network' },
            { value: 'storage', label: 'Storage' },
          ]}
        />
        <Select
          label="Range"
          value={range}
          onChange={(value) => setRange(value as MetricsRange)}
          options={[
            { value: '1h', label: '1h' },
            { value: '6h', label: '6h' },
            { value: '24h', label: '24h' },
            { value: '7d', label: '7d' },
            { value: '30d', label: '30d' },
          ]}
        />
        <Select
          label="Step"
          value={step}
          onChange={(value) => setStep(value as MetricsStep)}
          options={stepOptions}
        />
      </div>

      {!hasTarget && (
        <div className="info-banner">Enter a pod name to load historical metrics and network RX/TX throughput.</div>
      )}

      {hasTarget && (historicalQuery.isLoading || networkQuery.isLoading) && (
        <div className="loading">
          <Spinner size="lg" />
        </div>
      )}

      {hasTarget && errorMessage && (
        <div className={`error-banner ${isBackendUnavailable ? 'outage' : ''}`}>
          <strong>{isBackendUnavailable ? 'Prometheus unavailable' : 'Unable to load metrics'}</strong>
          <span>{errorMessage}</span>
          <button
            onClick={() => {
              historicalQuery.refetch();
              networkQuery.refetch();
            }}
          >
            Retry
          </button>
        </div>
      )}

      {hasTarget && !errorMessage && chartData.length > 0 && (
        <>
          <div className="summary-grid">
            <StatCard label="Average" value={summary?.average ?? 0} unit={unitFor(metricType)} />
            <StatCard label="Peak" value={summary?.max ?? 0} unit={unitFor(metricType)} />
            <StatCard label="Min" value={summary?.min ?? 0} unit={unitFor(metricType)} />
            <StatCard
              label="Query Latency"
              value={metricType === 'network' ? networkLatency ?? latencyMs ?? 0 : latencyMs ?? 0}
              unit="ms"
            />
          </div>

          <div className="chart-panel">
            <ResponsiveContainer width="100%" height={360}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#d0dae7" />
                <XAxis dataKey="time" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} unit={unitFor(metricType)} />
                <Tooltip
                  formatter={(value: number | string | undefined) =>
                    typeof value === 'number' ? `${value.toFixed(2)} ${unitFor(metricType)}` : ''
                  }
                />
                <Line
                  dataKey="value"
                  type="monotone"
                  stroke="#1f6feb"
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 4, fill: '#1f6feb', stroke: '#1f6feb' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </>
      )}

      <style>{`
        .metrics-history-page {
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .page-title h1 {
          margin: 0;
          font-size: 28px;
          color: #0f172a;
        }
        .page-title p {
          margin: 6px 0 0;
          color: #4b5563;
        }
        .target-row,
        .controls-row {
          display: grid;
          gap: 12px;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
        }
        .target-row label {
          display: flex;
          flex-direction: column;
          gap: 6px;
          font-size: 13px;
          color: #334155;
        }
        .target-row input {
          border: 1px solid #cbd5e1;
          border-radius: 8px;
          padding: 10px 12px;
          font-size: 14px;
        }
        .info-banner,
        .error-banner {
          border-radius: 10px;
          padding: 12px 14px;
          display: flex;
          gap: 8px;
          align-items: center;
          flex-wrap: wrap;
        }
        .info-banner {
          background: #eff6ff;
          color: #1e3a8a;
          border: 1px solid #bfdbfe;
        }
        .error-banner {
          background: #fff1f2;
          border: 1px solid #fecdd3;
          color: #9f1239;
        }
        .error-banner.outage {
          background: #fff7ed;
          border-color: #fdba74;
          color: #9a3412;
        }
        .error-banner button {
          border: none;
          background: #0f172a;
          color: #fff;
          border-radius: 6px;
          padding: 6px 12px;
          cursor: pointer;
        }
        .summary-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
          gap: 12px;
        }
        .chart-panel {
          background: #fff;
          border: 1px solid #dbe5f2;
          border-radius: 12px;
          padding: 14px;
        }
        .loading {
          min-height: 220px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      `}</style>
    </div>
  );
}

function unitFor(metricType: MetricsType): string {
  if (metricType === 'cpu' || metricType === 'memory') {
    return '%';
  }
  if (metricType === 'network') {
    return 'B/s';
  }
  return 'B';
}

function StatCard({ label, value, unit }: { label: string; value: number; unit: string }) {
  return (
    <div className="stat-card">
      <span>{label}</span>
      <strong>{value.toFixed(2)} {unit}</strong>
      <style>{`
        .stat-card {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 10px;
          padding: 12px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .stat-card span {
          color: #475569;
          font-size: 12px;
          text-transform: uppercase;
        }
        .stat-card strong {
          color: #0f172a;
          font-size: 20px;
          line-height: 1.1;
        }
      `}</style>
    </div>
  );
}
