import { useState, useRef, useEffect, ReactNode, KeyboardEvent } from 'react';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  value?: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
  disabled?: boolean;
  label?: string;
  error?: string;
  fullWidth?: boolean;
}

export function Select({
  value,
  onChange,
  options,
  placeholder = 'Select...',
  disabled = false,
  label,
  error,
  fullWidth = false,
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [selectRef]);

  const handleToggle = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  const selectClassName = `select ${error ? 'select-error' : ''} ${fullWidth ? 'select-full-width' : ''} ${isOpen ? 'select-open' : ''}`;

  return (
    <div className="select-wrapper">
      {label && <label className="select-label">{label}</label>}
      <div
        ref={selectRef}
        className={selectClassName}
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="combobox"
        aria-expanded={isOpen}
      >
        <div className="select-value">
          {selectedOption ? selectedOption.label : placeholder}
          <span className="select-arrow">▼</span>
        </div>
        {isOpen && (
          <div className="select-dropdown" role="listbox">
            {options.map((option) => (
              <div
                key={option.value}
                className={`select-option ${option.value === value ? 'select-option-selected' : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  onChange(option.value);
                  setIsOpen(false);
                }}
                role="option"
                aria-selected={option.value === value}
              >
                {option.label}
              </div>
            ))}
          </div>
        )}
      </div>
      {error && <span className="select-error-text">{error}</span>}
    </div>
  );
}

export function SelectStyles() {
  return (
    <style>{`
      .select-wrapper {
        display: flex;
        flex-direction: column;
        gap: 6px;
      }

      .select-label {
        font-size: 13px;
        font-weight: 500;
        color: #374151;
      }

      .select {
        position: relative;
        background: white;
        border: 1px solid #d1d5db;
        border-radius: 6px;
        min-height: 40px;
        cursor: pointer;
        user-select: none;
        transition: border-color 0.2s;
      }

      .select:focus {
        outline: none;
        border-color: #3b82f6;
      }

      .select-error {
        border-color: #ef4444;
      }

      .select-full-width {
        width: 100%;
      }

      .select-value {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 10px 14px;
        font-size: 15px;
        color: #374151;
      }

      .select-arrow {
        font-size: 10px;
        color: #6b7280;
        transition: transform 0.2s;
      }

      .select-open .select-arrow {
        transform: rotate(180deg);
      }

      .select-dropdown {
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: white;
        border: 1px solid #e5e7eb;
        border-radius: 6px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        max-height: 300px;
        overflow-y: auto;
        z-index: 10;
        margin-top: 4px;
      }

      .select-option {
        padding: 10px 14px;
        cursor: pointer;
        transition: background 0.2s;
        font-size: 15px;
        color: #374151;
      }

      .select-option:hover,
      .select-option-selected {
        background: #f3f4f6;
      }

      .select-option-selected {
        font-weight: 500;
      }

      .select-error-text {
        font-size: 13px;
        color: #ef4444;
        margin-top: 4px;
      }

      .select:disabled {
        opacity: 0.6;
        cursor: not-allowed;
        background: #f9fafb;
      }
    `}</style>
  );
}
