import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  User,
  ShieldCheck,
  FileText,
  StickyNote,
  FolderOpen,
  Calendar,
  ClipboardList,
} from 'lucide-react';

export default function Sidebar() {
  const location = useLocation();

  // Extract client ID from URL
  const match = location.pathname.match(/^\/clients\/([^/]+)/);
  const clientId = match ? match[1] : localStorage.getItem('selectedClientId');

  const links = [
    { label: 'Overview', path: `/clients/${clientId}/overview`, icon: <LayoutDashboard size={16} /> },
    { label: 'Demographics', path: `/clients/${clientId}/demographics`, icon: <User size={16} /> },
    { label: 'Eligibility', path: `/clients/${clientId}/eligibility`, icon: <ShieldCheck size={16} /> },
    { label: 'Care Plan', path: `/clients/${clientId}/plan-of-care`, icon: <FileText size={16} /> },
    { label: 'Case Notes', path: `/clients/${clientId}/casenotes`, icon: <StickyNote size={16} /> },
    { label: 'Documents', path: `/clients/${clientId}/documents`, icon: <FolderOpen size={16} /> },
    { label: 'Status Form', path: `/clients/${clientId}/statusform`, icon: <ClipboardList size={16} /> },
    { label: 'Providers', path: `/clients/${clientId}/providers`, icon: <Users size={16} /> },
  ];

  return (
    <aside className="w-[220px] bg-gray-100 px-4 py-6 fixed top-[60px] left-0 h-[calc(100vh-60px)] overflow-y-auto border-gray-200 z-20">
      <h3 className="text-base font-semibold mb-4 text-[#007B94]">Client Navigation</h3>
      <nav>
        <ul className="space-y-1">
          {links.map(({ path, label, icon }) => (
            <li key={label}>
              {clientId ? (
                <NavLink
                  to={path}
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-2 py-1.5 rounded-md text-sm font-medium transition ${
                      isActive
                        ? 'text-[#007B94] bg-[#007B94]/10 font-semibold'
                        : 'text-black hover:text-[#007B94]'
                    }`
                  }
                >
                  {icon}
                  {label}
                </NavLink>
              ) : (
                <div className="flex items-center gap-2 px-2 py-1.5 rounded-md text-sm font-medium text-gray-400 cursor-not-allowed opacity-70">
                  {icon}
                  {label}
                </div>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}

