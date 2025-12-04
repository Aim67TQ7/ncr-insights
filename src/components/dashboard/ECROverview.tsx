import { Activity, Clock, AlertTriangle, DollarSign } from 'lucide-react';
import { MetricCard } from './MetricCard';
import { ECRTrendChart } from './ECRTrendChart';
import { JobFamilyRisk } from './JobFamilyRisk';
import { IssuePatterns } from './IssuePatterns';
import { PredictiveRisk } from './PredictiveRisk';
import { ActionRecommendations } from './ActionRecommendations';

const ecrData = [
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
  { family: 'Material Handling Heavy', ecrCount: 89, avgResolution: 14, riskScore: 92, trend: 'up' as const },
  { family: 'Material Handling Metal Stamping', ecrCount: 72, avgResolution: 12, riskScore: 88, trend: 'up' as const },
  { family: 'General Separation', ecrCount: 48, avgResolution: 10, riskScore: 72, trend: 'stable' as const },
  { family: 'Metal Detection', ecrCount: 38, avgResolution: 11, riskScore: 78, trend: 'up' as const },
  { family: 'Manufacturing Engineering', ecrCount: 31, avgResolution: 8, riskScore: 65, trend: 'down' as const },
  { family: 'Printing Products', ecrCount: 22, avgResolution: 9, riskScore: 58, trend: 'stable' as const },
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
  { jobNumber: '9424xxx-1-1', family: 'Material Handling Heavy', predictedECRs: 3.2, confidence: 87, keyRisks: ['Hardware sizing', 'Fit-up issues'] },
  { jobNumber: '9425xxx-1-1', family: 'Material Handling Metal Stamping', predictedECRs: 2.8, confidence: 84, keyRisks: ['Tolerance stack', 'Weld access'] },
  { jobNumber: '8630xxx', family: 'General Separation', predictedECRs: 1.4, confidence: 91, keyRisks: ['Clearance verification'] },
  { jobNumber: 'MD-XXXX', family: 'Metal Detection', predictedECRs: 2.1, confidence: 79, keyRisks: ['Mounting alignment', 'Cable routing'] },
];

export function ECROverview() {
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Key Metrics */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Total ECRs (21m)"
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
          subtitle="38% of all ECRs"
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
        <ECRTrendChart data={ecrData} />
      </section>

      {/* Risk Analysis Grid */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <JobFamilyRisk data={jobFamilyRisk} />
        <IssuePatterns data={issuePatterns} totalEcrs={465} />
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
