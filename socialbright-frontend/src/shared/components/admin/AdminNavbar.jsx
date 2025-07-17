import React from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  FolderOpen,
  ClipboardList,
  FileBarChart2,
} from 'lucide-react';

const AdminNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // TODO: Add real logout logic (e.g., clear token, call backend)
    localStorage.removeItem('token');
    navigate('/login');
  };

  const linkClasses = ({ isActive }) =>
    `flex items-center gap-1 px-2 py-1.5 rounded text-sm font-medium transition ${
      isActive ? 'text-[#007B94] font-semibold' : 'text-black hover:text-[#007B94]'
    }`;

  return (
    <header className="w-full bg-gray-100 border-b border-gray-300 px-4 py-2 flex items-center justify-between flex-wrap md:flex-nowrap">
      {/* Left: Logo */}
      <Link to="/admin/dashboard" className="flex items-center">
        <img
          src="/images/gradient_logo_zoom.png"
          alt="SocialBright Logo"
          className="h-6 w-auto"
        />
      </Link>

      {/* Center: Navigation Links */}
      <nav className="flex flex-wrap gap-3 justify-center md:justify-start w-full md:w-auto mt-2 md:mt-0">
        <NavLink to="/admin/dashboard" className={linkClasses}>
          <LayoutDashboard size={16} />
          <span className="hidden sm:inline">Dashboard</span>
        </NavLink>
        <NavLink to="/admin/clients" className={linkClasses}>
          <FolderOpen size={16} />
          <span className="hidden sm:inline">Clients</span>
        </NavLink>
        <NavLink to="/admin/tasks" className={linkClasses}>
          <ClipboardList size={16} />
          <span className="hidden sm:inline">Tasks</span>
        </NavLink>
        <NavLink to="/admin/reports" className={linkClasses}>
          <FileBarChart2 size={16} />
          <span className="hidden sm:inline">Reports</span>
        </NavLink>
      </nav>

      {/* Right: Logout button */}
      {/* Right: Logout button */}
<div className="w-full md:w-auto mt-2 md:mt-0 flex justify-end">
  <button
    onClick={handleLogout}
    className="bg-[#007B94] text-white px-3 py-1 rounded-md hover:bg-[#005f70] transition text-sm font-medium"
  >
    Logout
  </button>
</div>

    </header>
  );
};

export default AdminNavbar;
