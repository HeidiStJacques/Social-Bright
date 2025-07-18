from pydantic import BaseModel
from datetime import date
from typing import Optional, List, Literal

class Subtask(BaseModel):
    label: str
    checked: bool = False

class TaskBase(BaseModel):
    view: Literal["client"]  # only "client" view is supported now
    client_name: str
    task: str
    subtasks: List[Subtask] = []
    due_date: Optional[date]
    status: Optional[str] = "To Do"

class TaskCreate(TaskBase):
    pass  # client_id is passed in URL, not body

class TaskUpdate(TaskBase):
    pass

class TaskResponse(TaskBase):
    id: int
    client_id: int

    class Config:
        from_attributes = True
