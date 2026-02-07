import React, { useState, useCallback, useMemo, ReactNode } from 'react';
import { Table, TableStyles } from '../Table';
import { Button, ButtonStyles } from '../Button';
import { decodeBase64, isBase64 } from '../../utils/secretCodec';

// Define Column interface locally as it's not exported from Table.tsx
interface Column<T> {
  key: keyof T;
  header: string;
  sortable?: boolean;
  render?: (value: unknown, row: T) => ReactNode;
}

// Assuming a Badge component exists for consistent styling
// If not, a simple span with styling will be used.
// For now, let's define a simple one if it doesn't exist.
const Badge = ({ children, type = 'default' }: { children: React.ReactNode; type?: 'default' | 'success' | 'info' | 'warning' | 'danger' }) => {
  const badgeClass = `badge badge-${type}`;
  return <span className={badgeClass}>{children}</span>;
};

const BadgeStyles = () => (
  <style>{`
    .badge {
      display: inline-flex;
      align-items: center;
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 12px;
      font-weight: 500;
      line-height: 1;
      white-space: nowrap;
    }
    .badge-default {
      background-color: #e5e7eb;
      color: #374151;
    }
    .badge-success {
      background-color: #d1fae5;
      color: #065f46;
    }
    .badge-info {
      background-color: #dbeafe;
      color: #1e40af;
    }
    .badge-warning {
      background-color: #fef3c7;
      color: #92400e;
    }
    .badge-danger {
      background-color: #fee2e2;
      color: #991b1b;
    }
  `}</style>
);


interface SecretDataPanelProps {
  data: { [key: string]: string };
  encoded?: boolean; // Indicates if the provided 'data' values are already Base64 encoded
}

interface SecretRow {
  key: string;
  value: string;
  decodedValue: string;
  isBase64Encoded: boolean;
}

export const SecretDataPanel: React.FC<SecretDataPanelProps> = ({ data, encoded = false }) => {
  const [showAllValues, setShowAllValues] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = useCallback((text: string, key: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2000); // Reset after 2 seconds
    }).catch(err => {
      console.error('Failed to copy text: ', err);
    });
  }, []);

  const secretRows: SecretRow[] = useMemo(() => {
    return Object.entries(data).map(([key, value]) => {
      let decodedValue = value;
      let isBase64Encoded = false;

      if (encoded || isBase64(value)) {
        try {
          decodedValue = decodeBase64(value);
          isBase64Encoded = true;
        } catch (e) {
          // If decoding fails, treat as plain text
          decodedValue = value;
          isBase64Encoded = false;
        }
      }

      return { key, value, decodedValue, isBase64Encoded };
    });
  }, [data, encoded]);

  const columns: Column<SecretRow>[] = useMemo(() => [
    {
      key: 'key',
      header: 'Key',
      sortable: true,
    },
    {
      key: 'value',
      header: 'Value',
      render: (_value, row: SecretRow) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontFamily: 'monospace', whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>
            {showAllValues ? row.decodedValue : '********'}
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleCopy(row.decodedValue, row.key)}
            title="Copy to clipboard"
          >
            {copiedKey === row.key ? 'Copied!' : 'Copy'}
          </Button>
        </div>
      ),
    },
    {
      key: 'isBase64Encoded',
      header: 'Encoded',
      render: (value: unknown) => {
        const isEncoded = value as boolean;
        return (
          <Badge type={isEncoded ? 'info' : 'default'}>
            {isEncoded ? 'Yes' : 'No'}
          </Badge>
        );
      },
    },
  ], [showAllValues, handleCopy, copiedKey]);

  return (
    <div className="secret-data-panel">
      <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'flex-end' }}>
        <Button onClick={() => setShowAllValues(prev => !prev)} variant="secondary">
          {showAllValues ? 'Hide Values' : 'Show Values'}
        </Button>
      </div>
      <Table<SecretRow> data={secretRows} columns={columns} />
      <TableStyles />
      <ButtonStyles />
      <BadgeStyles />
    </div>
  );
};
