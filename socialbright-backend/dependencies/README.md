# 📂 dependencies/

This folder contains **shared dependency functions** used in FastAPI routes throughout the SocialBright backend. These dependencies are injected via `Depends()` and help enforce security, permissions, and tenant/user context.

---

## 🎯 Purpose

The `dependencies/` folder centralizes logic for:

- 🔐 Authentication (getting the current user)
- 🧑‍💼 Role-based access control (admin, superuser, case manager)
- 🏢 Tenant identification and isolation
- 🧩 Common helpers shared across routers and CRUD

---

## 📄 Common Files

| File               | Description                                                       |
|--------------------|-------------------------------------------------------------------|
| `auth.py`          | 🔐 Validates bearer tokens, retrieves current user                |
| `roles.py`         | 👥 Role-checking dependencies like `require_admin` or `require_cm`|
| `tenants.py`       | 🏢 Gets current tenant info from request/session                  |
| `shared.py`        | 🧰 Any other reusable dependencies (pagination, filtering, etc.)  |

---

## 🧪 Example Usage

```python
# routes/some_route.py
from fastapi import APIRouter, Depends
from dependencies.auth import get_current_user
from dependencies.roles import require_admin

router = APIRouter()

@router.get("/admin-only")
def admin_dashboard(current_user = Depends(require_admin)):
    return {"message": "Hello Admin!"}
```

---

## 🔧 Example: auth.py

from fastapi import Depends, HTTPException, status
from jose import JWTError, jwt
from db.session import SessionLocal
from crud import users

def get_current_user(token: str = Depends(oauth2_scheme), db: SessionLocal = Depends(get_db)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id: int = payload.get("sub")
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")
    
    user = users.get_user_by_id(db, user_id)
    return user

---

## ✅ Best Practices

🧱 Keep dependencies composable and reusable across routes

🔐 Use role-based dependencies to guard routes cleanly

🧩 Return actual objects (like User) rather than just IDs

🧼 Keep dependency functions pure (no side effects if possible)

---

## 📌 Notes

Dependencies help keep route files clean and declarative

Centralizing them allows easier updates to auth/role logic in the future

You can use dependencies in both route parameters and FastAPI middleware

