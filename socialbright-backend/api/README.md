# 📂 api/

This folder contains all the **FastAPI route handlers** for the backend of the SocialBright application.

Each file in this folder defines a set of API endpoints organized by feature or user role.

---

## 📁 Folder Purpose

The `api/` folder is where you define the different **route groups** and attach them to the FastAPI app using `include_router()`.

Each module:
- 📌 Imports `APIRouter`
- 🔐 May include route-level dependencies (e.g., role-based access control)
- 🧩 Interacts with database models, services, and schemas

---

## 📄 Common Files

| File                    | Description                                               |
|-------------------------|---------------------------------------------------------  |
| `auth.py`               | 🔐 Login, logout, password reset, token management        |
| `users.py`              | 👤 User creation, roles, status, profile info             |
| `admins.py`             | 🛠️ Admin-level functions like managing clients/users      |
| `superuser.py`          | 👑 System-wide features for platform-level management     |
| `clients.py`            | 🧍 Client-related routes (demographics, eligibility, etc.)|
| `calendar.py`           | 📆 Calendar and appointment scheduling routes             |
| `stripe.py`             | 💳 Stripe integration for plan checkout                   |
| `tenant_clients.py`     | 🏢 Tenant-specific client routing and multi-tenant logic  |

---

## 🧠 Usage Example

How a router is typically defined:

```python
from fastapi import APIRouter

router = APIRouter()

@router.get("/status")
def get_status():
    return {"status": "ok"}
```
---

from api import users
app.include_router(users.router, prefix="/api/users")

---
## ✅ Best Practices

📦 Keep routes modular and grouped by function or user role

🧩 Use schemas.py and crud/ functions to keep routes clean

🔐 Apply authentication and role checks using FastAPI dependencies

🧪 Add tests for each endpoint in the tests/ folder

---

## 📌 Notes

Keep route URLs RESTful and consistent (e.g., /api/clients/{id})

Avoid putting too much logic in the route functions — delegate to services or CRUD modules

Make sure each router is properly prefixed when added to the app


