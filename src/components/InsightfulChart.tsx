import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts'; // Assuming BarChart for example

// Example data structure - adapt as needed
interface ChartDataItem {
  name: string;
  value: number;
  // Add other series if needed, e.g., value2: number;
}

interface InsightfulChartProps {
  data: ChartDataItem[];
  title: string;
  description?: string;
  chartType?: 'bar' | 'line' | 'pie'; // Extend with more types if needed
  xAxisKey?: string; // Key for X-axis data
  dataKeys: { key: string; color: string }[]; // Keys for data series and their colors
}

const InsightfulChart: React.FC<InsightfulChartProps> = ({
  data,
  title,
  description,
  // chartType = 'bar', // TODO: Implement logic to switch chart types
  xAxisKey = 'name',
  dataKeys,
}) => {
  console.log("Rendering InsightfulChart with title:", title, "and data points:", data.length);

  if (!data || data.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-500 text-center py-8">No data available to display chart.</p>
        </CardContent>
      </Card>
    );
  }

  // For now, only BarChart is implemented as an example
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.5} />
            <XAxis dataKey={xAxisKey} tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip
              contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', borderRadius: '0.5rem', backdropFilter: 'blur(5px)' }}
              cursor={{ fill: 'rgba(200, 200, 200, 0.1)' }}
            />
            <Legend wrapperStyle={{ fontSize: '12px' }} />
            {dataKeys.map(dk => (
                 <Bar key={dk.key} dataKey={dk.key} fill={dk.color} radius={[4, 4, 0, 0]} />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default InsightfulChart;