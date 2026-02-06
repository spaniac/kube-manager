import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getDaemonSets, deleteDaemonSet } from '@api/daemonset';
import { useApiQuery, useApiMutation } from '@hooks/useApi';
import type { DaemonSet } from '@types/api';
import { ConfirmationDialog } from '@components/ConfirmationDialog';
import { useToast } from '@components/Toast';
 import { Table, TableStyles } from '@components/Table';
 import { Button } from '@components/Button';
 
 export default function DaemonSetList() {
   const navigate = useNavigate();
   const { showToast } = useToast();
  const [filters, setFilters] = useState({ search: '', namespace: '' });
  const [deleteTarget, setDeleteTarget] = useState<DaemonSet | null>(null);
  const [sortConfig, setSortConfig] = useState<{ key: keyof DaemonSet; order: 'asc' | 'desc' }>({
    key: 'name',
    order: 'asc',
  });

  const { data, isLoading, error, refetch } = useApiQuery(
    ['daemonsets', filters, sortConfig],
    () =>
      getDaemonSets({
        search: filters.search || undefined,
        namespace: filters.namespace || undefined,
      }),
  );

  const deleteMutation = useApiMutation(
    async (daemonset: { namespace: string; name: string }) => {
      await deleteDaemonSet(daemonset.namespace, daemonset.name);
    },
    {
      onSuccess: () => {
        showToast({ message: 'DaemonSet deleted successfully', type: 'success' });
        refetch();
        setDeleteTarget(null);
      },
    },
  );

  const handleSort = (key: keyof DaemonSet, order: 'asc' | 'desc') => {
    setSortConfig({ key, order });
  };

  const handleRowClick = (daemonset: DaemonSet) => {
    navigate(`/daemonsets/${daemonset.namespace}/${daemonset.name}`);
  };

  const handleDelete = async (daemonset: DaemonSet) => {
    await deleteMutation.mutateAsync({ namespace: daemonset.namespace, name: daemonset.name });
  };

  const handleFilterChange = (newFilters: Record<string, string>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  const columns = [
    {
      key: 'name' as keyof DaemonSet,
      header: 'Name',
      sortable: true,
      render: (value: string, row: DaemonSet) => (
        <a
          href={`/daemonsets/${row.namespace}/${row.name}`}
          className="resource-link"
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/daemonsets/${row.namespace}/${row.name}`);
          }}
        >
          {value}
        </a>
      ),
    },
    {
      key: 'namespace' as keyof DaemonSet,
      header: 'Namespace',
      sortable: true,
    },
    {
      key: 'replicas' as keyof DaemonSet,
      header: 'Desired',
      sortable: true,
    },
    {
      key: 'currentReplicas' as keyof DaemonSet,
      header: 'Current',
      sortable: true,
    },
    {
      key: 'readyReplicas' as keyof DaemonSet,
      header: 'Ready',
      sortable: true,
    },
    {
      key: 'availableReplicas' as keyof DaemonSet,
      header: 'Available',
      sortable: true,
    },
    {
      key: 'actions' as keyof DaemonSet,
      header: 'Actions',
      render: (_value: unknown, row: DaemonSet) => (
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
      <div className="daemonset-list">
        <div className="error-message">Error loading DaemonSets: {(error as Error).message}</div>
      </div>
    );
  }

  return (
    <>
      <div className="daemonset-list">
        <div className="page-header">
          <h1>DaemonSets</h1>
        </div>

        <div className="filters-bar">
          <Button variant="secondary" onClick={() => handleFilterChange({ search: '', namespace: '' })}>
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
          emptyMessage="No DaemonSets found matching your filters"
        />

        {deleteTarget && (
          <ConfirmationDialog
            title="Delete DaemonSet"
            message={`Are you sure you want to delete DaemonSet "${deleteTarget.name}" in namespace "${deleteTarget.namespace}"? This action cannot be undone.`}
            onConfirm={() => handleDelete(deleteTarget)}
            onCancel={() => setDeleteTarget(null)}
            confirmText="Delete"
            variant="danger"
          />
        )}
      </div>

      <style>{`
        .daemonset-list {
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
