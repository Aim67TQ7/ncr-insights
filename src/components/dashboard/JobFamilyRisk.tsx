import { AlertCircle } from 'lucide-react';
import { RiskBar } from './RiskBar';

interface JobFamily {
  family: string;
  ecrCount: number;
  avgResolution: number;
  riskScore: number;
  trend: 'up' | 'down' | 'stable';
}

interface JobFamilyRiskProps {
  data: JobFamily[];
}

export function JobFamilyRisk({ data }: JobFamilyRiskProps) {
  return (
    <div className="metric-card">
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <AlertCircle className="w-5 h-5 text-warning" />
        Risk by Job Family
      </h2>
      <div className="space-y-3">
        {data.map((family, i) => (
          <div
            key={i}
            className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg hover:bg-secondary transition-colors"
            style={{ animationDelay: `${i * 50}ms` }}
          >
            <div className="flex-1 min-w-0">
              <div className="font-medium text-sm truncate">{family.family}</div>
              <div className="text-xs text-muted-foreground">
                <span className="font-mono">{family.ecrCount}</span> ECRs |{' '}
                <span className="font-mono">{family.avgResolution}</span>d avg
              </div>
            </div>
            <RiskBar score={family.riskScore} />
          </div>
        ))}
      </div>
    </div>
  );
}
