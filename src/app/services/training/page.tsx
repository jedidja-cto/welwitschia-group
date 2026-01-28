import MainLayout from '@/components/layout/MainLayout';
import SectionTitle from '@/components/ui/SectionTitle';
import Button from '@/components/ui/Button';
import Link from 'next/link';

export default function TrainingPage() {
  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <SectionTitle title="Training" subtitle="Focused courses for teams and individuals" align="center" withAccent />
        <div className="max-w-3xl mx-auto text-gray-700">
          <div className="aspect-video w-full bg-gray-100 rounded-lg mb-6" aria-label="Training image placeholder" />
          <p className="text-lg mb-4">
            Short, practical sessions covering analytics, dashboards, and workflow design.
            Remote or in‑person formats available with exercises tailored to your tools.
          </p>
          <ul className="list-disc pl-5 text-brand-black/80 mb-6">
            <li>Individual modules and coaching</li>
            <li>Team sessions and internal documentation</li>
            <li>Follow‑up support for implementation</li>
          </ul>
          <div className="mt-8 flex items-center justify-center gap-4">
            <Link href="/services/training/corporate-workshop"><Button variant="primary" size="lg">Corporate workshop</Button></Link>
            <Link href="/contact"><Button variant="outline" size="lg">Request syllabus</Button></Link>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
