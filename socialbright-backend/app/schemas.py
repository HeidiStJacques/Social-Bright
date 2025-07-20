from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime


class VisitResponse(BaseModel):
    id: int
    client_id: int
    client_name: str  # populate in query
    title: str
    description: str | None
    start_time: datetime
    end_time: datetime

    class Config:
        from_attributes = True

class TaskResponse(BaseModel):
    id: int
    client_id: int
    client_name: str
    title: str
    due_date: datetime
    status: str

    class Config:
        from_attributes = True

class AlertResponse(BaseModel):
    id: int
    client_id: int | None
    client_name: str | None
    message: str
    type: str
    date: datetime
    is_active: bool

    class Config:
        from_attributes = True

class User(BaseModel):
    id: int
    name: str
    email: EmailStr
    is_active: bool
    role: str
    tenant_id: int
    created_at: Optional[datetime]
    updated_at: Optional[datetime]

    class Config:
        from_attributes = True
