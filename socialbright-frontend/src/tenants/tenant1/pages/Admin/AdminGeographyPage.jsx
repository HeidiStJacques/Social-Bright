import React, { useState } from 'react';
import AdminLayout from '@layouts/AdminLayout';

const dummyRegions = [
  {
    id: 1,
    region: 'Keene Area',
    zip: '03431',
    staff: 'Heidi StJacques',
    clients: 12,
  },
  {
    id: 2,
    region: 'Manchester',
    zip: '03103',
    staff: 'Greg Turner',
    clients: 21,
  },
  {
    id: 3,
    region: 'Concord',
    zip: '03301',
    staff: 'Unassigned',
    clients: 5,
  },
];

export default function AdminGeographyPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredRegions = dummyRegions.filter((r) =>
    r.region.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.zip.includes(searchTerm) ||
    r.staff.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
      <div className="min-h-screen bg-gray-100 p-6 text-black">
        <h1 className="text-2xl font-bold mb-4">Geographic Assignments</h1>

        {/* Search */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search by region, zip, or staff"
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
                <th className="text-left px-4 py-2">Region</th>
                <th className="text-left px-4 py-2">ZIP Code</th>
                <th className="text-left px-4 py-2">Assigned Staff</th>
                <th className="text-left px-4 py-2"># Clients</th>
                <th className="text-left px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRegions.map((region) => (
                <tr key={region.id} className="border-t">
                  <td className="px-4 py-2">{region.region}</td>
                  <td className="px-4 py-2">{region.zip}</td>
                  <td className="px-4 py-2">{region.staff}</td>
                  <td className="px-4 py-2">{region.clients}</td>
                  <td className="px-4 py-2">
                    <button className="text-[#007B94] underline text-sm">
                      Reassign
                    </button>
                  </td>
                </tr>
              ))}
              {filteredRegions.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center px-4 py-4 text-gray-500">
                    No matching regions.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
  );
}
