import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getDeployment, updateDeploymentStrategy } from '@api/deployment';
import { updateDeploymentStrategy as updateWorkloadStrategy } from '@api/workload';
import { useApiQuery, useApiMutation } from '@hooks/useApi';
import type { Deployment } from '@types/api';
import { Button } from '@components/Button';
import { Select } from '@components/Select';
import { Input } from '@components/Input';
import { Spinner } from '@components/Spinner';
import { useToast } from '@components/Toast';

export default function WorkloadUpdateStrategy() {
  const { namespace, name } = useParams<{ namespace: string; name: string }>();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [strategy, setStrategy] = useState<'RollingUpdate' | 'Recreate'>('RollingUpdate');
  const [maxSurge, setMaxSurge] = useState('25%');
  const [maxUnavailable, setMaxUnavailable] = useState('25%');
  const [showPreview, setShowPreview] = useState(false);

  const { data: deployment, isLoading, error } = useApiQuery(
    ['deployment', namespace, name],
    () => (namespace && name ? getDeployment(namespace, name) : Promise.reject(new Error('Missing params'))),
  );

  const updateMutation = useApiMutation(
    async (request: { strategy: string; maxUnavailable?: string; maxSurge?: string }) => {
      return await updateWorkloadStrategy(
        namespace || '',
        name || '',
        request,
      );
    },
    {
      onSuccess: () => {
        showToast({ message: 'Update strategy updated successfully', type: 'success' });
        navigate(-1);
      },
      onError: (error) => {
        showToast({ message: `Failed to update strategy: ${(error as Error).message}`, type: 'error' });
      },
    },
  );

  const handleSubmit = () => {
    updateMutation.mutate({
      strategy,
      maxSurge: strategy === 'RollingUpdate' ? maxSurge : undefined,
      maxUnavailable: strategy === 'RollingUpdate' ? maxUnavailable : undefined,
    });
  };

  const handleStrategyChange = (value: string) => {
    setStrategy(value as 'RollingUpdate' | 'Recreate');
  };

  if (error) {
    return (
      <div className="workload-update-strategy">
        <div className="error-message">Error loading deployment: {(error as Error).message}</div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="workload-update-strategy">
        <div className="loading-container">
          <Spinner />
          <p>Loading deployment...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="workload-update-strategy">
        <div className="page-header">
          <div>
            <h1>Update Strategy: {name}</h1>
            <span className="namespace-badge">{namespace}</span>
          </div>
          <div className="header-actions">
            <Button variant="secondary" onClick={() => navigate(-1)}>
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={handleSubmit}
              loading={updateMutation.isLoading}
            >
              Update Strategy
            </Button>
          </div>
        </div>

        <div className="content-sections">
          <div className="strategy-config">
            <h2>Configuration</h2>
            <div className="form-group">
              <label>Strategy Type</label>
              <Select
                value={strategy}
                onChange={handleStrategyChange}
                options={[
                  { value: 'RollingUpdate', label: 'Rolling Update' },
                  { value: 'Recreate', label: 'Recreate' },
                ]}
                fullWidth
              />
              <p className="field-description">
                {strategy === 'RollingUpdate'
                  ? 'Gradually replaces old pods with new ones while maintaining availability'
                  : 'Terminates all pods before creating new ones'}
              </p>
            </div>

            {strategy === 'RollingUpdate' && (
              <>
                <div className="form-group">
                  <label>Max Surge</label>
                  <Input
                    value={maxSurge}
                    onChange={(e) => setMaxSurge(e.target.value)}
                    placeholder="e.g., 25% or 2"
                    fullWidth
                  />
                  <p className="field-description">
                    Maximum number of pods that can be created above the desired number of replicas
                  </p>
                </div>

                <div className="form-group">
                  <label>Max Unavailable</label>
                  <Input
                    value={maxUnavailable}
                    onChange={(e) => setMaxUnavailable(e.target.value)}
                    placeholder="e.g., 25% or 2"
                    fullWidth
                  />
                  <p className="field-description">
                    Maximum number of pods that can be unavailable during the update
                  </p>
                </div>
              </>
            )}
          </div>

          <div className="strategy-info">
            <h2>Strategy Information</h2>
            <div className="info-card">
              <div className="info-row">
                <span className="info-label">Current Strategy:</span>
                <span className="info-value">{deployment?.strategy || 'RollingUpdate'}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Replicas:</span>
                <span className="info-value">{deployment?.replicas || 0}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Ready Replicas:</span>
                <span className="info-value">{deployment?.readyReplicas || 0}</span>
              </div>
            </div>

            <div className="strategy-details">
              <h3>Rolling Update</h3>
              <p>
                The Rolling Update strategy ensures that pods are gradually replaced, maintaining application availability during updates. You can control the pace using maxSurge and maxUnavailable parameters.
              </p>
              <ul className="feature-list">
                <li>Zero downtime updates</li>
                <li>Gradual pod replacement</li>
                <li>Rollback support</li>
                <li>Configurable update pace</li>
              </ul>
            </div>

            <div className="strategy-details">
              <h3>Recreate</h3>
              <p>
                The Recreate strategy terminates all existing pods before creating new ones. This causes downtime but ensures a clean slate for the update.
              </p>
              <ul className="feature-list">
                <li>Simple deployment</li>
                <li>Clean state</li>
                <li>Temporary downtime</li>
                <li>No resource overhead</li>
              </ul>
            </div>

            <button
              className="preview-button"
              onClick={() => setShowPreview(!showPreview)}
            >
              {showPreview ? 'Hide' : 'Show'} YAML Preview
            </button>

            {showPreview && (
              <div className="yaml-preview">
                <pre>{`apiVersion: apps/v1
kind: Deployment
metadata:
  name: ${name}
  namespace: ${namespace}
spec:
  replicas: ${deployment?.replicas || 1}
  strategy:
    type: ${strategy}
${strategy === 'RollingUpdate' ? `    rollingUpdate:
      maxSurge: ${maxSurge}
      maxUnavailable: ${maxUnavailable}` : ''}
  selector:
    matchLabels:
      app: ${deployment?.selector || 'app'}`}</pre>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        .workload-update-strategy {
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

        .loading-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
          padding: 48px;
        }

        .loading-container p {
          margin: 0;
          font-size: 14px;
          color: #6b7280;
        }

        .content-sections {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 32px;
        }

        .strategy-config h2,
        .strategy-info h2 {
          margin: 0 0 24px 0;
          font-size: 24px;
          font-weight: 600;
          color: #111827;
        }

        .form-group {
          margin-bottom: 24px;
        }

        .form-group label {
          display: block;
          font-size: 14px;
          font-weight: 500;
          color: #374151;
          margin-bottom: 8px;
        }

        .field-description {
          margin: 8px 0 0 0;
          font-size: 13px;
          color: #6b7280;
          line-height: 1.5;
        }

        .info-card {
          padding: 20px;
          background: #f9fafb;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          margin-bottom: 24px;
        }

        .info-row {
          display: flex;
          justify-content: space-between;
          padding: 8px 0;
          font-size: 14px;
          border-bottom: 1px solid #e5e7eb;
        }

        .info-row:last-child {
          border-bottom: none;
        }

        .info-label {
          color: #6b7280;
          font-weight: 500;
        }

        .info-value {
          color: #111827;
          font-weight: 600;
        }

        .strategy-details {
          padding: 20px;
          background: #ffffff;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          margin-bottom: 24px;
        }

        .strategy-details h3 {
          margin: 0 0 12px 0;
          font-size: 18px;
          font-weight: 600;
          color: #111827;
        }

        .strategy-details p {
          margin: 0 0 12px 0;
          font-size: 14px;
          color: #374151;
          line-height: 1.6;
        }

        .feature-list {
          margin: 0;
          padding-left: 20px;
          font-size: 14px;
          color: #374151;
        }

        .feature-list li {
          margin-bottom: 4px;
        }

        .preview-button {
          width: 100%;
          padding: 12px;
          background: #f9fafb;
          border: 1px solid #e5e7eb;
          border-radius: 6px;
          font-size: 14px;
          font-weight: 500;
          color: #374151;
          cursor: pointer;
          transition: all 0.2s;
        }

        .preview-button:hover {
          background: #eff6ff;
          border-color: #3b82f6;
          color: #1e40af;
        }

        .yaml-preview {
          margin-top: 16px;
          padding: 16px;
          background: #1e1e1e;
          border-radius: 8px;
          overflow-x: auto;
        }

        .yaml-preview pre {
          margin: 0;
          font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
          font-size: 12px;
          color: #d4d4d4;
          line-height: 1.5;
        }

        .error-message {
          padding: 16px;
          background: #fef2f2;
          border: 1px solid #fecaca;
          border-radius: 6px;
          color: #b91c1c;
        }

        @media (max-width: 1024px) {
          .content-sections {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </>
  );
}
