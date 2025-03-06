"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import AdminSidebar from './AdminSidebar';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const router = useRouter();
  const { state, hasRole } = useAuth();
  const isAdmin = hasRole('ADMIN');

  useEffect(() => {
    if (!state.loading && (!state.user || !isAdmin)) {
      router.push('/platform/dashboard');
    }
  }, [state.loading, state.user, isAdmin, router]);

  // Show nothing while loading or if not authenticated/admin
  if (state.loading || !state.user || !isAdmin) {
    return null;
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="fixed h-screen">
        <AdminSidebar />
      </div>
      <div className="flex-1 ml-20 transition-all duration-300"> {/* This margin should match the collapsed sidebar width */}
        <main className="p-6 bg-white min-h-screen shadow-sm">
          {children}
        </main>
      </div>
    </div>
  );
} 