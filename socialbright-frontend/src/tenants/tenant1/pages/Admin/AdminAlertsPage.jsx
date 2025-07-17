import React, { useState } from 'react';
import AdminLayout from '@layouts/AdminLayout';

const dummyAlerts = [
  {
    id: 1,
    type: 'Urgent',
    message: 'Overdue Home Visit - Client #120',
    date: '2025-07-12',
    status: 'Unresolved',
  },
  {
    id: 2,
    type: 'Warning',
    message: 'Upcoming Eligibility Expiration - Client #093',
    date: '2025-07-14',
    status: 'Unresolved',
  },
  {
    id: 3,
    type: 'Info',
    message: 'New Case Note Added - Client #076',
    date: '2025-07-13',
    status: 'Reviewed',
  },
];

export default function AdminAlertsPage() {
  const [filter, setFilter] = useState('All');

  const filteredAlerts =
    filter === 'All'
      ? dummyAlerts
      : dummyAlerts.filter((alert) => alert.type === filter);

  return (
      <div className="min-h-screen bg-gray-100 p-6 text-black">
        <h1 className="text-2xl font-bold mb-4">System Alerts</h1>

        {/* Filter */}
        <div className="mb-4">
          <label className="mr-2 text-sm font-medium">Filter by Type:</label>
          <select
            className="border border-gray-300 rounded px-2 py-1 text-sm"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option>All</option>
            <option>Urgent</option>
            <option>Warning</option>
            <option>Info</option>
          </select>
        </div>

        {/* Alerts Table */}
        <div className="overflow-x-auto bg-white rounded-xl shadow">
          <table className="min-w-full table-auto text-sm">
            <thead className="bg-[#007B94] text-white">
              <tr>
                <th className="text-left px-4 py-2">Type</th>
                <th className="text-left px-4 py-2">Message</th>
                <th className="text-left px-4 py-2">Date</th>
                <th className="text-left px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredAlerts.map((alert) => (
                <tr key={alert.id} className="border-t">
                  <td className="px-4 py-2 font-semibold">{alert.type}</td>
                  <td className="px-4 py-2">{alert.message}</td>
                  <td className="px-4 py-2">{alert.date}</td>
                  <td className="px-4 py-2">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        alert.status === 'Unresolved'
                          ? 'bg-red-100 text-red-700'
                          : 'bg-green-100 text-green-700'
                      }`}
                    >
                      {alert.status}
                    </span>
                  </td>
                </tr>
              ))}
              {filteredAlerts.length === 0 && (
                <tr>
                  <td colSpan="4" className="text-center px-4 py-4 text-gray-500">
                    No alerts found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
  );
}
