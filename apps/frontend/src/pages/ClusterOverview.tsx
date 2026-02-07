import { useApiQuery } from '@hooks/useApi';
import { getCluster, getClusterHealth, getClusterMetrics } from '@api/cluster';
import { Badge } from '@components/Badge';
import { Loading } from '@components/Spinner';

export default function ClusterOverview() {
  const { data: cluster, isLoading: clusterLoading } = useApiQuery(
    ['cluster'],
    getCluster,
  );
  const { data: health, isLoading: healthLoading } = useApiQuery(
    ['cluster', 'health'],
    getClusterHealth,
  );
  const { data: metrics, isLoading: metricsLoading } = useApiQuery(
    ['cluster', 'metrics'],
    getClusterMetrics,
  );

  if (clusterLoading || healthLoading || metricsLoading) {
    return <Loading message="Loading cluster overview..." />;
  }

  return (
    <div className="cluster-overview">
      <div className="overview-header">
        <h1>Cluster Overview</h1>
        <div className="cluster-info">
          <div className="info-item">
            <span className="info-label">Name</span>
            <span className="info-value">{cluster?.name}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Version</span>
            <span className="info-value">{cluster?.version}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Platform</span>
            <span className="info-value">{cluster?.platform}</span>
          </div>
        </div>
      </div>

      <div className="overview-grid">
        <div className="overview-card">
          <h2>Cluster Health</h2>
          <div className="health-status">
            <Badge status={health?.healthy ? 'Running' : 'Failed'} />
            <p className="health-message">{health?.message}</p>
          </div>
        </div>

        <div className="overview-card metrics-card">
          <h2>Resource Usage</h2>
          <div className="metrics-grid">
            <div className="metric-item">
              <span className="metric-label">CPU Usage</span>
              <span className="metric-value">{metrics?.cpuUsage || 0}%</span>
            </div>
            <div className="metric-item">
              <span className="metric-label">Memory Usage</span>
              <span className="metric-value">{metrics?.memoryUsage || 0}%</span>
            </div>
            <div className="metric-item">
              <span className="metric-label">Pods</span>
              <span className="metric-value">{cluster?.podsCount || 0}</span>
            </div>
            <div className="metric-item">
              <span className="metric-label">Nodes</span>
              <span className="metric-value">{cluster?.nodesCount || 0}</span>
            </div>
          </div>
        </div>

        <div className="overview-card summary-card">
          <h2>Summary</h2>
          <div className="summary-grid">
            <div className="summary-item">
              <span className="summary-value">{cluster?.nodesCount || 0}</span>
              <span className="summary-label">Nodes</span>
            </div>
            <div className="summary-item">
              <span className="summary-value">{cluster?.podsCount || 0}</span>
              <span className="summary-label">Pods</span>
            </div>
            <div className="summary-item">
              <span className="summary-value">{cluster?.namespacesCount || 0}</span>
              <span className="summary-label">Namespaces</span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .cluster-overview {
          padding: 32px;
        }

        .overview-header {
          margin-bottom: 32px;
        }

        .overview-header h1 {
          font-size: 28px;
          font-weight: 700;
          margin: 0 0 24px 0;
          color: #111827;
        }

        .cluster-info {
          display: flex;
          gap: 24px;
          align-items: center;
        }

        .info-item {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .info-label {
          font-size: 12px;
          font-weight: 600;
          color: #6b7280;
          text-transform: uppercase;
        }

        .info-value {
          font-size: 16px;
          font-weight: 600;
          color: #111827;
        }

        .overview-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 24px;
        }

        .overview-card {
          background: white;
          border-radius: 12px;
          padding: 24px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }

        .overview-card h2 {
          font-size: 18px;
          font-weight: 600;
          margin: 0 0 16px 0;
          color: #111827;
        }

        .health-status {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .health-message {
          font-size: 15px;
          color: #374151;
        }

        .metrics-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
        }

        .metric-item {
          display: flex;
          flex-direction: column;
          gap: 4px;
          padding: 16px;
          background: #f9fafb;
          border-radius: 8px;
        }

        .metric-label {
          font-size: 13px;
          color: #6b7280;
        }

        .metric-value {
          font-size: 24px;
          font-weight: 700;
          color: #111827;
        }

        .summary-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }

        .summary-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          padding: 16px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 8px;
        }

        .summary-value {
          font-size: 32px;
          font-weight: 700;
          color: white;
        }

        .summary-label {
          font-size: 14px;
          font-weight: 500;
          color: rgba(255, 255, 255, 0.9);
        }
      `}</style>
    </div>
  );
}

