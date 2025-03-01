"use client";

import React, { useState, useEffect } from 'react';
import PlatformHeader from './PlatformHeader';
import Sidebar from './Sidebar';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

interface PlatformLayoutProps {
  children: React.ReactNode;
}

const PlatformLayout: React.FC<PlatformLayoutProps> = ({ children }) => {
  const { state } = useAuth();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Close mobile menu when screen size changes
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Redirect to login if not authenticated
  React.useEffect(() => {
    if (!state.loading && !state.isAuthenticated) {
      router.push('/login');
    }
  }, [state.loading, state.isAuthenticated, router]);

  if (state.loading || !state.isAuthenticated) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <PlatformHeader />
      
      {/* Mobile menu toggle */}
      <div className="md:hidden p-4 bg-gray-50">
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none"
        >
          <span className="sr-only">Open sidebar</span>
          <svg 
            className="h-6 w-6" 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} 
            />
          </svg>
        </button>
      </div>
      
      <div className="flex flex-1 overflow-hidden">
        {/* Mobile sidebar */}
        <div 
          className={`md:hidden fixed inset-0 z-40 flex ${
            isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
          } transition-transform duration-300 ease-in-out`}
        >
          <div className="relative flex-1 flex flex-col max-w-xs w-full">
            <Sidebar />
          </div>
          <div 
            className="opacity-75 fixed inset-0 bg-gray-600"
            onClick={() => setIsMobileMenuOpen(false)}
          ></div>
        </div>
        
        {/* Desktop sidebar */}
        <div className="hidden md:block">
          <Sidebar />
        </div>
        
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default PlatformLayout; 