import { useState } from 'react';
import { useApiQuery } from '../hooks/useApi';
import { getClusterEvents } from '../api/cluster';
import { Input } from '../components/Input';
import { Badge } from '../components/Badge';
import { Table, TableStyles } from '../components/Table';
import type { Event } from '../api';

type SeverityFilter = 'all' | 'Normal' | 'Warning' | 'Error';

export default function ClusterEvents() {
  const [severity, setSeverity] = useState<SeverityFilter>('all');
  const [limit, setLimit] = useState(50);
  const { data: events, isLoading } = useApiQuery(
    ['cluster', 'events', severity, limit],
    () => getClusterEvents({ severity: severity === 'all' ? undefined : severity, limit }),
  );

  const filteredEvents = severity === 'all' ? events : events?.filter((e) => e.type === severity);

  const columns = [
    {
      key: 'type' as keyof Event,
      header: 'Severity',
      sortable: true,
      render: (value: string) => {
        return (
          <Badge status={value}>
            {value}
          </Badge>
        );
      },
    },
    {
      key: 'lastTimestamp' as keyof Event,
      header: 'Time',
      sortable: true,
      render: (value: number) => new Date(value * 1000).toLocaleString(),
    },
    {
      key: 'count' as keyof Event,
      header: 'Count',
      sortable: true,
    },
    {
      key: 'reason' as keyof Event,
      header: 'Reason',
      sortable: true,
    },
    {
      key: 'message' as keyof Event,
      header: 'Message',
      sortable: true,
      render: (value: string) => (
        <div className="event-message" title={value}>
          {value}
        </div>
      ),
    },
    {
      key: 'source' as keyof Event,
      header: 'Source',
      sortable: true,
    },
  ];

  const severityCounts = {
    all: events?.length || 0,
    Normal: events?.filter((e) => e.type === 'Normal').length || 0,
    Warning: events?.filter((e) => e.type === 'Warning').length || 0,
    Error: events?.filter((e) => e.type === 'Error').length || 0,
  };

  return (
    <div className="cluster-events">
      <div className="events-header">
        <h1>Cluster Events</h1>
        <div className="events-filters">
          <div className="severity-tabs">
            {(['all', 'Normal', 'Warning', 'Error'] as SeverityFilter[]).map((s) => (
              <button
                key={s}
                className={`severity-tab ${severity === s ? 'active' : ''}`}
                onClick={() => setSeverity(s)}
              >
                {s.charAt(0).toUpperCase() + s.slice(1)}
                <span className="count-badge">{severityCounts[s]}</span>
              </button>
            ))}
          </div>
          <Input
            type="number"
            label="Limit"
            value={limit.toString()}
            onChange={(e) => setLimit(Number(e.target.value))}
            min={1}
            max={500}
            style={{ width: '120px' }}
          />
        </div>
      </div>

      <TableStyles />
      <Table
        data={filteredEvents || []}
        columns={columns}
        loading={isLoading}
        emptyMessage="No events found"
        defaultSort={{ key: 'lastTimestamp' as keyof Event, order: 'desc' }}
      />

      <style>{`
        .cluster-events {
          padding: 32px;
        }

        .events-header {
          display: flex;
          flex-direction: column;
          gap: 24px;
          margin-bottom: 24px;
        }

        .events-header h1 {
          font-size: 28px;
          font-weight: 700;
          margin: 0;
          color: #111827;
        }

        .events-filters {
          display: flex;
          gap: 16px;
          align-items: center;
          flex-wrap: wrap;
        }

        .severity-tabs {
          display: flex;
          gap: 4px;
        }

        .severity-tab {
          padding: 10px 20px;
          border: 1px solid #d1d5db;
          background: white;
          border-radius: 6px;
          cursor: pointer;
          font-size: 14px;
          font-weight: 500;
          color: #374151;
          transition: all 0.2s;
        }

        .severity-tab:hover {
          background: #f9fafb;
        }

        .severity-tab.active {
          background: #3b82f6;
          color: white;
          border-color: #3b82f6;
        }

        .count-badge {
          margin-left: 8px;
          padding: 2px 8px;
          background: rgba(0, 0, 0, 0.2);
          border-radius: 12px;
          font-size: 12px;
        }

        .event-message {
          max-width: 400px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      `}</style>
    </div>
  );
}
