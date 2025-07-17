# 📂 routes/

This folder contains all **FastAPI route registrations** for the SocialBright backend. Each file defines one or more groups of related API endpoints, organized by feature or user role.

---

## 🎯 Purpose

The `routes/` folder:

- 📌 Groups all endpoint logic (HTTP routes) in one place
- 🧩 Connects to `crud/`, `schemas/`, and `dependencies/` modules
- 🧼 Keeps business logic out of `main.py`
- 🧭 Clearly separates role-based or feature-based APIs

---

## 📄 Common Files

| File                | Description                                                  |
|---------------------|--------------------------------------------------------------|
| `auth.py`           | 🔐 Login, logout, token validation, password reset           |
| `users.py`          | 👤 User registration, profile info, password management      |
| `admins.py`         | 🛠️ Admin-specific APIs like managing clients or users        |
| `superuser.py`      | 👑 System-wide APIs for managing tenants and global settings |
| `dashboard.py`      | 📊 Summary metrics for dashboards                            |
| `calendar.py`       | 📆 Routes for calendar events and appointments               |
| `clients.py`        | 🧍 Client-related routes (demographics, eligibility, etc.)    |
| `stripe.py`         | 💳 Stripe billing and subscription routes                    |

---

## 🧪 Example: auth.py

```python
from fastapi import APIRouter, Depends
from schemas import Token, LoginForm
from crud import auth
from dependencies.auth import get_current_user

router = APIRouter()

@router.post("/login", response_model=Token)
def login(form_data: LoginForm):
    return auth.authenticate_user(form_data)
```
---

## 🔌 Example Registration in main.py

from routes import auth, users, dashboard

app.include_router(auth.router, prefix="/api/auth")

app.include_router(users.router, prefix="/api/users")

app.include_router(dashboard.router, prefix="/api/dashboard")

---

## ✅ Best Practices

🧱 Keep each route file focused on one domain (e.g., users, clients, admin)

🔐 Use dependency injection (Depends) for auth, roles, and tenant access

🧼 Avoid complex logic — delegate to crud/ or services

📦 Keep routes lean and RESTful

---

## 📌 Notes

If the app grows, you can split into subfolders: routes/admin/, routes/superuser/, etc.

Always prefix your routers when including them in main.py

Maintain consistent route naming and HTTP method usage



