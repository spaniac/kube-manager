import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getSecrets, deleteSecret } from '@api/secret';
import { useApiQuery, useApiMutation } from '@hooks/useApi';
import type { Secret } from '@types/api';
import { Badge } from '@components/Badge';
import { ConfirmationDialog } from '@components/ConfirmationDialog';
import { useToast } from '@components/Toast';
import { Table, TableStyles } from '@components/Table';
import { Button } from '@components/Button';

export default function SecretList() {
   const navigate = useNavigate();
   const { showToast } = useToast();
  const [filters, setFilters] = useState({ search: '', namespace: '' });
  const [deleteTarget, setDeleteTarget] = useState<Secret | null>(null);
  const [showMasked, setShowMasked] = useState(true);
  const [sortConfig, setSortConfig] = useState<{ key: keyof Secret; order: 'asc' | 'desc' }>({
    key: 'name',
    order: 'asc',
  });

  const { data, isLoading, error, refetch } = useApiQuery(
    ['secrets', filters, sortConfig],
    () =>
      getSecrets({
        search: filters.search || undefined,
        namespace: filters.namespace || undefined,
      }),
  );

  const deleteMutation = useApiMutation(
    async (secret: { namespace: string; name: string }) => {
      await deleteSecret(secret.namespace, secret.name);
    },
    {
      onSuccess: () => {
        showToast({ message: 'Secret deleted successfully', type: 'success' });
        refetch();
        setDeleteTarget(null);
      },
    },
  );

  const handleSort = (key: keyof Secret, order: 'asc' | 'desc') => {
    setSortConfig({ key, order });
  };

  const handleRowClick = (secret: Secret) => {
    navigate(`/secrets/${secret.namespace}/${secret.name}`);
  };

  const handleDelete = async (secret: Secret) => {
    await deleteMutation.mutateAsync({ namespace: secret.namespace, name: secret.name });
  };

  const handleFilterChange = (newFilters: Record<string, string>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  const maskValue = (value: string): string => {
    if (!value) return '-';
    if (showMasked) {
      return '••••••••••••';
    }
    return value;
  };

  const columns = [
    {
      key: 'name' as keyof Secret,
      header: 'Name',
      sortable: true,
      render: (value: string, row: Secret) => (
        <a
          href={`/secrets/${row.namespace}/${row.name}`}
          className="resource-link"
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/secrets/${row.namespace}/${row.name}`);
          }}
        >
          {value}
        </a>
      ),
    },
    {
      key: 'namespace' as keyof Secret,
      header: 'Namespace',
      sortable: true,
    },
    {
      key: 'type' as keyof Secret,
      header: 'Type',
      sortable: true,
      render: (value: string) => <Badge status={value} />,
    },
    {
      key: 'data' as keyof Secret,
      header: 'Keys',
      sortable: true,
      render: (value: Record<string, string>) => {
        if (!value || Object.keys(value).length === 0) {
          return '-';
        }
        const keys = Object.keys(value);
        return (
          <div className="keys-cell">
            {keys.slice(0, 3).map((key) => (
              <span key={key} className="key-badge">
                {key}
              </span>
            ))}
            {keys.length > 3 && <span className="key-more">+{keys.length - 3} more</span>}
          </div>
        );
      },
    },
    {
      key: 'immutable' as keyof Secret,
      header: 'Immutable',
      sortable: true,
      render: (value: boolean) => (value ? 'Yes' : 'No'),
    },
    {
      key: 'creationTimestamp' as keyof Secret,
      header: 'Created',
      sortable: true,
      render: (value: number) => new Date(value).toLocaleDateString(),
    },
    {
      key: 'actions' as keyof Secret,
      header: 'Actions',
      render: (_value: unknown, row: Secret) => (
        <div className="actions-cell">
          <button
            className="action-button danger"
            onClick={(e) => {
              e.stopPropagation();
              setDeleteTarget(row);
            }}
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  if (error) {
    return (
      <div className="secret-list">
        <div className="error-message">Error loading Secrets: {(error as Error).message}</div>
      </div>
    );
  }

  return (
    <>
      <div className="secret-list">
        <div className="page-header">
          <h1>Secrets</h1>
          <div className="header-actions">
            <Button variant="secondary" onClick={() => setShowMasked(!showMasked)}>
              {showMasked ? 'Unmask Values' : 'Mask Values'}
            </Button>
          </div>
        </div>

        <div className="filters-bar">
          <Button
            variant="secondary"
            onClick={() => setFilters({ search: '', namespace: '' })}
            disabled={!filters.search && !filters.namespace}
          >
            Clear
          </Button>
        </div>

        <TableStyles />
        <Table
          data={data?.items || []}
          columns={columns}
          onSort={handleSort}
          defaultSort={sortConfig}
          onRowClick={handleRowClick}
          loading={isLoading}
          emptyMessage="No Secrets found matching your filters"
        />

        {deleteTarget && (
          <ConfirmationDialog
            title="Delete Secret"
            message={`Are you sure you want to delete Secret "${deleteTarget.name}" in namespace "${deleteTarget.namespace}"? This action cannot be undone.`}
            onConfirm={() => handleDelete(deleteTarget)}
            onCancel={() => setDeleteTarget(null)}
            confirmText="Delete"
            variant="danger"
          />
        )}
      </div>

      <style>{`
        .secret-list {
          padding: 24px;
          max-width: 1400px;
          margin: 0 auto;
        }

        .page-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
        }

        .page-header h1 {
          margin: 0;
          font-size: 28px;
          font-weight: 700;
          color: #111827;
        }

        .header-actions {
          display: flex;
          gap: 12px;
          align-items: center;
        }

        .filters-bar {
          display: flex;
          gap: 12px;
          align-items: center;
          margin-bottom: 20px;
          padding: 16px;
          background: #f9fafb;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
        }

        .resource-link {
          color: #3b82f6;
          text-decoration: none;
          font-weight: 500;
        }

        .resource-link:hover {
          text-decoration: underline;
        }

        .keys-cell {
          display: flex;
          flex-wrap: wrap;
          gap: 4px;
        }

        .key-badge {
          display: inline-block;
          padding: 2px 8px;
          background: #fef3c7;
          border: 1px solid #fde68a;
          border-radius: 4px;
          font-size: 11px;
          font-weight: 500;
          color: #92400e;
        }

        .key-more {
          color: #6b7280;
          font-size: 11px;
        }

        .actions-cell {
          display: flex;
          gap: 8px;
        }

        .action-button {
          padding: 6px 12px;
          background: #3b82f6;
          color: white;
          border: none;
          border-radius: 4px;
          font-size: 12px;
          font-weight: 500;
          cursor: pointer;
          transition: background 0.2s;
        }

        .action-button:hover {
          background: #2563eb;
        }

        .action-button.danger {
          background: #dc2626;
        }

        .action-button.danger:hover {
          background: #b91c1c;
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
