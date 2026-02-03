import { useState, useMemo, ReactNode } from 'react';

interface Column<T> {
  key: keyof T;
  header: string;
  sortable?: boolean;
  render?: (value: unknown, row: T) => ReactNode;
}

interface TableProps<T> {
  data: T[];
  columns: Column<T>[];
  onSort?: (key: keyof T, order: 'asc' | 'desc') => void;
  onRowClick?: (row: T) => void;
  defaultSort?: { key: keyof T; order: 'asc' | 'desc' };
  loading?: boolean;
  emptyMessage?: string;
}

export function Table<T extends Record<string, unknown>>({
  data,
  columns,
  onSort,
  onRowClick,
  defaultSort,
  loading = false,
  emptyMessage = 'No data available',
}: TableProps<T>) {
  const [sort, setSort] = useState<{ key: keyof T; order: 'asc' | 'desc' }>(
    defaultSort || (columns.length > 0 ? { key: columns[0].key, order: 'asc' } : { key: '' as keyof T, order: 'asc' }),
  );

  const sortedData = useMemo(() => {
    if (!sort.key || !onSort) {
      return data;
    }

    return [...data].sort((a, b) => {
      const aValue = a[sort.key];
      const bValue = b[sort.key];

      if (aValue < bValue) {
        return sort.order === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sort.order === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [data, sort, onSort]);

  const handleSort = (key: keyof T) => {
    if (!onSort) return;

    const newOrder =
      sort.key === key && sort.order === 'asc' ? 'desc' : 'asc';
    setSort({ key, order: newOrder });
    onSort(key, newOrder);
  };

  const renderCell = (row: T, column: Column<T>) => {
    const value = row[column.key];

    if (column.render) {
      return column.render(value, row);
    }

    return value != null ? String(value) : '';
  };

  return (
    <div className="table-container">
      <table className="table">
        <thead>
          <tr>
            {columns.map((column) => (
              <th
                key={String(column.key)}
                onClick={() => handleSort(column.key)}
                className={
                  column.sortable ? 'table-header table-header-sortable' : 'table-header'
                }
              >
                {column.header}
                {column.sortable && sort.key === column.key && (
                  <span className="sort-indicator">{sort.order === 'asc' ? '↑' : '↓'}</span>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={columns.length} className="table-loading">
                <div className="table-spinner"></div>
              </td>
            </tr>
          ) : sortedData.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="table-empty">
                {emptyMessage}
              </td>
            </tr>
          ) : (
            sortedData.map((row, index) => (
              <tr
                key={index}
                onClick={() => onRowClick?.(row)}
                className={onRowClick ? 'table-row table-row-clickable' : 'table-row'}
              >
                {columns.map((column) => (
                  <td key={String(column.key)}>
                    {renderCell(row, column)}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export function TableStyles() {
  return (
    <style>{`
      .table-container {
        overflow-x: auto;
        border: 1px solid #e5e7eb;
        border-radius: 8px;
        background: white;
      }

      .table {
        width: 100%;
        border-collapse: collapse;
      }

      .table-header {
        background: #f9fafb;
        font-size: 13px;
        font-weight: 600;
        color: #374151;
        text-align: left;
        padding: 12px 16px;
        border-bottom: 2px solid #e5e7eb;
        white-space: nowrap;
      }

      .table-header-sortable {
        cursor: pointer;
        user-select: none;
        transition: background 0.2s;
      }

      .table-header-sortable:hover {
        background: #f3f4f6;
      }

      .sort-indicator {
        margin-left: 8px;
        font-size: 12px;
        color: #6b7280;
      }

      .table-row {
        border-bottom: 1px solid #e5e7eb;
        transition: background 0.2s;
      }

      .table-row:hover {
        background: #f9fafb;
      }

      .table-row-clickable {
        cursor: pointer;
      }

      .table-row td {
        padding: 12px 16px;
        font-size: 14px;
        color: #374151;
      }

      .table-loading,
      .table-empty {
        padding: 48px;
        text-align: center;
        color: #6b7280;
      }

      .table-spinner {
        width: 32px;
        height: 32px;
        margin: 0 auto;
        border: 3px solid #e5e7eb;
        border-top-color: #3b82f6;
        border-radius: 50%;
        animation: spin 0.6s linear infinite;
      }

      @keyframes spin {
        to { transform: rotate(360deg); }
      }
    `}</style>
  );
}
