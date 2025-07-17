## 📜 Alembic Migrations

This folder contains database migration scripts managed by Alembic. It is used to keep the PostgreSQL database schema up to date with the SQLAlchemy models in the SocialBright backend.

Alembic allows for version-controlled schema changes across all schemas (clients, users, tenants, dropdowns) in a safe, trackable way.

---

## 📁 Folder Structure
alembic/  
├── versions/ (Auto-generated migration scripts)  
├── env.py (Migration environment config)  
├── script.py.mako (Template used by autogenerate)  
alembic.ini (Root configuration file)  

---

## ✅ Basic Workflow

### Create a new migration:

alembic revision --autogenerate -m "your_migration_description"

### Example names:

add_status_column_to_clients

create_users_table

remove_obsolete_fields_from_case_notes

add_index_on_client_last_name

### Apply migrations:

alembic upgrade head

### Check current revision:

alembic current

### Rollback the last migration:

alembic downgrade -1

### ⚠️ Be careful! This will undo the last migration.

---

## 🧠 Multi-Schema Support

All SQLAlchemy models should declare the schema:

table_args = {'schema': 'clients'}

In alembic/env.py, this is enabled:

include_schemas = True

---

### Manual Migrations
Edit any migration file in alembic/versions/.

To add a new column manually:

def upgrade():
op.add_column('clients', sa.Column('status', sa.String()), schema='clients')

def downgrade():
op.drop_column('clients', 'status', schema='clients')

---

### 🚨 Best Practices
Always inspect auto-generated files before running.

Ensure your models are current before generating.

Do not modify applied migration files.

Use lowercase + underscores in migration names.

---

### Example Commands

alembic revision --autogenerate -m "add_clients_table"

alembic upgrade head

alembic downgrade -1

alembic history

alembic current

---

## 🛠️Environment Config

Edit alembic.ini to match your local DB:

sqlalchemy.url = postgresql://postgres:yourpassword@localhost:5433/socialbright

Alternatively, use dotenv in env.py to load from .env

---

## 🔄 To Do

Add environment-specific configs

Backup before production upgrades

Add pre-upgrade safety checks

---

## 📬 Contact
Questions? Email: info@socialbright.org

Let me know if you want me to generate an actual file version for download.

