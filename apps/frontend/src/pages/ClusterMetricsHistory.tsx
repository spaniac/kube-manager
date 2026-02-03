import { useMemo, useState } from 'react';
import { useApiQuery } from '../hooks/useApi';
import { getClusterMetrics, getNodes } from '../api/cluster';
import { Spinner } from '../components/Spinner';
import { Select } from '../components/Select';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

type TimeRange = '1h' | '6h' | '24h' | '7d' | '30d';

type MetricType = 'cpu' | 'memory' | 'network' | 'pods';

export default function ClusterMetricsHistory() {
  const [timeRange, setTimeRange] = useState<TimeRange>('24h');
  const [metricType, setMetricType] = useState<MetricType>('cpu');
  const { data: currentMetrics, isLoading } = useApiQuery(
    ['cluster', 'metrics'],
    getClusterMetrics,
  );

  // Generate mock historical data (to be replaced with real API call once task 11.7 is done)
  const historicalData = useMemo(() => {
    const points = getPointsCount(timeRange);
    const interval = getIntervalMs(timeRange);

    return Array.from({ length: points }, (_, i) => {
      const timestamp = Date.now() - (points - i) * interval;
      const baseValue = metricType === 'cpu' ? 50 : metricType === 'memory' ? 60 : metricType === 'network' ? 100 : 200;
      const variance = metricType === 'cpu' ? 20 : metricType === 'memory' ? 15 : metricType === 'network' ? 30 : 50;

      return {
        timestamp,
        value: Math.round(value * 100) / 100,
        networkIn: metricType === 'network' ? Math.max(0, baseValue + (Math.random() - 0.5) * variance) : undefined,
        networkOut: metricType === 'network' ? Math.max(0, baseValue + (Math.random() + 0.5) * variance * 0.8) : undefined,
      };
    });
  }, [timeRange, metricType]);

  const chartData = historicalData.map((point) => ({
    time: new Date(point.timestamp).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    }),
    value: point.value,
  }));

  if (isLoading) {
    return <Spinner size="lg" />;
  }

   const getUnit = () => {
     if (metricType === 'cpu') return '%';
     if (metricType === 'memory') return '%';
     if (metricType === 'network') return 'MB/s';
     if (metricType === 'pods') return 'count';
     return 'count';
   };

   const getColor = () => {
     if (metricType === 'cpu') return '#3b82f6';
     if (metricType === 'memory') return '#10b981';
     return '#f59e0b';
   };

  return (
    <div className="cluster-metrics-history">
      <div className="metrics-header">
        <h1>Cluster Metrics History</h1>
        <div className="metrics-controls">
          <Select
            label="Time Range"
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value as TimeRange)}
            options={[
              { value: '1h', label: 'Last 1 hour' },
              { value: '6h', label: 'Last 6 hours' },
              { value: '24h', label: 'Last 24 hours' },
              { value: '7d', label: 'Last 7 days' },
              { value: '30d', label: 'Last 30 days' },
            ]}
          />
            <Select
              label="Metric"
              value={metricType}
              onChange={(e) => setMetricType(e.target.value as MetricType)}
              options={[
                { value: 'cpu', label: 'CPU Usage' },
                { value: 'memory', label: 'Memory Usage' },
                { value: 'network', label: 'Network I/O' },
                { value: 'pods', label: 'Pod Count' },
              ]}
            />
        </div>
      </div>

      <div className="metrics-summary">
         <MetricSummaryCard
           label="Current"
           value={
             metricType === 'cpu'
               ? currentMetrics?.cpuUsage || 0
               : metricType === 'memory'
               ? currentMetrics?.memoryUsage || 0
               : metricType === 'network'
               ? currentMetrics?.networkIn || 0
               : currentMetrics?.podsCount || 0
           }
           unit={
             metricType === 'cpu'
               ? '%'
               : metricType === 'memory'
               ? '%'
               : metricType === 'network'
               ? 'MB/s'
               : 'count'
           }
         />
        <MetricSummaryCard
          label="Average"
          value={
            historicalData.reduce((sum, p) => sum + p.value, 0) /
            historicalData.length
          }
          unit={getUnit()}
        />
        <MetricSummaryCard
          label="Peak"
          value={Math.max(...historicalData.map((p) => p.value))}
          unit={getUnit()}
        />
      </div>

      <div className="chart-container">
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="time" stroke="#6b7280" fontSize={12} />
            <YAxis stroke="#6b7280" fontSize={12} unit={getUnit()} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1f2937',
                borderRadius: '8px',
                border: 'none',
                color: '#f3f4f6',
              }}
              labelStyle={{ color: '#f3f4f6' }}
              formatter={(value: number) => `${value.toFixed(2)}${getUnit()}`}
            />
            <Legend />
            {metricType === 'network' ? (
              <>
                <Line
                  type="monotone"
                  dataKey="networkIn"
                  name="Network In"
                  stroke="#9333ea"
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 4, fill: "#9333ea", stroke: "#9333ea" }}
                />
                <Line
                  type="monotone"
                  dataKey="networkOut"
                  name="Network Out"
                  stroke="#ef4444"
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 4, fill: "#ef4444", stroke: "#ef4444" }}
                />
              </>
            ) : (
              <Line
                type="monotone"
                dataKey="value"
                stroke={getColor()}
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4, fill: getColor(), stroke: getColor() }}
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="metrics-note">
        <strong>Note:</strong> Historical metrics data is currently simulated.
        Real-time metrics history will be available once backend task 11.7 is complete.
      </div>

      <style>{`
        .cluster-metrics-history {
          padding: 32px;
        }

        .metrics-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
        }

        .metrics-header h1 {
          font-size: 28px;
          font-weight: 700;
          margin: 0;
          color: #111827;
        }

        .metrics-controls {
          display: flex;
          gap: 16px;
        }

        .metrics-summary {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 16px;
          margin-bottom: 24px;
        }

        .chart-container {
          background: white;
          border-radius: 12px;
          padding: 24px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }

        .metrics-note {
          margin-top: 16px;
          padding: 12px;
          background: #fef3c7;
          border-left: 4px solid #f59e0b;
          border-radius: 4px;
          color: #92400e;
          font-size: 14px;
        }
      `}</style>
    </div>
  );
}

function MetricSummaryCard({
  label,
  value,
  unit,
}: {
  label: string;
  value: number;
  unit: string;
}) {
  return (
    <div className="metric-summary-card">
      <span className="summary-label">{label}</span>
      <span className="summary-value">
        {value.toFixed(2)}
        {unit}
      </span>
      <style>{`
        .metric-summary-card {
          background: white;
          border-radius: 8px;
          padding: 16px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
        }

        .summary-label {
          font-size: 13px;
          color: #6b7280;
          text-transform: uppercase;
        }

        .summary-value {
          font-size: 28px;
          font-weight: 700;
          color: #111827;
        }
      `}</style>
    </div>
  );
}

function getPointsCount(timeRange: TimeRange): number {
  switch (timeRange) {
    case '1h':
      return 60;
    case '6h':
      return 180;
    case '24h':
      return 720;
    case '7d':
      return 168;
    case '30d':
      return 720;
  }
}

function getIntervalMs(timeRange: TimeRange): number {
  switch (timeRange) {
    case '1h':
      return 60 * 1000;
    case '6h':
      return 120 * 1000;
    case '24h':
      return 120 * 1000;
    case '7d':
      return 3600 * 1000;
    case '30d':
      return 3600 * 1000;
  }
}
