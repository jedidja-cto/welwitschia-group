'use client';

import React, { useState, useEffect } from 'react';
import { getProjectDetails, getProjectTasks, getProjectInvoices, getProjectMetrics } from '@/lib/clientApi';
import type { Project, Task, Invoice, Metric } from '@/lib/clientApi';
import { useParams } from 'next/navigation';
import Link from 'next/link';

export default function ProjectDetailPage() {
  const params = useParams();
  const projectId = params.id as string;
  
  const [project, setProject] = useState<Project | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [metrics, setMetrics] = useState<Metric[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProjectData() {
      try {
        const [projectData, tasksData, invoicesData, metricsData] = await Promise.all([
          getProjectDetails(projectId),
          getProjectTasks(projectId),
          getProjectInvoices(projectId),
          getProjectMetrics(projectId)
        ]);
        
        setProject(projectData);
        setTasks(tasksData);
        setInvoices(invoicesData);
        setMetrics(metricsData);
      } catch (error) {
        console.error('Error loading project data:', error);
      } finally {
        setLoading(false);
      }
    }
    
    loadProjectData();
  }, [projectId]);

  function formatDate(dateString: string | null) {
    if (!dateString) return 'Not set';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }

  function getStatusColor(status: string | null) {
    switch (status?.toLowerCase()) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'on-hold':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="text-center py-12">
        <h3 className="mt-2 text-lg font-medium text-gray-900">Project not found</h3>
        <p className="mt-1 text-sm text-gray-500">The project you're looking for doesn't exist or you don't have access to it.</p>
        <div className="mt-6">
          <Link href="/client/dashboard/projects" className="text-green-600 hover:text-green-500">
            ← Back to projects
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <Link href="/client/dashboard/projects" className="text-green-600 hover:text-green-500">
          ← Back to projects
        </Link>
      </div>
      
      <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-6">
        <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
          <div>
            <h3 className="text-lg leading-6 font-medium text-gray-900">{project.title}</h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">{project.description}</p>
          </div>
          <span className={`inline-flex rounded-full px-3 py-1 text-sm font-semibold ${getStatusColor(project.status)}`}>
            {project.status}
          </span>
        </div>
        <div className="border-t border-gray-200">
          <dl>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Progress</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                <div className="w-full bg-gray-200 rounded-full h-2.5 max-w-[300px]">
                  <div 
                    className="bg-green-600 h-2.5 rounded-full" 
                    style={{ width: `${project.progress || 0}%` }}
                  ></div>
                </div>
                <span className="text-sm text-gray-500 mt-1">{project.progress || 0}%</span>
              </dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Due Date</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{formatDate(project.due_date)}</dd>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Budget</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {project.budget ? `$${project.budget.toLocaleString()}` : 'Not set'}
              </dd>
            </div>
          </dl>
        </div>
      </div>

      {/* Tasks Section */}
      <div className="bg-white shadow sm:rounded-lg mb-6">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Tasks</h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">Project tasks and their status</p>
        </div>
        <div className="border-t border-gray-200">
          {tasks.length > 0 ? (
            <ul className="divide-y divide-gray-200">
              {tasks.map((task) => (
                <li key={task.id} className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={task.completed || false}
                        readOnly
                        className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                      />
                      <p className={`ml-3 text-sm ${task.completed ? 'text-gray-400 line-through' : 'text-gray-900'}`}>
                        {task.title}
                      </p>
                    </div>
                    <div className="text-sm text-gray-500">
                      Due: {formatDate(task.due_date)}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-center py-4">
              <p className="text-sm text-gray-500">No tasks for this project</p>
            </div>
          )}
        </div>
      </div>

      {/* Invoices Section */}
      <div className="bg-white shadow sm:rounded-lg mb-6">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Invoices</h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">Project invoices and payment status</p>
        </div>
        <div className="border-t border-gray-200">
          {invoices.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Invoice ID
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Issued Date
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {invoices.map((invoice) => (
                    <tr key={invoice.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        #{invoice.id.substring(0, 8)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        ${invoice.amount?.toLocaleString() || '0'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          invoice.status === 'paid' ? 'bg-green-100 text-green-800' : 
                          invoice.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                          'bg-red-100 text-red-800'
                        }`}>
                          {invoice.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(invoice.issued_at)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-4">
              <p className="text-sm text-gray-500">No invoices for this project</p>
            </div>
          )}
        </div>
      </div>

      {/* Metrics Section */}
      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Metrics</h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">Key performance indicators</p>
        </div>
        <div className="border-t border-gray-200">
          {metrics.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Metric
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Value
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
                        {formatDate(metric.uploaded_at)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-4">
              <p className="text-sm text-gray-500">No metrics for this project</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}