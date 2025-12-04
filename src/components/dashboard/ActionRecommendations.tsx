import { Target } from 'lucide-react';

interface Action {
  text: string;
  highlight: string;
}

const actions: Action[] = [
  {
    highlight: 'Flag Material Handling Heavy jobs',
    text: 'for pre-release DFM review—87% of your cost exposure',
  },
  {
    highlight: 'Create hardware standards matrix',
    text: '(bearing → bolt sizing) to eliminate 34 recurring hardware mismatches',
  },
  {
    highlight: 'Synchronize Windchill-DXF-Print workflow',
    text: 'before next release cycle—24 ECRs tied to drawing divergence',
  },
  {
    highlight: 'Assign manufacturing liaison to design kickoff',
    text: 'for high-risk job families to compress feedback loop',
  },
];

export function ActionRecommendations() {
  return (
    <div className="relative overflow-hidden rounded-lg p-6 border border-primary/30 bg-gradient-to-br from-primary/10 via-card to-card">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 relative">
        <Target className="w-5 h-5 text-primary" />
        Immediate Actions (Next 30 Days)
      </h2>
      <ul className="space-y-3 relative">
        {actions.map((action, i) => (
          <li key={i} className="flex gap-3 text-sm">
            <span className="text-primary font-bold font-mono">{i + 1}.</span>
            <span>
              <strong className="text-foreground">{action.highlight}</strong>{' '}
              <span className="text-muted-foreground">{action.text}</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
