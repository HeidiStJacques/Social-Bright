# 📦 Shared Folder

The `shared/` folder contains all **reusable logic, layouts, components, constants, services, context, hooks, and utilities** used throughout the SocialBright application. Everything in this folder is designed to be tenant-aware, accessible, and fully consistent with SocialBright’s UI and backend standards.

This folder ensures **DRY (Don't Repeat Yourself)** principles across all roles (Case Manager, Admin, Superuser), pages, and features.

---

## 🧭 Folder Overview

| Folder               | Description                                                                 |
|----------------------|-----------------------------------------------------------------------------|
| `components/`        | Shared UI components for forms, tables, cards, badges, modals, and more     |
| `context/`           | React Context Providers for auth, tenant, client, alerts, etc.              |
| `constants/`         | App-wide constants for dropdowns, roles, statuses, and program names        |
| `hooks/`             | Reusable logic hooks for auth, debounce, form state, storage, etc.          |
| `layouts/`           | Layout wrappers for public, private, admin, and superuser pages             |
| `routes/`            | ProtectedRoute and Layout route wrappers using React Router                 |
| `services/`          | API service files that handle all backend communication                     |
| `utils/`             | Utility functions for formatting, validation, date calculation, and more    |

---

## ✅ Usage Guidelines

- Always import from `@shared/...` using aliases to avoid long relative paths.
- Keep this folder clean — do not put page-specific or role-specific logic here.
- All code here should support **multi-tenancy** and use **Tailwind CSS** styling conventions.
- Group logic and files by purpose, not by page.

---

## 🔁 Example Usage

```jsx
// Layout
import PrivateLayout from '@shared/layouts/PrivateLayout';

// Context
import { useAuth } from '@shared/context/AuthContext';

// Service
import { getClientsForTenant } from '@shared/services/clientService';

// Constant
import { ROLES } from '@shared/constants/roles';

// Util
import { calculateAge } from '@shared/utils/dateUtils';

// Hook
import { useDebounce } from '@shared/hooks/useDebounce';
```

---

## 🔍 Multi-Tenant Notes

Use TenantContext or useTenant() in services, components, and utils that behave differently by tenant.  
For program names (e.g., NH Easy, ACCESS NYC), use constants or helpers in tenantUtils.js.  

---

## 🚨 Best Practices
Keep files small and focused — split files if they grow too large.  
Use consistent naming conventions (PascalCase for components, camelCase for functions).  
Avoid hardcoding — all repeated values (dropdowns, roles, etc.) should come from constants/.  

---

## 🔄 To Do
 
 Create unit tests for key services and utils  
 Add documentation for tenant override logic  
 Create shared modal and tooltip components  

---

## 🧼 Naming Conventions

Components: PascalCase.jsx  
Context / Hooks / Utils / Services: camelCase.js  
All exports should be named exports unless a layout or React component  

---

## 🧩 Example Imports by Category

@shared/components/Superuser/SuperuserCard
@shared/context/AuthContext
@shared/constants/dropdownOptions
@shared/hooks/useLocalStorage
@shared/layouts/AdminLayout
@shared/routes/ProtectedRoute
@shared/services/authService
@shared/utils/dateUtils


