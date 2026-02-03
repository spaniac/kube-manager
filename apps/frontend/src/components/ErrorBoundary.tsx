import { Component, ErrorInfo, ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(
    error: Error,
  ): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('ErrorBoundary caught an error:', error, errorInfo);

    this.props.onError?.(error, errorInfo);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="error-boundary">
            <h1>Something went wrong</h1>
            <p>An unexpected error occurred</p>
            <button
              onClick={() => window.location.reload()}
              className="error-boundary-button"
              type="button"
            >
              Reload Page
            </button>
          </div>
        )
      );
    }

    return this.props.children;
  }
}

export function ErrorBoundaryStyles() {
  return (
    <style>{`
      .error-boundary {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        min-height: 400px;
        padding: 40px;
        text-align: center;
      }

      .error-boundary h1 {
        font-size: 24px;
        font-weight: 600;
        margin: 0 0 16px 0;
        color: #111827;
      }

      .error-boundary p {
        font-size: 15px;
        color: #6b7280;
        margin: 0 0 24px 0;
      }

      .error-boundary-button {
        padding: 10px 20px;
        background: #3b82f6;
        color: white;
        border: none;
        border-radius: 6px;
        font-size: 15px;
        font-weight: 500;
        cursor: pointer;
      }

      .error-boundary-button:hover {
        background: #2563eb;
      }
    `}</style>
  );
}
