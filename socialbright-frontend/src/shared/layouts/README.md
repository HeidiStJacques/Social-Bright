# 🧱 Shared Layouts

This folder contains **reusable layout components** that wrap major sections of the SocialBright application, including public pages, authenticated views, admin portals, and superuser dashboards. Layouts define consistent structure, styling, and navigation across route groups.

---

## 📁 Folder Structure

- `PublicLayout.jsx` — Layout for non-authenticated public pages (e.g. Login, Forgot Password)
- `PrivateLayout.jsx` — Layout for authenticated Case Manager pages with sidebar + navbar
- `AdminLayout.jsx` — Layout for all admin dashboard and admin tools pages
- `SuperuserLayout.jsx` — Layout for system-wide Superuser pages and tenant control center
- `CenteredLayout.jsx` — Optional layout for centered forms or standalone messages
- `PrintLayout.jsx` *(optional)* — Layout used when exporting reports or generating PDFs

---

## ✅ Usage Guidelines

- Layouts use `Outlet` from `react-router-dom` to render nested routes.
- Layouts are applied in `App.jsx` or `DevRoutes.jsx` to group related pages under the same structure.
- Each layout includes:
  - A consistent header, sidebar (if needed), and page container
  - Tailwind styling (`bg-gray-100`, black text, font-sans)
  - Responsive design and multi-tenant awareness

---

## 🛠️ How to Use

```jsx
// App.jsx or routes file
<Route element={<PrivateLayout />}>
  <Route path="/dashboard" element={<DashboardPage />} />
  <Route path="/clients/:id/plan-of-care" element={<PlanOfCarePage />} />
</Route>

---
// Inside a layout (e.g., PrivateLayout.jsx)
import { Outlet } from 'react-router-dom';

export default function PrivateLayout() {
  return (
    <div className="min-h-screen bg-gray-100 text-black font-sans">
      <Sidebar />
      <div className="ml-64 p-4">
        <DashboardNavbar />
        <Outlet />
      </div>
    </div>
  );
}
```
---

## 🔍 Layout Use Cases

Layout	Used For
1. PublicLayout	Login, Forgot Password, Registration
2. PrivateLayout	Dashboard, Clients, Plan of Care
3. AdminLayout	Admin Dashboard, Alerts, Settings
4. SuperuserLayout	Tenants, Admin Accounts, System Logs
5. CenteredLayout	Standalone modals or onboarding pages
6. PrintLayout	PDF/Print-friendly report views (future)

---
## 🚨 Notes

Layouts should only contain structure and style, not business logic or state management.  
Keep layout files clean—extract reusable UI into components under shared/components.  
Do not nest layouts unnecessarily; structure routes with nested Outlet properly.  

---

## 🔄 To Do

 Add optional Breadcrumbs bar to all authenticated layouts  
 Add PrintLayout for exporting documents and reports  
 Add support for layout theming based on tenant (light vs dark, optional)  

---

## 🧼 Naming Convention

All layout files use PascalCase (e.g., AdminLayout.jsx)  
Each layout component is the default export of its file  
Group by access level (Public, Private, Admin, Superuser)  

