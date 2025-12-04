import { cn } from '@/lib/utils';

interface RiskBarProps {
  score: number;
  showLabel?: boolean;
}

export function getRiskColor(score: number): string {
  if (score >= 85) return 'hsl(0 84% 60%)';
  if (score >= 70) return 'hsl(25 95% 53%)';
  return 'hsl(45 93% 47%)';
}

export function getRiskLevel(score: number): string {
  if (score >= 85) return 'Critical';
  if (score >= 70) return 'High';
  return 'Medium';
}

export function getRiskTextClass(score: number): string {
  if (score >= 85) return 'text-destructive';
  if (score >= 70) return 'text-chart-orange';
  return 'text-warning';
}

export function RiskBar({ score, showLabel = true }: RiskBarProps) {
  const color = getRiskColor(score);

  return (
    <div className="flex items-center gap-3">
      <div className="w-20 bg-secondary rounded-full h-2 overflow-hidden">
        <div
          className="risk-bar"
          style={{
            width: `${score}%`,
            backgroundColor: color,
          }}
        />
      </div>
      {showLabel && (
        <span
          className="text-xs font-bold font-mono tabular-nums"
          style={{ color }}
        >
          {score}
        </span>
      )}
    </div>
  );
}
