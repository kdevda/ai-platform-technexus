'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function LegacyDashboardRedirect() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the new platform dashboard
    router.replace('/platform/dashboard');
  }, [router]);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
        <p className="text-gray-600">Redirecting to the new dashboard...</p>
      </div>
    </div>
  );
} 