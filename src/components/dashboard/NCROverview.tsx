import { Activity, Clock, AlertTriangle, DollarSign } from 'lucide-react';
import { MetricCard } from './MetricCard';
import { NCRTrendChart } from './NCRTrendChart';
import { JobFamilyRisk } from './JobFamilyRisk';
import { IssuePatterns } from './IssuePatterns';
import { PredictiveRisk } from './PredictiveRisk';
import { ActionRecommendations } from './ActionRecommendations';

const ncrData = [
  { month: 'Apr24', total: 16, critical: 3, avgDays: 8 },
  { month: 'May24', total: 27, critical: 8, avgDays: 12 },
  { month: 'Jun24', total: 24, critical: 7, avgDays: 11 },
  { month: 'Jul24', total: 18, critical: 6, avgDays: 9 },
  { month: 'Aug24', total: 22, critical: 9, avgDays: 14 },
  { month: 'Sep24', total: 25, critical: 10, avgDays: 13 },
  { month: 'Oct24', total: 26, critical: 11, avgDays: 15 },
  { month: 'Nov24', total: 20, critical: 8, avgDays: 11 },
  { month: 'Dec24', total: 17, critical: 6, avgDays: 9 },
  { month: 'Jan25', total: 19, critical: 9, avgDays: 8 },
  { month: 'Feb25', total: 21, critical: 8, avgDays: 10 },
  { month: 'Mar25', total: 23, critical: 7, avgDays: 12 },
  { month: 'Apr25', total: 25, critical: 10, avgDays: 11 },
  { month: 'May25', total: 28, critical: 12, avgDays: 13 },
  { month: 'Jun25', total: 22, critical: 9, avgDays: 10 },
  { month: 'Jul25', total: 20, critical: 7, avgDays: 9 },
  { month: 'Aug25', total: 24, critical: 11, avgDays: 12 },
  { month: 'Sep25', total: 26, critical: 10, avgDays: 14 },
  { month: 'Oct25', total: 23, critical: 9, avgDays: 11 },
  { month: 'Nov25', total: 21, critical: 8, avgDays: 10 },
  { month: 'Dec25', total: 18, critical: 7, avgDays: 9 },
];

const jobFamilyRisk = [
  { family: 'Fabrication', ncrCount: 48, avgResolution: 10, riskScore: 72, trend: 'stable' as const },
  { family: 'Turret', ncrCount: 38, avgResolution: 11, riskScore: 78, trend: 'up' as const },
  { family: 'Manufacturing Engineering', ncrCount: 31, avgResolution: 8, riskScore: 65, trend: 'down' as const },
  { family: 'Printing Products', ncrCount: 22, avgResolution: 9, riskScore: 58, trend: 'stable' as const },
];

const issuePatterns = [
  { issue: 'Hardware/Bolt Size Mismatch', frequency: 34, impact: 'High' as const, recurring: true },
  { issue: 'Hole Size/Tolerance Misalignment', frequency: 28, impact: 'High' as const, recurring: true },
  { issue: 'Drawing-Model Divergence', frequency: 24, impact: 'High' as const, recurring: true },
  { issue: 'Fitment/Clearance Problems', frequency: 22, impact: 'Medium' as const, recurring: true },
  { issue: 'Material Specification Errors', frequency: 18, impact: 'Medium' as const, recurring: false },
  { issue: 'Process Documentation Gaps', frequency: 16, impact: 'Medium' as const, recurring: true },
];

const predictiveIndicators = [
  { jobNumber: '8630xxx', family: 'Fabrication', predictedNCRs: 1.4, confidence: 91, keyRisks: ['Clearance verification'] },
  { jobNumber: 'MD-XXXX', family: 'Turret', predictedNCRs: 2.1, confidence: 79, keyRisks: ['Mounting alignment', 'Cable routing'] },
];

export function NCROverview() {
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Key Metrics */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Total NCRs (21m)"
          value="465"
          subtitle="↑ 12% vs prior year"
          subtitleColor="destructive"
          icon={Activity}
        />
        <MetricCard
          title="Avg Resolution"
          value="11.2 days"
          subtitle="True cost: 35-45 days with rework"
          subtitleColor="warning"
          icon={Clock}
        />
        <MetricCard
          title="Critical Issues"
          value="125"
          subtitle="38% of all NCRs"
          subtitleColor="destructive"
          icon={AlertTriangle}
        />
        <MetricCard
          title="Est. Annual Cost"
          value="$742K"
          subtitle="Rework labor + downtime"
          subtitleColor="warning"
          icon={DollarSign}
        />
      </section>

      {/* Trend Chart */}
      <section>
        <NCRTrendChart data={ncrData} />
      </section>

      {/* Risk Analysis Grid */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <JobFamilyRisk data={jobFamilyRisk} />
        <IssuePatterns data={issuePatterns} totalNcrs={465} />
      </section>

      {/* Predictive Risk */}
      <section>
        <PredictiveRisk data={predictiveIndicators} />
      </section>

      {/* Action Recommendations */}
      <section>
        <ActionRecommendations />
      </section>
    </div>
  );
}
