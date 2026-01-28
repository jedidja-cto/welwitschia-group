import RedirectPage from '@/components/RedirectPage';

export default function CybersecurityRedirect() {
  return (
    <RedirectPage
      destination="/services#data-analytics"
      title="Service Moved"
      message="Cybersecurity services are now part of our Data & Analytics services section."
    />
  );
}