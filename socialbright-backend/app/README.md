# 📂 app/

This folder is the 💡 **core application logic** of the SocialBright backend. It initializes the FastAPI app, registers routes, and configures global services like middleware and database models.

---

## 🧩 Purpose

The `app/` folder acts as the central hub of the FastAPI project. It connects all the pieces:

- 📡 API route registration
- 🧬 Database model loading
- 🔐 CORS and authentication setup
- 🛠️ Startup configurations

---

## 📄 Common Files

| File             | Description                                                     |
|------------------|-----------------------------------------------------------------|
| `main.py`        | 🚀 Entry point of the FastAPI app. Loads routes, middleware, DB |
| `schemas.py`     | 📦 Pydantic schemas shared across endpoints                     |
| `dependencies/`  | ⚙️ Common dependencies (e.g., auth guards, role checks)         |
| `auth.py`        | 🔐 (Sometimes used here) Custom auth logic if needed            |

---

## 🔁 Example: main.py

```python
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from db import models
from db.session import engine
from api import users, auth, dashboard

app = FastAPI()

# 🛡️ CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 🗄️ Create tables
models.Base.metadata.create_all(bind=engine)

# 🔌 Mount routes
app.include_router(auth.router, prefix="/api/auth")
app.include_router(users.router, prefix="/api/users")
app.include_router(dashboard.router, prefix="/api/dashboard")
```
---

## ✅ Best Practices

🧼 Keep main.py clean — no route logic should be here

🔄 Always load routes via include_router() from api/ modules

🧪 Add /test or /healthcheck endpoints for monitoring

🔐 Only enable debug=True in dev, not production

---
## 📌 Notes

You can split main.py into subfiles later (e.g., init_db.py, load_routes.py)

Avoid putting business logic in main.py — delegate to services or routers

Centralize shared config in an app/config.py if needed for future scaling

