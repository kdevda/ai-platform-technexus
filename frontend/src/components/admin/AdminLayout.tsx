"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import AdminSidebar from './AdminSidebar';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const router = useRouter();
  const { state, hasRole } = useAuth();
  // Track if we've already checked admin status
  const [adminChecked, setAdminChecked] = useState(false);
  // Cache the admin status
  const [isAdmin, setIsAdmin] = useState(false);
  
  // Only run the authentication check once when the component mounts
  // or when auth state changes
  useEffect(() => {
    if (!adminChecked) {
      const adminStatus = hasRole('ADMIN');
      console.log('Admin access check result:', adminStatus);
      setIsAdmin(adminStatus);
      setAdminChecked(true);
      
      if (!state.loading && !adminStatus) {
        console.log('Redirecting: Not an admin');
        router.push('/login');
      }
    }
  }, [state.loading, state.user, hasRole, router, adminChecked]);

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