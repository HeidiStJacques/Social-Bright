from pydantic import BaseModel, EmailStr
from typing import List, Optional

class UserOut(BaseModel):
    id: int
    email: EmailStr
    roles: List[str]
    tenant_id: int
    tenant_name: Optional[str]
    role: Optional[str]  # First role (used for frontend redirect)

    @classmethod
    def model_validate_single(cls, user):
        return cls(
            id=user.id,
            email=user.email,
            roles=user.roles,
            role=user.roles[0] if user.roles else None,
            tenant_id=user.tenant_id,
            tenant_name=user.tenant_name,
        )

    class Config:
        "from_attributes": True
    
