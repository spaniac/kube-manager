import { useApiQuery } from '@hooks/useApi';
import { getClusterMetrics, getNodes } from '@api/cluster';
import { Spinner } from '@components/Spinner';

export default function ClusterResources() {
  const { data: metrics, isLoading: metricsLoading } = useApiQuery(
    ['cluster', 'metrics'],
    getClusterMetrics,
  );
  const { data: nodes, isLoading: nodesLoading } = useApiQuery(['nodes'], getNodes);

  if (metricsLoading || nodesLoading) {
    return <Spinner message="Loading cluster resources..." />;
  }

  const totalCpu = nodes?.reduce((sum, node) => sum + parseFloat(node.capacity.cpu), 0) || 0;
  const totalMemory = nodes?.reduce((sum, node) => {
    const memStr = node.capacity.memory;
    const memVal = parseFloat(memStr.replace(/[^\d.]/g, ''));
    const memUnit = memStr.replace(/[\d.]/g, '');
    const memBytes = memUnit === 'Gi' ? memVal * 1024**3 : memVal * 1024**2;
    return sum + memBytes;
  }, 0) || 0;
  const totalPods = nodes?.reduce((sum, node) => sum + parseInt(node.capacity.pods || '0'), 0) || 0;

  const formatMemory = (bytes: number) => {
    const gb = bytes / (1024**3);
    if (gb >= 1) return `${gb.toFixed(2)}Gi`;
    return `${(bytes / (1024**2)).toFixed(2)}Mi`;
  };

  const clusterUsage = {
    cpu: {
      used: metrics?.cpuUsage || 0,
      capacity: totalCpu,
    },
    memory: {
      used: metrics?.memoryUsage || 0,
      capacity: totalMemory,
    },
    pods: {
      used: metrics?.podsCount || 0,
      capacity: totalPods,
    },
  };

  return (
    <div className="cluster-resources">
      <h1>Cluster Resources</h1>

      <div className="resources-grid">
        {Object.entries(clusterUsage).map(([key, value]) => (
          <ResourceCard
            key={key}
            title={key.charAt(0).toUpperCase() + key.slice(1)}
            used={value.used as number}
            capacity={key === 'pods' ? value.capacity as number : (value.capacity as number * (key === 'memory' ? 1 : value.used / 100))}
            unit={key === 'memory' ? 'bytes' : key === 'pods' ? 'count' : 'cores'}
            formatMemory={formatMemory}
          />
        ))}
      </div>

      <div className="node-resources-section">
        <h2>Node Resources</h2>
        <div className="node-resources-grid">
          {nodes?.map((node) => (
            <NodeResourceCard key={node.name} node={node} formatMemory={formatMemory} />
          ))}
        </div>
      </div>

      <style>{`
        .cluster-resources {
          padding: 32px;
        }

        .cluster-resources h1 {
          font-size: 28px;
          font-weight: 700;
          margin: 0 0 32px 0;
          color: #111827;
        }

        .resources-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 24px;
          margin-bottom: 40px;
        }

        .node-resources-section {
          background: white;
          border-radius: 12px;
          padding: 24px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }

        .node-resources-section h2 {
          font-size: 20px;
          font-weight: 600;
          margin: 0 0 24px 0;
          color: #111827;
        }

        .node-resources-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 16px;
        }
      `}</style>
    </div>
  );
}

function ResourceCard({
  title,
  used,
  capacity,
  unit,
  formatMemory,
}: {
  title: string;
  used: number;
  capacity: number;
  unit: string;
  formatMemory?: (bytes: number) => string;
}) {
  const percentage = capacity > 0 ? (used / capacity) * 100 : 0;
  const displayUsed = unit === 'bytes' && formatMemory ? formatMemory(used) : used;
  const displayCapacity = unit === 'bytes' && formatMemory ? formatMemory(capacity) : capacity;
  const displayUnit = unit === 'bytes' ? '' : unit;

  const getColor = (pct: number) => {
    if (pct >= 90) return '#ef4444';
    if (pct >= 70) return '#f59e0b';
    return '#10b981';
  };

  return (
    <div className="resource-card">
      <h3 className="resource-title">{title}</h3>
      <div className="resource-usage">
        <div className="usage-bar">
          <div
            className="usage-fill"
            style={{
              width: `${percentage}%`,
              backgroundColor: getColor(percentage),
            }}
          />
        </div>
        <div className="usage-text">
          <span className="usage-value">{displayUsed} {displayUnit}</span>
          <span className="usage-capacity">of {displayCapacity} {displayUnit}</span>
        </div>
      </div>
      <div className="usage-percentage">{percentage.toFixed(1)}%</div>
      <style>{`
        .resource-card {
          background: white;
          border-radius: 12px;
          padding: 24px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }

        .resource-title {
          font-size: 16px;
          font-weight: 600;
          margin: 0 0 20px 0;
          color: #111827;
        }

        .resource-usage {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .usage-bar {
          height: 12px;
          background: #e5e7eb;
          border-radius: 6px;
          overflow: hidden;
        }

        .usage-fill {
          height: 100%;
          border-radius: 6px;
          transition: width 0.3s ease;
        }

        .usage-text {
          display: flex;
          justify-content: space-between;
          font-size: 13px;
          color: #6b7280;
        }

        .usage-value {
          font-weight: 600;
          color: #111827;
        }

        .usage-capacity {
          color: #9ca3af;
        }

        .usage-percentage {
          font-size: 32px;
          font-weight: 700;
          color: #111827;
        }
      `}</style>
    </div>
  );
}

function NodeResourceCard({
  node,
  formatMemory,
}: {
  node: { name: string; capacity: { cpu: string; memory: string; pods?: string }; allocated: { cpu: string; memory: string; } };
  formatMemory: (bytes: number) => string;
}) {
  const cpuCapacity = parseFloat(node.capacity.cpu);
  const cpuAllocated = parseFloat(node.allocated.cpu);
  const cpuPercentage = cpuCapacity > 0 ? (cpuAllocated / cpuCapacity) * 100 : 0;

  const memStr = node.capacity.memory;
  const memVal = parseFloat(memStr.replace(/[^\d.]/g, ''));
  const memUnit = memStr.replace(/[\d.]/g, '');
  const memCapacity = memUnit === 'Gi' ? memVal * 1024**3 : memVal * 1024**2;

  const memAllocatedStr = node.allocated.memory;
  const memAllocatedVal = parseFloat(memAllocatedStr.replace(/[^\d.]/g, ''));
  const memAllocatedUnit = memAllocatedStr.replace(/[\d.]/g, '');
  const memAllocated = memAllocatedUnit === 'Gi' ? memAllocatedVal * 1024**3 : memAllocatedVal * 1024**2;
  const memPercentage = memCapacity > 0 ? (memAllocated / memCapacity) * 100 : 0;

  return (
    <div className="node-resource-card">
      <div className="node-name">{node.name}</div>
      <div className="node-metrics">
        <MetricBar
          label="CPU"
          used={cpuAllocated}
          capacity={cpuCapacity}
          unit="cores"
        />
        <MetricBar
          label="Memory"
          used={memAllocated}
          capacity={memCapacity}
          unit=""
          formatValue={formatMemory}
        />
      </div>
      <style>{`
        .node-resource-card {
          background: #f9fafb;
          border-radius: 8px;
          padding: 16px;
        }

        .node-name {
          font-size: 14px;
          font-weight: 600;
          color: #111827;
          margin-bottom: 12px;
        }

        .node-metrics {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
      `}</style>
    </div>
  );
}

function MetricBar({
  label,
  used,
  capacity,
  unit,
  formatValue,
}: {
  label: string;
  used: number;
  capacity: number;
  unit: string;
  formatValue?: (val: number) => string;
}) {
  const percentage = capacity > 0 ? (used / capacity) * 100 : 0;
  const displayUsed = formatValue ? formatValue(used) : used.toFixed(2);
  const displayCapacity = formatValue ? formatValue(capacity) : capacity.toFixed(2);
  const displayUnit = formatValue ? '' : unit;

  return (
    <div className="metric-bar">
      <div className="metric-header">
        <span className="metric-label">{label}</span>
        <span className="metric-value">{displayUsed} {displayUnit}</span>
      </div>
      <div className="metric-progress">
        <div
          className="metric-fill"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <div className="metric-capacity">Capacity: {displayCapacity} {displayUnit}</div>
      <style>{`
        .metric-bar {
          font-size: 12px;
        }

        .metric-header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 4px;
        }

        .metric-label {
          color: #6b7280;
        }

        .metric-value {
          font-weight: 600;
          color: #111827;
        }

        .metric-progress {
          height: 6px;
          background: #e5e7eb;
          border-radius: 3px;
          margin-bottom: 4px;
        }

        .metric-fill {
          height: 100%;
          background: #3b82f6;
          border-radius: 3px;
        }

        .metric-capacity {
          color: #9ca3af;
        }
      `}</style>
    </div>
  );
}
