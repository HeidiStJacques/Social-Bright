import axios from 'axios';

const API_BASE = 'http://localhost:8000'; // Update if your backend runs elsewhere

// Get Demographics
export const getClientDemographics = async (clientId, tenantId) => {
  const res = await axios.get(`${API_BASE}/tenants/${tenantId}/clients/${clientId}/demographics`);
  return res.data;
};

// Update Demographics
export const updateClient = async (tenantId, clientId, clientData) => {
  const res = await axios.put(`${API_BASE}/tenants/${tenantId}/clients/${clientId}`, clientData);
  return res.data;
};

// Get Eligibility Info
export const getEligibilityInfo = async (clientId, tenantId) => {
  const res = await axios.get(`${API_BASE}/tenants/${tenantId}/clients/${clientId}/eligibility`);
  return res.data;
};

// Get Guardians
export const getGuardians = async (clientId, tenantId) => {
  const res = await axios.get(`${API_BASE}/tenants/${tenantId}/clients/${clientId}/guardians`);
  return res.data;
};

// Get Providers
export const getProviders = async (clientId, tenantId) => {
  const res = await axios.get(`${API_BASE}/tenants/${tenantId}/clients/${clientId}/providers`);
  return res.data;
};

// Get Document Alerts
export const getDocumentsAlerts = async (clientId, tenantId) => {
  const res = await axios.get(`${API_BASE}/tenants/${tenantId}/clients/${clientId}/documents/alerts`);
  return res.data;
};

// Get Case Notes Summary
export const getCaseNotesSummary = async (clientId, tenantId) => {
  const res = await axios.get(`${API_BASE}/tenants/${tenantId}/clients/${clientId}/case-notes/summary`);
  return res.data;
};

// Get Plan of Care Progress
export const getPlanOfCareProgress = async (clientId, tenantId) => {
  const res = await axios.get(`${API_BASE}/tenants/${tenantId}/clients/${clientId}/plan-of-care/progress`);
  return res.data;
};

// Get Upcoming Visits
export const getUpcomingVisits = async (clientId, tenantId) => {
  const res = await axios.get(
    `${API_BASE}/tenants/${tenantId}/clients/${clientId}/calendar-events/upcoming`
  );
  return res.data;
};
