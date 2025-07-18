## 🔌 api/clients/ – Client API Routes
This folder contains FastAPI route handlers related to client data and actions.

---

## 📁 Files (suggested organization)

clients.py – Create, read, update client records

case_notes.py – Add and retrieve client case notes

documents.py – Upload and list client-specific documents

calendar_events.py – Manage client calendar events

plan_of_care.py – Submit and fetch care plan data

eligibility.py – Eligibility info (review date, financial redetermination)

status_forms.py – Handle client status submissions

tasks.py – Assign and manage tasks tied to a client

---

## 📌 Key Features

All routes use tenant- and client-level filtering (e.g., /tenants/{tenant_id}/clients/{client_id}/...)

Role-based access control (RBAC) enforced via dependency injection

Input/output validation via Pydantic models from /schemas/

JWT authentication required for all endpoints

---

## 🔐 HIPAA & Audit Considerations

All actions log user and timestamp (create/update)

Document uploads support immutable storage integration

Routes validate tenant-client-user relationships

---

## 🔁 Planned Extensions

Bulk upload/import of clients

Client transfer or discharge workflows

Revert/view history of past client data (e.g., plans, notes)
