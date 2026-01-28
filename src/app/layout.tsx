import './globals.css';
import type { Metadata } from 'next';
import { Space_Grotesk, Inter, JetBrains_Mono } from 'next/font/google';
import Script from 'next/script';

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-space' });
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' });

export const metadata: Metadata = {
  title: {
    default: 'Welwitschia Data',
    template: '%s | Welwitschia Data',
  },
  description: 'Data, digital products, and analytics for African SMEs',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  icons: [{ url: '/logo.svg', rel: 'icon' }],
  openGraph: {
    title: 'Welwitschia Data',
    description: 'Data, digital products, and analytics for African SMEs',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    siteName: 'Welwitschia Data',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Welwitschia Data',
    description: 'Data, digital products, and analytics for African SMEs',
  },
  alternates: {
    canonical: '/',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#1A8452',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${spaceGrotesk.variable} ${mono.variable} font-sans antialiased`}>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only fixed top-2 left-2 z-50 px-3 py-2 rounded-md bg-brand-red text-white"
        >
          Skip to content
        </a>
        {children}
        <Script id="org-jsonld" type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'Welwitschia Data',
            url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
            logo: '/logo.svg',
          })}
        </Script>
      </body>
    </html>
  );
}
