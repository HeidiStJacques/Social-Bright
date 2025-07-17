import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { getTenants, toggleTenantStatus } from '@shared/services/superuserService';

export default function SuperuserTenantsPage() {
  const [tenants, setTenants] = useState([]);

  useEffect(() => {
    const fetchTenants = async () => {
      try {
        const data = await getTenants();
        setTenants(Array.isArray(data) ? data : data.tenants || []);
      } catch (err) {
        toast.error('Failed to load tenants');
      }
    };
    fetchTenants();
  }, []);

  const handleToggleStatus = async (tenantId, currentStatus) => {
    try {
      await toggleTenantStatus(tenantId, !currentStatus);
      setTenants((prev) =>
        prev.map((t) =>
          t.id === tenantId ? { ...t, active: !currentStatus } : t
        )
      );
      toast.success(`Tenant ${!currentStatus ? 'enabled' : 'disabled'}`);
    } catch (err) {
      toast.error('Failed to update tenant status');
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen text-black">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Tenants</h1>
        <button className="bg-[#007B94] text-white px-4 py-2 rounded hover:bg-[#005f73]">
          + Add New Tenant
        </button>
      </div>

      <div className="bg-white rounded shadow overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-[#007B94] text-white">
            <tr>
              <th className="text-left px-4 py-2">Tenant Name</th>
              <th className="text-left px-4 py-2">Status</th>
              <th className="text-left px-4 py-2">Created</th>
              <th className="text-left px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tenants.map((tenant) => (
              <tr key={tenant.id} className="border-t">
                <td className="px-4 py-2">{tenant.name}</td>
                <td className="px-4 py-2">
                  <span
                    className={`inline-block px-2 py-1 rounded text-xs ${
                      tenant.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {tenant.active ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="px-4 py-2">
                  {tenant.created_at ? new Date(tenant.created_at).toLocaleDateString() : '—'}
                </td>
                <td className="px-4 py-2 flex space-x-2">
                  <button className="text-[#007B94] hover:underline text-sm">Edit</button>
                  <button
                    onClick={() => handleToggleStatus(tenant.id, tenant.active)}
                    className={`text-sm rounded px-2 py-1 ${
                      tenant.active
                        ? 'bg-red-100 text-red-700 hover:bg-red-200'
                        : 'bg-green-100 text-green-700 hover:bg-green-200'
                    }`}
                  >
                    {tenant.active ? 'Disable' : 'Enable'}
                  </button>
                </td>
              </tr>
            ))}
            {tenants.length === 0 && (
              <tr>
                <td colSpan="4" className="px-4 py-4 text-center text-gray-500">
                  No tenants found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
