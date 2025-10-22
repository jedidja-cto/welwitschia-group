'use client';

import React, { useState, useEffect } from 'react';
import { getClientStats, getClientProjects, getClientTasks } from '@/lib/clientApi';
import type { ClientStats, Project, Task } from '@/lib/clientApi';
import { 
  DocumentTextIcon, 
  FolderIcon, 
  DocumentDuplicateIcon, 
  CheckCircleIcon,
  ClockIcon,
  BanknotesIcon,
  ExclamationCircleIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';

export default function DashboardPage() {
  const [stats, setStats] = useState<ClientStats | null>(null);
  const [recentProjects, setRecentProjects] = useState<Project[]>([]);
  const [upcomingTasks, setUpcomingTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function checkAuth() {
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        router.push('/client/login');
        return;
      }
      loadDashboardData();
    }
    
    checkAuth();
    
    async function loadDashboardData() {
      try {
        const statsData = await getClientStats();
        const projectsData = await getClientProjects();
        const tasksData = await getClientTasks();
        
        setStats(statsData);
        setRecentProjects(projectsData.slice(0, 3));
        
        // Filter for incomplete tasks and sort by due date
        const pendingTasks = tasksData
          .filter(task => !task.completed)
          .sort((a, b) => {
            if (!a.due_date) return 1;
            if (!b.due_date) return -1;
            return new Date(a.due_date).getTime() - new Date(b.due_date).getTime();
          })
          .slice(0, 5);
          
        setUpcomingTasks(pendingTasks);
      } catch (error) {
        console.error('Error loading dashboard data:', error);
      } finally {
        setLoading(false);
      }
    }
    
    loadDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
      </div>
    );
  }

  const statCards = [
    { 
      name: 'Total Projects', 
      value: stats?.totalProjects || 0, 
      icon: FolderIcon, 
      color: 'bg-green-100 text-green-800',
      href: '/client/dashboard/projects'
    },
    { 
      name: 'Active Projects', 
      value: stats?.activeProjects || 0, 
      icon: FolderIcon, 
      color: 'bg-blue-100 text-blue-800',
      href: '/client/dashboard/projects'
    },
    { 
      name: 'Total Invoices', 
      value: stats?.totalInvoices || 0, 
      icon: DocumentTextIcon, 
      color: 'bg-purple-100 text-purple-800',
      href: '/client/dashboard/invoices'
    },
    { 
      name: 'Pending Invoices', 
      value: stats?.pendingInvoices || 0, 
      icon: BanknotesIcon, 
      color: 'bg-yellow-100 text-yellow-800',
      href: '/client/dashboard/invoices'
    },
    { 
      name: 'Total Assets', 
      value: stats?.totalAssets || 0, 
      icon: DocumentDuplicateIcon, 
      color: 'bg-indigo-100 text-indigo-800',
      href: '/client/dashboard/assets'
    },
    { 
      name: 'Completed Tasks', 
      value: stats?.completedTasks || 0, 
      icon: CheckCircleIcon, 
      color: 'bg-green-100 text-green-800',
      href: '/client/dashboard/tasks'
    },
    { 
      name: 'Pending Tasks', 
      value: stats?.pendingTasks || 0, 
      icon: ClockIcon, 
      color: 'bg-orange-100 text-orange-800',
      href: '/client/dashboard/tasks'
    }
  ];

  function formatDate(dateString: string | null) {
    if (!dateString) return 'No date set';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900">Dashboard Overview</h1>
      
      {/* Stats Grid */}
      <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {statCards.map((stat) => (
          <Link
            key={stat.name}
            href={stat.href}
            className="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow duration-300"
          >
            <div className="p-5">
              <div className="flex items-center">
                <div className={`flex-shrink-0 rounded-md p-3 ${stat.color}`}>
                  <stat.icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">{stat.name}</dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">{stat.value}</div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Recent Projects */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
            <h2 className="text-lg font-medium text-gray-900">Recent Projects</h2>
            <Link href="/client/dashboard/projects" className="text-sm text-green-600 hover:text-green-800">
              View all
            </Link>
          </div>
          <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
            {recentProjects.length > 0 ? (
              <ul className="divide-y divide-gray-200">
                {recentProjects.map((project) => (
                  <li key={project.id} className="py-4">
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col">
                        <Link 
                          href={`/client/dashboard/projects/${project.id}`}
                          className="text-sm font-medium text-gray-900 hover:text-green-600"
                        >
                          {project.title}
                        </Link>
                        <p className="text-sm text-gray-500 mt-1">
                          {project.description?.substring(0, 100) || 'No description'}
                          {project.description && project.description.length > 100 ? '...' : ''}
                        </p>
                      </div>
                      <div className="flex flex-col items-end">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          project.status === 'active' ? 'bg-green-100 text-green-800' :
                          project.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                          project.status === 'on-hold' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {project.status || 'No status'}
                        </span>
                        {project.due_date && (
                          <span className="text-xs text-gray-500 mt-2">
                            Due: {formatDate(project.due_date)}
                          </span>
                        )}
                      </div>
                    </div>
                    {project.progress !== null && (
                      <div className="mt-2">
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div 
                            className="bg-green-600 h-2.5 rounded-full" 
                            style={{ width: `${project.progress}%` }}
                          ></div>
                        </div>
                        <span className="text-xs text-gray-500 mt-1">{project.progress}% complete</span>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-center py-4">
                <p className="text-gray-500">No projects found</p>
              </div>
            )}
          </div>
        </div>

        {/* Upcoming Tasks */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
            <h2 className="text-lg font-medium text-gray-900">Upcoming Tasks</h2>
            <Link href="/client/dashboard/tasks" className="text-sm text-green-600 hover:text-green-800">
              View all
            </Link>
          </div>
          <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
            {upcomingTasks.length > 0 ? (
              <ul className="divide-y divide-gray-200">
                {upcomingTasks.map((task) => {
                  const isOverdue = task.due_date && new Date(task.due_date) < new Date();
                  
                  return (
                    <li key={task.id} className="py-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-start">
                          <div className={`flex-shrink-0 h-5 w-5 ${
                            isOverdue ? 'text-red-500' : 'text-gray-400'
                          }`}>
                            {isOverdue ? (
                              <ExclamationCircleIcon className="h-5 w-5" />
                            ) : (
                              <ClockIcon className="h-5 w-5" />
                            )}
                          </div>
                          <div className="ml-3">
                            <p className="text-sm font-medium text-gray-900">{task.title}</p>
                            {task.due_date && (
                              <p className={`text-xs ${
                                isOverdue ? 'text-red-500 font-medium' : 'text-gray-500'
                              }`}>
                                {isOverdue ? 'Overdue: ' : 'Due: '}
                                {formatDate(task.due_date)}
                              </p>
                            )}
                          </div>
                        </div>
                        <div>
                          <input
                            type="checkbox"
                            className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                            checked={task.completed || false}
                            readOnly
                          />
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <div className="text-center py-4">
                <p className="text-gray-500">No upcoming tasks</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}