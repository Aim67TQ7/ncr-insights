# NCR Tracker - Schema Documentation

## Overview

NCR Tracker is a predictive intelligence dashboard for Non-Conformance Report (NCR) tracking and analysis. It provides real-time design-manufacturing alignment monitoring, predictive risk assessment, and actionable recommendations for quality and operations managers.

---

## Module Architecture

```
NCRDashboard (Main Container)
├── DashboardTabs (Navigation)
├── NCROverview (Overview Tab)
│   ├── MetricCard (x4)
│   ├── NCRTrendChart
│   ├── JobFamilyRisk
│   ├── IssuePatterns
│   ├── PredictiveRisk
│   └── ActionRecommendations
├── HardwareSpecFramework (Hardware Specs Tab)
│   ├── Framework Sub-Tab
│   ├── Roadmap Sub-Tab
│   └── ROI Sub-Tab
└── JobPredictiveAnalyzer (Job Analyzer Tab)
```

---

## Data Schemas

### NCRDataPoint

Historical NCR data points for trend analysis.

```typescript
interface NCRDataPoint {
  month: string;      // Format: "MMMYY" (e.g., "Apr24", "Jan25")
  total: number;      // Total NCRs for the month
  critical: number;   // Number of critical NCRs
  avgDays: number;    // Average resolution time in days
}
```

**Example:**
```json
{ "month": "Apr24", "total": 16, "critical": 3, "avgDays": 8 }
```

---

### JobFamily

Risk analysis by job family/department category.

```typescript
interface JobFamily {
  family: string;        // Job family name (e.g., "Fabrication", "Turret")
  ncrCount: number;      // Total NCR count for this family
  avgResolution: number; // Average resolution time in days
  riskScore: number;     // Calculated risk score (0-100)
  trend: 'up' | 'down' | 'stable'; // Risk trend direction
}
```

**Example:**
```json
{
  "family": "Fabrication",
  "ncrCount": 48,
  "avgResolution": 10,
  "riskScore": 72,
  "trend": "stable"
}
```

---

### Issue

Recurring issue pattern tracking.

```typescript
interface Issue {
  issue: string;                      // Issue description
  frequency: number;                  // Occurrence count
  impact: 'High' | 'Medium' | 'Low';  // Impact severity
  recurring: boolean;                 // Whether issue is recurring
}
```

**Example:**
```json
{
  "issue": "Hardware/Bolt Size Mismatch",
  "frequency": 34,
  "impact": "High",
  "recurring": true
}
```

---

### PredictiveJob

Predicted risk for incoming jobs.

```typescript
interface PredictiveJob {
  jobNumber: string;     // Job identifier
  family: string;        // Job family category
  predictedNCRs: number; // ML-predicted NCR count
  confidence: number;    // Prediction confidence (0-100%)
  keyRisks: string[];    // List of identified risk factors
}
```

**Example:**
```json
{
  "jobNumber": "8630xxx",
  "family": "Fabrication",
  "predictedNCRs": 1.4,
  "confidence": 91,
  "keyRisks": ["Clearance verification"]
}
```

---

### Job (Raw Job Data)

Raw job data for predictive analysis.

```typescript
interface Job {
  jobNum: string;     // Job number identifier
  dept: string;       // Department code (e.g., "0042", "0043")
  opDesc: string;     // Operation description
  complete: boolean;  // Job completion status
  qty: number;        // Quantity
  estHours: number;   // Estimated hours
  stages?: number;    // Optional: number of stages
}
```

**Example:**
```json
{
  "jobNum": "8624796",
  "dept": "0042",
  "opDesc": "Saw - Magnet Cut Hand",
  "complete": true,
  "qty": 3,
  "estHours": 0.30
}
```

---

### ScoredJob (Analyzed Job Data)

Job data with computed risk scores.

```typescript
interface ScoredJob extends Job {
  predictedNCRs: number;   // Predicted NCR probability
  riskScore: number;       // Computed risk score (0-100)
  confidence: number;      // Prediction confidence (0-100%)
  baseNCRProb: number;     // Base NCR probability from operation type
  complexityScore: number; // Computed complexity factor
  deptMultiplier: number;  // Department risk multiplier
  keyRisks: string[];      // Identified risk factors
  recommendation: string;  // Action recommendation text
}
```

**Risk Level Thresholds:**
- `riskScore >= 70`: HIGH RISK - Pre-flight review required
- `riskScore >= 35`: MEDIUM RISK - Engineering review suggested
- `riskScore < 35`: LOW RISK - Standard processing

---

### MetricCardProps

Summary metric display component.

```typescript
interface MetricCardProps {
  title: string;                                      // Metric title
  value: string | number;                             // Main value display
  subtitle?: string;                                  // Optional subtitle
  subtitleColor?: 'destructive' | 'warning' | 'success' | 'muted';
  icon?: LucideIcon;                                  // Optional icon component
}
```

---

### Action

Recommended action item.

```typescript
interface Action {
  text: string;       // Action description
  highlight: string;  // Emphasized text portion
}
```

---

### IssueFrequency (Hardware Specs Module)

Hardware issue frequency and cost tracking.

```typescript
interface IssueFrequency {
  issue: string;       // Issue name
  frequency: number;   // Occurrence count
  costImpact: number;  // Cost impact in dollars
}
```

**Example:**
```json
{ "issue": "Bolt/Hole Mismatch", "frequency": 34, "costImpact": 125000 }
```

---

### SpecCategory (Hardware Specs Module)

Hardware specification categories with standards.

```typescript
interface SpecCategory {
  title: string;           // Category title
  description: string;     // Category description
  specs: SpecSection[];    // Array of specification sections
}

interface SpecSection {
  category: string;        // Section category name
  standards: Record<string, any>[]; // Array of standard specifications
}
```

**Categories:**
- `bearings`: Bearing specifications and compatible hardware
- `bolts`: Bolt hole sizing standards
- `conflicts`: Known conflict matrix (hardware combinations that don't work)

---

### ImplementationPhase (Roadmap Module)

Implementation roadmap phases.

```typescript
interface ImplementationPhase {
  phase: string;     // Phase name/title
  timeline: string;  // Expected timeline
  effort: string;    // Effort estimation
  owner: string;     // Responsible party
  output: string;    // Deliverable/output
}
```

---

### ROICalculation (ROI Module)

Return on investment calculations.

```typescript
interface ROICalculation {
  baseline: {
    ncrs: number;       // Current NCR count
    monthCost: number;  // Current monthly cost
  };
  target: {
    ncrs: number;       // Target NCR count
    monthCost: number;  // Target monthly cost
  };
  savings: {
    immediate: number;      // Monthly savings
    annual: number;         // Annual savings
    payback_months: number; // Payback period
  };
}
```

---

## Risk Calculation Logic

### Department Risk Multipliers

```typescript
const deptRisk: Record<string, number> = {
  '0041': 1.3,  // High risk
  '0042': 0.9,  // Low risk
  '0043': 1.8,  // Very high risk
  '0044': 0.7,  // Very low risk
  '0045': 1.1,  // Medium risk
};
```

### Operation NCR History

```typescript
const ncrHistory: Record<string, {
  ncrRate: number;      // Base NCR probability
  keyRisks: string[];   // Known risk factors
  complexity: number;   // Base complexity score
}> = {
  'Saw - Magnet Cut Hand': { ncrRate: 0.08, keyRisks: ['Dimension accuracy', 'Cut edge finish'], complexity: 2 },
  'Assembly - Heavy': { ncrRate: 0.35, keyRisks: ['Fitment', 'Hardware mismatch', 'Clearance'], complexity: 8 },
  'Deburr/Finish - Sandblast': { ncrRate: 0.14, keyRisks: ['Finish consistency', 'Masking damage'], complexity: 3 },
  'Lathe/Saw Operations': { ncrRate: 0.18, keyRisks: ['Tolerance stack', 'Surface finish'], complexity: 4 },
};
```

### Risk Score Calculation

```typescript
// Complexity adjustments
if (job.qty > 3) complexityScore += 2;
if (job.stages && job.stages > 8) complexityScore += 1;
if (job.estHours > 1) complexityScore += 1;

// Stage risk calculation
const stageRisk = job.stages ? Math.min(job.stages * 0.05, 0.25) : 0;

// Final risk calculation
const predictedNCRs = (baseNCRProb + (complexityScore * 0.03) + stageRisk) * deptMultiplier;
const confidence = Math.max(65, 95 - (complexityScore * 2));
const riskScore = Math.min(95, predictedNCRs * 100);
```

---

## Risk Color Thresholds

```typescript
function getRiskColor(score: number): string {
  if (score >= 85) return 'hsl(0 84% 60%)';    // Red - Critical
  if (score >= 70) return 'hsl(25 95% 53%)';   // Orange - High
  return 'hsl(45 93% 47%)';                     // Yellow - Medium
}

function getRiskLevel(score: number): string {
  if (score >= 85) return 'Critical';
  if (score >= 70) return 'High';
  return 'Medium';
}
```

---

## Component Props Reference

### DashboardTabs

```typescript
interface DashboardTabsProps {
  activeTab: string;                    // Current active tab ID
  onTabChange: (tab: string) => void;   // Tab change callback
}
```

**Tab IDs:** `'overview'` | `'hardware'` | `'jobs'`

### NCRTrendChart

```typescript
interface NCRTrendChartProps {
  data: NCRDataPoint[];
}
```

### JobFamilyRisk

```typescript
interface JobFamilyRiskProps {
  data: JobFamily[];
}
```

### IssuePatterns

```typescript
interface IssuePatternsProps {
  data: Issue[];
  totalNcrs: number;  // Total NCRs for percentage calculation
}
```

### PredictiveRisk

```typescript
interface PredictiveRiskProps {
  data: PredictiveJob[];
}
```

### RiskBar

```typescript
interface RiskBarProps {
  score: number;          // Risk score (0-100)
  showLabel?: boolean;    // Show numeric label (default: true)
}
```

---

## File Structure

```
src/components/dashboard/
├── NCRDashboard.tsx         # Main dashboard container
├── DashboardTabs.tsx        # Tab navigation component
├── NCROverview.tsx          # Overview tab with all metrics
├── NCRTrendChart.tsx        # Line chart for NCR trends
├── JobFamilyRisk.tsx        # Risk by job family component
├── IssuePatterns.tsx        # Recurring issues component
├── PredictiveRisk.tsx       # Predicted risk cards
├── ActionRecommendations.tsx # Action items component
├── JobPredictiveAnalyzer.tsx # Job analyzer tab
├── HardwareSpecFramework.tsx # Hardware specs tab
├── MetricCard.tsx           # Reusable metric card
└── RiskBar.tsx              # Risk visualization bar
```

---

## Current Job Families

| Family | Description |
|--------|-------------|
| Fabrication | General fabrication operations |
| Turret | Turret-based manufacturing |
| Manufacturing Engineering | Engineering support operations |
| Printing Products | Print-related manufacturing |

---

## Data Sources

Currently using static sample data. To enable live predictive scoring:

1. Connect real-time data source
2. Integrate with job management system (Epicor, etc.)
3. Link to Windchill/CAD system for design data
4. Enable NCR tracking database connection

---

## Future Integration Points

- **Windchill-DXF-Print workflow** synchronization
- **Epicor** BOM enforcement rules
- **CAD Admin** hardware library integration
- Real-time NCR ingestion pipeline
- Machine learning model API endpoints
