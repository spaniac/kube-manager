import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getConfigMaps, deleteConfigMap } from '@api/configmap';
import { useApiQuery, useApiMutation } from '@hooks/useApi';
import type { ConfigMap } from '@types/api';
import { Badge } from '@components/Badge';
import { ConfirmationDialog } from '@components/ConfirmationDialog';
import { useToast } from '@components/Toast';
import { Table, TableStyles } from '@components/Table';
import { Button } from '@components/Button';

export default function ConfigMapList() {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({ search: '', namespace: '' });
  const [deleteTarget, setDeleteTarget] = useState<ConfigMap | null>(null);
  const [selectedConfigMap, setSelectedConfigMap] = useState<ConfigMap | null>(null);
  const [sortConfig, setSortConfig] = useState<{ key: keyof ConfigMap; order: 'asc' | 'desc' }>({
    key: 'name',
    order: 'asc',
  });

  const { data, isLoading, error, refetch } = useApiQuery(
    ['configmaps', filters, sortConfig],
    () =>
      getConfigMaps({
        search: filters.search || undefined,
        namespace: filters.namespace || undefined,
      }),
  );

  const deleteMutation = useApiMutation(
    async (configmap: { namespace: string; name: string }) => {
      await deleteConfigMap(configmap.namespace, configmap.name);
    },
    {
      onSuccess: () => {
        Toast.show('ConfigMap deleted successfully', 'success');
        refetch();
        setDeleteTarget(null);
      },
    },
  );

  const handleSort = (key: keyof ConfigMap, order: 'asc' | 'desc') => {
    setSortConfig({ key, order });
  };

  const handleRowClick = (configmap: ConfigMap) => {
    navigate(`/configmaps/${configmap.namespace}/${configmap.name}`);
  };

  const handleDelete = async (configmap: ConfigMap) => {
    await deleteMutation.mutateAsync({ namespace: configmap.namespace, name: configmap.name });
  };

  const handleViewData = (configmap: ConfigMap) => {
    setSelectedConfigMap(configmap);
  };

  const handleFilterChange = (newFilters: Record<string, string>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  const columns = [
    {
      key: 'name' as keyof ConfigMap,
      header: 'Name',
      sortable: true,
      render: (value: string, row: ConfigMap) => (
        <a
          href={`/configmaps/${row.namespace}/${row.name}`}
          className="resource-link"
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/configmaps/${row.namespace}/${row.name}`);
          }}
        >
          {value}
        </a>
      ),
    },
    {
      key: 'namespace' as keyof ConfigMap,
      header: 'Namespace',
      sortable: true,
    },
    {
      key: 'data' as keyof ConfigMap,
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
      key: 'creationTimestamp' as keyof ConfigMap,
      header: 'Created',
      sortable: true,
      render: (value: number) => new Date(value).toLocaleDateString(),
    },
    {
      key: 'actions' as keyof ConfigMap,
      header: 'Actions',
      render: (_value: unknown, row: ConfigMap) => (
        <div className="actions-cell">
          <button
            className="action-button"
            onClick={(e) => {
              e.stopPropagation();
              handleViewData(row);
            }}
          >
            View Data
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
      <div className="configmap-list">
        <div className="error-message">Error loading ConfigMaps: {(error as Error).message}</div>
      </div>
    );
  }

  return (
    <>
      <div className="configmap-list">
        <div className="page-header">
          <h1>ConfigMaps</h1>
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
          emptyMessage="No ConfigMaps found matching your filters"
        />

        {deleteTarget && (
          <ConfirmationDialog
            title="Delete ConfigMap"
            message={`Are you sure you want to delete ConfigMap "${deleteTarget.name}" in namespace "${deleteTarget.namespace}"? This action cannot be undone.`}
            onConfirm={() => handleDelete(deleteTarget)}
            onCancel={() => setDeleteTarget(null)}
            confirmText="Delete"
            variant="danger"
          />
        )}

        {selectedConfigMap && (
          <div className="data-modal-overlay" onClick={() => setSelectedConfigMap(null)}>
            <div className="data-modal" onClick={(e) => e.stopPropagation()}>
              <div className="data-modal-header">
                <h3>ConfigMap: {selectedConfigMap.name}</h3>
                <button className="close-button" onClick={() => setSelectedConfigMap(null)}>
                  ×
                </button>
              </div>
              <div className="data-modal-content">
                {selectedConfigMap.data && Object.keys(selectedConfigMap.data).length > 0 ? (
                  Object.entries(selectedConfigMap.data).map(([key, value]) => (
                    <div key={key} className="data-item">
                      <div className="data-key">{key}</div>
                      <pre className="data-value">{value}</pre>
                    </div>
                  ))
                ) : (
                  <p className="no-data">No data in this ConfigMap</p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        .configmap-list {
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

        .keys-cell {
          display: flex;
          flex-wrap: wrap;
          gap: 4px;
        }

        .key-badge {
          display: inline-block;
          padding: 2px 8px;
          background: #eff6ff;
          border: 1px solid #dbeafe;
          border-radius: 4px;
          font-size: 11px;
          font-weight: 500;
          color: #1e40af;
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

        .data-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 24px;
        }

        .data-modal {
          background: white;
          border-radius: 12px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
          max-width: 800px;
          width: 100%;
          max-height: 600px;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        .data-modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 24px;
          border-bottom: 1px solid #e5e7eb;
        }

        .data-modal-header h3 {
          margin: 0;
          font-size: 20px;
          font-weight: 600;
          color: #111827;
        }

        .close-button {
          background: transparent;
          border: none;
          font-size: 28px;
          color: #6b7280;
          cursor: pointer;
          padding: 0;
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 6px;
        }

        .close-button:hover {
          background: #f3f4f6;
        }

        .data-modal-content {
          padding: 24px;
          overflow-y: auto;
          flex: 1;
        }

        .data-item {
          margin-bottom: 16px;
        }

        .data-key {
          font-size: 14px;
          font-weight: 600;
          color: #374151;
          margin-bottom: 8px;
        }

        .data-value {
          background: #f9fafb;
          border: 1px solid #e5e7eb;
          border-radius: 6px;
          padding: 12px;
          margin: 0;
          font-size: 13px;
          color: #374151;
          overflow-x: auto;
        }

        .no-data {
          color: #6b7280;
          font-size: 14px;
          text-align: center;
          padding: 24px;
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
