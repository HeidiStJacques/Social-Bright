from pydantic import BaseModel
from datetime import date
from typing import Optional, List, Literal

class Subtask(BaseModel):
    label: str
    checked: bool = False

class TaskBase(BaseModel):
    task: str
    subtasks: List[Subtask] = []
    due_date: Optional[date]
    status: Optional[str] = "To Do"

class TaskCreate(TaskBase):
    client_id: int  # ✅ required for /api/tasks

class TaskUpdate(TaskBase):
    pass

class TaskResponse(TaskBase):
    id: int
    client_id: int

    class Config:
        from_attributes = True
