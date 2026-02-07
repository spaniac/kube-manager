import { useApiQuery, useApiMutation } from '@hooks/useApi';
import { getNodeDetails, cordonNode, uncordonNode, drainNode } from '@api/cluster';
import { Badge } from '@components/Badge';
import { Button } from '@components/Button';
import { Loading } from '@components/Spinner';
import { ConfirmationDialog, ConfirmationDialogStyles } from '@components/ConfirmationDialog';
import { Modal, ModalStyles } from '@components/Modal';
import type { NodeCondition } from '../types/api';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function NodeDetails() {
  const { name } = useParams<{ name: string }>();
  const navigate = useNavigate();
  const [showDrainConfirm, setShowDrainConfirm] = useState(false);

  const { data: node, isLoading, error } = useApiQuery(['node', name], () =>
    name ? getNodeDetails(name) : Promise.reject('Node name is required'),
  );

  const cordonMutation = useApiMutation(
    ({ nodeName }: { nodeName: string }) => name ? cordonNode(nodeName) : Promise.resolve(),
    {
      onSuccess: () => {
        // Refetch node details
        window.location.reload();
      },
    },
  );

  const uncordonMutation = useApiMutation(
    ({ nodeName }: { nodeName: string }) => name ? uncordonNode(nodeName) : Promise.resolve(),
    {
      onSuccess: () => {
        // Refetch node details
        window.location.reload();
      },
    },
  );

  const drainMutation = useApiMutation(
    ({ nodeName, timeoutSeconds }: { nodeName: string; timeoutSeconds?: number }) => drainNode(nodeName, timeoutSeconds),
    {
      onSuccess: () => {
        setShowDrainConfirm(false);
        window.location.reload();
      },
    },
  );

  if (isLoading) {
    return <Loading message={`Loading node ${name}...`} />;
  }

  if (error) {
    return (
      <div className="node-details">
        <h1>Error Loading Node</h1>
        <p>{error instanceof Error ? error.message : 'Unknown error'}</p>
        <Button onClick={() => navigate('/cluster/nodes')}>Back to Nodes</Button>
      </div>
    );
  }

  if (!node) {
    return (
      <div className="node-details">
        <h1>Node Not Found</h1>
        <Button onClick={() => navigate('/cluster/nodes')}>Back to Nodes</Button>
      </div>
    );
  }

  const isCordoned = node.labels?.['node.kubernetes.io/unschedulable'] === 'true';
  const readyCondition = node.conditions.find((c) => c.type === 'Ready');
  const isReady = readyCondition?.status === 'True';

  return (
    <div className="node-details">
      <ModalStyles />
      <div className="node-details-header">
        <div>
          <h1>{node.name}</h1>
          <div className="node-meta">
            <Badge status={isReady ? 'Running' : 'Failed'} />
            <span className="node-roles">{node.roles.join(', ') || 'No roles'}</span>
          </div>
        </div>
        <div className="node-actions">
          {isCordoned ? (
            <Button
              variant="primary"
              onClick={() => uncordonMutation.mutate({ nodeName: name || '' })}
              disabled={uncordonMutation.isPending}
            >
              {uncordonMutation.isPending ? 'Uncordoning...' : 'Uncordon'}
            </Button>
          ) : (
            <Button
              variant="secondary"
              onClick={() => cordonMutation.mutate({ nodeName: name || '' })}
              disabled={cordonMutation.isPending}
            >
              {cordonMutation.isPending ? 'Cordoning...' : 'Cordon'}
            </Button>
          )}
          <Button
            variant="danger"
            onClick={() => setShowDrainConfirm(true)}
            disabled={isCordoned || drainMutation.isPending}
          >
            {drainMutation.isPending ? 'Draining...' : 'Drain'}
          </Button>
        </div>
      </div>

      <div className="node-details-content">
        <div className="node-details-section">
          <h2>Conditions</h2>
          <div className="conditions-list">
            {node.conditions.map((condition, index) => (
              <ConditionItem key={index} condition={condition} />
            ))}
          </div>
        </div>

        <div className="node-details-section">
          <h2>Resources</h2>
          <div className="resources-grid">
            <ResourceCard
              title="CPU"
              capacity={node.capacity.cpu}
              allocatable={node.allocatable.cpu}
              allocated={node.allocated.cpu}
              unit="cores"
            />
            <ResourceCard
              title="Memory"
              capacity={node.capacity.memory}
              allocatable={node.allocatable.memory}
              allocated={node.allocated.memory}
              unit=""
            />
            <ResourceCard
              title="Pods"
              capacity={node.capacity.pods || '-'}
              allocatable={node.allocatable.pods || '-'}
              allocated="-"
              unit=""
            />
          </div>
        </div>

        <div className="node-details-section">
          <h2>Labels</h2>
          <div className="labels-grid">
            {node.labels ? (
              Object.entries(node.labels).map(([key, value]) => (
                <div key={key} className="label-item">
                  <span className="label-key">{key}</span>
                  <span className="label-value">{value}</span>
                </div>
              ))
            ) : (
              <p className="no-data">No labels</p>
            )}
          </div>
        </div>

        <div className="node-details-section">
          <h2>Annotations</h2>
          <div className="labels-grid">
            {Object.keys(node.labels || {}).length === 0 ? (
              <p className="no-data">No annotations</p>
            ) : (
              Object.entries(node.labels || {}).map(([key, value]) => (
                <div key={key} className="label-item">
                  <span className="label-key">{key}</span>
                  <span className="label-value">{value}</span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {showDrainConfirm && (
        <ConfirmationDialog
          title="Drain Node?"
          message={`Are you sure you want to drain node ${node.name}? This will evict all pods from the node and mark it as unschedulable.`}
          onConfirm={() => drainMutation.mutate({ nodeName: node.name })}
          onCancel={() => setShowDrainConfirm(false)}
        />
      )}

      <style>{`
        .node-details {
          padding: 32px;
        }

        .node-details-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 32px;
          padding-bottom: 24px;
          border-bottom: 1px solid #e5e7eb;
        }

        .node-details-header h1 {
          font-size: 28px;
          font-weight: 700;
          margin: 0 0 12px 0;
          color: #111827;
        }

        .node-meta {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .node-roles {
          font-size: 14px;
          color: #6b7280;
        }

        .node-actions {
          display: flex;
          gap: 12px;
        }

        .node-details-content {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
          gap: 24px;
        }

        .node-details-section {
          background: white;
          border-radius: 12px;
          padding: 24px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }

        .node-details-section h2 {
          font-size: 18px;
          font-weight: 600;
          margin: 0 0 16px 0;
          color: #111827;
        }

        .conditions-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .resources-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 16px;
        }

        .labels-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 12px;
        }

        .label-item {
          display: flex;
          flex-direction: column;
          gap: 4px;
          padding: 8px;
          background: #f9fafb;
          border-radius: 6px;
          font-size: 13px;
        }

        .label-key {
          font-weight: 600;
          color: #374151;
          word-break: break-word;
        }

        .label-value {
          color: #6b7280;
          word-break: break-word;
        }

        .no-data {
          color: #9ca3af;
          font-style: italic;
          margin: 0;
        }
      `}</style>
    </div>
  );
}

function ConditionItem({ condition }: { condition: NodeCondition }) {
  const isHealthy = condition.status === 'True';
  const statusColor = isHealthy ? '#10b981' : '#ef4444';

  return (
    <div className="condition-item">
      <div className="condition-header">
        <span className="condition-type">{condition.type}</span>
        <span
          className="condition-status"
          style={{ backgroundColor: statusColor }}
        />
      </div>
      <div className="condition-details">
        {condition.reason && (
          <div className="condition-reason">{condition.reason}</div>
        )}
        {condition.message && (
          <div className="condition-message">{condition.message}</div>
        )}
        {condition.lastTransitionTime && (
          <div className="condition-time">
            {new Date(condition.lastTransitionTime * 1000).toLocaleString()}
          </div>
        )}
      </div>
      <style>{`
        .condition-item {
          padding: 12px;
          background: #f9fafb;
          border-radius: 6px;
          border-left: 3px solid ${statusColor};
        }

        .condition-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;
        }

        .condition-type {
          font-weight: 600;
          color: #374151;
          font-size: 14px;
        }

        .condition-status {
          width: 10px;
          height: 10px;
          border-radius: 50%;
        }

        .condition-details {
          display: flex;
          flex-direction: column;
          gap: 4px;
          font-size: 13px;
        }

        .condition-reason {
          font-weight: 500;
          color: #374151;
        }

        .condition-message {
          color: #6b7280;
        }

        .condition-time {
          color: #9ca3af;
          font-size: 12px;
        }
      `}</style>
    </div>
  );
}

function ResourceCard({
  title,
  capacity,
  allocatable,
  allocated,
  unit,
}: {
  title: string;
  capacity: string;
  allocatable: string;
  allocated: string;
  unit: string;
}) {
  return (
    <div className="resource-card">
      <h3 className="resource-title">{title}</h3>
      <div className="resource-stats">
        <div className="stat">
          <span className="stat-label">Capacity</span>
          <span className="stat-value">
            {capacity}
            {unit}
          </span>
        </div>
        <div className="stat">
          <span className="stat-label">Allocatable</span>
          <span className="stat-value">
            {allocatable}
            {unit}
          </span>
        </div>
        <div className="stat">
          <span className="stat-label">Allocated</span>
          <span className="stat-value">
            {allocated}
            {unit}
          </span>
        </div>
      </div>
      <style>{`
        .resource-card {
          padding: 16px;
          background: #f9fafb;
          border-radius: 8px;
        }

        .resource-title {
          font-size: 14px;
          font-weight: 600;
          margin: 0 0 12px 0;
          color: #111827;
        }

        .resource-stats {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .stat {
          display: flex;
          justify-content: space-between;
          font-size: 13px;
        }

        .stat-label {
          color: #6b7280;
        }

        .stat-value {
          font-weight: 600;
          color: #111827;
        }
      `}</style>
    </div>
  );
}
