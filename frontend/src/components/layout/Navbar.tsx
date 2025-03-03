"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import ContactFormModal from '@/components/ui/ContactFormModal';

const Navbar: React.FC = () => {
  const { state, logout } = useAuth();
  const { isAuthenticated, user } = state;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-black text-white border-b border-gray-800">
      <ContactFormModal 
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
        heading="Schedule a Demo"
      />
      
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex justify-between items-center py-5">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold tracking-tight">
              Technexus
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button 
              onClick={toggleMenu}
              className="text-white focus:outline-none"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/solutions" className="text-sm uppercase tracking-wider hover:text-gray-300 transition-colors">
              Solutions
            </Link>
            <Link href="/platform" className="text-sm uppercase tracking-wider hover:text-gray-300 transition-colors">
              Platform
            </Link>
            <Link href="/about" className="text-sm uppercase tracking-wider hover:text-gray-300 transition-colors">
              About
            </Link>
            
            {isAuthenticated ? (
              <>
                <Link href="/platform/dashboard" className="text-sm uppercase tracking-wider hover:text-gray-300 transition-colors">
                  Dashboard
                </Link>
                <Link href="/loans" className="text-sm uppercase tracking-wider hover:text-gray-300 transition-colors">
                  My Loans
                </Link>
                {user?.role === 'admin' && (
                  <Link href="/admin" className="text-sm uppercase tracking-wider hover:text-gray-300 transition-colors">
                    Admin
                  </Link>
                )}
                <button
                  onClick={logout}
                  className="bg-white text-black px-5 py-2 text-sm uppercase tracking-wider hover:bg-gray-200 transition-colors rounded-none"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="text-sm uppercase tracking-wider hover:text-gray-300 transition-colors">
                  Login
                </Link>
                <button
                  onClick={() => setIsContactModalOpen(true)}
                  className="bg-white text-black px-5 py-2 text-sm uppercase tracking-wider hover:bg-gray-200 transition-colors rounded-none"
                >
                  Schedule a Demo
                </button>
              </>
            )}
          </div>
        </div>

        {/* Mobile menu */}
        <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'} py-4 border-t border-gray-800 animate-fadeIn`}>
          <div className="flex flex-col space-y-4">
            <Link href="/solutions" className="text-sm uppercase tracking-wider hover:text-gray-300 transition-colors">
              Solutions
            </Link>
            <Link href="/platform" className="text-sm uppercase tracking-wider hover:text-gray-300 transition-colors">
              Platform
            </Link>
            <Link href="/about" className="text-sm uppercase tracking-wider hover:text-gray-300 transition-colors">
              About
            </Link>
            
            {isAuthenticated ? (
              <>
                <Link href="/platform/dashboard" className="text-sm uppercase tracking-wider hover:text-gray-300 transition-colors">
                  Dashboard
                </Link>
                <Link href="/loans" className="text-sm uppercase tracking-wider hover:text-gray-300 transition-colors">
                  My Loans
                </Link>
                {user?.role === 'admin' && (
                  <Link href="/admin" className="text-sm uppercase tracking-wider hover:text-gray-300 transition-colors">
                    Admin
                  </Link>
                )}
                <button
                  onClick={logout}
                  className="bg-white text-black px-5 py-2 text-sm uppercase tracking-wider hover:bg-gray-200 transition-colors rounded-none inline-block w-full text-center"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="text-sm uppercase tracking-wider hover:text-gray-300 transition-colors">
                  Login
                </Link>
                <button
                  onClick={() => setIsContactModalOpen(true)}
                  className="bg-white text-black px-5 py-2 text-sm uppercase tracking-wider hover:bg-gray-200 transition-colors rounded-none inline-block w-full text-center"
                >
                  Schedule a Demo
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 