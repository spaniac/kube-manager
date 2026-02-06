import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getNamespaceQuota, updateNamespaceQuota } from '@api/namespace';
import { useApiQuery, useApiMutation } from '@hooks/useApi';
import type { ResourceQuota } from '@/types/api';
import { Input } from '@components/Input';
import { Button } from '@components/Button';
import { useToast } from '@components/Toast';
import { Badge } from '@components/Badge';

interface NamespaceQuotaState extends ResourceQuota {
  namespaceLocked?: boolean;
  lockedBy?: string;
  lockedAt?: number;
}

const NAMESPACE_TEMPLATES = [
  { id: 'default', name: 'Default', description: 'Standard namespace with basic resource limits' },
  { id: 'development', name: 'Development', description: 'Namespace for development workloads' },
  { id: 'staging', name: 'Staging', description: 'Namespace for staging and testing' },
  { id: 'production', name: 'Production', description: 'Production namespace with strict quotas' },
];

const ROLES = [
  { id: 'admin', name: 'Admin', description: 'Full access to all resources in namespace' },
  { id: 'developer', name: 'Developer', description: 'Deploy and manage workloads' },
  { id: 'viewer', name: 'Viewer', description: 'Read-only access to resources' },
];

export default function NamespaceQuotaManagement() {
  const { name } = useParams<{ name: string }>();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [quotas, setQuotas] = useState<ResourceQuota>({
    cpuHard: '',
    memoryHard: '',
    podsHard: '',
    cpuUsed: '',
    memoryUsed: '',
    podsUsed: '',
  });
  const [lockState, setLockState] = useState({
    locked: false,
    lockedBy: '',
    lockedAt: null as number | null,
  });
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [assignedRoles, setAssignedRoles] = useState<string[]>([]);

  const { data: quota, isLoading, error, refetch } = useApiQuery(
    ['namespace-quota', name],
    () => getNamespaceQuota(name!),
    { enabled: !!name },
  );

  // Initialize quotas from API
  useEffect(() => {
    if (quota) {
      setQuotas({
        cpuHard: quota.cpuHard || '',
        memoryHard: quota.memoryHard || '',
        podsHard: quota.podsHard || '',
        cpuUsed: quota.cpuUsed || '',
        memoryUsed: quota.memoryUsed || '',
        podsUsed: quota.podsUsed || '',
      });
    }
  }, [quota]);

  const updateQuotaMutation = useApiMutation(
    async (newQuota: ResourceQuota) => {
      return await updateNamespaceQuota(name!, newQuota);
    },
    {
      onSuccess: () => {
        showToast({ message: 'Quota updated successfully', type: 'success' });
        refetch();
      },
    },
  );

  const lockNamespaceMutation = useApiMutation(
    async (locked: boolean) => {
      const annotations = locked ? { 'k8s-manager/locked': 'true' } : {};
      await fetch(`/api/v1/namespaces/${name}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ annotations }),
      });
    },
    {
      onSuccess: () => {
        showToast({ message: lockState.locked ? 'Namespace unlocked' : 'Namespace locked', type: 'success' });
        refetch();
      },
    },
  );

  const applyTemplateMutation = useApiMutation(
    async (templateId: string) => {
      const template = NAMESPACE_TEMPLATES.find(t => t.id === templateId);
      if (!template) return;

      const annotations = {
        'k8s-manager/template': templateId,
        'k8s-manager/template-applied-at': new Date().toISOString(),
      };

      await fetch(`/api/v1/namespaces/${name}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ annotations }),
      });
    },
    {
      onSuccess: () => {
        showToast({ message: 'Template applied successfully', type: 'success' });
        refetch();
      },
    },
  );

  const assignRoleMutation = useApiMutation(
    async (role: string) => {
      await fetch(`/api/v1/namespaces/${name}/roles`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role }),
      });
    },
    {
      onSuccess: () => {
        showToast({ message: 'Role assigned successfully', type: 'success' });
      },
    },
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateQuotaMutation.mutateAsync(quotas);
    } catch (error) {
      console.error('Failed to update quotas:', error);
    }
  };

  const handleToggleLock = () => {
    const newLockedState = !lockState.locked;
    setLockState({
      locked: newLockedState,
      lockedBy: newLockedState ? 'current-user' : '',
      lockedAt: newLockedState ? Date.now() : null,
    });
    lockNamespaceMutation.mutate(newLockedState);
  };

  const handleApplyTemplate = () => {
    applyTemplateMutation.mutate(selectedTemplate);
  };

  const handleAssignRole = (role: string) => {
    if (assignedRoles.includes(role)) {
      setAssignedRoles(assignedRoles.filter(r => r !== role));
    } else {
      setAssignedRoles([...assignedRoles, role]);
    }
    assignRoleMutation.mutate(role);
  };

  if (isLoading) {
    return <div className="loading">Loading namespace management...</div>;
  }

  if (error) {
    return <div className="error">Error loading namespace: {error.message}</div>;
  }

  return (
    <>
      <div className="namespace-management">
        <div className="page-header">
          <h1>Namespace Management: {name}</h1>
          <div className="header-actions">
            <Button onClick={() => navigate(`/namespaces/${name}`)}>
              ← Back
            </Button>
          </div>
        </div>

        <div className="content-grid">
          {/* Quota Management */}
          <div className="management-section">
            <h2>Resource Quota</h2>
            <form onSubmit={handleSubmit} className="quota-form">
              <div className="quota-item">
                <label>CPU Limit</label>
                <Input
                  placeholder="e.g., 4 cores"
                  value={quotas.cpuHard}
                  onChange={(e) => setQuotas({ ...quotas, cpuHard: e.target.value })}
                  helperText="CPU limit in cores"
                  fullWidth
                />
                <div className="current-value">
                  Current: <strong>{quota?.cpuUsed || '0'}</strong> cores
                </div>
              </div>
              <div className="quota-item">
                <label>Memory Limit</label>
                <Input
                  placeholder="e.g., 8Gi"
                  value={quotas.memoryHard}
                  onChange={(e) => setQuotas({ ...quotas, memoryHard: e.target.value })}
                  helperText="Memory limit (e.g., 8Gi, 16Gi)"
                  fullWidth
                />
                <div className="current-value">
                  Current: <strong>{quota?.memoryUsed || '0'}</strong>
                </div>
              </div>
              <div className="quota-item">
                <label>Pod Limit</label>
                <Input
                  placeholder="e.g., 10 pods"
                  value={quotas.podsHard}
                  onChange={(e) => setQuotas({ ...quotas, podsHard: e.target.value })}
                  helperText="Maximum number of pods"
                  fullWidth
                />
                <div className="current-value">
                  Current: <strong>{quota?.podsUsed || '0'}</strong> pods
                </div>
              </div>
              <div className="form-actions">
                <Button
                 
                  type="button"
                  onClick={() => {
                    if (quota) {
                      setQuotas({
                        cpuHard: quota.cpuHard || '',
                        memoryHard: quota.memoryHard || '',
                        podsHard: quota.podsHard || '',
                        cpuUsed: quota.cpuUsed || '',
                        memoryUsed: quota.memoryUsed || '',
                        podsUsed: quota.podsUsed || '',
                      });
                    }
                  }}
                  >
                    Reset
                  </Button>
                <Button
                 
                  type="submit"
                  disabled={updateQuotaMutation.isPending}
                >
                  {updateQuotaMutation.isPending ? 'Updating...' : 'Update Quota'}
                </Button>
              </div>
            </form>
          </div>

          {/* Namespace Lock */}
          <div className="management-section">
            <h2>Namespace Lock</h2>
            <div className="lock-status">
              <div className="lock-info">
                {lockState.locked ? (
                  <>
                    <Badge status="Locked" />
                    {lockState.lockedBy && (
                      <span className="locked-info">
                        by {lockState.lockedBy}
                        {lockState.lockedAt && ` at ${new Date(lockState.lockedAt).toLocaleString()}`}
                      </span>
                    )}
                  </>
                ) : (
                  <Badge status="Unlocked" />
                )}
              </div>
              <Button
                variant={lockState.locked ? 'secondary' : 'danger'}
                onClick={handleToggleLock}
                disabled={lockNamespaceMutation.isPending}
              >
                {lockState.locked ? 'Unlock Namespace' : 'Lock Namespace'}
              </Button>
            </div>
            <p className="lock-helper">
              {lockState.locked
                ? 'Locked namespace prevents all modifications except by the locker'
                : 'Lock namespace to prevent modifications by others'}
            </p>
          </div>

          {/* Role Assignment */}
          <div className="management-section">
            <h2>Role Assignment</h2>
            <div className="roles-list">
              {ROLES.map((role) => (
                <div key={role.id} className="role-item">
                  <div className="role-info">
                    <div className="role-name">{role.name}</div>
                    <div className="role-desc">{role.description}</div>
                  </div>
                  <Button
                    variant={assignedRoles.includes(role.id) ? 'secondary' : 'primary'}
                    size="sm"
                    onClick={() => handleAssignRole(role.id)}
                    disabled={assignRoleMutation.isPending}
                  >
                    {assignedRoles.includes(role.id) ? 'Revoke' : 'Assign'}
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Template Selector */}
          <div className="management-section">
            <h2>Namespace Templates</h2>
            <div className="templates-grid">
              {NAMESPACE_TEMPLATES.map((template) => (
                <div key={template.id} className="template-card">
                  <div className="template-info">
                    <div className="template-name">{template.name}</div>
                    <div className="template-desc">{template.description}</div>
                  </div>
                  <Button
                    variant={selectedTemplate === template.id ? 'secondary' : 'primary'}
                    size="sm"
                    onClick={handleApplyTemplate}
                    disabled={applyTemplateMutation.isPending}
                  >
                    {selectedTemplate === template.id ? 'Applied' : 'Apply'}
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .namespace-management {
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

        .content-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
          gap: 20px;
          margin-bottom: 24px;
        }

        .management-section {
          background: white;
          padding: 20px;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
        }

        .management-section h2 {
          margin: 0 0 16px 0;
          font-size: 18px;
          font-weight: 600;
          color: #111827;
        }

        .quota-form {
          display: flex;
          flex-direction: column;
          gap: 16px;
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

        .current-value {
          font-size: 13px;
          color: #6b7280;
          margin-top: 4px;
        }

        .current-value strong {
          color: #111827;
        }

        .form-actions {
          display: flex;
          gap: 8px;
          justify-content: flex-end;
          padding-top: 16px;
        }

        .lock-status {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .lock-info {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 14px;
        }

        .locked-info {
          color: #6b7280;
          font-size: 13px;
        }

        .lock-helper {
          font-size: 13px;
          color: #6b7280;
          line-height: 1.5;
        }

        .roles-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .role-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px;
          background: #f9fafb;
          border: 1px solid #e5e7eb;
          border-radius: 6px;
        }

        .role-info {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .role-name {
          font-weight: 600;
          color: #111827;
        }

        .role-desc {
          font-size: 13px;
          color: #6b7280;
        }

        .templates-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 12px;
        }

        .template-card {
          display: flex;
          flex-direction: column;
          gap: 12px;
          padding: 16px;
          background: #f9fafb;
          border: 2px solid transparent;
          border-radius: 8px;
          transition: all 0.2s;
        }

        .template-card:hover {
          border-color: #3b82f6;
          transform: translateY(-2px);
        }

        .template-info {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .template-name {
          font-weight: 600;
          color: #111827;
        }

        .template-desc {
          font-size: 13px;
          color: #6b7280;
          line-height: 1.4;
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
