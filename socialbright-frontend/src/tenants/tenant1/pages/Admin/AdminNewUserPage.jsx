import React, { useState } from 'react';
import { useTenant } from '@context/TenantContext';
import AdminNavbar from '@shared/components/admin/AdminNavbar';

export default function AdminNewUserPage() {
  const { tenantId } = useTenant();

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    role: '',
    enabled: true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Later: send POST request to backend
    console.log('New User:', { ...form, tenantId });
  };

  return (
    <>
      <div className="min-h-screen bg-gray-100 px-4 py-8">
        <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-bold text-black mb-6">Create New User</h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={form.firstName}
                onChange={handleChange}
                className="input"
                required
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={form.lastName}
                onChange={handleChange}
                className="input"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={form.email}
                onChange={handleChange}
                className="input col-span-1 md:col-span-2"
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password (optional)"
                value={form.password}
                onChange={handleChange}
                className="input col-span-1 md:col-span-2"
              />
              <select
                name="role"
                value={form.role}
                onChange={handleChange}
                className="input col-span-1 md:col-span-2"
                required
              >
                <option value="">Select Role</option>
                <option value="case_manager">Case Manager</option>
                <option value="admin">Admin</option>
                <option value="superuser">Superuser</option>
                <option value="supervisor">Supervisor</option>
                <option value="auditor">Auditor</option>
                <option value="support staff">Support Staff</option>
                <option value="intake">Intake</option>
                <option value="read-only">Read-Only</option>
              </select>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="enabled"
                  checked={form.enabled}
                  onChange={handleChange}
                />
                <span className="text-sm text-black">Enable Account</span>
              </label>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className="bg-[#007B94] text-white px-4 py-2 rounded hover:bg-[#006377] transition"
              >
                Save User
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
