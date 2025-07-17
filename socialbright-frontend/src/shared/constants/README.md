# 📌 Shared Constants

This folder contains global **constants** used throughout the SocialBright platform. These constants include static values like dropdown options, default configurations, field labels, role definitions, and tenant-level settings.

---

## 📁 Folder Structure

- `roles.js` — List of supported user roles (e.g., case_manager, admin, superuser)
- `dropdownOptions.js` — Centralized dropdown field values (e.g., gender, race, visit types)
- `formDefaults.js` — Default form states or values for pages like Plan of Care, Status Form
- `tenantPrograms.js` — State/program-specific configs (e.g., NH Easy, Medicaid, CFI)
- `colors.js` — Shared brand colors (e.g., #007B94 for buttons/links)
- `statusLabels.js` — Label mapping for statuses used across dashboards or badges
- `alertTypes.js` — Constants for alert categories: Urgent, Warning, Info

---

## ✅ Usage Guidelines

- Always import constants from here instead of hardcoding values in pages or components.
- Update constants in one place to apply changes across all usages.
- Constants should be **flat** and **readable**; avoid nesting deep objects.
- Tenant-aware constants (like program names or living arrangement types) should use `tenantPrograms.js`.

---

## 🛠️ How to Use

```js
// Example: roles.js
export const ROLES = {
  CASE_MANAGER: 'case_manager',
  ADMIN: 'admin',
  SUPERUSER: 'superuser',
};

// Example: dropdownOptions.js
export const GENDER_OPTIONS = ['Male', 'Female', 'Non-Binary', 'Prefer not to say'];
export const VISIT_TYPES = ['Face to Face', 'Phone Call', 'Other'];

// Example usage in a component
import { GENDER_OPTIONS } from '@shared/constants/dropdownOptions';

<select>
  {GENDER_OPTIONS.map(option => (
    <option key={option}>{option}</option>
  ))}
</select>
```

---

## 🔍 Common Constants

🧑‍⚕️ roles.js — Used in auth, layout protection, and user management  
📋 formDefaults.js — Used to pre-fill forms or reset form state  
🏥 tenantPrograms.js — Used to switch program terms like “ACCESS NYC” dynamically  
🚨 Notes  

Do not mix backend and frontend constants — keep these frontend-only.  
Keep constant files small and purpose-driven — split if needed.  
Constants should be imported with path aliases (e.g., @shared/constants/...)  

---

## 🔄 To Do
 
 Add constants for date formats and timezone handling  
 Add tenant-specific override logic for select constants  
 Add constants for permission scopes  

---

## 🧼 Naming Convention

Files use camelCase (e.g., formDefaults.js)  
Named exports should be UPPER_SNAKE_CASE or camelCase depending on type  
All constants should be grouped by usage domain (e.g., roles, alerts, dropdowns)  
