import { useState } from 'react';
import { Table, TableStyles } from '@components/Table';
import { Input } from '@components/Input';
import { Button } from '@components/Button';
import { Select } from '@components/Select';
import type { ResourceList } from '../types/api';

interface ResourceListProps<T> {
  data: ResourceList<T> | undefined;
  isLoading: boolean;
  error: unknown;
  title: string;
  columns: Array<{
    key: keyof T;
    header: string;
    sortable?: boolean;
    render?: (value: any, row: T) => React.ReactNode;
  }>;
  onRowClick?: (row: T) => void;
  onCreate?: () => void;
  filters?: {
    namespace?: string;
    status?: string;
    search?: string;
  };
  onFilterChange?: (filters: Record<string, string>) => void;
  onCreateLabel?: string;
}

export function ResourceListPage<T extends Record<string, any>>({
  data,
  isLoading,
  error,
  title,
  columns,
  onRowClick,
  onCreate,
  filters,
  onFilterChange,
  onCreateLabel = 'Create Resource',
}: ResourceListProps<T>) {
  const [sortConfig, setSortConfig] = useState<{ key: keyof T; order: 'asc' | 'desc' }>({
    key: columns[0]?.key || ('name' as keyof T),
    order: 'asc',
  });

  const handleSort = (key: keyof T, order: 'asc' | 'desc') => {
    setSortConfig({ key, order });
  };

  const handleFilterChange = (key: string, value: string) => {
    onFilterChange?.({ [key]: value });
  };

  if (error) {
    return (
      <div className="resource-list-page">
        <div className="error-container">
          <div className="error-message">
            Error loading {title.toLowerCase()}: {(error as Error).message}
          </div>
          <Button variant="secondary" onClick={() => window.location.reload()}>
            Retry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="resource-list-page">
      <div className="page-header">
        <h1>{title}</h1>
        {onCreate && (
          <Button variant="primary" onClick={onCreate}>
            {onCreateLabel}
          </Button>
        )}
      </div>

      <div className="filters-bar">
        {filters?.search !== undefined && (
          <Input
            label="Search"
            placeholder="Search by name..."
            fullWidth
            value={filters.search}
            onChange={(e) => handleFilterChange('search', e.target.value)}
          />
        )}

        {filters?.namespace !== undefined && (
          <Input
            label="Namespace"
            placeholder="Filter by namespace..."
            fullWidth
            value={filters.namespace}
            onChange={(e) => handleFilterChange('namespace', e.target.value)}
          />
        )}

        {filters?.status !== undefined && (
          <Select
            label="Status"
            value={filters.status}
            onChange={(value) => handleFilterChange('status', value)}
            options={[
              { value: '', label: 'All' },
              { value: 'Running', label: 'Running' },
              { value: 'Pending', label: 'Pending' },
              { value: 'Failed', label: 'Failed' },
            ]}
          />
        )}

        {filters && (
          <Button variant="secondary" onClick={() => onFilterChange?.({ search: '', namespace: '', status: '' })}>
            Clear
          </Button>
        )}
      </div>

      <TableStyles />
      <Table
        data={data?.items || []}
        columns={columns}
        onSort={handleSort}
        defaultSort={sortConfig}
        onRowClick={onRowClick}
        loading={isLoading}
        emptyMessage={`No ${title.toLowerCase()} found matching your filters`}
      />

      <style>{`
        .resource-list-page {
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

        .error-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 48px;
          gap: 16px;
        }

        .error-message {
          color: #b91c1c;
          font-size: 16px;
          text-align: center;
        }
      `}</style>
    </div>
  );
}
