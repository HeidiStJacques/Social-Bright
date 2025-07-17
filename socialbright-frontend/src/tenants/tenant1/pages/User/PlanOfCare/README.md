# 📝 Plan of Care Page — tenant1

This file (`PlanOfCarePage.jsx`) contains the **tenant1-specific version** of the Plan of Care page used by Case Managers. It overrides the shared Plan of Care layout and logic to reflect `tenant1`'s unique care planning requirements, workflows, and terminology.

This version is only rendered if the logged-in user is assigned to tenant1.

---

## 🧭 Page Overview

| Section                        | Customization in tenant1 version                                         |
|-------------------------------|---------------------------------------------------------------------------|
| 🏠 Living Arrangements         | Custom list of housing types, caregiver fields, and frequency questions  |
| 💰 Financial Section           | Modified deductions, income sources, and eligibility thresholds          |
| 🏥 Health Information          | Adjusted condition types, hospitals, and therapy selections              |
| 😖 Pain Assessment             | Custom prompts or tenant-specific scoring scale                          |
| 🧠 Cognitive Assessment        | Custom cognitive ability dropdowns or explanations                       |
| 🔒 90-Day Goals                | Different goal sets or reporting frequency                               |

---

## ✅ Usage Guidelines

- This page should **only be imported** when `tenantId === 'tenant1'`
- All content and labels that differ from the shared platform should be defined inside this file or imported from:
  - `@tenants/tenant1/config/programLanguage.js`
  - `@tenants/tenant1/constants/dropdownOptions.js`

- Shared layout wrapper: `PrivateLayout`
- Shared hooks: `useTenant`, `useClient`

---

## 🛠️ Example: Rendering Tenant-Specific Page

```jsx
import { useTenant } from '@shared/context/TenantContext';
import SharedPlanOfCarePage from '@user/pages/PlanOfCarePage';
import Tenant1PlanOfCarePage from '@tenants/tenant1/pages/user/PlanOfCarePage';

export default function PlanOfCarePage() {
  const { tenantId } = useTenant();
  return tenantId === 'tenant1' ? <Tenant1PlanOfCarePage /> : <SharedPlanOfCarePage />;
}
```
---

## 🔍 Key Differences from Shared Version

📋 Field Labels: Terms like “NH Easy” replaced with tenant1’s program name (from programLanguage.js)

🏷️ Dropdown Options: Uses tenant-specific lists for housing types, therapy options, and satisfaction levels

🚫 Validation Rules: Some sections are required or disabled based on tenant1’s policy

🖨️ Branding: Optional footer or disclaimer block for print/export

---

## 🚨 Notes

Ensure data model still matches backend expectations — do not break shared API schemas

Form state management should remain modular, with one object per section (e.g., form.financial, form.health)

Store/save logic can remain shared unless tenant1 has a different API route

---

## 🔄 To Do
 Add footer with tenant-specific Plan of Care disclaimer

 Integrate support for conditional printing/export of tenant1 care plan

 Validate tenant1-specific required fields before allowing form submission

---

## 🧼 Naming Convention

File: PlanOfCarePage.jsx (in tenants/tenant1/pages/user/)

Component: export default function PlanOfCarePage() { ... }

Use named imports from tenant-specific constants or config files

---

## 🧩 Related Imports

import { getProgramLabel } from '@tenants/tenant1/programLanguage';

import { HOUSING_OPTIONS } from '@tenants/tenant1/constants/dropdownOptions';

import { isFeatureEnabled } from '@tenants/tenant1/features';

