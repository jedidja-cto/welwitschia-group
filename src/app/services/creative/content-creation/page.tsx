import RedirectPage from '@/components/RedirectPage';

export default function ContentCreationRedirect() {
  return (
    <RedirectPage
      destination="/services#creative"
      title="Service Moved"
      message="Content Creation services are now part of our Creative services section."
    />
  );
}