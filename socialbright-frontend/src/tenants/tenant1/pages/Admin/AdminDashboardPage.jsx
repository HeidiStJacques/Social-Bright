import React from 'react';
import AdminLayout from '@layouts/AdminLayout';
import { Users, AlertTriangle, UserCog, FileText } from 'lucide-react';

export default function AdminDashboardPage() {
  return (
      <div className="p-6 bg-gray-100 min-h-screen text-black">
        <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

        {/* Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white shadow rounded-xl p-4 flex items-center space-x-4">
            <Users className="w-8 h-8 text-[#007B94]" />
            <div>
              <p className="text-sm text-gray-600">Total Clients</p>
              <p className="text-xl font-semibold">132</p>
            </div>
          </div>

          <div className="bg-white shadow rounded-xl p-4 flex items-center space-x-4">
            <UserCog className="w-8 h-8 text-[#007B94]" />
            <div>
              <p className="text-sm text-gray-600">Active Staff</p>
              <p className="text-xl font-semibold">24</p>
            </div>
          </div>

          <div className="bg-white shadow rounded-xl p-4 flex items-center space-x-4">
            <AlertTriangle className="w-8 h-8 text-[#007B94]" />
            <div>
              <p className="text-sm text-gray-600">Open Alerts</p>
              <p className="text-xl font-semibold">6</p>
            </div>
          </div>

          <div className="bg-white shadow rounded-xl p-4 flex items-center space-x-4">
            <FileText className="w-8 h-8 text-[#007B94]" />
            <div>
              <p className="text-sm text-gray-600">Reports Generated</p>
              <p className="text-xl font-semibold">58</p>
            </div>
          </div>
        </div>

        {/* Dashboard Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Recent Alerts */}
          <div className="bg-white shadow rounded-xl p-4">
            <h2 className="text-lg font-semibold mb-2 text-[#007B94]">Recent Alerts</h2>
            <ul className="text-sm space-y-2">
              <li>🔔 Overdue Care Plan - Client #121</li>
              <li>🔔 Missed Home Visit - Client #089</li>
              <li>🔔 Eligibility Expiring Soon - Client #076</li>
            </ul>
          </div>

          {/* System Status */}
          <div className="bg-white shadow rounded-xl p-4">
            <h2 className="text-lg font-semibold mb-2 text-[#007B94]">System Status</h2>
            <p className="text-sm text-gray-700">
              All systems operational. No maintenance scheduled.
            </p>
          </div>

          {/* Quick Links */}
          <div className="bg-white shadow rounded-xl p-4 md:col-span-2">
            <h2 className="text-lg font-semibold mb-2 text-[#007B94]">Quick Links</h2>
            <div className="flex flex-wrap gap-4 text-sm">
              <a href="/admin/user-management" className="text-[#007B94] underline">User Management</a>
              <a href="/admin/clients/new" className="text-[#007B94] underline">Add New Client</a>
              <a href="/admin/reports" className="text-[#007B94] underline">View Reports</a>
              <a href="/admin/system-maintenance" className="text-[#007B94] underline">System Maintenance</a>
            </div>
          </div>
        </div>
      </div>
  );
}
