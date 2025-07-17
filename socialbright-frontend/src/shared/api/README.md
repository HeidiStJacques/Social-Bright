# 🔗 Shared / API

This folder contains reusable API utility functions for interacting with the SocialBright backend. These functions serve as the bridge between your frontend components and your backend routes, ensuring consistency, cleaner code, and easier maintenance.

---

## 📁 Purpose

The `shared/api` folder centralizes all HTTP requests, helping:

- Keep business logic out of components
- Promote reusability across pages
- Maintain a single source of truth for backend endpoints
- Simplify error handling and authentication

---

## 📂 Typical Files

- authApi.js – Handles login, registration, forgot/reset password
- clientApi.js – Functions for fetching and updating client data
- dashboardApi.js – Pulls tasks, alerts, visit counts for dashboards
- documentApi.js – Handles document uploads, downloads, and categorization
- planOfCareApi.js – Get, create, or update Plan of Care records per client
- calendarApi.js – Create, retrieve, and update events tied to clients
- statusApi.js – Save or retrieve status and billing data
- userApi.js – User profile, password change, and role-based checks

---

## ✅ Example Format

Each API file typically includes:

import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

export async function getClientById(clientId) {
  const response = await axios.get(`${API_BASE}/clients/${clientId}`);
  return response.data;
}

---

## 🔐 Authentication

If your app uses tokens or sessions:

- Axios interceptors or headers may be set globally
- Do not hardcode secrets
- Tokens should be securely stored (sessionStorage, cookies, etc.)

---

## 🧪 Tips for Contributors

- Use consistent naming: get, update, create, delete
- Group functions logically by entity or resource
- Add try/catch blocks or throw errors for upstream handling
- Avoid writing fetch logic directly in components

---

## 🧼 Maintenance

As new routes are added to the backend:

- Add matching API functions here
- Avoid duplicate fetch logic in page files
- Refactor legacy requests into this shared directory

---

## 📣 Example Usage

import { getClientById } from '@shared/api/clientApi';

useEffect(() => {
  async function fetchClient() {
    const client = await getClientById(clientId);
    setClientData(client);
  }
  fetchClient();
}, [clientId]);

---

## 🔄 Future Enhancements

- Create a central Axios instance with interceptors
- Add automatic token refresh logic
- Integrate error boundaries for failed requests
- Add logging for backend errors

---

