import React, { useState } from 'react';
import AdminNavbar from '@shared/components/admin/AdminNavbar';
import { Edit, Trash, KeyRound, ToggleRight, ToggleLeft } from 'lucide-react';

export default function AdminUserManagementPage() {
  const [users, setUsers] = useState([
    {
      id: 1,
      firstName: 'Heidi',
      lastName: 'StJacques',
      email: 'heidi@example.com',
      role: 'Admin',
      enabled: true,
    },
    {
      id: 2,
      firstName: 'Jane',
      lastName: 'Doe',
      email: 'jane@agency.org',
      role: 'Case Manager',
      enabled: false,
    },
  ]);

  const [newUser, setNewUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    role: '',
    enabled: true,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewUser((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleAddUser = (e) => {
    e.preventDefault();
    const id = users.length + 1;
    setUsers([...users, { ...newUser, id }]);
    setNewUser({
      firstName: '',
      lastName: '',
      email: '',
      role: '',
      enabled: true,
    });
  };

  const handleToggleStatus = (id) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === id ? { ...user, enabled: !user.enabled } : user
      )
    );
  };

  const handleDeleteUser = (id) => {
    setUsers((prev) => prev.filter((user) => user.id !== id));
  };

  return (
    <>
      <div className="min-h-screen bg-gray-100 px-4 py-8">
        <div className="max-w-6xl mx-auto space-y-10">
          <h2 className="text-2xl font-bold text-black">User Management</h2>

          {/* Add New User */}
          <form onSubmit={handleAddUser} className="bg-white p-6 rounded shadow space-y-4">
            <h3 className="text-lg font-semibold text-black mb-2">Add New User</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                type="text"
                name="firstName"
                value={newUser.firstName}
                onChange={handleInputChange}
                placeholder="First Name"
                className="input"
                required
              />
              <input
                type="text"
                name="lastName"
                value={newUser.lastName}
                onChange={handleInputChange}
                placeholder="Last Name"
                className="input"
                required
              />
              <input
                type="email"
                name="email"
                value={newUser.email}
                onChange={handleInputChange}
                placeholder="Email"
                className="input"
                required
              />
              <select
                name="role"
                value={newUser.role}
                onChange={handleInputChange}
                className="input"
                required
              >
                <option value="">Select Role</option>
                <option value="Case Manager">Case Manager</option>
                <option value="Admin">Admin</option>
                <option value="Superuser">Superuser</option>
              </select>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="enabled"
                  checked={newUser.enabled}
                  onChange={handleInputChange}
                />
                <span className="text-sm text-black">Enable Account</span>
              </label>
            </div>
            <button
              type="submit"
              className="bg-[#007B94] text-white px-4 py-2 rounded hover:bg-[#006377] transition"
            >
              Add User
            </button>
          </form>

          {/* User Table */}
          <div className="bg-white p-6 rounded shadow overflow-auto">
            <h3 className="text-lg font-semibold text-black mb-4">Existing Users</h3>
            <table className="min-w-full table-auto text-sm border border-gray-200">
              <thead className="bg-[#007B94] text-white">
                <tr>
                  <th className="px-4 py-2 text-left">Name</th>
                  <th className="px-4 py-2 text-left">Email</th>
                  <th className="px-4 py-2 text-left">Role</th>
                  <th className="px-4 py-2 text-left">Status</th>
                  <th className="px-4 py-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-t">
                    <td className="px-4 py-2">{user.firstName} {user.lastName}</td>
                    <td className="px-4 py-2">{user.email}</td>
                    <td className="px-4 py-2">{user.role}</td>
                    <td className="px-4 py-2">
                      {user.enabled ? (
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
                        onClick={() => handleToggleStatus(user.id)}
                        title="Toggle Account"
                        className="text-[#007B94]"
                      >
                        {user.enabled ? (
                          <ToggleRight className="w-4 h-4 inline" />
                        ) : (
                          <ToggleLeft className="w-4 h-4 inline" />
                        )}
                      </button>
                      <button title="Edit" className="text-[#007B94]">
                        <Edit className="w-4 h-4 inline" />
                      </button>
                      <button
                        onClick={() => handleDeleteUser(user.id)}
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
          </div>
        </div>
      </div>
    </>
  );
}
