import React, { useState } from 'react';
import AdminLayout from '@layouts/AdminLayout';
import { Link } from 'react-router-dom';

const dummyClients = [
  {
    id: 1,
    firstName: 'Sarah',
    lastName: 'Thompson',
    medicaidId: 'NH123456789',
    status: 'Active',
    enrolledDate: '2024-03-15',
  },
  {
    id: 2,
    firstName: 'James',
    lastName: 'Nguyen',
    medicaidId: 'NH987654321',
    status: 'Discharged',
    enrolledDate: '2023-07-10',
  },
  {
    id: 3,
    firstName: 'Emily',
    lastName: 'Rodriguez',
    medicaidId: 'NH567891234',
    status: 'Suspended',
    enrolledDate: '2024-10-01',
  },
];

export default function AdminClientManagementPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredClients = dummyClients.filter((client) =>
    `${client.firstName} ${client.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.medicaidId.includes(searchTerm)
  );

  return (
      <div className="min-h-screen bg-gray-100 p-6 text-black">
        <h1 className="text-2xl font-bold mb-4">Client Management</h1>

        {/* Search */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search by name or Medicaid ID"
            className="border border-gray-300 rounded px-3 py-2 w-full max-w-md text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Client Table */}
        <div className="overflow-x-auto bg-white rounded-xl shadow">
          <table className="min-w-full table-auto text-sm">
            <thead className="bg-[#007B94] text-white">
              <tr>
                <th className="text-left px-4 py-2">Name</th>
                <th className="text-left px-4 py-2">Medicaid ID</th>
                <th className="text-left px-4 py-2">Status</th>
                <th className="text-left px-4 py-2">Enrolled</th>
                <th className="text-left px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredClients.map((client) => (
                <tr key={client.id} className="border-t">
                  <td className="px-4 py-2">{client.lastName}, {client.firstName}</td>
                  <td className="px-4 py-2">{client.medicaidId}</td>
                  <td className="px-4 py-2">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        client.status === 'Active'
                          ? 'bg-green-100 text-green-700'
                          : client.status === 'Suspended'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {client.status}
                    </span>
                  </td>
                  <td className="px-4 py-2">{client.enrolledDate}</td>
                  <td className="px-4 py-2">
                    <Link
                      to={`/admin/clients/${client.id}`}
                      className="text-[#007B94] underline text-sm"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}
              {filteredClients.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center px-4 py-4 text-gray-500">
                    No clients found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
  );
}
