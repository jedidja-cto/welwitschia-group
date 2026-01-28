import RedirectPage from '@/components/RedirectPage';

export default function CreativeCategoryRedirect() {
  return (
    <RedirectPage
      destination="/services#creative"
      title="Page Moved"
      message="The Creative category page has been moved to our Services section."
    />
  );
}