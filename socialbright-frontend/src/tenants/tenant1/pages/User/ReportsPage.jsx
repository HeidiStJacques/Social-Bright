import React, { useState, useEffect } from 'react';

export default function ReportsPage() {
  const [filters, setFilters] = useState({
    client: '',
    status: '',
    startDate: '',
    endDate: '',
  });

  const [reportType, setReportType] = useState("client-summary");
  const [allClients, setAllClients] = useState([]);
  const [planOfCareData, setPlanOfCareData] = useState([]);

  useEffect(() => {
    const fetchClients = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await fetch('http://localhost:8000/api/clients/', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setAllClients(data);
      } catch (err) {
        console.error('Failed to load clients', err);
      }
    };

    fetchClients();
  }, []);

  useEffect(() => {
    if (reportType === "plan-of-care-status") {
      const fetchPlanStatus = async () => {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:8000/api/reports/plan-of-care-status", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setPlanOfCareData(data);
      };
      fetchPlanStatus();
    }
  }, [reportType]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const exportCSV = async () => {
    const token = localStorage.getItem('token');

    if (reportType === "eligibility-status") {
      window.open("http://localhost:8000/api/reports/eligibility-status/export", "_blank");
      return;
    }

    if (reportType === "plan-of-care-status") {
      window.open("http://localhost:8000/api/reports/plan-of-care-status/export", "_blank");
      return;
    }

    const params = new URLSearchParams({
      report_type: reportType,
      format: 'csv',
    });

    if (filters.client) params.append('client_id', filters.client);
    if (filters.status) params.append('status', filters.status);
    if (filters.startDate) params.append('start_date', filters.startDate);
    if (filters.endDate) params.append('end_date', filters.endDate);

    const url = `http://localhost:8000/api/reports/export?${params.toString()}`;

    try {
      const response = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) throw new Error('Export failed');

      const blob = await response.blob();
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = `${reportType}.csv`;
      link.click();
    } catch (err) {
      alert('Failed to export CSV.');
      console.error(err);
    }
  };

  const exportPDF = async () => {
    const token = localStorage.getItem('token');
    const url = `http://localhost:8000/api/reports/export-pdf?report_type=${reportType}`;

    try {
      const response = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) throw new Error('Export failed');

      const blob = await response.blob();
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = `${reportType}.pdf`;
      link.click();
    } catch (err) {
      alert('Failed to export PDF.');
      console.error(err);
    }
  };

  const activeClients = allClients.filter(
    (c) => !['Discharged', 'Medical Suspension', 'Social Suspension'].includes(c.status)
  );

  const suspendedClients = allClients.filter((c) =>
    ['Discharged', 'Medical Suspension', 'Social Suspension'].includes(c.status)
  );

  const cityGroups = activeClients.reduce((acc, client) => {
    const city = client.city || 'Unknown';
    if (!acc[city]) acc[city] = [];
    acc[city].push(`${client.first_name} ${client.last_name}`);
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
            <select name="client" value={filters.client} onChange={handleFilterChange} className="p-1 border rounded-md">
              <option value="">All Clients</option>
              {allClients.map((client) => (
                <option key={client.id} value={client.id}>
                  {client.first_name} {client.last_name}
                </option>
              ))}
            </select>
            <select name="status" value={filters.status} onChange={handleFilterChange} className="p-1 border rounded-md">
              <option value="">All Statuses</option>
              <option>To Do</option>
              <option>In Progress</option>
              <option>Done</option>
              <option>Active</option>
              <option>Discharged</option>
              <option>Medical Suspension</option>
              <option>Social Suspension</option>
            </select>
            <input type="date" name="startDate" value={filters.startDate} onChange={handleFilterChange} className="p-1 border rounded-md" />
            <input type="date" name="endDate" value={filters.endDate} onChange={handleFilterChange} className="p-1 border rounded-md" />
          </div>
        </div>

        {/* Metrics */}
        <div className="grid md:grid-cols-3 gap-4 mb-8 text-sm">
          <MetricCard label="Total Active Clients" value={activeClients.length} />
          <MetricCard label="Completed Plans of Care" value={18} />
          <MetricCard label="Open Tasks" value={12} />
        </div>

        {/* Reports */}
        <ReportSection
          title="Clients by City"
          headers={['City', 'Total Clients', 'Client Names']}
          rows={clientsByCity.map((entry) => [entry.city, entry.count, entry.clients.join(', ')])}
        />
        <ReportSection
          title="Archived & Suspended Clients"
          headers={['Client', 'Status']}
          rows={suspendedClients.map((c) => [`${c.first_name} ${c.last_name}`, c.status])}
        />
        {reportType === "plan-of-care-status" && (
          <ReportSection
            title="Plan of Care Completion Status"
            headers={["Client", "Last Plan Date", "Status"]}
            rows={planOfCareData.map((r) => [r.name, r.last_plan_date, r.status])}
          />
        )}

        {/* Export Controls */}
        <div className="flex flex-col md:flex-row justify-center gap-3 items-center mt-10 text-sm">
          <select value={reportType} onChange={(e) => setReportType(e.target.value)} className="border px-2 py-1 rounded-md">
            <option value="client-summary">Client Summary</option>
            <option value="demographics">Demographics</option>
            <option value="eligibility-status">Eligibility Status</option>
            <option value="plan-of-care-status">Plan of Care Completion Status</option>
            <option value="tasks-completed">Tasks Completed</option>
            <option value="missing-documents">Missing Documents</option>
          </select>
          <button onClick={exportCSV} className="bg-[#007B94] text-white px-4 py-1.5 rounded-md shadow-sm hover:bg-[#00657a] transition">Export CSV</button>
          <button onClick={exportPDF} className="bg-[#007B94] text-white px-4 py-1.5 rounded-md shadow-sm hover:bg-[#00657a] transition">Export PDF</button>
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
            <tr>{headers.map((header, i) => (
              <th key={i} className="text-left font-medium px-3 py-1 border-b">{header}</th>
            ))}</tr>
          </thead>
          <tbody>
            {rows.map((row, ri) => (
              <tr key={ri} className="hover:bg-gray-50">
                {row.map((col, ci) => (
                  <td key={ci} className="px-3 py-1 border-b whitespace-nowrap">{col}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
