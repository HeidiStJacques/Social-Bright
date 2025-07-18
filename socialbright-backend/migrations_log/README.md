# 🛠️ Manual Migrations Log

This file tracks direct database changes made outside of Alembic migrations — especially useful during prototyping or urgent fixes. All commands here should be applied manually in PostgreSQL (`psql` or another DB tool).

---

## ✅ Guidelines

- List changes by date
- Use proper SQL formatting
- Keep changes brief and clear
- If Alembic migration will be created later, note it

---

## 📅 Example Entry

### July 18, 2025

**Added `tenant_id` to `clients.alerts`:**
```sql
ALTER TABLE clients.alerts ADD COLUMN tenant_id INTEGER NOT NULL DEFAULT 1;
```
INSERT INTO clients.alerts (client_id, message, type, is_active, created_at, tenant_id)
VALUES (NULL, 'Test alert for dashboard', 'Info', TRUE, NOW(), 1);

---

## 📌 Notes

Always document any manual change that affects schema or test data

Useful for syncing with other developers or applying later in production
