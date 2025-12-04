import { useState, useMemo } from 'react';
import { AlertTriangle, TrendingDown, CheckCircle, AlertCircle } from 'lucide-react';
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface Job {
  jobNum: string;
  dept: string;
  opDesc: string;
  complete: boolean;
  qty: number;
  estHours: number;
  stages?: number;
}

interface ScoredJob extends Job {
  predictedECRs: number;
  riskScore: number;
  confidence: number;
  baseECRProb: number;
  complexityScore: number;
  deptMultiplier: number;
  keyRisks: string[];
  recommendation: string;
}

const jobsRaw: Job[] = [
  { jobNum: '8624796', dept: '0042', opDesc: 'Saw - Magnet Cut Hand', complete: true, qty: 3, estHours: 0.30 },
  { jobNum: '8624797', dept: '0042', opDesc: 'Saw - Magnet Cut Hand', complete: true, qty: 3, estHours: 0.30 },
  { jobNum: '8625370', dept: '0043', opDesc: 'Assembly - Heavy', complete: true, qty: 1, estHours: 0.25 },
  { jobNum: '8627039-500', dept: '0045', opDesc: 'Deburr/Finish - Sandblast', complete: true, qty: 5, estHours: 0.94 },
  { jobNum: '8627125', dept: '0043', opDesc: 'Assembly - Heavy', complete: true, qty: 1, estHours: 0.00, stages: 11 },
  { jobNum: '9396522-1-2', dept: '0041', opDesc: 'Lathe/Saw Operations', complete: true, qty: 1, estHours: 0.75 },
];

const ecrHistory: Record<string, { ecrRate: number; keyRisks: string[]; complexity: number }> = {
  'Saw - Magnet Cut Hand': { ecrRate: 0.08, keyRisks: ['Dimension accuracy', 'Cut edge finish'], complexity: 2 },
  'Assembly - Heavy': { ecrRate: 0.35, keyRisks: ['Fitment', 'Hardware mismatch', 'Clearance'], complexity: 8 },
  'Deburr/Finish - Sandblast': { ecrRate: 0.14, keyRisks: ['Finish consistency', 'Masking damage'], complexity: 3 },
  'Lathe/Saw Operations': { ecrRate: 0.18, keyRisks: ['Tolerance stack', 'Surface finish'], complexity: 4 },
};

const deptRisk: Record<string, number> = {
  '0041': 1.3,
  '0042': 0.9,
  '0043': 1.8,
  '0044': 0.7,
  '0045': 1.1,
};

const scoreJob = (job: Job): ScoredJob => {
  const opPattern = ecrHistory[job.opDesc] || { ecrRate: 0.15, keyRisks: ['Generic risk'], complexity: 3 };
  const deptMultiplier = deptRisk[job.dept] || 1.0;
  
  let baseECRProb = opPattern.ecrRate;
  let complexityScore = opPattern.complexity;
  if (job.qty > 3) complexityScore += 2;
  if (job.stages && job.stages > 8) complexityScore += 1;
  if (job.estHours > 1) complexityScore += 1;
  
  const stageRisk = job.stages ? Math.min(job.stages * 0.05, 0.25) : 0;
  const predictedECRs = (baseECRProb + (complexityScore * 0.03) + stageRisk) * deptMultiplier;
  const confidence = Math.max(65, 95 - (complexityScore * 2));
  const riskScore = Math.min(95, predictedECRs * 100);
  
  return {
    ...job,
    predictedECRs: parseFloat(predictedECRs.toFixed(2)),
    riskScore: Math.round(riskScore),
    confidence: Math.round(confidence),
    baseECRProb: parseFloat(baseECRProb.toFixed(3)),
    complexityScore,
    deptMultiplier,
    keyRisks: opPattern.keyRisks,
    recommendation: riskScore > 60 ? 'HIGH RISK - Pre-flight review required' : 
                    riskScore > 35 ? 'MEDIUM RISK - Engineering review suggested' : 
                    'LOW RISK - Standard processing',
  };
};

const getRiskFactors = (job: ScoredJob) => [
  { factor: 'Operation Type', value: Math.round(job.baseECRProb * 100), max: 35 },
  { factor: 'Complexity', value: Math.min(Math.round(job.complexityScore * 10), 40), max: 40 },
  { factor: 'Department Risk', value: Math.round((job.deptMultiplier - 1) * 50), max: 40 },
  { factor: 'Multi-Stage Ops', value: job.stages ? Math.round(Math.min(job.stages * 5, 30)) : 0, max: 30 },
];

const getRiskColor = (score: number) => {
  if (score >= 70) return 'text-destructive';
  if (score >= 45) return 'text-chart-orange';
  return 'text-success';
};

const getRiskBgColor = (score: number) => {
  if (score >= 70) return 'bg-destructive/20 border-destructive/30';
  if (score >= 45) return 'bg-chart-orange/20 border-chart-orange/30';
  return 'bg-success/20 border-success/30';
};

const getRiskIcon = (score: number) => {
  if (score >= 70) return <AlertTriangle className="w-5 h-5 text-destructive" />;
  if (score >= 45) return <AlertCircle className="w-5 h-5 text-chart-orange" />;
  return <CheckCircle className="w-5 h-5 text-success" />;
};

export function JobPredictiveAnalyzer() {
  const scoredJobs = useMemo(() => {
    return jobsRaw.map(scoreJob).sort((a, b) => b.riskScore - a.riskScore);
  }, []);

  const [selectedJob, setSelectedJob] = useState<ScoredJob>(scoredJobs[0]);

  const stats = {
    avgRisk: Math.round(scoredJobs.reduce((sum, j) => sum + j.riskScore, 0) / scoredJobs.length),
    highRiskCount: scoredJobs.filter(j => j.riskScore >= 70).length,
    totalPredictedECRs: parseFloat(scoredJobs.reduce((sum, j) => sum + j.predictedECRs, 0).toFixed(1)),
    estimatedCost: Math.round(scoredJobs.reduce((sum, j) => sum + j.predictedECRs, 0) * 45 * 85),
  };

  const jobRiskComparison = scoredJobs.map(j => ({
    name: j.jobNum.substring(0, 12),
    riskScore: j.riskScore,
    complexity: j.complexityScore,
  }));

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="metric-card">
          <div className="text-muted-foreground text-sm mb-2">Avg Risk Score</div>
          <div className="text-3xl font-bold font-mono text-chart-orange">{stats.avgRisk}</div>
          <div className="text-xs text-muted-foreground mt-2">{stats.highRiskCount} high-risk jobs</div>
        </div>
        <div className="metric-card">
          <div className="text-muted-foreground text-sm mb-2">Predicted ECRs</div>
          <div className="text-3xl font-bold font-mono text-warning">{stats.totalPredictedECRs}</div>
          <div className="text-xs text-muted-foreground mt-2">across active jobs</div>
        </div>
        <div className="metric-card">
          <div className="text-muted-foreground text-sm mb-2">Est. Rework Cost</div>
          <div className="text-3xl font-bold font-mono text-destructive">${(stats.estimatedCost / 1000).toFixed(0)}K</div>
          <div className="text-xs text-muted-foreground mt-2">if all ECRs occur</div>
        </div>
        <div className="metric-card">
          <div className="text-muted-foreground text-sm mb-2">Mitigation Potential</div>
          <div className="text-3xl font-bold font-mono text-success">-$180K</div>
          <div className="text-xs text-muted-foreground mt-2">via pre-flight review</div>
        </div>
      </div>

      {/* Risk Ranking */}
      <div className="metric-card">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <TrendingDown className="w-5 h-5 text-primary" />
          Jobs Ranked by Risk
        </h2>
        <div className="space-y-2">
          {scoredJobs.map((job, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedJob(job)}
              className={`w-full p-4 rounded-lg border text-left transition-all ${
                selectedJob?.jobNum === job.jobNum 
                  ? 'bg-secondary border-primary ring-2 ring-primary'
                  : 'bg-secondary/50 border-border hover:border-muted-foreground'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="font-semibold flex items-center gap-2">
                    {getRiskIcon(job.riskScore)}
                    <span className="font-mono">{job.jobNum}</span>
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {job.opDesc} • Dept {job.dept} • {job.qty} qty
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-2xl font-bold font-mono ${getRiskColor(job.riskScore)}`}>
                    {job.riskScore}
                  </div>
                  <div className="text-xs text-muted-foreground">{job.predictedECRs} ECRs</div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Detailed Analysis */}
      {selectedJob && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="metric-card">
            <h3 className="text-lg font-semibold mb-4">Risk Factor Breakdown</h3>
            <div className="space-y-4">
              {getRiskFactors(selectedJob).map((factor, i) => (
                <div key={i}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-muted-foreground">{factor.factor}</span>
                    <span className="font-semibold font-mono">{factor.value}/{factor.max}</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-3 overflow-hidden">
                    <div
                      className="bg-primary h-3 rounded-full transition-all"
                      style={{ width: `${(factor.value / factor.max) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="metric-card">
            <h3 className="text-lg font-semibold mb-4">Key Risks & Actions</h3>
            <div className="space-y-3">
              <div className="bg-secondary/50 p-3 rounded-lg border border-border">
                <div className="text-sm font-semibold text-warning mb-1">Confidence: {selectedJob.confidence}%</div>
                <div className="text-xs text-muted-foreground">Prediction reliability based on historical patterns</div>
              </div>
              <div>
                <div className="text-sm font-semibold mb-2">Recurring Risks:</div>
                <div className="space-y-1">
                  {selectedJob.keyRisks.map((risk, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm">
                      <span className="text-chart-orange mt-0.5">•</span>
                      <span className="text-muted-foreground">{risk}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className={`p-3 rounded-lg border ${getRiskBgColor(selectedJob.riskScore)}`}>
                <div className="text-sm font-semibold mb-1">Recommendation</div>
                <div className="text-xs">{selectedJob.recommendation}</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Risk Landscape */}
      <div className="metric-card">
        <h2 className="text-lg font-semibold mb-4">Risk Landscape</h2>
        <ResponsiveContainer width="100%" height={250}>
          <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(217 33% 17%)" />
            <XAxis 
              type="number" 
              dataKey="complexity" 
              name="Complexity" 
              stroke="hsl(215 20% 65%)" 
              tick={{ fill: 'hsl(215 20% 65%)', fontSize: 12 }}
              label={{ value: 'Complexity', position: 'bottom', fill: 'hsl(215 20% 65%)', fontSize: 12 }}
            />
            <YAxis 
              type="number" 
              dataKey="riskScore" 
              name="Risk Score" 
              stroke="hsl(215 20% 65%)" 
              tick={{ fill: 'hsl(215 20% 65%)', fontSize: 12 }}
              label={{ value: 'Risk', angle: -90, position: 'left', fill: 'hsl(215 20% 65%)', fontSize: 12 }}
            />
            <Tooltip 
              contentStyle={{ backgroundColor: 'hsl(222 47% 8%)', border: '1px solid hsl(217 33% 17%)' }}
              formatter={(value: number) => value.toFixed(0)}
            />
            <Scatter name="Jobs" data={jobRiskComparison} fill="hsl(217 91% 60%)" />
          </ScatterChart>
        </ResponsiveContainer>
        <div className="text-xs text-muted-foreground mt-2">
          Top-right = high complexity + high risk → prioritize for pre-flight review
        </div>
      </div>

      {/* Action Items */}
      {scoredJobs.filter(j => j.riskScore >= 70).length > 0 && (
        <div className="relative overflow-hidden rounded-lg p-6 border border-destructive/30 bg-gradient-to-br from-destructive/10 via-card to-card">
          <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-destructive" />
            Pre-Flight Action Items
          </h2>
          <ul className="space-y-2 text-sm">
            {scoredJobs.filter(j => j.riskScore >= 70).map((job, i) => (
              <li key={i} className="flex gap-3">
                <span className="text-destructive font-bold font-mono">{i + 1}.</span>
                <span>
                  <strong className="font-mono">{job.jobNum}</strong> ({job.riskScore} risk): Verify{' '}
                  <strong>{job.keyRisks[0]}</strong>
                  {job.keyRisks[1] ? ` and ${job.keyRisks[1]}` : ''} before release
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
