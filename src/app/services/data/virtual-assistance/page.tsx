import RedirectPage from '@/components/RedirectPage';

export default function VirtualAssistanceRedirect() {
  return (
    <RedirectPage
      destination="/services#data-analytics"
      title="Service Moved"
      message="Virtual Assistance services are now part of our Data & Analytics services section."
    />
  );
}