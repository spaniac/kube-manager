import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApiQuery } from '@hooks/useApi';
import { getNodes } from '@api/cluster';
import { Table, TableStyles } from '@components/Table';
import { Badge } from '@components/Badge';
import { Input } from '@components/Input';
import type { Node } from '../api';

export default function NodeList() {
  const navigate = useNavigate();
  const { data: nodes, isLoading } = useApiQuery(['nodes'], getNodes);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredNodes = useMemo(() => {
    if (!nodes) return [];
    if (!searchQuery.trim()) return nodes;

    const query = searchQuery.toLowerCase();
    return nodes.filter(
      (node) =>
        node.name.toLowerCase().includes(query) ||
        node.status.toLowerCase().includes(query) ||
        node.roles.some((role) => role.toLowerCase().includes(query)),
    );
  }, [nodes, searchQuery]);

  const handleRowClick = (node: Node) => {
    navigate(`/cluster/nodes/${node.name}`);
  };

  const columns = [
    {
      key: 'name' as keyof Node,
      header: 'Name',
      sortable: true,
    },
    {
      key: 'status' as keyof Node,
      header: 'Status',
      sortable: true,
      render: (value: string) => <Badge status={value} />,
    },
    {
      key: 'roles' as keyof Node,
      header: 'Roles',
      sortable: true,
      render: (value: string[]) => value.join(', ') || '-',
    },
    {
      key: 'capacity' as keyof Node,
      header: 'CPU Capacity',
      sortable: true,
      render: (value: any) => value?.cpu || '-',
    },
    {
      key: 'capacity' as keyof Node,
      header: 'Memory Capacity',
      sortable: true,
      render: (value: any) => value?.memory || '-',
    },
    {
      key: 'allocated' as keyof Node,
      header: 'CPU Allocated',
      sortable: true,
      render: (value: any) => value?.cpu || '-',
    },
    {
      key: 'allocated' as keyof Node,
      header: 'Memory Allocated',
      sortable: true,
      render: (value: any) => value?.memory || '-',
    },
    {
      key: 'creationTimestamp' as keyof Node,
      header: 'Age',
      sortable: true,
      render: (value: number) => {
        const days = Math.floor(Date.now() / 1000 - value) / 86400;
        if (days < 1) return '< 1d';
        if (days < 30) return `${Math.floor(days)}d`;
        const months = Math.floor(days / 30);
        return `${months}mo`;
      },
    },
  ];

  return (
    <div className="node-list">
      <div className="node-list-header">
        <h1>Nodes</h1>
        <Input
          placeholder="Search by name, status, or roles..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          fullWidth
        />
      </div>

      <TableStyles />
      <Table
        data={filteredNodes}
        columns={columns}
        loading={isLoading}
        onRowClick={handleRowClick}
        emptyMessage="No nodes found"
        defaultSort={{ key: 'name' as keyof Node, order: 'asc' }}
      />

      <style>{`
        .node-list {
          padding: 32px;
        }

        .node-list-header {
          display: flex;
          flex-direction: column;
          gap: 24px;
          margin-bottom: 24px;
        }

        .node-list-header h1 {
          font-size: 28px;
          font-weight: 700;
          margin: 0;
          color: #111827;
        }
      `}</style>
    </div>
  );
}
