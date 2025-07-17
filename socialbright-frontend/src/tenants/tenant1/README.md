# 🏢 Tenant: tenant1

This folder contains **custom logic, configuration, and overrides** specifically for the tenant identified as `tenant1`. It enables tenant-level control over branding, language, features, and forms without affecting other tenants in the SocialBright platform.

Each tenant folder acts as a layer on top of the core application, allowing for specific customization while reusing the shared platform.

---

## 📁 Folder Structure

| File/Folder            | Description                                                                 |
|------------------------|-----------------------------------------------------------------------------|
| `branding.js`          | Optional: custom tenant logo, disclaimers, or report header/footer content |
| `forms/`               | Customizations for specific forms (e.g., Plan of Care, Status Form)         |
| `language.js`          | Replaces default program names or terms (e.g., replaces “NH Easy”)          |
| `features.js`          | Controls feature flags (e.g., disable documents, enable custom reports)     |
| `overrides/`           | Optional: component or logic overrides unique to this tenant                |

---

## ✅ Usage Guidelines

- Always check the `tenantId` from context using `useTenant()` before applying logic.
- If a file does not exist in this folder, fallback to shared defaults.
- Keep all overrides **isolated** and **non-breaking** to other tenants.

---

## 🛠️ Example Usage

```js
// Replace program-specific name
import { getProgramLabel } from '@tenants/tenant1/language';
const medicaidName = getProgramLabel('medicaid_gateway');
// returns: “ACCESS NY” or custom label for tenant1

---
// Feature toggle
import { isFeatureEnabled } from '@tenants/tenant1/features';
if (isFeatureEnabled('custom_status_form')) {
  renderCustomStatusForm();
}
```

---
## 🔍 Customization Types

Category	Description
🔖 Language	Terms like “NH Easy” → “ACCESS NY” or tenant-specific programs  
📄 Forms	Modify Plan of Care, Demographics, Status, Intake  
⚙️ Features	Enable/disable platform sections like Documents or Reports  
🎨 Branding	Add custom logo, colors, or legal disclaimers to reports  
🧩 Component Logic	Replace components using tenant-aware wrappers (optional)  

## 🚨 Notes

Avoid duplicating full components. Use config-driven logic or wrap shared components.  
This folder is only loaded if tenantId === 'tenant1' in context.  
Be careful when updating shared features that are tenant-aware — always test changes locally.  

---

## 🔄 To Do (Optional per Tenant)
 
 Add report disclaimer or branding footer  
 Create Plan of Care overrides specific to this tenant  
 Add language support or translations (if needed)  

---

## 🧼 Naming Convention

All files use camelCase.js  
Folders like forms/ and overrides/ group related logic  
All tenant-specific logic must be scoped to tenant1 only  

## 🧩 Example Imports

@tenants/tenant1/language  
@tenants/tenant1/features  
@tenants/tenant1/forms/statusFormConfig  
@tenants/tenant1/branding  

