import { useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApiMutation, useApiQuery } from '@hooks/useApi';
import { deleteRole, getRoles } from '@api/role';
import { Button } from '@components/Button';
import { Table, TableStyles } from '@components/Table';
import { useToast } from '@components/Toast';

interface RoleTableRow {
  id: number;
  roleKey: string;
  displayName: string;
  type: string;
  permissions: number;
}

export default function RoleList() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { data: roles = [], isLoading, refetch } = useApiQuery(['admin', 'roles'], () => getRoles());

  const deleteMutation = useApiMutation(
    async (roleId: number) => {
      await deleteRole(roleId);
    },
    {
      onSuccess: () => {
        showToast({ message: 'Role deleted successfully', type: 'success' });
        refetch();
      },
      onError: (error) => {
        showToast({ message: error.message, type: 'error' });
      },
    },
  );

  const presetRoles = useMemo(
    () =>
      roles
        .filter((role) => !role.custom)
        .map((role) => ({
          id: role.id,
          roleKey: role.roleKey,
          displayName: role.displayName,
          type: 'Preset',
          permissions: role.permissions.length,
        } satisfies RoleTableRow)),
    [roles],
  );

  const customRoles = useMemo(
    () =>
      roles
        .filter((role) => role.custom)
        .map((role) => ({
          id: role.id,
          roleKey: role.roleKey,
          displayName: role.displayName,
          type: 'Custom',
          permissions: role.permissions.length,
        } satisfies RoleTableRow)),
    [roles],
  );

  return (
    <div className="role-list-page">
      <div className="role-list-header">
        <div>
          <h1>Role Management</h1>
          <p>Manage preset and custom access profiles</p>
        </div>
        <Button onClick={() => navigate('/admin/roles/new')}>Create Role</Button>
      </div>

      <section className="role-section">
        <div className="role-section-header">
          <h2>Preset Roles</h2>
          <span className="role-section-subtitle">Immutable system roles</span>
        </div>
        <Table
          data={presetRoles}
          loading={isLoading}
          emptyMessage="No preset roles found"
          columns={[
            { key: 'displayName', header: 'Name' },
            { key: 'roleKey', header: 'Key' },
            { key: 'permissions', header: 'Permissions' },
            {
              key: 'type',
              header: 'Actions',
              render: () => (
                <div className="row-actions">
                  <Button variant="ghost" size="sm" disabled>
                    Preset
                  </Button>
                </div>
              ),
            },
          ]}
        />
      </section>

      <section className="role-section">
        <div className="role-section-header">
          <h2>Custom Roles</h2>
          <span className="role-section-subtitle">Editable organization-specific roles</span>
        </div>
        <Table
          data={customRoles}
          loading={isLoading}
          emptyMessage="No custom roles found"
          columns={[
            { key: 'displayName', header: 'Name' },
            { key: 'roleKey', header: 'Key' },
            { key: 'permissions', header: 'Permissions' },
            {
              key: 'type',
              header: 'Actions',
              render: (_, row) => (
                <div className="row-actions">
                  <Link to={`/admin/roles/${row.id}/edit`}>
                    <Button variant="ghost" size="sm">Edit</Button>
                  </Link>
                  <Button
                    variant="danger"
                    size="sm"
                    disabled={deleteMutation.isPending}
                    onClick={(event) => {
                      event.preventDefault();
                      deleteMutation.mutate(row.id);
                    }}
                  >
                    Delete
                  </Button>
                </div>
              ),
            },
          ]}
        />
      </section>

      <TableStyles />
      <style>{`
        .role-list-page {
          padding: 24px;
          max-width: 1280px;
          margin: 0 auto;
          display: grid;
          gap: 20px;
        }

        .role-list-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          gap: 12px;
          padding: 20px;
          border-radius: 12px;
          background: linear-gradient(135deg, #f8fafc 0%, #eef2ff 100%);
          border: 1px solid #dbe4ff;
        }

        .role-list-header h1 {
          margin: 0;
          font-size: 28px;
          color: #0f172a;
        }

        .role-list-header p {
          margin: 8px 0 0;
          color: #334155;
        }

        .role-section {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          padding: 16px;
        }

        .role-section-header {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          margin-bottom: 12px;
        }

        .role-section-header h2 {
          margin: 0;
          font-size: 20px;
          color: #0f172a;
        }

        .role-section-subtitle {
          color: #64748b;
          font-size: 13px;
        }

        .row-actions {
          display: flex;
          gap: 8px;
          justify-content: flex-end;
        }

        @media (max-width: 768px) {
          .role-list-page {
            padding: 16px;
          }

          .role-list-header {
            flex-direction: column;
            align-items: stretch;
          }

          .role-section-header {
            flex-direction: column;
            gap: 4px;
          }
        }
      `}</style>
    </div>
  );
}
