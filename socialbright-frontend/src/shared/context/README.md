# 🧠 Shared Context

This folder contains **React Context Providers** used throughout the SocialBright application to manage global state across components and pages. These contexts support authentication, tenant awareness, user roles, and other app-wide logic.

---

## 📁 Folder Structure

- `AuthContext.jsx` — Stores and provides user login state, access tokens, and roles.
- `TenantContext.jsx` — Manages the current tenant ID, name, and tenant-level features.
- `UserContext.jsx` — Optional context for additional user-specific settings and preferences.
- `ClientContext.jsx` — Stores selected client ID for navigating client-specific pages.
- `AlertContext.jsx` — Central system for toast messages, alerts, and feedback messages.
- `ThemeContext.jsx` *(optional)* — Manages light/dark mode if enabled later.

---

## ✅ Usage Guidelines

- All contexts should wrap the main app in `App.jsx` or `main.jsx` via `<ContextProvider>`.
- Use `useContext(...)` hooks to access context values in components.
- Avoid placing page-specific state here — only app-wide, persistent state.

---

## 🛠️ Example Usage

```jsx
// Access tenant data
import { useTenant } from '@shared/context/TenantContext';

const { tenantId, tenantName } = useTenant();
```

// Access current user
import { useAuth } from '@shared/context/AuthContext';

const { user, roles, isAuthenticated } = useAuth();
```
// Set selected client
import { useClient } from '@shared/context/ClientContext';

useEffect(() => {
  setClientId(selectedClient.id);
}, []);
```

---

## 🔍 Common Contexts in Use

🔐 AuthContext — Login/logout, token storage, and route protection  
🏢 TenantContext — Multi-tenancy logic (e.g., program name: NH Easy vs NY Access)  
👤 ClientContext — Used to persist selected client across sidebar-linked pages  
⚠️ AlertContext — Used to show global feedback messages (success, error, info)  
🚨 Notes  

Context values should be memoized or wrapped in useCallback if passing functions.  
Keep logic modular — complex logic should live in custom hooks or services.  
Sensitive info like passwords or tokens should never be stored in plain context — use secure storage and cleanup on logout.  

---

## 🔄 To Do

 Add expiration logic to AuthContext  
 Add offline/online status to TenantContext  
 Support multi-tab sync for logout  

---

## 🧼 Naming Convention

Files are named using PascalCase (e.g., AuthContext.jsx)  
Context hook names follow useX pattern (e.g., useTenant, useClient)  
Export a context provider (XProvider) and a custom hook (useX) per file  

