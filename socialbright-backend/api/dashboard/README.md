# 📂 api/dashboard/

This folder contains all API route handlers related to the **dashboard metrics and widgets** for the SocialBright platform.

Each route provides **real-time insights** for users, admins, and superusers based on their role and tenant.

---

## 🎯 Purpose

The `dashboard` API endpoints are used to:

- 📊 Show total client counts
- 📅 List upcoming visits
- ✅ Display tasks due or in progress
- 🚨 Show alerts that need attention

These endpoints power the visual dashboards seen at:

- `/dashboard` (case managers)
- `/admin/dashboard`
- `/superuser/dashboard`

---

## 📄 Example Endpoints

| Endpoint                         | Method | Description                                 |
|----------------------------------|--------|-------------------------------------------- |
| `/api/dashboard/clients/count`   | GET    | 🧍‍♂️ Returns the total number of clients      |
| `/api/dashboard/visits`          | GET    | 📆 Lists upcoming calendar visits           |
| `/api/dashboard/tasks`           | GET    | ✅ Shows tasks assigned to the user         |
| `/api/dashboard/alerts`          | GET    | 🚨 Lists unresolved alerts or notifications |

---

## 🛠️ Tech Stack

- 🔐 Protected by authentication and tenant access
- 🧠 Uses services or `crud/` files to fetch summarized data
- 🧩 Returns clean, pre-processed metrics for frontend display

---

## 🧪 Usage Example

Example route (in `dashboard.py`):
```python
@router.get("/clients/count")
def get_client_count(current_user: User = Depends(get_current_user)):
    return crud.count_clients_for_tenant(current_user.tenant_id)
```
---

## ✅ Best Practices

♻️ Keep each endpoint lightweight and fast (dashboards load on page visit)

🧹 Avoid sending full datasets — just return counts and summaries

🔐 Always validate user roles and tenant scope

---

## 🔮 Future Features (Optional)

📈 Charts for visit trends, client growth, etc.

📥 Exportable metrics

⚙️ Configurable dashboard widgets per user role

🧾 Daily summary reports via email



