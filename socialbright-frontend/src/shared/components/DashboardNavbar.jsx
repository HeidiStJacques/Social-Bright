import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Users, CheckSquare, BarChart2, Calendar } from 'lucide-react';

export default function DashboardNavbar() {
  const location = useLocation();

  return (
    <div className="fixed top-0 left-0 z-50 w-full h-14 bg-gray-100 border-b border-gray-300 px-4 sm:px-6 flex items-center justify-between text-xs sm:text-sm">
      {/* Logo */}
      <div className="flex items-center">
        <Link to="/dashboard">
          <img
            src="/images/gradient_logo_zoom.png"
            alt="SocialBright Logo"
            className="h-8 sm:h-10"
          />
        </Link>
      </div>

      {/* Navigation Links */}
      <div className="hidden sm:flex gap-4 sm:gap-6 items-center">
        <NavLink to="/dashboard" currentPath={location.pathname} icon={<Home size={16} />}>
          Dashboard
        </NavLink>
        <NavLink to="/dashboard/clients" currentPath={location.pathname} icon={<Users size={16} />}>
          Clients
        </NavLink>
        <NavLink to="/dashboard/tasks" currentPath={location.pathname} icon={<CheckSquare size={16} />}>
          Tasks
        </NavLink>
        <NavLink to="/dashboard/reports" currentPath={location.pathname} icon={<BarChart2 size={16} />}>
          Reports
        </NavLink>
        <NavLink to="/dashboard/calendar" currentPath={location.pathname} icon={<Calendar size={16} />}>
          Calendar
        </NavLink>
      </div>

      {/* User Info + Logout */}
      <div className="flex items-center gap-2 sm:gap-3 text-black">
        <span className="hidden sm:inline font-medium">Welcome, Heidi</span>
        <button
          onClick={() => alert('Logging out...')}
          className="bg-[#007B94] text-white text-xs px-2 sm:px-3 py-1 rounded hover:bg-[#00657a] transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

function NavLink({ to, children, currentPath, icon }) {
  const isActive = currentPath === to;
  return (
    <Link
      to={to}
      className={`flex items-center gap-1 text-xs sm:text-sm font-medium pb-[2px] transition ${
        isActive
          ? 'text-[#007B94] border-b-2 border-[#007B94]'
          : 'text-black hover:text-[#007B94]'
      }`}
    >
      {icon}
      {children}
    </Link>
  );
}
