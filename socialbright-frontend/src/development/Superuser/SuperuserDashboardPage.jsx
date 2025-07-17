import React from 'react';
import SuperuserNavbar from '@shared/components/superuser/SuperuserNavbar';
import {
  AlertTriangle,
  Users,
  Building2,
  ShieldCheck,
  BarChart3,
  Settings,
  Database,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function SuperuserDashboardPage() {
  const navigate = useNavigate();

  const metrics = [
    { icon: <Building2 className="w-5 h-5" />, label: 'Tenants', value: 12 },
    { icon: <Users className="w-5 h-5" />, label: 'Admin Users', value: 34 },
    { icon: <ShieldCheck className="w-5 h-5" />, label: 'Total Clients', value: 1_026 },
    { icon: <AlertTriangle className="w-5 h-5" />, label: 'Errors (24h)', value: 3 },
  ];

  const recentAlerts = [
    { message: 'Database latency spike detected.', type: 'Warning', date: '2025-07-13' },
    { message: 'Tenant "Hope Foundation" exceeded client limit.', type: 'Alert', date: '2025-07-12' },
    { message: 'Failed login attempts from unknown IP.', type: 'Info', date: '2025-07-12' },
  ];

  const recentActivity = [
    { who: 'Heidi StJacques', action: 'Created new tenant: CareGroup Inc', date: '2025-07-13' },
    { who: 'John Smith', action: 'Reset password for Admin', date: '2025-07-12' },
    { who: 'Heidi StJacques', action: 'Disabled inactive account', date: '2025-07-12' },
  ];

  const quickLinks = [
    { icon: <Users className="w-4 h-4" />, label: 'Admin Accounts', route: '/superuser/admin-accounts' },
    { icon: <BarChart3 className="w-4 h-4" />, label: 'Analytics', route: '/superuser/analytics' },
    { icon: <Building2 className="w-4 h-4" />, label: 'Tenants', route: '/superuser/tenants' },
    { icon: <Settings className="w-4 h-4" />, label: 'System Settings', route: '/superuser/settings' },
  ];

  return (
    <>
      <div className="min-h-screen bg-gray-100 px-6 py-6 text-black">
        <div className="w-full space-y-10">
          <h2 className="text-2xl font-bold">Superuser Dashboard</h2>

          {/* Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {metrics.map((m) => (
              <div key={m.label} className="bg-white p-4 rounded shadow flex items-center gap-4">
                <div className="bg-[#007B94] text-white p-2 rounded">
                  {m.icon}
                </div>
                <div>
                  <div className="text-sm text-gray-500">{m.label}</div>
                  <div className="text-xl font-bold">{m.value.toLocaleString()}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Alerts and Activity */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Alerts */}
            <div className="bg-white p-6 rounded shadow">
              <h3 className="text-lg font-semibold mb-4">Recent Alerts</h3>
              <ul className="space-y-3">
                {recentAlerts.map((alert, i) => (
                  <li key={i} className="border-l-4 border-red-500 pl-3">
                    <div className="font-medium">{alert.message}</div>
                    <div className="text-xs text-gray-500">{alert.date} — {alert.type}</div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Activity */}
            <div className="bg-white p-6 rounded shadow">
              <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
              <ul className="space-y-3">
                {recentActivity.map((entry, i) => (
                  <li key={i} className="border-l-4 border-blue-500 pl-3">
                    <div className="font-medium">{entry.who}</div>
                    <div className="text-sm">{entry.action}</div>
                    <div className="text-xs text-gray-500">{entry.date}</div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Quick Links */}
          <div className="bg-white p-6 rounded shadow">
            <h3 className="text-lg font-semibold mb-4">Quick Navigation</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {quickLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => navigate(link.route)}
                  className="flex items-center gap-2 px-4 py-3 bg-[#007B94] text-white rounded hover:bg-[#006377] transition"
                >
                  {link.icon}
                  <span className="text-sm">{link.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
