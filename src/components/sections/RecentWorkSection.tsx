'use client';

import { useMemo, useState } from 'react';
import { formatDate } from '@/lib/utils';
import { getProjectsSortedByDate, getFeaturedProjects } from '@/lib/projectData';
import Link from 'next/link';
import { Project } from '@/types/project';

export default function RecentWorkSection() {
  const [order, setOrder] = useState<'Newest' | 'Oldest'>('Newest');

  // Get featured projects and sort them based on selected order
  const projects = getFeaturedProjects();

  const filtered = useMemo(() => {
    const sorted = [...projects].sort((a, b) =>
      order === 'Newest'
        ? b.completionDate.getTime() - a.completionDate.getTime()
        : a.completionDate.getTime() - b.completionDate.getTime()
    );
    // Limit to 3-4 examples for Selected Case Studies
    return sorted.slice(0, 4);
  }, [projects, order]);

  return (
    <section className="w-full bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-serif">Selected Case Studies</h2>
          <div className="flex items-center gap-3">
            <select
              value={order}
              onChange={(e) => setOrder(e.target.value as any)}
              className="border border-gray-200 rounded-md px-3 py-2 text-sm"
            >
              <option>Newest</option>
              <option>Oldest</option>
            </select>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project) => (
            <Link key={project.id} href={`/case-studies/${project.slug}`} className="premium-card group hover:-translate-y-2 transition-all duration-500">
              <div className="aspect-video w-full bg-gray-100 rounded-2xl mb-8 relative overflow-hidden shadow-inner">
                {project.images[0]?.url ? (
                  <img
                    src={project.images[0].url}
                    alt={project.images[0].alt}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-brand-black/20 font-space text-lg p-6 text-center">
                    {project.title}
                  </div>
                )}
                {/* Project type badges */}
                <div className="absolute top-4 left-4">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-mono font-bold tracking-widest uppercase ${project.projectType === 'client' ? 'bg-wg-green text-white' : 'bg-wg-orange text-white'
                    }`}>
                    {project.projectType === 'client' ? 'Client Project' : 'Portfolio Piece'}
                  </span>
                </div>
              </div>
              <div className="flex flex-col h-full">
                <div className="text-2xl font-space font-medium mb-3 group-hover:text-wg-green transition-colors">{project.title}</div>
                <div className="text-brand-black/60 mb-6 flex-grow leading-relaxed">{project.description}</div>
                <div className="flex items-center justify-between text-xs font-mono text-brand-black/40 pt-4 border-t border-gray-100">
                  <span>{project.category}</span>
                  <span className="group-hover:translate-x-1 transition-transform">EXPLORE Case Study →</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
