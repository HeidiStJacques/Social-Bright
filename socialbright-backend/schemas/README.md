# 📂 schemas/

This folder contains all **Pydantic schema definitions** for the SocialBright backend. These schemas are used for:

- 📥 Validating incoming request data
- 📤 Structuring response models
- 🔒 Controlling which fields are exposed to or accepted from the client

---

## 🎯 Purpose

The `schemas/` folder:

- 🔐 Ensures type safety and data validation in API requests/responses
- 🧩 Works alongside `models/` and `crud/` to maintain clean separation of concerns
- 📦 Prevents leaking sensitive fields like passwords or internal IDs

---

## 📄 Common Files

| File                | Description                                                |
|---------------------|------------------------------------------------------------|
| `users.py`          | 👤 UserCreate, UserRead, UserUpdate, LoginForm             |
| `clients.py`        | 🧍 ClientDemographics, EligibilityInfo, EmergencyContact   |
| `auth.py`           | 🔐 Token schemas, password reset requests                  |
| `dashboard.py`      | 📊 SummaryResponse, VisitCount, AlertInfo                 |
| `calendar.py`       | 📅 CalendarEventCreate, CalendarEventResponse             |
| `tasks.py`          | ✅ TaskCreate, TaskUpdate, TaskResponse                   |
| `base.py`           | 🧱 Shared BaseModel classes and common fields              |

---

## 🧪 Example Schema

```python
# schemas/users.py
from pydantic import BaseModel, EmailStr

class UserBase(BaseModel):
    email: EmailStr
    full_name: str

class UserCreate(UserBase):
    password: str

class UserRead(UserBase):
    id: int
    is_active: bool

    class Config:
        from_attributes = True

---

🧬 Usage in Routes

@router.post("/register", response_model=UserRead)
def register_user(user: UserCreate, db: Session = Depends(get_db)):
    return crud_users.create_user(db, user)
```
---

## ✅ Best Practices

🔐 Never expose internal fields (e.g., hashed_password) in response models

📦 Use orm_mode = True in Config to allow SQLAlchemy → Pydantic conversion

🧩 Break out schemas by domain (e.g., users, clients, auth, tasks)

🔁 Reuse shared schemas (e.g., pagination, timestamps) via base.py

---

## 📌 Notes

Use BaseModel for all schemas — avoid mixing SQLAlchemy models here

Optional fields can use Optional[...] or default=None

Use strict types like EmailStr, conint(), constr() for better validation





