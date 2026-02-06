import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPod, getPodLogs, getPodYaml, getPodEvents } from '@api/pod';
import { useApiQuery } from '@hooks/useApi';
import type { Pod, PodLogs, Event as ApiEvent } from '@/types/api';
import { Badge } from '@components/Badge';
import { Button } from '@components/Button';
import { Modal } from '@components/Modal';
import { Spinner } from '@components/Spinner';
import { Table, TableStyles } from '@components/Table';

type Column<T> = {
  key: keyof T;
  header: string;
  sortable?: boolean;
  render?: (value: unknown, row: T) => React.ReactNode;
};

export default function PodDetails() {
  const { namespace, name } = useParams<{ namespace: string; name: string }>();
  const [selectedTab, setSelectedTab] = useState<'overview' | 'containers' | 'logs' | 'events' | 'yaml'>('overview');
  const [selectedContainer, setSelectedContainer] = useState<string | null>(null);
  const [showYamlModal, setShowYamlModal] = useState(false);

  const { data: pod, isLoading: podLoading, error: podError } = useApiQuery(
    ['pod', namespace, name],
    () => (namespace && name ? getPod(namespace, name) : Promise.reject(new Error('Missing params'))),
  );

  const { data: logs, isLoading: logsLoading } = useApiQuery(
    ['pod-logs', namespace, name, selectedContainer],
    () =>
      namespace && name && selectedContainer
        ? getPodLogs({ namespace, podName: name, container: selectedContainer, tailLines: 100 })
        : Promise.reject(new Error('Missing params')),
    { enabled: selectedTab === 'logs' && !!selectedContainer },
  );

  const { data: events } = useApiQuery(
    ['pod-events', namespace, name],
    () =>
      namespace && name
        ? getPodEvents(namespace, name)
        : Promise.reject(new Error('Missing params')),
  );

  const { data: yamlData } = useApiQuery(
    ['pod-yaml', namespace, name],
    () =>
      namespace && name
        ? getPodYaml(namespace, name)
        : Promise.reject(new Error('Missing params')),
    { enabled: showYamlModal },
  );

  if (podError) {
    return (
      <div className="pod-details">
        <div className="error-message">Error loading pod: {(podError as Error).message}</div>
      </div>
    );
  }

  if (podLoading) {
    return (
      <div className="pod-details">
        <Spinner />
      </div>
    );
  }

  if (!pod) {
    return <div className="pod-details">Pod not found</div>;
  }

  const columns: Column<ApiEvent>[] = [
    { key: 'lastTimestamp' as keyof ApiEvent, header: 'Time', render: (v: unknown) => <span>{new Date((v as number) * 1000).toLocaleString()}</span> },
    { key: 'type' as keyof ApiEvent, header: 'Type' },
    { key: 'reason' as keyof ApiEvent, header: 'Reason' },
    { key: 'message' as keyof ApiEvent, header: 'Message' },
  ];

  return (
    <div className="pod-details">
      <div className="page-header">
        <div>
          <h1>Pod: {pod.name}</h1>
          <span className="namespace-badge">{pod.namespace}</span>
        </div>
        <div className="header-actions">
          <Badge status={pod.status} />
          <Button variant="secondary" onClick={() => setShowYamlModal(true)}>
            View YAML
          </Button>
        </div>
      </div>

      <div className="tabs">
        {['overview', 'containers', 'logs', 'events', 'yaml'].map((tab) => (
          <button
            key={tab}
            className={`tab ${selectedTab === tab ? 'active' : ''}`}
            onClick={() => setSelectedTab(tab as any)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      <div className="tab-content">
        {selectedTab === 'overview' && (
          <div className="overview-section">
            <div className="info-grid">
              <div className="info-card">
                <h3>Status</h3>
                <Badge status={pod.status} />
              </div>
              <div className="info-card">
                <h3>Node</h3>
                <p>{pod.nodeName || '-'}</p>
              </div>
              <div className="info-card">
                <h3>IP Address</h3>
                <p>{pod.podIP || '-'}</p>
              </div>
              <div className="info-card">
                <h3>Start Time</h3>
                <p>{pod.startTime || '-'}</p>
              </div>
            </div>

            <div className="conditions-section">
              <h3>Conditions</h3>
              {pod.conditions.length > 0 ? (
                <table className="conditions-table">
                  <thead>
                    <tr>
                      <th>Type</th>
                      <th>Status</th>
                      <th>Reason</th>
                      <th>Message</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pod.conditions.map((condition, index) => (
                      <tr key={index}>
                        <td>{condition.type}</td>
                        <td>
                          <Badge
                            status={condition.status === 'True' ? 'Running' : 'Pending'}
                          />
                        </td>
                        <td>{condition.reason || '-'}</td>
                        <td>{condition.message || '-'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p>No conditions available</p>
              )}
            </div>
          </div>
        )}

        {selectedTab === 'containers' && (
          <div className="containers-section">
            {pod.containers.map((container) => (
              <div key={container.name} className="container-card">
                <h3>
                  {container.name}{' '}
                  <Badge status={container.ready ? 'Running' : 'Pending'} />
                </h3>
                <div className="container-details">
                  <p><strong>Image:</strong> {container.image}</p>
                  <p><strong>Ready:</strong> {container.ready ? 'Yes' : 'No'}</p>
                  <p><strong>Restarts:</strong> {container.restartCount}</p>
                  <p><strong>State:</strong> {container.state || '-'}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {selectedTab === 'logs' && (
          <div className="logs-section">
            <div className="logs-header">
              <h3>Logs</h3>
              <select
                value={selectedContainer || ''}
                onChange={(e) => setSelectedContainer(e.target.value)}
                className="container-selector"
              >
                <option value="">Select container...</option>
                {pod.containers.map((container) => (
                  <option key={container.name} value={container.name}>
                    {container.name}
                  </option>
                ))}
              </select>
            </div>
            {logsLoading ? (
              <Spinner />
            ) : logs ? (
              <pre className="logs-content">{logs.entries.map(e => e.message).join('\n')}</pre>
            ) : (
              <p>Select a container to view logs</p>
            )}
          </div>
        )}

        {selectedTab === 'events' && (
          <div className="events-section">
            <TableStyles />
            <Table
              data={events || []}
              columns={columns as Column<ApiEvent>[]}
              emptyMessage="No events found"
            />
          </div>
        )}

        {selectedTab === 'yaml' && (
          <div className="yaml-section">
            {yamlData ? (
              <pre className="yaml-content">{yamlData.yaml}</pre>
            ) : (
              <Spinner />
            )}
          </div>
        )}
      </div>

      <Modal
        isOpen={showYamlModal}
        onClose={() => setShowYamlModal(false)}
        title={`Pod YAML: ${pod.name}`}
        size="xl"
      >
        {yamlData ? (
          <pre className="yaml-modal-content">{yamlData.yaml}</pre>
        ) : (
          <Spinner />
        )}
      </Modal>

      <style>{`
        .pod-details {
          padding: 24px;
          max-width: 1400px;
          margin: 0 auto;
        }

        .page-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
          padding-bottom: 16px;
          border-bottom: 1px solid #e5e7eb;
        }

        .page-header h1 {
          margin: 0 0 8px 0;
          font-size: 28px;
          font-weight: 700;
          color: #111827;
        }

        .namespace-badge {
          display: inline-block;
          padding: 4px 12px;
          background: #eff6ff;
          color: #1e40af;
          border-radius: 999px;
          font-size: 12px;
          font-weight: 500;
        }

        .header-actions {
          display: flex;
          gap: 12px;
          align-items: center;
        }

        .tabs {
          display: flex;
          gap: 4px;
          border-bottom: 1px solid #e5e7eb;
          margin-bottom: 24px;
        }

        .tab {
          padding: 12px 20px;
          background: transparent;
          border: none;
          border-bottom: 2px solid transparent;
          font-size: 14px;
          font-weight: 500;
          color: #6b7280;
          cursor: pointer;
          transition: all 0.2s;
        }

        .tab:hover {
          color: #374151;
          background: #f9fafb;
        }

        .tab.active {
          color: #3b82f6;
          border-bottom-color: #3b82f6;
          background: #eff6ff;
        }

        .tab-content {
          min-height: 400px;
        }

        .overview-section, .containers-section, .logs-section, .events-section, .yaml-section {
          animation: fadeIn 0.3s ease-in;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .info-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 16px;
          margin-bottom: 24px;
        }

        .info-card {
          padding: 16px;
          background: #f9fafb;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
        }

        .info-card h3 {
          margin: 0 0 8px 0;
          font-size: 12px;
          font-weight: 600;
          color: #6b7280;
          text-transform: uppercase;
        }

        .info-card p {
          margin: 0;
          font-size: 16px;
          font-weight: 500;
          color: #111827;
        }

        .conditions-section, .containers-section {
          margin-top: 24px;
        }

        .conditions-section h3, .containers-section h3 {
          margin: 0 0 16px 0;
          font-size: 18px;
          font-weight: 600;
          color: #111827;
        }

        .conditions-table {
          width: 100%;
          border-collapse: collapse;
        }

        .conditions-table th,
        .conditions-table td {
          padding: 12px;
          text-align: left;
          border-bottom: 1px solid #e5e7eb;
        }

        .conditions-table th {
          background: #f9fafb;
          font-weight: 600;
          font-size: 13px;
          color: #374151;
        }

        .container-card {
          padding: 16px;
          background: #f9fafb;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          margin-bottom: 16px;
        }

        .container-card h3 {
          margin: 0 0 12px 0;
          font-size: 16px;
          font-weight: 600;
          color: #111827;
        }

        .container-details p {
          margin: 4px 0;
          font-size: 14px;
          color: #374151;
        }

        .logs-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
        }

        .container-selector {
          padding: 8px 12px;
          border: 1px solid #d1d5db;
          border-radius: 6px;
          font-size: 14px;
          background: white;
          min-width: 200px;
        }

        .logs-content, .yaml-content {
          background: #1e1e1e;
          color: #d4d4d4;
          padding: 16px;
          border-radius: 8px;
          overflow-x: auto;
          font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
          font-size: 13px;
          line-height: 1.5;
          max-height: 500px;
          overflow-y: auto;
        }

        .yaml-modal-content {
          background: #1e1e1e;
          color: #d4d4d4;
          padding: 16px;
          border-radius: 8px;
          overflow-x: auto;
          font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
          font-size: 13px;
          line-height: 1.5;
        }

        .error-message {
          padding: 16px;
          background: #fef2f2;
          border: 1px solid #fecaca;
          border-radius: 6px;
          color: #b91c1c;
        }
      `}</style>
    </div>
  );
}
