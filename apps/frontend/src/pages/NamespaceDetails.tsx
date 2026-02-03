import { useParams } from 'react';
import { useState } from 'react';
import { getNamespace, getNamespaceQuota, deleteNamespace } from '@api/namespace';
import { useApiQuery, useApiMutation } from '@hooks/useApi';
import type { Namespace, ResourceQuota } from '@types/api';
import { Button } from '@components/Button';
import { Input } from '@components/Input';
import { ConfirmationDialog } from '@components/ConfirmationDialog';
import { useToast } from '@components/Toast';
import { Badge } from '@components/Badge';

interface NamespaceLabelsEditorProps {
  labels: Record<string, string>;
  onChange: (labels: Record<string, string>) => void;
}

function NamespaceLabelsEditor({ labels, onChange }: NamespaceLabelsEditorProps) {
  const [newLabel, setNewLabel] = useState({ key: '', value: '' });

  const addLabel = () => {
    if (!newLabel.key || !newLabel.value) return;
    onChange({ ...labels, [newLabel.key]: newLabel.value });
    setNewLabel({ key: '', value: '' });
  };

  const removeLabel = (key: string) => {
    const { [key]: _, ...rest } = labels;
    onChange(rest);
  };

  return (
    <div className="labels-editor">
      <div className="labels-list">
        {Object.entries(labels).map(([key, value]) => (
          <div key={key} className="label-item">
            <span className="label-key">{key}:</span>
            <span className="label-value">{value}</span>
            <Button
             
              size="small"
              onClick={() => removeLabel(key)}
            >
              ✕
            </Button>
          </div>
        ))}
      </div>
      <div className="add-label-row">
        <Input
          placeholder="Key"
          value={newLabel.key}
          onChange={(e) => setNewLabel({ ...newLabel, key: e.target.value })}
        />
        <Input
          placeholder="Value"
          value={newLabel.value}
          onChange={(e) => setNewLabel({ ...newLabel, value: e.target.value })}
        />
        <Button
         
          size="small"
          onClick={addLabel}
          disabled={!newLabel.key || !newLabel.value}
        >
          Add
        </Button>
      </div>
    </div>
  );
}

interface QuotaEditorProps {
  quota: ResourceQuota;
  onUpdate: (quota: Partial<ResourceQuota>) => void;
}

function QuotaEditor({ quota, onUpdate }: QuotaEditorProps) {
  return (
    <div className="quota-editor">
      <h3>Resource Quota</h3>
      <div className="quota-grid">
        <div className="quota-item">
          <label>CPU</label>
          <Input
            placeholder="Limit (e.g., 4)"
            defaultValue={quota.cpuHard}
            fullWidth
          />
          <div className="quota-usage">
            <span className="quota-used">{quota.cpuUsed}</span>
            <span className="quota-separator">/</span>
            <span className="quota-hard">{quota.cpuHard || '∞'}</span>
          </div>
        </div>
        <div className="quota-item">
          <label>Memory</label>
          <Input
            placeholder="Limit (e.g., 8Gi)"
            defaultValue={quota.memoryHard}
            fullWidth
          />
          <div className="quota-usage">
            <span className="quota-used">{quota.memoryUsed}</span>
            <span className="quota-separator">/</span>
            <span className="quota-hard">{quota.memoryHard || '∞'}</span>
          </div>
        </div>
        <div className="quota-item">
          <label>Pods</label>
          <Input
            placeholder="Limit (e.g., 10)"
            defaultValue={quota.podsHard}
            fullWidth
          />
          <div className="quota-usage">
            <span className="quota-used">{quota.podsUsed}</span>
            <span className="quota-separator">/</span>
            <span className="quota-hard">{quota.podsHard || '∞'}</span>
          </div>
        </div>
      </div>
      <Button
       
        onClick={() => onUpdate(quota)}
        className="save-quota-button"
      >
        Update Quota
      </Button>
    </div>
  );
}

export default function NamespaceDetails() {
  const { name } = useParams<{ name: string }>();
  const { showToast } = useToast();
  const [isEditingLabels, setIsEditingLabels] = useState(false);
  const [labels, setLabels] = useState<Record<string, string>>({});
  const [deleteTarget, setDeleteTarget] = useState<Namespace | null>(null);

  const { data: namespace, isLoading, error, refetch } = useApiQuery(
    ['namespace', name],
    () => getNamespace(name!),
    { enabled: !!name },
  );

  const { data: quota, isLoading: quotaLoading, refetch: refetchQuota } = useApiQuery(
    ['namespace-quota', name],
    () => getNamespaceQuota(name!),
    { enabled: !!name },
  );

  const updateLabelsMutation = useApiMutation(
    async () => {
      await fetch(`/api/v1/namespaces/${name}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ labels }),
      });
    },
    {
      onSuccess: () => {
        showToast('Labels updated successfully', 'success');
        setIsEditingLabels(false);
        refetch();
      },
    },
  );

  const updateQuotaMutation = useApiMutation(
    async (newQuota: Partial<ResourceQuota>) => {
      await fetch(`/api/v1/namespaces/${name}/quota`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newQuota),
      });
    },
    {
      onSuccess: () => {
        showToast('Quota updated successfully', 'success');
        refetchQuota();
      },
    },
  );

  const deleteMutation = useApiMutation(
    async () => {
      await deleteNamespace(name!);
    },
    {
      onSuccess: () => {
        showToast('Namespace deleted successfully', 'success');
        window.location.href = '/namespaces';
      },
    },
  );

  const handleDelete = async () => {
    await deleteMutation.mutateAsync();
  };

  const calculateUsagePercent = (used: string, hard: string): number => {
    if (!hard || hard === '∞') return 0;
    const usedVal = parseFloat(used);
    const hardVal = parseFloat(hard);
    return (usedVal / hardVal) * 100;
  };

  if (isLoading || quotaLoading) {
    return <div className="loading">Loading namespace details...</div>;
  }

  if (error) {
    return <div className="error">Error loading namespace: {error.message}</div>;
  }

  if (!namespace) {
    return <div className="error">Namespace not found</div>;
  }

  const cpuUsagePercent = calculateUsagePercent(quota?.cpuUsed || '0', quota?.cpuHard || '∞');
  const memoryUsagePercent = calculateUsagePercent(quota?.memoryUsed || '0', quota?.memoryHard || '∞');
  const podsUsagePercent = calculateUsagePercent(quota?.podsUsed || '0', quota?.podsHard || '∞');

  return (
    <>
      <div className="namespace-details">
        <div className="page-header">
          <h1>Namespace: {namespace.name}</h1>
          <div className="header-actions">
            <Button onClick={() => (window.location.href = '/namespaces')}>
              ← Back
            </Button>
            <Button
             
              onClick={() => (window.location.href = `/namespaces/${name}/edit`)}
            >
              Edit Namespace
            </Button>
            <Button
             
              onClick={() => setDeleteTarget(namespace)}
            >
              Delete
            </Button>
          </div>
        </div>

        <div className="content-grid">
          {/* Basic Info */}
          <div className="info-section">
            <h2>Overview</h2>
            <div className="info-row">
              <span className="info-label">Name:</span>
              <span className="info-value">{namespace.name}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Status:</span>
              <Badge status={namespace.status} />
            </div>
            <div className="info-row">
              <span className="info-label">Created:</span>
              <span className="info-value">
                {namespace.creationTimestamp
                  ? new Date(namespace.creationTimestamp).toLocaleString()
                  : 'N/A'}
              </span>
            </div>
            <div className="info-row">
              <span className="info-label">UID:</span>
              <span className="info-value mono">{namespace.metadata?.uid || 'N/A'}</span>
            </div>
          </div>

          {/* Labels and Annotations */}
          <div className="info-section">
            <h2>Labels & Annotations</h2>
            {isEditingLabels ? (
              <>
                <NamespaceLabelsEditor
                  labels={labels}
                  onChange={setLabels}
                />
                <div className="editor-actions">
                  <Button
                   
                    onClick={() => updateLabelsMutation.mutate()}
                    disabled={updateLabelsMutation.isPending}
                  >
                    Save Labels
                  </Button>
                  <Button
                   
                    onClick={() => {
                      setLabels(namespace.labels || {});
                      setIsEditingLabels(false);
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </>
            ) : (
              <>
                <div className="info-row">
                  <span className="info-label">Labels:</span>
                  <div className="info-value">
                    {namespace.labels && Object.keys(namespace.labels).length > 0 ? (
                      <div className="labels-display">
                        {Object.entries(namespace.labels).map(([key, value]) => (
                          <span key={key} className="label-tag">
                            {key}={value}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <span className="info-value">No labels</span>
                    )}
                  </div>
                </div>
                <div className="info-row">
                  <span className="info-label">Annotations:</span>
                  <div className="info-value">
                    {namespace.annotations && Object.keys(namespace.annotations).length > 0 ? (
                      <div className="annotations-display">
                        {Object.entries(namespace.annotations).map(([key, value]) => (
                          <div key={key} className="annotation-item">
                            <span className="annotation-key">{key}:</span>
                            <span className="annotation-value">{value}</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <span className="info-value">No annotations</span>
                    )}
                  </div>
                </div>
                <Button
                 
                  size="small"
                  onClick={() => {
                    setLabels(namespace.labels || {});
                    setIsEditingLabels(true);
                  }}
                >
                  Edit Labels/Annotations
                </Button>
              </>
            )}
          </div>

          {/* Resource Quota */}
          {quota && (
            <QuotaEditor
              quota={quota}
              onUpdate={(newQuota) => updateQuotaMutation.mutate(newQuota)}
            />
          )}
        </div>

        {/* Usage Bars */}
        {quota && (
          <div className="usage-section">
            <h2>Resource Usage</h2>
            <div className="usage-bars">
              <div className="usage-item">
                <div className="usage-header">
                  <span className="usage-label">CPU</span>
                  <span className="usage-percentage">{cpuUsagePercent.toFixed(1)}%</span>
                </div>
                <div className="usage-bar">
                  <div
                    className="usage-fill"
                    style={{ width: `${Math.min(cpuUsagePercent, 100)}%` }}
                    data-over={cpuUsagePercent > 80 ? 'true' : 'false'}
                  ></div>
                </div>
              </div>
              <div className="usage-item">
                <div className="usage-header">
                  <span className="usage-label">Memory</span>
                  <span className="usage-percentage">{memoryUsagePercent.toFixed(1)}%</span>
                </div>
                <div className="usage-bar">
                  <div
                    className="usage-fill"
                    style={{ width: `${Math.min(memoryUsagePercent, 100)}%` }}
                    data-over={memoryUsagePercent > 80 ? 'true' : 'false'}
                  ></div>
                </div>
              </div>
              <div className="usage-item">
                <div className="usage-header">
                  <span className="usage-label">Pods</span>
                  <span className="usage-percentage">{podsUsagePercent.toFixed(1)}%</span>
                </div>
                <div className="usage-bar">
                  <div
                    className="usage-fill"
                    style={{ width: `${Math.min(podsUsagePercent, 100)}%` }}
                    data-over={podsUsagePercent > 80 ? 'true' : 'false'}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        )}

        {deleteTarget && (
          <ConfirmationDialog
            title="Delete Namespace"
            message={`Are you sure you want to delete namespace "${deleteTarget.name}"? This action cannot be undone and will delete all resources within the namespace.`}
            onConfirm={handleDelete}
            onCancel={() => setDeleteTarget(null)}
            confirmText="Delete"
           
          />
        )}
      </div>

      <style>{`
        .namespace-details {
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
          margin: 0;
          font-size: 28px;
          font-weight: 700;
          color: #111827;
        }

        .header-actions {
          display: flex;
          gap: 8px;
        }

        .content-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 20px;
          margin-bottom: 24px;
        }

        .info-section {
          background: white;
          padding: 20px;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
        }

        .info-section h2 {
          margin: 0 0 16px 0;
          font-size: 18px;
          font-weight: 600;
          color: #111827;
        }

        .info-row {
          display: flex;
          margin-bottom: 12px;
        }

        .info-label {
          font-weight: 500;
          color: #6b7280;
          min-width: 120px;
        }

        .info-value {
          color: #374151;
        }

        .mono {
          font-family: 'Courier New', Courier, monospace;
          font-size: 13px;
        }

        .labels-display,
        .annotations-display {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .label-tag {
          display: inline-block;
          padding: 4px 8px;
          background: #eff6ff;
          border: 1px solid #dbeafe;
          border-radius: 4px;
          font-size: 12px;
          font-weight: 500;
          color: #1e40af;
        }

        .annotation-item {
          font-size: 13px;
          color: #374151;
        }

        .annotation-key {
          font-weight: 500;
          color: #6b7280;
        }

        .annotation-value {
          margin-left: 4px;
        }

        .labels-editor {
          margin-bottom: 16px;
        }

        .labels-list {
          margin-bottom: 12px;
        }

        .label-item {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px;
          background: #f9fafb;
          border-radius: 4px;
          margin-bottom: 4px;
        }

        .label-key {
          font-weight: 500;
          color: #1e40af;
        }

        .label-value {
          color: #374151;
        }

        .add-label-row {
          display: flex;
          gap: 8px;
          align-items: flex-end;
        }

        .editor-actions {
          display: flex;
          gap: 8px;
          margin-top: 12px;
        }

        .quota-editor {
          background: white;
          padding: 20px;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
        }

        .quota-editor h3 {
          margin: 0 0 16px 0;
          font-size: 18px;
          font-weight: 600;
          color: #111827;
        }

        .quota-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 16px;
          margin-bottom: 16px;
        }

        .quota-item {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .quota-item label {
          font-weight: 500;
          color: #6b7280;
          font-size: 14px;
        }

        .quota-usage {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 13px;
        }

        .quota-used {
          color: #374151;
          font-weight: 600;
        }

        .quota-separator {
          color: #9ca3af;
        }

        .quota-hard {
          color: #1e40af;
          font-weight: 600;
        }

        .save-quota-button {
          margin-top: 16px;
        }

        .usage-section {
          background: white;
          padding: 20px;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
        }

        .usage-section h2 {
          margin: 0 0 16px 0;
          font-size: 18px;
          font-weight: 600;
          color: #111827;
        }

        .usage-bars {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .usage-item {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .usage-header {
          display: flex;
          justify-content: space-between;
          font-size: 14px;
        }

        .usage-label {
          font-weight: 500;
          color: #6b7280;
        }

        .usage-percentage {
          font-weight: 600;
        }

        .usage-percentage[data-over="true"] {
          color: #ef4444;
        }

        .usage-percentage:not([data-over="true"]) {
          color: #059669;
        }

        .usage-bar {
          height: 24px;
          background: #e5e7eb;
          border-radius: 4px;
          overflow: hidden;
        }

        .usage-fill {
          height: 100%;
          background: #3b82f6;
          transition: width 0.3s ease;
        }

        .usage-fill[data-over="true"] {
          background: #ef4444;
        }

        .loading,
        .error {
          padding: 48px;
          text-align: center;
          font-size: 16px;
        }

        .error {
          color: #ef4444;
          background: #fef2f2;
          border: 1px solid #fecaca;
          border-radius: 6px;
        }
      `}</style>
    </>
  );
}
