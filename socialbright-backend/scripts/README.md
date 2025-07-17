# 📂 scripts/

This folder contains **custom one-off or utility scripts** used for managing and supporting the SocialBright backend.

Scripts in this folder are **not part of the main FastAPI application**, but are used during development, maintenance, or deployment.

---

## 🎯 Purpose

The `scripts/` folder is for:

- 🛠️ Manual database setup or seeding
- 🔁 Batch data migration or cleanup
- 📥 Importing/exporting data
- 🧪 Testing helper functions or automation
- 🚀 Deployment or maintenance helpers

---

## 📄 Common Files

| File                     | Description                                              |
|--------------------------|----------------------------------------------------------|
| `seed_users.py`         | 👤 Inserts sample user accounts (admin, case manager)     |
| `init_tenants.py`       | 🏢 Initializes tenant records with default settings       |
| `reset_passwords.py`    | 🔐 Resets user passwords in bulk or for a specific user   |
| `export_clients.py`     | 📤 Exports client data to CSV/JSON                        |
| `import_data.py`        | 📥 Imports legacy data into database                      |
| `test_email.py`         | 📧 Tests SMTP/email functionality                         |

---

## 🧪 Example Usage

Run a script manually (inside virtualenv):
```bash
python scripts/seed_users.py
```
---

## ✅ Best Practices

🚫 Don’t include secrets or hardcoded credentials in these files

🧼 Keep scripts short, clear, and purpose-driven

🧪 Test scripts in dev/staging before running in production

📦 Organize scripts by purpose if the folder grows (e.g., scripts/db/, scripts/dev/)

---

## 📌 Notes

Scripts can use the existing db/, crud/, models/, and schemas/ modules

Always import SessionLocal from db/session.py when using database access

Document the purpose and usage at the top of each script file


