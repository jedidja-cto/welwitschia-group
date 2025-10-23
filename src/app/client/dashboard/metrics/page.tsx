'use client';

import React, { useState, useEffect } from 'react';
import { getClientMetrics } from '@/lib/clientApi';
import type { MetricWithProject } from '@/lib/clientApi';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';

export default function MetricsPage() {
  const [metrics, setMetrics] = useState<MetricWithProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [groupedMetrics, setGroupedMetrics] = useState<any>({});
  const [chartType, setChartType] = useState<'bar' | 'pie'>('bar');

  const COLORS = ['#1A8452', '#E67E22', '#114C32', '#3498DB', '#9B59B6', '#2ECC71', '#F1C40F'];

  useEffect(() => {
    async function loadMetrics() {
      try {
        const data = await getClientMetrics();
        setMetrics(data);
        
        // Group metrics by name for visualization
        const grouped = data.reduce((acc: any, metric) => {
          if (!acc[metric.metric_name]) {
            acc[metric.metric_name] = [];
          }
          acc[metric.metric_name].push({
            ...metric,
            value: parseFloat(metric.value),
            date: new Date(metric.uploaded_at || '').toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric'
            })
          });
          return acc;
        }, {});
        
        setGroupedMetrics(grouped);
      } catch (error) {
        console.error('Error loading metrics:', error);
      } finally {
        setLoading(false);
      }
    }
    
    loadMetrics();
  }, []);

  function formatDate(dateString: string | null) {
    if (!dateString) return 'Not set';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }

  // Prepare data for pie chart
  const pieData = Object.keys(groupedMetrics).map((key, index) => {
    const totalValue = groupedMetrics[key].reduce((sum: number, item: any) => sum + item.value, 0);
    return {
      name: key,
      value: totalValue
    };
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="sm:flex sm:items-center sm:justify-between mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Metrics</h1>
        <div className="mt-4 sm:mt-0">
          <div className="flex space-x-2">
            <button
              onClick={() => setChartType('bar')}
              className={`px-4 py-2 text-sm font-medium rounded-md ${
                chartType === 'bar' 
                  ? 'bg-green-600 text-white' 
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              Bar Chart
            </button>
            <button
              onClick={() => setChartType('pie')}
              className={`px-4 py-2 text-sm font-medium rounded-md ${
                chartType === 'pie' 
                  ? 'bg-green-600 text-white' 
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              Pie Chart
            </button>
          </div>
        </div>
      </div>

      {metrics.length > 0 ? (
        <>
          <div className="bg-white p-6 shadow rounded-lg mb-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Metrics Visualization</h2>
            <div className="h-80">
              {chartType === 'bar' ? (
                Object.keys(groupedMetrics).length > 0 ? (
                  Object.keys(groupedMetrics).map((metricName) => (
                    <div key={metricName} className="mb-8">
                      <h3 className="text-md font-medium text-gray-700 mb-2">{metricName}</h3>
                      <ResponsiveContainer width="100%" height={200}>
                        <BarChart
                          data={groupedMetrics[metricName]}
                          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="date" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="value" fill="#1A8452" name={metricName} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  ))
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <p className="text-gray-500">No metric data available for visualization</p>
                  </div>
                )
              ) : (
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      labelLine={true}
                      label={({ name, percent }: { name: string; percent: number }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value: number) => [`${value}`, 'Value']} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>

          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Metrics Data</h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">Detailed metrics information</p>
            </div>
            <div className="border-t border-gray-200">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Metric Name
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Value
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Project
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {metrics.map((metric) => (
                      <tr key={metric.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {metric.metric_name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {metric.value}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {metric.projects?.title || `Project #${metric.project_id?.substring(0, 8)}`}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatDate(metric.uploaded_at)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="text-center py-12 bg-white shadow rounded-lg">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No metrics</h3>
          <p className="mt-1 text-sm text-gray-500">There are no metrics available yet.</p>
        </div>
      )}
    </div>
  );
}