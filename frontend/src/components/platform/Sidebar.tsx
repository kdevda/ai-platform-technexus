"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import axios from 'axios';

// Icons with SVG for better styling
const DashboardIcon = () => (
  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
  </svg>
);

const TableIcon = () => (
  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2 1 3 3 3h10c2 0 3-1 3-3V7c0-2-1-3-3-3H7c-2 0-3 1-3 3zm0 5h16" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 4v16" />
  </svg>
);

const LoansIcon = () => (
  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const PaymentsIcon = () => (
  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
);

const SettingsIcon = () => (
  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

interface TableData {
  id: string;
  name: string;
  description?: string;
}

const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const { state } = useAuth();
  const [expanded, setExpanded] = useState(false);
  const [accessibleTables, setAccessibleTables] = useState<TableData[]>([]);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    const fetchAccessibleTables = async () => {
      try {
        setLoading(true);
        // In a real app, this would fetch from your backend API
        // const response = await axios.get('/api/tables/accessible');
        // setAccessibleTables(response.data.tables);
        
        // For demo purposes, setting some sample tables
        setAccessibleTables([
          { id: '1', name: 'Users', description: 'User data' },
          { id: '2', name: 'Applications', description: 'Application data' },
          { id: '3', name: 'Loans', description: 'Loan data' },
          { id: '4', name: 'Payments', description: 'Payment records' }
        ]);
      } catch (error) {
        console.error('Error fetching accessible tables:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchAccessibleTables();
  }, []);
  
  const toggleSidebar = () => {
    setExpanded(!expanded);
  };
  
  const isActive = (path: string) => {
    return pathname === path || pathname?.startsWith(`${path}/`);
  };

  // Core navigation items
  const navItems = [
    { 
      name: 'Dashboard', 
      path: '/platform/dashboard', 
      icon: <DashboardIcon /> 
    },
    { 
      name: 'Tables', 
      path: '/platform/tables', 
      icon: <TableIcon /> 
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
      
      <div className="py-4 overflow-hidden overflow-y-auto h-full">
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
          
          {/* Accessible Tables Section */}
          {accessibleTables.length > 0 && (
            <>
              <div className={`mt-8 mb-4 px-4 ${expanded ? 'block' : 'hidden'}`}>
                <h3 className="text-xs uppercase tracking-wider text-gray-400">Accessible Tables</h3>
              </div>
              <ul>
                {accessibleTables.map((table) => (
                  <li key={table.id} className="mb-2">
                    <Link 
                      href={`/platform/tables/${table.id}`}
                      className={`flex items-center px-4 py-2 text-sm ${
                        isActive(`/platform/tables/${table.id}`)
                          ? 'bg-gray-900 text-white'
                          : 'text-gray-300 hover:bg-gray-700'
                      } ${!expanded ? 'justify-center' : ''}`}
                      title={!expanded ? table.name : ''}
                    >
                      {!expanded ? (
                        <TableIcon />
                      ) : (
                        <>
                          <TableIcon />
                          {table.name}
                        </>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          )}
          
          {/* Admin section - if needed */}
          {state.user?.role === 'admin' && (
            <>
              <div className={`mt-8 mb-4 px-4 ${expanded ? 'block' : 'hidden'}`}>
                <h3 className="text-xs uppercase tracking-wider text-gray-400">Admin</h3>
              </div>
              <ul>
                <li className="mb-2">
                  <Link 
                    href="/platform/admin"
                    className={`flex items-center px-4 py-2 text-sm ${
                      isActive('/platform/admin')
                        ? 'bg-gray-900 text-white'
                        : 'text-gray-300 hover:bg-gray-700'
                    } ${!expanded ? 'justify-center' : ''}`}
                    title={!expanded ? 'Admin Panel' : ''}
                  >
                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {expanded && 'Admin Panel'}
                  </Link>
                </li>
              </ul>
            </>
          )}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar; 