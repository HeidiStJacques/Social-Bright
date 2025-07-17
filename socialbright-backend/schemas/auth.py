from pydantic import BaseModel
from typing import List, Optional

class LoginRequest(BaseModel):
    email: str
    password: str

class UserOut(BaseModel):
    id: int
    email: str
    roles: List[str]
    role: Optional[str]
    tenant_id: Optional[int]
    tenant_name: Optional[str]

    @classmethod
    def model_validate_single(cls, user):
        return cls(
            id=user.id,
            email=user.email,
            roles=user.roles,
            role=user.roles[0] if user.roles else None,
            tenant_id=user.tenant_id,
            tenant_name=user.tenant_name
        )

    class Config:
        from_attributes = True


class LoginResponse(BaseModel):
    user: UserOut
    token: str
