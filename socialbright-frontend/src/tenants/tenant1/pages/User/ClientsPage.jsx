import React from 'react';
import { useNavigate } from 'react-router-dom';

import { useTenant } from '@context/TenantContext';


export default function ClientsPage() {
  const navigate = useNavigate();
  const { tenantId } = useTenant(); // Pull tenant ID from context

  const clients = [
    {
      id: 1,
      lastName: 'Smith',
      firstName: 'John',
      dob: '01/01/1980',
      medicaidId: '123456789',
      phone: '555-123-4567',
      guardianName: 'Mary Smith',
      mco: 'AmeriHealth',
    },
    {
      id: 2,
      lastName: 'Doe',
      firstName: 'Jane',
      dob: '04/12/1975',
      medicaidId: '987654321',
      phone: '555-987-6543',
      guardianName: 'Tom Doe',
      mco: 'WellSense',
    },
  ];

  const handleSelectClient = (clientId) => {
    localStorage.setItem('selectedClientId', clientId);
    navigate(`/tenants/${tenantId}/clients/${clientId}/demographics`);
  };

  const handleViewClient = (clientId) => {
    navigate(`/tenants/${tenantId}/clients/${clientId}/overview`);
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 sm:px-6 lg:px-8 py-8 text-black">
      <h1 className="text-lg font-semibold mb-6">Clients</h1>

      <div className="overflow-x-auto bg-white shadow-sm rounded-xl border border-gray-200">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-[#007B94] text-black">
            <tr>
              <th className="px-3 py-2 font-semibold">Select</th>
              <th className="px-3 py-2 font-semibold">Last Name</th>
              <th className="px-3 py-2 font-semibold">First Name</th>
              <th className="px-3 py-2 font-semibold">Date of Birth</th>
              <th className="px-3 py-2 font-semibold">Medicaid ID</th>
              <th className="px-3 py-2 font-semibold">Phone</th>
              <th className="px-3 py-2 font-semibold">Guardian Name</th>
              <th className="px-3 py-2 font-semibold">MCO</th>
              <th className="px-3 py-2 font-semibold">View</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {clients.map((client) => (
              <tr key={client.id} className="hover:bg-gray-100 transition-colors duration-200">
                <td className="px-3 py-2">
                  <button
                    onClick={() => handleSelectClient(client.id)}
                    className="text-[#007B94] font-medium hover:underline"
                  >
                    Select
                  </button>
                </td>
                <td className="px-3 py-2">{client.lastName}</td>
                <td className="px-3 py-2">{client.firstName}</td>
                <td className="px-3 py-2">{client.dob}</td>
                <td className="px-3 py-2">{client.medicaidId}</td>
                <td className="px-3 py-2">{client.phone}</td>
                <td className="px-3 py-2">{client.guardianName}</td>
                <td className="px-3 py-2">{client.mco}</td>
                <td className="px-3 py-2">
                  <button
                    onClick={() => handleViewClient(client.id)}
                    className="text-[#007B94] font-medium hover:underline"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
