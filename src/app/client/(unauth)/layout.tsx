import MainLayout from '@/components/layout/MainLayout';

export default function ClientPublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <MainLayout>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 md:py-20">
        {children}
      </div>
    </MainLayout>
  );
}