import React, { useEffect, useState } from 'react';
import { useTenant } from '@context/TenantContext';
import {
  getDashboardClientCount,
  getUpcomingVisitsForUser,
  getTasksForUser,
  getAlerts,
} from '@services/dashboardService';
import DashboardVisitsList from './DashboardVisitsList';
import DashboardTasksList from './DashboardTasksList';
import DashboardAlertsList from './DashboardAlertsList';

const DashboardPage = () => {
  const { tenantId } = useTenant();
  const [dashboardData, setDashboardData] = useState({
    totalClients: 0,
    visits: 0,
    visitDetails: [],
    tasks: 0,
    taskDetails: [],
    alerts: 0,
    alertDetails: [],
  });

  useEffect(() => {
    if (!tenantId) return;

    const fetchDashboard = async () => {
      try {
        const totalClients = await getDashboardClientCount();
        const visitDetails = await getUpcomingVisitsForUser();
        const taskDetails = await getTasksForUser();
        const alertDetails = await getAlerts();

        setDashboardData({
          totalClients,
          visits: visitDetails.length,
          visitDetails,
          tasks: taskDetails.length,
          taskDetails,
          alerts: alertDetails.length,
          alertDetails,
        });
      } catch (err) {
        console.error('Failed to fetch dashboard data', err);
      }
    };

    fetchDashboard();
  }, [tenantId]);

  return (
    <div className="min-h-screen bg-gray-100 px-4 sm:px-6 lg:px-8 py-10 text-black">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-lg font-semibold text-center mb-10">
          Dashboard Overview
        </h1>

        <div className="grid grid-cols-1 gap-6">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <h2 className="text-sm font-medium mb-1">Total Clients</h2>
            <p className="text-lg font-semibold text-[#007B94]">{dashboardData.totalClients}</p>
            <p className="text-sm text-gray-700">in your organization</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <h2 className="text-sm font-medium mb-1">Upcoming Visits</h2>
            <p className="text-lg font-semibold text-[#007B94]">{dashboardData.visits}</p>
            <p className="text-sm text-gray-700">scheduled this week</p>
            <DashboardVisitsList visits={dashboardData.visitDetails} />
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <h2 className="text-sm font-medium mb-1">Tasks</h2>
            <p className="text-lg font-semibold text-[#007B94]">{dashboardData.tasks}</p>
            <p className="text-sm text-gray-700">pending completion</p>
            <DashboardTasksList tasks={dashboardData.taskDetails} />
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <h2 className="text-sm font-medium mb-1">Alerts</h2>
            <p className="text-lg font-semibold text-[#007B94]">{dashboardData.alerts}</p>
            <p className="text-sm text-gray-700">require immediate attention</p>
            <DashboardAlertsList alerts={dashboardData.alertDetails} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
