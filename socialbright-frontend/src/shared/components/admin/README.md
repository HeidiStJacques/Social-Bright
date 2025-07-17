# 🧩 Shared Components — Admin

This folder contains reusable **Admin-facing UI components** used across the Admin dashboard and configuration pages of the SocialBright platform. These components support tenant-level administration of users, documents, alerts, settings, and more.

---

## 📁 Folder Structure

- `AdminCard.jsx` — A reusable metric card for dashboard overviews (e.g., client count, alerts).
- `AdminTable.jsx` — A styled and sortable table for displaying admin-level data.
- `AdminSectionHeader.jsx` — Section titles with optional descriptions for consistent layout.
- `AdminStatusBadge.jsx` — Badge component for visualizing record statuses (e.g., Active, Pending).
- `AdminIconSet.jsx` — Predefined icons from `lucide-react` used across admin interfaces.

---

## ✅ Usage Guidelines

- Designed for all routes under `/admin/...`
- Matches the admin layout system:
  - Font: **Lato**, black
  - Accent Color: **#007B94**
  - Background: **`bg-gray-100`**
- Fully **responsive**, **accessible**, and built using **Tailwind CSS**
- Supports **multi-tenant context** with isolated admin logic

---

## 🛠️ How to Use

Example (AdminCard):

```jsx
import AdminCard from '@shared/components/Admin/AdminCard';

<AdminCard
  title="Client Total"
  value="134"
  icon="Users"
  description="Currently enrolled clients"
/>
```

---

## 🔍 Icons Used

Components use lucide-react icons. Common examples:

👥 Users — for client or user management
📝 FileText — for documents
🛑 AlertCircle — for system alerts
🗂️ Folder — for categories or groupings
⚙️ Settings — for admin configuration
🧑‍💼 UserCog — for account management
🚨 Notes

These components are not for Superuser or Case Manager views.
When building new Admin pages, check this folder before creating new components.
Extend existing components to preserve design consistency.

---

## 🔄 To Do

 Add pagination support to AdminTable
 Add reusable modal component for admin confirmations
 Add form input wrappers (e.g., labeled field with validation)

---

## 🧼 Naming Convention

All filenames use PascalCase (e.g., AdminStatusBadge.jsx)
All component names are prefixed with Admin to distinguish them from CM or Superuser components.

---
