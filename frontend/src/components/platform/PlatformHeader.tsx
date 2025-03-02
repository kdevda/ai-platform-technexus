"use client";

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

const PlatformHeader: React.FC = () => {
  const { state, logout, hasRole } = useAuth();
  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  // Get user initials for avatar fallback
  const getUserInitials = () => {
    if (!state.user?.name) return '?';
    
    const nameParts = state.user.name.split(' ');
    if (nameParts.length === 1) return nameParts[0].charAt(0).toUpperCase();
    
    return (nameParts[0].charAt(0) + nameParts[nameParts.length - 1].charAt(0)).toUpperCase();
  };

  // Check if user has admin role
  const isAdmin = hasRole('ADMIN');

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="flex justify-between items-center px-6 py-3">
        {/* Logo */}
        <Link href="/platform" className="flex items-center">
          <span className="text-xl font-bold text-black">Technexus</span>
        </Link>

        {/* Right side - Avatar and user info */}
        <div className="relative" ref={dropdownRef}>
          <button
            className="flex items-center focus:outline-none"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <div className="mr-3 text-right hidden sm:block">
              <p className="text-sm font-medium text-gray-900">{state.user?.name}</p>
              <p className="text-xs text-gray-500">{state.user?.email}</p>
            </div>
            
            {/* Avatar - either image or initials */}
            <div className="h-10 w-10 rounded-full bg-black text-white flex items-center justify-center">
              {getUserInitials()}
            </div>
          </button>

          {/* Dropdown menu */}
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
              <Link 
                href="/platform/profile" 
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={() => setDropdownOpen(false)}
              >
                My Profile
              </Link>
              
              {isAdmin && (
                <>
                  <Link 
                    href="/platform/admin" 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Admin Panel
                  </Link>
                  <Link 
                    href="/admin/dashboard" 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Admin Dashboard
                  </Link>
                </>
              )}
              
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default PlatformHeader; 