import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getPods, deletePod } from '@api/pod';
import { useApiQuery, useApiMutation } from '@hooks/useApi';
import type { Pod } from '@types/api';
import { ResourceListPage } from '@pages/ResourceList';
import { Badge } from '@components/Badge';
import { ConfirmationDialog } from '@components/ConfirmationDialog';
import { useToast } from '@components/Toast';
import { Table, TableStyles } from '@components/Table';

export default function PodList() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [filters, setFilters] = useState({ search: '', namespace: '', status: '' });
  const [deleteTarget, setDeleteTarget] = useState<Pod | null>(null);
  const [sortConfig, setSortConfig] = useState<{ key: keyof Pod; order: 'asc' | 'desc' }>({
    key: 'name',
    order: 'asc',
  });

  const { data, isLoading, error, refetch } = useApiQuery(
    ['pods', filters, sortConfig],
    () =>
      getPods({
        search: filters.search || undefined,
        namespace: filters.namespace || undefined,
      }),
  );

  const deleteMutation = useApiMutation(async (pod: { namespace: string; name: string }) => {
    await deletePod(pod.namespace, pod.name);
  }, {
    onSuccess: () => {
      showToast('Pod deleted successfully', 'success');
      refetch();
      setDeleteTarget(null);
    },
  });

  const handleSort = (key: keyof Pod, order: 'asc' | 'desc') => {
    setSortConfig({ key, order });
  };

  const handleRowClick = (pod: Pod) => {
    navigate(`/pods/${pod.namespace}/${pod.name}`);
  };

  const handleDelete = async (pod: Pod) => {
    await deleteMutation.mutateAsync({ namespace: pod.namespace, name: pod.name });
  };

  const handleFilterChange = (newFilters: Record<string, string>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  const columns = [
    {
      key: 'name' as keyof Pod,
      header: 'Name',
      sortable: true,
      render: (value: string, row: Pod) => (
        <a
          href={`/pods/${row.namespace}/${row.name}`}
          className="resource-link"
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/pods/${row.namespace}/${row.name}`);
          }}
        >
          {value}
        </a>
      ),
    },
    {
      key: 'namespace' as keyof Pod,
      header: 'Namespace',
      sortable: true,
    },
    {
      key: 'status' as keyof Pod,
      header: 'Status',
      sortable: true,
      render: (value: string) => <Badge status={value} />,
    },
    {
      key: 'nodeName' as keyof Pod,
      header: 'Node',
      sortable: true,
      render: (value: string) => value || '-',
    },
    {
      key: 'podIP' as keyof Pod,
      header: 'IP',
      sortable: true,
      render: (value: string) => value || '-',
    },
    {
      key: 'containers' as keyof Pod,
      header: 'Containers',
      sortable: true,
      render: (value: any[]) => (
        <div className="containers-cell">
          {value.map((container) => (
            <span key={container.name} className="container-badge">
              {container.name} {container.ready ? '✓' : '✗'}
            </span>
          ))}
        </div>
      ),
    },
    {
      key: 'startTime' as keyof Pod,
      header: 'Age',
      sortable: true,
      render: (value: string) => {
        if (!value) return '-';
        const age = Math.floor((Date.now() - new Date(value).getTime()) / 1000);
        if (age < 60) return `${age}s`;
        if (age < 3600) return `${Math.floor(age / 60)}m`;
        return `${Math.floor(age / 3600)}h`;
      },
    },
    {
      key: 'actions' as keyof Pod,
      header: 'Actions',
      render: (_value: unknown, row: Pod) => (
        <div className="actions-cell">
          <button
            className="action-button"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/pods/${row.namespace}/${row.name}`);
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

  return (
    <>
      <div className="pod-list">
        <div className="page-header">
          <h1>Pods</h1>
        </div>

        <div className="filters-bar">
          <input
            className="search-input"
            placeholder="Search by name..."
            value={filters.search}
            onChange={(e) => handleFilterChange({ search: e.target.value })}
          />
          <input
            className="search-input"
            placeholder="Filter by namespace..."
            value={filters.namespace}
            onChange={(e) => handleFilterChange({ namespace: e.target.value })}
          />
          <select
            className="filter-select"
            value={filters.status}
            onChange={(e) => handleFilterChange({ status: e.target.value })}
          >
            <option value="">All Statuses</option>
            <option value="Running">Running</option>
            <option value="Pending">Pending</option>
            <option value="Failed">Failed</option>
            <option value="Succeeded">Succeeded</option>
          </select>
          <button
            className="clear-button"
            onClick={() => handleFilterChange({ search: '', namespace: '', status: '' })}
          >
            Clear
          </button>
        </div>

        <TableStyles />
        <Table
          data={data?.items || []}
          columns={columns}
          onSort={handleSort}
          defaultSort={sortConfig}
          onRowClick={handleRowClick}
          loading={isLoading}
          emptyMessage="No pods found matching your filters"
        />

        {deleteTarget && (
          <ConfirmationDialog
            title="Delete Pod"
            message={`Are you sure you want to delete pod "${deleteTarget.name}" in namespace "${deleteTarget.namespace}"? This action cannot be undone.`}
            onConfirm={() => handleDelete(deleteTarget)}
            onCancel={() => setDeleteTarget(null)}
            confirmText="Delete"
            variant="danger"
          />
        )}
      </div>

      <style>{`
        .pod-list {
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

        .search-input {
          flex: 1;
          padding: 10px 14px;
          border: 1px solid #d1d5db;
          border-radius: 6px;
          font-size: 14px;
          min-width: 200px;
        }

        .search-input:focus {
          outline: none;
          border-color: #3b82f6;
          box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.1);
        }

        .filter-select {
          padding: 10px 14px;
          border: 1px solid #d1d5db;
          border-radius: 6px;
          font-size: 14px;
          background: white;
          min-width: 150px;
        }

        .filter-select:focus {
          outline: none;
          border-color: #3b82f6;
        }

        .clear-button {
          padding: 10px 20px;
          background: #6b7280;
          color: white;
          border: none;
          border-radius: 6px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: background 0.2s;
        }

        .clear-button:hover {
          background: #4b5563;
        }

        .resource-link {
          color: #3b82f6;
          text-decoration: none;
          font-weight: 500;
        }

        .resource-link:hover {
          text-decoration: underline;
        }

        .containers-cell {
          display: flex;
          flex-wrap: wrap;
          gap: 4px;
        }

        .container-badge {
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
      `}</style>
    </>
  );
}
