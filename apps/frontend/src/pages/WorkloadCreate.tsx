import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createWorkload } from '@api/workload';
import { useApiMutation } from '@hooks/useApi';
import { Button } from '@components/Button';
import { Input } from '@components/Input';
import { Spinner } from '@components/Spinner';
import { useToast } from '@components/Toast';
import { ResourceYaml } from '@components/ResourceYaml';

const WORKLOAD_TEMPLATES: Record<string, string> = {
  Deployment: `apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-deployment
  namespace: default
spec:
  replicas: 1
  selector:
    matchLabels:
      app: my-app
  template:
    metadata:
      labels:
        app: my-app
    spec:
      containers:
      - name: my-container
        image: nginx:latest
        ports:
        - containerPort: 80`,
  StatefulSet: `apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: my-statefulset
  namespace: default
spec:
  serviceName: my-service
  replicas: 1
  selector:
    matchLabels:
      app: my-app
  template:
    metadata:
      labels:
        app: my-app
    spec:
      containers:
      - name: my-container
        image: nginx:latest
        ports:
        - containerPort: 80`,
  DaemonSet: `apiVersion: apps/v1
kind: DaemonSet
metadata:
  name: my-daemonset
  namespace: default
spec:
  selector:
    matchLabels:
      app: my-app
  template:
    metadata:
      labels:
        app: my-app
    spec:
      containers:
      - name: my-container
        image: nginx:latest
        ports:
        - containerPort: 80`,
  Job: `apiVersion: batch/v1
kind: Job
metadata:
  name: my-job
  namespace: default
spec:
  template:
    spec:
      containers:
      - name: my-container
        image: busybox
        command: ["/bin/sh", "-c", "echo hello world"]
      restartPolicy: OnFailure`,
  CronJob: `apiVersion: batch/v1
kind: CronJob
metadata:
  name: my-cronjob
  namespace: default
spec:
  schedule: "*/5 * * * *"
  jobTemplate:
    spec:
      template:
        spec:
          containers:
          - name: my-container
            image: busybox
            command: ["/bin/sh", "-c", "date"]
          restartPolicy: OnFailure`,
};

export default function WorkloadCreate() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [step, setStep] = useState<'type' | 'yaml' | 'review'>('type');
  const [selectedType, setSelectedType] = useState<string>('');
  const [yaml, setYaml] = useState<string>('');
  const [dryRun, setDryRun] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const createMutation = useApiMutation(
    async (data: { yaml: string; namespace?: string; dryRun?: boolean }) => {
      return await createWorkload(data);
    },
    {
      onSuccess: (data) => {
        if (dryRun) {
          showToast({ message: 'Validation successful - workload is valid', type: 'success' });
        } else {
          showToast({ message: `Workload ${data.kind} ${data.name} created successfully in ${data.namespace}`, type: 'success' });
          navigate(`/deployments/${data.namespace}/${data.name}`);
        }
      },
      onError: (error) => {
        showToast({ message: `Failed to create workload: ${(error as Error).message}`, type: 'error' });
      },
    },
  );

  const handleTypeSelect = (type: string) => {
    setSelectedType(type);
    setYaml(WORKLOAD_TEMPLATES[type]);
    setStep('yaml');
  };

  const handleYamlChange = (value: string) => {
    setYaml(value);
  };

  const handleValidate = () => {
    setDryRun(true);
    createMutation.mutate({ yaml, dryRun: true });
  };

  const handleCreate = () => {
    setDryRun(false);
    createMutation.mutate({ yaml, dryRun: false });
  };

  const handleBack = () => {
    if (step === 'yaml') {
      setStep('type');
    } else if (step === 'review') {
      setStep('yaml');
    }
  };

  return (
    <>
      <div className="workload-create">
        <div className="page-header">
          <div>
            <h1>Create Workload</h1>
            <p>Create a new Kubernetes workload from YAML</p>
          </div>
          <div className="header-actions">
            <Button variant="secondary" onClick={() => navigate(-1)}>
              Cancel
            </Button>
          </div>
        </div>

        {step === 'type' && (
          <div className="type-selection">
            <h2>Select Workload Type</h2>
            <div className="type-grid">
              {Object.keys(WORKLOAD_TEMPLATES).map((type) => (
                <button
                  key={type}
                  className={`type-card ${selectedType === type ? 'selected' : ''}`}
                  onClick={() => handleTypeSelect(type)}
                >
                  <div className="type-icon">{type.charAt(0)}</div>
                  <div className="type-name">{type}</div>
                  <div className="type-description">
                    {type === 'Deployment' && 'Manages stateless applications with scaling and rolling updates'}
                    {type === 'StatefulSet' && 'Manages stateful applications with stable network identities'}
                    {type === 'DaemonSet' && 'Ensures a copy of a pod runs on every node'}
                    {type === 'Job' && 'Runs one or more pods to completion'}
                    {type === 'CronJob' && 'Runs jobs on a schedule'}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 'yaml' && (
          <div className="yaml-editor-section">
            <div className="yaml-header">
              <div className="yaml-title">
                <h2>Edit YAML</h2>
                <span className="selected-type-badge">{selectedType}</span>
              </div>
              <div className="yaml-actions">
                <Button variant="secondary" size="sm" onClick={handleBack}>
                  Back
                </Button>
                <Button variant="secondary" size="sm" onClick={handleValidate} loading={createMutation.isLoading}>
                  Validate
                </Button>
                <Button variant="primary" size="sm" onClick={() => setStep('review')}>
                  Review
                </Button>
              </div>
            </div>
            <div className="yaml-editor-container">
              <textarea
                className="yaml-textarea"
                value={yaml}
                onChange={(e) => handleYamlChange(e.target.value)}
                placeholder="Paste or type your YAML here..."
                spellCheck={false}
              />
            </div>
            {showPreview && (
              <div className="yaml-preview">
                <h3>Preview</h3>
                <ResourceYaml code={yaml} language="yaml" />
              </div>
            )}
          </div>
        )}

        {step === 'review' && (
          <div className="review-section">
            <div className="review-header">
              <div>
                <h2>Review Workload</h2>
                <p>Review the workload before creating</p>
              </div>
              <div className="review-actions">
                <Button variant="secondary" onClick={handleBack}>
                  Back
                </Button>
                <Button
                  variant="primary"
                  onClick={handleCreate}
                  loading={createMutation.isLoading}
                >
                  Create Workload
                </Button>
              </div>
            </div>
            <div className="yaml-preview">
              <ResourceYaml code={yaml} language="yaml" />
            </div>
          </div>
        )}
      </div>

      <style>{`
        .workload-create {
          padding: 24px;
          max-width: 1400px;
          margin: 0 auto;
        }

        .page-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 32px;
          padding-bottom: 16px;
          border-bottom: 1px solid #e5e7eb;
        }

        .page-header h1 {
          margin: 0 0 8px 0;
          font-size: 28px;
          font-weight: 700;
          color: #111827;
        }

        .page-header p {
          margin: 0;
          font-size: 14px;
          color: #6b7280;
        }

        .header-actions {
          display: flex;
          gap: 12px;
        }

        .type-selection h2 {
          margin: 0 0 24px 0;
          font-size: 24px;
          font-weight: 600;
          color: #111827;
        }

        .type-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 20px;
        }

        .type-card {
          padding: 24px;
          background: #ffffff;
          border: 2px solid #e5e7eb;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.2s;
          text-align: left;
        }

        .type-card:hover {
          border-color: #3b82f6;
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.15);
          transform: translateY(-2px);
        }

        .type-card.selected {
          border-color: #3b82f6;
          background: #eff6ff;
        }

        .type-icon {
          width: 48px;
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #3b82f6, #8b5cf6);
          color: white;
          border-radius: 12px;
          font-size: 24px;
          font-weight: 700;
          margin-bottom: 16px;
        }

        .type-name {
          font-size: 18px;
          font-weight: 600;
          color: #111827;
          margin-bottom: 8px;
        }

        .type-description {
          font-size: 13px;
          color: #6b7280;
          line-height: 1.5;
        }

        .yaml-editor-section {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .yaml-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-bottom: 16px;
          border-bottom: 1px solid #e5e7eb;
        }

        .yaml-title {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .yaml-title h2 {
          margin: 0;
          font-size: 24px;
          font-weight: 600;
          color: #111827;
        }

        .selected-type-badge {
          padding: 4px 12px;
          background: #dbeafe;
          color: #1e40af;
          border-radius: 999px;
          font-size: 12px;
          font-weight: 500;
        }

        .yaml-actions {
          display: flex;
          gap: 12px;
        }

        .yaml-editor-container {
          position: relative;
        }

        .yaml-textarea {
          width: 100%;
          min-height: 500px;
          padding: 20px;
          background: #1e1e1e;
          color: #d4d4d4;
          border: none;
          border-radius: 8px;
          font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
          font-size: 13px;
          line-height: 1.6;
          resize: vertical;
        }

        .yaml-textarea:focus {
          outline: none;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.3);
        }

        .yaml-preview {
          margin-top: 20px;
        }

        .yaml-preview h3 {
          margin: 0 0 16px 0;
          font-size: 18px;
          font-weight: 600;
          color: #111827;
        }

        .review-section {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .review-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          padding-bottom: 16px;
          border-bottom: 1px solid #e5e7eb;
        }

        .review-header h2 {
          margin: 0 0 8px 0;
          font-size: 24px;
          font-weight: 600;
          color: #111827;
        }

        .review-header p {
          margin: 0;
          font-size: 14px;
          color: #6b7280;
        }

        .review-actions {
          display: flex;
          gap: 12px;
        }
      `}</style>
    </>
  );
}
