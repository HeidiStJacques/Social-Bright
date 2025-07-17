# 🪝 Shared Hooks

This folder contains **custom React hooks** used throughout the SocialBright application. Hooks here encapsulate reusable logic and behaviors, keeping components clean and modular.

---

## 📁 Folder Structure

- `useAuth.js` — Hook to access authentication data from `AuthContext` (user, roles, login state).
- `useTenant.js` — Hook to retrieve tenant ID, name, and available tenant features.
- `useClient.js` — Hook to manage or retrieve the currently selected client.
- `useFormState.js` — Generic hook to manage controlled form inputs with validation.
- `useDebounce.js` — Debounce any value (e.g., input) to reduce re-renders or API calls.
- `useLocalStorage.js` — Sync state with `localStorage` for persistence.
- `useClickOutside.js` — Detect clicks outside an element (used in dropdowns/modals).
- `useToggle.js` — Simple hook to toggle a boolean value.

---

## ✅ Usage Guidelines

- Hooks in this folder are meant to be **shared across multiple components or pages**.
- All hooks should follow the `useX` naming convention.
- Keep each hook focused on **one behavior or state pattern**.
- Prefer composing multiple small hooks together rather than building large monolithic ones.

---

## 🛠️ Example Usage

```js
import { useAuth } from '@shared/hooks/useAuth';

const { user, roles, isAuthenticated } = useAuth();

---

import { useDebounce } from '@shared/hooks/useDebounce';

const [searchTerm, setSearchTerm] = useState('');
const debouncedSearch = useDebounce(searchTerm, 500);

---

import { useLocalStorage } from '@shared/hooks/useLocalStorage';

const [theme, setTheme] = useLocalStorage('theme', 'light');
```

---

## 🔍 Hook Categories

🔐 Authentication: useAuth, useTenant  
👤 Client Management: useClient  
🧠 Form Logic: useFormState, useToggle  
🛑 UI/UX Events: useClickOutside, useDebounce  
💾 Persistence: useLocalStorage  
🚨 Notes  

Do not include backend or service calls directly in hooks—call services separately or from inside effects.  
Hooks must not be called conditionally — follow React’s rules of hooks.  
Always include default values and cleanup logic where needed.  

---

## 🔄 To Do

 Add usePagination for table paging logic  
 Add useFetch for standardized API requests  
 Add usePermissions to manage role-based access logic  

---

## 🧼 Naming Convention

File names: useCamelCase.js (e.g., useLocalStorage.js)  
Hook names must begin with use  
Export one hook per file by default  



