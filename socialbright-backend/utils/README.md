# 📂 utils/

This folder contains small, **reusable utility functions and helper modules** used throughout the SocialBright backend. These functions are stateless and do not depend on FastAPI, database sessions, or specific user context.

---

## 🎯 Purpose

The `utils/` folder is where you keep:

- 🔐 Security helpers (e.g., password hashing)
- 📅 Date and time formatters
- 📦 File validation utilities
- 🧪 Data conversion and cleaning tools
- 📤 Email/message senders

These are functions you’d use across `services/`, `routes/`, or even `scripts/`.

---

## 📄 Common Files

| File                  | Description                                                |
|------------------------|------------------------------------------------------------|
| `security.py`         | 🔐 Password hashing, token generation, secret validation    |
| `dates.py`            | 📅 Date formatting, parsing, age calculation                |
| `file_utils.py`       | 📎 File type checking, size limits, extension validation     |
| `email_utils.py`      | 📧 Send emails via SMTP or third-party services             |
| `formatters.py`       | ✏️ String cleaners, name casing, phone formatting           |
| `validators.py`       | ✅ Input validators for things not covered by Pydantic       |
| `tenants.py`          | 🏢 Tenant-aware helpers like branding, domains, disclaimers  |

---

## 🧪 Example Usage

```python
# utils/security.py
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def hash_password(password: str) -> str:
    return pwd_context.hash(password)

def verify_password(plain_password, hashed_password) -> bool:
    return pwd_context.verify(plain_password, hashed_password)

# services/user_service.py
from utils.security import hash_password
hashed = hash_password("mypassword123")
```
---

## ✅ Best Practices

📦 Keep functions small, focused, and reusable

🧼 Avoid app/database context — these should be “pure” helpers

🧪 Write unit tests for utility functions easily (no setup needed)

♻️ Reuse across backend layers: routes, services, scripts, tests

---

## 📌 Notes

If a utility grows large, break it into its own subfolder (e.g., utils/files/)

Always check for Python stdlib overlap — don’t reinvent the wheel

You can include constants/config here if not tenant-specific

