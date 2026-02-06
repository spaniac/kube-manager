import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getStatefulSets, deleteStatefulSet, scaleStatefulSet } from '@api/statefulset';
import { useApiQuery, useApiMutation } from '@hooks/useApi';
import type { StatefulSet } from '@/types/api';
import { Badge } from '@components/Badge';
import { ConfirmationDialog } from '@components/ConfirmationDialog';
import { useToast } from '@components/Toast';
import { Table, TableStyles } from '@components/Table';
import { Button } from '@components/Button';
import { Modal } from '@components/Modal';
import { Input } from '@components/Input';

export default function StatefulSetList() {
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [filters, setFilters] = useState({ search: '', namespace: '' });
  const [deleteTarget, setDeleteTarget] = useState<StatefulSet | null>(null);
  const [scaleTarget, setScaleTarget] = useState<StatefulSet | null>(null);
  const [scaleReplicas, setScaleReplicas] = useState<number>(1);
  const [sortConfig, setSortConfig] = useState<{ key: keyof StatefulSet; order: 'asc' | 'desc' }>({
    key: 'name',
    order: 'asc',
  });

  const { data, isLoading, error, refetch } = useApiQuery(
    ['statefulsets', filters, sortConfig],
    () =>
      getStatefulSets({
        search: filters.search || undefined,
        namespace: filters.namespace || undefined,
      }),
  );

  const deleteMutation = useApiMutation(
    async (statefulset: { namespace: string; name: string }) => {
      await deleteStatefulSet(statefulset.namespace, statefulset.name);
    },
    {
      onSuccess: () => {
        showToast({ message: 'StatefulSet deleted successfully', type: 'success' });
        refetch();
        setDeleteTarget(null);
      },
    },
  );

  const scaleMutation = useApiMutation(
    async (params: { namespace: string; name: string; replicas: number }) => {
      await scaleStatefulSet(params.namespace, params.name, params.replicas);
    },
    {
      onSuccess: () => {
        showToast({ message: 'StatefulSet scaled successfully', type: 'success' });
        refetch();
        setScaleTarget(null);
      },
    },
  );

  const handleSort = (key: keyof StatefulSet, order: 'asc' | 'desc') => {
    setSortConfig({ key, order });
  };

  const handleRowClick = (statefulset: StatefulSet) => {
    navigate(`/statefulsets/${statefulset.namespace}/${statefulset.name}`);
  };

  const handleDelete = async (statefulset: StatefulSet) => {
    await deleteMutation.mutateAsync({ namespace: statefulset.namespace, name: statefulset.name });
  };

  const handleScale = () => {
    if (scaleTarget) {
      scaleMutation.mutateAsync({
        namespace: scaleTarget.namespace,
        name: scaleTarget.name,
        replicas: scaleReplicas,
      });
    }
  };

  const handleFilterChange = (newFilters: Record<string, string>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  const columns = [
    {
      key: 'name' as keyof StatefulSet,
      header: 'Name',
      sortable: true,
      render: (value: unknown, row: StatefulSet) => (
        <a
          href={`/statefulsets/${row.namespace}/${row.name}`}
          className="resource-link"
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/statefulsets/${row.namespace}/${row.name}`);
          }}
        >
          {(value as string)}
        </a>
      ),
    },
    {
      key: 'namespace' as keyof StatefulSet,
      header: 'Namespace',
      sortable: true,
    },
    {
      key: 'replicas' as keyof StatefulSet,
      header: 'Replicas',
      sortable: true,
      render: (value: unknown, row: StatefulSet) => <span>{`${row.readyReplicas}/${value as number}`}</span>,
    },
    {
      key: 'currentReplicas' as keyof StatefulSet,
      header: 'Current',
      sortable: true,
    },
    {
      key: 'readyReplicas' as keyof StatefulSet,
      header: 'Ready',
      sortable: true,
    },
    {
      key: 'actions' as keyof StatefulSet,
      header: 'Actions',
      render: (_value: unknown, row: StatefulSet) => (
        <div className="actions-cell">
          <button
            className="action-button"
            onClick={(e) => {
              e.stopPropagation();
              setScaleTarget(row);
              setScaleReplicas(row.replicas);
            }}
          >
            Scale
          </button>
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
      <div className="statefulset-list">
        <div className="error-message">Error loading StatefulSets: {(error as Error).message}</div>
      </div>
    );
  }

  return (
    <>
      <div className="statefulset-list">
        <div className="page-header">
          <h1>StatefulSets</h1>
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
          emptyMessage="No StatefulSets found matching your filters"
        />

        {deleteTarget && (
          <ConfirmationDialog
            title="Delete StatefulSet"
            message={`Are you sure you want to delete StatefulSet "${deleteTarget.name}" in namespace "${deleteTarget.namespace}"? This action cannot be undone.`}
            onConfirm={() => handleDelete(deleteTarget)}
            onCancel={() => setDeleteTarget(null)}
            confirmText="Delete"
            variant="danger"
          />
        )}

        {scaleTarget && (
          <Modal
            isOpen={!!scaleTarget}
            onClose={() => setScaleTarget(null)}
            title={`Scale StatefulSet: ${scaleTarget.name}`}
            size="sm"
          >
            <div className="scale-modal">
              <label>Number of replicas:</label>
              <Input
                type="number"
                min="0"
                value={scaleReplicas}
                onChange={(e) => setScaleReplicas(Number(e.target.value))}
                fullWidth
              />
              <div className="modal-actions">
                <Button variant="secondary" onClick={() => setScaleTarget(null)}>
                  Cancel
                </Button>
                <Button variant="primary" onClick={handleScale} loading={scaleMutation.isPending}>
                  Scale
                </Button>
              </div>
            </div>
          </Modal>
        )}
      </div>

      <style>{`
        .statefulset-list {
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

        .scale-modal {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .scale-modal label {
          font-size: 14px;
          font-weight: 500;
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
