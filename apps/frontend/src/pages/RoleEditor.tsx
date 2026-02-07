import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button } from '@components/Button';
import { Input } from '@components/Input';
import { useToast } from '@components/Toast';
import { NamespacePermissionMatrix, type NamespacePermissionRule } from '@components/rbac/NamespacePermissionMatrix';
import { createRole, getRole, updateRole } from '@api/role';
import { useApiMutation, useApiQuery } from '@hooks/useApi';

const PERMISSION_TYPES = ['READ', 'WRITE', 'DELETE', 'EXEC', 'LOGS', 'ALL'] as const;
const RESOURCE_TYPES = [
  'POD',
  'DEPLOYMENT',
  'STATEFULSET',
  'DAEMONSET',
  'SERVICE',
  'CONFIGMAP',
  'SECRET',
  'NAMESPACE',
  'ALL',
] as const;

function permissionKey(permissionType: string, resourceType: string): string {
  return `${resourceType}:${permissionType}`;
}

export default function RoleEditor() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { roleId } = useParams<{ roleId: string }>();
  const isCreateMode = !roleId;

  const [roleKey, setRoleKey] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [description, setDescription] = useState('');
  const [namespace, setNamespace] = useState('');
  const [namespaceScoped, setNamespaceScoped] = useState(false);
  const [selectedPermissions, setSelectedPermissions] = useState<Record<string, boolean>>({});
  const [permissionRules, setPermissionRules] = useState<NamespacePermissionRule[]>([]);

  const { data: role, isLoading } = useApiQuery(
    ['admin', 'roles', roleId],
    () => getRole(Number(roleId)),
    { enabled: !isCreateMode },
  );

  useEffect(() => {
    if (!role) {
      return;
    }

    setRoleKey(role.roleKey);
    setDisplayName(role.displayName);
    setDescription(role.description ?? '');

    const initialMatrix: Record<string, boolean> = {};
    role.permissions.forEach((permission) => {
      initialMatrix[permissionKey(permission.permissionType, permission.resourceType)] = true;
    });

    const firstNamespace = role.permissions.find((permission) => !!permission.namespace)?.namespace;
    setNamespace(firstNamespace ?? '');
    setNamespaceScoped(Boolean(firstNamespace));
    setSelectedPermissions(initialMatrix);
    setPermissionRules(
      role.permissions.map((permission) => ({
        id: `${permission.resourceType}:${permission.permissionType}:${permission.namespace ?? 'GLOBAL'}`,
        permissionType: permission.permissionType,
        resourceType: permission.resourceType,
        namespace: permission.namespace ?? '',
        effect: 'ALLOW',
        resourceNamePattern: '',
      })),
    );
  }, [role]);

  const chosenPermissions = useMemo(
    () =>
      RESOURCE_TYPES.flatMap((resourceType) =>
        PERMISSION_TYPES.filter((permissionType) => selectedPermissions[permissionKey(permissionType, resourceType)]).map(
          (permissionType) => ({
            permissionType,
            resourceType,
            namespace: namespaceScoped ? namespace.trim() || undefined : undefined,
          }),
        ),
      ),
    [namespace, namespaceScoped, selectedPermissions],
  );

  const createMutation = useApiMutation(createRole, {
    onSuccess: () => {
      showToast({ message: 'Role created successfully', type: 'success' });
      navigate('/admin/roles');
    },
    onError: (error) => showToast({ message: error.message, type: 'error' }),
  });

  const updateMutation = useApiMutation(
    async () => {
      await updateRole(Number(roleId), {
        displayName,
        description,
        permissions: chosenPermissions,
      });
    },
    {
      onSuccess: () => {
        showToast({ message: 'Role updated successfully', type: 'success' });
        navigate('/admin/roles');
      },
      onError: (error) => showToast({ message: error.message, type: 'error' }),
    },
  );

  const togglePermission = (permissionType: string, resourceType: string) => {
    const key = permissionKey(permissionType, resourceType);
    setSelectedPermissions((previous) => ({
      ...previous,
      [key]: !previous[key],
    }));
  };

  const handleSubmit = () => {
    if (!displayName.trim()) {
      showToast({ message: 'Display name is required', type: 'error' });
      return;
    }

    if (isCreateMode && !roleKey.trim()) {
      showToast({ message: 'Role key is required', type: 'error' });
      return;
    }

    if (chosenPermissions.length === 0) {
      showToast({ message: 'Select at least one permission', type: 'error' });
      return;
    }

    if (namespaceScoped && !namespace.trim()) {
      showToast({ message: 'Namespace is required when namespace scope is enabled', type: 'error' });
      return;
    }

    if (isCreateMode) {
      createMutation.mutate({
        roleKey,
        displayName,
        description,
        permissions: chosenPermissions,
      });
      return;
    }

    updateMutation.mutate(undefined);
  };

  const saving = createMutation.isPending || updateMutation.isPending;
  const presetRole = !isCreateMode && role && !role.custom;

  return (
    <div className="role-editor-page">
      <div className="role-editor-header">
        <div>
          <h1>{isCreateMode ? 'Create Role' : 'Edit Role'}</h1>
          <p>Build custom permissions with optional namespace scope</p>
        </div>
        <Link to="/admin/roles">
          <Button variant="ghost">Back to Roles</Button>
        </Link>
      </div>

      {presetRole && (
        <div className="preset-banner">
          Preset roles are immutable. You can review details but not modify this role.
        </div>
      )}

      <div className="role-editor-grid">
        <section className="editor-card">
          <h2>Role Metadata</h2>
          <div className="editor-fields">
            <Input
              label="Role Key"
              value={roleKey}
              disabled={!isCreateMode || Boolean(presetRole)}
              placeholder="TEAM_OBSERVABILITY"
              onChange={(event) => setRoleKey(event.target.value)}
            />
            <Input
              label="Display Name"
              value={displayName}
              disabled={Boolean(presetRole)}
              placeholder="Team Observability"
              onChange={(event) => setDisplayName(event.target.value)}
            />
            <Input
              label="Description"
              value={description}
              disabled={Boolean(presetRole)}
              placeholder="Describe what this role can do"
              onChange={(event) => setDescription(event.target.value)}
            />
          </div>
        </section>

        <section className="editor-card">
          <h2>Namespace Selector</h2>
          <label className="scope-toggle">
            <input
              type="checkbox"
              checked={namespaceScoped}
              disabled={Boolean(presetRole)}
              onChange={(event) => setNamespaceScoped(event.target.checked)}
            />
            Restrict selected permissions to a namespace
          </label>
          <Input
            label="Namespace"
            value={namespace}
            disabled={!namespaceScoped || Boolean(presetRole)}
            placeholder="production"
            onChange={(event) => setNamespace(event.target.value)}
          />
        </section>

        <section className="editor-card editor-card-wide">
          <NamespacePermissionMatrix
            rules={permissionRules}
            disabled={Boolean(presetRole)}
            onChange={setPermissionRules}
          />
        </section>

        <section className="editor-card editor-card-wide">
          <h2>Permission Matrix</h2>
          <div className="matrix-wrapper">
            <table className="matrix-table">
              <thead>
                <tr>
                  <th>Resource</th>
                  {PERMISSION_TYPES.map((permission) => (
                    <th key={permission}>{permission}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {RESOURCE_TYPES.map((resource) => (
                  <tr key={resource}>
                    <td>{resource}</td>
                    {PERMISSION_TYPES.map((permission) => {
                      const key = permissionKey(permission, resource);
                      return (
                        <td key={key}>
                          <input
                            type="checkbox"
                            checked={Boolean(selectedPermissions[key])}
                            disabled={Boolean(presetRole)}
                            onChange={() => togglePermission(permission, resource)}
                          />
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>

      <div className="editor-actions">
        <Button variant="ghost" onClick={() => navigate('/admin/roles')}>Cancel</Button>
        <Button
          disabled={saving || Boolean(presetRole) || isLoading}
          onClick={handleSubmit}
        >
          {saving ? 'Saving...' : isCreateMode ? 'Create Role' : 'Save Changes'}
        </Button>
      </div>

      <style>{`
        .role-editor-page {
          padding: 24px;
          max-width: 1280px;
          margin: 0 auto;
          display: grid;
          gap: 16px;
        }

        .role-editor-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          gap: 12px;
          padding: 20px;
          border-radius: 12px;
          border: 1px solid #dbeafe;
          background: linear-gradient(140deg, #f0f9ff 0%, #ecfeff 100%);
        }

        .role-editor-header h1 {
          margin: 0;
          color: #0f172a;
        }

        .role-editor-header p {
          margin: 6px 0 0;
          color: #334155;
        }

        .preset-banner {
          border: 1px solid #facc15;
          background: #fef9c3;
          color: #854d0e;
          border-radius: 10px;
          padding: 10px 12px;
        }

        .role-editor-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 16px;
        }

        .editor-card {
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          background: #ffffff;
          padding: 16px;
        }

        .editor-card h2 {
          margin: 0 0 12px;
          font-size: 18px;
          color: #0f172a;
        }

        .editor-card-wide {
          grid-column: 1 / -1;
        }

        .editor-fields {
          display: grid;
          gap: 12px;
        }

        .scope-toggle {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 14px;
          margin-bottom: 10px;
          color: #334155;
        }

        .matrix-wrapper {
          overflow-x: auto;
          border-radius: 10px;
          border: 1px solid #e2e8f0;
        }

        .matrix-table {
          width: 100%;
          border-collapse: collapse;
        }

        .matrix-table th,
        .matrix-table td {
          border-bottom: 1px solid #e2e8f0;
          padding: 10px;
          text-align: center;
          font-size: 13px;
        }

        .matrix-table th:first-child,
        .matrix-table td:first-child {
          text-align: left;
          font-weight: 600;
          color: #1e293b;
          min-width: 140px;
        }

        .matrix-table thead th {
          background: #f8fafc;
          color: #334155;
        }

        .editor-actions {
          display: flex;
          justify-content: flex-end;
          gap: 10px;
        }

        @media (max-width: 900px) {
          .role-editor-page {
            padding: 16px;
          }

          .role-editor-header {
            flex-direction: column;
            align-items: stretch;
          }

          .role-editor-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
