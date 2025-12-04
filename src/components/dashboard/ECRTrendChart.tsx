import { TrendingUp } from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

interface ECRDataPoint {
  month: string;
  total: number;
  critical: number;
  avgDays: number;
}

interface ECRTrendChartProps {
  data: ECRDataPoint[];
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
        <p className="font-semibold text-foreground mb-2">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {entry.name}: <span className="font-mono font-bold">{entry.value}</span>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export function ECRTrendChart({ data }: ECRTrendChartProps) {
  return (
    <div className="metric-card">
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <TrendingUp className="w-5 h-5 text-primary" />
        ECR Volume Trend (Last 21 Months)
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(217 33% 17%)" />
          <XAxis
            dataKey="month"
            stroke="hsl(215 20% 65%)"
            tick={{ fill: 'hsl(215 20% 65%)', fontSize: 12 }}
          />
          <YAxis
            stroke="hsl(215 20% 65%)"
            tick={{ fill: 'hsl(215 20% 65%)', fontSize: 12 }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            wrapperStyle={{ paddingTop: '20px' }}
            formatter={(value) => <span className="text-foreground text-sm">{value}</span>}
          />
          <Line
            type="monotone"
            dataKey="total"
            stroke="hsl(217 91% 60%)"
            strokeWidth={2}
            name="Total ECRs"
            dot={{ fill: 'hsl(217 91% 60%)', strokeWidth: 0, r: 4 }}
            activeDot={{ r: 6, stroke: 'hsl(217 91% 60%)', strokeWidth: 2, fill: 'hsl(222 47% 4%)' }}
          />
          <Line
            type="monotone"
            dataKey="critical"
            stroke="hsl(0 84% 60%)"
            strokeWidth={2}
            name="Critical"
            dot={{ fill: 'hsl(0 84% 60%)', strokeWidth: 0, r: 4 }}
            activeDot={{ r: 6, stroke: 'hsl(0 84% 60%)', strokeWidth: 2, fill: 'hsl(222 47% 4%)' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
