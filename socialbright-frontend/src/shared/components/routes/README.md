# 🧩 Shared Components — Routes

This folder contains reusable **route and layout components** shared across the SocialBright platform. These components manage page access, layouts, and nested route behavior for all user types (Case Manager, Admin, Superuser).

---

## 📁 Folder Structure

- `ProtectedRoute.jsx` — Restricts access to pages based on authentication and user roles.
- `PublicRoute.jsx` — Wrapper for public-facing pages like Login or Forgot Password.
- `PrivateLayout.jsx` — Layout used for authenticated Case Manager pages (with sidebar and navbar).
- `AdminLayout.jsx` — Layout used for admin dashboard and admin tools.
- `SuperuserLayout.jsx` — Layout used for global superuser pages and settings.
- `TenantWrapper.jsx` — Loads and injects tenant info (ID, name, features) from context.

---

## ✅ Usage Guidelines

- Route components are placed in `App.jsx`, `DevRoutes.jsx`, or your top-level router file.
- Layout components are used with `Outlet` from `react-router-dom` to provide consistent wrappers.
- Layouts automatically apply:
  - `font-sans` (Lato), black text
  - Accent: **#007B94**
  - Background: **`bg-gray-100`**
- All layouts support **responsive design** and **multi-tenancy**

---

## 🛠️ How to Use

Example (ProtectedRoute in `App.jsx`):

```jsx
<ProtectedRoute roles={['case_manager', 'admin']}>
  <PrivateLayout />
</ProtectedRoute>
```

---
## Example (Layout usage in DevRoutes):

<Route path="/admin" element={<AdminLayout />}>
  <Route path="dashboard" element={<AdminDashboardPage />} />
</Route>

---

## 🔍 Icons Used

These components do not include visible icons, but are often used with icons in sidebars or navbars like:

🧭 LayoutDashboard — dashboard views  
🛡️ ShieldCheck — protected access  
👁️ EyeOff — restricted access  
🚨 Notes  

ProtectedRoute checks for auth + role access; use it for all sensitive routes.
PublicRoute prevents logged-in users from accessing login/forgot pages again.
Layouts should contain only layout-specific logic (not page logic).
TenantWrapper is used globally to ensure tenant context is loaded before rendering nested routes.

---

## 🔄 To Do

 Add route transition animations  
 Add fallback loader while TenantWrapper is loading  
 Add breadcrumbs to layouts  

---

## 🧼 Naming Convention

All filenames use PascalCase (e.g., ProtectedRoute.jsx)
Components are named after their purpose (e.g., AdminLayout, PrivateLayout) to avoid confusion with pages or views.



