import React, { useState } from 'react';
import SuperuserNavbar from '@shared/components/superuser/SuperuserNavbar';
import { Edit, Trash, KeyRound, ToggleRight, ToggleLeft, X } from 'lucide-react';

const tenants = ['Social Bright', 'CareGroup Inc', 'Hope Foundation'];

export default function SuperuserAdminAccountsPage() {
  const [admins, setAdmins] = useState([
    {
      id: 1,
      firstName: 'Heidi',
      lastName: 'StJacques',
      email: 'heidi@socialbright.org',
      role: 'Admin',
      tenant: 'Social Bright',
      enabled: true,
      address: {
        street: '123 Main St',
        city: 'Concord',
        state: 'NH',
        zip: '03301',
      },
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editAdmin, setEditAdmin] = useState(null);

  const handleEdit = (admin) => {
    setEditAdmin({ ...admin });
    setShowModal(true);
  };

  const handleSave = () => {
    setAdmins((prev) =>
      prev.map((admin) => (admin.id === editAdmin.id ? editAdmin : admin))
    );
    setShowModal(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditAdmin((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setEditAdmin((prev) => ({
      ...prev,
      address: { ...prev.address, [name]: value },
    }));
  };

  const handleToggleStatus = (id) => {
    setAdmins((prev) =>
      prev.map((admin) =>
        admin.id === id ? { ...admin, enabled: !admin.enabled } : admin
      )
    );
  };

  const handleDelete = (id) => {
    setAdmins((prev) => prev.filter((admin) => admin.id !== id));
  };

  return (
    <>
      <div className="min-h-screen bg-gray-100 px-6 py-6">
        <div className="w-full">
          <h2 className="text-2xl font-bold text-black mb-6">Superuser – Admin Accounts</h2>

          <table className="min-w-full table-auto text-sm border border-gray-200">
            <thead className="bg-[#007B94] text-white">
              <tr>
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Email</th>
                <th className="px-4 py-2 text-left">Tenant</th>
                <th className="px-4 py-2 text-left">Role</th>
                <th className="px-4 py-2 text-left">Status</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {admins.map((admin) => (
                <tr key={admin.id} className="border-t">
                  <td className="px-4 py-2">{admin.firstName} {admin.lastName}</td>
                  <td className="px-4 py-2">{admin.email}</td>
                  <td className="px-4 py-2">{admin.tenant}</td>
                  <td className="px-4 py-2">{admin.role}</td>
                  <td className="px-4 py-2">
                    {admin.enabled ? (
                      <span className="text-green-600">Enabled</span>
                    ) : (
                      <span className="text-red-600">Disabled</span>
                    )}
                  </td>
                  <td className="px-4 py-2 space-x-2">
                    <button title="Reset Password" className="text-[#007B94]">
                      <KeyRound className="w-4 h-4 inline" />
                    </button>
                    <button
                      onClick={() => handleToggleStatus(admin.id)}
                      title="Toggle Account"
                      className="text-[#007B94]"
                    >
                      {admin.enabled ? (
                        <ToggleRight className="w-4 h-4 inline" />
                      ) : (
                        <ToggleLeft className="w-4 h-4 inline" />
                      )}
                    </button>
                    <button
                      onClick={() => handleEdit(admin)}
                      title="Edit"
                      className="text-[#007B94]"
                    >
                      <Edit className="w-4 h-4 inline" />
                    </button>
                    <button
                      onClick={() => handleDelete(admin.id)}
                      title="Delete"
                      className="text-red-600"
                    >
                      <Trash className="w-4 h-4 inline" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Edit Modal */}
          {showModal && editAdmin && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white w-full max-w-xl p-6 rounded shadow-lg relative">
                <button
                  onClick={() => setShowModal(false)}
                  className="absolute top-2 right-2 text-gray-500 hover:text-black"
                >
                  <X className="w-5 h-5" />
                </button>
                <h3 className="text-lg font-bold text-black mb-4">Edit Admin Account</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    name="firstName"
                    value={editAdmin.firstName}
                    onChange={handleInputChange}
                    className="input"
                    placeholder="First Name"
                  />
                  <input
                    name="lastName"
                    value={editAdmin.lastName}
                    onChange={handleInputChange}
                    className="input"
                    placeholder="Last Name"
                  />
                  <input
                    name="email"
                    value={editAdmin.email}
                    onChange={handleInputChange}
                    className="input col-span-1 md:col-span-2"
                    placeholder="Email"
                  />
                  <select
                    name="role"
                    value={editAdmin.role}
                    onChange={handleInputChange}
                    className="input"
                  >
                    <option value="Admin">Admin</option>
                    <option value="Superuser">Superuser</option>
                  </select>
                  <select
                    name="tenant"
                    value={editAdmin.tenant}
                    onChange={handleInputChange}
                    className="input"
                  >
                    {tenants.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                  <input
                    name="street"
                    value={editAdmin.address.street}
                    onChange={handleAddressChange}
                    className="input col-span-1 md:col-span-2"
                    placeholder="Street Address"
                  />
                  <input
                    name="city"
                    value={editAdmin.address.city}
                    onChange={handleAddressChange}
                    className="input"
                    placeholder="City"
                  />
                  <input
                    name="state"
                    value={editAdmin.address.state}
                    onChange={handleAddressChange}
                    className="input"
                    placeholder="State"
                  />
                  <input
                    name="zip"
                    value={editAdmin.address.zip}
                    onChange={handleAddressChange}
                    className="input"
                    placeholder="ZIP Code"
                  />
                </div>
                <div className="mt-6 flex justify-end space-x-2">
                  <button
                    onClick={handleSave}
                    className="bg-[#007B94] text-white px-4 py-2 rounded hover:bg-[#006377] transition"
                  >
                    Save Changes
                  </button>
                  <button
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 border rounded text-gray-600 hover:text-black"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
