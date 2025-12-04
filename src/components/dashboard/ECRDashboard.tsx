import { useState } from 'react';
import { DashboardTabs } from './DashboardTabs';
import { ECROverview } from './ECROverview';
import { HardwareSpecFramework } from './HardwareSpecFramework';
import { JobPredictiveAnalyzer } from './JobPredictiveAnalyzer';

export default function ECRDashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-7xl mx-auto p-6 lg:p-8 space-y-8">
        {/* Header */}
        <header className="space-y-4 animate-fade-in">
          <div className="flex items-center gap-3">
            <div className="w-2 h-8 bg-primary rounded-full" />
            <h1 className="text-3xl lg:text-4xl font-bold tracking-tight">
              ECR Predictive Intelligence
            </h1>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <p className="text-muted-foreground">
              Real-time design-manufacturing alignment monitoring
            </p>
            <DashboardTabs activeTab={activeTab} onTabChange={setActiveTab} />
          </div>
        </header>

        {/* Tab Content */}
        {activeTab === 'overview' && <ECROverview />}
        {activeTab === 'hardware' && <HardwareSpecFramework />}
        {activeTab === 'jobs' && <JobPredictiveAnalyzer />}

        {/* Footer */}
        <footer className="text-xs text-muted-foreground border-t border-border pt-4">
          Dashboard updated with historical ECR data. Connect real-time data source to enable live predictive scoring.
        </footer>
      </div>
    </div>
  );
}
