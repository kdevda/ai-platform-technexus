import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

const Navbar: React.FC = () => {
  const { state, logout } = useAuth();
  const { isAuthenticated, user } = state;

  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold">
              LoanManager
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <Link href="/dashboard" className="hover:text-blue-200">
                  Dashboard
                </Link>
                <Link href="/loans" className="hover:text-blue-200">
                  My Loans
                </Link>
                {user?.role === 'admin' && (
                  <Link href="/admin" className="hover:text-blue-200">
                    Admin
                  </Link>
                )}
                <button
                  onClick={logout}
                  className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-blue-100"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="hover:text-blue-200">
                  Login
                </Link>
                <Link
                  href="/register"
                  className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-blue-100"
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