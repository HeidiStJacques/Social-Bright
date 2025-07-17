import React, { useState } from 'react';
import AdminNavbar from '@shared/components/admin/AdminNavbar';
import { Download } from 'lucide-react';

export default function AdminReportsPage() {
  const [filter, setFilter] = useState({
    client: '',
    status: '',
    startDate: '',
    endDate: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilter((prev) => ({ ...prev, [name]: value }));
  };

  const handleExport = (type, reportName) => {
    console.log(`Exporting ${reportName} as ${type}`);
    // Placeholder – export logic to come later
  };

  const reports = [
    'Client Summary',
    'Demographic Breakdown',
    'Eligibility Status',
    'Plan of Care Completion',
    'Tasks Completed',
    'Missing Documents / Alerts',
  ];

  return (
    <>
      <div className="min-h-screen bg-gray-100 px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-black mb-6">Admin Reports</h2>

          {/* Filters */}
          <div className="bg-white p-4 rounded shadow mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
            <input
              type="text"
              name="client"
              placeholder="Client Name or ID"
              value={filter.client}
              onChange={handleChange}
              className="input"
            />
            <select
              name="status"
              value={filter.status}
              onChange={handleChange}
              className="input"
            >
              <option value="">All Statuses</option>
              <option value="active">Active</option>
              <option value="discharged">Discharged</option>
              <option value="suspended">Suspended</option>
            </select>
            <input
              type="date"
              name="startDate"
              value={filter.startDate}
              onChange={handleChange}
              className="input"
            />
            <input
              type="date"
              name="endDate"
              value={filter.endDate}
              onChange={handleChange}
              className="input"
            />
          </div>

          {/* Metric Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-white rounded shadow p-4 text-center">
              <h4 className="text-sm text-gray-500">Total Clients</h4>
              <p className="text-xl font-bold text-black">126</p>
            </div>
            <div className="bg-white rounded shadow p-4 text-center">
              <h4 className="text-sm text-gray-500">Missing Documents</h4>
              <p className="text-xl font-bold text-black">14</p>
            </div>
            <div className="bg-white rounded shadow p-4 text-center">
              <h4 className="text-sm text-gray-500">Overdue Tasks</h4>
              <p className="text-xl font-bold text-black">9</p>
            </div>
          </div>

          {/* Report Sections */}
          {reports.map((name) => (
            <div key={name} className="bg-white rounded shadow mb-6 p-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold text-black">{name} Report</h3>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleExport('csv', name)}
                    className="flex items-center px-3 py-1 text-sm bg-[#007B94] text-white rounded hover:bg-[#006377]"
                  >
                    <Download className="w-4 h-4 mr-1" /> CSV
                  </button>
                  <button
                    onClick={() => handleExport('pdf', name)}
                    className="flex items-center px-3 py-1 text-sm bg-[#007B94] text-white rounded hover:bg-[#006377]"
                  >
                    <Download className="w-4 h-4 mr-1" /> PDF
                  </button>
                </div>
              </div>
              <div className="overflow-auto">
                <table className="min-w-full table-auto text-sm border border-gray-200">
                  <thead className="bg-[#007B94] text-white">
                    <tr>
                      <th className="px-4 py-2 text-left">Example Column 1</th>
                      <th className="px-4 py-2 text-left">Example Column 2</th>
                      <th className="px-4 py-2 text-left">Example Column 3</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t">
                      <td className="px-4 py-2">Data 1</td>
                      <td className="px-4 py-2">Data 2</td>
                      <td className="px-4 py-2">Data 3</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
