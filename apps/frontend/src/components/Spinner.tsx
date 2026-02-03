export function Spinner({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  return (
    <div className={`spinner spinner-${size}`}>
      <div className="spinner-circle"></div>
    </div>
  );
}

export function Loading({ message }: { message?: string }) {
  return (
    <div className="loading-container">
      <Spinner />
      {message && <p className="loading-message">{message}</p>}
    </div>
  );
}

export function LoadingStyles() {
  return (
    <style>{`
      .loading-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 16px;
        padding: 40px;
      }

      .loading-message {
        font-size: 14px;
        color: #6b7280;
      }

      .spinner {
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .spinner-circle {
        width: var(--size, 32px);
        height: var(--size, 32px);
        border: 3px solid #e5e7eb;
        border-top-color: #3b82f6;
        border-radius: 50%;
        animation: spin 0.6s linear infinite;
      }

      .spinner-sm {
        --size: 20px;
      }

      .spinner-md {
        --size: 32px;
      }

      .spinner-lg {
        --size: 48px;
      }

      @keyframes spin {
        to { transform: rotate(360deg); }
      }
    `}</style>
  );
}
