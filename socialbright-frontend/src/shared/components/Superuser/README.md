# 🧩 Shared Components — Superuser

This folder contains all reusable **Superuser-facing UI components** used throughout the SocialBright platform. These components are designed to be shared across multiple Superuser pages such as Analytics, Admin Accounts, Dashboard, Maintenance, System Logs, and more.

---

## 📁 Folder Structure

- `SuperuserCard.jsx` — A reusable styled card for displaying superuser stats, settings, or overview data.
- `SuperuserSectionHeader.jsx` — Section header component with title and optional description, used across superuser views.
- `SuperuserTable.jsx` — Generic table component styled for Superuser pages with optional sorting and pagination.
- `SuperuserStatusBadge.jsx` — Visual status indicator (e.g., Active, Suspended, Error) used in Superuser dashboards and logs.
- `SuperuserIconSet.jsx` — Predefined icon collection using `lucide-react` for consistent use across Superuser pages.

---

## ✅ Usage Guidelines

- Components in this folder are intended **only** for Superuser-level pages.
- Styling follows the system-wide layout:
  - Font: **Lato**, black
  - Accent Color: **#007B94**
  - Background: **`bg-gray-100`**
- All components are **responsive**, **accessible**, and built using **Tailwind CSS**.
- Components are structured to support **multi-tenant and system-level administration**.

---

## 🛠️ How to Use

Example (SuperuserCard):

```jsx
import SuperuserCard from '@shared/components/Superuser/SuperuserCard';

<SuperuserCard
  title="Total Tenants"
  value="12"
  icon="Buildings"
  description="All currently registered tenant orgs"
/>
```
---

## 🔍 Icons Used

All icons are from lucide-react. Example icons include:
🏢 Buildings — for tenants
👤 UserCog — for superuser/admin users
📊 BarChart2 — for analytics
🛠️ Settings — for configuration
📁 FolderSearch — for logs/documents
⚠️ AlertTriangle — for alerts and system issues
🚨 Notes

If you need tenant-specific components, use the appropriate folder under /shared/components/Tenant/.
Do not modify these components for admin or CM use — duplicate and adjust if needed.
Each component should receive only the necessary props to keep logic centralized and clean.

---

## 🔄 To Do

 Add loading skeletons for all table and card components
 Add tooltip support for icon-only buttons
 Add unit tests for Superuser components

---

## 🧼 Naming Convention

All filenames use PascalCase (e.g., SuperuserStatusBadge.jsx)
All component names are prefixed with Superuser for clarity and namespacing.

---
