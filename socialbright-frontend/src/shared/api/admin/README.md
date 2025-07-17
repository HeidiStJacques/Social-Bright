# 🛡️ API / Admin

This folder contains reusable API utility functions specifically for **Admin-level operations** in the SocialBright platform. These functions allow the frontend admin dashboard to communicate with protected backend routes for managing users, clients, settings, alerts, and more.

---

## 📁 Purpose

The `api/admin` folder centralizes API functions for tenant admins so they can:

- Manage client records
- View and resolve alerts
- Control settings and configurations
- Access documents and reports
- Maintain user accounts within their organization

---

## 📂 Example Files

- userAdminApi.js – View, add, edit, or disable users within a tenant
- alertAdminApi.js – Fetch, filter, and mark alerts as resolved
- documentAdminApi.js – Upload/view/download all documents across clients
- clientAdminApi.js – View all clients in the system
- settingsAdminApi.js – Get and update admin-level configuration settings
- auditLogApi.js – Fetch audit trail data for accountability and monitoring

---

## ✅ Example Format

Each API file typically uses Axios to make secure requests:

import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

export async function getAllClients() {
  const response = await axios.get(`${API_BASE}/admin/clients`);
  return response.data;
}

---

## 🔐 Admin Authentication

These endpoints are **restricted** to users with an `admin` role or higher. Ensure your requests:

- Include auth tokens in headers
- Are not accessible from public pages
- Are role-checked before rendering components

---

## 🧪 Tips for Contributors

- Stick to naming conventions: get, create, update, delete
- Include try/catch and throw errors to let pages handle failures
- Use async/await and always return `response.data`
- Separate tenant-specific admin actions from superuser/global admin ones

---

## 🔄 Maintenance

If backend routes change or expand, update matching API functions here:

- Add new endpoints to this folder
- Refactor older admin-related fetch calls into utility files
- Ensure API files reflect updated backend route names or structures

---

## 📣 Example Usage

import { getAllClients } from '@shared/api/admin/clientAdminApi';

useEffect(() => {
  async function fetchClients() {
    const clients = await getAllClients();
    setClientList(clients);
  }
  fetchClients();
}, []);

---

## 🚧 WIP

Some admin APIs may be placeholders or in-progress. Use caution when depending on routes still being developed.

---

## 🧼 Security Best Practices

- Never expose sensitive tokens or admin routes in client-side logs
- Avoid hardcoding tenant IDs – use tenant-aware context where applicable
- Keep superuser APIs separate from tenant admin APIs

---

