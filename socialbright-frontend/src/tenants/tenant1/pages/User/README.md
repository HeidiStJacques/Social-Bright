# 👤 User Pages — tenant1

This folder contains **Case Manager (user-level) page overrides** specifically for the tenant `tenant1`. These pages support tenant-specific workflows, fields, and validations that differ from the default shared user pages used by other organizations.

These overrides are used for authenticated users with the role `case_manager` (or similar) when the current tenant is `tenant1`.

---

## 📁 Folder Structure

| File / Page                         | Description                                                             |
|-------------------------------------|-------------------------------------------------------------------------|
| `DashboardPage.jsx`                | Custom case manager dashboard layout or data for tenant1               |
| `ClientsPage.jsx`                  | Customized list view or filters for tenant1’s clients                  |
| `DemographicsPage.jsx`             | Adjusted demographic fields, validations, or dropdowns                 |
| `PlanOfCarePage.jsx`               | Overrides for care plan structure, sections, or tenant-specific terms  |
| `EligibilityPage.jsx`              | Custom eligibility calculations or threshold settings                  |
| `CaseNotesPage.jsx`                | Custom case note categories or visibility logic                        |
| `CalendarPage.jsx` *(optional)*    | Calendar behavior or styling specific to tenant1                      |
| `StatusFormPage.jsx` *(optional)*  | Custom status reasons, fields, or workflows                           |

---

## ✅ Usage Guidelines

- These pages are only used if both:
  - `tenantId === 'tenant1'`
  - The authenticated user has a role like `case_manager`
- Pages should follow shared design/layouts (`PrivateLayout`) unless otherwise required
- Only override the parts of the page that truly differ from the shared experience

---

## 🛠️ Example Usage

```jsx
import { useTenant } from '@shared/context/TenantContext';
import SharedPlanOfCare from '@user/pages/PlanOfCarePage';
import Tenant1PlanOfCare from '@tenants/tenant1/pages/user/PlanOfCarePage';

const PlanOfCarePage = () => {
  const { tenantId } = useTenant();
  return tenantId === 'tenant1' ? <Tenant1PlanOfCare /> : <SharedPlanOfCare />;
};
```
---

## 🔍 Common Customization Examples

Page	Example Customizations

Demographics	Custom address layout, alternate MCO list, required fields

Plan of Care	Tenant1-specific living arrangement types, assessment sections

Eligibility	Adjusted thresholds, income deduction rules, custom program names

Status Form	Custom closure reasons or billing status workflows

Dashboard	Filters for active/suspended clients, or branded tenant greeting

---

## 🚨 Notes

Avoid copying full shared components unless necessary — instead, inject tenant-specific values where possible

Pages should still use useTenant() and useClient() if tied to client context

Ensure all dropdowns or constants come from @tenants/tenant1/config/ or shared constants

---

## 🔄 To Do
 
 Add disclaimer footer to Plan of Care and Status Form

 Localize program language in EligibilityPage

 Confirm tenant1-specific client search/filter behavior

---

## 🧼 Naming Convention

Use PascalCase for filenames (e.g., DashboardPage.jsx)

Match shared page names and folder structure under @user/pages/...

Export default functional components only

---

## 🧩 Example Imports

import PlanOfCarePage from '@tenants/tenant1/pages/user/PlanOfCarePage';

import DemographicsPage from '@tenants/tenant1/pages/user/DemographicsPage';

import StatusFormPage from '@tenants/tenant1/pages/user/StatusFormPage';
