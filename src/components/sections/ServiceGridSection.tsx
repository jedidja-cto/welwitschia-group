'use client';

import { useMemo, useState } from 'react';

type Service = {
  id: string;
  name: string;
  category: 'Digital Products' | 'Data & Analytics' | 'Creative';
  href: string;
};

const services: Service[] = [
  { id: 's1', name: 'Website Redesign', category: 'Digital Products', href: '/services/website-design' },
  { id: 's2', name: 'Custom Web App', category: 'Digital Products', href: '/services/web-app-design' },
  { id: 's3', name: 'Analytics Dashboard', category: 'Data & Analytics', href: '/services/dashboard-design' },
  { id: 's4', name: 'Data Science Model', category: 'Data & Analytics', href: '/services/data/data-science' },
  { id: 's5', name: 'Brand Kit', category: 'Creative', href: '/services/creative/branding' },
];

export default function ServiceGridSection() {
  const [category, setCategory] = useState<'All' | Service['category']>('All');

  const filtered = useMemo(() => {
    return services.filter((s) => {
      const c = category === 'All' || s.category === category;
      return c;
    });
  }, [category]);

  return (
    <section className="w-full bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-serif">Services</h2>
        <div className="flex items-center gap-3">
          <select
              value={category}
              onChange={(e) => setCategory(e.target.value as any)}
              className="border border-gray-200 rounded-md px-3 py-2 text-sm"
            >
              <option>All</option>
              <option>Digital Products</option>
              <option>Data & Analytics</option>
              <option>Creative</option>
            </select>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((s) => (
            <a key={s.id} href={s.href} className="card">
              <div className="text-sm text-brand-black/60">{s.category}</div>
              <div className="mt-1 font-medium">{s.name}</div>
              <span className="mt-3 inline-block text-sm text-brand-red">Explore →</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
