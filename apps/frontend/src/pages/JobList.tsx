import { useState } from 'react';
import { getJobs } from '@api/workload';
import { useApiQuery } from '@hooks/useApi';
import { Button } from '@components/Button';
import { Input } from '@components/Input';
import { Spinner } from '@components/Spinner';
import { Table, TableStyles } from '@components/Table';
import { Badge } from '@components/Badge';


interface Job {
  name: string;
  namespace: string;
  status: string;
  active: number;
  succeeded: number;
  failed: number;
}

export default function JobList() {
  const [page, setPage] = useState(1);
  const [limit] = useState(20);
  const [namespace, setNamespace] = useState('');
  const [search, setSearch] = useState('');

  const { data: jobsData, isLoading, error } = useApiQuery(
    ['jobs', page, limit, namespace, search],
    () => getJobs({ page, limit, namespace: namespace || undefined, search: search || undefined }),
    {},
  );

  const jobs = jobsData?.items || [];
  const total = jobsData?.total || 0;

  const columns = [
    { key: 'name' as keyof Job, header: 'Name', render: (value: unknown) => <span>{(value as string)}</span> },
    {
      key: 'namespace' as keyof Job,
      header: 'Namespace',
      render: (value: unknown) => (
        <span className="namespace-badge">{value as string}</span>
      ),
    },
    {
      key: 'status' as keyof Job,
      header: 'Status',
      render: (value: unknown) => {
        const typedValue = value as string;
        const statusMap: Record<string, 'Running' | 'Succeeded' | 'Failed' | 'Pending'> = {
          'Active': 'Running',
          'Complete': 'Succeeded',
          'Failed': 'Failed',
          'Pending': 'Pending',
        };
        const status = statusMap[typedValue] || 'Pending';
        return <Badge status={status} label={typedValue} />;
      },
    },
    { key: 'active' as keyof Job, header: 'Active', render: (value: unknown) => <span>{(value as number) || '-'}</span> },
    { key: 'succeeded' as keyof Job, header: 'Succeeded', render: (value: unknown) => <span>{(value as number) || 0}</span> },
    { key: 'failed' as keyof Job, header: 'Failed', render: (value: unknown) => <span>{(value as number) || 0}</span> },
  ];

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const handleNamespaceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNamespace(e.target.value);
    setPage(1);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const totalPages = Math.ceil(total / limit);

  return (
    <>
      <div className="job-list">
        <TableStyles />
        <div className="page-header">
          <div>
            <h1>Jobs</h1>
            <p>Manage Kubernetes jobs for batch processing</p>
          </div>
          <div className="header-actions">
            <Button variant="primary">
              Create Job
            </Button>
          </div>
        </div>

        <div className="filters">
          <Input
            placeholder="Search jobs..."
            value={search}
            onChange={handleSearchChange}
            fullWidth
          />
          <Input
            placeholder="Filter by namespace..."
            value={namespace}
            onChange={handleNamespaceChange}
            fullWidth
          />
        </div>

        {isLoading ? (
          <div className="loading-container">
            <Spinner />
            <p>Loading jobs...</p>
          </div>
        ) : error ? (
          <div className="error-message">
            Error loading jobs: {(error as Error).message}
          </div>
        ) : jobs.length === 0 ? (
          <div className="empty-state">
            <p>No jobs found</p>
          </div>
        ) : (
          <div className="table-container">
            <Table
              data={jobs}
              columns={columns}
              emptyMessage="No jobs found"
            />
            {totalPages > 1 && (
              <div className="pagination">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => handlePageChange(page - 1)}
                  disabled={page === 1}
                >
                  Previous
                </Button>
                <span className="page-info">
                  Page {page} of {totalPages}
                </span>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => handlePageChange(page + 1)}
                  disabled={page === totalPages}
                >
                  Next
                </Button>
              </div>
            )}
          </div>
        )}
      </div>

      <style>{`
        .job-list {
          padding: 24px;
          max-width: 1400px;
          margin: 0 auto;
        }

        .page-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
          padding-bottom: 16px;
          border-bottom: 1px solid #e5e7eb;
        }

        .page-header h1 {
          margin: 0 0 8px 0;
          font-size: 28px;
          font-weight: 700;
          color: #111827;
        }

        .page-header p {
          margin: 0;
          font-size: 14px;
          color: #6b7280;
        }

        .header-actions {
          display: flex;
          gap: 12px;
        }

        .filters {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          margin-bottom: 24px;
        }

        .loading-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
          padding: 48px;
        }

        .loading-container p {
          margin: 0;
          font-size: 14px;
          color: #6b7280;
        }

        .error-message {
          padding: 16px;
          background: #fef2f2;
          border: 1px solid #fecaca;
          border-radius: 6px;
          color: #b91c1c;
        }

        .empty-state {
          padding: 48px;
          text-align: center;
          background: #f9fafb;
          border-radius: 8px;
        }

        .empty-state p {
          margin: 0;
          font-size: 14px;
          color: #6b7280;
        }

        .table-container {
          background: #ffffff;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          overflow: hidden;
        }

        .pagination {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 12px;
          padding: 16px;
          border-top: 1px solid #e5e7eb;
        }

        .page-info {
          font-size: 14px;
          color: #6b7280;
          font-weight: 500;
        }

        .namespace-badge {
          display: inline-block;
          padding: 2px 8px;
          background: #dbeafe;
          color: #1e40af;
          border-radius: 4px;
          font-size: 12px;
          font-weight: 500;
        }

        @media (max-width: 640px) {
          .filters {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </>
  );
}
