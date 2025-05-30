'use client';

import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/24/solid';

interface KPICardProps {
  title: string;
  value: number;
  change: number;
  trend: 'up' | 'down';
  format?: 'number' | 'currency' | 'percentage' | 'multiplier';
}

const formatValue = (value: number, format: string): string => {
  switch (format) {
    case 'currency':
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
      }).format(value);
    case 'percentage':
      return `${(value * 100).toFixed(1)}%`;
    case 'multiplier':
      return `${value.toFixed(1)}x`;
    default:
      return value.toFixed(1);
  }
};

export default function KPICard({ title, value, change, trend, format = 'number' }: KPICardProps) {
  const formattedValue = formatValue(value, format);
  const formattedChange = `${change > 0 ? '+' : ''}${change.toFixed(1)}%`;
  const trendColor = trend === 'up' ? 'text-green-600' : 'text-red-600';
  const TrendIcon = trend === 'up' ? ArrowUpIcon : ArrowDownIcon;

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
        <div className={`flex items-center ${trendColor}`}>
          <TrendIcon className="w-4 h-4 mr-1" />
          <span className="text-sm font-semibold">{formattedChange}</span>
        </div>
      </div>
      <p className="mt-2 text-3xl font-bold text-gray-900">{formattedValue}</p>
    </div>
  );
} 