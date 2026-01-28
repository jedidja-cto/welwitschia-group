import RedirectPage from '@/components/RedirectPage';

export default function TrainingCategoryRedirect() {
  return (
    <RedirectPage
      destination="/services#data-analytics"
      title="Page Moved"
      message="The Training category page has been moved to our Services section."
    />
  );
}