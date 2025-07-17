import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminNavbar from '../components/admin/AdminNavbar';
import AdminSidebar from '../components/admin/AdminSidebar';

const AdminLayout = () => {
  return (
    <div className="min-h-screen bg-gray-100 text-black flex flex-col">
      {/* Top Navbar */}
      <AdminNavbar />

      {/* Main Content with Sidebar and Page Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar (responsive inside component) */}
        <AdminSidebar />

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
