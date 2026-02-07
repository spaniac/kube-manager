import { useState } from 'react';
import { useApiMutation, useApiQuery } from '@hooks/useApi';
import { acknowledgeAlert, getAlertHistory } from '@api/alert';
import { Input } from '@components/Input';
import { Select } from '@components/Select';
import { Button } from '@components/Button';
import { useToast } from '@components/Toast';
import { AlertListTable } from '@components/alerts/AlertListTable';

type SeverityFilter = 'ALL' | 'CRITICAL' | 'WARNING' | 'INFO';
type AcknowledgedFilter = 'ALL' | 'TRUE' | 'FALSE';

export default function AlertHistory() {
  const { showToast } = useToast();
  const [namespace, setNamespace] = useState('');
  const [severity, setSeverity] = useState<SeverityFilter>('ALL');
  const [acknowledged, setAcknowledged] = useState<AcknowledgedFilter>('ALL');
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(20);
  const [acknowledgingAlertId, setAcknowledgingAlertId] = useState<number | undefined>(undefined);

  const { data, isLoading, refetch } = useApiQuery(
    ['alerts', 'history', namespace, severity, acknowledged, page, size],
    () =>
      getAlertHistory({
        namespace: namespace || undefined,
        severity: severity === 'ALL' ? undefined : severity,
        acknowledged:
          acknowledged === 'ALL' ? undefined : acknowledged === 'TRUE',
        page,
        size,
      }),
  );

  const acknowledgeMutation = useApiMutation(
    async (alertId: number) => {
      setAcknowledgingAlertId(alertId);
      return acknowledgeAlert(alertId);
    },
    {
      onSuccess: () => {
        showToast({ message: 'Alert acknowledged', type: 'success' });
        refetch();
      },
      onError: (error) => {
        showToast({ message: error.message, type: 'error' });
      },
      onSettled: () => {
        setAcknowledgingAlertId(undefined);
      },
    },
  );

  const handleAcknowledge = (alertId: number) => {
    acknowledgeMutation.mutate(alertId);
  };

  const resetFilters = () => {
    setNamespace('');
    setSeverity('ALL');
    setAcknowledged('ALL');
    setPage(0);
    setSize(20);
  };

  const canGoPrevious = page > 0;
  const totalPages = data?.totalPages ?? 0;
  const canGoNext = page < Math.max(totalPages - 1, 0);

  return (
    <div className="alert-history-page">
      <div className="page-header">
        <h1>Alert History</h1>
      </div>

      <div className="filters-bar">
        <div className="filter-item filter-item-namespace">
          <Input
            label="Namespace"
            placeholder="All namespaces"
            value={namespace}
            onChange={(e) => {
              setNamespace(e.target.value);
              setPage(0);
            }}
          />
        </div>
        <div className="filter-item">
          <Select
            label="Severity"
            value={severity}
            onChange={(value) => {
              setSeverity(value as SeverityFilter);
              setPage(0);
            }}
            options={[
              { value: 'ALL', label: 'All' },
              { value: 'CRITICAL', label: 'Critical' },
              { value: 'WARNING', label: 'Warning' },
              { value: 'INFO', label: 'Info' },
            ]}
          />
        </div>
        <div className="filter-item">
          <Select
            label="Acknowledged"
            value={acknowledged}
            onChange={(value) => {
              setAcknowledged(value as AcknowledgedFilter);
              setPage(0);
            }}
            options={[
              { value: 'ALL', label: 'All' },
              { value: 'TRUE', label: 'Acknowledged' },
              { value: 'FALSE', label: 'Open' },
            ]}
          />
        </div>
        <div className="filter-item filter-item-size">
          <Input
            label="Page Size"
            type="number"
            min={1}
            max={100}
            value={String(size)}
            onChange={(e) => {
              const parsed = Number(e.target.value);
              if (!Number.isNaN(parsed) && parsed > 0) {
                setSize(parsed);
                setPage(0);
              }
            }}
          />
        </div>
        <div className="filter-actions">
          <Button variant="ghost" onClick={resetFilters}>
            Reset
          </Button>
        </div>
      </div>

      <AlertListTable
        alerts={data?.alerts ?? []}
        loading={isLoading}
        onAcknowledge={handleAcknowledge}
        acknowledgingAlertId={acknowledgingAlertId}
      />

      <div className="pagination-bar">
        <span className="pagination-meta">
          Page {totalPages === 0 ? 0 : page + 1} of {totalPages}
        </span>
        <div className="pagination-actions">
          <Button
            variant="ghost"
            disabled={!canGoPrevious}
            onClick={() => setPage((current) => Math.max(0, current - 1))}
          >
            Previous
          </Button>
          <Button
            variant="ghost"
            disabled={!canGoNext}
            onClick={() => setPage((current) => current + 1)}
          >
            Next
          </Button>
        </div>
      </div>

      <style>{`
        .alert-history-page {
          padding: 24px;
          max-width: 1400px;
          margin: 0 auto;
        }

        .page-header {
          margin-bottom: 20px;
        }

        .page-header h1 {
          margin: 0;
          font-size: 28px;
          color: #111827;
        }

        .filters-bar {
          display: flex;
          align-items: flex-end;
          gap: 12px;
          flex-wrap: wrap;
          margin-bottom: 20px;
          padding: 16px;
          border: 1px solid #e5e7eb;
          background: #f9fafb;
          border-radius: 8px;
        }

        .filter-item {
          min-width: 180px;
        }

        .filter-item-namespace {
          min-width: 240px;
          flex: 1;
        }

        .filter-item-size {
          width: 120px;
        }

        .filter-actions {
          margin-left: auto;
        }

        .pagination-bar {
          margin-top: 16px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .pagination-meta {
          font-size: 14px;
          color: #4b5563;
        }

        .pagination-actions {
          display: flex;
          gap: 8px;
        }

        @media (max-width: 768px) {
          .alert-history-page {
            padding: 16px;
          }

          .filter-actions {
            margin-left: 0;
            width: 100%;
          }

          .pagination-bar {
            flex-direction: column;
            align-items: stretch;
            gap: 12px;
          }

          .pagination-actions {
            justify-content: flex-end;
          }
        }
      `}</style>
    </div>
  );
}
