# 📂 db/

This folder manages all **database-related configuration and models** for the SocialBright backend. It defines how the backend connects to PostgreSQL and how the tables and schemas are structured using SQLAlchemy.

---

## 🧩 Purpose

The `db/` folder handles:

- 🏗️ Defining database models (tables, fields, schemas)
- 🔌 Managing database connections
- 🗃️ Setting up schemas for multi-tenancy (e.g., users, clients)
- 🧬 Declaring relationships between models

---

## 📄 Common Files

| File               | Description                                                        |
|--------------------|--------------------------------------------------------------------|
| `models.py`        | 📘 Contains all SQLAlchemy model classes                           |
| `session.py`       | 🔌 Manages the SQLAlchemy session and engine connection            |
| `base_class.py`    | 📦 Optional: shared base class if customizing SQLAlchemy `Base`     |
| `init_db.py`       | 🧪 Optional: initialize DB with test data or first-time setup       |

---

## 🔌 Example: session.py

```python
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

DATABASE_URL = "postgresql://user:password@localhost/socialbright"

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
```
---

## 🏗️ Example: models.py

from sqlalchemy import Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class User(Base):
    __tablename__ = "users"
    __table_args__ = {"schema": "users"}

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    full_name = Column(String)

---

## ✅ Best Practices
🧹 Use consistent naming conventions for models and fields

🔐 Always assign __table_args__ = {'schema': '...'} for multi-schema support

📦 Use Alembic to manage migrations, not manual table creation

⚠️ Avoid calling Base.metadata.create_all() in production unless you know what you're doing

---

## 🧠 Notes

Your models.py file can grow large — consider splitting it into multiple files (e.g., models/users.py, models/clients.py) and importing them into a shared __init__.py

The session.py file is used by Depends(get_db) in your routes and CRUD logic

All models must be imported before calling Base.metadata.create_all() to ensure they're registered

