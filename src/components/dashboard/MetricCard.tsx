import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  subtitleColor?: 'destructive' | 'warning' | 'success' | 'muted';
  icon?: LucideIcon;
}

const subtitleColors = {
  destructive: 'text-destructive',
  warning: 'text-warning',
  success: 'text-success',
  muted: 'text-muted-foreground',
};

export function MetricCard({ title, value, subtitle, subtitleColor = 'muted', icon: Icon }: MetricCardProps) {
  return (
    <div className="metric-card group">
      <div className="flex items-start justify-between">
        <div className="text-muted-foreground text-sm font-medium mb-2">{title}</div>
        {Icon && <Icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />}
      </div>
      <div className="text-3xl font-bold font-mono tracking-tight">{value}</div>
      {subtitle && (
        <div className={cn('text-xs mt-2', subtitleColors[subtitleColor])}>
          {subtitle}
        </div>
      )}
    </div>
  );
}
