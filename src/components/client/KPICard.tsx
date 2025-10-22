import React from 'react';

export default function KPICard({ title, value, trend }: { title: string; value: string | number; trend?: 'up' | 'down' | 'flat' }) {
  return (
    <div className="card">
      <div className="text-sm text-gray-500">{title}</div>
      <div className="text-2xl font-semibold text-wg-dark mt-2">{value}</div>
      {trend && (
        <div className={`mt-2 text-sm ${trend === 'up' ? 'text-green-600' : trend === 'down' ? 'text-red-600' : 'text-gray-500'}`}>
          {trend === 'up' ? '▲' : trend === 'down' ? '▼' : '—'} Trend
        </div>
      )}
    </div>
  );
}