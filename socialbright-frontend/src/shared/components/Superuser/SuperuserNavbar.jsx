import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  CheckSquare,
  FileBarChart2,
} from 'lucide-react';
import { useLogout } from '@shared/utils/logout';

const SuperuserNavbar = () => {
  const [userName, setUserName] = useState('Superuser');
  const location = useLocation();
  const logout = useLogout();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    setUserName(user?.name || 'Superuser');
  }, []);

  const navLinkClass = (path) =>
    `flex items-center gap-1 px-2 py-1 text-sm font-medium transition ${
      location.pathname === path
        ? 'text-[#007B94] border-b-2 border-[#007B94]'
        : 'text-black hover:text-[#007B94]'
    }`;

  return (
    <header className="bg-gray-100 border-b border-gray-300 text-black px-4 py-2">
      <div className="flex flex-col md:flex-row md:items-center justify-between md:h-14 gap-2 md:gap-0">
        {/* Logo */}
        <div className="flex justify-center md:justify-start">
          <Link to="/superuser">
            <img
              src="/images/gradient_logo_zoom.png"
              alt="Logo"
              className="h-8 w-auto"
            />
          </Link>
        </div>

        {/* Center Nav Links */}
        <nav className="flex justify-center space-x-4">
          <Link to="/admin/dashboard" className={navLinkClass('/admin/dashboard')}>
            <LayoutDashboard size={16} />
            Admin Dashboard
          </Link>
          <Link to="/admin/clientsmanagement" className={navLinkClass('/admin/clients')}>
            <Users size={16} />
            Client Management
          </Link>
          <Link to="/user/tasks" className={navLinkClass('/user/tasks')}>
            <CheckSquare size={16} />
            Tasks
          </Link>
          <Link to="/admin/reports" className={navLinkClass('/admin/reports')}>
            <FileBarChart2 size={16} />
            Admin Reports
          </Link>
        </nav>

        {/* Right side: Greeting + Logout */}
        <div className="flex items-center justify-center md:justify-end space-x-3 text-sm">
          <span>
            Hello, <span className="font-semibold">{userName}</span>
          </span>
          <button
            onClick={logout}
            className="px-3 py-1 rounded bg-[#007B94] text-white hover:bg-[#005f70] transition"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default SuperuserNavbar;
