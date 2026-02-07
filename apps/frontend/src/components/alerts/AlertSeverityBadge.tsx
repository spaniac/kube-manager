import { Badge } from '../Badge';

type AlertSeverity = 'CRITICAL' | 'WARNING' | 'INFO';

interface AlertSeverityBadgeProps {
  severity: string;
  size?: 'sm' | 'md' | 'lg';
}

const SEVERITY_LABELS: Record<AlertSeverity, string> = {
  CRITICAL: 'Critical',
  WARNING: 'Warning',
  INFO: 'Info',
};

const SEVERITY_BADGE_STATUS: Record<AlertSeverity, string> = {
  CRITICAL: 'Failed',
  WARNING: 'Pending',
  INFO: 'Running',
};

function normalizeSeverity(severity: string): AlertSeverity {
  const normalizedSeverity = severity.trim().toUpperCase();

  if (normalizedSeverity === 'CRITICAL' || normalizedSeverity === 'WARNING') {
    return normalizedSeverity;
  }

  return 'INFO';
}

export function AlertSeverityBadge({ severity, size = 'sm' }: AlertSeverityBadgeProps) {
  const normalizedSeverity = normalizeSeverity(severity);

  return (
    <Badge
      status={SEVERITY_BADGE_STATUS[normalizedSeverity]}
      label={SEVERITY_LABELS[normalizedSeverity]}
      size={size}
    />
  );
}
