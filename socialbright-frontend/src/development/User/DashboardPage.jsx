import React, { useEffect, useState } from 'react';
import { useTenant } from '@context/TenantContext'; // ✅ Multi-tenant hook


const DashboardPage = () => {
  const { tenantId } = useTenant(); // ✅ Get current tenant
  const [dashboardData, setDashboardData] = useState({
    visits: 0,
    tasks: 0,
    alerts: 0,
  });

  useEffect(() => {
    if (!tenantId) return;

    // Simulated fetch of dashboard data scoped by tenantId
    const fetchTenantDashboard = async () => {
      // TODO: Replace with API call when backend is ready
      // const response = await fetch(`/api/dashboard?tenantId=${tenantId}`);
      // const data = await response.json();

      // Temporary mock response for demo purposes
      const data = {
        visits: 5, // you can make this dynamic later
        tasks: 12,
        alerts: 3,
      };

      setDashboardData(data);
    };

    fetchTenantDashboard();
  }, [tenantId]);

  return (
    <div className="min-h-screen bg-gray-100 px-4 sm:px-6 lg:px-8 py-10 text-black">
      <div className="max-w-3xl mx-auto">
        {/* Page Title */}
        <h1 className="text-lg font-semibold text-center mb-8">
          Dashboard Overview
        </h1>

        {/* Stacked Cards */}
        <div className="flex flex-col space-y-4">
          {/* Upcoming Visits */}
          <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-200">
            <h2 className="text-base font-medium mb-1">Upcoming Visits</h2>
            <p className="text-lg font-semibold text-[#007B94]">
              {dashboardData.visits}
            </p>
            <p className="text-sm text-gray-700">scheduled this week</p>
          </div>

          {/* Tasks */}
          <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-200">
            <h2 className="text-base font-medium mb-1">Tasks</h2>
            <p className="text-lg font-semibold text-[#007B94]">
              {dashboardData.tasks}
            </p>
            <p className="text-sm text-gray-700">pending completion</p>
          </div>

          {/* Alerts */}
          <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-200">
            <h2 className="text-base font-medium mb-1">Alerts</h2>
            <p className="text-lg font-semibold text-[#007B94]">
              {dashboardData.alerts}
            </p>
            <p className="text-sm text-gray-700">require immediate attention</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
