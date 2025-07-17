import React, { useState } from 'react';
import SuperuserNavbar from '@shared/components/superuser/SuperuserNavbar';

export default function SuperuserNewUserPage() {
  const [tenantForm, setTenantForm] = useState({
    name: '',
    contactName: '',
    contactEmail: '',
    contactPhone: '',
    status: 'Active',
    notes: '',
  });

  const [superForm, setSuperForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    isEnabled: true,
  });

  const handleChange = (e, setForm) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleTenantSubmit = (e) => {
    e.preventDefault();
    console.log('New Tenant Created:', tenantForm);
    alert('Tenant created!');
  };

  const handleSuperuserSubmit = (e) => {
    e.preventDefault();
    const finalForm = { ...superForm, role: 'Superuser' };
    console.log('New Superuser Created:', finalForm);
    alert('Superuser created!');
  };

  return (
    <>
      <div className="min-h-screen bg-gray-100 px-6 py-10 text-black space-y-10">
        {/* Create Tenant */}
        <div className="max-w-3xl bg-white p-6 rounded shadow mx-auto">
          <h2 className="text-xl font-bold mb-4">Create New Tenant</h2>
          <form onSubmit={handleTenantSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Tenant Name</label>
              <input
                name="name"
                value={tenantForm.name}
                onChange={(e) => handleChange(e, setTenantForm)}
                className="input"
                required
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Contact Name</label>
                <input
                  name="contactName"
                  value={tenantForm.contactName}
                  onChange={(e) => handleChange(e, setTenantForm)}
                  className="input"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Contact Email</label>
                <input
                  type="email"
                  name="contactEmail"
                  value={tenantForm.contactEmail}
                  onChange={(e) => handleChange(e, setTenantForm)}
                  className="input"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Contact Phone</label>
                <input
                  type="tel"
                  name="contactPhone"
                  value={tenantForm.contactPhone}
                  onChange={(e) => handleChange(e, setTenantForm)}
                  className="input"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Status</label>
                <select
                  name="status"
                  value={tenantForm.status}
                  onChange={(e) => handleChange(e, setTenantForm)}
                  className="input"
                >
                  <option>Active</option>
                  <option>Pending</option>
                  <option>Suspended</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Notes</label>
              <textarea
                name="notes"
                value={tenantForm.notes}
                onChange={(e) => handleChange(e, setTenantForm)}
                className="input"
                rows={3}
              />
            </div>
            <div className="pt-2">
              <button className="bg-[#007B94] text-white px-4 py-2 rounded hover:bg-[#006377]">
                Create Tenant
              </button>
            </div>
          </form>
        </div>

        {/* Create Superuser */}
        <div className="max-w-3xl bg-white p-6 rounded shadow mx-auto">
          <h2 className="text-xl font-bold mb-4">Create New Superuser</h2>
          <form onSubmit={handleSuperuserSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">First Name</label>
                <input
                  name="firstName"
                  value={superForm.firstName}
                  onChange={(e) => handleChange(e, setSuperForm)}
                  className="input"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Last Name</label>
                <input
                  name="lastName"
                  value={superForm.lastName}
                  onChange={(e) => handleChange(e, setSuperForm)}
                  className="input"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={superForm.email}
                  onChange={(e) => handleChange(e, setSuperForm)}
                  className="input"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={superForm.phone}
                  onChange={(e) => handleChange(e, setSuperForm)}
                  className="input"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Temporary Password</label>
              <input
                name="password"
                type="text"
                value={superForm.password}
                onChange={(e) => handleChange(e, setSuperForm)}
                className="input"
                required
              />
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="isEnabled"
                checked={superForm.isEnabled}
                onChange={(e) => handleChange(e, setSuperForm)}
                className="h-4 w-4"
              />
              <label className="text-sm">Enable Account Immediately</label>
            </div>

            <div className="pt-2">
              <button className="bg-[#007B94] text-white px-4 py-2 rounded hover:bg-[#006377]">
                Create Superuser
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
