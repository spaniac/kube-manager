import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getDeployment } from '@api/deployment';
import { updateContainerEnvVars } from '@api/workload';
import { useApiQuery, useApiMutation } from '@hooks/useApi';
import type { Deployment } from '@types/api';
import { Button } from '@components/Button';
import { Input } from '@components/Input';
import { Spinner } from '@components/Spinner';
import { useToast } from '@components/Toast';
import { Badge } from '@components/Badge';

interface EnvVar {
  key: string;
  value: string;
  isSecret: boolean;
}

export default function WorkloadEnvEditor() {
  const { namespace, name } = useParams<{ namespace: string; name: string }>();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [selectedContainer, setSelectedContainer] = useState<string>('');
  const [envVars, setEnvVars] = useState<EnvVar[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newKey, setNewKey] = useState('');
  const [newValue, setNewValue] = useState('');
  const [newIsSecret, setNewIsSecret] = useState(false);

  const { data: deployment, isLoading, error, refetch } = useApiQuery(
    ['deployment', namespace, name],
    () => (namespace && name ? getDeployment(namespace, name) : Promise.reject(new Error('Missing params'))),
  );

  const updateMutation = useApiMutation(
    async (data: { containerName: string; request: any }) => {
      return await updateContainerEnvVars(
        namespace || '',
        name || '',
        data.containerName,
        data.request,
      );
    },
    {
      onSuccess: () => {
        showToast({ message: 'Environment variables updated successfully', type: 'success' });
        refetch();
        navigate(-1);
      },
      onError: (error) => {
        showToast({ message: `Failed to update environment variables: ${(error as Error).message}`, type: 'error' });
      },
    },
  );

  const handleContainerSelect = (containerName: string) => {
    setSelectedContainer(containerName);
    const container = deployment?.template?.containers.find(c => c.name === containerName);
    if (container) {
      setEnvVars([
        { key: 'ENV1', value: 'value1', isSecret: false },
        { key: 'ENV2', value: 'value2', isSecret: true },
      ]);
    }
  };

  const handleEnvVarChange = (index: number, field: keyof EnvVar, value: string | boolean) => {
    setEnvVars(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const handleAddEnvVar = () => {
    if (newKey && newValue) {
      setEnvVars(prev => [...prev, { key: newKey, value: newValue, isSecret: newIsSecret }]);
      setNewKey('');
      setNewValue('');
      setNewIsSecret(false);
      setShowAddModal(false);
    }
  };

  const handleRemoveEnvVar = (index: number) => {
    setEnvVars(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    const envVarsMap: Record<string, string> = {};
    envVars.forEach(env => {
      envVarsMap[env.key] = env.value;
    });

    updateMutation.mutate({
      containerName: selectedContainer,
      request: { envVars: envVarsMap },
    });
  };

  if (error) {
    return (
      <div className="workload-env-editor">
        <div className="error-message">Error loading deployment: {(error as Error).message}</div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="workload-env-editor">
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
      <div className="workload-env-editor">
        <div className="page-header">
          <div>
            <h1>Environment Variables: {name}</h1>
            <span className="namespace-badge">{namespace}</span>
          </div>
          <div className="header-actions">
            <Button variant="secondary" onClick={() => navigate(-1)}>
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={handleSubmit}
              loading={updateMutation.isPending}
              disabled={!selectedContainer}
            >
              Save Changes
            </Button>
          </div>
        </div>

        <div className="info-banner">
          <div className="info-icon">ℹ️</div>
          <div className="info-content">
            <strong>Environment Variables</strong>
            <p>Configure environment variables for container processes. Variables marked as secrets should reference Kubernetes secrets rather than storing values directly.</p>
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
            <div className="env-vars-editor">
              <div className="editor-header">
                <h2>Environment Variables: {selectedContainer}</h2>
                <Button variant="secondary" size="sm" onClick={() => setShowAddModal(true)}>
                  Add Variable
                </Button>
              </div>

              {envVars.length === 0 ? (
                <div className="empty-env">
                  <p>No environment variables configured</p>
                  <Button variant="secondary" size="sm" onClick={() => setShowAddModal(true)}>
                    Add First Variable
                  </Button>
                </div>
              ) : (
                <div className="env-vars-list">
                  {envVars.map((env, index) => (
                    <div key={index} className="env-var-card">
                      <div className="env-var-header">
                        <div className="env-var-key">{env.key}</div>
                        <div className="env-var-actions">
                          <Button
                            variant="secondary"
                            size="sm"
                            onClick={() => handleRemoveEnvVar(index)}
                          >
                            Remove
                          </Button>
                        </div>
                      </div>
                      <div className="env-var-body">
                        <div className="input-group">
                          <label>Value</label>
                          <Input
                            type={env.isSecret ? 'password' : 'text'}
                            value={env.value}
                            onChange={(e) => handleEnvVarChange(index, 'value', e.target.value)}
                            placeholder="Enter value..."
                            fullWidth
                          />
                        </div>
                        <div className="checkbox-group">
                          <input
                            type="checkbox"
                            id={`secret-${index}`}
                            checked={env.isSecret}
                            onChange={(e) => handleEnvVarChange(index, 'isSecret', e.target.checked)}
                          />
                          <label htmlFor={`secret-${index}`}>Mark as secret</label>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {!selectedContainer && (
            <div className="empty-editor">
              <p>Select a container to edit its environment variables</p>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .workload-env-editor {
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
        .env-vars-editor h2 {
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

        .env-vars-editor {
          padding: 20px;
          background: #ffffff;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
        }

        .editor-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .empty-env {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
          padding: 48px;
          background: #f9fafb;
          border-radius: 8px;
        }

        .empty-env p {
          margin: 0;
          font-size: 14px;
          color: #6b7280;
        }

        .env-vars-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .env-var-card {
          padding: 16px;
          background: #f9fafb;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
        }

        .env-var-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }

        .env-var-key {
          font-size: 14px;
          font-weight: 600;
          color: #111827;
          font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
        }

        .env-var-body {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .input-group label {
          display: block;
          font-size: 13px;
          font-weight: 500;
          color: #374151;
          margin-bottom: 8px;
        }

        .checkbox-group {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .checkbox-group input[type="checkbox"] {
          width: 16px;
          height: 16px;
        }

        .checkbox-group label {
          font-size: 13px;
          color: #374151;
          font-weight: 500;
          cursor: pointer;
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
