# 📂 Alembic / Versions

This folder stores all **versioned migration scripts** created by Alembic to track and manage database schema changes over time.

---

## 📜 What’s Inside

Each file is named like:

 <revision_id>_<description>.py

Example:
 `a1b2c3d4e5_add_clients_table.py`

Each migration script contains:
-  `revision`: unique ID of this migration
-  `down_revision`: previous migration ID
-  `upgrade()` function: defines how to apply the schema change
-  `downgrade()` function: defines how to revert it

---

## 🛠️ How to Create a Migration

Auto-generate based on model changes:

alembic revision --autogenerate -m "Add users table"

---

## ⚙️ How to Apply Migrations

### Run all pending migrations:

alembic upgrade head

### To downgrade:

alembic downgrade <revision_id>

### Check current migration version:

alembic current

---

## ✅ Best Practices

🔒 Commit all versioned migration files to version control (e.g. Git)

🚫 Do not manually change revision or down_revision unless you know what you're doing

📋 Review auto-generated diffs before committing

🧪 Test your migrations in staging/dev before applying in production

---

## 🧠 Notes

If you use multiple schemas (e.g., users, clients, etc.), keep your migration logic organized per schema inside each migration file.

You can add custom logic in upgrade() or downgrade() to handle more complex transitions.
