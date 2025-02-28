import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

const Navbar: React.FC = () => {
  const { state, logout } = useAuth();
  const { isAuthenticated, user } = state;

  return (
    <nav className="bg-black text-white border-b border-gray-800">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex justify-between items-center py-5">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold tracking-tight">
              TechNexus<span className="text-gray-400">AI</span>
            </Link>
          </div>

          <div className="flex items-center space-x-8">
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
                <Link href="/dashboard" className="text-sm uppercase tracking-wider hover:text-gray-300 transition-colors">
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
                <Link
                  href="/register"
                  className="bg-white text-black px-5 py-2 text-sm uppercase tracking-wider hover:bg-gray-200 transition-colors rounded-none"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 