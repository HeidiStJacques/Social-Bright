import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  UserPlus,
  ClipboardList,
  StickyNote,
  FolderOpen,
  FileText,
  Calendar,
  ShieldCheck,
  UserCog,
  MapPin,
  Bell,
  FileBarChart2,
  Settings,
  ShieldCheck as AuditIcon,
  Menu,
  X,
  User,
} from 'lucide-react';

const navSections = [
  {
    title: 'Case Management',
    items: [
      { label: 'Demographics', icon: <Users size={16} />, path: '/user/demographics' },
      { label: 'Eligibility', icon: <ShieldCheck size={16} />, path: '/user/eligibility' },
      { label: 'Plan of Care', icon: <FileText size={16} />, path: '/user/plan-of-care' },
      { label: 'Case Notes', icon: <StickyNote size={16} />, path: '/user/casenotes' },
      { label: 'Documents', icon: <FolderOpen size={16} />, path: '/user/documents' },
      { label: 'Calendar', icon: <Calendar size={16} />, path: '/user/calendar' },
      { label: 'Status Form', icon: <ClipboardList size={16} />, path: '/user/status-form' },
      { label: 'Providers', icon: <UserCog size={16} />, path: '/user/providers' },
    ],
  },
  {
    title: 'Admin Tools',
    items: [
      { label: 'Dashboard', icon: <LayoutDashboard size={16} />, path: '/admin/dashboard' },
      { label: 'New Client', icon: <UserPlus size={16} />, path: '/admin/clients/new' },
      { label: 'Client Maintenance', icon: <ClipboardList size={16} />, path: '/admin/client-maintenance' },
      { label: 'Geography', icon: <MapPin size={16} />, path: '/admin/geography' },
      { label: 'Alerts', icon: <Bell size={16} />, path: '/admin/alerts' },
      { label: 'New User', icon: <User size={16} />, path: '/admin/newuser' },
      { label: 'User Management', icon: <Users size={16} />, path: '/admin/users' },
      { label: 'Documents', icon: <FolderOpen size={16} />, path: '/admin/documents' },
      { label: 'Audit Log', icon: <AuditIcon size={16} />, path: '/admin/audit-log' },
      { label: 'Reports', icon: <FileBarChart2 size={16} />, path: '/admin/reports' },
      { label: 'Settings', icon: <Settings size={16} />, path: '/admin/settings' },
    ],
  },
];

export default function AdminSidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const linkClass = ({ isActive }) =>
    `flex items-center gap-1 px-2 py-1 rounded-md text-sm font-medium transition-colors ${
      isActive
        ? 'bg-[#007B94]/10 text-[#007B94]'
        : 'text-black hover:text-[#007B94] hover:bg-[#007B94]/5'
    }`;

  const SidebarContent = () => (
    <div className="h-full w-64 bg-gray-100 border-r border-gray-300 p-4 overflow-y-auto">
      <div className="text-lg font-bold text-[#007B94] mb-4">Admin Navigation</div>
      <div className="space-y-6">
        {navSections.map((section) => (
          <div key={section.title}>
            <h4 className="text-xs font-semibold text-gray-500 uppercase px-2 mb-2">
              {section.title}
            </h4>
            <nav className="space-y-1">
              {section.items.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={linkClass}
                  onClick={() => setIsOpen(false)}
                >
                  {item.icon}
                  {item.label}
                </NavLink>
              ))}
            </nav>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Toggle Button */}
      <div className="md:hidden flex items-center justify-between bg-gray-100 border-b border-gray-300 p-4">
        <span className="text-lg font-bold text-[#007B94]">Admin Menu</span>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-[#007B94] focus:outline-none"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar for medium+ screens */}
      <aside className="hidden md:flex flex-col h-screen w-64">
        <SidebarContent />
      </aside>

      {/* Slide-out for mobile */}
      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/30 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="fixed top-0 left-0 z-50 h-full w-64 bg-gray-100 border-r border-gray-300 shadow-md">
            <SidebarContent />
          </div>
        </>
      )}
    </>
  );
}
