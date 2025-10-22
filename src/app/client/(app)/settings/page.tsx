import SectionTitle from '@/components/ui/SectionTitle';
import Button from '@/components/ui/Button';

export default function SettingsPage() {
  return (
    <div>
      <SectionTitle title="Settings" subtitle="Manage your profile and preferences" />

      <form className="max-w-lg mt-8 space-y-4">
        <div>
          <label className="block text-sm text-gray-600 mb-1">Name</label>
          <input className="w-full border rounded-lg px-3 py-2" placeholder="Your name" />
        </div>
        <div>
          <label className="block text-sm text-gray-600 mb-1">Company</label>
          <input className="w-full border rounded-lg px-3 py-2" placeholder="Company" />
        </div>
        <div>
          <label className="block text-sm text-gray-600 mb-1">Contact</label>
          <input className="w-full border rounded-lg px-3 py-2" placeholder="Email or phone" />
        </div>
        <Button variant="primary">Save changes</Button>
      </form>
    </div>
  );
}