import ClientLayout from '@/components/client/ClientLayout';
import ProtectedRoute from '@/components/client/ProtectedRoute';

export default function ClientAppLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute>
      <ClientLayout>{children}</ClientLayout>
    </ProtectedRoute>
  );
}