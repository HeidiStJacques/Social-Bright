from pydantic import BaseModel
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
        orm_mode = True

class TaskResponse(BaseModel):
    id: int
    client_id: int
    client_name: str
    title: str
    due_date: datetime
    status: str

    class Config:
        orm_mode = True

class AlertResponse(BaseModel):
    id: int
    client_id: int | None
    client_name: str | None
    message: str
    type: str
    date: datetime
    is_active: bool

    class Config:
        orm_mode = True
