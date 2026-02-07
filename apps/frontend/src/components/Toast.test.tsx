import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ToastProvider, useToast } from '@/components/Toast';

function TestComponent({ children }: { children: React.ReactNode }) {
  const { showToast } = useToast();
  return <>{children}</>;
}

describe('Toast Component', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  it('useToast hook throws error when used outside provider', () => {
    expect(() => useToast()).toThrow('useToast must be used within ToastProvider');
  });

  it('renders success toast', () => {
    function TestComponent() {
      const { showToast } = useToast();
      showToast({ message: 'Success', type: 'success' });
      return null;
    }

    render(
      <ToastProvider>
        <TestComponent />
      </ToastProvider>
    );

    expect(screen.getByText('Success')).toBeInTheDocument();
    expect(screen.getByText('✓')).toBeInTheDocument();
  });

  it('renders error toast', () => {
    function TestComponent() {
      const { showToast } = useToast();
      showToast({ message: 'Error occurred', type: 'error' });
      return null;
    }

    render(
      <ToastProvider>
        <TestComponent />
      </ToastProvider>
    );

    expect(screen.getByText('Error occurred')).toBeInTheDocument();
    expect(screen.getByText('✕')).toBeInTheDocument();
  });

  it('renders info toast', () => {
    function TestComponent() {
      const { showToast } = useToast();
      showToast({ message: 'Information', type: 'info' });
      return null;
    }

    render(
      <ToastProvider>
        <TestComponent />
      </ToastProvider>
    );

    expect(screen.getByText('Information')).toBeInTheDocument();
    expect(screen.getByText('ℹ')).toBeInTheDocument();
  });

  it('renders warning toast', () => {
    function TestComponent() {
      const { showToast } = useToast();
      showToast({ message: 'Warning', type: 'warning' });
      return null;
    }

    render(
      <ToastProvider>
        <TestComponent />
      </ToastProvider>
    );

    expect(screen.getByText('Warning')).toBeInTheDocument();
    expect(screen.getByText('⚠')).toBeInTheDocument();
  });

  it('auto-dismisses after duration', () => {
    function TestComponent() {
      const { showToast } = useToast();
      showToast({ message: 'Success', type: 'success', duration: 100 });
      return null;
    }

    render(
      <ToastProvider>
        <TestComponent />
      </ToastProvider>
    );

    expect(screen.getByText('Success')).toBeInTheDocument();

    vi.advanceTimersByTime(110);

    expect(screen.queryByText('Success')).not.toBeInTheDocument();
  });

  it('calls onClose when toast is clicked', () => {
    const onClose = vi.fn();

    function TestComponent() {
      const { showToast } = useToast();
      showToast({ message: 'Success', type: 'success', onClose });
      return null;
    }

    render(
      <ToastProvider>
        <TestComponent />
      </ToastProvider>
    );

    const toast = screen.getByText('Success').closest('.toast');
    if (toast) fireEvent.click(toast);
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
