import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen } from '@/test/test-utils';
import userEvent from '@testing-library/user-event';
import { Modal } from '@/components/Modal';

describe('Modal Component', () => {
  const mockOnClose = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    document.body.style.overflow = '';
  });

  afterEach(() => {
    mockOnClose.mockClear();
  });

  it('does not render when isOpen is false', () => {
    const { container } = render(
      <Modal isOpen={false} onClose={mockOnClose} title="Test Modal">
        <div>Modal Content</div>
      </Modal>
    );
    expect(container).toBeEmptyDOMElement();
  });

  it('renders when isOpen is true', () => {
    render(
      <Modal isOpen={true} onClose={mockOnClose} title="Test Modal">
        <div>Modal Content</div>
      </Modal>
    );

    expect(screen.getByRole('heading', { name: /Test Modal/i })).toBeInTheDocument();
    expect(screen.getByText('Modal Content')).toBeInTheDocument();
  });

  it('renders with default size (md)', () => {
    render(
      <Modal isOpen={true} onClose={mockOnClose} title="Test">
        <div>Content</div>
      </Modal>
    );

    const modal = screen.getByRole('heading', { name: /Test/i }).closest('.modal');
    expect(modal).toHaveClass('modal', 'modal-md');
  });

  it('renders with small size', () => {
    render(
      <Modal isOpen={true} onClose={mockOnClose} title="Test" size="sm">
        <div>Content</div>
      </Modal>
    );

    const modal = screen.getByRole('heading', { name: /Test/i }).closest('.modal');
    expect(modal).toHaveClass('modal', 'modal-sm');
  });

  it('renders with large size', () => {
    render(
      <Modal isOpen={true} onClose={mockOnClose} title="Test" size="lg">
        <div>Content</div>
      </Modal>
    );

    const modal = screen.getByRole('heading', { name: /Test/i }).closest('.modal');
    expect(modal).toHaveClass('modal', 'modal-lg');
  });

  it('renders with extra large size', () => {
    render(
      <Modal isOpen={true} onClose={mockOnClose} title="Test" size="xl">
        <div>Content</div>
      </Modal>
    );

    const modal = screen.getByRole('heading', { name: /Test/i }).closest('.modal');
    expect(modal).toHaveClass('modal', 'modal-xl');
  });

  it('calls onClose when close button is clicked', async () => {
    const user = userEvent.setup();
    render(
      <Modal isOpen={true} onClose={mockOnClose} title="Test">
        <div>Content</div>
      </Modal>
    );

    const closeButton = screen.getByRole('button');
    await user.click(closeButton);
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('hides close button when showCloseButton is false', () => {
    render(
      <Modal isOpen={true} onClose={mockOnClose} title="Test" showCloseButton={false}>
        <div>Content</div>
      </Modal>
    );

    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('sets body overflow to hidden when open', () => {
    render(
      <Modal isOpen={true} onClose={mockOnClose} title="Test">
        <div>Content</div>
      </Modal>
    );

    expect(document.body.style.overflow).toBe('hidden');
  });

  it('resets body overflow when closed', () => {
    const { rerender } = render(
      <Modal isOpen={true} onClose={mockOnClose} title="Test">
        <div>Content</div>
      </Modal>
    );

    expect(document.body.style.overflow).toBe('hidden');

    rerender(
      <Modal isOpen={false} onClose={mockOnClose} title="Test">
        <div>Content</div>
      </Modal>
    );

    expect(document.body.style.overflow).toBe('');
  });

  it('calls onClose when overlay is clicked', async () => {
    const user = userEvent.setup();
    render(
      <Modal isOpen={true} onClose={mockOnClose} title="Test">
        <div>Content</div>
      </Modal>
    );

    const overlay = screen.getByRole('heading', { name: /Test/i }).closest('.modal-overlay');
    await user.click(overlay!);
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('prevents event propagation when content is clicked', async () => {
    const user = userEvent.setup();
    render(
      <Modal isOpen={true} onClose={mockOnClose} title="Test">
        <div>Content</div>
      </Modal>
    );

    const content = screen.getByText('Content').closest('.modal-content');
    await user.click(content!);
    expect(mockOnClose).not.toHaveBeenCalled();
  });
});
