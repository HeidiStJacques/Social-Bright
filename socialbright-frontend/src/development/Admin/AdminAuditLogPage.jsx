import React, { useState } from 'react';
import AdminLayout from '@layouts/AdminLayout';

const dummyAuditLogs = [
  {
    id: 1,
    date: '2025-07-13 09:14:22',
    user: 'hsmith@socialbright.org',
    action: 'Logged in',
    ip: '192.168.1.45',
  },
  {
    id: 2,
    date: '2025-07-13 09:22:04',
    user: 'hsmith@socialbright.org',
    action: 'Viewed Plan of Care - Client #120',
    ip: '192.168.1.45',
  },
  {
    id: 3,
    date: '2025-07-13 10:03:17',
    user: 'admin@socialbright.org',
    action: 'Created new user (jane.doe)',
    ip: '192.168.1.2',
  },
];

export default function AdminAuditLogPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredLogs = dummyAuditLogs.filter((log) =>
    log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.ip.includes(searchTerm)
  );

  return (
      <div className="min-h-screen bg-gray-100 p-6 text-black">
        <h1 className="text-2xl font-bold mb-4">Audit Log</h1>

        {/* Search */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search by user, action, or IP"
            className="border border-gray-300 rounded px-3 py-2 w-full max-w-md text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Table */}
        <div className="overflow-x-auto bg-white rounded-xl shadow">
          <table className="min-w-full table-auto text-sm">
            <thead className="bg-[#007B94] text-white">
              <tr>
                <th className="text-left px-4 py-2">Date</th>
                <th className="text-left px-4 py-2">User</th>
                <th className="text-left px-4 py-2">Action</th>
                <th className="text-left px-4 py-2">IP Address</th>
              </tr>
            </thead>
            <tbody>
              {filteredLogs.map((log) => (
                <tr key={log.id} className="border-t">
                  <td className="px-4 py-2">{log.date}</td>
                  <td className="px-4 py-2">{log.user}</td>
                  <td className="px-4 py-2">{log.action}</td>
                  <td className="px-4 py-2">{log.ip}</td>
                </tr>
              ))}
              {filteredLogs.length === 0 && (
                <tr>
                  <td colSpan="4" className="text-center px-4 py-4 text-gray-500">
                    No matching records.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
   );
}
