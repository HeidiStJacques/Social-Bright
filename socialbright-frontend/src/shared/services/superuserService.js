import axios from 'axios';

const API_BASE = 'http://localhost:5173'; // Change this to your FastAPI base URL

// Get list of tenants
export const getTenants = async () => {
  const res = await axios.get(`${API_BASE}/superuser/tenants`);
  return res.data;
};

// Get feature flags for a specific tenant
export const getTenantFeatures = async (tenantId) => {
  const res = await axios.get(`${API_BASE}/superuser/tenants/${tenantId}/features`);
  return res.data;
};

// Update feature flags for a specific tenant
export const updateTenantFeatures = async (tenantId, features) => {
  const res = await axios.put(`${API_BASE}/superuser/tenants/${tenantId}/features`, features);
  return res.data;
};
export const toggleTenantStatus = async (tenantId, newStatus) => {
  const res = await axios.patch(`${API_BASE}/superuser/tenants/${tenantId}/status`, {
    active: newStatus,
  });
  return res.data;
};

