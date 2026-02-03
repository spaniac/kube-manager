import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getDeployments, deleteDeployment, scaleDeployment, restartDeployment } from '@api/deployment';
import { useApiQuery, useApiMutation } from '@hooks/useApi';
import type { Deployment } from '@types/api';
import { Button } from '@components/Button';
import { ConfirmationDialog } from '@components/ConfirmationDialog';
import { Toast } from '@components/Toast';
import { Table, TableStyles } from '@components/Table';
import { Modal } from '@components/Modal';
import { Input } from '@components/Input';

export default function DeploymentList() {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({ search: '', namespace: '' });
  const [deleteTarget, setDeleteTarget] = useState<Deployment | null>(null);
  const [scaleTarget, setScaleTarget] = useState<Deployment | null>(null);
  const [scaleReplicas, setScaleReplicas] = useState<number>(1);
  const [sortConfig, setSortConfig] = useState<{ key: keyof Deployment; order: 'asc' | 'desc' }>({
    key: 'name',
    order: 'asc',
  });

  const { data, isLoading, error, refetch } = useApiQuery(
    ['deployments', filters, sortConfig],
    () =>
      getDeployments({
        search: filters.search || undefined,
        namespace: filters.namespace || undefined,
      }),
  );

  const deleteMutation = useApiMutation(
    async (deployment: { namespace: string; name: string }) => {
      await deleteDeployment(deployment.namespace, deployment.name);
    },
    {
      onSuccess: () => {
        Toast.show('Deployment deleted successfully', 'success');
        refetch();
        setDeleteTarget(null);
      },
    },
  );

  const scaleMutation = useApiMutation(
    async (params: { namespace: string; name: string; replicas: number }) => {
      await scaleDeployment(params.namespace, params.name, params.replicas);
    },
    {
      onSuccess: () => {
        Toast.show('Deployment scaled successfully', 'success');
        refetch();
        setScaleTarget(null);
      },
    },
  );

  const restartMutation = useApiMutation(
    async (deployment: { namespace: string; name: string }) => {
      await restartDeployment(deployment.namespace, deployment.name);
    },
    {
      onSuccess: () => {
        Toast.show('Deployment restarted successfully', 'success');
        refetch();
      },
    },
  );

  const handleSort = (key: keyof Deployment, order: 'asc' | 'desc') => {
    setSortConfig({ key, order });
  };

  const handleRowClick = (deployment: Deployment) => {
    navigate(`/deployments/${deployment.namespace}/${deployment.name}`);
  };

  const handleDelete = async (deployment: Deployment) => {
    await deleteMutation.mutateAsync({ namespace: deployment.namespace, name: deployment.name });
  };

  const handleScale = async () => {
    if (scaleTarget) {
      await scaleMutation.mutateAsync({
        namespace: scaleTarget.namespace,
        name: scaleTarget.name,
        replicas: scaleReplicas,
      });
    }
  };

  const handleRestart = async (deployment: Deployment) => {
    await restartMutation.mutateAsync({ namespace: deployment.namespace, name: deployment.name });
  };

  const handleFilterChange = (newFilters: Record<string, string>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  const columns = [
    {
      key: 'name' as keyof Deployment,
      header: 'Name',
      sortable: true,
      render: (value: string, row: Deployment) => (
        <a
          href={`/deployments/${row.namespace}/${row.name}`}
          className="resource-link"
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/deployments/${row.namespace}/${row.name}`);
          }}
        >
          {value}
        </a>
      ),
    },
    {
      key: 'namespace' as keyof Deployment,
      header: 'Namespace',
      sortable: true,
    },
    {
      key: 'replicas' as keyof Deployment,
      header: 'Replicas',
      sortable: true,
      render: (value: number, row: Deployment) => `${row.readyReplicas}/${row.replicas}`,
    },
    {
      key: 'updatedReplicas' as keyof Deployment,
      header: 'Updated',
      sortable: true,
    },
    {
      key: 'availableReplicas' as keyof Deployment,
      header: 'Available',
      sortable: true,
    },
    {
      key: 'strategy' as keyof Deployment,
      header: 'Strategy',
      sortable: true,
      render: (value: string) => value || 'RollingUpdate',
    },
    {
      key: 'actions' as keyof Deployment,
      header: 'Actions',
      render: (_value: unknown, row: Deployment) => (
        <div className="actions-cell">
          <button
            className="action-button"
            onClick={(e) => {
              e.stopPropagation();
              handleRestart(row);
            }}
            disabled={restartMutation.isLoading}
          >
            Restart
          </button>
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
      <div className="deployment-list">
        <div className="error-message">Error loading deployments: {(error as Error).message}</div>
      </div>
    );
  }

  return (
    <>
      <div className="deployment-list">
        <div className="page-header">
          <h1>Deployments</h1>
        </div>

        <div className="filters-bar">
          <Input
            label="Search"
            placeholder="Search by name..."
            fullWidth
            value={filters.search}
            onChange={(e) => handleFilterChange({ search: e.target.value })}
          />
          <Input
            label="Namespace"
            placeholder="Filter by namespace..."
            fullWidth
            value={filters.namespace}
            onChange={(e) => handleFilterChange({ namespace: e.target.value })}
          />
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
          emptyMessage="No deployments found matching your filters"
        />

        {deleteTarget && (
          <ConfirmationDialog
            title="Delete Deployment"
            message={`Are you sure you want to delete deployment "${deleteTarget.name}" in namespace "${deleteTarget.namespace}"? This action cannot be undone.`}
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
            title={`Scale Deployment: ${scaleTarget.name}`}
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
                <Button
                  variant="primary"
                  onClick={handleScale}
                  loading={scaleMutation.isLoading}
                >
                  Scale
                </Button>
              </div>
            </div>
          </Modal>
        )}
      </div>

      <style>{`
        .deployment-list {
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

        .action-button:hover:not(:disabled) {
          background: #2563eb;
        }

        .action-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .action-button.danger {
          background: #dc2626;
        }

        .action-button.danger:hover:not(:disabled) {
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
