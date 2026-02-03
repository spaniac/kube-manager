import { useMemo } from 'react';

import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

import { useApiQuery } from '@/hooks/useApiQuery';
import { MetricsSchema } from '@/api/schemas/metrics';

/**
 * Metrics dashboard with time series charts for pods and nodes.
 * Displays CPU and memory usage over time.
 */
export default function MetricsDashboard({ namespace }: MetricsDashboardProps) {
    const { data: cpuMetrics, isLoading: cpuLoading, error: cpuError } = useApiQuery({
        queryKey: ['metrics', 'cpu', namespace],
        queryFn: () => fetchMetrics('cpu', namespace),
        staleTime: 30 * 1000, // 30 seconds
        enabled: !!namespace,
    });

    const { data: memoryMetrics, isLoading: memLoading, error: memError } = useApiQuery({
        queryKey: ['metrics', 'memory', namespace],
        queryFn: () => fetchMetrics('memory', namespace),
        staleTime: 30 * 1000,
        enabled: !!namespace,
    });

    const chartData = useMemo(() => {
        const timestamps = cpuMetrics?.map((m) => m.timestamp) || [];
        return {
            timestamps,
            cpu: cpuMetrics?.map((m) => m.value) || [],
            memory: memoryMetrics?.map((m) => m.value) || [],
        };
    }, [cpuMetrics, memoryMetrics]);

    if (cpuLoading || memLoading) return <div className="loading-spinner">Loading metrics...</div>;
    if (cpuError || memError) return <div className="error-message">Failed to load metrics</div>;

    return (
        <ResponsiveContainer width="100%" height={500}>
            <h2>Resource Metrics: {namespace || 'All Namespaces'}</h2>

            <div className="metrics-chart">
                <LineChart data={chartData.timestamps}>
                    <XAxis
                        dataKey="timestamp"
                        type="number"
                        scale="time"
                        domain={[new Date(min(chartData.timestamps)), new Date(max(chartData.timestamps))]}
                        tickFormatter={(tick) => new Date(tick).toLocaleTimeString()}
                    />
                    <YAxis>
                        <YAxis yAxisId="cpu" orientation="left" stroke="#8884d8" />
                        <YAxis yAxisId="memory" orientation="right" stroke="#82ca9d" />
                    </YAxis>
                    <Tooltip
                        contentStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.8)', borderRadius: '4px' }}
                        formatter={(value, name, props) => {
                            const { payload } = props;
                            return (
                                <div className="custom-tooltip">
                                    <p className="tooltip-time">{new Date(payload[0]).toLocaleString()}</p>
                                    {payload.map((entry: any, index: number) => (
                                        <p key={index}>
                                            <span style={{ color: entry.color }}>{name}: </span>
                                            <span>{entry.value}</span>
                                        </p>
                                    ))}
                                </div>
                            );
                        }}
                    />
                    <Legend>
                        <Legend content="CPU Usage" wrapperStyle={{ color: '#8884d8' }} />
                        <Legend content="Memory Usage" wrapperStyle={{ color: '#82ca9d' }} />
                    </Legend>
                    <Line
                        yAxisId="cpu"
                        type="monotone"
                        dataKey="cpu"
                        stroke="#8884d8"
                        name="CPU %"
                        strokeWidth={2}
                        dot={false}
                        animationDuration={500}
                    />
                    <Line
                        yAxisId="memory"
                        type="monotone"
                        dataKey="memory"
                        stroke="#82ca9d"
                        name="Memory %"
                        strokeWidth={2}
                        dot={false}
                        animationDuration={500}
                    />
                </LineChart>
            </div>

            <div className="metrics-summary">
                <div className="summary-card">
                    <h3>CPU Usage</h3>
                    <div className="current-value">
                        {chartData.cpu.length > 0 && chartData.cpu[chartData.cpu.length - 1].toFixed(2)}%
                    </div>
                </div>
                <div className="summary-card">
                    <h3>Memory Usage</h3>
                    <div className="current-value">
                        {chartData.memory.length > 0 && chartData.memory[chartData.memory.length - 1].toFixed(2)}%
                    </div>
                </div>
            </div>
        </ResponsiveContainer>
    );
}

interface MetricsDashboardProps {
    namespace?: string;
}

async function fetchMetrics(type: string, namespace?: string): Promise<MetricsSchema[]> {
    // TODO: Replace with actual API call
    const mockData = [
        { timestamp: Date.now() - 3600000, value: Math.random() * 50 },
        { timestamp: Date.now() - 3000000, value: Math.random() * 45 },
        { timestamp: Date.now() - 2400000, value: Math.random() * 60 },
        { timestamp: Date.now() - 1800000, value: Math.random() * 55 },
        { timestamp: Date.now() - 1200000, value: Math.random() * 50 },
        { timestamp: Date.now() - 60000, value: Math.random() * 65 },
    ];

    return new Promise((resolve) => {
        setTimeout(() => resolve(mockData), 100);
    });
}
