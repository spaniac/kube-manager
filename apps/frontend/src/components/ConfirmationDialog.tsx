import { Modal } from './Modal';

interface ConfirmationDialogProps {
  isOpen?: boolean;
  onClose?: () => void;
  onCancel?: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  type?: 'danger' | 'warning' | 'info';
  variant?: 'danger' | 'warning' | 'info';
  isLoading?: boolean;
}

export function ConfirmationDialog({
  isOpen = true,
  onClose,
  onCancel,
  onConfirm,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  type,
  variant,
  isLoading = false,
}: ConfirmationDialogProps) {
  const effectiveOnClose = onClose || onCancel || (() => {});
  const effectiveType = type || variant || 'danger';

  const handleConfirm = () => {
    onConfirm();
    effectiveOnClose();
  };

  const dialogClassName = `confirmation-dialog confirmation-dialog-${effectiveType}`;

  return (
    <Modal
      isOpen={isOpen}
      onClose={effectiveOnClose}
      title={title}
      size="sm"
    >
      <div className={dialogClassName}>
        <p className="confirmation-message">{message}</p>
        <div className="confirmation-actions">
          <button
            onClick={onClose}
            disabled={isLoading}
            className="confirmation-cancel"
            type="button"
          >
            {cancelText}
          </button>
          <button
            onClick={handleConfirm}
            disabled={isLoading}
            className="confirmation-confirm"
            type="button"
          >
            {isLoading ? 'Confirming...' : confirmText}
          </button>
        </div>
      </div>
    </Modal>
  );
}

export function ConfirmationDialogStyles() {
  return (
    <style>{`
      .confirmation-dialog {
        padding: 0;
      }

      .confirmation-message {
        font-size: 15px;
        color: #374151;
        margin: 0 0 24px 0;
        line-height: 1.5;
      }

      .confirmation-actions {
        display: flex;
        justify-content: flex-end;
        gap: 12px;
        padding: 24px;
        border-top: 1px solid #e5e7eb;
        margin-top: 0;
      }

      .confirmation-cancel {
        padding: 10px 20px;
        background: #6b7280;
        color: white;
        border: none;
        border-radius: 6px;
        font-size: 15px;
        font-weight: 500;
        cursor: pointer;
      }

      .confirmation-cancel:hover:not(:disabled) {
        background: #4b5563;
      }

      .confirmation-cancel:disabled {
        opacity: 0.6;
        cursor: not-allowed;
      }

      .confirmation-confirm {
        padding: 10px 20px;
        background: #dc2626;
        color: white;
        border: none;
        border-radius: 6px;
        font-size: 15px;
        font-weight: 500;
        cursor: pointer;
      }

      .confirmation-confirm:hover:not(:disabled) {
        background: #b91c1c;
      }

      .confirmation-confirm:disabled {
        opacity: 0.6;
        cursor: not-allowed;
      }

      .confirmation-dialog-warning .confirmation-confirm {
        background: #f59e0b;
      }

      .confirmation-dialog-warning .confirmation-confirm:hover:not(:disabled) {
        background: #d97706;
      }

      .confirmation-dialog-info .confirmation-confirm {
        background: #3b82f6;
      }

      .confirmation-dialog-info .confirmation-confirm:hover:not(:disabled) {
        background: #2563eb;
      }
    `}</style>
  );
}
