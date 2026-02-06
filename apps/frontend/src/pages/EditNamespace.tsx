import { useParams, useNavigate } from 'react';
import { useState } from 'react';
import { getNamespace, updateNamespace } from '@api/namespace';
import { useApiQuery, useApiMutation } from '@hooks/useApi';
import type { Namespace } from '@types/api';
import { Input } from '@components/Input';
import { Button } from '@components/Button';
import { useToast } from '@components/Toast';

interface NamespaceFormData {
  labels: Record<string, string>;
  annotations: Record<string, string>;
}

export default function EditNamespace() {
  const { name } = useParams<{ name: string }>();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<NamespaceFormData>({
    labels: {},
    annotations: {},
  });
  const [newLabel, setNewLabel] = useState({ key: '', value: '' });
  const [newAnnotation, setNewAnnotation] = useState({ key: '', value: '' });

  const { data: namespace, isLoading, error, refetch } = useApiQuery(
    ['namespace', name],
    () => getNamespace(name!),
    { enabled: !!name },
  );

  // Initialize form data when namespace loads
  useState(() => {
    if (namespace) {
      setFormData({
        labels: namespace.labels || {},
        annotations: namespace.annotations || {},
      });
    }
  }, [namespace]);

  const updateMutation = useApiMutation(
    async (data: NamespaceFormData) => {
      return await updateNamespace(name!, {
        labels: data.labels,
        annotations: data.annotations,
      });
    },
    {
      onSuccess: () => {
        showToast('Namespace updated successfully', 'success');
        refetch();
        navigate(`/namespaces/${name}`);
      },
    },
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateMutation.mutateAsync(formData);
    } catch (error) {
      console.error('Failed to update namespace:', error);
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

  if (isLoading) {
    return <div className="loading">Loading namespace...</div>;
  }

  if (error) {
    return <div className="error">Error loading namespace: {error.message}</div>;
  }

  if (!namespace) {
    return <div className="error">Namespace not found</div>;
  }

  return (
    <>
      <div className="edit-namespace">
        <div className="page-header">
          <h1>Edit Namespace: {namespace.name}</h1>
          <Button variant="secondary" onClick={() => navigate(`/namespaces/${name}`)}>
            ← Back
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="namespace-form">
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
              onClick={() => navigate(`/namespaces/${name}`)}
              disabled={updateMutation.isPending}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              type="submit"
              disabled={updateMutation.isPending}
            >
              {updateMutation.isPending ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </form>
      </div>

      <style>{`
        .edit-namespace {
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
