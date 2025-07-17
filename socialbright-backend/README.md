# 🚀 SocialBright Backend

This is the **FastAPI-powered backend** for the SocialBright platform — a secure, HIPAA-aligned, multi-tenant case management system for social and health programs. It handles authentication, user management, client data, forms, file storage, analytics, and tenant-level configurations.

---

## 🏗️ Tech Stack

- **Framework**: FastAPI (Python 3.10+)
- **Database**: PostgreSQL with multiple schemas (`clients`, `users`, `tenants`, `dropdowns`)
- **ORM**: SQLAlchemy
- **Migrations**: Alembic
- **Auth**: JWT + OAuth2PasswordBearer
- **CORS**: Enabled for frontend (`localhost:5173`)
- **File Storage**: MinIO or Nextcloud (optional external storage)
- **Docker Support**: Yes (WSL2 recommended for local testing)

---

## 🚦 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/your-org/socialbright-backend.git
cd socialbright-backend
```
---
## Create and activate a virtual environment

python -m venv venv

source venv/bin/activate  # Or use `venv\Scripts\activate` on Windows

---

## Install dependencies

pip install -r requirements.txt

---

## Configure environment variables

DATABASE_URL=postgresql://postgres:yourpassword@localhost:5433/socialbright

SECRET_KEY=your-secret-key

ALGORITHM=HS256

ACCESS_TOKEN_EXPIRE_MINUTES=60

FRONTEND_ORIGIN=http://localhost:5173

---

## Run the backend

uvicorn app.main:app --reload

---

## 🧱 Project Structure

app/  
├── main.py                  # Entry point  
├── models/                  # SQLAlchemy ORM models (organized by schema)  
├── schemas/                 # Pydantic request/response schemas  
├── crud/                    # CRUD operations for each model  
├── api/                     # API routes grouped by feature (auth, users, clients, admin, etc.)  
├── services/                # Business logic (e.g., alerts, email)  
├── dependencies/            # OAuth2, permissions, tenant validation, etc.  
├── core/                    # CORS, config, JWT utils  
alembic/  
├── versions/                # Migration scripts  
shared/  
├── enums/                   # Global enums like roles, status  

---

## 🔐 Auth System

Supports login, logout, token refresh, and role-based access

Role types: case_manager, admin, superuser

Passwords are hashed with bcrypt

Token-based auth using JWT

---

## 🏢 Multi-Tenancy

Each tenant has isolated client data via tenants, users, clients schemas

tenant_id is checked on every authenticated request

Tenants can have custom features, and reports with modified headers

---

## 🧪 Running Tests

pytest

--
## 🧰 Alembic (Database Migrations)

### Create a new migration

alembic revision --autogenerate -m "Add new table"

### Apply migrations

alembic upgrade head

---

## 🗃️ API Endpoints

Route Prefix	Description

/api/auth	Login, token, password reset

/api/users	User creation, update, role mgmt

/api/clients	Client data CRUD (demographics, notes, forms)

/api/calendar	Event scheduling for clients

/api/admin	Admin dashboard, alerts, audit logs

/api/superuser	System-wide admin tools

/api/stripe	Subscription + billing integration

---

## 📦 File Uploads

Supported formats: PDF, DOCX, JPG, PNG

Stored locally or via MinIO/S3/Nextcloud

Can be tied to specific client records

---

## 📌 To Do / In Progress

 Add audit log export feature

 Add email-based tenant invitations

 Enforce file retention policies for HIPAA compliance

 Add unit + integration tests for all critical endpoints

---

##👩‍⚕️ HIPAA Notes

✅ Data is tenant-isolated

✅ File deletion logging supported

✅ Admin alerts for overdue visits/tasks

🔒 S3-compatible storage recommended with object-lock for long-term compliance

---

## 🤝 Contributing

PRs and suggestions welcome! Please:

Follow PEP8 and use black/ruff for linting

Write tests for new endpoints

Avoid tenant-specific logic in shared files — keep custom behavior in tenants/

---
## 📬 Contact

For questions or access requests, contact: info@socialbright.org

