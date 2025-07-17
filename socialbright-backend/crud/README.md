# 📂 crud/

This folder contains all the **Create, Read, Update, Delete (CRUD)** logic for interacting with the database in the SocialBright backend.

Each file here abstracts and encapsulates database operations so that API route files remain clean and focused on request handling.

---

## 🎯 Purpose

The `crud/` folder:

- 🧠 Separates business logic from route logic
- 🗄️ Provides reusable functions for database access
- 🔁 Keeps code DRY (Don't Repeat Yourself)
- 🔐 Optionally includes role-based data filtering

---

## 📄 Common Files

| File                 | Description                                              |
|----------------------|----------------------------------------------------------|
| `users.py`          | 👤 Handles creating, reading, and updating user accounts  |
| `clients.py`        | 🧍 CRUD for client records (e.g., demographics, status)   |
| `calendar.py`       | 📅 Handles appointments and calendar events               |
| `dashboard.py`      | 📊 Aggregates counts and metrics for dashboard views      |
| `documents.py`      | 📎 Stores and fetches document metadata per client        |
| `notes.py`          | 📝 Case notes create, read, update logic                  |
| `tasks.py`          | ✅ Task creation, updates, and filtering by status        |

---

## 🛠️ Example Usage

```python
# crud/users.py
from db.session import SessionLocal
from models import User

def get_user_by_email(db: SessionLocal, email: str):
    return db.query(User).filter(User.email == email).first()
# In your route
from crud import users as crud_users

@router.get("/me")
def get_current_user(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    return crud_users.get_user_by_email(db, current_user.email)
```
---
## ✅ Best Practices

📦 Keep each file focused on one data model

📄 Use SQLAlchemy ORM sessions (Session) safely with dependency injection

🧩 Avoid embedding business logic — just perform data operations

🔍 Always apply tenant/user filters to avoid cross-access

---

## 📌 Notes

If you're using multiple schemas, make sure your models specify __table_args__ = {'schema': '...'} and reflect that in your queries

Always validate data in your schemas.py, not inside crud/

Prefix get_, create_, update_, delete_ for clarity
