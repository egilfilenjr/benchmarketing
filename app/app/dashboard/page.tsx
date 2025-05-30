import { redirect } from 'next/navigation';

export default function DashboardPage() {
  // For now, redirect to integrations since we haven't implemented the dashboard yet
  redirect('/app/integrations');
} 