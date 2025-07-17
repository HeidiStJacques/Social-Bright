// src/services/caseNotesService.js
import axios from 'axios';

const API_BASE = '/api'; // or your actual backend URL like 'https://your-backend.com/api'

export const fetchCaseNotes = async (clientId) => {
  const response = await axios.get(`${API_BASE}/clients/${clientId}/case-notes`);
  return response.data;
};

export const createCaseNote = async (clientId, noteData) => {
  const response = await axios.post(`${API_BASE}/clients/${clientId}/case-notes`, noteData);
  return response.data;
};
