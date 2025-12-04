import { getRiskColor } from './RiskBar';

interface PredictiveJob {
  jobNumber: string;
  family: string;
  predictedNCRs: number;
  confidence: number;
  keyRisks: string[];
}

interface PredictiveRiskProps {
  data: PredictiveJob[];
}

export function PredictiveRisk({ data }: PredictiveRiskProps) {
  return (
    <div className="metric-card">
      <h2 className="text-xl font-semibold mb-4">Predicted Risk for Incoming Jobs</h2>
      <div className="space-y-3">
        {data.map((job, i) => {
          const riskColor = job.predictedNCRs > 2.5 ? getRiskColor(90) : getRiskColor(75);
          
          return (
            <div
              key={i}
              className="p-4 bg-secondary/50 rounded-lg border border-border hover:border-primary/30 transition-all"
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <div className="font-semibold font-mono">{job.jobNumber}</div>
                  <div className="text-sm text-muted-foreground">{job.family}</div>
                </div>
                <div className="text-right">
                  <div
                    className="text-2xl font-bold font-mono"
                    style={{ color: riskColor }}
                  >
                    {job.predictedNCRs}
                  </div>
                  <div className="text-xs text-muted-foreground">predicted NCRs</div>
                </div>
              </div>
              
              <div className="mb-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-muted-foreground">Confidence</span>
                  <span className="text-xs font-bold font-mono">{job.confidence}%</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2 overflow-hidden">
                  <div
                    className="h-2 rounded-full bg-primary transition-all duration-500"
                    style={{ width: `${job.confidence}%` }}
                  />
                </div>
              </div>
              
              <div className="text-xs text-muted-foreground">
                <span className="font-semibold text-foreground">Pre-flight checks:</span>{' '}
                {job.keyRisks.join(', ')}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
