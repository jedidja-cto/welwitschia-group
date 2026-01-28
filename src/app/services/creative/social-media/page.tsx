import MainLayout from '@/components/layout/MainLayout';
import SectionTitle from '@/components/ui/SectionTitle';
import Button from '@/components/ui/Button';
import Link from 'next/link';

export default function SocialMediaDesignPage() {
  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <SectionTitle title="Social Media Design" subtitle="Consistent, on‑brand posts and campaigns" align="center" withAccent={true} />
        <div className="max-w-3xl mx-auto text-gray-700">
          <div className="aspect-video w-full bg-gray-100 rounded-lg mb-6" aria-label="Social post preview placeholder" />
          <p className="text-lg mb-4">
            We design social media assets aligned to your brand kit — single posts, series, and monthly packs.
            Set quantities and estimate costs; add content creation if needed.
          </p>
          <div className="mt-8 flex items-center justify-center gap-4">
            <Link href="/pricing"><Button variant="primary" size="lg">Estimate pricing</Button></Link>
            <Link href="/templates"><Button variant="outline" size="lg">Explore templates</Button></Link>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
