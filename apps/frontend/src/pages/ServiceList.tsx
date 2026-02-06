import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getServices, deleteService } from '@api/service';
import { useApiQuery, useApiMutation } from '@hooks/useApi';
import type { Service } from '@types/api';
import { Badge } from '@components/Badge';
import { ConfirmationDialog } from '@components/ConfirmationDialog';
import { useToast } from '@components/Toast';
import { Table, TableStyles } from '@components/Table';
import { Button } from '@components/Button';

export default function ServiceList() {
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [filters, setFilters] = useState({ search: '', namespace: '' });
  const [deleteTarget, setDeleteTarget] = useState<Service | null>(null);
  const [sortConfig, setSortConfig] = useState<{ key: keyof Service; order: 'asc' | 'desc' }>({
    key: 'name',
    order: 'asc',
  });

  const { data, isLoading, error, refetch } = useApiQuery(
    ['services', filters, sortConfig],
    () =>
      getServices({
        search: filters.search || undefined,
        namespace: filters.namespace || undefined,
      }),
  );

  const deleteMutation = useApiMutation(
    async (service: { namespace: string; name: string }) => {
      await deleteService(service.namespace, service.name);
    },
    {
      onSuccess: () => {
        showToast({ message: 'Service deleted successfully', type: 'success' });
        refetch();
        setDeleteTarget(null);
      },
    },
  );

  const handleSort = (key: keyof Service, order: 'asc' | 'desc') => {
    setSortConfig({ key, order });
  };

  const handleRowClick = (service: Service) => {
    navigate(`/services/${service.namespace}/${service.name}`);
  };

  const handleDelete = async (service: Service) => {
    await deleteMutation.mutateAsync({ namespace: service.namespace, name: service.name });
  };

  const handleFilterChange = (newFilters: Record<string, string>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  const columns = [
    {
      key: 'name' as keyof Service,
      header: 'Name',
      sortable: true,
      render: (value: string, row: Service) => (
        <a
          href={`/services/${row.namespace}/${row.name}`}
          className="resource-link"
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/services/${row.namespace}/${row.name}`);
          }}
        >
          {value}
        </a>
      ),
    },
    {
      key: 'namespace' as keyof Service,
      header: 'Namespace',
      sortable: true,
    },
    {
      key: 'type' as keyof Service,
      header: 'Type',
      sortable: true,
      render: (value: string) => <Badge status={value} />,
    },
    {
      key: 'clusterIPs' as keyof Service,
      header: 'Cluster IP',
      sortable: true,
      render: (value: string[]) => value.join(', ') || '-',
    },
    {
      key: 'ports' as keyof Service,
      header: 'Ports',
      sortable: true,
      render: (value: any[]) => (
        <div className="ports-cell">
          {value.map((port, index) => (
            <span key={index} className="port-badge">
              {port.name ? `${port.name}: ` : ''}{port.port}/{port.protocol?.toLowerCase()}
            </span>
          ))}
        </div>
      ),
    },
    {
      key: 'endpoints' as keyof Service,
      header: 'Endpoints',
      sortable: true,
      render: (value: any[]) => {
        const readyEndpoints = value.filter((e) => e.ready).length;
        const totalEndpoints = value.length;
        return `${readyEndpoints}/${totalEndpoints}`;
      },
    },
    {
      key: 'actions' as keyof Service,
      header: 'Actions',
      render: (_value: unknown, row: Service) => (
        <div className="actions-cell">
          <button
            className="action-button"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/services/${row.namespace}/${row.name}`);
            }}
          >
            View
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
      <div className="service-list">
        <div className="error-message">Error loading services: {(error as Error).message}</div>
      </div>
    );
  }

  return (
    <>
      <div className="service-list">
        <div className="page-header">
          <h1>Services</h1>
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
          emptyMessage="No services found matching your filters"
        />

        {deleteTarget && (
          <ConfirmationDialog
            title="Delete Service"
            message={`Are you sure you want to delete service "${deleteTarget.name}" in namespace "${deleteTarget.namespace}"? This action cannot be undone.`}
            onConfirm={() => handleDelete(deleteTarget)}
            onCancel={() => setDeleteTarget(null)}
            confirmText="Delete"
            variant="danger"
          />
        )}
      </div>

      <style>{`
        .service-list {
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

        .ports-cell {
          display: flex;
          flex-wrap: wrap;
          gap: 4px;
        }

        .port-badge {
          display: inline-block;
          padding: 2px 8px;
          background: #eff6ff;
          border: 1px solid #dbeafe;
          border-radius: 4px;
          font-size: 11px;
          font-weight: 500;
          color: #1e40af;
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