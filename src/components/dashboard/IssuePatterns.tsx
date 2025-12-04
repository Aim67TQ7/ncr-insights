import { Zap, RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Issue {
  issue: string;
  frequency: number;
  impact: 'High' | 'Medium' | 'Low';
  recurring: boolean;
}

interface IssuePatternsProps {
  data: Issue[];
  totalNcrs: number;
}

const impactColors = {
  High: 'text-destructive',
  Medium: 'text-warning',
  Low: 'text-success',
};

export function IssuePatterns({ data, totalNcrs }: IssuePatternsProps) {
  return (
    <div className="metric-card">
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <Zap className="w-5 h-5 text-warning" />
        Top Recurring Issues
      </h2>
      <div className="space-y-2">
        {data.slice(0, 5).map((issue, i) => (
          <div
            key={i}
            className="flex items-center justify-between text-sm p-3 bg-secondary/50 rounded-lg hover:bg-secondary transition-colors"
          >
            <div className="flex-1 min-w-0">
              <div className="font-medium truncate">{issue.issue}</div>
              <div className="text-xs text-muted-foreground flex items-center gap-2 mt-1">
                <span className="font-mono">{issue.frequency}x</span>
                <span className="text-border">|</span>
                {issue.recurring && (
                  <span className="flex items-center gap-1 text-primary">
                    <RefreshCw className="w-3 h-3" />
                    Recurring
                  </span>
                )}
                <span className="text-border">|</span>
                <span className={cn(impactColors[issue.impact])}>{issue.impact}</span>
              </div>
            </div>
            <div className="text-right ml-4">
              <div className="text-sm font-bold font-mono text-warning">
                {Math.round((issue.frequency / totalNcrs) * 100)}%
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
