'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    try {
      const consent = localStorage.getItem('cookieConsent');
      setVisible(consent !== 'accepted');
    } catch {
      setVisible(true);
    }
  }, []);
  if (!visible) return null;
  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-6 md:right-auto z-50 bg-white border border-gray-200 shadow-xl rounded-md p-4 max-w-xl">
      <div className="text-sm text-brand-black/80">
        We use cookies for basic analytics and to improve your experience. See our{' '}
        <Link href="/legal/privacy" className="text-brand-red hover:underline">Privacy Policy</Link>.
      </div>
      <div className="mt-3 flex items-center gap-3">
        <button
          className="px-3 py-2 text-sm rounded-md bg-brand-red text-white hover:bg-brand-black transition-colors"
          onClick={() => {
            try {
              localStorage.setItem('cookieConsent', 'accepted');
            } catch {}
            setVisible(false);
          }}
        >
          Accept
        </button>
        <button
          className="px-3 py-2 text-sm rounded-md border border-gray-300 hover:bg-gray-50 transition-colors"
          onClick={() => setVisible(false)}
        >
          Dismiss
        </button>
      </div>
    </div>
  );
}
