import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Input } from '@/components/Input';

describe('Input Component', () => {
  it('renders input with label', () => {
    render(<Input label="Username" name="username" />);
    expect(screen.getByText('Username')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('renders input without label', () => {
    render(<Input name="username" />);
    expect(screen.queryByRole('textbox')).toBeInTheDocument();
    expect(screen.queryByText('Username')).not.toBeInTheDocument();
  });

  it('renders with error state', () => {
    render(<Input label="Username" name="username" error="Username is required" />);
    expect(screen.getByText('Username is required')).toBeInTheDocument();
    const input = screen.getByRole('textbox');
    expect(input).toHaveClass('input-error');
  });

  it('renders with helper text', () => {
    render(<Input label="Username" name="username" helperText="Enter your username" />);
    expect(screen.getByText('Enter your username')).toBeInTheDocument();
  });

  it('does not show helper text when error is present', () => {
    render(
      <Input
        label="Username"
        name="username"
        error="Username is required"
        helperText="Enter your username"
      />
    );
    expect(screen.getByText('Username is required')).toBeInTheDocument();
    expect(screen.queryByText('Enter your username')).not.toBeInTheDocument();
  });

  it('renders with full width', () => {
    render(<Input label="Username" name="username" fullWidth />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveClass('input-full-width');
  });

  it('does not render full width by default', () => {
    render(<Input label="Username" name="username" />);
    const input = screen.getByRole('textbox');
    expect(input).not.toHaveClass('input-full-width');
  });

  it('renders with custom className', () => {
    render(<Input label="Username" name="username" className="custom-class" />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveClass('custom-class');
  });

  it('applies additional props to input', () => {
    render(<Input label="Username" name="username" type="password" placeholder="Enter password" />);
    const input = screen.getByPlaceholderText('Enter password');
    expect(input).toHaveAttribute('type', 'password');
  });

  it('does not render footer when no error or helper text', () => {
    render(<Input label="Username" name="username" />);
    const wrapper = screen.getByRole('textbox').closest('.input-wrapper');
    expect(wrapper?.querySelector('.input-footer')).not.toBeInTheDocument();
  });

  it('handles user input', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(<Input label="Username" name="username" onChange={onChange} />);
    const input = screen.getByRole('textbox');
    await user.type(input, 'testuser');
    expect(onChange).toHaveBeenCalled();
  });
});
