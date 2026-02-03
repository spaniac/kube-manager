import { useEffect, ReactNode } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showCloseButton?: boolean;
}

export function Modal({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
  showCloseButton = true,
}: ModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  const modalClassName = `modal modal-${size}`;

  return (
    <div className={modalClassName}>
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <h2>{title}</h2>
            {showCloseButton && (
              <button className="modal-close" onClick={onClose} type="button">
                ×
              </button>
            )}
          </div>
          <div className="modal-body">{children}</div>
        </div>
      </div>
    </div>
  );
}

export function ModalStyles() {
  return (
    <style>{`
      .modal {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
        padding: 24px;
      }

      .modal-overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.5);
        backdrop-filter: blur(4px);
      }

      .modal-content {
        position: relative;
        background: white;
        border-radius: 12px;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        max-height: calc(100vh - 48px);
        display: flex;
        flex-direction: column;
        overflow: hidden;
      }

      .modal-sm {
        width: 100%;
        max-width: 400px;
      }

      .modal-md {
        width: 100%;
        max-width: 600px;
      }

      .modal-lg {
        width: 100%;
        max-width: 800px;
      }

      .modal-xl {
        width: 100%;
        max-width: 1200px;
      }

      .modal-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 24px;
        border-bottom: 1px solid #e5e7eb;
      }

      .modal-header h2 {
        margin: 0;
        font-size: 20px;
        font-weight: 600;
        color: #111827;
      }

      .modal-close {
        background: transparent;
        border: none;
        font-size: 28px;
        color: #6b7280;
        cursor: pointer;
        padding: 0;
        width: 32px;
        height: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 6px;
      }

      .modal-close:hover {
        background: #f3f4f6;
      }

      .modal-body {
        padding: 24px;
        overflow-y: auto;
        flex: 1;
      }
    `}</style>
  );
}
