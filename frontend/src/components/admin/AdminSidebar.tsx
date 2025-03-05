import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

const AdminSidebar: React.FC = () => {
  const [expanded, setExpanded] = useState(false);
  const pathname = usePathname();
  const { state, hasRole } = useAuth();
  const { user } = state;
  const isAdmin = hasRole('ADMIN');

  const toggleSidebar = () => {
    setExpanded(!expanded);
  };

  // Check if the current path matches the given path
  const isActive = (path: string) => {
    return pathname?.startsWith(path);
  };

  // Only render if user is admin
  if (!user || !isAdmin) {
    return null;
  }

  return (
    <div 
      className={`bg-gray-900 text-white transition-all duration-300 ease-in-out h-screen fixed left-0 top-0 z-30 overflow-y-auto ${
        expanded ? 'w-64' : 'w-20'
      }`}
    >
      <div className="flex flex-col p-4 border-b border-gray-800">
        <div className="flex justify-between items-center mb-2">
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
        
        {/* Back to Platform button moved here */}
        <Link 
          href="/platform/dashboard"
          className="flex items-center p-2 rounded-md hover:bg-gray-800 transition-colors mt-1"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 17l-5-5m0 0l5-5m-5 5h12" />
          </svg>
          <span className={`ml-3 ${expanded ? 'block' : 'hidden'}`}>Back to Platform</span>
        </Link>
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
          
          {/* Tables and Fields */}
          <li>
            <Link 
              href="/platform/admin/tables-and-fields"
              className={`flex items-center p-3 rounded-md transition-colors ${
                isActive('/platform/admin/tables-and-fields') 
                  ? 'bg-blue-700' 
                  : 'hover:bg-gray-800'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2 1 3 3 3h10c2 0 3-1 3-3V7c0-2-1-3-3-3H7c-2 0-3 1-3 3zm0 5h16" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 4v16" />
              </svg>
              <span className={`ml-3 ${expanded ? 'block' : 'hidden'}`}>Tables and Fields</span>
            </Link>
          </li>
          
          {/* Role Management */}
          <li>
            <Link 
              href="/platform/admin/role-management"
              className={`flex items-center p-3 rounded-md transition-colors ${
                isActive('/platform/admin/role-management') 
                  ? 'bg-blue-700' 
                  : 'hover:bg-gray-800'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span className={`ml-3 ${expanded ? 'block' : 'hidden'}`}>Role Management</span>
            </Link>
          </li>
          
          {/* User Management */}
          <li>
            <Link 
              href="/platform/admin/user-management"
              className={`flex items-center p-3 rounded-md transition-colors ${
                isActive('/platform/admin/user-management') 
                  ? 'bg-blue-700' 
                  : 'hover:bg-gray-800'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              <span className={`ml-3 ${expanded ? 'block' : 'hidden'}`}>User Management</span>
            </Link>
          </li>
          
          {/* Widget Management */}
          <li>
            <Link 
              href="/platform/admin/widget-management"
              className={`flex items-center p-3 rounded-md transition-colors ${
                isActive('/platform/admin/widget-management') 
                  ? 'bg-blue-700' 
                  : 'hover:bg-gray-800'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
              </svg>
              <span className={`ml-3 ${expanded ? 'block' : 'hidden'}`}>Widget Management</span>
            </Link>
          </li>
          
          {/* Advanced Automation */}
          <li>
            <Link 
              href="/platform/admin/advanced-automation"
              className={`flex items-center p-3 rounded-md transition-colors ${
                isActive('/platform/admin/advanced-automation') 
                  ? 'bg-blue-700' 
                  : 'hover:bg-gray-800'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span className={`ml-3 ${expanded ? 'block' : 'hidden'}`}>Advanced Automation</span>
            </Link>
          </li>
          
          {/* AI Agents */}
          <li>
            <Link 
              href="/platform/admin/ai-agents"
              className={`flex items-center p-3 rounded-md transition-colors ${
                isActive('/platform/admin/ai-agents') 
                  ? 'bg-blue-700' 
                  : 'hover:bg-gray-800'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span className={`ml-3 ${expanded ? 'block' : 'hidden'}`}>AI Agents</span>
            </Link>
          </li>
          
          {/* Role-Specific User Journeys */}
          <li>
            <Link 
              href="/platform/admin/user-journeys"
              className={`flex items-center p-3 rounded-md transition-colors ${
                isActive('/platform/admin/user-journeys') 
                  ? 'bg-blue-700' 
                  : 'hover:bg-gray-800'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
              </svg>
              <span className={`ml-3 ${expanded ? 'block' : 'hidden'}`}>User Journeys</span>
            </Link>
          </li>
          
          {/* Data Analytics and Reporting */}
          <li>
            <Link 
              href="/platform/admin/analytics-reporting"
              className={`flex items-center p-3 rounded-md transition-colors ${
                isActive('/platform/admin/analytics-reporting') 
                  ? 'bg-blue-700' 
                  : 'hover:bg-gray-800'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              <span className={`ml-3 ${expanded ? 'block' : 'hidden'}`}>Analytics & Reporting</span>
            </Link>
          </li>
          
          {/* Collaboration Tools */}
          <li>
            <Link 
              href="/platform/admin/collaboration-tools"
              className={`flex items-center p-3 rounded-md transition-colors ${
                isActive('/platform/admin/collaboration-tools') 
                  ? 'bg-blue-700' 
                  : 'hover:bg-gray-800'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
              </svg>
              <span className={`ml-3 ${expanded ? 'block' : 'hidden'}`}>Collaboration Tools</span>
            </Link>
          </li>
          
          {/* Omni-Channel */}
          <li>
            <Link 
              href="/platform/admin/omni-channel"
              className={`flex items-center p-3 rounded-md transition-colors ${
                isActive('/platform/admin/omni-channel') 
                  ? 'bg-blue-700' 
                  : 'hover:bg-gray-800'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <span className={`ml-3 ${expanded ? 'block' : 'hidden'}`}>Omni-Channel</span>
            </Link>
          </li>
          
          {/* Enhanced Security and Compliance */}
          <li>
            <Link 
              href="/platform/admin/security-compliance"
              className={`flex items-center p-3 rounded-md transition-colors ${
                isActive('/platform/admin/security-compliance') 
                  ? 'bg-blue-700' 
                  : 'hover:bg-gray-800'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span className={`ml-3 ${expanded ? 'block' : 'hidden'}`}>Security & Compliance</span>
            </Link>
          </li>
          
          {/* Integration Ecosystem */}
          <li>
            <Link 
              href="/platform/admin/integrations-hub"
              className={`flex items-center p-3 rounded-md transition-colors ${
                isActive('/platform/admin/integrations-hub') 
                  ? 'bg-blue-700' 
                  : 'hover:bg-gray-800'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
              </svg>
              <span className={`ml-3 ${expanded ? 'block' : 'hidden'}`}>Integrations Hub</span>
            </Link>
          </li>
          
          {/* Personalization */}
          <li>
            <Link 
              href="/platform/admin/personalization"
              className={`flex items-center p-3 rounded-md transition-colors ${
                isActive('/platform/admin/personalization') 
                  ? 'bg-blue-700' 
                  : 'hover:bg-gray-800'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
              </svg>
              <span className={`ml-3 ${expanded ? 'block' : 'hidden'}`}>Personalization</span>
            </Link>
          </li>
          
          {/* Multi-Language and Localization */}
          <li>
            <Link 
              href="/platform/admin/localization"
              className={`flex items-center p-3 rounded-md transition-colors ${
                isActive('/platform/admin/localization') 
                  ? 'bg-blue-700' 
                  : 'hover:bg-gray-800'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
              </svg>
              <span className={`ml-3 ${expanded ? 'block' : 'hidden'}`}>Localization</span>
            </Link>
          </li>
          
          {/* Gamification */}
          <li>
            <Link 
              href="/platform/admin/gamification"
              className={`flex items-center p-3 rounded-md transition-colors ${
                isActive('/platform/admin/gamification') 
                  ? 'bg-blue-700' 
                  : 'hover:bg-gray-800'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
              <span className={`ml-3 ${expanded ? 'block' : 'hidden'}`}>Gamification</span>
            </Link>
          </li>
          
          {/* Portals */}
          <li>
            <Link 
              href="/platform/admin/portals"
              className={`flex items-center p-3 rounded-md transition-colors ${
                isActive('/platform/admin/portals') 
                  ? 'bg-blue-700' 
                  : 'hover:bg-gray-800'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              <span className={`ml-3 ${expanded ? 'block' : 'hidden'}`}>Portals</span>
            </Link>
          </li>
          
          {/* Training and Help Resources */}
          <li>
            <Link 
              href="/platform/admin/training-help"
              className={`flex items-center p-3 rounded-md transition-colors ${
                isActive('/platform/admin/training-help') 
                  ? 'bg-blue-700' 
                  : 'hover:bg-gray-800'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className={`ml-3 ${expanded ? 'block' : 'hidden'}`}>Training & Help</span>
            </Link>
          </li>
          
          {/* Audit Trails & Version Control - Moved to the end */}
          <li>
            <Link 
              href="/platform/admin/audit-trails"
              className={`flex items-center p-3 rounded-md transition-colors ${
                isActive('/platform/admin/audit-trails') 
                  ? 'bg-blue-700' 
                  : 'hover:bg-gray-800'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span className={`ml-3 ${expanded ? 'block' : 'hidden'}`}>Audit Trails & Version Control</span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default AdminSidebar; 