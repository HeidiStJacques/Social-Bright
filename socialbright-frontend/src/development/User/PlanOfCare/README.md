# 📋 Development – Plan of Care (POC)

This folder contains the **in-development components for the SocialBright Plan of Care (POC)** system — a multi-section clinical and social care planning tool designed for case managers working with clients across various programs.

---

## 📁 Structure

The `Plan of Care` feature is modular and broken into multiple sections, each handled by its own React component. These sections are designed to be conditionally rendered, editable, and saved per client.

### Example sections include:

- `PlanOfCarePageMain.jsx` – Visit type, living arrangements, caregiver info
- `PlanOfCarePageFinancial.jsx` – Income sources, deductions, eligibility results
- `PlanOfCarePageHealthInformation.jsx` – Diagnoses, allergies, health status
- `PlanOfCarePagePainAssessment.jsx` – Pain levels, medication, care strategies
- `PlanOfCarePageCognitiveAssessment.jsx` – Orientation, memory, decision-making
- `PlanOfCarePageSafetyAssessment.jsx` – Risks, supports, fall history
- `PlanOfCarePageDailyLivingAssessment.jsx` – ADLs/IADLs like bathing, cooking
- `PlanOfCarePageSubstanceUse.jsx` – Alcohol, drug, tobacco usage tracking
- `PlanOfCarePage90Day.jsx` – Review notes and 90-day follow-up plan

---

## 🧪 Purpose

This development folder contains all WIP components for:
- Building a **comprehensive care plan per client**
- **Testing multi-tenant adaptability** (based on state/program)
- **Staging** user-driven and conditional workflows
- Preparing for **full backend integration** via API endpoints

---

## 🔧 Features

- Fully modular and stateful forms
- Multi-section form layout (step-by-step)
- Local save and prefill from previous plans
- Placeholder tenant-aware customization (e.g., NH Easy → dynamic program names)
- Will include autosave, PDF export, and submission tracking in future releases

---

## 🧼 Cleanup + Migration

Once finalized:
- Move components to `src/user/plan-of-care`
- Connect to real backend save/load logic
- Remove test/demo-only fields
- Finalize tenant-specific labels and field mappings

---

## 🔐 Notes

- No tenant names, program names, or state-specific content should be hardcoded.
- Use `useTenant()` hook to access tenant-aware labels and logic.
- Avoid exposing PHI or real client test data during development commits.

---

## 🤝 Contribution Guidelines

- Use Tailwind CSS responsive utilities
- Follow existing component patterns
- Keep state grouped by section
- Use `localStorage` only for staging/dev
- Document conditional logic clearly

---

## 🏁 Status

| Section                         | Status         | Notes                     |
|---------------------------------|----------------|---------------------------|
| PlanOfCarePageMain              | ✅ Complete    |                           |
| PlanOfCarePageFinancial         | ✅ Complete    | Needs backend save        |
| PlanOfCarePageHealthInformation | ✅ Complete    |                           |
| PlanOfCarePagePainAssessment    | ✅ Complete    |                           |
| PlanOfCarePageCognitiveAssessment | ✅ Complete  |                           |
| Remaining Sections              | 🟡 In Progress | Being styled + integrated |

---

## 📣 Feedback Welcome

If you're testing a section or refactoring layout logic, please include:
- Description of change
- Screenshots or video (optional)
- Any bugs or logic gaps you notice

---

## 🖼 Screenshots

Each section will soon include visual examples and user flows to guide development and QA testing.

---

