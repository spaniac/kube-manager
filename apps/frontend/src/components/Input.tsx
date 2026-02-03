import { forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  fullWidth?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helperText,
      fullWidth = false,
      className = '',
      ...props
    },
    ref,
  ) => {
    const inputClassName = `input ${error ? 'input-error' : ''} ${fullWidth ? 'input-full-width' : ''} ${className}`;

    return (
      <div className="input-wrapper">
        {label && <label className="input-label">{label}</label>}
        <input ref={ref} className={inputClassName} {...props} />
        {(error || helperText) && (
          <div className="input-footer">
            {error && <span className="input-error-text">{error}</span>}
            {helperText && !error && (
              <span className="input-helper-text">{helperText}</span>
            )}
          </div>
        )}
      </div>
    );
  },
);

Input.displayName = 'Input';

export const InputStyles = () => (
  <style>{`
    .input-wrapper {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .input-label {
      font-size: 13px;
      font-weight: 500;
      color: #374151;
    }

    .input {
      padding: 10px 14px;
      border: 1px solid #d1d5db;
      border-radius: 6px;
      font-size: 15px;
      outline: none;
      transition: border-color 0.2s;
    }

    .input:focus {
      border-color: #3b82f6;
    }

    .input-error {
      border-color: #ef4444;
    }

    .input-full-width {
      width: 100%;
    }

    .input-footer {
      font-size: 13px;
      min-height: 18px;
    }

    .input-error-text {
      color: #ef4444;
    }

    .input-helper-text {
      color: #6b7280;
    }
  `}</style>
);
