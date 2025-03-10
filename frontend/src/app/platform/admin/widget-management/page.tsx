'use client';

import React from 'react';
import AdminLayout from '@/components/admin/AdminLayout';

export default function WidgetManagementPage() {
  return (
    <AdminLayout>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Widget Management</h1>
        <p>This section allows you to manage dashboard widgets.</p>
        <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
          <p className="text-yellow-700">
            Widget editing functionality is temporarily unavailable. Please check back later.
          </p>
        </div>
      </div>
    </AdminLayout>
  );
} 