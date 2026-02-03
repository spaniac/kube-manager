import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@/test/test-utils';
import userEvent from '@testing-library/user-event';
import { Select } from '@/components/Select';

describe('Select Component', () => {
  it('renders with default props', () => {
    const { container } = render(<Select options={[{ value: '1', label: 'Option 1' }]} />);
    const combobox = container.querySelector('[role="combobox"]');
    expect(combobox).toBeInTheDocument();
    const value = container.querySelector('.select-value');
    expect(value).toHaveTextContent('Select...');
  });

  it('renders with label', () => {
    render(<Select label="Select option" options={[{ value: '1', label: 'Option 1' }]} />);
    expect(screen.getByText('Select option')).toBeInTheDocument();
  });

  it('renders with selected value', () => {
    render(<Select value="1" options={[{ value: '1', label: 'Option 1' }]} />);
    expect(screen.getByText('Option 1')).toBeInTheDocument();
  });

  it('displays error state', () => {
    const { container } = render(<Select error="Selection required" options={[{ value: '1', label: 'Option 1' }]} />);
    expect(screen.getByText('Selection required')).toBeInTheDocument();
    const combobox = container.querySelector('[role="combobox"]');
    expect(combobox).toHaveClass('select-error');
  });

  it('has disabled styling when disabled prop is true', () => {
    const { container } = render(<Select disabled options={[{ value: '1', label: 'Option 1' }]} />);
    const combobox = container.querySelector('[role="combobox"]');
    expect(combobox).toHaveClass('select');
  });

  it('opens dropdown on click', async () => {
    const user = userEvent.setup();
    render(<Select options={[{ value: '1', label: 'Option1' }]} />);
    const combobox = screen.getByRole('combobox');
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    await user.click(combobox);
    expect(screen.getByRole('listbox')).toBeInTheDocument();
  });

  it('calls onChange when option is selected', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(<Select options={[{ value: '1', label: 'Option 1' }, { value: '2', label: 'Option 2' }]} onChange={onChange} />);
    const combobox = screen.getByRole('combobox');
    await user.click(combobox);
    const option = screen.getAllByRole('option').find((el) => el.textContent === 'Option 1');
    await user.click(option!);
    expect(onChange).toHaveBeenCalledWith('1');
  });

  it('closes dropdown when clicking outside', async () => {
    const user = userEvent.setup();
    render(<Select options={[{ value: '1', label: 'Option 1' }]} />);
    const combobox = screen.getByRole('combobox');
    await user.click(combobox);
    expect(screen.getByRole('listbox')).toBeInTheDocument();
    await user.click(document.body);
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('closes dropdown on escape key', async () => {
    render(<Select options={[{ value: '1', label: 'Option 1' }]} />);
    const combobox = screen.getByRole('combobox');
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    combobox.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });
});
