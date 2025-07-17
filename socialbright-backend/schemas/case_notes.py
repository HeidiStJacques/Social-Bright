from pydantic import BaseModel
from typing import Optional
from datetime import date, datetime


# =======================
# CASE NOTE SCHEMAS
# =======================

class CaseNoteBase(BaseModel):
    client_id: int
    content: str
    author: str

class CaseNoteCreate(CaseNoteBase):
    pass

class CaseNoteRead(CaseNoteBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True