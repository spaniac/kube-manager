interface BadgeProps {
  status: string;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const statusColors: Record<string, string> = {
  Running: '#10b981',
  Succeeded: '#10b981',
  Failed: '#ef4444',
  Pending: '#f59e0b',
  Unknown: '#6b7280',
  Terminating: '#ef4444',
  Completed: '#10b981',
  Error: '#ef4444',
  CrashLoopBackOff: '#dc2626',
  ImagePullBackOff: '#f59e0b',
};

export function Badge({ status, label, size = 'md', className = '' }: BadgeProps) {
  const color = statusColors[status] || '#6b7280';
  const badgeClassName = `badge badge-${size} ${className}`;

  return (
    <span className={badgeClassName} style={{ backgroundColor: color }}>
      {label || status}
    </span>
  );
}

export function BadgeStyles() {
  return (
    <style>{`
      .badge {
        display: inline-block;
        padding: 4px 10px;
        border-radius: 999px;
        font-size: 13px;
        font-weight: 600;
        color: white;
        white-space: nowrap;
      }

      .badge-sm {
        padding: 3px 8px;
        font-size: 11px;
      }

      .badge-md {
        padding: 4px 10px;
        font-size: 13px;
      }

      .badge-lg {
        padding: 6px 14px;
        font-size: 14px;
      }
    `}</style>
  );
}
