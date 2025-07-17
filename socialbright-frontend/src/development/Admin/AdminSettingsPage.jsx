import React, { useState } from 'react';
import AdminNavbar from '@shared/components/admin/AdminNavbar';
import { useTenant } from '@shared/context/TenantContext';

export default function AdminSettingsPage() {
  const { tenantId } = useTenant();

  const [form, setForm] = useState({
    // Section 1: Client Thresholds
    maxInactiveDays: '',
    maxOverdueTasks: '',
    maxDaysNoCarePlan: '',
    maxTotalClients: '',

    // Section 2: Role-Based Permissions
    permissions: {
      caseManager: {
        reports: false,
        documents: true,
        settings: false,
        clients: true,
      },
      admin: {
        reports: true,
        documents: true,
        settings: true,
        clients: true,
      },
    },

    // Section 3: Organization Info
    orgName: '',
    orgPhone: '',
    orgEmail: '',
    orgAddress: '',
    orgCity: '',
    orgState: '',
    orgZip: '',

    // Section 4: Notifications
    emailAlerts: true,
    dashboardAlerts: true,
    alertFrequency: 'daily',
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handlePermissionChange = (role, field) => {
    setForm(prev => ({
      ...prev,
      permissions: {
        ...prev.permissions,
        [role]: {
          ...prev.permissions[role],
          [field]: !prev.permissions[role][field],
        },
      },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Saving Admin Settings:', { ...form, tenantId });
    // Future: connect to backend API
  };

  return (
    <>
      <div className="min-h-screen bg-gray-100 px-4 py-8">
        <div className="max-w-5xl mx-auto bg-white p-6 rounded-lg shadow space-y-10">
          <h2 className="text-lg font-bold text-black">Admin Settings</h2>

          <form onSubmit={handleSubmit} className="space-y-10">

            {/* SECTION 1: CLIENT THRESHOLDS */}
            <section>
              <h3 className="text-medium font-semibold text-black mb-4">Notification Thresholds</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="number"
                  name="maxInactiveDays"
                  value={form.maxInactiveDays}
                  onChange={handleChange}
                  className="input"
                  placeholder="Max inactive days before alert"
                />
                <input
                  type="number"
                  name="maxOverdueTasks"
                  value={form.maxOverdueTasks}
                  onChange={handleChange}
                  className="input"
                  placeholder="Max overdue tasks before alert"
                />
                <input
                  type="number"
                  name="maxDaysNoCarePlan"
                  value={form.maxDaysNoCarePlan}
                  onChange={handleChange}
                  className="input"
                  placeholder="Max days without plan of care"
                />
                <input
                  type="number"
                  name="maxTotalClients"
                  value={form.maxTotalClients}
                  onChange={handleChange}
                  className="input"
                  placeholder="Max total clients before admin alert"
                />
              </div>
            </section>

            {/* SECTION 2: ROLE-BASED PERMISSIONS */}
            <section>
              <h3 className="text-medium font-semibold text-black mb-4">Role-Based Permissions</h3>
              <div className="overflow-auto">
                <table className="min-w-full table-auto text-sm border border-gray-200">
                  <thead className="bg-[#007B94] text-white">
                    <tr>
                      <th className="px-4 py-2 text-left">Role</th>
                      <th className="px-4 py-2">Reports</th>
                      <th className="px-4 py-2">Documents</th>
                      <th className="px-4 py-2">Settings</th>
                      <th className="px-4 py-2">Clients</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(form.permissions).map(([role, perms]) => (
                      <tr key={role} className="border-t text-center">
                        <td className="px-4 py-2 text-left capitalize">{role.replace('_', ' ')}</td>
                        {Object.keys(perms).map((perm) => (
                          <td key={perm}>
                            <input
                              type="checkbox"
                              checked={form.permissions[role][perm]}
                              onChange={() => handlePermissionChange(role, perm)}
                            />
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* SECTION 3: ORGANIZATION INFO */}
            <section>
              <h3 className="text-medium font-semibold text-black mb-4">Organization Contact Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="orgName"
                  value={form.orgName}
                  onChange={handleChange}
                  className="input"
                  placeholder="Organization Name"
                />
                <input
                  type="tel"
                  name="orgPhone"
                  value={form.orgPhone}
                  onChange={handleChange}
                  className="input"
                  placeholder="Phone Number"
                />
                <input
                  type="email"
                  name="orgEmail"
                  value={form.orgEmail}
                  onChange={handleChange}
                  className="input"
                  placeholder="Email Address"
                />
                <input
                  type="text"
                  name="orgAddress"
                  value={form.orgAddress}
                  onChange={handleChange}
                  className="input"
                  placeholder="Street Address"
                />
                <input
                  type="text"
                  name="orgCity"
                  value={form.orgCity}
                  onChange={handleChange}
                  className="input"
                  placeholder="City"
                />
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    name="orgState"
                    value={form.orgState}
                    onChange={handleChange}
                    className="input"
                    placeholder="State"
                  />
                  <input
                    type="text"
                    name="orgZip"
                    value={form.orgZip}
                    onChange={handleChange}
                    className="input"
                    placeholder="ZIP Code"
                  />
                </div>
              </div>
            </section>

            {/* SECTION 4: NOTIFICATION PREFERENCES */}
            <section>
              <h3 className="text-medium font-semibold text-black mb-4">Notification Preferences</h3>
              <div className="space-y-3">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="emailAlerts"
                    checked={form.emailAlerts}
                    onChange={handleChange}
                  />
                  <span className="text-sm text-black">Enable Email Alerts</span>
                </label>

                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="dashboardAlerts"
                    checked={form.dashboardAlerts}
                    onChange={handleChange}
                  />
                  <span className="text-sm text-black">Enable Dashboard Alerts</span>
                </label>

                <div>
                  <label className="block text-sm font-medium text-black mb-1">Alert Frequency</label>
                  <select
                    name="alertFrequency"
                    value={form.alertFrequency}
                    onChange={handleChange}
                    className="input"
                  >
                    <option value="immediate">Immediate</option>
                    <option value="daily">Daily Summary</option>
                    <option value="weekly">Weekly Digest</option>
                  </select>
                </div>
              </div>
            </section>

            {/* SUBMIT */}
            <div className="pt-6">
              <button
                type="submit"
                className="bg-[#007B94] text-white px-6 py-2 rounded hover:bg-[#006377] transition"
              >
                Save Settings
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
