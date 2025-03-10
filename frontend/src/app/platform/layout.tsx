'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AuthProvider } from '@/context/AuthContext';
import { LoanProvider } from '@/context/LoanContext';
import Sidebar from '@/components/platform/Sidebar';
import PlatformHeader from '@/components/platform/PlatformHeader';
import dynamic from 'next/dynamic';
import { useAuth } from '@/context/AuthContext';

// Dynamic import for email bubble to avoid SSR issues
const EmailBubble = dynamic(
  () => import('@/components/email/EmailBubble'),
  { ssr: false }
);

// Wrap content with authentication logic
const PlatformContent: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { state } = useAuth();
  const router = useRouter();
  const [authChecked, setAuthChecked] = useState(false);
  const [redirecting, setRedirecting] = useState(false);
  
  // Redirect to login if not authenticated
  useEffect(() => {
    // Don't redirect during initial loading
    if (state.loading) {
      return;
    }

    // If auth check is complete and user is not authenticated
    if (!state.isAuthenticated) {
      console.log('User not authenticated, preparing to redirect to login...');
      
      // Prevent multiple redirects 
      if (!redirecting) {
        setRedirecting(true);
        
        // Use localStorage to check if we keep redirecting in a loop
        const now = new Date().getTime();
        const lastRedirect = parseInt(localStorage.getItem('lastLoginRedirect') || '0');
        const timeSinceLastRedirect = now - lastRedirect;
        
        // If we've redirected within the last 3 seconds, something is wrong
        if (lastRedirect && timeSinceLastRedirect < 3000) {
          console.error('Redirect loop detected! Not redirecting to prevent infinite loop.');
          console.log('Auth state:', { 
            isAuthenticated: state.isAuthenticated, 
            loading: state.loading,
            hasUser: !!state.user,
            hasToken: !!(state.user?.token),
          });
          return;
        }
        
        // Set redirect timestamp
        localStorage.setItem('lastLoginRedirect', now.toString());
        
        // Short delay to avoid immediate redirect
        setTimeout(() => {
          console.log('Redirecting to login page...');
          router.push('/login');
        }, 500);
      }
    } else {
      // User is authenticated
      setAuthChecked(true);
      setRedirecting(false);
      console.log('User authenticated:', state.user?.email);
    }
  }, [state.isAuthenticated, state.loading, router, redirecting]);

  // Show loading spinner during initial auth check
  if (state.loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center">
          <div className="h-16 w-16 animate-spin rounded-full border-4 border-gray-200 border-t-gray-700"></div>
          <p className="mt-4 text-gray-600">Checking authentication...</p>
        </div>
      </div>
    );
  }

  // If authentication is being checked or user is being redirected, show loading
  if ((!authChecked && !state.isAuthenticated) || redirecting) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center">
          <div className="h-16 w-16 animate-spin rounded-full border-4 border-gray-200 border-t-gray-700"></div>
          <p className="mt-4 text-gray-600">Redirecting to login...</p>
        </div>
      </div>
    );
  }

  // User is authenticated, render content
  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <PlatformHeader />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <div className="flex-1 overflow-auto bg-gray-50">
          {children}
        </div>
        <EmailBubble />
      </div>
    </div>
  );
};

export default function PlatformLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <LoanProvider>
        <PlatformContent>
          {children}
        </PlatformContent>
      </LoanProvider>
    </AuthProvider>
  );
} 