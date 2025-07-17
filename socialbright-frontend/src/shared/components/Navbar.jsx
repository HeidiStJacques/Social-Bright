import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, CreditCard, LogIn } from 'lucide-react'; // icons

export default function Navbar() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <div className="fixed top-0 left-0 z-50 w-full h-14 bg-gray-100 border-b border-gray-300 px-6 flex items-center justify-between text-sm">
      {/* Logo */}
      <div className="flex items-center">
        <Link to="/">
          <img
            src="/images/gradient_logo_zoom.png"
            alt="SocialBright Logo"
            className="h-10"
          />
        </Link>
      </div>

      {/* Navigation Links */}
      <div className="flex gap-6 items-center">
        <NavLink to="/" active={isActive('/')} icon={<Home size={16} />}>
          Home
        </NavLink>
        <NavLink to="/plans" active={isActive('/plans')} icon={<CreditCard size={16} />}>
          Plans
        </NavLink>
        <NavLink to="/login" active={isActive('/login')} icon={<LogIn size={16} />}>
          Login
        </NavLink>
      </div>
    </div>
  );
}

function NavLink({ to, active, children, icon }) {
  return (
    <Link
      to={to}
      className={`flex items-center gap-1 text-sm sm:text-base font-medium pb-1 transition ${
        active
          ? 'text-[#007B94] border-b-2 border-[#007B94]'
          : 'text-black hover:text-[#007B94]'
      }`}
    >
      {icon}
      {children}
    </Link>
  );
}
