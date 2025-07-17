from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class CalendarEventResponse(BaseModel):
    id: int
    client_id: int
    title: str
    description: Optional[str] = None
    start_time: datetime
    end_time: datetime
    event_type: Optional[str] = None

    class Config:
        from_attributes = True  # or orm_mode = True if using Pydantic v1
