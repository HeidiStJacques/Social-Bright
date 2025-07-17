from pydantic import BaseModel
from typing import Optional

# ===== Base Schema =====
class TenantBase(BaseModel):
    name: str
    domain: Optional[str] = None
    logo_url: Optional[str] = None
    status: Optional[str] = "active"

# ===== Create Schema =====
class TenantCreate(TenantBase):
    pass

# ===== Read Schema =====
class TenantRead(TenantBase):
    id: int

    class Config:
        "from_attributes": True
    

# ===== Setting Schema =====
class TenantSetting(BaseModel):
    tenant_id: int
    key: str
    value: str

class TenantSettingRead(TenantSetting):
    id: int

    class Config:
        "from_attributes": True
    
