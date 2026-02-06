import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getDeployment } from '@api/deployment';
import { cloneDeployment } from '@api/workload';
import { useApiQuery, useApiMutation } from '@hooks/useApi';
import type { Deployment } from '@types/api';
import { Button } from '@components/Button';
import { Input } from '@components/Input';
import { Spinner } from '@components/Spinner';
import { useToast } from '@components/Toast';

export default function WorkloadClone() {
  const { namespace, name } = useParams<{ namespace: string; name: string }>();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [newName, setNewName] = useState('');
  const [targetNamespace, setTargetNamespace] = useState('');
  const [cloneLabels, setCloneLabels] = useState(true);
  const [cloneAnnotations, setCloneAnnotations] = useState(true);

  const { data: deployment, isLoading, error } = useApiQuery(
    ['deployment', namespace, name],
    () => (namespace && name ? getDeployment(namespace, name) : Promise.reject(new Error('Missing params'))),
  );

  const cloneMutation = useApiMutation(
    async (request: { newName: string; targetNamespace: string }) => {
      return await cloneDeployment(
        namespace || '',
        name || '',
        request,
      );
    },
    {
      onSuccess: (data) => {
        showToast({ message: `Deployment cloned successfully as ${data.name}`, type: 'success' });
        navigate(`/deployments/${data.namespace}/${data.name}`);
      },
      onError: (error) => {
        showToast({ message: `Failed to clone deployment: ${(error as Error).message}`, type: 'error' });
      },
    },
  );

  const handleClone = () => {
    if (!newName || !targetNamespace) {
      showToast({ message: 'Please fill in all required fields', type: 'error' });
      return;
    }

    cloneMutation.mutate({ newName, targetNamespace });
  };

  const suggestedName = name ? `${name}-clone` : '';

  if (error) {
    return (
      <div className="workload-clone">
        <div className="error-message">Error loading deployment: {(error as Error).message}</div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="workload-clone">
        <div className="loading-container">
          <Spinner />
          <p>Loading deployment...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="workload-clone">
        <div className="page-header">
          <div>
            <h1>Clone Deployment: {name}</h1>
            <span className="namespace-badge">{namespace}</span>
          </div>
          <div className="header-actions">
            <Button variant="secondary" onClick={() => navigate(-1)}>
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={handleClone}
              loading={cloneMutation.isLoading}
            >
              Clone Deployment
            </Button>
          </div>
        </div>

        <div className="info-banner">
          <div className="info-icon">ℹ️</div>
          <div className="info-content">
            <strong>Clone Deployment</strong>
            <p>Create a copy of this deployment with a new name and namespace. The cloned deployment will have the same configuration, including containers, resources, and environment variables.</p>
          </div>
        </div>

        <div className="content-sections">
          <div className="source-info">
            <h2>Source Deployment</h2>
            <div className="info-card">
              <div className="info-row">
                <span className="info-label">Name:</span>
                <span className="info-value">{deployment?.name}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Namespace:</span>
                <span className="info-value">{deployment?.namespace}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Replicas:</span>
                <span className="info-value">{deployment?.replicas}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Ready Replicas:</span>
                <span className="info-value">{deployment?.readyReplicas}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Strategy:</span>
                <span className="info-value">{deployment?.strategy || 'RollingUpdate'}</span>
              </div>
            </div>

            <div className="containers-info">
              <h3>Containers</h3>
              {deployment?.template?.containers.map((container, index) => (
                <div key={index} className="container-item">
                  <div className="container-name">{container.name}</div>
                  <div className="container-image">{container.image}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="clone-config">
            <h2>Clone Configuration</h2>
            <div className="form-group">
              <label>New Deployment Name *</label>
              <Input
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder={`e.g., ${suggestedName}`}
                fullWidth
              />
              <p className="field-hint">Enter a unique name for the cloned deployment</p>
            </div>

            <div className="form-group">
              <label>Target Namespace *</label>
              <Input
                value={targetNamespace}
                onChange={(e) => setTargetNamespace(e.target.value)}
                placeholder="e.g., production"
                fullWidth
              />
              <p className="field-hint">Select or enter the target namespace for the cloned deployment</p>
            </div>

            <div className="options-group">
              <h3>Clone Options</h3>
              <div className="checkbox-item">
                <input
                  type="checkbox"
                  id="clone-labels"
                  checked={cloneLabels}
                  onChange={(e) => setCloneLabels(e.target.checked)}
                />
                <label htmlFor="clone-labels">Clone labels</label>
              </div>
              <div className="checkbox-item">
                <input
                  type="checkbox"
                  id="clone-annotations"
                  checked={cloneAnnotations}
                  onChange={(e) => setCloneAnnotations(e.target.checked)}
                />
                <label htmlFor="clone-annotations">Clone annotations</label>
              </div>
            </div>

            <div className="preview-section">
              <h3>Clone Summary</h3>
              <div className="summary-card">
                <div className="summary-row">
                  <span className="summary-label">Source:</span>
                  <span className="summary-value">{namespace}/{name}</span>
                </div>
                <div className="summary-row">
                  <span className="summary-label">Target:</span>
                  <span className="summary-value">{targetNamespace || '-'}/{newName || '-'}</span>
                </div>
                <div className="summary-row">
                  <span className="summary-label">Clone labels:</span>
                  <span className="summary-value">{cloneLabels ? 'Yes' : 'No'}</span>
                </div>
                <div className="summary-row">
                  <span className="summary-label">Clone annotations:</span>
                  <span className="summary-value">{cloneAnnotations ? 'Yes' : 'No'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .workload-clone {
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

        .info-banner {
          display: flex;
          gap: 16px;
          padding: 16px;
          background: #eff6ff;
          border: 1px solid #dbeafe;
          border-radius: 8px;
          margin-bottom: 24px;
        }

        .info-icon {
          font-size: 20px;
          flex-shrink: 0;
        }

        .info-content strong {
          display: block;
          margin-bottom: 4px;
          font-size: 14px;
          color: #1e40af;
        }

        .info-content p {
          margin: 0;
          font-size: 13px;
          color: #3b82f6;
          line-height: 1.5;
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

        .source-info h2,
        .clone-config h2 {
          margin: 0 0 24px 0;
          font-size: 24px;
          font-weight: 600;
          color: #111827;
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

        .containers-info h3 {
          margin: 0 0 16px 0;
          font-size: 18px;
          font-weight: 600;
          color: #111827;
        }

        .container-item {
          display: flex;
          justify-content: space-between;
          padding: 12px;
          background: #ffffff;
          border: 1px solid #e5e7eb;
          border-radius: 6px;
          margin-bottom: 8px;
        }

        .container-name {
          font-size: 14px;
          font-weight: 600;
          color: #111827;
        }

        .container-image {
          font-size: 13px;
          color: #6b7280;
          font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
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

        .field-hint {
          margin: 8px 0 0 0;
          font-size: 13px;
          color: #6b7280;
          line-height: 1.5;
        }

        .options-group h3 {
          margin: 0 0 16px 0;
          font-size: 18px;
          font-weight: 600;
          color: #111827;
        }

        .checkbox-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px;
          background: #f9fafb;
          border: 1px solid #e5e7eb;
          border-radius: 6px;
          margin-bottom: 12px;
          cursor: pointer;
        }

        .checkbox-item input[type="checkbox"] {
          width: 18px;
          height: 18px;
        }

        .checkbox-item label {
          font-size: 14px;
          color: #374151;
          font-weight: 500;
          cursor: pointer;
        }

        .preview-section h3 {
          margin: 24px 0 16px 0;
          font-size: 18px;
          font-weight: 600;
          color: #111827;
        }

        .summary-card {
          padding: 20px;
          background: #ffffff;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
        }

        .summary-row {
          display: flex;
          justify-content: space-between;
          padding: 8px 0;
          font-size: 14px;
          border-bottom: 1px solid #e5e7eb;
        }

        .summary-row:last-child {
          border-bottom: none;
        }

        .summary-label {
          color: #6b7280;
          font-weight: 500;
        }

        .summary-value {
          color: #111827;
          font-weight: 600;
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
