import React from 'react';
import clsx from 'clsx';

export default function StatusBadge({ status }: { status: 'active' | 'pending' | 'paused' | 'completed' }) {
  const styles = {
    active: 'bg-wg-green/10 text-wg-green',
    pending: 'bg-yellow-100 text-yellow-700',
    paused: 'bg-gray-200 text-gray-700',
    completed: 'bg-green-100 text-green-700',
  }[status];

  return (
    <span className={clsx('px-2 py-1 rounded-full text-xs font-medium', styles)}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}