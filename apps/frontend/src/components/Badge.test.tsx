import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@/test/test-utils';
import userEvent from '@testing-library/user-event';
import { Badge } from '@/components/Badge';

describe('Badge Component', () => {
  it('renders with default size', () => {
    render(<Badge status="Running" />);
    const badge = screen.getByText('Running');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass('badge', 'badge-md');
  });

  it('renders with small size', () => {
    render(<Badge status="Running" size="sm" />);
    const badge = screen.getByText('Running');
    expect(badge).toHaveClass('badge', 'badge-sm');
  });

  it('renders with large size', () => {
    render(<Badge status="Running" size="lg" />);
    const badge = screen.getByText('Running');
    expect(badge).toHaveClass('badge', 'badge-lg');
  });

  it('renders with custom className', () => {
    render(<Badge status="Running" className="custom-class" />);
    const badge = screen.getByText('Running');
    expect(badge).toHaveClass('badge', 'custom-class');
  });

  it('applies correct color for known status', () => {
    const { rerender } = render(<Badge status="Running" />);
    const badge = screen.getByText('Running');
    expect(badge).toHaveStyle({ backgroundColor: '#10b981' });

    rerender(<Badge status="Failed" />);
    expect(badge).toHaveStyle({ backgroundColor: '#ef4444' });
  });

  it('applies default color for unknown status', () => {
    render(<Badge status="Unknown" />);
    const badge = screen.getByText('Unknown');
    expect(badge).toHaveStyle({ backgroundColor: '#6b7280' });
  });
});
