import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Minus } from 'lucide-react'; // Example icons

interface OverviewItem {
  title: string;
  value: string;
  change?: string; // e.g., "+5.2%"
  changeType?: 'positive' | 'negative' | 'neutral';
}

interface FinancialOverviewWidgetProps {
  items: OverviewItem[];
  title?: string;
}

const FinancialOverviewWidget: React.FC<FinancialOverviewWidgetProps> = ({ items, title = "Financial Overview" }) => {
  console.log("Rendering FinancialOverviewWidget with items:", items.length);

  const getChangeIcon = (changeType?: 'positive' | 'negative' | 'neutral') => {
    if (changeType === 'positive') return <TrendingUp className="h-4 w-4 text-green-500" />;
    if (changeType === 'negative') return <TrendingDown className="h-4 w-4 text-red-500" />;
    return <Minus className="h-4 w-4 text-gray-500" />;
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>A quick look at your key financial metrics.</CardDescription>
      </CardHeader>
      <CardContent>
        {items.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {items.map((item, index) => (
              <Card key={index} className="p-4">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm font-medium text-gray-600">{item.title}</p>
                  {item.change && item.changeType && getChangeIcon(item.changeType)}
                </div>
                <p className="text-2xl font-bold">{item.value}</p>
                {item.change && (
                  <p className={`text-xs ${
                    item.changeType === 'positive' ? 'text-green-500' :
                    item.changeType === 'negative' ? 'text-red-500' : 'text-gray-500'
                  }`}>
                    {item.change}
                  </p>
                )}
              </Card>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500">No overview data available.</p>
        )}
      </CardContent>
    </Card>
  );
};

export default FinancialOverviewWidget;