import React from 'react';
import { Outlet } from 'react-router-dom';
import SuperuserNavbar from '../components/Superuser/SuperuserNavbar';
import SuperuserSidebar from '../components/Superuser/SuperuserSidebar';

export default function SuperuserLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100 text-sm text-black">
      <SuperuserNavbar />
      <div className="flex flex-1 overflow-hidden">
        <SuperuserSidebar />
        <main className="flex-1 overflow-y-auto px-4 py-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

