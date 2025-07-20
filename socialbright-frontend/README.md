# 🌐 Frontend

This folder contains the **React-based frontend** for the SocialBright platform. It provides the user interface for case managers, admins, superusers, and public users, including dashboards, client records, eligibility tools, calendar, and more.

## 🏗️ Structure

- `src/` - Main source code
  - `components/` - Reusable UI components (buttons, cards, modals)
  - `layouts/` - Shared layout templates (private, admin, superuser)
  - `pages/` - Route-level pages for different user roles
  - `services/` - API service helpers (e.g. login, fetch clients)
  - `contexts/` - React context providers (e.g. auth, tenant)
  - `hooks/` - Custom React hooks
  - `utils/` - Utility functions and constants
- `public/` - Static assets (index.html, images)
- `App.jsx` - Main app component with routes
- `main.jsx` - Entry point
- `tailwind.config.js` - TailwindCSS config
- `index.css` - Global styles

## 🧪 Tech Stack

- **React 18**
- **Vite** for development and bundling
- **Tailwind CSS** for styling
- **React Router v6** for routing
- **Axios** for API requests
- **Lucide Icons** for UI icons
- **@fontsource/lato** for consistent typography

## 🚀 Getting Started

1. Install dependencies:
   ```bash
   npm install
   npm run dev
```
The app will run at http://localhost:5173.
```
---

## 🔐 Authentication

Auth tokens are stored in localStorage.

Route protection is implemented with a ProtectedRoute wrapper.

Role-based redirects and access are handled in App.jsx.

---

## 🌍 Multi-Tenancy
Tenants are detected via user login and stored in context.

UI changes and branding rules respect tenant-based features.

---

## 📁 Pages Include

Public: Home, About, Plans, Login, Forgot Password

User (Case Manager): Dashboard, Clients, Calendar, Care Plan, Notes

Admin: Dashboard, Alerts, Documents, User Management

Superuser: Admin Accounts, Tenants, System Logs, Analytics

---

##✅ To Do / Planned Features

Full backend integration

Stripe subscription logic

E2EE file encryption

Tenant branding options

Mobile responsiveness tuning

---

## 🛠️ Scripts

npm run dev — start development server

npm run build — production build

npm run preview — preview production build locally

---

## 📄 License

This project is part of SocialBright, a HIPAA-compliant case management system. All rights reserved.
