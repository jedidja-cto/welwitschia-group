import RedirectPage from '@/components/RedirectPage';

export default function WebsiteAppCategoryRedirect() {
  return (
    <RedirectPage
      destination="/services#digital-products"
      title="Page Moved"
      message="The Website & App category page has been moved to our Services section."
    />
  );
}