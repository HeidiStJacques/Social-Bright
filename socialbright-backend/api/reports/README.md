# 📊 API: Reports

This folder contains report-related API routes for the SocialBright backend.

---

## 📁 Files

- **client_summary.py** – Endpoint for exporting client summary reports as PDF
- **demographics.py** - Displays client demographic details including age, gender, language, race/ethnicity, contact info, and living arrangement for audit, outreach, or planning.
- **Eligibility Status Report** - Shows current Medicaid eligibility status per client, including MEA review date, financial redetermination date, and any overdue evaluations.
- **export.py** - Handles report export logic (PDF/CSV), applies formatting, integrates filters, and routes output from report modules into downloadable files.
- **Missing Documents Report** - Lists clients with missing or expired required documents (e.g., MEA, Consent, Plan of Care), helping staff ensure compliance.
- **Plan of Care Report** - Tracks completion status of each section of the Plan of Care for active clients, highlighting gaps or overdue reviews.
- **Tasks Completed Report** - Summarizes tasks completed by staff within a date range, including type, client, completion timestamp, and assigned user.

---

## 📌 Features

- 🔐 Secured with user authentication (`get_current_user`)
- 📄 PDF export with `reportlab`
- 🖋 Custom Lato font support for clean visual layout
- 🔍 Filter reports by type, client, and status via query parameters

---

## 📤 Example Endpoint

GET /api/reports/export-pdf

---

### ⚙️ Query Parameters:
- `report_type` – Report type (`client-summary`)
- `client_id` – (Optional) ID of the client
- `status` – (Optional) Client status filter

---

## 🛠 Requirements

- `reportlab` Python library
- `app/static/fonts/Lato-Regular.ttf` (or fallback to default font)

---

## ✅ To Do

- Add more report types (e.g., MEA status, overdue care plans)
- Support CSV export
- Add tenant-aware filtering

