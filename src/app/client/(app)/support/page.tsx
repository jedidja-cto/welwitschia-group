import SectionTitle from '@/components/ui/SectionTitle';
import Button from '@/components/ui/Button';
import Link from 'next/link';

export default function SupportPage() {
  return (
    <div>
      <SectionTitle title="Support" subtitle="Get help from our team" />
      <div className="card mt-8">
        <p className="text-gray-700">Send us a message or reach out directly via WhatsApp/email.</p>
        <div className="mt-4 flex gap-3">
          <Link href="/contact"><Button variant="secondary">Contact Form</Button></Link>
          <a href="mailto:support@welwitschia.group"><Button>support@welwitschia.group</Button></a>
        </div>
      </div>
    </div>
  );
}