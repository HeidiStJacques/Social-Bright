# 🌐 Public Pages — tenant1

This folder contains **public-facing page overrides** for the tenant `tenant1`. These include pages accessible without authentication, such as the login screen, password reset, registration, and disclaimers. Customizations here reflect tenant1’s specific branding, disclaimers, messaging, or layout preferences.

These public pages override the shared versions when the current `tenantId` is `'tenant1'`.

---

## 📁 Folder Structure

| File                            | Description                                                             |
|---------------------------------|-------------------------------------------------------------------------|
| `LoginPage.jsx`                | Customized login screen with tenant1-specific message, logo, or fields  |
| `ForgotPasswordPage.jsx`       | Custom flow or language for password recovery                           |
| `PasswordResetPage.jsx`        | Custom layout or tenant-branded experience for resetting passwords      |
| `WelcomePage.jsx` *(optional)* | Optional welcome or landing page for tenant1 visitors                   |
| `TermsPage.jsx` *(optional)*   | Tenant-specific disclaimer or privacy policy display                    |

---

## ✅ Usage Guidelines

- These pages are only shown if the resolved `tenantId === 'tenant1'`
  
- Always wrap tenant-specific logic in `useTenant()` to verify tenant context
  
- Use these to override layout, language, or legal info as required by tenant1

---

## 🛠️ Example Usage

```jsx
import { useTenant } from '@shared/context/TenantContext';
import SharedLogin from '@public/pages/LoginPage';
import Tenant1Login from '@tenants/tenant1/pages/public/LoginPage';

const LoginPage = () => {
  const { tenantId } = useTenant();
  return tenantId === 'tenant1' ? <Tenant1Login /> : <SharedLogin />;
};
```
---

## 🔍 Customization Examples

Page	Possible Overrides

Login Page	Tenant1 logo, background image, language, support info

Forgot Password	Custom instructional text or support contact

Reset Password	Tenant-specific validation rules or branded reset screen

Terms / Welcome Page	Custom messaging or tenant-specific disclaimers

---

## 🚨 Notes

Do not hardcode tenant IDs — use useTenant() for tenant awareness.

Pages here should still follow shared layout structure and design rules (Tailwind, Lato, #007B94).

Branding overrides (e.g. logo) should be stored in @tenants/tenant1/branding.js and imported here.

---

## 🔄 To Do
 
 Add optional contact support block to LoginPage

 Add tenant disclaimer under Forgot Password form

 Add TermsPage and link to it from Login footer

---

## 🧼 Naming Convention

Pages use PascalCase (e.g., LoginPage.jsx)

Only override what is necessary — use shared logic where possible

Export default components

---

## 🧩 Example Imports

import LoginPage from '@tenants/tenant1/pages/public/LoginPage';

import ForgotPasswordPage from '@tenants/tenant1/pages/public/ForgotPasswordPage';


