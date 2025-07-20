# 📁 src

This folder contains the **source code** for the SocialBright frontend application. It includes all React components, pages, layouts, hooks, services, and utilities necessary to run the multi-tenant, HIPAA-compliant case management platform.

---

## 📂 Folder Overview

### `components/`
Reusable UI elements such as:
- Buttons, Cards, Modals, Tables
- Navigation elements (e.g. Navbar, Sidebar)
- Alerts, Badges, Icons

### `layouts/`
Page wrappers and layouts for different user roles:
- `PrivateLayout` for case managers
- `AdminLayout` for tenant admins
- `SuperuserLayout` for system admins

### `pages/`
Top-level route components organized by role:
- `public/` — Home, Login, Plans, etc.
- `user/` — Dashboard, Clients, Calendar, Case Notes, Care Plan
- `admin/` — User Management, Alerts, Documents
- `superuser/` — Tenants, System Logs, Analytics

### `services/`
Axios-based API utilities for:
- Authentication
- Client data
- Tasks, Calendar, Notes
- Reports and file uploads

### `contexts/`
React context providers to manage:
- Auth state
- Tenant settings
- Theme or user session

### `hooks/`
Custom React hooks, e.g.:
- `useAuth`, `useTenant`, `useLocalStorage`

### `utils/`
Helper functions and constants, including:
- Date formatters
- Validation logic
- Dropdown options

---

## 📄 Key Files

- `App.jsx` — Main app component and router setup
- `main.jsx` — Entry point
- `index.css` — Global Tailwind styles
- `tailwind.config.js` — TailwindCSS configuration
- `vite.config.js` — Vite build configuration

---

## 🧩 Tech Stack

- React 18
- React Router v6
- Tailwind CSS
- Axios
- Lucide React Icons
- @fontsource/lato for font styling

---

## 🧪 Notes

- All components are styled using Tailwind CSS.
- Multi-tenancy is supported via tenant context and user auth.
- Route protection is implemented using `ProtectedRoute`.

---

## 📌 Naming Conventions

- File and folder names use `camelCase` or `PascalCase`.
- Page components are named by purpose and role (e.g. `AdminAlertsPage.jsx`).
- All hooks start with `use`.

---

## 🛡️ Security

- Authentication token is stored in `localStorage`.
- Frontend respects user roles and tenant ID for data isolation.
- Future support planned for E2EE (End-to-End Encryption) in uploads and notes.

---

## 📄 License

Part of the **SocialBright** platform. All rights reserved.
