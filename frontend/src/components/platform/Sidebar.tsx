"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

// Icons (using simple div placeholders - replace with actual icons in production)
const DashboardIcon = () => <div className="w-5 h-5 mr-3 bg-current opacity-70 rounded-sm"></div>;
const LoansIcon = () => <div className="w-5 h-5 mr-3 bg-current opacity-70 rounded-sm"></div>;
const PaymentsIcon = () => <div className="w-5 h-5 mr-3 bg-current opacity-70 rounded-sm"></div>;
const SettingsIcon = () => <div className="w-5 h-5 mr-3 bg-current opacity-70 rounded-sm"></div>;

const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const { state } = useAuth();
  const [expanded, setExpanded] = useState(false);
  
  const toggleSidebar = () => {
    setExpanded(!expanded);
  };
  
  const isActive = (path: string) => {
    return pathname === path || pathname?.startsWith(`${path}/`);
  };

  const navItems = [
    { 
      name: 'Dashboard', 
      path: '/platform/dashboard', 
      icon: <DashboardIcon /> 
    },
    { 
      name: 'Loans', 
      path: '/platform/loans', 
      icon: <LoansIcon /> 
    },
    { 
      name: 'Payments', 
      path: '/platform/payments', 
      icon: <PaymentsIcon /> 
    },
    { 
      name: 'Settings', 
      path: '/platform/settings', 
      icon: <SettingsIcon /> 
    }
  ];

  // Add admin section if user is admin
  const adminItems = state.user?.role === 'admin' ? [
    { 
      name: 'User Management', 
      path: '/platform/admin/users'
    },
    { 
      name: 'Loan Management', 
      path: '/platform/admin/loans'
    }
  ] : [];

  return (
    <div className={`transition-all duration-300 ease-in-out ${expanded ? 'w-64' : 'w-16'} bg-gray-800 text-white h-full flex-shrink-0 relative`}>
      {/* Toggle button */}
      <button 
        onClick={toggleSidebar}
        className="absolute -right-3 top-4 bg-gray-800 rounded-full p-1 shadow-md z-10"
        aria-label={expanded ? "Collapse sidebar" : "Expand sidebar"}
      >
        <div className="w-5 h-5 flex items-center justify-center text-white">
          {expanded ? (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
              <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
              <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
            </svg>
          )}
        </div>
      </button>
      
      <div className="py-4 overflow-hidden">
        <div className={`px-4 mb-6 ${expanded ? 'block' : 'hidden'}`}>
          <h2 className="text-lg font-semibold">Platform</h2>
        </div>
        
        <nav className="mt-5">
          <ul>
            {navItems.map((item) => (
              <li key={item.path} className="mb-2">
                <Link 
                  href={item.path}
                  className={`flex items-center px-4 py-2 text-sm ${
                    isActive(item.path)
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-300 hover:bg-gray-700'
                  } ${!expanded ? 'justify-center' : ''}`}
                  title={!expanded ? item.name : ''}
                >
                  {item.icon}
                  {expanded && item.name}
                </Link>
              </li>
            ))}
          </ul>
          
          {/* Admin section */}
          {adminItems.length > 0 && (
            <>
              <div className={`mt-8 mb-4 px-4 ${expanded ? 'block' : 'hidden'}`}>
                <h3 className="text-xs uppercase tracking-wider text-gray-400">Admin</h3>
              </div>
              <ul>
                {adminItems.map((item) => (
                  <li key={item.path} className="mb-2">
                    <Link 
                      href={item.path}
                      className={`flex items-center px-4 py-2 text-sm ${
                        isActive(item.path)
                          ? 'bg-gray-900 text-white'
                          : 'text-gray-300 hover:bg-gray-700'
                      } ${!expanded ? 'justify-center' : ''}`}
                      title={!expanded ? item.name : ''}
                    >
                      {expanded ? item.name : 'A'}
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          )}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar; 