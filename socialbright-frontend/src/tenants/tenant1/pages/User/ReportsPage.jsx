// src/pages/ReportsPage.jsx
import React, { useState } from 'react';

export default function ReportsPage() {
  const [filters, setFilters] = useState({
    client: '',
    status: '',
    startDate: '',
    endDate: '',
  });

  const clients = ['Jane Doe', 'John Smith', 'Maria Rivera'];
  const statuses = ['To Do', 'In Progress', 'Done'];

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const exportCSV = () => alert('CSV export coming soon.');
  const exportPDF = () => alert('PDF export coming soon.');

  const allClients = [
    { name: 'Jane Doe', dob: '01/01/1990', status: 'Active', city: 'Manchester', lastContact: '07/02/2025' },
    { name: 'John Smith', dob: '03/12/1982', status: 'Discharged', city: 'Concord', lastContact: '06/15/2025' },
    { name: 'Maria Rivera', dob: '09/10/1975', status: 'Medical Suspension', city: 'Nashua', lastContact: '06/30/2025' },
    { name: 'Eva Li', dob: '12/18/1995', status: 'Active', city: 'Manchester', lastContact: '07/03/2025' },
  ];

  const activeClients = allClients.filter(
    (c) => !['Discharged', 'Medical Suspension', 'Social Suspension'].includes(c.status)
  );

  const suspendedClients = allClients.filter((c) =>
    ['Discharged', 'Medical Suspension', 'Social Suspension'].includes(c.status)
  );

  const cityGroups = activeClients.reduce((acc, client) => {
    if (!acc[client.city]) acc[client.city] = [];
    acc[client.city].push(client.name);
    return acc;
  }, {});

  const clientsByCity = Object.entries(cityGroups).map(([city, names]) => ({
    city,
    count: names.length,
    clients: names,
  }));

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-16">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold text-center mb-8 text-black">Reports</h1>

        {/* Filters */}
        <div className="bg-white p-3 rounded-lg shadow-sm mb-6 text-sm">
          <div className="grid md:grid-cols-4 gap-3">
            <select
              name="client"
              value={filters.client}
              onChange={handleFilterChange}
              className="p-1 border rounded-md"
            >
              <option value="">All Clients</option>
              {clients.map((client) => (
                <option key={client}>{client}</option>
              ))}
            </select>

            <select
              name="status"
              value={filters.status}
              onChange={handleFilterChange}
              className="p-1 border rounded-md"
            >
              <option value="">All Statuses</option>
              {statuses.map((status) => (
                <option key={status}>{status}</option>
              ))}
            </select>

            <input
              type="date"
              name="startDate"
              value={filters.startDate}
              onChange={handleFilterChange}
              className="p-1 border rounded-md"
            />
            <input
              type="date"
              name="endDate"
              value={filters.endDate}
              onChange={handleFilterChange}
              className="p-1 border rounded-md"
            />
          </div>
        </div>

        {/* Dashboard Metrics */}
        <div className="grid md:grid-cols-3 gap-4 mb-8 text-sm">
          <MetricCard label="Total Active Clients" value={activeClients.length} />
          <MetricCard label="Completed Plans of Care" value={18} />
          <MetricCard label="Open Tasks" value={12} />
        </div>

        {/* Reports */}
        <ReportSection
          title="Client Summary Report"
          headers={['Client Name', 'DOB', 'Status']}
          rows={activeClients.map((c) => [c.name, c.dob, c.status])}
        />

        <ReportSection
          title="Demographic Breakdown"
          headers={['Category', 'Count']}
          rows={[
            ['Female', 18],
            ['Male', 14],
            ['Hispanic', 9],
            ['White', 13],
          ]}
        />

        <ReportSection
          title="Eligibility Status Report"
          headers={['Client', 'Eligible?', 'MEA Date']}
          rows={[
            ['Jane Doe', 'Yes', '06/30/2025'],
            ['Eva Li', 'Yes', '07/01/2025'],
          ]}
        />

        <ReportSection
          title="Plan of Care Completion"
          headers={['Client', 'Completed?', 'Last Updated']}
          rows={[
            ['Jane Doe', 'Yes', '07/01/2025'],
            ['Eva Li', 'No', '07/03/2025'],
          ]}
        />

        <ReportSection
          title="Tasks Completed by Date Range"
          headers={['Client', 'Task', 'Completed On']}
          rows={[
            ['Jane Doe', 'Upload MEA', '07/02/2025'],
            ['Eva Li', 'Review Demographics', '07/03/2025'],
          ]}
        />

        <ReportSection
          title="Missing Documents / Alerts"
          headers={['Client', 'Missing', 'Urgency']}
          rows={[
            ['Eva Li', 'Consent Form', 'High'],
          ]}
        />

        <ReportSection
          title="Clients by City"
          headers={['City', 'Total Clients', 'Client Names']}
          rows={clientsByCity.map((entry) => [
            entry.city,
            entry.count,
            entry.clients.join(', '),
          ])}
        />

        <ReportSection
          title="Archived & Suspended Clients"
          headers={['Client', 'Status', 'Last Contact']}
          rows={suspendedClients.map((c) => [c.name, c.status, c.lastContact])}
        />

        {/* Export Buttons */}
        <div className="flex justify-center gap-3 mt-10">
          <button
            onClick={exportCSV}
            className="bg-[#007B94] text-white px-4 py-1.5 rounded-md shadow-sm hover:bg-[#00657a] transition text-sm"
          >
            Export CSV
          </button>
          <button
            onClick={exportPDF}
            className="bg-[#007B94] text-white px-4 py-1.5 rounded-md shadow-sm hover:bg-[#00657a] transition text-sm"
          >
            Export PDF
          </button>
        </div>
      </div>
    </div>
  );
}

function MetricCard({ label, value }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm text-center">
      <h2 className="text-base font-semibold text-black">{label}</h2>
      <p className="text-2xl font-bold mt-1 text-[#007B94]">{value}</p>
    </div>
  );
}

function ReportSection({ title, headers, rows }) {
  return (
    <div className="mb-10 text-sm">
      <h2 className="text-lg font-semibold text-black mb-3">{title}</h2>
      <div className="overflow-x-auto rounded-md shadow-sm">
        <table className="min-w-full bg-white border text-xs">
          <thead className="bg-[#007B94] text-white">
            <tr>
              {headers.map((header, i) => (
                <th
                  key={i}
                  className="text-left font-medium px-3 py-1 border-b"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, ri) => (
              <tr key={ri} className="hover:bg-gray-50">
                {row.map((col, ci) => (
                  <td key={ci} className="px-3 py-1 border-b whitespace-nowrap">
                    {col}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
