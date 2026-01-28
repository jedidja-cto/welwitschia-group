import RedirectPage from '@/components/RedirectPage';

export default function DivisionsRedirect() {
  return (
    <RedirectPage
      destination="/services"
      title="Page Moved"
      message="Our divisions have been restructured. You can find all our services in our Services section."
    />
  );
}