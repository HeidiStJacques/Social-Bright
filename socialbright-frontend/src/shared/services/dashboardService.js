import axios from 'axios';

const API_BASE = 'http://localhost:8000';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token'); 
  return {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
};

export const getDashboardClientCount = async () => {
  const res = await axios.get(`${API_BASE}/clients/`, getAuthHeaders());
  return res.data.length;
};

export const getUpcomingVisitsForUser = async () => {
  const res = await axios.get(`${API_BASE}/api/dashboard/visits`, getAuthHeaders());
  return res.data; // array of visit objects
};

export const getTasksForUser = async () => {
  const res = await axios.get(`${API_BASE}/api/dashboard/tasks`, getAuthHeaders());
  return res.data;
};

export const getAlerts = async () => {
  const res = await axios.get(`${API_BASE}/api/dashboard/alerts`, getAuthHeaders());
  return res.data;
};
