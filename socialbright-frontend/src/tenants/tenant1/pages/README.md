# 📄 Tenant Pages — tenant1

This folder contains **tenant-specific page overrides** for `tenant1`. These pages replace or extend the default SocialBright views with logic, layout, content, or workflows tailored to the needs of this specific tenant.

These pages should be scoped to `tenantId === 'tenant1'` and are loaded dynamically in place of the shared pages when applicable.

---

## 📁 Folder Structure

| File / Folder              | Description                                                                 |
|----------------------------|-----------------------------------------------------------------------------|
| `PlanOfCarePage.jsx`       | Custom version of the Plan of Care page with tenant-specific sections       |
| `DemographicsPage.jsx`     | Custom demographics form with different fields, validations, or labels       |
| `StatusFormPage.jsx`       | Custom status form page (e.g. different closure reasons or workflows)        |
| `ReportsPage.jsx`          | Tailored report filters, columns, or formats for this tenant                 |
| `CaseNotesPage.jsx`        | Optional custom version of case notes entry or review                        |
| `EligibilityPage.jsx`      | Modified eligibility logic or layout for `tenant1`                          |

---

## ✅ Usage Guidelines

- These pages **only load** if the current `tenantId` matches `'tenant1'`
- Use tenant-aware logic from context:
  ```js
  import { useTenant } from '@shared/context/TenantContext';
  const { tenantId } = useTenant();
  if (tenantId !== 'tenant1') return null;

---

// Inside a router or layout
{tenantId === 'tenant1' ? (
  <Tenant1PlanOfCarePage />
) : (
  <SharedPlanOfCarePage />
)}

---
## 🔍 Common Customizations
Page  What Might Be Different  
Plan of Care -  Custom sections, state program names, workflow changes  
Demographics -	Extra required fields, custom dropdown values  
Status Form -	Modified closure reasons, different field groupings  
Reports -  specific columns, export formats, or filtering  
Eligibility -  Alternate eligibility rules or calculation logic  

---

## 🚨 Notes

These overrides must remain compatible with shared data models unless tenant data is separated in the backend.  
Always test each page with your tenant ID manually.  
Pages should still use shared layout wrappers (e.g., PrivateLayout, AdminLayout) for visual consistency.  

---

## 🔄 To Do
 Confirm custom validation logic for Status Form  
 Add disclaimer banner to bottom of Demographics and Plan of Care  
 Audit all dropdowns to confirm values match tenant-specific rules  

---

## 🧼 Naming Convention

Pages are named with PascalCase (e.g., PlanOfCarePage.jsx)  
Use standard export: export default function PlanOfCarePage() {...}  
Only create overrides when absolutely necessary — fallback to shared when possible  

---

## 🧩 Example Imports

import PlanOfCarePage from '@tenants/tenant1/pages/PlanOfCarePage';  
import DemographicsPage from '@tenants/tenant1/pages/DemographicsPage';  

