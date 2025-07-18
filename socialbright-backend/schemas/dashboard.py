from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class VisitResponse(BaseModel):
    id: int
    client_id: int
    client_name: str
    title: Optional[str]
    description: Optional[str]
    start_time: datetime
    end_time: datetime

    model_config = {
        "from_attributes": True,
    }

class TaskResponse(BaseModel):
    id: int
    client_id: Optional[int] = None
    client_name: Optional[str] = "General"
    title: str
    due_date: datetime
    status: str

    model_config = {
        "from_attributes": True,
    }

class AlertResponse(BaseModel):
    id: int
    client_id: Optional[int]
    message: str
    type: str
    is_active: Optional[bool] = None
    created_at: Optional[datetime] = None
    tenant_id: int

    model_config = {
        "from_attributes": True,
    }
