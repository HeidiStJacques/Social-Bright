import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import DashboardNavbar from '../components/DashboardNavbar';
import Sidebar from '../components/Sidebar';

const PrivateLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 text-black font-sans flex flex-col">
      <DashboardNavbar onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

      <div className="flex flex-1 overflow-hidden pt-[56px]">
        {/* Mobile Sidebar */}
        {sidebarOpen && (
          <>
            <div
              className="fixed inset-0 bg-black/30 z-40 md:hidden"
              onClick={() => setSidebarOpen(false)}
            />
            <div className="fixed top-[56px] left-0 z-50 w-64 h-full bg-gray-100 border-r shadow-md md:hidden">
              <Sidebar />
            </div>
          </>
        )}

        {/* Desktop Sidebar (always rendered) */}
        <aside className="hidden md:flex w-64 border-r bg-gray-100 z-10">
          <Sidebar />
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default PrivateLayout;
