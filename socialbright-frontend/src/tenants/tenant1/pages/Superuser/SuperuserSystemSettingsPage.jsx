import React, { useState } from 'react';
import SuperuserNavbar from '@shared/components/superuser/SuperuserNavbar';

export default function SuperuserSystemSettingsPage() {
  const [settings, setSettings] = useState({
    passwordLength: 8,
    requireSpecialChar: true,
    sessionTimeout: 30,
    timezone: 'America/New_York',
    language: 'English',
    contactEmail: 'support@socialbright.org',
    enableEmail: true,
    enableAuditLog: true,
    enableBackups: false,
  });

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    setSettings((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Updated Settings:', settings);
    alert('Settings saved!');
    // TODO: Submit to backend
  };

  return (
    <>
      <div className="min-h-screen bg-gray-100 px-6 py-8 text-black">
        <div className="max-w-4xl mx-auto bg-white p-6 rounded shadow space-y-10">
          <h2 className="text-xl font-bold">System Settings</h2>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Security Settings */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Security Settings</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Minimum Password Length</label>
                  <input
                    type="number"
                    name="passwordLength"
                    value={settings.passwordLength}
                    onChange={handleChange}
                    className="input"
                    min="6"
                  />
                </div>
                <div className="flex items-center mt-6 space-x-2">
                  <input
                    type="checkbox"
                    name="requireSpecialChar"
                    checked={settings.requireSpecialChar}
                    onChange={handleChange}
                    className="h-4 w-4"
                  />
                  <label className="text-sm">Require Special Characters</label>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Session Timeout (mins)</label>
                  <input
                    type="number"
                    name="sessionTimeout"
                    value={settings.sessionTimeout}
                    onChange={handleChange}
                    className="input"
                    min="5"
                  />
                </div>
              </div>
            </div>

            {/* Feature Flags */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Feature Toggles</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="enableEmail"
                    checked={settings.enableEmail}
                    onChange={handleChange}
                    className="h-4 w-4"
                  />
                  <span>Email Notifications</span>
                </label>

                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="enableAuditLog"
                    checked={settings.enableAuditLog}
                    onChange={handleChange}
                    className="h-4 w-4"
                  />
                  <span>Audit Logging</span>
                </label>

                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="enableBackups"
                    checked={settings.enableBackups}
                    onChange={handleChange}
                    className="h-4 w-4"
                  />
                  <span>Auto Backups</span>
                </label>
              </div>
            </div>

            {/* System Preferences */}
            <div>
              <h3 className="text-lg font-semibold mb-4">System Preferences</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">System Timezone</label>
                  <select
                    name="timezone"
                    value={settings.timezone}
                    onChange={handleChange}
                    className="input"
                  >
                    <option value="America/New_York">America/New_York</option>
                    <option value="America/Chicago">America/Chicago</option>
                    <option value="America/Denver">America/Denver</option>
                    <option value="America/Los_Angeles">America/Los_Angeles</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Platform Language</label>
                  <select
                    name="language"
                    value={settings.language}
                    onChange={handleChange}
                    className="input"
                  >
                    <option>English</option>
                    <option>Spanish</option>
                    <option>French</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Maintenance Contact Email</label>
                  <input
                    type="email"
                    name="contactEmail"
                    value={settings.contactEmail}
                    onChange={handleChange}
                    className="input"
                  />
                </div>
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className="bg-[#007B94] text-white px-4 py-2 rounded hover:bg-[#006377]"
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
