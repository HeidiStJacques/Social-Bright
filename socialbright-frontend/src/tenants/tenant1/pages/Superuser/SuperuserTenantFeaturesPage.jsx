import React, { useState, useEffect } from 'react';
import { getTenants, getTenantFeatures, updateTenantFeatures } from '@shared/services/superuserService';
import { toast } from 'react-hot-toast';

export default function SuperuserTenantFeaturesPage() {
  const [tenants, setTenants] = useState([]);
  const [selectedTenant, setSelectedTenant] = useState('');
  const [features, setFeatures] = useState({});
  const [loading, setLoading] = useState(false);

  // Load all tenants
  useEffect(() => {
    const fetchTenants = async () => {
      try {
        const data = await getTenants();
        console.log('Tenants response:', data); // DEBUG: See what comes back
        setTenants(Array.isArray(data) ? data : data.tenants || []);
      } catch {
        toast.error('Failed to load tenants.');
        setTenants([]);
      }
    };
    fetchTenants();
  }, []);

  // Load features when tenant is selected
  useEffect(() => {
    const fetchFeatures = async () => {
      if (!selectedTenant) return;
      setLoading(true);
      try {
        const data = await getTenantFeatures(selectedTenant);
        setFeatures(data || {});
      } catch {
        toast.error('Failed to load features.');
      } finally {
        setLoading(false);
      }
    };
    fetchFeatures();
  }, [selectedTenant]);

  const handleToggle = (key) => {
    setFeatures((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleSave = async () => {
    try {
      await updateTenantFeatures(selectedTenant, features);
      toast.success('Features updated.');
    } catch {
      toast.error('Error saving features.');
    }
  };

  const featureList = [
    'planOfCare',
    'calendar',
    'caseNotes',
    'documents',
    'tasks',
    'alerts',
    'reports',
    'customBranding',
  ];

  return (
    <div className="p-6 text-black bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Tenant Features</h1>

      {/* Tenant Selector */}
      <div className="mb-6 max-w-md">
        <label className="block text-sm font-medium mb-1">Select Tenant</label>
        <select
          className="w-full border border-gray-300 rounded px-3 py-2"
          value={selectedTenant}
          onChange={(e) => setSelectedTenant(e.target.value)}
        >
          <option value="">-- Select Tenant --</option>
          {Array.isArray(tenants) &&
            tenants.map((tenant) => (
              <option key={tenant.id} value={tenant.id}>
                {tenant.name}
              </option>
            ))}
        </select>
      </div>

      {/* Feature Toggles */}
      {selectedTenant && !loading && (
        <div className="bg-white p-4 rounded shadow max-w-xl">
          {featureList.map((key) => (
            <div key={key} className="flex justify-between items-center py-2 border-b last:border-none">
              <span className="capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
              <label className="inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={features[key] || false}
                  onChange={() => handleToggle(key)}
                  className="sr-only"
                />
                <div
                  className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors duration-300 ${
                    features[key] ? 'bg-[#007B94]' : 'bg-gray-300'
                  }`}
                >
                  <div
                    className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ease-in-out ${
                      features[key] ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  ></div>
                </div>
              </label>
            </div>
          ))}

          <button
            onClick={handleSave}
            className="mt-4 px-4 py-2 bg-[#007B94] text-white rounded hover:bg-[#005f73]"
          >
            Save Changes
          </button>
        </div>
      )}
    </div>
  );
}
