import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

const AdminSidebar: React.FC = () => {
  const [expanded, setExpanded] = useState(false);
  const pathname = usePathname();
  const { state } = useAuth();
  const { user } = state;

  const toggleSidebar = () => {
    setExpanded(!expanded);
  };

  // Check if the current path matches the given path
  const isActive = (path: string) => {
    return pathname?.startsWith(path);
  };

  // Only render if user is admin
  if (!user || user.role !== 'admin') {
    return null;
  }

  return (
    <div 
      className={`bg-gray-900 text-white transition-all duration-300 ease-in-out h-screen fixed left-0 top-0 z-30 ${
        expanded ? 'w-64' : 'w-20'
      }`}
    >
      <div className="flex justify-between items-center p-4 border-b border-gray-800">
        <h2 className={`font-bold text-xl ${expanded ? 'block' : 'hidden'}`}>Admin Panel</h2>
        <button 
          onClick={toggleSidebar}
          className="p-2 rounded-md hover:bg-gray-700 focus:outline-none"
          aria-label={expanded ? "Collapse sidebar" : "Expand sidebar"}
        >
          {expanded ? (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
            </svg>
          )}
        </button>
      </div>

      <nav className="mt-6">
        <ul className="space-y-2 px-2">
          <li>
            <Link 
              href="/platform/admin"
              className={`flex items-center p-3 rounded-md transition-colors ${
                isActive('/platform/admin') && !isActive('/platform/admin/') 
                  ? 'bg-blue-700' 
                  : 'hover:bg-gray-800'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span className={`ml-3 ${expanded ? 'block' : 'hidden'}`}>Dashboard</span>
            </Link>
          </li>
          <li>
            <Link 
              href="/platform/admin/users"
              className={`flex items-center p-3 rounded-md transition-colors ${
                isActive('/platform/admin/users') 
                  ? 'bg-blue-700' 
                  : 'hover:bg-gray-800'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              <span className={`ml-3 ${expanded ? 'block' : 'hidden'}`}>Users</span>
            </Link>
          </li>
          <li>
            <Link 
              href="/platform/admin/loans"
              className={`flex items-center p-3 rounded-md transition-colors ${
                isActive('/platform/admin/loans') 
                  ? 'bg-blue-700' 
                  : 'hover:bg-gray-800'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <span className={`ml-3 ${expanded ? 'block' : 'hidden'}`}>Loans</span>
            </Link>
          </li>
          <li>
            <Link 
              href="/platform/admin/payments"
              className={`flex items-center p-3 rounded-md transition-colors ${
                isActive('/platform/admin/payments') 
                  ? 'bg-blue-700' 
                  : 'hover:bg-gray-800'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span className={`ml-3 ${expanded ? 'block' : 'hidden'}`}>Payments</span>
            </Link>
          </li>
          <li>
            <Link 
              href="/platform/admin/reports"
              className={`flex items-center p-3 rounded-md transition-colors ${
                isActive('/platform/admin/reports') 
                  ? 'bg-blue-700' 
                  : 'hover:bg-gray-800'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              <span className={`ml-3 ${expanded ? 'block' : 'hidden'}`}>Reports</span>
            </Link>
          </li>
          <li>
            <Link 
              href="/platform/admin/settings"
              className={`flex items-center p-3 rounded-md transition-colors ${
                isActive('/platform/admin/settings') 
                  ? 'bg-blue-700' 
                  : 'hover:bg-gray-800'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className={`ml-3 ${expanded ? 'block' : 'hidden'}`}>Settings</span>
            </Link>
          </li>
          <li>
            <Link 
              href="/platform/admin/audit"
              className={`flex items-center p-3 rounded-md transition-colors ${
                isActive('/platform/admin/audit') 
                  ? 'bg-blue-700' 
                  : 'hover:bg-gray-800'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span className={`ml-3 ${expanded ? 'block' : 'hidden'}`}>Audit</span>
            </Link>
          </li>
        </ul>
      </nav>

      <div className="absolute bottom-0 w-full border-t border-gray-800 p-4">
        <Link 
          href="/platform/dashboard"
          className="flex items-center p-2 rounded-md hover:bg-gray-800 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 17l-5-5m0 0l5-5m-5 5h12" />
          </svg>
          <span className={`ml-3 ${expanded ? 'block' : 'hidden'}`}>Back to Platform</span>
        </Link>
      </div>
    </div>
  );
};

export default AdminSidebar; 