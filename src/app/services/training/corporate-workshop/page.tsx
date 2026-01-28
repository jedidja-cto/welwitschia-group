import RedirectPage from '@/components/RedirectPage';

export default function CorporateWorkshopRedirect() {
  return (
    <RedirectPage
      destination="/services#data-analytics"
      title="Service Moved"
      message="Corporate Workshop services are now part of our Data & Analytics services section."
    />
  );
}