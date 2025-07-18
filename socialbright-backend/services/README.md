# 📂 services/

This folder contains **business logic and utility layers** that sit between your `routes/` and `crud/` layers in the SocialBright backend.

Services are ideal for handling:
- 🔁 Complex logic
- 🧠 Multi-step workflows
- 🧩 Integration across multiple models or external APIs

---

## 🎯 Purpose

The `services/` layer helps:

- 🧼 Keep routes clean and focused on request handling
- 📦 Combine multiple `crud/` calls into reusable logic
- 🔐 Apply business rules, validations, or transformations
- 🌐 Integrate with external services like Stripe, email, or storage

---

## 📄 Common Files

| File                  | Description                                                |
|-----------------------|----------------------------------------------------------- |
| `user_service.py`     | 👤 Handles registration, profile logic, password reset     |
| `auth_service.py`     | 🔐 Token creation, login checks, refresh logic             |
| `dashboard_service.py`| 📊 Aggregates metrics for user/admin dashboards            |
| `document_service.py` | 📎 Handles document categorization, file validation        |
| `calendar_service.py` | 📆 Business logic for scheduling and conflicts             |
| `alert_service.py`    | 🚨 Generates system alerts and notifications               |
| `stripe_service.py`   | 💳 Communicates with Stripe API for billing and checkout   |

---

## 🧪 Example Usage

```python
# routes/auth.py
from services.auth_service import authenticate_user

@router.post("/login")
def login(form_data: LoginForm):
    return authenticate_user(form_data.email, form_data.password)

# services/auth_service.py
from crud import users
from utils.security import verify_password

def authenticate_user(email, password):
    user = users.get_user_by_email(email)
    if not user or not verify_password(password, user.hashed_password):
        raise InvalidCredentialsException()
    return create_jwt_token(user)
```
---

## ✅ Best Practices

🧠 Place business rules here, not in crud/ or routes/

🔁 Reuse service functions across multiple route files if needed

🔐 Include role or tenant-level logic when relevant

🧪 Write unit tests for service logic (easier than route-level testing)

---

## 📌 Notes

services/ is optional but highly recommended for medium/large projects

Services can call multiple crud/ functions, format responses, and handle exceptions

If you use external tools (like Stripe, Twilio, S3/MinIO), use services to isolate integration logic
