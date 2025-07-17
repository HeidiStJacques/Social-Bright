# 🏢 Tenants Folder

The `tenants/` folder contains all **tenant-specific logic, overrides, features, and configurations** for multi-tenant support across the SocialBright platform. Each tenant (organization, agency, or region) can have customized behavior, forms, language, and optional features, while still using the same core system.

---

## 🧭 Folder Overview

| Folder/File                  | Description                                                                 |
|------------------------------|-----------------------------------------------------------------------------|
| `config/`                    | JSON or JS files defining tenant settings, program names, features          |
| `customForms/`               | Tenant-specific form overrides (e.g. Plan of Care sections, status form)    |
| `branding/` *(optional)*     | Logos, disclaimers, and report branding for each tenant                    |
| `programLanguage.js`         | Maps internal program names like “NH Easy” to tenant-specific equivalents  |
| `features.js`                | Defines which platform features are enabled/disabled per tenant            |
| `tenantRegistry.js`          | Maps tenant IDs to names and configuration used throughout the app         |

---

## ✅ Usage Guidelines

- All tenant-related conditions should go through `useTenant()` or values from `TenantContext`.
- Use conditional logic to support per-tenant customization without duplicating entire pages.
- Never hardcode tenant names (e.g., "NH Easy") — always use `programLanguage.js` or tenant config.

---

## 🛠️ Example Usage

```js
import { getProgramLabel } from '@tenants/programLanguage';
const programName = getProgramLabel('medicaid_gateway', tenantId);
// e.g., returns "ACCESS NYC" or "Sunrise Home Health"

---

import { isFeatureEnabled } from '@tenants/features';
if (isFeatureEnabled('document_upload', tenantId)) {
  // show upload button
}

---

import { getTenantConfig } from '@tenants/tenantRegistry';
const config = getTenantConfig(tenantId);
```
---

## 🔍 Common Tenant Customizations

📄 Form sections: Living Arrangement, Plan of Care, Status Forms  
🏷️ Program labels: Replace “NH Easy” with tenant-specific program name  
⚙️ Features: Enable/disable reports, file uploads, care plans, etc.  
🎨 Branding: Optional logos, disclaimers, and email footers  

---

## 🚨 Notes

All tenant configs must fallback to defaults if values are missing.  
Changes in this folder should be low-risk and non-breaking across tenants.  
Avoid adding one-off logic to core components — put tenant logic here.  

---

## 🔄 To Do
 
 Add disclaimers.js per tenant for footer/legal text  
 Add dynamic report templates per tenant  
 Add language/translation overrides (optional multilingual)  

---

## 🧼 Naming Convention

Config and helper files: camelCase.js  
Each tenant's config is stored under config/ using tenant ID or slug  
Export only pure config data or stateless helpers  

---

## 🧩 Example Imports

@tenants/features  
@tenants/programLanguage  
@tenants/config/sunriseServicesConfig  
@tenants/tenantRegistry  

