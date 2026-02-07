import type { ReactNode } from 'react';
import { getAlertHistory } from '@api/alert';
import { useApiQuery } from '@hooks/useApi';
import type { Alert } from '../../types/api';
import { Badge } from '../Badge';
import { Button } from '../Button';
import { Table, TableStyles } from '../Table';
import { AlertSeverityBadge } from './AlertSeverityBadge';

type AlertTableColumn<T> = {
  key: keyof T;
  header: string;
  sortable?: boolean;
  render?: (value: unknown, row: T) => ReactNode;
};

export const ALERT_LIST_COLUMN = {
  SEVERITY: 'severity',
  TRIGGERED_AT: 'timestamp',
  NAMESPACE: 'namespace',
  RESOURCE: 'resourceName',
  METRIC: 'metricType',
  STATUS: 'acknowledged',
  MESSAGE: 'message',
  ACTION: 'id',
} as const;

export type AlertListColumnKey = (typeof ALERT_LIST_COLUMN)[keyof typeof ALERT_LIST_COLUMN];

type SeverityFilter = 'ALL' | 'CRITICAL' | 'WARNING' | 'INFO';
type AcknowledgedFilter = 'ALL' | 'TRUE' | 'FALSE';

interface AlertListTableProps {
  alerts?: Alert[];
  loading?: boolean;
  error?: unknown;
  namespace?: string;
  severity?: SeverityFilter;
  acknowledged?: AcknowledgedFilter;
  page?: number;
  size?: number;
  acknowledgingAlertId?: number;
  onAcknowledge: (alertId: number) => void;
}

const ALERT_LIST_COLUMNS: AlertTableColumn<Alert>[] = [
  {
    key: ALERT_LIST_COLUMN.SEVERITY,
    header: 'Severity',
    sortable: true,
    render: (value: unknown) => <AlertSeverityBadge severity={String(value)} />,
  },
  {
    key: ALERT_LIST_COLUMN.TRIGGERED_AT,
    header: 'Triggered At',
    sortable: true,
    render: (value: unknown) => {
      const date = new Date(String(value));
      if (Number.isNaN(date.getTime())) {
        return '-';
      }
      return date.toLocaleString();
    },
  },
  {
    key: ALERT_LIST_COLUMN.NAMESPACE,
    header: 'Namespace',
    sortable: true,
  },
  {
    key: ALERT_LIST_COLUMN.RESOURCE,
    header: 'Resource',
    sortable: true,
  },
  {
    key: ALERT_LIST_COLUMN.METRIC,
    header: 'Metric',
    sortable: true,
  },
  {
    key: ALERT_LIST_COLUMN.STATUS,
    header: 'Status',
    sortable: true,
    render: (value: unknown, row: Alert) => {
      if (value === true) {
        const label = row.acknowledgedBy ? `Ack by ${row.acknowledgedBy}` : 'Acknowledged';
        return <Badge status="Running" label={label} size="sm" />;
      }

      return <Badge status="Pending" label="Open" size="sm" />;
    },
  },
  {
    key: ALERT_LIST_COLUMN.MESSAGE,
    header: 'Message',
    render: (value: unknown) => String(value),
  },
  {
    key: ALERT_LIST_COLUMN.ACTION,
    header: 'Action',
    render: (_value: unknown) => null,
  },
];

function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }

  return 'Unknown error';
}

function buildColumns(
  onAcknowledge: (alertId: number) => void,
  acknowledgingAlertId?: number,
): AlertTableColumn<Alert>[] {
  return ALERT_LIST_COLUMNS.map((column) => {
    if (column.key !== ALERT_LIST_COLUMN.ACTION) {
      return column;
    }

    return {
      ...column,
      render: (_value: unknown, row: Alert) => (
        <Button
          size="sm"
          variant={row.acknowledged ? 'ghost' : 'primary'}
          disabled={row.acknowledged}
          loading={acknowledgingAlertId === row.id}
          onClick={() => onAcknowledge(row.id)}
        >
          {row.acknowledged ? 'Acknowledged' : 'Acknowledge'}
        </Button>
      ),
    };
  });
}

export function AlertListTable({
  alerts,
  loading,
  error,
  namespace,
  severity = 'ALL',
  acknowledged = 'ALL',
  page = 0,
  size = 20,
  acknowledgingAlertId,
  onAcknowledge,
}: AlertListTableProps) {
  const shouldFetchInternally = alerts === undefined;
  const historyQuery = useApiQuery(
    ['alerts', 'history', namespace, severity, acknowledged, page, size],
    () =>
      getAlertHistory({
        namespace: namespace || undefined,
        severity: severity === 'ALL' ? undefined : severity,
        acknowledged: acknowledged === 'ALL' ? undefined : acknowledged === 'TRUE',
        page,
        size,
      }),
    {
      enabled: shouldFetchInternally,
    },
  );

  const resolvedAlerts = shouldFetchInternally ? (historyQuery.data?.alerts ?? []) : (alerts ?? []);
  const resolvedLoading = shouldFetchInternally ? historyQuery.isLoading : (loading ?? false);
  const resolvedError = error ?? historyQuery.error;
  const columns = buildColumns(onAcknowledge, acknowledgingAlertId);

  return (
    <>
      <TableStyles />
      {resolvedError ? (
        <div className="table-error">Failed to load alerts: {getErrorMessage(resolvedError)}</div>
      ) : (
        <Table data={resolvedAlerts} columns={columns} loading={resolvedLoading} emptyMessage="No alerts found" />
      )}
    </>
  );
}
