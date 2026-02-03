import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getDeployment, getDeploymentYaml, scaleDeployment, restartDeployment, updateDeploymentImage } from '@api/deployment';
import { pauseDeployment, resumeDeployment } from '@api/workload';
import { useApiQuery, useApiMutation } from '@hooks/useApi';
import type { WorkloadCondition } from '@types/api';
import { Badge } from '@components/Badge';
import { Button } from '@components/Button';
import { Modal } from '@components/Modal';
import { Input } from '@components/Input';
import { Spinner } from '@components/Spinner';
import { Table, TableStyles } from '@components/Table';
import { Toast } from '@components/Toast';

export default function DeploymentDetails() {
  const { namespace, name } = useParams<{ namespace: string; name: string }>();
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState<'overview' | 'conditions' | 'yaml'>('overview');
  const [showScaleModal, setShowScaleModal] = useState(false);
  const [showRestartModal, setShowRestartModal] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [showPauseModal, setShowPauseModal] = useState(false);
  const [scaleReplicas, setScaleReplicas] = useState(1);
  const [newImage, setNewImage] = useState('');
  const [showYamlModal, setShowYamlModal] = useState(false);

  const { data: deployment, isLoading, error, refetch } = useApiQuery(
    ['deployment', namespace, name],
    () => (namespace && name ? getDeployment(namespace, name) : Promise.reject(new Error('Missing params'))),
  );

  const { data: yamlData } = useApiQuery(
    ['deployment-yaml', namespace, name],
    () =>
      namespace && name
        ? getDeploymentYaml(namespace, name)
        : Promise.reject(new Error('Missing params')),
    { enabled: showYamlModal },
  );

  const scaleMutation = useApiMutation(
    async (replicas: number) => {
      if (namespace && name) {
        await scaleDeployment(namespace, name, replicas);
      }
    },
    {
      onSuccess: () => {
        Toast.show('Deployment scaled successfully', 'success');
        refetch();
        setShowScaleModal(false);
      },
    },
  );

  const restartMutation = useApiMutation(
    async () => {
      if (namespace && name) {
        await restartDeployment(namespace, name);
      }
    },
    {
      onSuccess: () => {
        Toast.show('Deployment restarted successfully', 'success');
        refetch();
        setShowRestartModal(false);
      },
    },
  );

  const updateImageMutation = useApiMutation(
    async (image: string) => {
      if (namespace && name) {
        await updateDeploymentImage(namespace, name, image);
      }
    },
    {
      onSuccess: () => {
        Toast.show('Deployment image updated successfully', 'success');
        refetch();
        setShowImageModal(false);
      },
    },
  );

  const pauseMutation = useApiMutation(
    async () => {
      if (namespace && name) {
        await pauseDeployment(namespace, name);
      }
    },
    {
      onSuccess: () => {
        Toast.show('Deployment paused successfully', 'success');
        refetch();
        setShowPauseModal(false);
      },
      onError: (error) => {
        Toast.show(`Failed to pause deployment: ${(error as Error).message}`, 'error');
      },
    },
  );

  const resumeMutation = useApiMutation(
    async () => {
      if (namespace && name) {
        await resumeDeployment(namespace, name);
      }
    },
    {
      onSuccess: () => {
        Toast.show('Deployment resumed successfully', 'success');
        refetch();
        setShowPauseModal(false);
      },
      onError: (error) => {
        Toast.show(`Failed to resume deployment: ${(error as Error).message}`, 'error');
      },
    },
  );

  if (error) {
    return (
      <div className="deployment-details">
        <div className="error-message">Error loading deployment: {(error as Error).message}</div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="deployment-details">
        <Spinner />
      </div>
    );
  }

  if (!deployment) {
    return <div className="deployment-details">Deployment not found</div>;
  }

  const conditions: WorkloadCondition[] = deployment.template?.containers.length > 0
    ? [
        {
          type: 'Available',
          status: deployment.availableReplicas > 0 ? 'True' : 'False',
          reason: deployment.availableReplicas > 0 ? 'MinimumReplicasAvailable' : 'MinimumReplicasUnavailable',
        },
        {
          type: 'Progressing',
          status: deployment.updatedReplicas === deployment.replicas ? 'True' : 'False',
          reason: 'ReplicaSetUpdated',
        },
      ]
    : [];

  const conditionColumns = [
    { key: 'type' as keyof WorkloadCondition, header: 'Type' },
    {
      key: 'status' as keyof WorkloadCondition,
      header: 'Status',
      render: (value: string) => (
        <Badge status={value === 'True' ? 'Running' : 'Pending'} />
      ),
    },
    { key: 'reason' as keyof WorkloadCondition, header: 'Reason' },
    { key: 'message' as keyof WorkloadCondition, header: 'Message', render: (v: string) => v || '-' },
  ];

  const handleScale = () => {
    setScaleReplicas(deployment.replicas);
    setShowScaleModal(true);
  };

  const handleRestart = () => {
    setShowRestartModal(true);
  };

  const handleUpdateImage = () => {
    if (deployment.template?.containers[0]) {
      setNewImage(deployment.template.containers[0].image);
      setShowImageModal(true);
    }
  };

  const handleScaleSubmit = () => {
    scaleMutation.mutate(scaleReplicas);
  };

  const handleRestartSubmit = () => {
    restartMutation.mutate();
  };

  const handleUpdateImageSubmit = () => {
    updateImageMutation.mutate(newImage);
  };

  return (
    <>
      <div className="deployment-details">
        <div className="page-header">
          <div>
            <h1>Deployment: {deployment.name}</h1>
            <span className="namespace-badge">{deployment.namespace}</span>
          </div>
          <div className="header-actions">
            <Button variant="secondary" onClick={handleScale}>
              Scale
            </Button>
            <Button variant="secondary" onClick={handleRestart}>
              Restart
            </Button>
            <Button variant="secondary" onClick={handleUpdateImage}>
              Update Image
            </Button>
            <Button variant="secondary" onClick={() => setShowPauseModal(true)}>
              Pause/Resume
            </Button>
            <Button variant="secondary" onClick={() => navigate(`/deployments/${namespace}/${name}/rollback`)}>
              Rollback
            </Button>
            <Button variant="secondary" onClick={() => navigate(`/deployments/${namespace}/${name}/strategy`)}>
              Strategy
            </Button>
            <Button variant="secondary" onClick={() => navigate(`/deployments/${namespace}/${name}/resources`)}>
              Resources
            </Button>
            <Button variant="secondary" onClick={() => navigate(`/deployments/${namespace}/${name}/env`)}>
              Env Vars
            </Button>
            <Button variant="secondary" onClick={() => navigate(`/deployments/${namespace}/${name}/clone`)}>
              Clone
            </Button>
            <Button variant="secondary" onClick={() => setShowYamlModal(true)}>
              View YAML
            </Button>
          </div>
        </div>

        <div className="tabs">
          {['overview', 'conditions', 'yaml'].map((tab) => (
            <button
              key={tab}
              className={`tab ${selectedTab === tab ? 'active' : ''}`}
              onClick={() => setSelectedTab(tab as 'overview' | 'conditions' | 'yaml')}
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
                  <h3>Replicas</h3>
                  <p>{deployment.replicas}</p>
                </div>
                <div className="info-card">
                  <h3>Ready Replicas</h3>
                  <p>{deployment.readyReplicas}</p>
                </div>
                <div className="info-card">
                  <h3>Available Replicas</h3>
                  <p>{deployment.availableReplicas}</p>
                </div>
                <div className="info-card">
                  <h3>Updated Replicas</h3>
                  <p>{deployment.updatedReplicas}</p>
                </div>
                <div className="info-card">
                  <h3>Strategy</h3>
                  <p>{deployment.strategy || 'RollingUpdate'}</p>
                </div>
                <div className="info-card">
                  <h3>Selector</h3>
                  <p>{deployment.selector || '-'}</p>
                </div>
              </div>

              <div className="containers-section">
                <h3>Containers</h3>
                {deployment.template?.containers.map((container, index) => (
                  <div key={index} className="container-card">
                    <h4>{container.name}</h4>
                    <p><strong>Image:</strong> {container.image}</p>
                    <p><strong>Ready:</strong> {container.ready ? 'Yes' : 'No'}</p>
                    <p><strong>Restarts:</strong> {container.restartCount}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {selectedTab === 'conditions' && (
            <div className="conditions-section">
              <TableStyles />
              <Table
                data={conditions}
                columns={conditionColumns}
                emptyMessage="No conditions available"
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
          isOpen={showScaleModal}
          onClose={() => setShowScaleModal(false)}
          title={`Scale Deployment: ${deployment.name}`}
          size="sm"
        >
          <div className="modal-form">
            <label>Number of replicas:</label>
            <Input
              type="number"
              min="0"
              value={scaleReplicas}
              onChange={(e) => setScaleReplicas(Number(e.target.value))}
              fullWidth
            />
            <div className="modal-actions">
              <Button variant="secondary" onClick={() => setShowScaleModal(false)}>
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={handleScaleSubmit}
                loading={scaleMutation.isLoading}
              >
                Scale
              </Button>
            </div>
          </div>
        </Modal>

        <Modal
          isOpen={showRestartModal}
          onClose={() => setShowRestartModal(false)}
          title={`Restart Deployment: ${deployment.name}`}
          size="sm"
        >
          <div className="modal-form">
            <p>Are you sure you want to restart this deployment? This will restart all pods.</p>
            <div className="modal-actions">
              <Button variant="secondary" onClick={() => setShowRestartModal(false)}>
                Cancel
              </Button>
              <Button
                variant="danger"
                onClick={handleRestartSubmit}
                loading={restartMutation.isLoading}
              >
                Restart
              </Button>
            </div>
          </div>
        </Modal>

        <Modal
          isOpen={showImageModal}
          onClose={() => setShowImageModal(false)}
          title={`Update Image: ${deployment.name}`}
          size="sm"
        >
          <div className="modal-form">
            <label>Container Image:</label>
            <Input
              value={newImage}
              onChange={(e) => setNewImage(e.target.value)}
              placeholder="e.g., nginx:latest"
              fullWidth
            />
            <div className="modal-actions">
              <Button variant="secondary" onClick={() => setShowImageModal(false)}>
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={handleUpdateImageSubmit}
                loading={updateImageMutation.isLoading}
              >
                Update
              </Button>
            </div>
          </div>
        </Modal>

        <Modal
          isOpen={showYamlModal}
          onClose={() => setShowYamlModal(false)}
          title={`Deployment YAML: ${deployment.name}`}
          size="xl"
        >
          {yamlData ? (
            <pre className="yaml-modal-content">{yamlData.yaml}</pre>
          ) : (
            <Spinner />
          )}
        </Modal>

        <Modal
          isOpen={showPauseModal}
          onClose={() => setShowPauseModal(false)}
          title={`${deployment.replicas > 0 ? 'Pause' : 'Resume'} Deployment: ${deployment.name}`}
          size="sm"
        >
          <div className="modal-form">
            <p>Are you sure you want to {deployment.replicas > 0 ? 'pause' : 'resume'} this deployment?</p>
            <div className="modal-actions">
              <Button variant="secondary" onClick={() => setShowPauseModal(false)}>
                Cancel
              </Button>
              <Button
                variant={deployment.replicas > 0 ? 'warning' : 'primary'}
                onClick={() => deployment.replicas > 0 ? pauseMutation.mutate() : resumeMutation.mutate()}
                loading={pauseMutation.isLoading || resumeMutation.isLoading}
              >
                {deployment.replicas > 0 ? 'Pause' : 'Resume'}
              </Button>
            </div>
          </div>
        </Modal>
      </div>

      <style>{`
        .deployment-details {
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
          font-size: 18px;
          font-weight: 600;
          color: #111827;
        }

        .containers-section, .conditions-section, .yaml-section {
          margin-top: 24px;
        }

        .containers-section h3, .conditions-section h3 {
          margin: 0 0 16px 0;
          font-size: 18px;
          font-weight: 600;
          color: #111827;
        }

        .container-card {
          padding: 16px;
          background: #f9fafb;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          margin-bottom: 12px;
        }

        .container-card h4 {
          margin: 0 0 8px 0;
          font-size: 16px;
          font-weight: 600;
          color: #111827;
        }

        .container-card p {
          margin: 4px 0;
          font-size: 14px;
          color: #374151;
        }

        .yaml-content {
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

        .modal-form {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .modal-form label {
          font-size: 14px;
          font-weight: 500;
          color: #374151;
        }

        .modal-form p {
          margin: 0;
          font-size: 14px;
          color: #374151;
        }

        .modal-actions {
          display: flex;
          gap: 12px;
          justify-content: flex-end;
          margin-top: 8px;
        }

        .error-message {
          padding: 16px;
          background: #fef2f2;
          border: 1px solid #fecaca;
          border-radius: 6px;
          color: #b91c1c;
        }
      `}</style>
    </>
  );
}
