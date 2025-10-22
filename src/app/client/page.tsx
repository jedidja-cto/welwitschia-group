import { redirect } from 'next/navigation';

export default function ClientIndexPage() {
  // Redirect root client portal path to login. After login, the app navigates to dashboard.
  redirect('/client/login');
}