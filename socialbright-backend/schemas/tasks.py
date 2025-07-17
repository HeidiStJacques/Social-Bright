from pydantic import BaseModel
from datetime import date
from typing import Optional

class TaskResponse(BaseModel):
    id: int
    client_id: Optional[int]
    title: str
    description: Optional[str]
    due_date: Optional[date]
    status: Optional[str]

    class Config:
        from_attributes = True  # Pydantic v2+

