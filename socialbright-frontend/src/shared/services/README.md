# 🧰 Shared Services

This folder contains all **API service modules** used across the SocialBright platform. Services handle communication between the frontend and backend using `axios` or `fetch`, abstracting API requests into organized, reusable functions.

---

## 📁 Folder Structure

- `authService.js` — Handles login, logout, password reset, and auth token management.
- `clientService.js` — Fetches client data including demographics, eligibility, and documents.
- `dashboardService.js` — Retrieves dashboard metrics like upcoming visits, tasks, and alerts.
- `documentService.js` — Uploads, fetches, and lists client documents.
- `calendarService.js` — Manages calendar events for each client (create, read, delete).
- `userService.js` — Handles user account creation, role updates, and admin user management.
- `adminService.js` — APIs for managing alerts, audit logs, admin settings, and more.
- `superuserService.js` — System-wide superuser endpoints for tenants, system logs, analytics.
- `stripeService.js` — APIs for Stripe pricing, checkout sessions, and billing integration.

---

## ✅ Usage Guidelines

- Each service exports **named async functions** that perform API requests.
- Keep services **stateless** — do not store tokens or auth state directly.
- Services should **only** handle HTTP logic; no UI logic or formatting.

---

## 🛠️ Example Usage

```js
// authService.js
export async function login(email, password) {
  const response = await axios.post('/api/auth/login', {
    username: email,
    password,
  });
  return response.data;
}

// in a component
import { login } from '@shared/services/authService';

const handleLogin = async () => {
  const user = await login(email, password);
  setUser(user);
};
```

---

##  🔍 Common Patterns
✅ axios.post(...) for form submissions (login, create)  
🔄 axios.get(...) for fetching lists or records  
🛑 Error handling: use try/catch in components or wrap services in useQuery  

---

## 🚨 Notes

All service files should use relative or alias paths like @shared/services/...  
Use axios globally configured with base URL and interceptors  
Avoid repeating endpoints—centralize them in a constants file if needed  

---

## 🔄 To Do
 
 Add errorHandler.js to standardize error formatting  
 Add retry logic for token expiration  
 Add caching logic with SWR or React Query (future)  

---

## 🧼 Naming Convention

File names: camelCase (e.g., clientService.js)  
Exported functions: async, named exports only  
Group services by domain (auth, dashboard, admin, superuser)  
