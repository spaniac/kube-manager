import React, { useState, useEffect, ReactNode } from 'react';

interface ToastProps {
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
  duration?: number;
  onClose?: () => void;
}

interface ToastContextType {
  showToast: (props: ToastProps) => void;
}

const ToastContext = React.createContext<ToastContextType | null>(null);

const defaultDuration = 5000;

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<
    Array<ToastProps & { id: number }>
  >([]);

  const showToast = (props: ToastProps) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { ...props, id }]);
  };

  const removeToast = (id: number) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  useEffect(() => {
    toasts.forEach((toast) => {
      const timer = setTimeout(() => {
        removeToast(toast.id);
      }, toast.duration || defaultDuration);

      return () => clearTimeout(timer);
    });
  }, [toasts]);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="toast-container">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`toast toast-${toast.type}`}
            onClick={() => {
              toast.onClose?.();
              removeToast(toast.id);
            }}
          >
            <span className="toast-icon">{getIcon(toast.type)}</span>
            <span className="toast-message">{toast.message}</span>
            <button
              className="toast-close"
              onClick={() => removeToast(toast.id)}
              type="button"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = React.useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within ToastProvider');
  }
  return context;
}

function getIcon(type: ToastProps['type']): string {
  const icons: Record<ToastProps['type'], string> = {
    success: '✓',
    error: '✕',
    info: 'ℹ',
    warning: '⚠',
  };
  return icons[type];
}

export function ToastStyles() {
  return (
    <style>{`
      .toast-container {
        position: fixed;
        bottom: 24px;
        right: 24px;
        display: flex;
        flex-direction: column;
        gap: 12px;
        z-index: 2000;
      }

      .toast {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 12px 16px;
        background: white;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        min-width: 300px;
        animation: slideIn 0.3s ease;
        cursor: pointer;
      }

      @keyframes slideIn {
        from {
          transform: translateX(100%);
          opacity: 0;
        }
        to {
          transform: translateX(0);
          opacity: 1;
        }
      }

      .toast-success {
        border-left: 4px solid #10b981;
      }

      .toast-error {
        border-left: 4px solid #ef4444;
      }

      .toast-info {
        border-left: 4px solid #3b82f6;
      }

      .toast-warning {
        border-left: 4px solid #f59e0b;
      }

      .toast-icon {
        font-size: 18px;
      }

      .toast-message {
        flex: 1;
        font-size: 14px;
        color: #374151;
      }

      .toast-close {
        background: transparent;
        border: none;
        font-size: 20px;
        color: #6b7280;
        cursor: pointer;
        padding: 0;
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 4px;
      }

      .toast-close:hover {
        background: #f3f4f6;
      }
    `}</style>
  );
}
