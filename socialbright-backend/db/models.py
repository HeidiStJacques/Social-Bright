from pydantic import BaseModel
from typing import List, Optional
from sqlalchemy.dialects.postgresql import ARRAY
from sqlalchemy import (
    Column, Integer, String, Boolean, Date, DateTime, Time, Text, ForeignKey,
    Numeric, JSON, CheckConstraint, UniqueConstraint
)
from sqlalchemy.orm import DeclarativeBase, relationship
from sqlalchemy.sql import func
from db.session import Base
from db.base_class import Base

class Base(DeclarativeBase):
    pass

# ========== TENANTS SCHEMA ==========

class Tenant(Base):
    __tablename__ = "tenants"
    __table_args__ = {'schema': 'tenants'}

    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)
    domain = Column(String, unique=True)
    logo_url = Column(String)
    created_at = Column(DateTime, server_default=func.now())

class TenantSetting(Base):
    __tablename__ = "settings"
    __table_args__ = {'schema': 'tenants'}

    id = Column(Integer, primary_key=True)
    tenant_id = Column(Integer, ForeignKey("tenants.tenants.id", ondelete="CASCADE"))
    key = Column(String, nullable=False)
    value = Column(String)


# ========== USERS SCHEMA ==========

class User(Base):
    __tablename__ = "users"
    __table_args__ = {"schema": "users"}

    id = Column(Integer, primary_key=True)
    tenant_id = Column(Integer, nullable=False)
    email = Column(String, nullable=False, unique=True)
    hashed_password = Column(String, nullable=False)
    roles = Column(ARRAY(String), nullable=False)  # 👈 use this only
    tenant_name = Column(String)

class PasswordReset(Base):
    __tablename__ = "password_resets"
    __table_args__ = {'schema': 'users'}

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.users.id", ondelete="CASCADE"))
    reset_token = Column(String, unique=True)
    expires_at = Column(DateTime)
    used = Column(Boolean, default=False)

class LoginSession(Base):
    __tablename__ = "login_sessions"
    __table_args__ = {'schema': 'users'}

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.users.id"))
    login_time = Column(DateTime, server_default=func.now())
    logout_time = Column(DateTime)
    ip_address = Column(String)
    user_agent = Column(String)
    successful = Column(Boolean, default=True)

class RolePermission(Base):
    __tablename__ = "roles_permissions"
    __table_args__ = {'schema': 'users'}

    id = Column(Integer, primary_key=True)
    role = Column(String, nullable=False)
    permission = Column(String, nullable=False)

class UserLog(Base):
    __tablename__ = "user_logs"
    __table_args__ = {'schema': 'users'}

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.users.id", ondelete="CASCADE"))
    action = Column(String)
    description = Column(Text)
    timestamp = Column(DateTime, server_default=func.now())

class Notification(Base):
    __tablename__ = "notifications"
    __table_args__ = {'schema': 'users'}

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.users.id"))
    message = Column(Text)
    read = Column(Boolean, default=False)
    created_at = Column(DateTime, server_default=func.now())

class SupportTicket(Base):
    __tablename__ = "support_tickets"
    __table_args__ = {'schema': 'users'}

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.users.id"))
    subject = Column(String)
    message = Column(Text)
    status = Column(String, default="open")

# ========== CLIENTS SCHEMA ==========

class Client(Base):
    __tablename__ = "clients"
    __table_args__ = {'schema': 'clients'}

    id = Column(Integer, primary_key=True)
    tenant_id = Column(Integer, ForeignKey("tenants.tenants.id", ondelete="CASCADE"))
    client_number = Column(String, unique=True, nullable=False)
    first_name = Column(String)
    last_name = Column(String)
    preferred_name = Column(String)
    dob = Column(Date)
    phone = Column(String)
    address_street = Column(String)
    address_city = Column(String)
    address_state = Column(String)
    address_zip = Column(String)
    email = Column(String)
    gender = Column(String)
    language = Column(String)
    interpreter_needed = Column(Boolean)
    race_ethnicity = Column(String)
    marital_status = Column(String)
    height_cm = Column(Integer)
    weight_kg = Column(Integer)
    medicaid_id = Column(String)
    medicare_id = Column(String)
    mco_id = Column(String)
    ssn = Column(String)
    managed_care_org = Column(String)
    plan_a_start = Column(Date)
    plan_b_start = Column(Date)
    plan_d_start = Column(Date)
    mea_review_date = Column(Date)
    financial_redet_date = Column(Date)
    primary_phone = Column(String)
    secondary_phone = Column(String)
    contact_method = Column(String)
    legal_guardian = Column(Boolean)
    guardian_name = Column(String)
    power_of_attorney = Column(String)
    conservator_info = Column(String)
    pcp_name = Column(String)
    pcp_phone = Column(String)
    pcp_practice = Column(String)
    pcp_fax = Column(String)
    notes = Column(Text)

    alerts = relationship("Alert", back_populates="client")

class EmergencyContact(Base):
    __tablename__ = "emergency_contacts"
    __table_args__ = {'schema': 'clients'}

    id = Column(Integer, primary_key=True)
    client_id = Column(Integer, ForeignKey("clients.clients.id", ondelete="CASCADE"))
    first_name = Column(String)
    last_name = Column(String)
    relationship = Column(String)
    phone = Column(String)
    email = Column(String)
    address = Column(String)

class Eligibility(Base):
    __tablename__ = "eligibility"
    __table_args__ = {'schema': 'clients'}

    id = Column(Integer, primary_key=True)
    client_id = Column(Integer, ForeignKey("clients.clients.id", ondelete="CASCADE"))
    age = Column(Integer)
    total_income = Column(Numeric)
    total_deductions = Column(Numeric)
    monthly_income = Column(Numeric)
    is_eligible = Column(Boolean)
    eligibility_date = Column(Date, server_default=func.now())

class Document(Base):
    __tablename__ = "documents"
    __table_args__ = {'schema': 'clients'}

    id = Column(Integer, primary_key=True)
    client_id = Column(Integer, ForeignKey("clients.clients.id", ondelete="CASCADE"))
    filename = Column(String)
    category = Column(String)
    upload_date = Column(DateTime, server_default=func.now())
    file_url = Column(String)

class CaseNote(Base):
    __tablename__ = "case_notes"
    __table_args__ = {'schema': 'clients'}

    id = Column(Integer, primary_key=True)
    client_id = Column(Integer, ForeignKey("clients.clients.id", ondelete="CASCADE"))
    user_id = Column(Integer, ForeignKey("users.users.id"))
    note = Column(Text)
    created_at = Column(DateTime, server_default=func.now())

class PlanOfCare(Base):
    __tablename__ = "plan_of_care"
    __table_args__ = {'schema': 'clients'}

    id = Column(Integer, primary_key=True)
    client_id = Column(Integer, ForeignKey("clients.clients.id", ondelete="CASCADE"))
    created_at = Column(DateTime, server_default=func.now())
    section_main = Column(JSON)
    section_financial = Column(JSON)
    section_health_information = Column(JSON)
    section_pain_assessment = Column(JSON)
    section_cognitive_assessment = Column(JSON)
    section_safety_assessment = Column(JSON)
    section_daily_living = Column(JSON)
    section_adl = Column(JSON)
    section_iadl = Column(JSON)
    section_substance_use = Column(JSON)
    section_90_day_goals = Column(JSON)

class CalendarEvent(Base):
    __tablename__ = "calendar_events"
    __table_args__ = {'schema': 'clients'}

    id = Column(Integer, primary_key=True)
    client_id = Column(Integer, ForeignKey("clients.clients.id", ondelete="CASCADE"))
    tenant_id = Column(Integer, nullable=False)
    title = Column(String)
    description = Column(Text)
    start_time = Column(DateTime)
    end_time = Column(DateTime)
    event_type = Column(String)
    created_by = Column(Integer, ForeignKey("users.users.id"))
    created_at = Column(DateTime, server_default=func.now())


class StatusForm(Base):
    __tablename__ = "status_forms"
    __table_args__ = {'schema': 'clients'}

    id = Column(Integer, primary_key=True)
    client_id = Column(Integer, ForeignKey("clients.clients.id", ondelete="CASCADE"))
    form_date = Column(Date)
    gcm_status = Column(String)
    billing_status = Column(String)  # store as JSON string or ENUM array if needed
    status_date = Column(Date)
    billing_comments = Column(Text)
    closure_reason = Column(String)
    closure_notes = Column(Text)
    staff_email = Column(String)

class Visit(Base):
    __tablename__ = "visits"
    __table_args__ = {'schema': 'clients'}

    id = Column(Integer, primary_key=True)
    client_id = Column(Integer, ForeignKey("clients.clients.id", ondelete="CASCADE"))
    visit_type = Column(String)
    date = Column(Date)
    time_in = Column(Time)
    time_out = Column(Time)
    staff_name = Column(String)
    notes = Column(Text)

class Invoice(Base):
    __tablename__ = "invoices"
    __table_args__ = {'schema': 'clients'}

    id = Column(Integer, primary_key=True)
    client_id = Column(Integer, ForeignKey("clients.clients.id", ondelete="CASCADE"))
    invoice_number = Column(String, unique=True)
    service_period_start = Column(Date)
    service_period_end = Column(Date)
    total_amount = Column(Numeric)
    status = Column(String)
    created_at = Column(DateTime, server_default=func.now())

class AuditLog(Base):
    __tablename__ = "audit_logs"
    __table_args__ = {'schema': 'clients'}

    id = Column(Integer, primary_key=True)
    client_id = Column(Integer, ForeignKey("clients.clients.id", ondelete="CASCADE"))
    section = Column(String)
    auditor_name = Column(String)
    notes = Column(Text)
    result = Column(String)
    reviewed_at = Column(DateTime, server_default=func.now())

class ServiceGap(Base):
    __tablename__ = "service_gaps"
    __table_args__ = {'schema': 'clients'}

    id = Column(Integer, primary_key=True)
    client_id = Column(Integer, ForeignKey("clients.clients.id", ondelete="CASCADE"))
    description = Column(Text)
    date_identified = Column(Date)
    resolved = Column(Boolean, default=False)
    resolution_notes = Column(Text)

# ========== DROPDOWNS ==========

class Language(Base):
    __tablename__ = "languages"
    __table_args__ = {'schema': 'dropdowns'}

    id = Column(Integer, primary_key=True)
    name = Column(String, unique=True, nullable=False)

class Race(Base):
    __tablename__ = "races"
    __table_args__ = {'schema': 'dropdowns'}

    id = Column(Integer, primary_key=True)
    name = Column(String, unique=True, nullable=False)

class MaritalStatus(Base):
    __tablename__ = "marital_statuses"
    __table_args__ = {'schema': 'dropdowns'}

    id = Column(Integer, primary_key=True)
    name = Column(String, unique=True, nullable=False)

class MCO(Base):
    __tablename__ = "mcos"
    __table_args__ = {'schema': 'dropdowns'}

    id = Column(Integer, primary_key=True)
    name = Column(String, unique=True, nullable=False)

# ========== PROVIDERS ==========

class Provider(Base):
    __tablename__ = "list"
    __table_args__ = {'schema': 'providers'}

    id = Column(Integer, primary_key=True)
    tenant_id = Column(Integer, ForeignKey("tenants.tenants.id", ondelete="CASCADE"))
    name = Column(String)
    contact_name = Column(String)
    phone = Column(String)
    email = Column(String)
    services_offered = Column(Text)
    address = Column(Text)

# ========== INTEGRATIONS ==========

class IntegrationConfig(Base):
    __tablename__ = "config"
    __table_args__ = {'schema': 'integrations'}

    id = Column(Integer, primary_key=True)
    tenant_id = Column(Integer, ForeignKey("tenants.tenants.id", ondelete="CASCADE"))
    service_name = Column(String)
    api_key = Column(String)
    config = Column(JSON)
    created_at = Column(DateTime, server_default=func.now())

# ========== CHAT ==========

class ChatMessage(Base):
    __tablename__ = "messages"
    __table_args__ = {'schema': 'chat'}

    id = Column(Integer, primary_key=True)
    sender_id = Column(Integer, ForeignKey("users.users.id"))
    receiver_id = Column(Integer, ForeignKey("users.users.id"))
    message = Column(Text)
    sent_at = Column(DateTime, server_default=func.now())
    read = Column(Boolean, default=False)

# ========== PUBLIC ==========

class SystemSetting(Base):
    __tablename__ = "system_settings"
    __table_args__ = {'schema': 'public'}

    id = Column(Integer, primary_key=True)
    key = Column(String, unique=True, nullable=False)
    value = Column(String)

# ============ TASKS ============

class Task(Base):
    __tablename__ = "tasks"
    __table_args__ = {'schema': 'clients'}

    id = Column(Integer, primary_key=True, index=True)
    tenant_id = Column(Integer, nullable=False)  # 🔹 Add this line
    user_id = Column(Integer, ForeignKey("users.users.id"))
    client_id = Column(Integer, ForeignKey("clients.clients.id"))
    title = Column(String)
    description = Column(String)
    due_date = Column(DateTime)
    status = Column(String)
    created_at = Column(DateTime)

# ========== ALERTS ===============

class Alert(Base):
    __tablename__ = "alerts"
    __table_args__ = {'schema': 'clients'}

    id = Column(Integer, primary_key=True, index=True)
    client_id = Column(Integer, ForeignKey("clients.clients.id"), nullable=True)
    message = Column(String, nullable=False)
    type = Column(String, nullable=False)  # e.g., "Urgent", "Warning", "Info"
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime)
    
    client = relationship("Client", back_populates="alerts")
