from pydantic import BaseModel
from typing import Optional
from datetime import date, datetime

# =======================
# CLIENT SCHEMAS
# =======================

class ClientBase(BaseModel):
    first_name: str
    last_name: str
    date_of_birth: Optional[date]
    medicaid_id: Optional[str]
    phone: Optional[str]
    guardian_name: Optional[str]
    managed_care_organization: Optional[str]

class ClientCreate(ClientBase):
    pass

class ClientRead(ClientBase):
    id: int

    class Config:
        from_attributes = True


class ClientResponse(BaseModel):
    id: int
    first_name: str
    last_name: str
    # ... other fields

    class Config:
        from_attributes = True  # ✅ this is the correct usage for Pydantic v2
