from sqlalchemy import Column, Integer, String, Date, Text, JSON, ForeignKey, DateTime
from sqlalchemy.sql import func
from db.base import Base

class Task(Base):
    __tablename__ = "tasks"
    __table_args__ = {"schema": "clients"}

    id = Column(Integer, primary_key=True, index=True)
    tenant_id = Column(Integer, nullable=False)
    user_id = Column(Integer, ForeignKey("users.users.id"), nullable=True)
    client_id = Column(Integer, ForeignKey("clients.clients.id", ondelete="CASCADE"), nullable=False)

    view = Column(String, default="client")  # always "client" now
    client_name = Column(String, nullable=False)
    task = Column(Text, nullable=False)
    subtasks = Column(JSON, default=[])
    due_date = Column(Date)
    status = Column(String, default="To Do")

    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, server_default=func.now(), onupdate=func.now())
