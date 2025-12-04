import { useState } from 'react';
import { Database, FileText, CheckSquare, Zap } from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const issueFrequency = [
  { issue: 'Bolt/Hole Mismatch', frequency: 34, costImpact: 125000 },
  { issue: 'Bearing Mismatch', frequency: 18, costImpact: 78000 },
  { issue: 'Tolerance Stack', frequency: 22, costImpact: 95000 },
  { issue: 'Lock Washer', frequency: 12, costImpact: 48000 },
  { issue: 'Clearance', frequency: 16, costImpact: 62000 },
];

const specCategories = {
  bearings: {
    title: 'Bearing Specifications',
    description: 'Standard bearing sizes and compatible hardware',
    specs: [
      {
        category: 'Shaft-Mounted Bearings',
        standards: [
          { bearing: 'Pillow Block (2-bolt)', boreSize: '7/16"', compatibleBolt: '7/16"-20', washer: 'FA5085', capScrew: '7/16" x 1-1/4"', note: 'Standard factory assembly' },
          { bearing: 'Pillow Block (2-bolt)', boreSize: '1/2"', compatibleBolt: '1/2"-13', washer: 'FA6200', capScrew: '1/2" x 1-1/2"', note: 'Heavy-duty conveyors' },
          { bearing: 'Pillow Block (4-hole)', boreSize: '3/4"', compatibleBolt: '5/8"-11', washer: 'FA6300', capScrew: '5/8" x 1-3/4"', note: 'Large diameter shafts' },
        ]
      }
    ]
  },
  bolts: {
    title: 'Bolt Hole Sizing Standards',
    description: 'Clearance and tap hole sizing for common bolt sizes',
    specs: [
      {
        category: 'Clearance Holes (Loose Fit)',
        standards: [
          { bolt: '1/4"-20', clearanceHole: '0.266"', tapDrill: '0.201"', washerOD: '0.75"', application: 'Standard fastening' },
          { bolt: '5/16"-18', clearanceHole: '0.344"', tapDrill: '0.257"', washerOD: '0.875"', application: 'Medium assembly' },
          { bolt: '3/8"-16', clearanceHole: '0.406"', tapDrill: '0.313"', washerOD: '1.0"', application: 'Heavy assembly' },
          { bolt: '1/2"-13', clearanceHole: '0.531"', tapDrill: '0.422"', washerOD: '1.25"', application: 'Very heavy' },
        ]
      }
    ]
  },
  conflicts: {
    title: 'Known Conflict Matrix',
    description: "Hardware combinations that DON'T work (historical NCRs)",
    specs: [
      {
        category: 'Bearing-Bolt Mismatches (DO NOT USE)',
        standards: [
          { conflict: '7/16" bore + 1/2" bolt', reason: 'Bolt too large', ncrs: 8, solution: 'Use 7/16"-20 bolt' },
          { conflict: '1/2" bore + 7/16" bolt', reason: 'Bolt too small', ncrs: 6, solution: 'Use 1/2"-13 bolt' },
          { conflict: '3/8" carriage + 1/2" hole', reason: "Square won't engage", ncrs: 5, solution: 'Use 1/2" carriage bolt' },
        ]
      }
    ]
  }
};

const implementationPath = [
  { phase: 'Phase 1: Audit & Standardization', timeline: '2-3 weeks', effort: '40 hours', owner: 'Engineering + Procurement', output: 'Hardware Master Reference' },
  { phase: 'Phase 2: Specification Document', timeline: '3-4 weeks', effort: '60 hours', owner: 'Lead Design Engineer', output: 'HDS v1.0 + Shop Cards' },
  { phase: 'Phase 3: CAD Integration', timeline: '4-6 weeks', effort: '80 hours', owner: 'CAD Admin + Engineering', output: 'Windchill Hardware Library' },
  { phase: 'Phase 4: BOM & Procurement', timeline: '2-3 weeks', effort: '30 hours', owner: 'IT/Manufacturing Engineering', output: 'Epicor enforcement rules' },
  { phase: 'Phase 5: Training & Rollout', timeline: '1-2 weeks', effort: '20 hours', owner: 'Engineering Leadership', output: 'Trained workforce' },
  { phase: 'Phase 6: Monitoring', timeline: 'Ongoing', effort: '10 hrs/mo', owner: 'Quality + Engineering', output: 'Monthly compliance report' },
];

const roiCalc = {
  baseline: { ncrs: 34, monthCost: 128500 },
  target: { ncrs: 8, monthCost: 30000 },
  savings: { immediate: 98500, annual: 1182000, payback_months: 1.2 }
};

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
        <p className="font-semibold text-foreground">{payload[0].payload.issue}</p>
        <p className="text-sm text-muted-foreground">
          Frequency: <span className="font-mono text-foreground">{payload[0].value}</span>
        </p>
        <p className="text-sm text-muted-foreground">
          Cost: <span className="font-mono text-destructive">${(payload[0].payload.costImpact / 1000).toFixed(0)}K</span>
        </p>
      </div>
    );
  }
  return null;
};

export function HardwareSpecFramework() {
  const [activeTab, setActiveTab] = useState('framework');
  const [selectedCategory, setSelectedCategory] = useState<keyof typeof specCategories>('bearings');

  const tabs = [
    { id: 'framework', label: 'Spec Framework', icon: Database },
    { id: 'roadmap', label: 'Roadmap', icon: FileText },
    { id: 'roi', label: 'ROI', icon: Zap },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Tab Navigation */}
      <div className="flex border-b border-border gap-1 overflow-x-auto">
        {tabs.map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 font-medium transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? 'border-b-2 border-primary text-primary'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Framework Tab */}
      {activeTab === 'framework' && (
        <div className="space-y-6">
          {/* Issue Frequency Chart */}
          <div className="metric-card">
            <h2 className="text-xl font-semibold mb-4">Hardware Issue Frequency</h2>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={issueFrequency} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(217 33% 17%)" />
                <XAxis type="number" stroke="hsl(215 20% 65%)" tick={{ fill: 'hsl(215 20% 65%)', fontSize: 12 }} />
                <YAxis dataKey="issue" type="category" width={100} stroke="hsl(215 20% 65%)" tick={{ fill: 'hsl(215 20% 65%)', fontSize: 11 }} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="frequency" fill="hsl(217 91% 60%)" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Category Selection */}
          <div className="metric-card">
            <h2 className="text-xl font-semibold mb-4">Specification Categories</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {(Object.entries(specCategories) as [keyof typeof specCategories, typeof specCategories.bearings][]).map(([key, category]) => (
                <button
                  key={key}
                  onClick={() => setSelectedCategory(key)}
                  className={`p-4 rounded-lg border text-left transition-all ${
                    selectedCategory === key
                      ? 'bg-primary/20 border-primary'
                      : 'bg-secondary/50 border-border hover:border-muted-foreground'
                  }`}
                >
                  <div className="font-semibold text-sm mb-1">{category.title}</div>
                  <div className="text-xs text-muted-foreground">{category.description}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Selected Category Details */}
          <div className="metric-card">
            <h3 className="text-lg font-semibold mb-4">{specCategories[selectedCategory].title}</h3>
            <div className="space-y-4">
              {specCategories[selectedCategory].specs.map((section, idx) => (
                <div key={idx} className="border-l-4 border-primary pl-4">
                  <h4 className="font-semibold text-sm mb-3">{section.category}</h4>
                  <div className="bg-secondary/50 rounded-lg overflow-x-auto">
                    <table className="w-full text-xs">
                      <thead className="bg-secondary">
                        <tr>
                          {Object.keys(section.standards[0]).map(key => (
                            <th key={key} className="px-3 py-2 text-left font-semibold text-muted-foreground">
                              {key.charAt(0).toUpperCase() + key.slice(1)}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {section.standards.map((std, i) => (
                          <tr key={i} className={i % 2 === 0 ? 'bg-secondary/30' : 'bg-secondary/50'}>
                            {Object.values(std).map((val, j) => (
                              <td key={j} className="px-3 py-2 border-t border-border">
                                {typeof val === 'string' && val.includes('FA') ? (
                                  <span className="font-mono bg-primary/20 px-2 py-0.5 rounded text-primary">{val}</span>
                                ) : typeof val === 'number' ? (
                                  <span className="font-mono text-destructive">{val}</span>
                                ) : (
                                  String(val)
                                )}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Roadmap Tab */}
      {activeTab === 'roadmap' && (
        <div className="space-y-4">
          {implementationPath.map((phase, idx) => (
            <div key={idx} className="metric-card">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-primary">{phase.phase}</h3>
                  <div className="flex gap-4 text-xs text-muted-foreground mt-1">
                    <span>📅 {phase.timeline}</span>
                    <span>⏱️ {phase.effort}</span>
                    <span>👤 {phase.owner}</span>
                  </div>
                </div>
              </div>
              <div className="pt-3 border-t border-border">
                <span className="text-xs text-muted-foreground">Deliverable: </span>
                <span className="font-mono text-xs bg-success/20 px-2 py-0.5 rounded text-success">{phase.output}</span>
              </div>
            </div>
          ))}

          <div className="relative overflow-hidden rounded-lg p-6 border border-success/30 bg-gradient-to-br from-success/10 via-card to-card">
            <h3 className="text-lg font-semibold mb-3">Total Investment</h3>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <div className="text-muted-foreground mb-1">Timeline</div>
                <div className="text-2xl font-bold text-success">14-18 weeks</div>
              </div>
              <div>
                <div className="text-muted-foreground mb-1">Internal Effort</div>
                <div className="text-2xl font-bold text-success">240 hours</div>
              </div>
              <div>
                <div className="text-muted-foreground mb-1">External Cost</div>
                <div className="text-2xl font-bold text-success">$8-12K</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ROI Tab */}
      {activeTab === 'roi' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="metric-card border-destructive/30 bg-gradient-to-br from-destructive/10 via-card to-card">
              <div className="text-sm text-muted-foreground mb-2">Current State</div>
              <div className="text-4xl font-bold text-destructive mb-1">{roiCalc.baseline.ncrs}</div>
              <div className="text-sm text-muted-foreground mb-3">hardware NCRs/month</div>
              <div className="text-2xl font-bold text-destructive">${(roiCalc.baseline.monthCost / 1000).toFixed(0)}K</div>
              <div className="text-xs text-muted-foreground">monthly cost</div>
            </div>
            <div className="metric-card border-success/30 bg-gradient-to-br from-success/10 via-card to-card">
              <div className="text-sm text-muted-foreground mb-2">Target State</div>
              <div className="text-4xl font-bold text-success mb-1">{roiCalc.target.ncrs}</div>
              <div className="text-sm text-muted-foreground mb-3">hardware NCRs/month</div>
              <div className="text-2xl font-bold text-success">${(roiCalc.target.monthCost / 1000).toFixed(0)}K</div>
              <div className="text-xs text-muted-foreground">monthly cost</div>
            </div>
          </div>

          <div className="metric-card">
            <h3 className="text-lg font-semibold mb-4">Financial Impact</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-secondary/50 rounded-lg">
                <span className="text-muted-foreground">Monthly Savings</span>
                <span className="text-2xl font-bold font-mono text-success">${(roiCalc.savings.immediate / 1000).toFixed(0)}K</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-secondary/50 rounded-lg">
                <span className="text-muted-foreground">Annual Savings</span>
                <span className="text-2xl font-bold font-mono text-success">${(roiCalc.savings.annual / 1000000).toFixed(1)}M</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-success/20 rounded-lg border border-success/30">
                <span className="font-semibold">Payback Period</span>
                <span className="text-2xl font-bold font-mono text-success">{roiCalc.savings.payback_months} months</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
