import { forwardRef } from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      loading = false,
      disabled,
      icon,
      iconPosition = 'left',
      className = '',
      ...props
    },
    ref,
  ) => {
    const buttonClassName = `button button-${variant} button-${size} ${loading ? 'button-loading' : ''} ${className}`;

    return (
      <button
        ref={ref}
        className={buttonClassName}
        disabled={disabled || loading}
        {...props}
      >
        {icon && iconPosition === 'left' && <span className="button-icon">{icon}</span>}
        {loading ? <span className="button-spinner" /> : children}
        {icon && iconPosition === 'right' && <span className="button-icon">{icon}</span>}
      </button>
    );
  },
);

Button.displayName = 'Button';

export const ButtonStyles = () => (
  <style>{`
    .button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      padding: 10px 20px;
      border: none;
      border-radius: 6px;
      font-size: 15px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s ease;
      white-space: nowrap;
    }

    .button:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    .button-primary {
      background: #3b82f6;
      color: white;
    }

    .button-primary:hover:not(:disabled) {
      background: #2563eb;
    }

    .button-secondary {
      background: #6b7280;
      color: white;
    }

    .button-secondary:hover:not(:disabled) {
      background: #4b5563;
    }

    .button-danger {
      background: #dc2626;
      color: white;
    }

    .button-danger:hover:not(:disabled) {
      background: #b91c1c;
    }

    .button-ghost {
      background: transparent;
      color: #374151;
      border: 1px solid #d1d5db;
    }

    .button-ghost:hover:not(:disabled) {
      background: #f3f4f6;
    }

    .button-sm {
      padding: 6px 12px;
      font-size: 13px;
    }

    .button-md {
      padding: 10px 20px;
      font-size: 15px;
    }

    .button-lg {
      padding: 14px 28px;
      font-size: 16px;
    }

    .button-icon {
      display: flex;
      align-items: center;
    }

    .button-spinner {
      width: 16px;
      height: 16px;
      border: 2px solid rgba(255, 255, 255, 0.3);
      border-top-color: currentColor;
      border-radius: 50%;
      animation: spin 0.6s linear infinite;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }
  `}</style>
);

