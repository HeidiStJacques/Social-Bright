
from pydantic import BaseModel, EmailStr
from typing import Optional, List
from datetime import date, datetime

# -------------------
# Client Schemas
# -------------------

class ClientBase(BaseModel):
    first_name: str
    last_name: str
    date_of_birth: date
    medicaid_id: Optional[str] = None
    phone: Optional[str] = None
    guardian_name: Optional[str] = None
    managed_care_organization: Optional[str] = None

class ClientCreate(ClientBase):
    tenant_id: int

class ClientUpdate(ClientBase):
    pass

class ClientRead(ClientBase):
    id: int

    model_config = {
        "from_attributes": True
    }

# -------------------
# User Schemas
# -------------------

class UserBase(BaseModel):
    email: EmailStr
    full_name: Optional[str] = None

class UserCreate(UserBase):
    password: str

class UserUpdate(UserBase):
    password: Optional[str] = None
    is_active: Optional[bool] = None
    role: Optional[str] = None

class UserRead(UserBase):
    id: int
    is_active: bool
    role: List[str]

    model_config = {
        "from_attributes": True
    }
# -------------------
# Auth Schemas
# -------------------

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: Optional[str] = None
    role: Optional[str] = None


# -------------------
# Tenant Schemas
# -------------------

class TenantBase(BaseModel):
    name: str
    status: Optional[str] = "active"

class TenantCreate(TenantBase):
    pass

class TenantRead(TenantBase):
    id: int

    model_config = {
        "from_attributes": True
    }
# -------------------
# Document Schemas
# -------------------

class DocumentBase(BaseModel):
    filename: str
    category: str
    client_id: int
    uploaded_by: int

class DocumentCreate(DocumentBase):
    pass

class DocumentRead(DocumentBase):
    id: int
    upload_date: datetime

    model_config = {
        "from_attributes": True
    }


# -------------------
# Case Note Schemas
# -------------------

class CaseNoteBase(BaseModel):
    content: str
    client_id: int
    created_by: int

class CaseNoteCreate(CaseNoteBase):
    pass

class CaseNoteRead(CaseNoteBase):
    id: int
    created_at: datetime

    model_config = {
        "from_attributes": True
    }

