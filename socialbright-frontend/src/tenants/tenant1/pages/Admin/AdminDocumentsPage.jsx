import React, { useState } from 'react';
import AdminLayout from '@layouts/AdminLayout';

const dummyDocuments = [
  {
    id: 1,
    fileName: '2025-MEA-Review.pdf',
    category: 'MEA',
    client: 'Sarah Thompson',
    uploadDate: '2025-07-10',
    link: '#',
  },
  {
    id: 2,
    fileName: 'Consent-Form.docx',
    category: 'Consent',
    client: 'James Nguyen',
    uploadDate: '2025-07-09',
    link: '#',
  },
  {
    id: 3,
    fileName: 'Plan-of-Care.pdf',
    category: 'Plan of Care',
    client: 'Emily Rodriguez',
    uploadDate: '2025-07-08',
    link: '#',
  },
];

export default function AdminDocumentsPage() {
  const [categoryFilter, setCategoryFilter] = useState('All');

  const filteredDocuments =
    categoryFilter === 'All'
      ? dummyDocuments
      : dummyDocuments.filter((doc) => doc.category === categoryFilter);

  return (
      <div className="min-h-screen bg-gray-100 p-6 text-black">
        <h1 className="text-2xl font-bold mb-4">All Documents</h1>

        {/* Filter */}
        <div className="mb-4">
          <label className="mr-2 text-sm font-medium">Filter by Category:</label>
          <select
            className="border border-gray-300 rounded px-2 py-1 text-sm"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option>All</option>
            <option>MEA</option>
            <option>Consent</option>
            <option>Plan of Care</option>
          </select>
        </div>

        {/* Table */}
        <div className="overflow-x-auto bg-white rounded-xl shadow">
          <table className="min-w-full table-auto text-sm">
            <thead className="bg-[#007B94] text-white">
              <tr>
                <th className="text-left px-4 py-2">File Name</th>
                <th className="text-left px-4 py-2">Category</th>
                <th className="text-left px-4 py-2">Client</th>
                <th className="text-left px-4 py-2">Upload Date</th>
                <th className="text-left px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredDocuments.map((doc) => (
                <tr key={doc.id} className="border-t">
                  <td className="px-4 py-2">{doc.fileName}</td>
                  <td className="px-4 py-2">{doc.category}</td>
                  <td className="px-4 py-2">{doc.client}</td>
                  <td className="px-4 py-2">{doc.uploadDate}</td>
                  <td className="px-4 py-2">
                    <a
                      href={doc.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#007B94] underline text-sm"
                    >
                      View
                    </a>
                  </td>
                </tr>
              ))}
              {filteredDocuments.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center px-4 py-4 text-gray-500">
                    No documents found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
  );
}
