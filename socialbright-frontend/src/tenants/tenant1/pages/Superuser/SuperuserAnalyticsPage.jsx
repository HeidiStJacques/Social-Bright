import React from 'react';
import SuperuserNavbar from '@shared/components/superuser/SuperuserNavbar';
import {
  BarChart3,
  Users,
  Building2,
  UserCog,
  Activity,
} from 'lucide-react';

export default function SuperuserAnalyticsPage() {
  // Static demo data — replace with real data later
  const metrics = [
    { icon: <Building2 className="w-5 h-5" />, label: 'Total Tenants', value: 12 },
    { icon: <Users className="w-5 h-5" />, label: 'Total Users', value: 84 },
    { icon: <UserCog className="w-5 h-5" />, label: 'Total Clients', value: 1_026 },
    { icon: <Activity className="w-5 h-5" />, label: 'Active Tenants', value: 10 },
  ];

  const tenantSummary = [
    { tenant: 'Social Bright', users: 22, clients: 306, lastActive: 'Today' },
    { tenant: 'CareGroup Inc', users: 18, clients: 250, lastActive: '1d ago' },
    { tenant: 'Hope Foundation', users: 14, clients: 198, lastActive: '3d ago' },
  ];

  return (
    <>
      <div className="min-h-screen bg-gray-100 px-6 py-6 text-black">
        <div className="w-full space-y-10">
          <h2 className="text-2xl font-bold">Platform Analytics</h2>

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

          {/* Chart Placeholder */}
          <div className="bg-white p-6 rounded shadow">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Client Growth (Demo)</h3>
              <BarChart3 className="w-5 h-5 text-[#007B94]" />
            </div>
            <div className="h-48 flex items-center justify-center text-gray-400">
              [ Chart will go here ]
            </div>
          </div>

          {/* Tenant Summary Table */}
          <div className="bg-white p-6 rounded shadow overflow-auto">
            <h3 className="text-lg font-semibold mb-4">Top Tenants by Client Count</h3>
            <table className="min-w-full table-auto text-sm border border-gray-200">
              <thead className="bg-[#007B94] text-white">
                <tr>
                  <th className="px-4 py-2 text-left">Tenant</th>
                  <th className="px-4 py-2 text-left">Users</th>
                  <th className="px-4 py-2 text-left">Clients</th>
                  <th className="px-4 py-2 text-left">Last Active</th>
                </tr>
              </thead>
              <tbody>
                {tenantSummary.map((t) => (
                  <tr key={t.tenant} className="border-t">
                    <td className="px-4 py-2">{t.tenant}</td>
                    <td className="px-4 py-2">{t.users}</td>
                    <td className="px-4 py-2">{t.clients}</td>
                    <td className="px-4 py-2">{t.lastActive}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

