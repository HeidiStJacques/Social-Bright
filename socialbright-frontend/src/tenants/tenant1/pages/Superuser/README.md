# 🧑‍💼 Superuser Pages — tenant1

This folder contains **superuser-level page overrides** for the tenant `tenant1`. These pages are used when a tenant has delegated superuser-like responsibilities internally (e.g., managing sub-admins, advanced reporting, or tenant-level system logs).

These overrides allow tenant1 to customize how high-level tools and data visibility appear for internal superusers without affecting the global superuser functionality of SocialBright.

---

## 📁 Folder Structure

| File / Folder                      | Description                                                                  |
|------------------------------------|------------------------------------------------------------------------------|
| `SuperuserDashboardPage.jsx`      | Tenant-specific superuser dashboard layout or metrics                        |
| `SuperuserAdminAccountsPage.jsx`  | Custom view for managing tenant1's internal admin accounts                   |
| `SuperuserSettingsPage.jsx`       | System-level or org-wide settings overrides scoped to tenant1               |
| `SuperuserLogsPage.jsx` *(opt)*   | Customized audit or system logs viewer                                      |
| `SuperuserAnalyticsPage.jsx` *(opt)* | Tenant-specific version of analytics reports and data insights             |

---

## ✅ Usage Guidelines

- These pages only load if:
  - `tenantId === 'tenant1'`
  - The logged-in user has `role: superuser`
- Use shared superuser layouts like `SuperuserLayout.jsx` unless explicitly overridden.
- Reference tenant1 configuration via `@tenants/tenant1/` for branding or feature toggles.

---

## 🛠️ Example Usage

```jsx
import { useTenant } from '@shared/context/TenantContext';
import SharedDashboard from '@superuser/pages/SuperuserDashboardPage';
import Tenant1Dashboard from '@tenants/tenant1/pages/superuser/SuperuserDashboardPage';

export default function SuperuserDashboardPage() {
  const { tenantId } = useTenant();
  return tenantId === 'tenant1' ? <Tenant1Dashboard /> : <SharedDashboard />;
}
```
---

## 🔍 Customization Examples

Page	Possible Overrides

Superuser Dashboard	Show only tenant1 metrics or reworded descriptions

Admin Accounts	Limit which fields are editable, or display tenant-specific role options

Settings Page	Add disclaimer toggle, document retention config, or tenant contact info

Analytics Page	Show filtered or tenant-tagged analytics (e.g., per-program usage)

---

## 🚨 Notes

These pages are scoped to tenant1 only and should not affect other tenants or global superuser tools.

Be sure tenant1 superusers only have access to their own data/controls — not global resources.

Use the existing shared components whenever possible to reduce maintenance.

---

## 🔄 To Do
 
 Add per-tenant system log filtering to SuperuserLogsPage

 Add custom report builder block to analytics

 Enable superuser-only bulk user import for tenant1

---

## 🧼 Naming Convention

Use PascalCase for filenames (e.g., SuperuserDashboardPage.jsx)

Folder structure should mirror the layout of /superuser/pages/ in the shared app

Export default React components

---

## 🧩 Example Imports

import SuperuserDashboardPage from '@tenants/tenant1/pages/superuser/SuperuserDashboardPage';

import SuperuserSettingsPage from '@tenants/tenant1/pages/superuser/SuperuserSettingsPage';
