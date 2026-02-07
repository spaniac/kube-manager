import { useState } from 'react';
import { getNamespaces, deleteNamespace } from '@api/namespace';
import { useApiQuery, useApiMutation } from '@hooks/useApi';
import type { Namespace } from '../types/api';
import { Table } from '@components/Table';
import { Input } from '@components/Input';
import { Badge } from '@components/Badge';
import { Button } from '@components/Button';
import { ConfirmationDialog } from '@components/ConfirmationDialog';
import { useToast } from '@components/Toast';

interface NamespaceFilters {
  search: string;
  status?: string;
}

 export default function NamespaceList() {
   const { showToast } = useToast();
   const [filters, setFilters] = useState<NamespaceFilters>({ search: '' });
   const [sortConfig, setSortConfig] = useState<{ key: keyof Namespace; order: 'asc' | 'desc' }>({
     key: 'name',
     order: 'asc',
   });
   const [deleteTarget, setDeleteTarget] = useState<Namespace | null>(null);

  const { data, isLoading, error, refetch } = useApiQuery(
    ['namespaces', filters, sortConfig],
    () => getNamespaces({
      search: filters.search || undefined,
      sortBy: sortConfig.key as string,
      sortOrder: sortConfig.order,
    }),
  );

  const deleteMutation = useApiMutation(
    async (name: string) => {
      await deleteNamespace(name);
    },
    {
      onSuccess: () => {
        showToast({ message: 'Namespace deleted successfully', type: 'success' });
        refetch();
        setDeleteTarget(null);
      },
    },
  );

  const handleSort = (key: keyof Namespace, order: 'asc' | 'desc') => {
    setSortConfig({ key, order });
  };

  const handleRowClick = (namespace: Namespace) => {
    window.location.href = `/namespaces/${namespace.name}`;
  };

  const handleDelete = async (namespace: Namespace) => {
    await deleteMutation.mutateAsync(namespace.name);
  };

  const columns = [
    {
      key: 'name' as keyof Namespace,
      header: 'Name',
      sortable: true,
      render: (value: unknown, row: Namespace) => (
        <a href={`/namespaces/${row.name}`} className="namespace-link">
          {value as string}
        </a>
      ),
    },
    {
      key: 'status' as keyof Namespace,
      header: 'Status',
      sortable: true,
      render: (value: unknown) => {
        return <Badge status={value as string} />;
      },
    },
    {
      key: 'creationTimestamp' as keyof Namespace,
      header: 'Created',
      sortable: true,
      render: (value: unknown) => new Date(value as number).toLocaleString(),
    },
    {
      key: 'labels' as keyof Namespace,
      header: 'Labels',
      render: (value: unknown) => {
        const labels = value as Record<string, string>;
        if (!labels || Object.keys(labels).length === 0) {
          return '-';
        }
        const labelKeys = Object.keys(labels).slice(0, 2);
        return (
          <div className="labels-cell">
            {labelKeys.map((key) => (
              <span key={key} className="label">
                {key}: {labels[key]}
              </span>
            ))}
            {Object.keys(labels).length > 2 && <span className="label-more">...</span>}
          </div>
        );
      },
    },
    {
      key: 'actions' as keyof Namespace,
      header: 'Actions',
      render: (_value: unknown, row: Namespace) => (
        <div className="actions-cell">
          <Button
           
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              window.location.href = `/namespaces/${row.name}/edit`;
            }}
          >
            Edit
          </Button>
          <Button
           
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              setDeleteTarget(row);
            }}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  if (error) {
    return <div className="error-message">Error loading namespaces: {error.message}</div>;
  }

  return (
    <>
      <div className="namespace-list">
        <div className="page-header">
          <h1>Namespaces</h1>
          <Button
           
            onClick={() => (window.location.href = '/namespaces/create')}
          >
            Create Namespace
          </Button>
        </div>

        <div className="filters-bar">
          <Input
            label="Search"
            placeholder="Search by name or label..."
            fullWidth
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
          />
          <Button
           
            onClick={() => setFilters({ search: '' })}
            disabled={!filters.search}
          >
            Clear
          </Button>
        </div>

        <Table
          data={data?.items || []}
          columns={columns}
          onSort={handleSort}
          defaultSort={sortConfig}
          onRowClick={handleRowClick}
          loading={isLoading}
          emptyMessage="No namespaces found matching your filters"
        />

        {deleteTarget && (
          <ConfirmationDialog
            title="Delete Namespace"
            message={`Are you sure you want to delete namespace "${deleteTarget.name}"? This action cannot be undone.`}
            onConfirm={() => handleDelete(deleteTarget)}
            onCancel={() => setDeleteTarget(null)}
            confirmText="Delete"
           
          />
        )}
      </div>

      <style>{`
        .namespace-list {
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

        .filters-bar {
          display: flex;
          gap: 12px;
          align-items: flex-end;
          margin-bottom: 20px;
          padding: 16px;
          background: #f9fafb;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
        }

        .filters-bar label {
          margin-bottom: 0;
        }

        .filters-bar .input {
          flex: 1;
        }

        .namespace-link {
          color: #3b82f6;
          text-decoration: none;
          font-weight: 500;
        }

        .namespace-link:hover {
          text-decoration: underline;
        }

        .labels-cell {
          display: flex;
          flex-wrap: wrap;
          gap: 4px;
        }

        .label {
          display: inline-block;
          padding: 2px 8px;
          background: #eff6ff;
          border: 1px solid #dbeafe;
          border-radius: 4px;
          font-size: 11px;
          font-weight: 500;
          color: #1e40af;
        }

        .label-more {
          color: #6b7280;
          font-size: 11px;
        }

        .actions-cell {
          display: flex;
          gap: 8px;
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
