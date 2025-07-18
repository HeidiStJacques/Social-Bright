## 📦 backend/models/ – Database Models

This folder contains all the SQLAlchemy models that define the structure of the PostgreSQL database for the SocialBright platform.

---

## 🧱 Structure

The models are organized by schema:

clients: Client-related data (e.g., demographics, eligibility, documents, case notes, care plans)

users: User data, roles, auth logs, and staff assignments

tenants: Multi-tenant setup (tenant records, settings)

dropdowns: Reusable dropdown options (e.g., roles, statuses, MCOs, document categories)

---

## 📁 Files (suggested organization)

clients.py – Clients, Demographics, Eligibility, Documents, CaseNotes, PlanOfCare, CalendarEvents, StatusForms, Tasks

users.py – Users, Roles, UserRoles, AuthLogs, StaffAssignments

tenants.py – Tenants, TenantSettings

dropdowns.py – MCOs, Roles, Languages, Document Categories, Statuses

__init__.py – Base model and metadata for Alembic and SQLAlchemy

---

## 🔐 Compliance & Metadata

All models include:

created_at, updated_at timestamps

created_by, updated_by user references (for auditing)

__table_args__ = {'schema': '...'} to enforce schema separation

Pydantic response models defined separately in /schemas/

---

## 📌 Notes

Each table supports multi-tenancy via tenant_id

All sensitive data is stored encrypted or hashed

Alembic is used for migrations (see /alembic/)  
