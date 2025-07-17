import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const dummyProviders = [
  {
    id: 1,
    name: 'Dr. Jane Smith',
    service: 'Primary Care',
    type: 'Primary Care Physician',
    phone: '555-123-4567',
    email: 'dr.jane@example.com',
    address: '123 Health St, City, State, ZIP',
  },
  {
    id: 2,
    name: 'Therapist John Doe',
    service: 'Physical Therapy',
    type: 'Physical Therapist',
    phone: '555-987-6543',
    email: 'john.doe@example.com',
    address: '456 Wellness Ave, City, State, ZIP',
  },
];

export default function ProvidersPage() {
  const { id: clientId } = useParams();

  const [providers, setProviders] = useState(dummyProviders);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    service: '',
    type: '',
    phone: '',
    email: '',
    address: '',
  });

  const handleInputChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAddProvider = (e) => {
    e.preventDefault();
    const newProvider = { id: Date.now(), ...formData };
    setProviders((prev) => [...prev, newProvider]);
    setFormData({
      name: '',
      service: '',
      type: '',
      phone: '',
      email: '',
      address: '',
    });
    setShowForm(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 text-black">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-xl sm:text-2xl font-semibold mb-6">Providers</h1>

        <button
          onClick={() => setShowForm(true)}
          className="mb-4 bg-[#007B94] hover:bg-[#00657a] text-white px-3 py-1.5 text-sm rounded-md transition"
        >
          + Add Provider
        </button>

        <div className="overflow-x-auto bg-white rounded-xl shadow-sm border border-gray-200">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-[#007B94] text-white">
              <tr>
                <th className="px-3 py-2 font-medium">Name</th>
                <th className="px-3 py-2 font-medium">Service</th>
                <th className="px-3 py-2 font-medium">Type</th>
                <th className="px-3 py-2 font-medium">Phone</th>
                <th className="px-3 py-2 font-medium">Email</th>
                <th className="px-3 py-2 font-medium">Address</th>
              </tr>
            </thead>

            <tbody>
              {providers.map((provider) => (
                <tr key={provider.id} className="hover:bg-gray-100 transition">
                  <td className="px-3 py-2">{provider.name}</td>
                  <td className="px-3 py-2">{provider.service}</td>
                  <td className="px-3 py-2">{provider.type}</td>
                  <td className="px-3 py-2">{provider.phone}</td>
                  <td className="px-3 py-2">{provider.email}</td>
                  <td className="px-3 py-2">{provider.address}</td>
                </tr>
              ))}
              {providers.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center py-4 text-gray-500">
                    No providers added yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Provider Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <form
            onSubmit={handleAddProvider}
            className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md"
          >
            <h2 className="text-lg font-semibold mb-4">Add New Provider</h2>

            <label className="block mb-2">
              Name
              <input
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
              />
            </label>

            <label className="block mb-2">
              Service
              <input
                name="service"
                value={formData.service}
                onChange={handleInputChange}
                required
                className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
              />
            </label>

            <label className="block mb-2">
              Type
              <input
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                required
                className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
              />
            </label>

            <label className="block mb-2">
              Phone
              <input
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
              />
            </label>

            <label className="block mb-2">
              Email
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
              />
            </label>

            <label className="block mb-4">
              Address
              <textarea
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                rows={2}
                className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 resize-none"
              />
            </label>

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-4 py-2 rounded border border-gray-300 hover:bg-gray-100 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded bg-[#007B94] text-white hover:bg-[#00657a] transition"
              >
                Add
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
