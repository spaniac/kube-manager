import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createNamespace } from '@api/namespace';
import { useApiMutation } from '@hooks/useApi';
import type { Namespace } from '../types/api';
import { Input } from '@components/Input';
import { Button } from '@components/Button';
import { useToast } from '@components/Toast';

interface NamespaceFormData {
  name: string;
  labels: Record<string, string>;
  annotations: Record<string, string>;
}

export default function CreateNamespace() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [formData, setFormData] = useState<NamespaceFormData>({
    name: '',
    labels: {},
    annotations: {},
  });
  const [newLabel, setNewLabel] = useState({ key: '', value: '' });
  const [newAnnotation, setNewAnnotation] = useState({ key: '', value: '' });

  const createMutation = useApiMutation(
    async (data: NamespaceFormData) => {
      return await createNamespace({
        name: data.name,
        labels: data.labels,
        annotations: data.annotations,
      });
    },
    {
      onSuccess: (result: Namespace) => {
        showToast(`Namespace "${result.name}" created successfully`, 'success');
        navigate(`/namespaces/${result.name}`);
      },
    },
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      showToast('Namespace name is required', 'error');
      return;
    }

    try {
      await createMutation.mutateAsync(formData);
    } catch (error) {
      console.error('Failed to create namespace:', error);
    }
  };

  const addLabel = () => {
    if (!newLabel.key || !newLabel.value) return;
    setFormData({
      ...formData,
      labels: { ...formData.labels, [newLabel.key]: newLabel.value },
    });
    setNewLabel({ key: '', value: '' });
  };

  const removeLabel = (key: string) => {
    const { [key]: _, ...rest } = formData.labels;
    setFormData({ ...formData, labels: rest });
  };

  const addAnnotation = () => {
    if (!newAnnotation.key || !newAnnotation.value) return;
    setFormData({
      ...formData,
      annotations: { ...formData.annotations, [newAnnotation.key]: newAnnotation.value },
    });
    setNewAnnotation({ key: '', value: '' });
  };

  const removeAnnotation = (key: string) => {
    const { [key]: _, ...rest } = formData.annotations;
    setFormData({ ...formData, annotations: rest });
  };

  return (
    <>
      <div className="create-namespace">
        <div className="page-header">
          <h1>Create Namespace</h1>
          <Button variant="secondary" onClick={() => navigate(-1)}>
            Cancel
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="namespace-form">
          <div className="form-section">
            <h2>Basic Information</h2>
            <div className="form-group">
              <Input
                label="Namespace Name"
                placeholder="my-namespace"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                error={createMutation.isPending ? '' : undefined}
                helperText="DNS-1123 subdomain label (lowercase alphanumeric, hyphens, periods, max 253 chars)"
                fullWidth
                required
              />
            </div>
          </div>

          <div className="form-section">
            <h2>Labels</h2>
            <div className="labels-container">
              {Object.entries(formData.labels).map(([key, value]) => (
                <div key={key} className="label-row">
                  <Input
                    placeholder="Key"
                    value={key}
                    onChange={(e) => {
                      const newLabels = { ...formData.labels };
                      newLabels[e.target.value] = value;
                      delete newLabels[key];
                      setFormData({ ...formData, labels: newLabels });
                    }}
                  />
                  <Input
                    placeholder="Value"
                    value={value}
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        labels: { ...formData.labels, [key]: e.target.value },
                      });
                    }}
                  />
                  <Button
                    variant="danger"
                    size="small"
                    onClick={() => removeLabel(key)}
                  >
                    Remove
                  </Button>
                </div>
              ))}
            </div>
            <div className="add-item-row">
              <Input
                placeholder="Label key"
                value={newLabel.key}
                onChange={(e) => setNewLabel({ ...newLabel, key: e.target.value })}
              />
              <Input
                placeholder="Label value"
                value={newLabel.value}
                onChange={(e) => setNewLabel({ ...newLabel, value: e.target.value })}
              />
              <Button
                variant="secondary"
                size="small"
                onClick={addLabel}
                disabled={!newLabel.key || !newLabel.value}
              >
                Add Label
              </Button>
            </div>
          </div>

          <div className="form-section">
            <h2>Annotations</h2>
            <div className="annotations-container">
              {Object.entries(formData.annotations).map(([key, value]) => (
                <div key={key} className="annotation-row">
                  <Input
                    placeholder="Key"
                    value={key}
                    onChange={(e) => {
                      const newAnnotations = { ...formData.annotations };
                      newAnnotations[e.target.value] = value;
                      delete newAnnotations[key];
                      setFormData({ ...formData, annotations: newAnnotations });
                    }}
                  />
                  <Input
                    placeholder="Value"
                    value={value}
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        annotations: { ...formData.annotations, [key]: e.target.value },
                      });
                    }}
                  />
                  <Button
                    variant="danger"
                    size="small"
                    onClick={() => removeAnnotation(key)}
                  >
                    Remove
                  </Button>
                </div>
              ))}
            </div>
            <div className="add-item-row">
              <Input
                placeholder="Annotation key"
                value={newAnnotation.key}
                onChange={(e) => setNewAnnotation({ ...newAnnotation, key: e.target.value })}
              />
              <Input
                placeholder="Annotation value"
                value={newAnnotation.value}
                onChange={(e) => setNewAnnotation({ ...newAnnotation, value: e.target.value })}
              />
              <Button
                variant="secondary"
                size="small"
                onClick={addAnnotation}
                disabled={!newAnnotation.key || !newAnnotation.value}
              >
                Add Annotation
              </Button>
            </div>
          </div>

          <div className="form-actions">
            <Button
              variant="secondary"
              type="button"
              onClick={() => navigate('/namespaces')}
              disabled={createMutation.isPending}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              type="submit"
              disabled={createMutation.isPending}
            >
              {createMutation.isPending ? 'Creating...' : 'Create Namespace'}
            </Button>
          </div>
        </form>
      </div>

      <style>{`
        .create-namespace {
          padding: 24px;
          max-width: 800px;
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

        .namespace-form {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .form-section {
          background: white;
          padding: 20px;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
        }

        .form-section h2 {
          margin: 0 0 16px 0;
          font-size: 18px;
          font-weight: 600;
          color: #111827;
        }

        .form-group {
          margin-bottom: 16px;
        }

        .labels-container,
        .annotations-container {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-bottom: 16px;
        }

        .label-row,
        .annotation-row {
          display: grid;
          grid-template-columns: 1fr 1fr auto;
          gap: 8px;
          align-items: center;
        }

        .add-item-row {
          display: grid;
          grid-template-columns: 1fr 1fr auto;
          gap: 8px;
          padding-top: 8px;
          border-top: 1px solid #e5e7eb;
        }

        .form-actions {
          display: flex;
          gap: 12px;
          justify-content: flex-end;
          padding-top: 24px;
        }

        @media (max-width: 768px) {
          .label-row,
          .annotation-row {
            grid-template-columns: 1fr;
          }

          .add-item-row {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </>
  );
}
