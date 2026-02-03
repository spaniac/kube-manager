import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@/test/test-utils';
import { Spinner, Loading } from '@/components/Spinner';

describe('Spinner Component', () => {
  it('renders with default size (md)', () => {
    const { container } = render(<Spinner />);
    const spinner = container.querySelector('.spinner-md');
    const spinnerCircle = container.querySelector('.spinner-circle');
    expect(spinner).toBeInTheDocument();
    expect(spinnerCircle).toBeInTheDocument();
  });

  it('renders with small size', () => {
    const { container } = render(<Spinner size="sm" />);
    const spinner = container.querySelector('.spinner-sm');
    expect(spinner).toBeInTheDocument();
  });

  it('renders with large size', () => {
    const { container } = render(<Spinner size="lg" />);
    const spinner = container.querySelector('.spinner-lg');
    expect(spinner).toBeInTheDocument();
  });
});

describe('Loading Component', () => {
  it('renders Spinner by default', () => {
    const { container } = render(<Loading />);
    const spinner = container.querySelector('.spinner');
    const message = container.querySelector('.loading-message');
    expect(spinner).toBeInTheDocument();
    expect(message).not.toBeInTheDocument();
  });

  it('renders with message', () => {
    const { container } = render(<Loading message="Loading data..." />);
    const message = container.querySelector('.loading-message');
    const spinner = container.querySelector('.spinner');
    expect(message).toBeInTheDocument();
    expect(spinner).toBeInTheDocument();
  });

  it('does not render message when not provided', () => {
    const { container } = render(<Loading />);
    const message = container.querySelector('.loading-message');
    const spinner = container.querySelector('.spinner');
    expect(message).not.toBeInTheDocument();
    expect(spinner).toBeInTheDocument();
  });
});
