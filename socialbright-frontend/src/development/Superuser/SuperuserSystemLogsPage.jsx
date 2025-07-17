import React, { useState } from 'react';
import SuperuserNavbar from '@shared/components/superuser/SuperuserNavbar';

const mockLogs = [
  { id: 1, timestamp: '2025-07-14 10:22:03', level: 'INFO', source: 'System', message: 'Server started successfully.' },
  { id: 2, timestamp: '2025-07-14 10:24:17', level: 'WARNING', source: 'JobQueue', message: 'Delayed job exceeded expected run time.' },
  { id: 3, timestamp: '2025-07-14 10:30:52', level: 'ERROR', source: 'Database', message: 'Migration failed: Missing table "audit_logs".' },
  { id: 4, timestamp: '2025-07-14 10:35:01', level: 'INFO', source: 'UserMgmt', message: 'Superuser account created.' },
  // Add more as needed
];

export default function SuperuserSystemLogsPage() {
  const [search, setSearch] = useState('');

  const filteredLogs = mockLogs.filter(
    (log) =>
      log.message.toLowerCase().includes(search.toLowerCase()) ||
      log.source.toLowerCase().includes(search.toLowerCase())
  );

  const getBadgeColor = (level) => {
    switch (level) {
      case 'INFO':
        return 'bg-blue-100 text-blue-800';
      case 'WARNING':
        return 'bg-yellow-100 text-yellow-800';
      case 'ERROR':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gray-100 px-6 py-8 text-black">
        <div className="max-w-5xl mx-auto bg-white p-6 rounded shadow">
          <h2 className="text-xl font-bold mb-4">System Logs</h2>

          {/* Search Filter */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search logs by message or source..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input"
            />
          </div>

          {/* Logs Table */}
          <div className="overflow-x-auto">
            <table className="w-full table-auto text-sm">
              <thead>
                <tr className="bg-gray-200 text-left">
                  <th className="px-4 py-2">Timestamp</th>
                  <th className="px-4 py-2">Level</th>
                  <th className="px-4 py-2">Source</th>
                  <th className="px-4 py-2">Message</th>
                </tr>
              </thead>
              <tbody>
                {filteredLogs.length > 0 ? (
                  filteredLogs.map((log) => (
                    <tr key={log.id} className="border-b">
                      <td className="px-4 py-2 whitespace-nowrap">{log.timestamp}</td>
                      <td className="px-4 py-2">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getBadgeColor(log.level)}`}>
                          {log.level}
                        </span>
                      </td>
                      <td className="px-4 py-2">{log.source}</td>
                      <td className="px-4 py-2">{log.message}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center px-4 py-6 text-gray-500">
                      No logs found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
