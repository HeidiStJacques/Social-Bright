import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import {
  Home,
  Users,
  BarChart2,
  Settings,
  Wrench,
  FileText,
  User,
  UserPlus,
  ClipboardList,
  StickyNote,
  FolderOpen,
  Calendar,
  ShieldCheck,
  UserCog,
  MapPin,
  Bell,
  LayoutDashboard,
  FileText as SystemLogs,
  X,
} from 'lucide-react';

export default function SuperuserSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [clientId, setClientId] = useState('');

  useEffect(() => {
    const storedId = localStorage.getItem('clientId');
    setClientId(storedId || '');
  }, []);

  const linkClass = ({ isActive }) =>
    `flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-md transition ${
      isActive
        ? 'bg-[#007B94]/10 text-[#007B94] font-semibold'
        : 'text-black hover:text-[#007B94] hover:bg-[#007B94]/5'
    }`;

  const disabledClass =
    'flex items-center gap-2 px-3 py-1.5 text-sm text-gray-400 cursor-not-allowed';

  const sections = [
    {
      title: 'Superuser',
      links: [
        { to: '/superuser/dashboard', label: 'Dashboard', icon: <Home className="w-4 h-4" /> },
        { to: '/superuser/accounts', label: 'Admin Accounts', icon: <Users className="w-4 h-4" /> },
        { to: '/superuser/analytics', label: 'Analytics', icon: <BarChart2 className="w-4 h-4" /> },
        { to: '/superuser/system-logs', label: 'System Logs', icon: <SystemLogs className="w-4 h-4" /> },
        { to: '/superuser/system-settings', label: 'System Settings', icon: <Settings className="w-4 h-4" /> },
        { to: '/superuser/maintenance', label: 'Maintenance', icon: <Wrench className="w-4 h-4" /> },
      ],
    },
    {
      title: 'Admin Tools',
      links: [
        { to: '/admin/clients/new', label: 'New Client', icon: <UserPlus className="w-4 h-4" /> },
        { to: '/admin/geography', label: 'Geography', icon: <MapPin className="w-4 h-4" /> },
        { to: '/admin/alerts', label: 'Alerts', icon: <Bell className="w-4 h-4" /> },
        { to: '/admin/users', label: 'User Management', icon: <Users className="w-4 h-4" /> },
        { to: '/admin/documents', label: 'Documents', icon: <FolderOpen className="w-4 h-4" /> },
        { to: '/admin/audit-log', label: 'Audit Log', icon: <FileText className="w-4 h-4" /> },
        { to: '/admin/settings', label: 'Settings', icon: <Settings className="w-4 h-4" /> },
        { to: '/admin/system-maintenance', label: 'System Maintenance', icon: <Wrench className="w-4 h-4" /> },
      ],
    },
    {
  title: 'Case Management',
  links: [
    { path: clientId ? `/clients/${clientId}/demographics` : '#', label: 'Demographics', icon: <User className="w-4 h-4" />, disabled: !clientId },
    { path: clientId ? `/clients/${clientId}/eligibility` : '#', label: 'Eligibility', icon: <ShieldCheck className="w-4 h-4" />, disabled: !clientId },
    { path: clientId ? `/clients/${clientId}/plan-of-care` : '#', label: 'Care Plan', icon: <FileText className="w-4 h-4" />, disabled: !clientId },
    { path: clientId ? `/clients/${clientId}/casenotes` : '#', label: 'Case Notes', icon: <StickyNote className="w-4 h-4" />, disabled: !clientId },
    { path: clientId ? `/clients/${clientId}/documents` : '#', label: 'Documents', icon: <FolderOpen className="w-4 h-4" />, disabled: !clientId },
    { path: clientId ? `/clients/${clientId}/calendar` : '#', label: 'Calendar', icon: <Calendar className="w-4 h-4" />, disabled: !clientId },
    { path: clientId ? `/clients/${clientId}/statusform` : '#', label: 'Status Form', icon: <ClipboardList className="w-4 h-4" />, disabled: !clientId },
    { path: clientId ? `/clients/${clientId}/providers` : '#', label: 'Providers', icon: <UserCog className="w-4 h-4" />, disabled: !clientId },
  ],
}
  ];

  return (
    <>
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between px-4 py-2 bg-gray-100 border-b border-gray-300">
        <div className="text-[#007B94] font-bold text-lg">Superuser</div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-[#007B94] focus:outline-none"
        >
          {isOpen ? <X size={24} /> : <LayoutDashboard size={24} />}
        </button>
      </div>

      {/* Sidebar for desktop */}
      <aside className="hidden md:flex w-64 bg-gray-100 border-r min-h-screen flex-col">
        <div className="p-4 font-bold text-lg text-[#007B94]">Superuser Panel</div>
        {sections.map((section) => (
          <div key={section.title} className="mb-4">
            <div className="text-xs text-gray-500 uppercase font-semibold px-4 mb-2">
              {section.title}
            </div>
            <nav className="flex flex-col space-y-1 px-2">
              {section.links.map(({ path, to, label, icon, disabled }) =>
                disabled ? (
                  <div key={label} className={disabledClass}>
                    {icon}
                    {label}
                  </div>
                ) : (
                  <NavLink
                    key={to || path}
                    to={to || path}
                    className={linkClass}
                  >
                    {icon}
                    {label}
                  </NavLink>
                )
              )}
            </nav>
          </div>
        ))}
      </aside>

      {/* Slide-out for mobile */}
      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/30 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="fixed top-0 left-0 z-50 w-64 bg-gray-100 border-r h-full shadow-md">
            <div className="p-4 font-bold text-lg text-[#007B94]">Superuser Navigation</div>
            {sections.map((section) => (
              <div key={section.title} className="mb-4">
                <div className="text-xs text-gray-500 uppercase font-semibold px-4 mb-2">
                  {section.title}
                </div>
                <nav className="flex flex-col space-y-1 px-2">
                  {section.links.map(({ path, to, label, icon, disabled }) =>
                    disabled ? (
                      <div key={label} className={disabledClass}>
                        {icon}
                        {label}
                      </div>
                    ) : (
                      <NavLink
                        key={to || path}
                        to={to || path}
                        className={linkClass}
                        onClick={() => setIsOpen(false)}
                      >
                        {icon}
                        {label}
                      </NavLink>
                    )
                  )}
                </nav>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
}
