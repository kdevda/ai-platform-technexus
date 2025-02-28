"use client";

import React from 'react';
import Link from 'next/link';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-white py-16 border-t border-gray-800">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="space-y-4">
            <h3 className="text-xl font-bold tracking-tight">
              TechNexus<span className="text-gray-400">AI</span>
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Enterprise-grade AI platform for loan management with configurable modules for every stage of the loan lifecycle.
            </p>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-sm font-medium uppercase tracking-wider">Solutions</h3>
            <ul className="space-y-3">
              {["AI Lead Management", "AI Originations", "AI Collections", "AI Servicing", "AI Treasury"].map((item) => (
                <li key={item}>
                  <Link href={`/solutions/${item.toLowerCase().replace(/\s+/g, '-')}`} className="text-gray-400 hover:text-white text-sm transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-sm font-medium uppercase tracking-wider">Company</h3>
            <ul className="space-y-3">
              {["About", "Leadership", "Careers", "Press", "Contact"].map((item) => (
                <li key={item}>
                  <Link href={`/${item.toLowerCase()}`} className="text-gray-400 hover:text-white text-sm transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-sm font-medium uppercase tracking-wider">Legal</h3>
            <ul className="space-y-3">
              {["Privacy Policy", "Terms of Service", "Security", "Compliance"].map((item) => (
                <li key={item}>
                  <Link href={`/legal/${item.toLowerCase().replace(/\s+/g, '-')}`} className="text-gray-400 hover:text-white text-sm transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} TechNexus AI. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            {["LinkedIn", "Twitter", "GitHub", "YouTube"].map((item) => (
              <a key={item} href="#" className="text-gray-500 hover:text-white text-sm transition-colors">
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 