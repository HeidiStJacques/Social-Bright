# 🛠️ Admin Pages — tenant1

This folder contains **admin-level page overrides** specific to the tenant `tenant1`. These pages are used to customize administrative workflows, visibility, and configurations for tenant1’s internal admin team.

Use this folder when the tenant requires different admin behavior, views, or field-level customizations that shouldn't affect other tenants.

---

## 📁 Folder Structure

| File / Folder                    | Description                                                                 |
|----------------------------------|-----------------------------------------------------------------------------|
| `AdminDashboardPage.jsx`         | Custom tenant1 dashboard with unique metrics or layout                      |
| `AdminClientManagementPage.jsx`  | Adjusted client table columns, filters, or actions                          |
| `AdminUserManagementPage.jsx`    | Custom fields or permissions in user table for this tenant                  |
| `AdminSettingsPage.jsx`          | Tenant-specific configuration options (e.g., alert thresholds, contact info)|
| `AdminAlertsPage.jsx`            | Filters, types, or handling tailored to tenant1's operational rules         |
| `AdminReportsPage.jsx`           | Modified report structure, exports, or visibility rules                     |

---

## ✅ Usage Guidelines

- Only load these pages if `tenantId === 'tenant1'`
  
- Use shared layouts and components where possible to reduce duplication
  
- Do not hardcode sensitive tenant logic — use tenant context/config from `@tenants/tenant1/`

---

## 🛠️ Example Usage

```jsx
import { useTenant } from '@shared/context/TenantContext';
import SharedDashboard from '@admin/pages/AdminDashboardPage';
import Tenant1Dashboard from '@tenants/tenant1/pages/admin/AdminDashboardPage';

const AdminDashboard = () => {
  const { tenantId } = useTenant();
  return tenantId === 'tenant1' ? <Tenant1Dashboard /> : <SharedDashboard />;
};
```
---
## 🔍 Customization Examples
Page	What Might Be Customized

Admin Dashboard -  Custom KPIs, different alert summaries, chart styles

Client Management -  Additional filters (e.g. Region, MCO), restricted columns

Alerts Page -  Rename alert types or change alert-handling rules

Settings Page -  Tenant contact info, notification limits, policy disclaimers

Reports Page -  Limit report access or add branded report headers/footers

---

## 🚨 Notes
Admin pages must maintain compatibility with shared admin data models

Shared features should remain accessible unless explicitly disabled in tenant config

Test both fallback and override logic for admin routes

---

## 🔄 To Do
 Add tenant-specific disclaimer block to the bottom of reports

 Add alert type override to AdminAlertsPage

 Allow admin to manage tenant1’s custom program names from AdminSettingsPage

---

## 🧼 Naming Convention
Page files are named with PascalCase (e.g., AdminDashboardPage.jsx)

Folder should mirror structure of /admin/pages/ in the shared layer

Always export default React components

---

## 🧩 Example Imports

import AdminDashboardPage from '@tenants/tenant1/pages/admin/AdminDashboardPage';

import AdminSettingsPage from '@tenants/tenant1/pages/admin/AdminSettingsPage';

