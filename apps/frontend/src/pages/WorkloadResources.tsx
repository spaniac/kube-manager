import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getDeployment } from '@api/deployment';
import { updateContainerResources } from '@api/workload';
import { useApiQuery, useApiMutation } from '@hooks/useApi';
import type { Deployment } from '@types/api';
import { Button } from '@components/Button';
import { Input } from '@components/Input';
import { Spinner } from '@components/Spinner';
import { useToast } from '@components/Toast';
import { Badge } from '@components/Badge';

interface ContainerResources {
  containerName: string;
  cpuRequest: string;
  cpuLimit: string;
  memoryRequest: string;
  memoryLimit: string;
}

export default function WorkloadResources() {
  const { namespace, name } = useParams<{ namespace: string; name: string }>();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [selectedContainer, setSelectedContainer] = useState<string>('');
  const [resources, setResources] = useState<ContainerResources>({
    containerName: '',
    cpuRequest: '',
    cpuLimit: '',
    memoryRequest: '',
    memoryLimit: '',
  });
  const [showPreview, setShowPreview] = useState(false);

  const { data: deployment, isLoading, error, refetch } = useApiQuery(
    ['deployment', namespace, name],
    () => (namespace && name ? getDeployment(namespace, name) : Promise.reject(new Error('Missing params'))),
  );

  const updateMutation = useApiMutation(
    async (data: { containerName: string; request: any }) => {
      return await updateContainerResources(
        namespace || '',
        name || '',
        data.containerName,
        data.request,
      );
    },
    {
      onSuccess: () => {
        showToast({ message: 'Container resources updated successfully', type: 'success' });
        refetch();
        navigate(-1);
      },
      onError: (error) => {
        showToast({ message: `Failed to update resources: ${(error as Error).message}`, type: 'error' });
      },
    },
  );

  const handleContainerSelect = (containerName: string) => {
    setSelectedContainer(containerName);
    const container = deployment?.template?.containers.find(c => c.name === containerName);
    if (container) {
      setResources({
        containerName,
        cpuRequest: '',
        cpuLimit: '',
        memoryRequest: '',
        memoryLimit: '',
      });
    }
  };

  const handleResourceChange = (field: keyof ContainerResources, value: string) => {
    setResources(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    const request: any = {};
    if (resources.cpuRequest) request.cpuRequest = resources.cpuRequest;
    if (resources.cpuLimit) request.cpuLimit = resources.cpuLimit;
    if (resources.memoryRequest) request.memoryRequest = resources.memoryRequest;
    if (resources.memoryLimit) request.memoryLimit = resources.memoryLimit;

    updateMutation.mutate({
      containerName: resources.containerName,
      request,
    });
  };

  const formatMemory = (value: string): string => {
    if (!value) return '-';
    const units = ['Ki', 'Mi', 'Gi'];
    let bytes = parseInt(value);
    let unitIndex = 0;
    while (bytes >= 1024 && unitIndex < units.length - 1) {
      bytes /= 1024;
      unitIndex++;
    }
    return `${bytes.toFixed(1)} ${units[unitIndex]}`;
  };

  const formatCpu = (value: string): string => {
    if (!value) return '-';
    const millicores = parseInt(value);
    if (millicores < 1000) {
      return `${millicores}m`;
    }
    return `${(millicores / 1000).toFixed(2)}`;
  };

  if (error) {
    return (
      <div className="workload-resources">
        <div className="error-message">Error loading deployment: {(error as Error).message}</div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="workload-resources">
        <div className="loading-container">
          <Spinner />
          <p>Loading deployment...</p>
        </div>
      </div>
    );
  }

  const containers = deployment?.template?.containers || [];

  return (
    <>
      <div className="workload-resources">
        <div className="page-header">
          <div>
            <h1>Container Resources: {name}</h1>
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
              disabled={!selectedContainer}
            >
              Update Resources
            </Button>
          </div>
        </div>

        <div className="info-banner">
          <div className="info-icon">ℹ️</div>
          <div className="info-content">
            <strong>Resource Requests and Limits</strong>
            <p>Configure CPU and memory requests (guaranteed resources) and limits (maximum resources) for each container. Requests ensure the container gets the specified amount, while limits prevent it from exceeding.</p>
          </div>
        </div>

        <div className="content-sections">
          <div className="containers-section">
            <h2>Containers</h2>
            <div className="containers-list">
              {containers.length === 0 ? (
                <div className="empty-state">
                  <p>No containers found</p>
                </div>
              ) : (
                containers.map((container) => (
                  <div
                    key={container.name}
                    className={`container-card ${selectedContainer === container.name ? 'selected' : ''}`}
                    onClick={() => handleContainerSelect(container.name)}
                  >
                    <div className="container-header">
                      <div className="container-name">{container.name}</div>
                      <div className="container-status">
                        {container.ready ? (
                          <Badge status="Running" label="Ready" />
                        ) : (
                          <Badge status="Pending" label="Not Ready" />
                        )}
                      </div>
                    </div>
                    <div className="container-info">
                      <span className="info-item">Image: {container.image}</span>
                      <span className="info-item">Restarts: {container.restartCount}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {selectedContainer && (
            <div className="resources-editor">
              <h2>Resources: {selectedContainer}</h2>
              <div className="resources-grid">
                <div className="resource-section">
                  <h3>CPU</h3>
                  <div className="resource-inputs">
                    <div className="input-group">
                      <label>Request</label>
                      <Input
                        value={resources.cpuRequest}
                        onChange={(e) => handleResourceChange('cpuRequest', e.target.value)}
                        placeholder="e.g., 500m or 0.5"
                        fullWidth
                      />
                      <p className="input-hint">Minimum guaranteed CPU cores (e.g., 100m, 0.5, 1)</p>
                    </div>
                    <div className="input-group">
                      <label>Limit</label>
                      <Input
                        value={resources.cpuLimit}
                        onChange={(e) => handleResourceChange('cpuLimit', e.target.value)}
                        placeholder="e.g., 1000m or 1"
                        fullWidth
                      />
                      <p className="input-hint">Maximum CPU cores allowed (e.g., 500m, 1, 2)</p>
                    </div>
                  </div>
                </div>

                <div className="resource-section">
                  <h3>Memory</h3>
                  <div className="resource-inputs">
                    <div className="input-group">
                      <label>Request</label>
                      <Input
                        value={resources.memoryRequest}
                        onChange={(e) => handleResourceChange('memoryRequest', e.target.value)}
                        placeholder="e.g., 256Mi or 1Gi"
                        fullWidth
                      />
                      <p className="input-hint">Minimum guaranteed memory (e.g., 256Mi, 512Mi, 1Gi)</p>
                    </div>
                    <div className="input-group">
                      <label>Limit</label>
                      <Input
                        value={resources.memoryLimit}
                        onChange={(e) => handleResourceChange('memoryLimit', e.target.value)}
                        placeholder="e.g., 512Mi or 2Gi"
                        fullWidth
                      />
                      <p className="input-hint">Maximum memory allowed (e.g., 512Mi, 1Gi, 2Gi)</p>
                    </div>
                  </div>
                </div>
              </div>

              <button
                className="preview-button"
                onClick={() => setShowPreview(!showPreview)}
              >
                {showPreview ? 'Hide' : 'Show'} YAML Preview
              </button>

              {showPreview && (
                <div className="yaml-preview">
                  <pre>{`resources:
  requests:
    cpu: ${resources.cpuRequest || 'not set'}
    memory: ${resources.memoryRequest || 'not set'}
  limits:
    cpu: ${resources.cpuLimit || 'not set'}
    memory: ${resources.memoryLimit || 'not set'}`}</pre>
                </div>
              )}
            </div>
          )}

          {!selectedContainer && (
            <div className="empty-editor">
              <p>Select a container to configure its resources</p>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .workload-resources {
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
          grid-template-columns: 1fr 2fr;
          gap: 32px;
        }

        .containers-section h2,
        .resources-editor h2 {
          margin: 0 0 20px 0;
          font-size: 24px;
          font-weight: 600;
          color: #111827;
        }

        .containers-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .empty-state {
          padding: 48px;
          text-align: center;
          background: #f9fafb;
          border-radius: 8px;
        }

        .empty-state p {
          margin: 0;
          font-size: 14px;
          color: #6b7280;
        }

        .container-card {
          padding: 16px;
          background: #ffffff;
          border: 2px solid #e5e7eb;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s;
        }

        .container-card:hover {
          border-color: #3b82f6;
          box-shadow: 0 2px 8px rgba(59, 130, 246, 0.1);
        }

        .container-card.selected {
          border-color: #3b82f6;
          background: #eff6ff;
        }

        .container-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }

        .container-name {
          font-size: 16px;
          font-weight: 600;
          color: #111827;
        }

        .container-info {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          font-size: 12px;
          color: #6b7280;
        }

        .resources-editor {
          padding: 20px;
          background: #ffffff;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
        }

        .resources-grid {
          display: grid;
          gap: 24px;
          margin-bottom: 24px;
        }

        .resource-section h3 {
          margin: 0 0 16px 0;
          font-size: 18px;
          font-weight: 600;
          color: #111827;
        }

        .resource-inputs {
          display: grid;
          gap: 20px;
        }

        .input-group label {
          display: block;
          font-size: 14px;
          font-weight: 500;
          color: #374151;
          margin-bottom: 8px;
        }

        .input-hint {
          margin: 8px 0 0 0;
          font-size: 12px;
          color: #6b7280;
          line-height: 1.5;
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

        .empty-editor {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 48px;
          background: #f9fafb;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          min-height: 200px;
        }

        .empty-editor p {
          margin: 0;
          font-size: 14px;
          color: #6b7280;
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
