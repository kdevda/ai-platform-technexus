"use client";

import React from 'react';
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
    <aside className="w-64 bg-gray-800 text-white h-full flex-shrink-0">
      <div className="py-4">
        <div className="px-4 mb-6">
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
                  }`}
                >
                  {item.icon}
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
          
          {/* Admin section */}
          {adminItems.length > 0 && (
            <>
              <div className="mt-8 mb-4 px-4">
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
                      }`}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          )}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar; 