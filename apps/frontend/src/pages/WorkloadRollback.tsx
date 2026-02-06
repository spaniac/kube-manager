import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getDeploymentRevisions, rollbackDeployment } from '@api/workload';
import { useApiQuery, useApiMutation } from '@hooks/useApi';
import { Button } from '@components/Button';
import { Modal } from '@components/Modal';
import { Spinner } from '@components/Spinner';
import { Badge } from '@components/Badge';
import { useToast } from '@components/Toast';

interface Revision {
  revision: number;
  annotations: Record<string, string>;
}

export default function WorkloadRollback() {
  const { namespace, name } = useParams<{ namespace: string; name: string }>();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [showRollbackModal, setShowRollbackModal] = useState(false);
  const [selectedRevision, setSelectedRevision] = useState<Revision | null>(null);
  const [selectedRevisionNumber, setSelectedRevisionNumber] = useState<number | undefined>();

  const { data: revisions, isLoading, error, refetch } = useApiQuery(
    ['deployment-revisions', namespace, name],
    () => (namespace && name ? getDeploymentRevisions(namespace, name) : Promise.reject(new Error('Missing params'))),
  );

  const rollbackMutation = useApiMutation(
    async (revision?: number) => {
      if (namespace && name) {
        return await rollbackDeployment(namespace, name, revision);
      }
    },
    {
      onSuccess: () => {
        showToast({ message: 'Deployment rolled back successfully', type: 'success' });
        refetch();
        setShowRollbackModal(false);
      },
      onError: (error) => {
        showToast({ message: `Failed to rollback deployment: ${(error as Error).message}`, type: 'error' });
      },
    },
  );

  const handleRollbackClick = (revision: Revision) => {
    setSelectedRevision(revision);
    setSelectedRevisionNumber(revision.revision);
    setShowRollbackModal(true);
  };

  const handleRollbackToPrevious = () => {
    if (revisions && revisions.length > 1) {
      const previousRevision = revisions[1];
      setSelectedRevision(previousRevision);
      setSelectedRevisionNumber(previousRevision.revision);
      setShowRollbackModal(true);
    }
  };

  const handleConfirmRollback = () => {
    rollbackMutation.mutate(selectedRevisionNumber);
  };

  const getImageFromRevision = (revision: Revision): string => {
    const changeCause = revision.annotations['kubectl.kubernetes.io/change-cause'];
    if (changeCause && changeCause.includes('image:')) {
      const match = changeCause.match(/image:\s*(\S+)/);
      return match ? match[1] : 'Unknown';
    }
    return 'Unknown';
  };

  const getChangeCause = (revision: Revision): string => {
    return revision.annotations['kubectl.kubernetes.io/change-cause'] || 'Manual update';
  };

  const getCreationTime = (revision: Revision): string => {
    const time = revision.annotations['deployment.kubernetes.io/revision'] || revision.revision.toString();
    return `Revision ${time}`;
  };

  if (error) {
    return (
      <div className="workload-rollback">
        <div className="error-message">Error loading revision history: {(error as Error).message}</div>
      </div>
    );
  }

  return (
    <>
      <div className="workload-rollback">
        <div className="page-header">
          <div>
            <h1>Rollback Deployment: {name}</h1>
            <span className="namespace-badge">{namespace}</span>
          </div>
          <div className="header-actions">
            <Button variant="secondary" onClick={() => navigate(-1)}>
              Cancel
            </Button>
            {revisions && revisions.length > 1 && (
              <Button variant="primary" onClick={handleRollbackToPrevious}>
                Rollback to Previous
              </Button>
            )}
          </div>
        </div>

        <div className="info-banner">
          <div className="info-icon">ℹ️</div>
          <div className="info-content">
            <strong>Rollback Information</strong>
            <p>Rolling back to a previous revision will create a new revision with the previous configuration. The deployment will be updated to match the selected revision's pod template.</p>
          </div>
        </div>

        {isLoading ? (
          <div className="loading-container">
            <Spinner />
            <p>Loading revision history...</p>
          </div>
        ) : (
          <div className="revisions-list">
            <h2>Revision History</h2>
            {!revisions || revisions.length === 0 ? (
              <div className="empty-state">
                <p>No revision history available</p>
              </div>
            ) : (
              <div className="revisions-container">
                {revisions.map((revision, index) => (
                  <div key={revision.revision} className={`revision-card ${index === 0 ? 'current' : ''}`}>
                    <div className="revision-header">
                      <div className="revision-info">
                        <div className="revision-number">
                          <span className="revision-label">Revision</span>
                          <span className="revision-value">{revision.revision}</span>
                          {index === 0 && <Badge status="Running" label="Current" />}
                        </div>
                        <div className="revision-meta">
                          <span className="meta-item">
                            <span className="meta-label">Image:</span>
                            <span className="meta-value">{getImageFromRevision(revision)}</span>
                          </span>
                        </div>
                      </div>
                      {index !== 0 && (
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => handleRollbackClick(revision)}
                          disabled={rollbackMutation.isLoading}
                        >
                          Rollback to this
                        </Button>
                      )}
                    </div>
                    <div className="revision-details">
                      <div className="detail-row">
                        <span className="detail-label">Change Cause:</span>
                        <span className="detail-value">{getChangeCause(revision)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      <Modal
        isOpen={showRollbackModal}
        onClose={() => setShowRollbackModal(false)}
        title={`Confirm Rollback: ${name}`}
        size="sm"
      >
        <div className="modal-content">
          <p>Are you sure you want to rollback this deployment?</p>
          {selectedRevision && (
            <div className="rollback-info">
              <div className="info-row">
                <span className="info-label">Revision:</span>
                <span className="info-value">{selectedRevision.revision}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Image:</span>
                <span className="info-value">{getImageFromRevision(selectedRevision)}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Change Cause:</span>
                <span className="info-value">{getChangeCause(selectedRevision)}</span>
              </div>
            </div>
          )}
          <div className="warning-banner">
            <strong>Warning:</strong> This will create a new deployment revision and may cause temporary downtime or service disruption.
          </div>
          <div className="modal-actions">
            <Button variant="secondary" onClick={() => setShowRollbackModal(false)}>
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={handleConfirmRollback}
              loading={rollbackMutation.isLoading}
            >
              Confirm Rollback
            </Button>
          </div>
        </div>
      </Modal>

      <style>{`
        .workload-rollback {
          padding: 24px;
          max-width: 1200px;
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

        .namespace-badge {
          display: inline-block;
          padding: 4px 12px;
          background: #eff6ff;
          color: #1e40af;
          border-radius: 999px;
          font-size: 12px;
          font-weight: 500;
        }

        .header-actions {
          display: flex;
          gap: 12px;
          align-items: center;
        }

        .info-banner {
          display: flex;
          gap: 16px;
          padding: 16px;
          background: #eff6ff;
          border: 1px solid #dbeafe;
          border-radius: 8px;
          margin-bottom: 24px;
        }

        .info-icon {
          font-size: 20px;
          flex-shrink: 0;
        }

        .info-content strong {
          display: block;
          margin-bottom: 4px;
          font-size: 14px;
          color: #1e40af;
        }

        .info-content p {
          margin: 0;
          font-size: 13px;
          color: #3b82f6;
          line-height: 1.5;
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

        .revisions-list h2 {
          margin: 0 0 24px 0;
          font-size: 24px;
          font-weight: 600;
          color: #111827;
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

        .revisions-container {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .revision-card {
          padding: 20px;
          background: #ffffff;
          border: 2px solid #e5e7eb;
          border-radius: 8px;
          transition: all 0.2s;
        }

        .revision-card:hover {
          border-color: #3b82f6;
          box-shadow: 0 2px 8px rgba(59, 130, 246, 0.1);
        }

        .revision-card.current {
          background: #f0fdf4;
          border-color: #22c55e;
        }

        .revision-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
        }

        .revision-info {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .revision-number {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .revision-label {
          font-size: 13px;
          color: #6b7280;
          font-weight: 500;
        }

        .revision-value {
          font-size: 20px;
          font-weight: 700;
          color: #111827;
        }

        .revision-meta {
          display: flex;
          gap: 24px;
        }

        .meta-item {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 13px;
        }

        .meta-label {
          color: #6b7280;
          font-weight: 500;
        }

        .meta-value {
          color: #111827;
          font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
        }

        .revision-details {
          padding-top: 16px;
          border-top: 1px solid #e5e7eb;
        }

        .detail-row {
          display: flex;
          align-items: baseline;
          gap: 8px;
          font-size: 13px;
        }

        .detail-label {
          color: #6b7280;
          font-weight: 500;
          flex-shrink: 0;
        }

        .detail-value {
          color: #374151;
          line-height: 1.5;
        }

        .modal-content {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .modal-content p {
          margin: 0;
          font-size: 14px;
          color: #374151;
        }

        .rollback-info {
          padding: 16px;
          background: #f9fafb;
          border-radius: 8px;
        }

        .info-row {
          display: flex;
          justify-content: space-between;
          padding: 8px 0;
          font-size: 13px;
        }

        .info-label {
          color: #6b7280;
          font-weight: 500;
        }

        .info-value {
          color: #111827;
          font-weight: 600;
        }

        .warning-banner {
          padding: 12px;
          background: #fef2f2;
          border: 1px solid #fecaca;
          border-radius: 6px;
          font-size: 13px;
          color: #991b1b;
        }

        .modal-actions {
          display: flex;
          gap: 12px;
          justify-content: flex-end;
          margin-top: 8px;
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
