# 🧮 Shared Utils

This folder contains **utility functions and helpers** used throughout the SocialBright platform. These utilities are pure functions that perform formatting, calculations, validation, and other repetitive or shared tasks.

---

## 📁 Folder Structure

- `dateUtils.js` — Helpers for formatting and calculating dates (e.g., age, next review dates).
- `validationUtils.js` — Custom form validators (e.g., email, phone, required fields).
- `formatUtils.js` — Format helpers for strings, currency, IDs, etc.
- `fileUtils.js` — Utilities for file handling (e.g., checking file types or sizes).
- `tenantUtils.js` — Utilities for displaying program-specific language based on tenant.
- `alertUtils.js` — Optional: generates standardized alert messages for frontend.

---

## ✅ Usage Guidelines

- All functions should be **pure** (no side effects or DOM access).
- Keep utility files focused on a **single domain** (e.g., dates, formatting).
- Utilities should not access React state, context, or components.

---

## 🛠️ Example Usage

```js
// dateUtils.js
export function calculateAge(dob) {
  const birthDate = new Date(dob);
  const ageDiff = Date.now() - birthDate.getTime();
  const age = new Date(ageDiff).getUTCFullYear() - 1970;
  return age;
}

// formatUtils.js
export function formatPhoneNumber(number) {
  return number.replace(/^(\d{3})(\d{3})(\d{4})$/, '($1) $2-$3');
}

// In a component
import { calculateAge } from '@shared/utils/dateUtils';
const age = calculateAge(client.dob);
```

---

## 🔍 Common Use Cases

📅 dateUtils — Used in demographics and Plan of Care for DOB → age, next review dates  
🔢 formatUtils — Used to clean up input or display formatted output  
📁 fileUtils — Used on the Documents and Upload pages  
🧾 tenantUtils — Used to swap “Access NYC” for correct state/program based on tenant  

---

## 🚨 Notes

Keep utils logic-only — do not include JSX, fetch/axios calls, or context usage.  
Group related functions in the same file but split large files when needed.  
Use consistent naming: camelCase for functions, avoid abbreviations.  

---

## 🔄 To Do
 
 Add getInitialsFromName() to format names for avatar fallback  
 Add stripHtml() for text sanitization  
 Add getTenantProgramName() with fallback support  

---

## 🧼 Naming Convention

File names: camelCase (e.g., dateUtils.js)  
Function names: camelCase (e.g., calculateAge, formatCurrency)  
Utility functions should be exported individually (named exports)  
