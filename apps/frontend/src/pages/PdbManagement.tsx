import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getPodDisruptionBudgets, createPodDisruptionBudget, deletePodDisruptionBudget } from '@api/workload';
import { useApiQuery, useApiMutation } from '@hooks/useApi';
import { Button } from '@components/Button';
import { Input } from '@components/Input';
import { Spinner } from '@components/Spinner';
import { Table, TableStyles } from '@components/Table';
import { Modal } from '@components/Modal';
import { useToast } from '@components/Toast';
import { Badge } from '@components/Badge';

interface Pdb {
  name: string;
  namespace: string;
  minAvailable: number;
  maxUnavailable: number;
  currentHealthy: number;
  desiredHealthy: number;
}

export default function PdbManagement() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [page, setPage] = useState(1);
  const [limit] = useState(20);
  const [namespace, setNamespace] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedPdb, setSelectedPdb] = useState<Pdb | null>(null);
  const [newPdbName, setNewPdbName] = useState('');
  const [newPdbNamespace, setNewPdbNamespace] = useState('');
  const [minAvailable, setMinAvailable] = useState<number | undefined>();
  const [maxUnavailable, setMaxUnavailable] = useState<number | undefined>();
  const [selectorKey, setSelectorKey] = useState('');
  const [selectorValue, setSelectorValue] = useState('');

  const { data: pdbData, isLoading, error, refetch } = useApiQuery(
    ['pdbs', page, limit, namespace],
    () => getPodDisruptionBudgets({ page, limit, namespace: namespace || undefined }),
    {
      keepPreviousData: true,
    },
  );

  const pdbs = pdbData?.items || [];
  const total = pdbData?.total || 0;

  const createMutation = useApiMutation(
    async () => {
      const selector: Record<string, string> = {};
      if (selectorKey && selectorValue) {
        selector[selectorKey] = selectorValue;
      }
      return await createPodDisruptionBudget(
        newPdbNamespace,
        newPdbName,
        minAvailable,
        maxUnavailable,
        Object.keys(selector).length > 0 ? selector : undefined,
      );
    },
    {
      onSuccess: () => {
        showToast({ message: 'PodDisruptionBudget created successfully', type: 'success' });
        setShowCreateModal(false);
        setNewPdbName('');
        setNewPdbNamespace('');
        setMinAvailable(undefined);
        setMaxUnavailable(undefined);
        setSelectorKey('');
        setSelectorValue('');
        refetch();
      },
      onError: (error) => {
        showToast({ message: `Failed to create PDB: ${(error as Error).message}`, type: 'error' });
      },
    },
  );

  const deleteMutation = useApiMutation(
    async () => {
      if (selectedPdb) {
        return await deletePodDisruptionBudget(selectedPdb.namespace, selectedPdb.name);
      }
    },
    {
      onSuccess: () => {
        showToast({ message: 'PodDisruptionBudget deleted successfully', type: 'success' });
        setShowDeleteModal(false);
        setSelectedPdb(null);
        refetch();
      },
      onError: (error) => {
        showToast({ message: `Failed to delete PDB: ${(error as Error).message}`, type: 'error' });
      },
    },
  );

  const columns = [
    { key: 'name' as keyof Pdb, header: 'Name' },
    {
      key: 'namespace' as keyof Pdb,
      header: 'Namespace',
      render: (value: string) => (
        <span className="namespace-badge">{value}</span>
      ),
    },
    {
      key: 'minAvailable' as keyof Pdb,
      header: 'Min Available',
      render: (value: number) => value !== undefined ? value : '-',
    },
    {
      key: 'maxUnavailable' as keyof Pdb,
      header: 'Max Unavailable',
      render: (value: number) => value !== undefined ? value : '-',
    },
    {
      key: 'currentHealthy' as keyof Pdb,
      header: 'Current Healthy',
      render: (value: number) => `${value} / ${pdbs.find(pdb => pdb.currentHealthy === value)?.desiredHealthy || '-'}`,
    },
    {
      key: 'status' as keyof Pdb,
      header: 'Status',
      render: (_: any, row: Pdb) => {
        const isHealthy = row.currentHealthy >= row.desiredHealthy;
        return <Badge status={isHealthy ? 'Running' : 'Pending'} label={isHealthy ? 'Healthy' : 'Unhealthy'} />;
      },
    },
    {
      key: 'actions' as keyof Pdb,
      header: 'Actions',
      render: (_: any, row: Pdb) => (
        <div className="action-buttons">
          <Button
            variant="danger"
            size="sm"
            onClick={() => {
              setSelectedPdb(row);
              setShowDeleteModal(true);
            }}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  const handleCreatePdb = () => {
    if (!newPdbName || !newPdbNamespace) {
      showToast({ message: 'Please fill in all required fields', type: 'error' });
      return;
    }

    if (minAvailable === undefined && maxUnavailable === undefined) {
      showToast({ message: 'Please specify either minAvailable or maxUnavailable', type: 'error' });
      return;
    }

    createMutation.mutate();
  };

  const handleNamespaceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNamespace(e.target.value);
    setPage(1);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const totalPages = Math.ceil(total / limit);

  return (
    <>
      <div className="pdb-management">
        <TableStyles />
        <div className="page-header">
          <div>
            <h1>PodDisruptionBudgets</h1>
            <p>Manage pod disruption budgets for high availability</p>
          </div>
          <div className="header-actions">
            <Button variant="primary" onClick={() => setShowCreateModal(true)}>
              Create PDB
            </Button>
          </div>
        </div>

        <div className="filters">
          <Input
            placeholder="Filter by namespace..."
            value={namespace}
            onChange={handleNamespaceChange}
            fullWidth
          />
        </div>

        <div className="info-banner">
          <div className="info-icon">ℹ️</div>
          <div className="info-content">
            <strong>PodDisruptionBudgets</strong>
            <p>PDBs ensure minimum availability of pods during voluntary disruptions like node maintenance or deployment updates. Configure minAvailable or maxUnavailable to control disruption behavior.</p>
          </div>
        </div>

        {isLoading ? (
          <div className="loading-container">
            <Spinner />
            <p>Loading PodDisruptionBudgets...</p>
          </div>
        ) : error ? (
          <div className="error-message">
            Error loading PDBs: {(error as Error).message}
          </div>
        ) : pdbs.length === 0 ? (
          <div className="empty-state">
            <p>No PodDisruptionBudgets found</p>
            <Button variant="primary" onClick={() => setShowCreateModal(true)}>
              Create First PDB
            </Button>
          </div>
        ) : (
          <div className="table-container">
            <Table
              data={pdbs}
              columns={columns}
              emptyMessage="No PodDisruptionBudgets found"
            />
            {totalPages > 1 && (
              <div className="pagination">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => handlePageChange(page - 1)}
                  disabled={page === 1}
                >
                  Previous
                </Button>
                <span className="page-info">
                  Page {page} of {totalPages}
                </span>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => handlePageChange(page + 1)}
                  disabled={page === totalPages}
                >
                  Next
                </Button>
              </div>
            )}
          </div>
        )}
      </div>

      <Modal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        title="Create PodDisruptionBudget"
        size="md"
      >
        <div className="modal-form">
          <div className="form-group">
            <label>Name *</label>
            <Input
              value={newPdbName}
              onChange={(e) => setNewPdbName(e.target.value)}
              placeholder="e.g., my-pdb"
              fullWidth
            />
          </div>
          <div className="form-group">
            <label>Namespace *</label>
            <Input
              value={newPdbNamespace}
              onChange={(e) => setNewPdbNamespace(e.target.value)}
              placeholder="e.g., default"
              fullWidth
            />
          </div>
          <div className="form-group">
            <label>Min Available (optional)</label>
            <Input
              type="number"
              value={minAvailable || ''}
              onChange={(e) => setMinAvailable(e.target.value ? parseInt(e.target.value) : undefined)}
              placeholder="e.g., 2"
              fullWidth
            />
            <p className="field-hint">Minimum number of pods that must be available</p>
          </div>
          <div className="form-group">
            <label>Max Unavailable (optional)</label>
            <Input
              type="number"
              value={maxUnavailable || ''}
              onChange={(e) => setMaxUnavailable(e.target.value ? parseInt(e.target.value) : undefined)}
              placeholder="e.g., 1"
              fullWidth
            />
            <p className="field-hint">Maximum number of pods that can be unavailable</p>
          </div>
          <div className="form-group">
            <label>Selector Key (optional)</label>
            <Input
              value={selectorKey}
              onChange={(e) => setSelectorKey(e.target.value)}
              placeholder="e.g., app"
              fullWidth
            />
          </div>
          <div className="form-group">
            <label>Selector Value (optional)</label>
            <Input
              value={selectorValue}
              onChange={(e) => setSelectorValue(e.target.value)}
              placeholder="e.g., my-app"
              fullWidth
            />
            <p className="field-hint">Labels to match pods</p>
          </div>
          <div className="modal-actions">
            <Button variant="secondary" onClick={() => setShowCreateModal(false)}>
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={handleCreatePdb}
              loading={createMutation.isPending}
            >
              Create PDB
            </Button>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Delete PodDisruptionBudget"
        size="sm"
      >
        <div className="modal-form">
          <p>Are you sure you want to delete this PodDisruptionBudget?</p>
          {selectedPdb && (
            <div className="pdb-info">
              <div className="info-row">
                <span className="info-label">Name:</span>
                <span className="info-value">{selectedPdb.name}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Namespace:</span>
                <span className="info-value">{selectedPdb.namespace}</span>
              </div>
            </div>
          )}
          <div className="warning-banner">
            <strong>Warning:</strong> Deleting this PDB may affect pod availability during node maintenance.
          </div>
          <div className="modal-actions">
            <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
              Cancel
            </Button>
            <Button
              variant="danger"
              onClick={() => deleteMutation.mutate()}
              loading={deleteMutation.isPending}
            >
              Delete PDB
            </Button>
          </div>
        </div>
      </Modal>

      <style>{`
        .pdb-management {
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
          margin: 0 0 8px 0;
          font-size: 28px;
          font-weight: 700;
          color: #111827;
        }

        .page-header p {
          margin: 0;
          font-size: 14px;
          color: #6b7280;
        }

        .header-actions {
          display: flex;
          gap: 12px;
        }

        .filters {
          margin-bottom: 24px;
        }

        .info-banner {
          display: flex;
          gap: 16px;
          padding: 16px;
          background: #eff6ff;
          border: 1px solid #dbeafe;
          border-radius: 8px;
          margin-bottom: 24px;
        }

        .info-icon {
          font-size: 20px;
          flex-shrink: 0;
        }

        .info-content strong {
          display: block;
          margin-bottom: 4px;
          font-size: 14px;
          color: #1e40af;
        }

        .info-content p {
          margin: 0;
          font-size: 13px;
          color: #3b82f6;
          line-height: 1.5;
        }

        .loading-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
          padding: 48px;
        }

        .loading-container p {
          margin: 0;
          font-size: 14px;
          color: #6b7280;
        }

        .error-message {
          padding: 16px;
          background: #fef2f2;
          border: 1px solid #fecaca;
          border-radius: 6px;
          color: #b91c1c;
        }

        .empty-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
          padding: 48px;
          background: #f9fafb;
          border-radius: 8px;
        }

        .empty-state p {
          margin: 0;
          font-size: 14px;
          color: #6b7280;
        }

        .table-container {
          background: #ffffff;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          overflow: hidden;
        }

        .action-buttons {
          display: flex;
          gap: 8px;
        }

        .namespace-badge {
          display: inline-block;
          padding: 2px 8px;
          background: #dbeafe;
          color: #1e40af;
          border-radius: 4px;
          font-size: 12px;
          font-weight: 500;
        }

        .pagination {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 12px;
          padding: 16px;
          border-top: 1px solid #e5e7eb;
        }

        .page-info {
          font-size: 14px;
          color: #6b7280;
          font-weight: 500;
        }

        .modal-form {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .form-group label {
          display: block;
          font-size: 14px;
          font-weight: 500;
          color: #374151;
          margin-bottom: 8px;
        }

        .field-hint {
          margin: 8px 0 0 0;
          font-size: 12px;
          color: #6b7280;
        }

        .modal-form p {
          margin: 0;
          font-size: 14px;
          color: #374151;
        }

        .pdb-info {
          padding: 16px;
          background: #f9fafb;
          border-radius: 8px;
          margin-bottom: 16px;
        }

        .info-row {
          display: flex;
          justify-content: space-between;
          padding: 4px 0;
          font-size: 14px;
        }

        .info-label {
          color: #6b7280;
          font-weight: 500;
        }

        .info-value {
          color: #111827;
          font-weight: 600;
        }

        .warning-banner {
          padding: 12px;
          background: #fef2f2;
          border: 1px solid #fecaca;
          border-radius: 6px;
          font-size: 13px;
          color: #991b1b;
        }

        .modal-actions {
          display: flex;
          gap: 12px;
          justify-content: flex-end;
          margin-top: 8px;
        }
      `}</style>
    </>
  );
}
